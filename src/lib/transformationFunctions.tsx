import * as CryptoJS from 'crypto-js'
import * as base32 from 'hi-base32'
import bs58 from 'bs58'
import baseX from 'base-x'
import { encode as base85Encode } from 'base85'
import { encode as htmlEncode, decode as htmlDecode } from 'html-entities'
import { chacha20 } from '@noble/ciphers/chacha.js'
import { hexToBytes, bytesToHex } from '@noble/ciphers/utils.js'
import { blake2b } from '@noble/hashes/blake2.js'
import { sha256 } from '@noble/hashes/sha2.js'
import * as rs from 'jsrsasign'
import { secp256k1 } from '@noble/curves/secp256k1.js'
import { p256, p384 } from '@noble/curves/nist.js'

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
    ROT13: 14,
    HTML_ENCODE: 15,
    HTML_DECODE: 16,
    UNICODE_ESCAPE: 17,
    UNICODE_UNESCAPE: 18,
    CHACHA20: 19,
    MD5: 20,
    SHA1: 21,
    SHA256: 22,
    SHA384: 23,
    SHA512: 24,
    SHA3_256: 25,
    BLAKE2B: 26,
    HMAC: 27,
    RSA_ENCRYPT: 28,
    RSA_DECRYPT: 29,
    RSA_SIGN: 30,
    RSA_VERIFY: 31,
    ECDSA_SIGN: 32,
    ECDSA_VERIFY: 33,
    RSA_KEYGEN: 34,
    ECDSA_KEYGEN: 35,
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
type ChaCha20Options = {
	key?: string,
	nonce?: string,
	outputFormat?: 'hex' | 'base64'
}
type HMACOptions = {
	key?: string,
	algorithm?: 'MD5' | 'SHA1' | 'SHA256' | 'SHA384' | 'SHA512'
}
type RSAEncryptOptions = {
	publicKey?: string,
	padding?: 'PKCS1' | 'OAEP'
}
type RSADecryptOptions = {
	privateKey?: string,
	padding?: 'PKCS1' | 'OAEP'
}
type RSASignOptions = {
	privateKey?: string,
	algorithm?: 'SHA256withRSA' | 'SHA512withRSA'
}
type RSAVerifyOptions = {
	publicKey?: string,
	signature?: string,
	algorithm?: 'SHA256withRSA' | 'SHA512withRSA'
}
type ECDSASignOptions = {
	privateKey?: string,
	curve?: 'secp256k1' | 'P-256' | 'P-384'
}
type ECDSAVerifyOptions = {
	publicKey?: string,
	signature?: string,
	curve?: 'secp256k1' | 'P-256' | 'P-384'
}
type RSAKeygenOptions = {
	keySize?: 1024 | 2048 | 4096
}
type ECDSAKeygenOptions = {
	curve?: 'secp256k1' | 'P-256' | 'P-384'
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
	[TransformationType.ROT13]: NoOptions
	[TransformationType.HTML_ENCODE]: NoOptions
	[TransformationType.HTML_DECODE]: NoOptions
	[TransformationType.UNICODE_ESCAPE]: NoOptions
	[TransformationType.UNICODE_UNESCAPE]: NoOptions
	[TransformationType.CHACHA20]: ChaCha20Options
	[TransformationType.MD5]: NoOptions
	[TransformationType.SHA1]: NoOptions
	[TransformationType.SHA256]: NoOptions
	[TransformationType.SHA384]: NoOptions
	[TransformationType.SHA512]: NoOptions
	[TransformationType.SHA3_256]: NoOptions
	[TransformationType.BLAKE2B]: NoOptions
	[TransformationType.HMAC]: HMACOptions
	[TransformationType.RSA_ENCRYPT]: RSAEncryptOptions
	[TransformationType.RSA_DECRYPT]: RSADecryptOptions
	[TransformationType.RSA_SIGN]: RSASignOptions
	[TransformationType.RSA_VERIFY]: RSAVerifyOptions
	[TransformationType.ECDSA_SIGN]: ECDSASignOptions
	[TransformationType.ECDSA_VERIFY]: ECDSAVerifyOptions
	[TransformationType.RSA_KEYGEN]: RSAKeygenOptions
	[TransformationType.ECDSA_KEYGEN]: ECDSAKeygenOptions
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
const rot13Func = (text: string, _opts: NoOptions): string => rot13Transformation(text)
const htmlEncodeFunc = (text: string, _opts: NoOptions): string => htmlEncodeTransformation(text)
const htmlDecodeFunc = (text: string, _opts: NoOptions): string => htmlDecodeTransformation(text)
const unicodeEscapeFunc = (text: string, _opts: NoOptions): string => unicodeEscapeTransformation(text)
const unicodeUnescapeFunc = (text: string, _opts: NoOptions): string => unicodeUnescapeTransformation(text)
const chacha20Func = (text: string, opts: ChaCha20Options): string => chacha20Transformation(text, opts)
const md5Func = (text: string, _opts: NoOptions): string => md5Transformation(text)
const sha1Func = (text: string, _opts: NoOptions): string => sha1Transformation(text)
const sha256Func = (text: string, _opts: NoOptions): string => sha256Transformation(text)
const sha384Func = (text: string, _opts: NoOptions): string => sha384Transformation(text)
const sha512Func = (text: string, _opts: NoOptions): string => sha512Transformation(text)
const sha3_256Func = (text: string, _opts: NoOptions): string => sha3_256Transformation(text)
const blake2bFunc = (text: string, _opts: NoOptions): string => blake2bTransformation(text)
const hmacFunc = (text: string, opts: HMACOptions): string => hmacTransformation(text, opts)
const rsaEncryptFunc = (text: string, opts: RSAEncryptOptions): string => rsaEncryptTransformation(text, opts)
const rsaDecryptFunc = (text: string, opts: RSADecryptOptions): string => rsaDecryptTransformation(text, opts)
const rsaSignFunc = (text: string, opts: RSASignOptions): string => rsaSignTransformation(text, opts)
const rsaVerifyFunc = (text: string, opts: RSAVerifyOptions): string => rsaVerifyTransformation(text, opts)
const ecdsaSignFunc = (text: string, opts: ECDSASignOptions): string => ecdsaSignTransformation(text, opts)
const ecdsaVerifyFunc = (text: string, opts: ECDSAVerifyOptions): string => ecdsaVerifyTransformation(text, opts)
const rsaKeygenFunc = (text: string, opts: RSAKeygenOptions): string => rsaKeygenTransformation(text, opts)
const ecdsaKeygenFunc = (text: string, opts: ECDSAKeygenOptions): string => ecdsaKeygenTransformation(text, opts)

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
	[TransformationType.ROT13]: rot13Func,
	[TransformationType.HTML_ENCODE]: htmlEncodeFunc,
	[TransformationType.HTML_DECODE]: htmlDecodeFunc,
	[TransformationType.UNICODE_ESCAPE]: unicodeEscapeFunc,
	[TransformationType.UNICODE_UNESCAPE]: unicodeUnescapeFunc,
	[TransformationType.CHACHA20]: chacha20Func,
	[TransformationType.MD5]: md5Func,
	[TransformationType.SHA1]: sha1Func,
	[TransformationType.SHA256]: sha256Func,
	[TransformationType.SHA384]: sha384Func,
	[TransformationType.SHA512]: sha512Func,
	[TransformationType.SHA3_256]: sha3_256Func,
	[TransformationType.BLAKE2B]: blake2bFunc,
	[TransformationType.HMAC]: hmacFunc,
	[TransformationType.RSA_ENCRYPT]: rsaEncryptFunc,
	[TransformationType.RSA_DECRYPT]: rsaDecryptFunc,
	[TransformationType.RSA_SIGN]: rsaSignFunc,
	[TransformationType.RSA_VERIFY]: rsaVerifyFunc,
	[TransformationType.ECDSA_SIGN]: ecdsaSignFunc,
	[TransformationType.ECDSA_VERIFY]: ecdsaVerifyFunc,
	[TransformationType.RSA_KEYGEN]: rsaKeygenFunc,
	[TransformationType.ECDSA_KEYGEN]: ecdsaKeygenFunc,
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

const rot13Transformation = (text: string): string => {
	try {
		// ROT13: shift each letter by 13 positions (self-inverse)
		return text.replace(/[a-zA-Z]/g, (char) => {
			const base = char <= 'Z' ? 65 : 97
			return String.fromCharCode(((char.charCodeAt(0) - base + 13) % 26) + base)
		})
	} catch (error) {
		return 'Error: ROT13 transformation failed - ' + (error as Error).message
	}
}

const htmlEncodeTransformation = (text: string): string => {
	try {
		// Encode special characters to HTML entities
		return htmlEncode(text)
	} catch (error) {
		return 'Error: HTML encoding failed - ' + (error as Error).message
	}
}

const htmlDecodeTransformation = (text: string): string => {
	try {
		// Decode HTML entities back to characters
		return htmlDecode(text)
	} catch (error) {
		return 'Error: HTML decoding failed - ' + (error as Error).message
	}
}

const unicodeEscapeTransformation = (text: string): string => {
	try {
		// Convert each character to \uXXXX format
		return text.split('').map(char => {
			const code = char.charCodeAt(0)
			return '\\u' + code.toString(16).padStart(4, '0')
		}).join('')
	} catch (error) {
		return 'Error: Unicode escape encoding failed - ' + (error as Error).message
	}
}

const unicodeUnescapeTransformation = (text: string): string => {
	try {
		// Decode \uXXXX sequences back to characters
		return text.replace(/\\u([0-9A-Fa-f]{4})/g, (_match, hex) => {
			return String.fromCharCode(parseInt(hex, 16))
		})
	} catch (error) {
		return 'Error: Unicode unescape decoding failed - ' + (error as Error).message
	}
}

const chacha20Transformation = (text: string, opts: ChaCha20Options): string => {
	try {
		const key = opts.key || '0000000000000000000000000000000000000000000000000000000000000000'
		const nonce = opts.nonce || '000000000000000000000000'
		const outputFormat = opts.outputFormat || 'hex'
		
		// Convert hex strings to Uint8Array
		const keyBytes = hexToBytes(key)
		const nonceBytes = hexToBytes(nonce)
		
		// Convert text to bytes
		const textEncoder = new TextEncoder()
		const textBytes = textEncoder.encode(text)
		
		// Encrypt using ChaCha20 (takes key, nonce, and plaintext as arguments)
		const encrypted = chacha20(keyBytes, nonceBytes, textBytes)
		
		// Output in requested format
		if (outputFormat === 'base64') {
			// Convert to base64
			return btoa(String.fromCharCode(...encrypted))
		} else {
			// Convert to hex (default)
			return bytesToHex(encrypted)
		}
	} catch (error) {
		return 'Error: ChaCha20 encryption failed - ' + (error as Error).message
	}
}

const md5Transformation = (text: string): string => {
	try {
		return CryptoJS.MD5(text).toString()
	} catch (error) {
		return 'Error: MD5 hashing failed - ' + (error as Error).message
	}
}

const sha1Transformation = (text: string): string => {
	try {
		return CryptoJS.SHA1(text).toString()
	} catch (error) {
		return 'Error: SHA1 hashing failed - ' + (error as Error).message
	}
}

const sha256Transformation = (text: string): string => {
	try {
		return CryptoJS.SHA256(text).toString()
	} catch (error) {
		return 'Error: SHA256 hashing failed - ' + (error as Error).message
	}
}

const sha384Transformation = (text: string): string => {
	try {
		return CryptoJS.SHA384(text).toString()
	} catch (error) {
		return 'Error: SHA384 hashing failed - ' + (error as Error).message
	}
}

const sha512Transformation = (text: string): string => {
	try {
		return CryptoJS.SHA512(text).toString()
	} catch (error) {
		return 'Error: SHA512 hashing failed - ' + (error as Error).message
	}
}

const sha3_256Transformation = (text: string): string => {
	try {
		return CryptoJS.SHA3(text, { outputLength: 256 }).toString()
	} catch (error) {
		return 'Error: SHA3-256 hashing failed - ' + (error as Error).message
	}
}

const blake2bTransformation = (text: string): string => {
	try {
		// Convert text to bytes
		const textEncoder = new TextEncoder()
		const textBytes = textEncoder.encode(text)
		
		// Hash using BLAKE2b
		const hash = blake2b(textBytes)
		
		// Convert to hex string
		const hashArray: number[] = Array.from(hash)
		return hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('')
	} catch (error) {
		return 'Error: BLAKE2b hashing failed - ' + (error as Error).message
	}
}

const hmacTransformation = (text: string, opts: HMACOptions): string => {
	try {
		const key = opts.key || 'secret-key'
		const algorithm = opts.algorithm || 'SHA256'
		
		// Use crypto-js HMAC functions based on selected algorithm
		switch (algorithm) {
			case 'MD5':
				return CryptoJS.HmacMD5(text, key).toString()
			case 'SHA1':
				return CryptoJS.HmacSHA1(text, key).toString()
			case 'SHA256':
				return CryptoJS.HmacSHA256(text, key).toString()
			case 'SHA384':
				return CryptoJS.HmacSHA384(text, key).toString()
			case 'SHA512':
				return CryptoJS.HmacSHA512(text, key).toString()
			default:
				return CryptoJS.HmacSHA256(text, key).toString()
		}
	} catch (error) {
		return 'Error: HMAC generation failed - ' + (error as Error).message
	}
}

const rsaEncryptTransformation = (text: string, opts: RSAEncryptOptions): string => {
	try {
		let publicKey = opts.publicKey || ''
		const padding = opts.padding || 'PKCS1'
		
		if (!publicKey.trim()) {
			return 'Error: Public key is required'
		}
		
		// Extract PEM key if it's embedded in text (e.g., from keygen output)
		// Look for the actual PEM block
		const pemMatch = publicKey.match(/-----BEGIN[\s\S]*?-----END[\s\S]*?-----/)
		if (pemMatch) {
			publicKey = pemMatch[0]
		}
		
		// Parse the key from PEM - should be RSA key
		const keyObj = rs.KEYUTIL.getKey(publicKey) as rs.RSAKey & { n?: rs.BigInteger }
		
		const modulus = keyObj.n
		const keySizeBits = modulus?.bitLength?.()
		if (!keySizeBits) {
			return 'Error: Unable to determine RSA key size'
		}
		
		const keySizeBytes = keySizeBits / 8
		const maxBytes =
			padding === 'OAEP'
				? keySizeBytes - 2 * 20 - 2 // OAEP defaults to SHA-1 in jsrsasign (20-byte hash)
				: keySizeBytes - 11 // PKCS#1 v1.5
		
		if (maxBytes <= 0) {
			return 'Error: Invalid RSA key size or padding combination'
		}
		
		const textBytes = new TextEncoder().encode(text)
		if (textBytes.length > maxBytes) {
			return `Error: Message too long. ${keySizeBits}-bit RSA with ${padding} padding can encrypt up to ${Math.floor(
				maxBytes
			)} bytes (got ${textBytes.length}).`
		}
		
		const encrypted = rs.KJUR.crypto.Cipher.encrypt(text, keyObj, padding === 'OAEP' ? 'RSAOAEP' : 'RSA')
		return encrypted
	} catch (error) {
		return 'Error: RSA encryption failed - ' + (error as Error).message
	}
}

const rsaDecryptTransformation = (text: string, opts: RSADecryptOptions): string => {
	try {
		let privateKey = opts.privateKey || ''
		const padding = opts.padding || 'PKCS1'
		
		if (!privateKey.trim()) {
			return 'Error: Private key is required'
		}
		
		// Extract PEM key if it's embedded in text (e.g., from keygen output)
		// Look for the actual PEM block
		const pemMatch = privateKey.match(/-----BEGIN[\s\S]*?-----END[\s\S]*?-----/)
		if (pemMatch) {
			privateKey = pemMatch[0]
		}
		
		// Parse the key from PEM - should be RSA key
		const keyObj = rs.KEYUTIL.getKey(privateKey) as rs.RSAKey
		
		// Direct RSA decryption
		const decrypted = rs.KJUR.crypto.Cipher.decrypt(text, keyObj, padding === 'OAEP' ? 'RSAOAEP' : 'RSA')
		return decrypted
	} catch (error) {
		return 'Error: RSA decryption failed - ' + (error as Error).message
	}
}

const rsaSignTransformation = (text: string, opts: RSASignOptions): string => {
	try {
		const privateKey = opts.privateKey || ''
		const algorithm = opts.algorithm || 'SHA256withRSA'
		
		if (!privateKey.trim()) {
			return 'Error: Private key is required'
		}
		
		// Create signature object
		const sig = new rs.KJUR.crypto.Signature({ alg: algorithm })
		sig.init(privateKey)
		sig.updateString(text)
		const signature = sig.sign()
		
		return signature
	} catch (error) {
		return 'Error: RSA signing failed - ' + (error as Error).message
	}
}

const rsaVerifyTransformation = (text: string, opts: RSAVerifyOptions): string => {
	try {
		const publicKey = opts.publicKey || ''
		const signature = opts.signature || ''
		const algorithm = opts.algorithm || 'SHA256withRSA'
		
		if (!publicKey.trim()) {
			return 'Error: Public key is required'
		}
		
		if (!signature.trim()) {
			return 'Error: Signature is required for verification'
		}
		
		// Create signature object
		const sig = new rs.KJUR.crypto.Signature({ alg: algorithm })
		sig.init(publicKey)
		sig.updateString(text)
		const isValid = sig.verify(signature)
		
		return isValid ? 'Signature is VALID ✓' : 'Signature is INVALID ✗'
	} catch (error) {
		return 'Error: RSA verification failed - ' + (error as Error).message
	}
}

const ecdsaSignTransformation = (text: string, opts: ECDSASignOptions): string => {
	try {
		const privateKey = opts.privateKey || ''
		const curve = opts.curve || 'secp256k1'
		
		if (!privateKey.trim()) {
			return 'Error: Private key is required'
		}
		
		// Convert private key from hex to bytes
		const privKeyBytes = hexToBytes(privateKey)
		
		// Hash the message first
		const textEncoder = new TextEncoder()
		const msgBytes = textEncoder.encode(text)
		const msgHash = sha256(msgBytes)
		
		// Sign based on curve (sign returns Uint8Array directly)
		let signatureBytes: Uint8Array
		if (curve === 'secp256k1') {
			signatureBytes = secp256k1.sign(msgHash, privKeyBytes)
		} else if (curve === 'P-256') {
			signatureBytes = p256.sign(msgHash, privKeyBytes)
		} else if (curve === 'P-384') {
			signatureBytes = p384.sign(msgHash, privKeyBytes)
		} else {
			return 'Error: Unsupported curve'
		}
		
		// Convert signature to hex
		return bytesToHex(signatureBytes)
	} catch (error) {
		return 'Error: ECDSA signing failed - ' + (error as Error).message
	}
}

const ecdsaVerifyTransformation = (text: string, opts: ECDSAVerifyOptions): string => {
	try {
		const publicKey = opts.publicKey || ''
		const signature = opts.signature || ''
		const curve = opts.curve || 'secp256k1'
		
		if (!publicKey.trim()) {
			return 'Error: Public key is required'
		}
		
		if (!signature.trim()) {
			return 'Error: Signature is required for verification'
		}
		
		// Convert public key and signature from hex to bytes
		const pubKeyBytes = hexToBytes(publicKey)
		const sigBytes = hexToBytes(signature)
		
		// Hash the message first
		const textEncoder = new TextEncoder()
		const msgBytes = textEncoder.encode(text)
		const msgHash = sha256(msgBytes)
		
		// Verify based on curve
		let isValid: boolean
		if (curve === 'secp256k1') {
			isValid = secp256k1.verify(sigBytes, msgHash, pubKeyBytes)
		} else if (curve === 'P-256') {
			isValid = p256.verify(sigBytes, msgHash, pubKeyBytes)
		} else if (curve === 'P-384') {
			isValid = p384.verify(sigBytes, msgHash, pubKeyBytes)
		} else {
			return 'Error: Unsupported curve'
		}
		
		return isValid ? 'Signature is VALID ✓' : 'Signature is INVALID ✗'
	} catch (error) {
		return 'Error: ECDSA verification failed - ' + (error as Error).message
	}
}

const rsaKeygenTransformation = (_text: string, opts: RSAKeygenOptions): string => {
	try {
		const keySize = opts.keySize || 2048
		
		// Generate RSA key pair
		const keypair = rs.KEYUTIL.generateKeypair('RSA', keySize)
		// Get PEM format keys (default format for public key should work with Cipher.encrypt)
		const publicKey = rs.KEYUTIL.getPEM(keypair.pubKeyObj)
		const privateKey = rs.KEYUTIL.getPEM(keypair.prvKeyObj, 'PKCS8PRV')
		
		// Return formatted output with both keys
		return `PUBLIC KEY:\n${publicKey}\n\nPRIVATE KEY:\n${privateKey}`
	} catch (error) {
		return 'Error: RSA key generation failed - ' + (error as Error).message
	}
}

const ecdsaKeygenTransformation = (_text: string, opts: ECDSAKeygenOptions): string => {
	try {
		const curve = opts.curve || 'secp256k1'
		
		// Generate key pair based on curve
		let privKey: Uint8Array
		let pubKey: Uint8Array
		
		if (curve === 'secp256k1') {
			privKey = secp256k1.utils.randomSecretKey()
			pubKey = secp256k1.getPublicKey(privKey)
		} else if (curve === 'P-256') {
			privKey = p256.utils.randomSecretKey()
			pubKey = p256.getPublicKey(privKey)
		} else if (curve === 'P-384') {
			privKey = p384.utils.randomSecretKey()
			pubKey = p384.getPublicKey(privKey)
		} else {
			return 'Error: Unsupported curve'
		}
		
		// Convert to hex
		const privKeyHex = bytesToHex(privKey)
		const pubKeyHex = bytesToHex(pubKey)
		
		return `PRIVATE KEY (hex):\n${privKeyHex}\n\nPUBLIC KEY (hex):\n${pubKeyHex}`
	} catch (error) {
		return 'Error: ECDSA key generation failed - ' + (error as Error).message
	}
}
