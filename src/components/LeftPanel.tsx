import { useState } from 'react'
import { TransformationType, type TransformOptions } from '@/lib/transformationFunctions'
import { Button } from '@/components/ui/button'
import { ButtonGroup } from '@/components/ui/button-group'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Settings } from 'lucide-react'
import { toast } from 'sonner'

interface LeftPanelProps {
  selectedTransformation: TransformationType
  onTransformationChange: (transformation: TransformationType) => void
  options: TransformOptions<TransformationType>
  onOptionsChange: (options: TransformOptions<TransformationType>) => void
}

function LeftPanel({ selectedTransformation, onTransformationChange }: LeftPanelProps) {
  const [caesarDialogOpen, setCaesarDialogOpen] = useState(false)
  const [base64DialogOpen, setBase64DialogOpen] = useState(false)
  const [hexDialogOpen, setHexDialogOpen] = useState(false)
  return (
    <div className="w-full md:w-1/2 h-full bg-gray-50 p-6 overflow-y-auto">
      <div className="space-y-6">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="transformations">
            <AccordionTrigger className="text-[32px] hover:bg-gray-100 hover:text-gray-800 transition-all duration-200 relative">
              Transformations
              <div className="absolute bottom-4 left-0 right-0 h-px bg-gray-300"></div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-wrap gap-2">
                <ButtonGroup className="flex-1 min-w-0">
                  <Button
                    variant={selectedTransformation === TransformationType.CAESAR ? "default" : "outline"}
                    className="flex-1"
                    onClick={() => onTransformationChange(TransformationType.CAESAR)}
                  >
                    Caesar Cipher
                  </Button>
                  <Dialog open={caesarDialogOpen} onOpenChange={setCaesarDialogOpen}>
                    <DialogTrigger asChild>
                      <Button
                        variant={selectedTransformation === TransformationType.CAESAR ? "default" : "outline"}
                        size="icon"
                      >
                        <Settings className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Caesar Cipher Settings</DialogTitle>
                        <DialogDescription>
                          Configure the shift value and other options for the Caesar cipher.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <label htmlFor="shift" className="text-right">
                            Shift Value
                          </label>
                          <input
                            id="shift"
                            type="number"
                            min="1"
                            max="25"
                            defaultValue="3"
                            className="col-span-3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <label htmlFor="custom-alphabet" className="text-right">
                            Custom Alphabet
                          </label>
                          <textarea
                            id="custom-alphabet"
                            placeholder="Enter custom alphabet (optional)"
                            className="col-span-3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[80px]"
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setCaesarDialogOpen(false)}>
                          Cancel
                        </Button>
                        <Button onClick={() => {
                          setCaesarDialogOpen(false)
                          toast.success("Settings saved!")
                        }}>
                          Apply Settings
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </ButtonGroup>
                <ButtonGroup className="flex-1 min-w-0">
                  <Button
                    variant={selectedTransformation === TransformationType.BASE64 ? "default" : "outline"}
                    className="flex-1"
                    onClick={() => onTransformationChange(TransformationType.BASE64)}
                  >
                    Base64
                  </Button>
                  <Dialog open={base64DialogOpen} onOpenChange={setBase64DialogOpen}>
                    <DialogTrigger asChild>
                      <Button
                        variant={selectedTransformation === TransformationType.BASE64 ? "default" : "outline"}
                        size="icon"
                      >
                        <Settings className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px]">
                      <DialogHeader>
                        <DialogTitle>Base64 Settings</DialogTitle>
                        <DialogDescription>
                          Configure Base64 encoding/decoding options and custom settings.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="space-y-4">
                          <div>
                            <label className="text-sm font-medium">Encoding Options</label>
                            <div className="space-y-2 mt-2">
                              <label className="flex items-center space-x-2">
                                <input type="checkbox" defaultChecked className="rounded" />
                                <span className="text-sm">URL-safe encoding</span>
                              </label>
                              <label className="flex items-center space-x-2">
                                <input type="checkbox" className="rounded" />
                                <span className="text-sm">Add padding</span>
                              </label>
                            </div>
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="custom-charset" className="text-right">
                              Custom Charset
                            </label>
                            <textarea
                              id="custom-charset"
                              placeholder="Enter custom Base64 character set (optional)"
                              className="col-span-3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[60px]"
                            />
                          </div>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setBase64DialogOpen(false)}>
                          Cancel
                        </Button>
                        <Button onClick={() => {
                          setBase64DialogOpen(false)
                          toast.success("Settings saved!")
                        }}>
                          Apply Settings
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </ButtonGroup>
                <ButtonGroup className="flex-1 min-w-0">
                  <Button
                    variant={selectedTransformation === TransformationType.HEX ? "default" : "outline"}
                    className="flex-1"
                    onClick={() => onTransformationChange(TransformationType.HEX)}
                  >
                    Hexadecimal
                  </Button>
                  <Dialog open={hexDialogOpen} onOpenChange={setHexDialogOpen}>
                    <DialogTrigger asChild>
                      <Button
                        variant={selectedTransformation === TransformationType.HEX ? "default" : "outline"}
                        size="icon"
                      >
                        <Settings className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px]">
                      <DialogHeader>
                        <DialogTitle>Hexadecimal Settings</DialogTitle>
                        <DialogDescription>
                          Configure hexadecimal encoding/decoding options and format preferences.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="space-y-4">
                          <div>
                            <label className="text-sm font-medium">Format Options</label>
                            <div className="space-y-2 mt-2">
                              <label className="flex items-center space-x-2">
                                <input type="radio" name="hex-format" value="lowercase" defaultChecked />
                                <span className="text-sm">Lowercase (0x1a2b)</span>
                              </label>
                              <label className="flex items-center space-x-2">
                                <input type="radio" name="hex-format" value="uppercase" />
                                <span className="text-sm">Uppercase (0x1A2B)</span>
                              </label>
                              <label className="flex items-center space-x-2">
                                <input type="radio" name="hex-format" value="no-prefix" />
                                <span className="text-sm">No prefix (1a2b)</span>
                              </label>
                            </div>
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="hex-separator" className="text-right">
                              Separator
                            </label>
                            <input
                              id="hex-separator"
                              type="text"
                              placeholder="e.g., : or - (optional)"
                              className="col-span-3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="hex-prefix" className="text-right">
                              Custom Prefix
                            </label>
                            <input
                              id="hex-prefix"
                              type="text"
                              placeholder="e.g., 0x, #, or custom"
                              className="col-span-3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setHexDialogOpen(false)}>
                          Cancel
                        </Button>
                        <Button onClick={() => {
                          setHexDialogOpen(false)
                          toast.success("Settings saved!")
                        }}>
                          Apply Settings
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </ButtonGroup>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  )
}

export default LeftPanel
