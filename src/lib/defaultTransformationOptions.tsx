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
}
