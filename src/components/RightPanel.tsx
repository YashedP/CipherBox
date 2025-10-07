import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import { Textarea } from '@/components/ui/textarea'

interface RightPanelProps {
  inputText: string
  outputText: string
  onInputChange: (text: string) => void
}

function RightPanel({ inputText, outputText, onInputChange }: RightPanelProps) {
  return (
    <div className="w-full md:w-1/2 h-full">
      <ResizablePanelGroup direction="vertical" className="h-full">
        <ResizablePanel defaultSize={50} minSize={20}>
          <div className="h-full p-2 bg-white">
            <Textarea
              className="w-full h-full resize-none rounded-none border border-gray-200 bg-gray-50"
              placeholder="Enter your text here..."
              value={inputText}
              onChange={(e) => onInputChange(e.target.value)}
            />
          </div>
        </ResizablePanel>

        <ResizableHandle withHandle tabIndex={-1} />

        <ResizablePanel defaultSize={50} minSize={20}>
          <div className="h-full p-2 bg-white">
            <Textarea
              className="w-full h-full resize-none bg-muted rounded-none border border-gray-200 select-text"
              readOnly
              placeholder="Transformed text will appear here..."
              value={outputText}
            />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}

export default RightPanel
