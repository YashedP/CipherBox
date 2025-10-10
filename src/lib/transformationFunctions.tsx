export const TransformationType = {
    NO_TRANSFORMATION: -1,
    CAESAR: 0,
    MONO_ALPHABETIC: 1,
    VIGENERE: 2,
    BASE64: 3,
    HEX: 4,
    RC4: 5,
} as const;

export type TransformationType = typeof TransformationType[keyof typeof TransformationType];

type NoOptions = Record<string, never>
type CaesarOptions = { 
	shift?: number
}
type MonoAlphabeticOptions = {
	key?: string
}
type VigenereOptions = {
	keyword?: string,
	keyLength?: number
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
type RC4Options = {
	key?: string,
	drop?: number
}

export type TransformOptionsMap = {
	[TransformationType.NO_TRANSFORMATION]: NoOptions
	[TransformationType.CAESAR]: CaesarOptions
	[TransformationType.MONO_ALPHABETIC]: MonoAlphabeticOptions
	[TransformationType.VIGENERE]: VigenereOptions
	[TransformationType.BASE64]: Base64Options
	[TransformationType.HEX]: HexOptions
	[TransformationType.RC4]: RC4Options
}

type TransformOptions<T extends TransformationType> = TransformOptionsMap[T]

const noTransformation = (text: string, _opts: NoOptions): string => text
const caesarFunc = (text: string, opts: CaesarOptions): string => caesarTransformation(text, opts)
const monoAlphabeticFunc = (text: string, opts: MonoAlphabeticOptions): string => monoAlphabeticTransformation(text, opts)
const vigenereFunc = (text: string, opts: VigenereOptions): string => vigenereTransformation(text, opts)
const base64Func = (text: string, opts: Base64Options): string => base64Transformation(text, opts)
const hexFunc = (text: string, opts: HexOptions): string => hexTransformation(text, opts)
const rc4Func = (text: string, opts: RC4Options): string => rc4Transformation(text, opts)

const transformationFunctions = {
	[TransformationType.NO_TRANSFORMATION]: noTransformation,
	[TransformationType.CAESAR]: caesarFunc,
	[TransformationType.MONO_ALPHABETIC]: monoAlphabeticFunc,
	[TransformationType.VIGENERE]: vigenereFunc,
	[TransformationType.BASE64]: base64Func,
	[TransformationType.HEX]: hexFunc,
	[TransformationType.RC4]: rc4Func,
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

const monoAlphabeticTransformation = (text: string, opts: MonoAlphabeticOptions): string => {
    const key = opts.key || 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    
    if (key.length !== 26) return text
    
    return text.split('').map(char => {
        if (char.match(/[a-zA-Z]/)) {
            const isUpper = char === char.toUpperCase()
            const charCode = char.toUpperCase().charCodeAt(0)
            const index = charCode - 65
            if (index >= 0 && index < 26) {
                const encrypted = key[index]
                return isUpper ? encrypted : encrypted.toLowerCase()
            }
        }
        return char
    }).join('')
}

const vigenereTransformation = (text: string, opts: VigenereOptions): string => {
    const keyword = opts.keyword || 'KEY'
    const keyLength = opts.keyLength || keyword.length
    
    if (keyword.length < 2) return text
    
    // Use only the first keyLength characters of the keyword
    const effectiveKeyword = keyword.substring(0, keyLength).toUpperCase()
    const key = effectiveKeyword.repeat(Math.ceil(text.length / keyLength))
    
    return text.split('').map((char, index) => {
        if (char.match(/[a-zA-Z]/)) {
            const isUpper = char === char.toUpperCase()
            const charCode = char.toUpperCase().charCodeAt(0)
            const keyCode = key[index].charCodeAt(0)
            const shifted = ((charCode - 65 + keyCode - 65) % 26) + 65
            return isUpper ? String.fromCharCode(shifted) : String.fromCharCode(shifted).toLowerCase()
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

const rc4Transformation = (text: string, opts: RC4Options): string => {
	try {
		const key = opts.key || 'default-key'
		const drop = opts.drop || 0
		
		// Simple RC4 implementation
		const keyBytes = new TextEncoder().encode(key)
		const textBytes = new TextEncoder().encode(text)
		
		// Initialize S-box
		const S = new Array(256)
		for (let i = 0; i < 256; i++) {
			S[i] = i
		}
		
		// Key scheduling
		let j = 0
		for (let i = 0; i < 256; i++) {
			j = (j + S[i] + keyBytes[i % keyBytes.length]) % 256
			;[S[i], S[j]] = [S[j], S[i]]
		}
		
		// Drop first N bytes if specified
		let i = 0
		j = 0
		for (let k = 0; k < drop; k++) {
			i = (i + 1) % 256
			j = (j + S[i]) % 256
			;[S[i], S[j]] = [S[j], S[i]]
		}
		
		// Encrypt/decrypt
		const result = new Uint8Array(textBytes.length)
		for (let k = 0; k < textBytes.length; k++) {
			i = (i + 1) % 256
			j = (j + S[i]) % 256
			;[S[i], S[j]] = [S[j], S[i]]
			const K = S[(S[i] + S[j]) % 256]
			result[k] = textBytes[k] ^ K
		}
		
		return new TextDecoder().decode(result)
	} catch (error) {
		return 'Error: RC4 cipher requires valid configuration'
	}
}
