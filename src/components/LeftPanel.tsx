import { TransformationType, type TransformOptions } from '@/lib/transformationFunctions'

interface LeftPanelProps {
  selectedTransformation: TransformationType
  onTransformationChange: (transformation: TransformationType) => void
  options: TransformOptions<TransformationType>
  onOptionsChange: (options: TransformOptions<TransformationType>) => void
}

function LeftPanel({ }: LeftPanelProps) {
  return (
    <div className="w-full md:w-1/2 h-1/2 md:h-full bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Transformation Type</h1>
        <p className="text-gray-600">Select the transformation type you want to apply</p>
      </div>
    </div>
  )
}

export default LeftPanel

