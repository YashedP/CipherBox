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
}
