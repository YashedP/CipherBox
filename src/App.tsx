import { useState } from 'react'
import './App.css'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import { Textarea } from '@/components/ui/textarea'

function App() {
  const [inputText, setInputText] = useState('')
  const [outputText, setOutputText] = useState('')

  return (
    <div className="h-screen w-screen flex flex-col md:flex-row">
      {/* Left Panel - Full width on mobile, 50% on desktop */}
      <div className="w-full md:w-1/2 h-1/2 md:h-full bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">CipherBox</h1>
          <p className="text-gray-600">Your encryption/decryption toolkit</p>
        </div>
      </div>

      {/* Right Panel - Resizable Input/Output Split */}
      <div className="w-full md:w-1/2 h-1/2 md:h-full">
        <ResizablePanelGroup direction="vertical" className="h-full">
          <ResizablePanel defaultSize={50}>
            <div className="h-full p-4 flex flex-col">
              <label className="block text-sm font-bold text-center text-gray-700 mb-2">
                Input
              </label>
              <Textarea 
                className="w-full flex-1 resize-none rounded-none border border-gray-200"
                placeholder="Input text here..." 
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
            </div>
          </ResizablePanel>

          <ResizableHandle withHandle tabIndex={-1} />

          <ResizablePanel defaultSize={50}>
            <div className="h-full p-4 flex flex-col">
              <label className="block text-sm font-bold text-center text-gray-700 mb-2">
                Output
              </label>
              <Textarea 
                className="w-full flex-1 resize-none bg-muted rounded-none border border-gray-200 select-text" 
                readOnly 
                placeholder="Output will appear here..." 
                value={outputText}
                tabIndex={-1}
              />
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  )
}

export default App
