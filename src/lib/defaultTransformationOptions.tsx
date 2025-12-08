import { TransformationType, type TransformOptionsMap } from "./transformationFunctions";

export const defaultTransformationOptions: TransformOptionsMap = {
    [TransformationType.NO_TRANSFORMATION]: {},
    [TransformationType.CAESAR]: { 
        shift: 3
    },
    [TransformationType.MONO_ALPHABETIC]: {
        key: "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    },
    [TransformationType.VIGENERE]: {
        keyword: "KEY",
        keyLength: 3
    },
    [TransformationType.BASE64]: {
        urlSafe: false,
        padding: true,
        customCharset: ""
    },
    [TransformationType.HEX]: {
        format: 'lowercase',
        separator: ' ',
        prefix: '0x'
    },
    [TransformationType.RC4]: {
        key: 'default-key',
        drop: 0
    },
    [TransformationType.DES]: {
        key: 'default-key',
        mode: 'ECB',
        padding: 'Pkcs7',
        iv: ''
    },
    [TransformationType.AES]: {
        key: 'default-key',
        mode: 'ECB',
        padding: 'Pkcs7',
        iv: ''
    },
    [TransformationType.DES_DECRYPT]: {
        key: 'default-key',
        mode: 'ECB',
        padding: 'Pkcs7',
        iv: ''
    },
    [TransformationType.AES_DECRYPT]: {
        key: 'default-key',
        mode: 'ECB',
        padding: 'Pkcs7',
        iv: ''
    },
    [TransformationType.URL_ENCODE]: {},
    [TransformationType.URL_DECODE]: {},
    [TransformationType.BASE32]: {
        padding: true
    },
    [TransformationType.BASE58]: {
        alphabet: 'bitcoin'
    },
    [TransformationType.BASE85]: {
        variant: 'ascii85'
    },
    [TransformationType.HEX_TO_TEXT]: {},
    [TransformationType.ROT13]: {},
    [TransformationType.HTML_ENCODE]: {},
    [TransformationType.HTML_DECODE]: {},
    [TransformationType.UNICODE_ESCAPE]: {},
    [TransformationType.UNICODE_UNESCAPE]: {},
    [TransformationType.CHACHA20]: {
        key: '0000000000000000000000000000000000000000000000000000000000000000',
        nonce: '000000000000000000000000',
        outputFormat: 'hex'
    },
    [TransformationType.MD5]: {},
    [TransformationType.SHA1]: {},
    [TransformationType.SHA256]: {},
    [TransformationType.SHA384]: {},
    [TransformationType.SHA512]: {},
    [TransformationType.SHA3_256]: {},
    [TransformationType.BLAKE2B]: {},
    [TransformationType.HMAC]: {
        key: 'secret-key',
        algorithm: 'SHA256'
    },
    [TransformationType.RSA_ENCRYPT]: {
        publicKey: '',
        padding: 'PKCS1'
    },
    [TransformationType.RSA_DECRYPT]: {
        privateKey: '',
        padding: 'PKCS1'
    },
    [TransformationType.RSA_SIGN]: {
        privateKey: '',
        algorithm: 'SHA256withRSA'
    },
    [TransformationType.RSA_VERIFY]: {
        publicKey: '',
        signature: '',
        algorithm: 'SHA256withRSA'
    },
    [TransformationType.ECDSA_SIGN]: {
        privateKey: '',
        curve: 'secp256k1'
    },
    [TransformationType.ECDSA_VERIFY]: {
        publicKey: '',
        signature: '',
        curve: 'secp256k1'
    },
    [TransformationType.RSA_KEYGEN]: {
        keySize: 2048
    },
    [TransformationType.ECDSA_KEYGEN]: {
        curve: 'secp256k1'
    },
}
