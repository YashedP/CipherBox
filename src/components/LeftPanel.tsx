import { TransformationType, type TransformOptions } from '@/lib/transformationFunctions'

interface LeftPanelProps {
  selectedTransformation: TransformationType
  onTransformationChange: (transformation: TransformationType) => void
  options: TransformOptions<TransformationType>
  onOptionsChange: (options: TransformOptions<TransformationType>) => void
}

// The entire list will be wrapped in a shadcn scroll area
// Design, use shadcn tooltip on hover for each transformation type that shows the description of the transformation (Use TooltipProvider, Tooltip, TooltipTrigger, TooltipContent, and source text from transformationDescriptions)
// Have a settings icon on the right side of each transformation type with a settings svg icon which when clicked, opens a shadcn dialog
// When clicked saved in the dialog, the options will be saved and then the transformation will be applied, and an shadcn sonner (toast) will be shown to the user indicating that it has been saved
// Have a decently equally sized button which takes the size of the biggest text in the list of transformation types in a flexbox both horizontally and vertically (Use a vertical list (flex/grid). Each row: button with w-full, fixed vertical size (h-10 or h-12), inline-flex items-center justify-between, so text on left and settings icon on right. This avoids layout shifts if labels differ and is more standard. If truncation is needed, add truncate.)

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
