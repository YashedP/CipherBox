import * as CryptoJS from 'crypto-js'

export const TransformationType = {
    NO_TRANSFORMATION: -1,
    CAESAR: 0,
    MONO_ALPHABETIC: 1,
    VIGENERE: 2,
    BASE64: 3,
    HEX: 4,
    RC4: 5,
    DES: 6,
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
type DESOptions = {
	key?: string,
	mode?: 'ECB' | 'CBC' | 'CFB' | 'OFB' | 'CTR',
	padding?: 'Pkcs7' | 'Iso97971' | 'AnsiX923' | 'Iso10126' | 'ZeroPadding' | 'NoPadding',
	iv?: string
}

export type TransformOptionsMap = {
	[TransformationType.NO_TRANSFORMATION]: NoOptions
	[TransformationType.CAESAR]: CaesarOptions
	[TransformationType.MONO_ALPHABETIC]: MonoAlphabeticOptions
	[TransformationType.VIGENERE]: VigenereOptions
	[TransformationType.BASE64]: Base64Options
	[TransformationType.HEX]: HexOptions
	[TransformationType.RC4]: RC4Options
	[TransformationType.DES]: DESOptions
}

type TransformOptions<T extends TransformationType> = TransformOptionsMap[T]

const noTransformation = (text: string, _opts: NoOptions): string => text
const caesarFunc = (text: string, opts: CaesarOptions): string => caesarTransformation(text, opts)
const monoAlphabeticFunc = (text: string, opts: MonoAlphabeticOptions): string => monoAlphabeticTransformation(text, opts)
const vigenereFunc = (text: string, opts: VigenereOptions): string => vigenereTransformation(text, opts)
const base64Func = (text: string, opts: Base64Options): string => base64Transformation(text, opts)
const hexFunc = (text: string, opts: HexOptions): string => hexTransformation(text, opts)
const rc4Func = (text: string, opts: RC4Options): string => rc4Transformation(text, opts)
const desFunc = (text: string, opts: DESOptions): string => desTransformation(text, opts)

const transformationFunctions = {
	[TransformationType.NO_TRANSFORMATION]: noTransformation,
	[TransformationType.CAESAR]: caesarFunc,
	[TransformationType.MONO_ALPHABETIC]: monoAlphabeticFunc,
	[TransformationType.VIGENERE]: vigenereFunc,
	[TransformationType.BASE64]: base64Func,
	[TransformationType.HEX]: hexFunc,
	[TransformationType.RC4]: rc4Func,
	[TransformationType.DES]: desFunc,
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

const desTransformation = (text: string, opts: DESOptions): string => {
	try {
		
		const key = opts.key || 'default-key'
		const mode = opts.mode || 'ECB'
		const padding = opts.padding || 'Pkcs7'
		const iv = opts.iv
		
		// Validate required parameters
		if (!key) {
			return 'Error: DES requires a key'
		}
		
		if (!mode) {
			return 'Error: DES requires a mode of operation'
		}
		
		if (!padding) {
			return 'Error: DES requires a padding scheme'
		}
		
		// Validate IV for non-ECB modes
		if (mode !== 'ECB' && !iv) {
			return 'Error: IV is required for non-ECB modes'
		}
		
		// Validate IV length (8 bytes for DES)
		if (iv && iv.length !== 16) { // 16 hex characters = 8 bytes
			return 'Error: IV must be exactly 8 bytes (16 hex characters)'
		}
		
		// Convert mode string to CryptoJS mode
		let cryptoMode
		switch (mode) {
			case 'ECB':
				cryptoMode = CryptoJS.mode.ECB
				break
			case 'CBC':
				cryptoMode = CryptoJS.mode.CBC
				break
			case 'CFB':
				cryptoMode = CryptoJS.mode.CFB
				break
			case 'OFB':
				cryptoMode = CryptoJS.mode.OFB
				break
			case 'CTR':
				cryptoMode = CryptoJS.mode.CTR
				break
			default:
				return 'Error: Invalid mode of operation'
		}
		
		// Convert padding string to CryptoJS padding
		let cryptoPadding
		switch (padding) {
			case 'Pkcs7':
				cryptoPadding = CryptoJS.pad.Pkcs7
				break
			case 'Iso97971':
				cryptoPadding = CryptoJS.pad.Iso97971
				break
			case 'AnsiX923':
				cryptoPadding = CryptoJS.pad.AnsiX923
				break
			case 'Iso10126':
				cryptoPadding = CryptoJS.pad.Iso10126
				break
			case 'ZeroPadding':
				cryptoPadding = CryptoJS.pad.ZeroPadding
				break
			case 'NoPadding':
				cryptoPadding = CryptoJS.pad.NoPadding
				break
			default:
				return 'Error: Invalid padding scheme'
		}
		
		// Prepare key and IV
		const keyWordArray = CryptoJS.enc.Utf8.parse(key)
		const ivWordArray = iv ? CryptoJS.enc.Hex.parse(iv) : undefined
		
		// Encrypt the text
		const encrypted = CryptoJS.DES.encrypt(text, keyWordArray, {
			mode: cryptoMode,
			padding: cryptoPadding,
			iv: ivWordArray
		})
		
		return encrypted.toString()
		
	} catch (error) {
		return 'Error: DES encryption failed - ' + (error as Error).message
	}
}
