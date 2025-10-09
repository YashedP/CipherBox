export const TransformationType = {
    NO_TRANSFORMATION: -1,
    CAESAR: 0,
    BASE64: 1,
    HEX: 2,
} as const;

export type TransformationType = typeof TransformationType[keyof typeof TransformationType];

type NoOptions = Record<string, never>
type CaesarOptions = { 
	shift?: number,
	customAlphabet?: string
}
type Base64Options = {
	urlSafe?: boolean,
	padding?: boolean,
	customCharset?: string
}
type HexOptions = {
	format?: 'lowercase' | 'uppercase' | 'no-prefix',
	separator?: string,
	prefix?: string
}

export type TransformOptionsMap = {
	[TransformationType.NO_TRANSFORMATION]: NoOptions
	[TransformationType.CAESAR]: CaesarOptions
	[TransformationType.BASE64]: Base64Options
	[TransformationType.HEX]: HexOptions
}

type TransformOptions<T extends TransformationType> = TransformOptionsMap[T]

const noTransformation = (text: string, _opts: NoOptions): string => text
const caesarFunc = (text: string, opts: CaesarOptions): string => caesarTransformation(text, opts)
const base64Func = (text: string, opts: Base64Options): string => base64Transformation(text, opts)
const hexFunc = (text: string, opts: HexOptions): string => hexTransformation(text, opts)

const transformationFunctions = {
	[TransformationType.NO_TRANSFORMATION]: noTransformation,
	[TransformationType.CAESAR]: caesarFunc,
	[TransformationType.BASE64]: base64Func,
	[TransformationType.HEX]: hexFunc,
} as const

export function transformText<T extends TransformationType>(text: string, type: T, options?: TransformOptions<T>): string {
	if (!text.trim()) return ''

	try {
		// TypeScript cannot perfectly infer the call signature for the object map here;
		// we safely cast options to any for the internal call while keeping the public API typed.
		return (transformationFunctions as any)[type](text, options as any)
	} catch (error) {
		return 'Error: Invalid input for this transformation'
	}
}

const caesarTransformation = (text: string, opts: CaesarOptions): string => {
    const shift = opts.shift ?? 3

    return text.split('').map(char => {
        if (char.match(/[a-zA-Z]/)) {
            const isUpper = char === char.toUpperCase()
            const charCode = char.toLowerCase().charCodeAt(0)
            const shifted = ((charCode - 97 + shift) % 26) + 97
            return isUpper ? String.fromCharCode(shifted).toUpperCase() : String.fromCharCode(shifted)
        }
        return char
    }).join('')
}

const hexTransformation = (text: string, opts: HexOptions): string => {
	const format = opts.format ?? 'lowercase'
	const separator = opts.separator ?? ' '
	const prefix = opts.prefix ?? (format === 'no-prefix' ? '' : '0x')
	
	let hexString = text.split('').map(char =>
        char.charCodeAt(0).toString(16).padStart(2, '0')
    ).join(separator)
	
	if (format === 'uppercase') {
		hexString = hexString.toUpperCase()
	}
	
	return prefix + hexString
}

const base64Transformation = (text: string, opts: Base64Options): string => {
	const urlSafe = opts.urlSafe ?? false
	const padding = opts.padding ?? true
	const customCharset = opts.customCharset
	
	if (customCharset && customCharset.length === 64) {
		// Use custom charset for Base64 encoding
		const standardCharset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
		const encoded = btoa(text)
		return encoded.split('').map(char => {
			const index = standardCharset.indexOf(char)
			return index !== -1 ? customCharset[index] : char
		}).join('')
	}
	
	let encoded = btoa(text)
	
	if (urlSafe) {
		encoded = encoded.replace(/\+/g, '-').replace(/\//g, '_')
	}
	
	if (!padding) {
		encoded = encoded.replace(/=/g, '')
	}
	
	return encoded
}
