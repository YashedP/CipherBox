import * as CryptoJS from 'crypto-js'
import * as base32 from 'hi-base32'
import bs58 from 'bs58'
import baseX from 'base-x'
import { encode as base85Encode } from 'base85'

export const TransformationType = {
    NO_TRANSFORMATION: -1,
    CAESAR: 0,
    MONO_ALPHABETIC: 1,
    VIGENERE: 2,
    BASE64: 3,
    HEX: 4,
    RC4: 5,
    DES: 6,
    AES: 7,
    URL_ENCODE: 8,
    URL_DECODE: 9,
    BASE32: 10,
    BASE58: 11,
    BASE85: 12,
    HEX_TO_TEXT: 13,
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
type AESOptions = {
	key?: string,
	mode?: 'ECB' | 'CBC' | 'CFB' | 'OFB' | 'CTR',
	padding?: 'Pkcs7' | 'Iso97971' | 'AnsiX923' | 'Iso10126' | 'ZeroPadding' | 'NoPadding',
	iv?: string
}
type Base32Options = {
	padding?: boolean
}
type Base58Options = {
	alphabet?: 'bitcoin' | 'flickr' | 'ripple'
}
type Base85Options = {
	variant?: 'ascii85' | 'z85'
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
	[TransformationType.AES]: AESOptions
	[TransformationType.URL_ENCODE]: NoOptions
	[TransformationType.URL_DECODE]: NoOptions
	[TransformationType.BASE32]: Base32Options
	[TransformationType.BASE58]: Base58Options
	[TransformationType.BASE85]: Base85Options
	[TransformationType.HEX_TO_TEXT]: NoOptions
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
const aesFunc = (text: string, opts: AESOptions): string => aesTransformation(text, opts)
const urlEncodeFunc = (text: string, _opts: NoOptions): string => urlEncodeTransformation(text)
const urlDecodeFunc = (text: string, _opts: NoOptions): string => urlDecodeTransformation(text)
const base32Func = (text: string, opts: Base32Options): string => base32Transformation(text, opts)
const base58Func = (text: string, opts: Base58Options): string => base58Transformation(text, opts)
const base85Func = (text: string, opts: Base85Options): string => base85Transformation(text, opts)
const hexToTextFunc = (text: string, _opts: NoOptions): string => hexToTextTransformation(text)

const transformationFunctions = {
	[TransformationType.NO_TRANSFORMATION]: noTransformation,
	[TransformationType.CAESAR]: caesarFunc,
	[TransformationType.MONO_ALPHABETIC]: monoAlphabeticFunc,
	[TransformationType.VIGENERE]: vigenereFunc,
	[TransformationType.BASE64]: base64Func,
	[TransformationType.HEX]: hexFunc,
	[TransformationType.RC4]: rc4Func,
	[TransformationType.DES]: desFunc,
	[TransformationType.AES]: aesFunc,
	[TransformationType.URL_ENCODE]: urlEncodeFunc,
	[TransformationType.URL_DECODE]: urlDecodeFunc,
	[TransformationType.BASE32]: base32Func,
	[TransformationType.BASE58]: base58Func,
	[TransformationType.BASE85]: base85Func,
	[TransformationType.HEX_TO_TEXT]: hexToTextFunc,
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
				throw new Error('Invalid mode of operation')
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
				throw new Error('Invalid padding scheme')
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

const aesTransformation = (text: string, opts: AESOptions): string => {
	try {
		const key = opts.key || 'default-key'
		const mode = opts.mode || 'ECB'
		const padding = opts.padding || 'Pkcs7'
		const iv = opts.iv
		
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
				throw new Error('Invalid mode of operation')
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
				throw new Error('Invalid padding scheme')
		}
		
		// Prepare key and IV
		const keyWordArray = CryptoJS.enc.Utf8.parse(key)
		const ivWordArray = iv ? CryptoJS.enc.Hex.parse(iv) : undefined
		
		// Encrypt the text
		const encrypted = CryptoJS.AES.encrypt(text, keyWordArray, {
			mode: cryptoMode,
			padding: cryptoPadding,
			iv: ivWordArray
		})
		
		return encrypted.toString()
		
	} catch (error) {
		return 'Error: AES encryption failed - ' + (error as Error).message
	}
}

const urlEncodeTransformation = (text: string): string => {
	try {
		return encodeURIComponent(text)
	} catch (error) {
		return 'Error: URL encoding failed - ' + (error as Error).message
	}
}

const urlDecodeTransformation = (text: string): string => {
	try {
		return decodeURIComponent(text)
	} catch (error) {
		return 'Error: URL decoding failed - ' + (error as Error).message
	}
}

const base32Transformation = (text: string, opts: Base32Options): string => {
	try {
		const padding = opts.padding ?? true
		const encoded = base32.encode(text)
		return padding ? encoded : encoded.replace(/=/g, '')
	} catch (error) {
		return 'Error: Base32 encoding failed - ' + (error as Error).message
	}
}

const base58Transformation = (text: string, opts: Base58Options): string => {
	try {
		const alphabet = opts.alphabet ?? 'bitcoin'
		
		// Define different Base58 alphabets
		const alphabets = {
			bitcoin: '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz',
			flickr: '123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ',
			ripple: 'rpshnaf39wBUDNEGHJKLM4PQRST7VWXYZ2bcdeCg65jkm8oFqi1tuvAxyz'
		}
		
		// Convert string to Uint8Array
		const encoder = new TextEncoder()
		const bytes = encoder.encode(text)
		
		// Use the selected alphabet
		if (alphabet === 'bitcoin') {
			// Use the optimized bs58 library for Bitcoin alphabet
			return bs58.encode(bytes)
		} else {
			// Use base-x for custom alphabets
			const customBase58 = baseX(alphabets[alphabet])
			return customBase58.encode(bytes)
		}
	} catch (error) {
		return 'Error: Base58 encoding failed - ' + (error as Error).message
	}
}

const base85Transformation = (text: string, opts: Base85Options): string => {
	try {
		const variant = opts.variant ?? 'ascii85'
		
		if (variant === 'ascii85') {
			const encoded = base85Encode(text)
			return '<~' + encoded + '~>'
		} else {
			// z85 variant
			return base85Encode(text)
		}
	} catch (error) {
		return 'Error: Base85 encoding failed - ' + (error as Error).message
	}
}

const hexToTextTransformation = (text: string): string => {
	try {
		// Remove common prefixes and separators
		let cleanHex = text.replace(/^0x/i, '').replace(/\s+/g, '').replace(/[:-]/g, '')
		
		// Validate that we have valid hex characters
		if (!/^[0-9A-Fa-f]*$/.test(cleanHex)) {
			return 'Error: Invalid hexadecimal input'
		}
		
		// Ensure even length (each character is represented by 2 hex digits)
		if (cleanHex.length % 2 !== 0) {
			return 'Error: Hexadecimal string must have an even number of characters'
		}
		
		// Convert hex pairs to characters
		let result = ''
		for (let i = 0; i < cleanHex.length; i += 2) {
			const hexByte = cleanHex.substring(i, i + 2)
			const charCode = parseInt(hexByte, 16)
			result += String.fromCharCode(charCode)
		}
		
		return result
	} catch (error) {
		return 'Error: Hex to text conversion failed - ' + (error as Error).message
	}
}
