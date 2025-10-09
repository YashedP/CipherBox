import { useState, useEffect } from 'react'
import LeftPanel from './LeftPanel'
import RightPanel from './RightPanel'
import { transformText, TransformationType } from '@/lib/transformationFunctions'
import { defaultTransformationOptions } from "@/lib/defaultTransformationOptions"
import Header from './Header'
import { Toaster } from '@/components/ui/sonner'

function MainWindow() {
  const [inputText, setInputText] = useState('')
  const [outputText, setOutputText] = useState('')
  const [selectedTransformation, setSelectedTransformation] = useState<TransformationType>(TransformationType.NO_TRANSFORMATION)
  const [options, setOptions] = useState(defaultTransformationOptions)

  useEffect(() => {
    const transformed = transformText(inputText, selectedTransformation, options[selectedTransformation])
    setOutputText(transformed)
  }, [inputText, selectedTransformation, options])

  return (
    <div className="h-screen w-screen flex flex-col">
      <Header />
      <div className="flex-1 flex flex-col md:flex-row">
      <LeftPanel
          selectedTransformation={selectedTransformation}
          onTransformationChange={setSelectedTransformation}
          options={options}
          onOptionsChange={setOptions}
        />
        <RightPanel
          inputText={inputText}
          outputText={outputText}
          onInputChange={setInputText}
        />
      </div>
      <Toaster />
    </div>
  )
}

export default MainWindow
