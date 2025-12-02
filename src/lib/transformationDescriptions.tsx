import { TransformationType } from "./transformationFunctions"

export const transformationDescriptions = {
	[TransformationType.NO_TRANSFORMATION]: 'No transformation (output equals input)',
	[TransformationType.CAESAR]: 'Shift letters by a fixed amount (default: 3 positions)',
	[TransformationType.MONO_ALPHABETIC]: 'Substitute each letter with another letter using a permutation key',
	[TransformationType.VIGENERE]: 'Use a keyword to shift letters with varying amounts',
	[TransformationType.BASE64]: 'Encode/decode text using Base64 encoding',
	[TransformationType.HEX]: 'Convert text to/from hexadecimal representation',
	[TransformationType.RC4]: 'Stream cipher using RC4 algorithm with configurable key and drop bytes',
	[TransformationType.DES]: 'Data Encryption Standard (DES) with configurable mode, padding, and IV',
	[TransformationType.AES]: 'Advanced Encryption Standard (AES) with configurable mode, padding, and IV',
	[TransformationType.URL_ENCODE]: 'Encode text using URL encoding (percent encoding)',
	[TransformationType.URL_DECODE]: 'Decode URL-encoded text back to original format',
	[TransformationType.BASE32]: 'Binary-to-text encoding using 32-character alphabet (RFC 4648)',
	[TransformationType.BASE58]: 'Binary-to-text encoding avoiding ambiguous characters (used in Bitcoin)',
	[TransformationType.BASE85]: 'Compact binary-to-text encoding (ASCII85)',
	[TransformationType.HEX_TO_TEXT]: 'Decode hexadecimal string back to text',
	[TransformationType.ROT13]: 'Simple substitution cipher that shifts letters by 13 positions (self-inverse)',
	[TransformationType.HTML_ENCODE]: 'Encode special characters to HTML entities (&lt;, &gt;, &amp;, etc.)',
	[TransformationType.HTML_DECODE]: 'Decode HTML entities back to special characters',
	[TransformationType.UNICODE_ESCAPE]: 'Convert characters to Unicode escape sequences (\\uXXXX)',
	[TransformationType.UNICODE_UNESCAPE]: 'Convert Unicode escape sequences back to characters',
	[TransformationType.CHACHA20]: 'Modern stream cipher with 256-bit key; faster than AES on systems without hardware acceleration',
	[TransformationType.MD5]: '128-bit hash (cryptographically broken, use for non-security purposes only)',
	[TransformationType.SHA1]: '160-bit hash (deprecated due to collision attacks)',
	[TransformationType.SHA256]: '256-bit hash from SHA-2 family (widely used and secure)',
	[TransformationType.SHA384]: '384-bit hash from SHA-2 family',
	[TransformationType.SHA512]: '512-bit hash from SHA-2 family',
	[TransformationType.SHA3_256]: '256-bit hash from SHA-3 (Keccak) family',
	[TransformationType.BLAKE2B]: 'Fast cryptographic hash function, faster than MD5/SHA-1/SHA-2',
	[TransformationType.HMAC]: 'Hash-based Message Authentication Code with selectable algorithm',
	[TransformationType.RSA_ENCRYPT]: 'Encrypt data using RSA public key (PKCS#1 v1.5 or OAEP padding)',
	[TransformationType.RSA_DECRYPT]: 'Decrypt data using RSA private key',
	[TransformationType.RSA_SIGN]: 'Create digital signature using RSA private key',
	[TransformationType.RSA_VERIFY]: 'Verify digital signature using RSA public key',
	[TransformationType.ECDSA_SIGN]: 'Create ECDSA signature using elliptic curve private key',
	[TransformationType.ECDSA_VERIFY]: 'Verify ECDSA signature using elliptic curve public key',
	[TransformationType.RSA_KEYGEN]: 'Generate RSA public/private key pair (PEM format)',
	[TransformationType.ECDSA_KEYGEN]: 'Generate ECDSA public/private key pair (hex format)',
} as const

// Get transformation description using array index
export const getTransformationDescription = (type: TransformationType): string => {
	return (transformationDescriptions as any)[type] || 'Unknown transformation'
}
