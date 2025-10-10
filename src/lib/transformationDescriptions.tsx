import { TransformationType } from "./transformationFunctions"

export const transformationDescriptions = {
	[TransformationType.NO_TRANSFORMATION]: 'No transformation (output equals input)',
	[TransformationType.CAESAR]: 'Shift letters by a fixed amount (default: 3 positions)',
	[TransformationType.MONO_ALPHABETIC]: 'Substitute each letter with another letter using a permutation key',
	[TransformationType.VIGENERE]: 'Use a keyword to shift letters with varying amounts',
	[TransformationType.BASE64]: 'Encode/decode text using Base64 encoding',
	[TransformationType.HEX]: 'Convert text to/from hexadecimal representation',
} as const

// Get transformation description using array index
export const getTransformationDescription = (type: TransformationType): string => {
	return (transformationDescriptions as any)[type] || 'Unknown transformation'
}
