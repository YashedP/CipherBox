import { useState } from 'react'
import LeftPanel from './LeftPanel'
import RightPanel from './RightPanel'
import { transformText, TransformationType, type TransformOptions } from '@/lib/transformationFunctions'
import Header from './Header'
import { Toaster } from '@/components/ui/sonner'

function MainWindow() {
  const [inputText, setInputText] = useState('')
  const [outputText, setOutputText] = useState('')
  const [selectedTransformation, setSelectedTransformation] = useState<TransformationType>(TransformationType.NO_TRANSFORMATION)
  const [options, setOptions] = useState<TransformOptions<TransformationType>>({})

  const handleInputChange = (text: string) => {
    setInputText(text)
    const transformed = transformText(text, selectedTransformation, options)
    setOutputText(transformed)
  }

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
          onInputChange={handleInputChange}
        />
      </div>
      <Toaster />
    </div>
  )
}

export default MainWindow
