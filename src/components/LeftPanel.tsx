import { useState } from 'react'
import { TransformationType, type TransformOptionsMap } from '@/lib/transformationFunctions'
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
  options: TransformOptionsMap
  onOptionsChange: (options: TransformOptionsMap) => void
}

function LeftPanel({ selectedTransformation, onTransformationChange, options, onOptionsChange }: LeftPanelProps) {
  const [caesarDialogOpen, setCaesarDialogOpen] = useState(false)
  const [monoAlphabeticDialogOpen, setMonoAlphabeticDialogOpen] = useState(false)
  const [vigenereDialogOpen, setVigenereDialogOpen] = useState(false)
  const [base64DialogOpen, setBase64DialogOpen] = useState(false)
  const [hexDialogOpen, setHexDialogOpen] = useState(false)
  const [rc4DialogOpen, setRc4DialogOpen] = useState(false)
  
  const [caesarForm, setCaesarForm] = useState({
    shift: options[TransformationType.CAESAR].shift
  })
  
  const [monoAlphabeticForm, setMonoAlphabeticForm] = useState({
    key: options[TransformationType.MONO_ALPHABETIC].key
  })
  
  const [vigenereForm, setVigenereForm] = useState({
    keyword: options[TransformationType.VIGENERE].keyword,
    keyLength: options[TransformationType.VIGENERE].keyLength
  })
  
  
  const [base64Form, setBase64Form] = useState({
    urlSafe: options[TransformationType.BASE64].urlSafe,
    padding: options[TransformationType.BASE64].padding,
    customCharset: options[TransformationType.BASE64].customCharset
  })
  
  const [hexForm, setHexForm] = useState({
    format: options[TransformationType.HEX].format,
    separator: options[TransformationType.HEX].separator,
    prefix: options[TransformationType.HEX].prefix
  })
  
  const [rc4Form, setRc4Form] = useState({
    key: options[TransformationType.RC4].key,
    drop: options[TransformationType.RC4].drop
  })
  return (
    <div className="w-full md:w-1/2 h-full bg-gray-50 p-6 overflow-y-auto">
      <div className="space-y-6">
        <Accordion type="multiple" className="w-full" defaultValue={["transformations"]}>
          <AccordionItem value="transformations">
            <AccordionTrigger className="text-[32px] hover:bg-gray-100 hover:text-gray-800 transition-all duration-200 relative">
              Transformations
              <div className="absolute bottom-4 left-0 right-0 h-px bg-gray-300"></div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-3 gap-2">
                <ButtonGroup className="w-full">
                  <Button
                    variant={selectedTransformation === TransformationType.CAESAR ? "default" : "outline"}
                    className="flex-1"
                    onClick={() => onTransformationChange(TransformationType.CAESAR)}
                  >
                    Caesar Cipher
                  </Button>
                  <Dialog open={caesarDialogOpen} onOpenChange={(open) => {
                    setCaesarDialogOpen(open)
                    if (open) {
                      setCaesarForm({
                        shift: options[TransformationType.CAESAR].shift
                      })
                    }
                  }}>
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
                          Configure the shift value for the Caesar cipher.
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
                            value={caesarForm.shift}
                            onChange={(e) => setCaesarForm(prev => ({ ...prev, shift: parseInt(e.target.value)}))}
                            className="col-span-3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setCaesarDialogOpen(false)}>
                          Cancel
                        </Button>
                        <Button onClick={() => {
                          if (!caesarForm.shift) {
                            toast.error("Shift value is required")
                            return
                          }
                          
                          if (caesarForm.shift > 25) {
                            toast.error("Shift value must be less than 25")
                            return
                          }
                          
                          onOptionsChange({
                            ...options,
                            [TransformationType.CAESAR]: {
                              shift: caesarForm.shift
                            }
                          })
                          setCaesarDialogOpen(false)
                          toast.success("Settings saved!")
                        }}>
                          Apply Settings
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </ButtonGroup>
                <ButtonGroup className="w-full">
                  <Button
                    variant={selectedTransformation === TransformationType.MONO_ALPHABETIC ? "default" : "outline"}
                    className="flex-1"
                    onClick={() => onTransformationChange(TransformationType.MONO_ALPHABETIC)}
                  >
                    Mono-alphabetic
                  </Button>
                  <Dialog open={monoAlphabeticDialogOpen} onOpenChange={(open) => {
                    setMonoAlphabeticDialogOpen(open)
                    if (open) {
                      setMonoAlphabeticForm({
                        key: options[TransformationType.MONO_ALPHABETIC].key
                      })
                    }
                  }}>
                    <DialogTrigger asChild>
                      <Button
                        variant={selectedTransformation === TransformationType.MONO_ALPHABETIC ? "default" : "outline"}
                        size="icon"
                      >
                        <Settings className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Mono-alphabetic Cipher Settings</DialogTitle>
                        <DialogDescription>
                          Configure the permutation key for the mono-alphabetic cipher.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <label htmlFor="mono-key" className="text-right">
                            Key
                          </label>
                          <input
                            id="mono-key"
                            type="text"
                            placeholder="ABCDEFGHIJKLMNOPQRSTUVWXYZ"
                            value={monoAlphabeticForm.key}
                            onChange={(e) => setMonoAlphabeticForm(prev => ({ ...prev, key: e.target.value.toUpperCase() }))}
                            className="col-span-3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setMonoAlphabeticDialogOpen(false)}>
                          Cancel
                        </Button>
                        <Button onClick={() => {
                          if (!monoAlphabeticForm.key) {
                            toast.error("Key is required")
                            return
                          }
                          
                          if (monoAlphabeticForm.key.length !== 26) {
                            toast.error("Key must be exactly 26 characters")
                            return
                          }
                          
                          const uniqueChars = new Set(monoAlphabeticForm.key.split(''))
                          if (uniqueChars.size !== 26) {
                            toast.error("Key must contain all 26 letters with no duplicates")
                            return
                          }
                          
                          onOptionsChange({
                            ...options,
                            [TransformationType.MONO_ALPHABETIC]: {
                              key: monoAlphabeticForm.key
                            }
                          })
                          setMonoAlphabeticDialogOpen(false)
                          toast.success("Settings saved!")
                        }}>
                          Apply Settings
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </ButtonGroup>
                <ButtonGroup className="w-full">
                  <Button
                    variant={selectedTransformation === TransformationType.VIGENERE ? "default" : "outline"}
                    className="flex-1"
                    onClick={() => onTransformationChange(TransformationType.VIGENERE)}
                  >
                    Vigenère Cipher
                  </Button>
                  <Dialog open={vigenereDialogOpen} onOpenChange={(open) => {
                    setVigenereDialogOpen(open)
                    if (open) {
                      setVigenereForm({
                        keyword: options[TransformationType.VIGENERE].keyword,
                        keyLength: options[TransformationType.VIGENERE].keyLength
                      })
                    }
                  }}>
                    <DialogTrigger asChild>
                      <Button
                        variant={selectedTransformation === TransformationType.VIGENERE ? "default" : "outline"}
                        size="icon"
                      >
                        <Settings className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Vigenère Cipher Settings</DialogTitle>
                        <DialogDescription>
                          Configure the keyword for the Vigenère cipher.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <label htmlFor="vigenere-keyword" className="text-right">
                            Keyword
                          </label>
                          <input
                            id="vigenere-keyword"
                            type="text"
                            placeholder="Enter keyword"
                            value={vigenereForm.keyword}
                            onChange={(e) => setVigenereForm(prev => ({ ...prev, keyword: e.target.value }))}
                            className="col-span-3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <label htmlFor="vigenere-key-length" className="text-right">
                            Key Length
                          </label>
                          <input
                            id="vigenere-key-length"
                            type="number"
                            min="1"
                            placeholder="Enter key length"
                            value={vigenereForm.keyLength}
                            onChange={(e) => setVigenereForm(prev => ({ ...prev, keyLength: parseInt(e.target.value) || 1 }))}
                            className="col-span-3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setVigenereDialogOpen(false)}>
                          Cancel
                        </Button>
                        <Button onClick={() => {
                          if (!vigenereForm.keyword) {
                            toast.error("Keyword is required")
                            return
                          }
                          
                          if (vigenereForm.keyword.length < 2) {
                            toast.error("Keyword must be at least 2 letters")
                            return
                          }
                          
                          if (!/^[a-zA-Z]+$/.test(vigenereForm.keyword)) {
                            toast.error("Keyword must contain only letters")
                            return
                          }
                          
                          if (!vigenereForm.keyLength) {
                            toast.error("Key length is required")
                            return
                          }
                          
                          if (vigenereForm.keyLength <= 1) {
                            toast.error("Key length must be more than 1")
                            return
                          }
                          
                          if (vigenereForm.keyLength >= vigenereForm.keyword.length) {
                            toast.error("Key length must be less than keyword length")
                            return
                          }
                          
                          onOptionsChange({
                            ...options,
                            [TransformationType.VIGENERE]: {
                              keyword: vigenereForm.keyword,
                              keyLength: vigenereForm.keyLength
                            }
                          })
                          setVigenereDialogOpen(false)
                          toast.success("Settings saved!")
                        }}>
                          Apply Settings
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </ButtonGroup>
                <ButtonGroup className="w-full">
                  <Button
                    variant={selectedTransformation === TransformationType.BASE64 ? "default" : "outline"}
                    className="flex-1"
                    onClick={() => onTransformationChange(TransformationType.BASE64)}
                  >
                    Base64
                  </Button>
                  <Dialog open={base64DialogOpen} onOpenChange={(open) => {
                    setBase64DialogOpen(open)
                    if (open) {
                      setBase64Form({
                        urlSafe: options[TransformationType.BASE64].urlSafe,
                        padding: options[TransformationType.BASE64].padding,
                        customCharset: options[TransformationType.BASE64].customCharset
                      })
                    }
                  }}>
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
                                <input 
                                  type="checkbox" 
                                  checked={base64Form.urlSafe}
                                  onChange={(e) => setBase64Form(prev => ({ ...prev, urlSafe: e.target.checked }))}
                                  className="rounded" 
                                />
                                <span className="text-sm">URL-safe encoding</span>
                              </label>
                              <label className="flex items-center space-x-2">
                                <input 
                                  type="checkbox" 
                                  checked={base64Form.padding}
                                  onChange={(e) => setBase64Form(prev => ({ ...prev, padding: e.target.checked }))}
                                  className="rounded" 
                                />
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
                              placeholder="Enter custom Base64 character set (64 characters, optional)"
                              value={base64Form.customCharset}
                              onChange={(e) => setBase64Form(prev => ({ ...prev, customCharset: e.target.value }))}
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
                          if (base64Form.customCharset && base64Form.customCharset.length !== 64) {
                            toast.error("Custom charset must be exactly 64 characters")
                            return
                          }
                          
                          onOptionsChange({
                            ...options,
                            [TransformationType.BASE64]: {
                              urlSafe: base64Form.urlSafe,
                              padding: base64Form.padding,
                              customCharset: base64Form.customCharset
                            }
                          })
                          setBase64DialogOpen(false)
                          toast.success("Settings saved!")
                        }}>
                          Apply Settings
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </ButtonGroup>
                <ButtonGroup className="w-full">
                  <Button
                    variant={selectedTransformation === TransformationType.HEX ? "default" : "outline"}
                    className="flex-1"
                    onClick={() => onTransformationChange(TransformationType.HEX)}
                  >
                    Hexadecimal
                  </Button>
                  <Dialog open={hexDialogOpen} onOpenChange={(open) => {
                    setHexDialogOpen(open)
                    if (open) {
                      setHexForm({
                        format: options[TransformationType.HEX].format,
                        separator: options[TransformationType.HEX].separator,
                        prefix: options[TransformationType.HEX].prefix
                      })
                    }
                  }}>
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
                                <input 
                                  type="radio" 
                                  name="hex-format" 
                                  value="lowercase" 
                                  checked={hexForm.format === 'lowercase'}
                                  onChange={(e) => setHexForm(prev => ({ ...prev, format: e.target.value as 'lowercase' | 'uppercase' | 'no-prefix' }))}
                                />
                                <span className="text-sm">Lowercase (0x1a2b)</span>
                              </label>
                              <label className="flex items-center space-x-2">
                                <input 
                                  type="radio" 
                                  name="hex-format" 
                                  value="uppercase" 
                                  checked={hexForm.format === 'uppercase'}
                                  onChange={(e) => setHexForm(prev => ({ ...prev, format: e.target.value as 'lowercase' | 'uppercase' | 'no-prefix' }))}
                                />
                                <span className="text-sm">Uppercase (0x1A2B)</span>
                              </label>
                              <label className="flex items-center space-x-2">
                                <input 
                                  type="radio" 
                                  name="hex-format" 
                                  value="no-prefix" 
                                  checked={hexForm.format === 'no-prefix'}
                                  onChange={(e) => setHexForm(prev => ({ ...prev, format: e.target.value as 'lowercase' | 'uppercase' | 'no-prefix' }))}
                                />
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
                              value={hexForm.separator}
                              onChange={(e) => setHexForm(prev => ({ ...prev, separator: e.target.value }))}
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
                              value={hexForm.prefix}
                              onChange={(e) => setHexForm(prev => ({ ...prev, prefix: e.target.value }))}
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
                          onOptionsChange({
                            ...options,
                            [TransformationType.HEX]: {
                              format: hexForm.format,
                              separator: hexForm.separator,
                              prefix: hexForm.prefix
                            }
                          })
                          setHexDialogOpen(false)
                          toast.success("Settings saved!")
                        }}>
                          Apply Settings
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </ButtonGroup>
                <ButtonGroup className="w-full">
                  <Button
                    variant={selectedTransformation === TransformationType.RC4 ? "default" : "outline"}
                    className="flex-1"
                    onClick={() => onTransformationChange(TransformationType.RC4)}
                  >
                    RC4 Cipher
                  </Button>
                  <Dialog open={rc4DialogOpen} onOpenChange={(open) => {
                    setRc4DialogOpen(open)
                    if (open) {
                      setRc4Form({
                        key: options[TransformationType.RC4].key,
                        drop: options[TransformationType.RC4].drop
                      })
                    }
                  }}>
                    <DialogTrigger asChild>
                      <Button
                        variant={selectedTransformation === TransformationType.RC4 ? "default" : "outline"}
                        size="icon"
                      >
                        <Settings className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>RC4 Cipher Settings</DialogTitle>
                        <DialogDescription>
                          Configure the key and drop parameters for the RC4 stream cipher.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <label htmlFor="rc4-key" className="text-right">
                            Key
                          </label>
                          <input
                            id="rc4-key"
                            type="text"
                            placeholder="Enter encryption key"
                            value={rc4Form.key}
                            onChange={(e) => setRc4Form(prev => ({ ...prev, key: e.target.value }))}
                            className="col-span-3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <label htmlFor="rc4-drop" className="text-right">
                            Drop Bytes
                          </label>
                          <input
                            id="rc4-drop"
                            type="number"
                            min="0"
                            placeholder="Number of bytes to drop"
                            value={rc4Form.drop}
                            onChange={(e) => setRc4Form(prev => ({ ...prev, drop: parseInt(e.target.value) || 0 }))}
                            className="col-span-3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setRc4DialogOpen(false)}>
                          Cancel
                        </Button>
                        <Button onClick={() => {
                          if (!rc4Form.key) {
                            toast.error("Key is required")
                            return
                          }
                          
                          if (rc4Form.drop !== undefined && rc4Form.drop < 0) {
                            toast.error("Drop bytes must be 0 or greater")
                            return
                          }
                          
                          onOptionsChange({
                            ...options,
                            [TransformationType.RC4]: {
                              key: rc4Form.key,
                              drop: rc4Form.drop
                            }
                          })
                          setRc4DialogOpen(false)
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
