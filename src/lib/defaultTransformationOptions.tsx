import { TransformationType, type TransformOptionsMap } from "./transformationFunctions";

export const defaultTransformationOptions: TransformOptionsMap = {
    [TransformationType.NO_TRANSFORMATION]: {},
    [TransformationType.CAESAR]: { shift: 3, customAlphabet: "abcdefghijklmnopqrstuvwxyz" },
    [TransformationType.BASE64]: {},
    [TransformationType.HEX]: {},
}
