import { TransformationType, type TransformOptionsMap } from "./transformationFunctions";

export const defaultTransformationOptions: TransformOptionsMap = {
    [TransformationType.NO_TRANSFORMATION]: {},
    [TransformationType.CAESAR]: { 
        shift: 3, 
        customAlphabet: ""
    },
    [TransformationType.BASE64]: {},
    [TransformationType.HEX]: {},
}
