import { useState } from 'react'
import LeftPanel from './LeftPanel'
import RightPanel from './RightPanel'

function MainWindow() {
  const [inputText, setInputText] = useState('')
  const [outputText, setOutputText] = useState('')

  return (
    <div className="h-screen w-screen flex flex-col md:flex-row">
      <LeftPanel />
      <RightPanel 
        inputText={inputText}
        outputText={outputText}
        onInputChange={setInputText}
      />
    </div>
  )
}

export default MainWindow
