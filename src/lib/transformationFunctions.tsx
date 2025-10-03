export const TransformationType = {
    NO_TRANSFORMATION: -1,
    CAESAR: 0,
    BASE64: 1,
    HEX: 2,
    BINARY: 3,
    REVERSE: 4,
    UPPERCASE: 5,
    LOWERCASE: 6
} as const

export type TransformationType = typeof TransformationType[keyof typeof TransformationType]

type NoOptions = Record<string, never>
type CaesarOptions = { shift?: number }

type TransformOptionsMap = {
	[TransformationType.NO_TRANSFORMATION]: NoOptions
	[TransformationType.CAESAR]: CaesarOptions
	[TransformationType.BASE64]: NoOptions
	[TransformationType.HEX]: NoOptions
	[TransformationType.BINARY]: NoOptions
	[TransformationType.REVERSE]: NoOptions
	[TransformationType.UPPERCASE]: NoOptions
	[TransformationType.LOWERCASE]: NoOptions
}

export type TransformOptions<T extends TransformationType> = TransformOptionsMap[T]

const noTransformation = (text: string, _opts?: NoOptions): string => text
const caesarTransform = (text: string, opts?: CaesarOptions): string => caesarCipher(text, opts?.shift ?? 3)
const base64Transform = (text: string, _opts?: NoOptions): string => btoa(text)
const hexTransform = (text: string, _opts?: NoOptions): string => textToHex(text)
const binaryTransform = (text: string, _opts?: NoOptions): string => textToBinary(text)
const reverseTextTransform = (text: string, _opts?: NoOptions): string => text.split('').reverse().join('')
const uppercaseTransform = (text: string, _opts?: NoOptions): string => text.toUpperCase()
const lowercaseTransform = (text: string, _opts?: NoOptions): string => text.toLowerCase()

export const transformationFunctions = {
	[TransformationType.NO_TRANSFORMATION]: noTransformation,
	[TransformationType.CAESAR]: caesarTransform,
	[TransformationType.BASE64]: base64Transform,
	[TransformationType.HEX]: hexTransform,
	[TransformationType.BINARY]: binaryTransform,
	[TransformationType.REVERSE]: reverseTextTransform,
	[TransformationType.UPPERCASE]: uppercaseTransform,
	[TransformationType.LOWERCASE]: lowercaseTransform
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

export const caesarCipher = (text: string, shift: number = 3): string => {
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

export const textToHex = (text: string): string => {
    return text.split('').map(char =>
        char.charCodeAt(0).toString(16).padStart(2, '0')
    ).join(' ')
}

export const textToBinary = (text: string): string => {
    return text.split('').map(char =>
        char.charCodeAt(0).toString(2).padStart(8, '0')
    ).join(' ')
}

const caesarReverse = (text: string, opts?: CaesarOptions): string => caesarCipher(text, -(opts?.shift ?? 3))
const base64Reverse = (text: string, _opts?: NoOptions): string => atob(text)
const hexReverse = (text: string, _opts?: NoOptions): string => hexToText(text)
const binaryReverse = (text: string, _opts?: NoOptions): string => binaryToText(text)
const reverseTextReverse = (text: string, _opts?: NoOptions): string => text.split('').reverse().join('')
const uppercaseReverse = (text: string, _opts?: NoOptions): string => text.toLowerCase()
const lowercaseReverse = (text: string, _opts?: NoOptions): string => text.toUpperCase()

export const reverseTransformationFunctions = {
	[TransformationType.NO_TRANSFORMATION]: noTransformation,
	[TransformationType.CAESAR]: caesarReverse,
	[TransformationType.BASE64]: base64Reverse,
	[TransformationType.HEX]: hexReverse,
	[TransformationType.BINARY]: binaryReverse,
	[TransformationType.REVERSE]: reverseTextReverse,
	[TransformationType.UPPERCASE]: uppercaseReverse,
	[TransformationType.LOWERCASE]: lowercaseReverse
} as const

export function reverseTransform<T extends TransformationType>(text: string, type: T, options?: TransformOptions<T>): string {
	if (!text.trim()) return ''

	try {
		return (reverseTransformationFunctions as any)[type](text, options as any)
	} catch (error) {
		return 'Error: Invalid input for reverse transformation'
	}
}

export const hexToText = (hex: string): string => {
    return hex.split(' ')
        .filter(hex => hex.length === 2)
        .map(hex => String.fromCharCode(parseInt(hex, 16)))
        .join('')
}

export const binaryToText = (binary: string): string => {
    return binary.split(' ')
        .filter(bin => bin.length === 8)
        .map(bin => String.fromCharCode(parseInt(bin, 2)))
        .join('')
}

export const transformationDescriptions = {
	[TransformationType.NO_TRANSFORMATION]: 'No transformation (output equals input)',
	[TransformationType.CAESAR]: 'Shift letters by a fixed amount (default: 3 positions)',
	[TransformationType.BASE64]: 'Encode/decode text using Base64 encoding',
	[TransformationType.HEX]: 'Convert text to/from hexadecimal representation',
	[TransformationType.BINARY]: 'Convert text to/from binary representation',
	[TransformationType.REVERSE]: 'Reverse the order of characters',
	[TransformationType.UPPERCASE]: 'Convert all letters to uppercase',
	[TransformationType.LOWERCASE]: 'Convert all letters to lowercase'
} as const

// Get transformation description using array index
export const getTransformationDescription = (type: TransformationType): string => {
	return (transformationDescriptions as any)[type] || 'Unknown transformation'
}
