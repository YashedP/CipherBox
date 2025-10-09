import { TransformationType, type TransformOptions } from "./transformationFunctions";

export type TransformDefaultOptions = {
	[K in TransformationType]: TransformOptions<K>
}

export const defaultTransformationOptions: TransformDefaultOptions = {
    [TransformationType.NO_TRANSFORMATION]: {},
    [TransformationType.CAESAR]: { shift: 3 },
    [TransformationType.BASE64]: {},
    [TransformationType.HEX]: {},
}
