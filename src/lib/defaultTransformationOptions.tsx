import { TransformationType, type TransformOptionsMap } from "./transformationFunctions";

export const defaultTransformationOptions: TransformOptionsMap = {
    [TransformationType.NO_TRANSFORMATION]: {},
    [TransformationType.CAESAR]: { 
        shift: 3, 
        customAlphabet: ""
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
}
