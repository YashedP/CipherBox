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
  const [desDialogOpen, setDesDialogOpen] = useState(false)
  const [aesDialogOpen, setAesDialogOpen] = useState(false)
  const [urlEncodeDialogOpen, setUrlEncodeDialogOpen] = useState(false)
  const [urlDecodeDialogOpen, setUrlDecodeDialogOpen] = useState(false)
  const [base32DialogOpen, setBase32DialogOpen] = useState(false)
  const [base58DialogOpen, setBase58DialogOpen] = useState(false)
  const [base85DialogOpen, setBase85DialogOpen] = useState(false)
  const [hexToTextDialogOpen, setHexToTextDialogOpen] = useState(false)
  const [rot13DialogOpen, setRot13DialogOpen] = useState(false)
  const [htmlEncodeDialogOpen, setHtmlEncodeDialogOpen] = useState(false)
  const [htmlDecodeDialogOpen, setHtmlDecodeDialogOpen] = useState(false)
  const [unicodeEscapeDialogOpen, setUnicodeEscapeDialogOpen] = useState(false)
  const [unicodeUnescapeDialogOpen, setUnicodeUnescapeDialogOpen] = useState(false)
  const [chacha20DialogOpen, setChacha20DialogOpen] = useState(false)
  const [md5DialogOpen, setMd5DialogOpen] = useState(false)
  const [sha1DialogOpen, setSha1DialogOpen] = useState(false)
  const [sha256DialogOpen, setSha256DialogOpen] = useState(false)
  const [sha384DialogOpen, setSha384DialogOpen] = useState(false)
  const [sha512DialogOpen, setSha512DialogOpen] = useState(false)
  const [sha3_256DialogOpen, setSha3_256DialogOpen] = useState(false)
  const [blake2bDialogOpen, setBlake2bDialogOpen] = useState(false)
  const [hmacDialogOpen, setHmacDialogOpen] = useState(false)
  const [rsaEncryptDialogOpen, setRsaEncryptDialogOpen] = useState(false)
  const [rsaDecryptDialogOpen, setRsaDecryptDialogOpen] = useState(false)
  const [rsaSignDialogOpen, setRsaSignDialogOpen] = useState(false)
  const [rsaVerifyDialogOpen, setRsaVerifyDialogOpen] = useState(false)
  const [ecdsaSignDialogOpen, setEcdsaSignDialogOpen] = useState(false)
  const [ecdsaVerifyDialogOpen, setEcdsaVerifyDialogOpen] = useState(false)
  const [rsaKeygenDialogOpen, setRsaKeygenDialogOpen] = useState(false)
  const [ecdsaKeygenDialogOpen, setEcdsaKeygenDialogOpen] = useState(false)
  
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
  
  const [desForm, setDesForm] = useState({
    key: options[TransformationType.DES].key,
    mode: options[TransformationType.DES].mode,
    padding: options[TransformationType.DES].padding,
    iv: options[TransformationType.DES].iv
  })
  
  const [aesForm, setAesForm] = useState({
    key: options[TransformationType.AES].key,
    mode: options[TransformationType.AES].mode,
    padding: options[TransformationType.AES].padding,
    iv: options[TransformationType.AES].iv
  })
  
  const [base32Form, setBase32Form] = useState({
    padding: options[TransformationType.BASE32].padding
  })
  
  const [base58Form, setBase58Form] = useState({
    alphabet: options[TransformationType.BASE58].alphabet
  })
  
  const [base85Form, setBase85Form] = useState({
    variant: options[TransformationType.BASE85].variant
  })
  
  const [chacha20Form, setChacha20Form] = useState({
    key: options[TransformationType.CHACHA20].key,
    nonce: options[TransformationType.CHACHA20].nonce,
    outputFormat: options[TransformationType.CHACHA20].outputFormat
  })
  
  const [hmacForm, setHmacForm] = useState({
    key: options[TransformationType.HMAC].key,
    algorithm: options[TransformationType.HMAC].algorithm
  })
  
  const [rsaEncryptForm, setRsaEncryptForm] = useState({
    publicKey: options[TransformationType.RSA_ENCRYPT].publicKey,
    padding: options[TransformationType.RSA_ENCRYPT].padding
  })
  
  const [rsaDecryptForm, setRsaDecryptForm] = useState({
    privateKey: options[TransformationType.RSA_DECRYPT].privateKey,
    padding: options[TransformationType.RSA_DECRYPT].padding
  })
  
  const [rsaSignForm, setRsaSignForm] = useState({
    privateKey: options[TransformationType.RSA_SIGN].privateKey,
    algorithm: options[TransformationType.RSA_SIGN].algorithm
  })
  
  const [rsaVerifyForm, setRsaVerifyForm] = useState({
    publicKey: options[TransformationType.RSA_VERIFY].publicKey,
    signature: options[TransformationType.RSA_VERIFY].signature,
    algorithm: options[TransformationType.RSA_VERIFY].algorithm
  })
  
  const [ecdsaSignForm, setEcdsaSignForm] = useState({
    privateKey: options[TransformationType.ECDSA_SIGN].privateKey,
    curve: options[TransformationType.ECDSA_SIGN].curve
  })
  
  const [ecdsaVerifyForm, setEcdsaVerifyForm] = useState({
    publicKey: options[TransformationType.ECDSA_VERIFY].publicKey,
    signature: options[TransformationType.ECDSA_VERIFY].signature,
    curve: options[TransformationType.ECDSA_VERIFY].curve
  })
  
  const [rsaKeygenForm, setRsaKeygenForm] = useState({
    keySize: options[TransformationType.RSA_KEYGEN].keySize
  })
  
  const [ecdsaKeygenForm, setEcdsaKeygenForm] = useState({
    curve: options[TransformationType.ECDSA_KEYGEN].curve
  })
  
  return (
    <div className="w-full md:w-1/2 h-full bg-gray-50 p-6 overflow-y-auto">
      <div className="space-y-6">
        <Accordion type="multiple" className="w-full" defaultValue={["Classical & Simple Ciphers", "Encoders & Text Utilities", "Symmetric Ciphers", "Hashing & MAC", "Assymetric Ciphers"]}>
          <AccordionItem value="Classical & Simple Ciphers">
            <AccordionTrigger className="text-[32px] hover:bg-gray-100 hover:text-gray-800 transition-all duration-200 relative">
              Classical & Simple Ciphers
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
                    variant={selectedTransformation === TransformationType.ROT13 ? "default" : "outline"}
                    className="flex-1"
                    onClick={() => onTransformationChange(TransformationType.ROT13)}
                  >
                    ROT13
                  </Button>
                  <Dialog open={rot13DialogOpen} onOpenChange={setRot13DialogOpen}>
                    <DialogTrigger asChild>
                      <Button
                        variant={selectedTransformation === TransformationType.ROT13 ? "default" : "outline"}
                        size="icon"
                      >
                        <Settings className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>ROT13 Settings</DialogTitle>
                        <DialogDescription>
                          ROT13 is a simple letter substitution cipher that shifts each letter by 13 positions in the alphabet. It is self-inverse, meaning applying ROT13 twice returns the original text. No additional configuration needed.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <Button onClick={() => setRot13DialogOpen(false)}>
                          Close
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </ButtonGroup>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="Encoders & Text Utilities">
            <AccordionTrigger className="text-[32px] hover:bg-gray-100 hover:text-gray-800 transition-all duration-200 relative">
              Encoders & Text Utilities
              <div className="absolute bottom-4 left-0 right-0 h-px bg-gray-300"></div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-3 gap-2">
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
                    variant={selectedTransformation === TransformationType.BASE32 ? "default" : "outline"}
                    className="flex-1"
                    onClick={() => onTransformationChange(TransformationType.BASE32)}
                  >
                    Base32
                  </Button>
                  <Dialog open={base32DialogOpen} onOpenChange={(open) => {
                    setBase32DialogOpen(open)
                    if (open) {
                      setBase32Form({
                        padding: options[TransformationType.BASE32].padding
                      })
                    }
                  }}>
                    <DialogTrigger asChild>
                      <Button
                        variant={selectedTransformation === TransformationType.BASE32 ? "default" : "outline"}
                        size="icon"
                      >
                        <Settings className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Base32 Settings</DialogTitle>
                        <DialogDescription>
                          Configure Base32 encoding options. Base32 uses a 32-character alphabet (RFC 4648).
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
                                  checked={base32Form.padding}
                                  onChange={(e) => setBase32Form(prev => ({ ...prev, padding: e.target.checked }))}
                                  className="rounded" 
                                />
                                <span className="text-sm">Add padding (=)</span>
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setBase32DialogOpen(false)}>
                          Cancel
                        </Button>
                        <Button onClick={() => {
                          onOptionsChange({
                            ...options,
                            [TransformationType.BASE32]: {
                              padding: base32Form.padding
                            }
                          })
                          setBase32DialogOpen(false)
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
                    variant={selectedTransformation === TransformationType.BASE58 ? "default" : "outline"}
                    className="flex-1"
                    onClick={() => onTransformationChange(TransformationType.BASE58)}
                  >
                    Base58
                  </Button>
                  <Dialog open={base58DialogOpen} onOpenChange={(open) => {
                    setBase58DialogOpen(open)
                    if (open) {
                      setBase58Form({
                        alphabet: options[TransformationType.BASE58].alphabet
                      })
                    }
                  }}>
                    <DialogTrigger asChild>
                      <Button
                        variant={selectedTransformation === TransformationType.BASE58 ? "default" : "outline"}
                        size="icon"
                      >
                        <Settings className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Base58 Settings</DialogTitle>
                        <DialogDescription>
                          Configure Base58 encoding options. Base58 avoids ambiguous characters (used in Bitcoin).
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="space-y-4">
                          <div>
                            <label className="text-sm font-medium">Alphabet Variant</label>
                            <div className="space-y-2 mt-2">
                              <label className="flex items-center space-x-2">
                                <input 
                                  type="radio" 
                                  name="base58-alphabet" 
                                  value="bitcoin" 
                                  checked={base58Form.alphabet === 'bitcoin'}
                                  onChange={(e) => setBase58Form(prev => ({ ...prev, alphabet: e.target.value as 'bitcoin' | 'flickr' | 'ripple' }))}
                                />
                                <span className="text-sm">Bitcoin (default)</span>
                              </label>
                              <label className="flex items-center space-x-2">
                                <input 
                                  type="radio" 
                                  name="base58-alphabet" 
                                  value="flickr" 
                                  checked={base58Form.alphabet === 'flickr'}
                                  onChange={(e) => setBase58Form(prev => ({ ...prev, alphabet: e.target.value as 'bitcoin' | 'flickr' | 'ripple' }))}
                                />
                                <span className="text-sm">Flickr</span>
                              </label>
                              <label className="flex items-center space-x-2">
                                <input 
                                  type="radio" 
                                  name="base58-alphabet" 
                                  value="ripple" 
                                  checked={base58Form.alphabet === 'ripple'}
                                  onChange={(e) => setBase58Form(prev => ({ ...prev, alphabet: e.target.value as 'bitcoin' | 'flickr' | 'ripple' }))}
                                />
                                <span className="text-sm">Ripple</span>
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setBase58DialogOpen(false)}>
                          Cancel
                        </Button>
                        <Button onClick={() => {
                          onOptionsChange({
                            ...options,
                            [TransformationType.BASE58]: {
                              alphabet: base58Form.alphabet
                            }
                          })
                          setBase58DialogOpen(false)
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
                    variant={selectedTransformation === TransformationType.BASE85 ? "default" : "outline"}
                    className="flex-1"
                    onClick={() => onTransformationChange(TransformationType.BASE85)}
                  >
                    Base85
                  </Button>
                  <Dialog open={base85DialogOpen} onOpenChange={(open) => {
                    setBase85DialogOpen(open)
                    if (open) {
                      setBase85Form({
                        variant: options[TransformationType.BASE85].variant
                      })
                    }
                  }}>
                    <DialogTrigger asChild>
                      <Button
                        variant={selectedTransformation === TransformationType.BASE85 ? "default" : "outline"}
                        size="icon"
                      >
                        <Settings className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Base85 Settings</DialogTitle>
                        <DialogDescription>
                          Configure Base85 encoding options. Base85 is a more compact encoding than Base64.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="space-y-4">
                          <div>
                            <label className="text-sm font-medium">Encoding Variant</label>
                            <div className="space-y-2 mt-2">
                              <label className="flex items-center space-x-2">
                                <input 
                                  type="radio" 
                                  name="base85-variant" 
                                  value="ascii85" 
                                  checked={base85Form.variant === 'ascii85'}
                                  onChange={(e) => setBase85Form(prev => ({ ...prev, variant: e.target.value as 'ascii85' | 'z85' }))}
                                />
                                <span className="text-sm">ASCII85 (Adobe, with &lt;~ ~&gt; delimiters)</span>
                              </label>
                              <label className="flex items-center space-x-2">
                                <input 
                                  type="radio" 
                                  name="base85-variant" 
                                  value="z85" 
                                  checked={base85Form.variant === 'z85'}
                                  onChange={(e) => setBase85Form(prev => ({ ...prev, variant: e.target.value as 'ascii85' | 'z85' }))}
                                />
                                <span className="text-sm">Z85 (ZeroMQ)</span>
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setBase85DialogOpen(false)}>
                          Cancel
                        </Button>
                        <Button onClick={() => {
                          onOptionsChange({
                            ...options,
                            [TransformationType.BASE85]: {
                              variant: base85Form.variant
                            }
                          })
                          setBase85DialogOpen(false)
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
                    variant={selectedTransformation === TransformationType.HEX_TO_TEXT ? "default" : "outline"}
                    className="flex-1"
                    onClick={() => onTransformationChange(TransformationType.HEX_TO_TEXT)}
                  >
                    Hex to Text
                  </Button>
                  <Dialog open={hexToTextDialogOpen} onOpenChange={setHexToTextDialogOpen}>
                    <DialogTrigger asChild>
                      <Button
                        variant={selectedTransformation === TransformationType.HEX_TO_TEXT ? "default" : "outline"}
                        size="icon"
                      >
                        <Settings className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Hex to Text Settings</DialogTitle>
                        <DialogDescription>
                          Hex to Text decoding converts hexadecimal strings back to their original text format. Accepts hex with or without 0x prefix, and with spaces, colons, or hyphens as separators. No additional configuration needed.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <Button onClick={() => setHexToTextDialogOpen(false)}>
                          Close
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </ButtonGroup>
                <ButtonGroup className="w-full">
                  <Button
                    variant={selectedTransformation === TransformationType.URL_ENCODE ? "default" : "outline"}
                    className="flex-1"
                    onClick={() => onTransformationChange(TransformationType.URL_ENCODE)}
                  >
                    URL Encode
                  </Button>
                  <Dialog open={urlEncodeDialogOpen} onOpenChange={setUrlEncodeDialogOpen}>
                    <DialogTrigger asChild>
                      <Button
                        variant={selectedTransformation === TransformationType.URL_ENCODE ? "default" : "outline"}
                        size="icon"
                      >
                        <Settings className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>URL Encode Settings</DialogTitle>
                        <DialogDescription>
                          URL encoding converts special characters to percent-encoded format. No additional configuration needed.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setUrlEncodeDialogOpen(false)}>
                          Close
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </ButtonGroup>
                <ButtonGroup className="w-full">
                  <Button
                    variant={selectedTransformation === TransformationType.URL_DECODE ? "default" : "outline"}
                    className="flex-1"
                    onClick={() => onTransformationChange(TransformationType.URL_DECODE)}
                  >
                    URL Decode
                  </Button>
                  <Dialog open={urlDecodeDialogOpen} onOpenChange={setUrlDecodeDialogOpen}>
                    <DialogTrigger asChild>
                      <Button
                        variant={selectedTransformation === TransformationType.URL_DECODE ? "default" : "outline"}
                        size="icon"
                      >
                        <Settings className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>URL Decode Settings</DialogTitle>
                        <DialogDescription>
                          URL decoding converts percent-encoded characters back to their original format. No additional configuration needed.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setUrlDecodeDialogOpen(false)}>
                          Close
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </ButtonGroup>
                <ButtonGroup className="w-full">
                  <Button
                    variant={selectedTransformation === TransformationType.HTML_ENCODE ? "default" : "outline"}
                    className="flex-1"
                    onClick={() => onTransformationChange(TransformationType.HTML_ENCODE)}
                  >
                    HTML Encode
                  </Button>
                  <Dialog open={htmlEncodeDialogOpen} onOpenChange={setHtmlEncodeDialogOpen}>
                    <DialogTrigger asChild>
                      <Button
                        variant={selectedTransformation === TransformationType.HTML_ENCODE ? "default" : "outline"}
                        size="icon"
                      >
                        <Settings className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>HTML Encode Settings</DialogTitle>
                        <DialogDescription>
                          HTML encoding converts special characters to their corresponding HTML entities. For example: &lt; → &amp;lt;, &gt; → &amp;gt;, &amp; → &amp;amp;, " → &amp;quot;. No additional configuration needed.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <Button onClick={() => setHtmlEncodeDialogOpen(false)}>
                          Close
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </ButtonGroup>
                <ButtonGroup className="w-full">
                  <Button
                    variant={selectedTransformation === TransformationType.HTML_DECODE ? "default" : "outline"}
                    className="flex-1"
                    onClick={() => onTransformationChange(TransformationType.HTML_DECODE)}
                  >
                    HTML Decode
                  </Button>
                  <Dialog open={htmlDecodeDialogOpen} onOpenChange={setHtmlDecodeDialogOpen}>
                    <DialogTrigger asChild>
                      <Button
                        variant={selectedTransformation === TransformationType.HTML_DECODE ? "default" : "outline"}
                        size="icon"
                      >
                        <Settings className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>HTML Decode Settings</DialogTitle>
                        <DialogDescription>
                          HTML decoding converts HTML entities back to their original characters. For example: &amp;lt; → &lt;, &amp;gt; → &gt;, &amp;amp; → &amp;, &amp;quot; → ". No additional configuration needed.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <Button onClick={() => setHtmlDecodeDialogOpen(false)}>
                          Close
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </ButtonGroup>
                <ButtonGroup className="w-full">
                  <Button
                    variant={selectedTransformation === TransformationType.UNICODE_ESCAPE ? "default" : "outline"}
                    className="flex-1"
                    onClick={() => onTransformationChange(TransformationType.UNICODE_ESCAPE)}
                  >
                    Unicode Escape
                  </Button>
                  <Dialog open={unicodeEscapeDialogOpen} onOpenChange={setUnicodeEscapeDialogOpen}>
                    <DialogTrigger asChild>
                      <Button
                        variant={selectedTransformation === TransformationType.UNICODE_ESCAPE ? "default" : "outline"}
                        size="icon"
                      >
                        <Settings className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Unicode Escape Settings</DialogTitle>
                        <DialogDescription>
                          Unicode escape encoding converts each character to its Unicode escape sequence in \uXXXX format. For example: A → \u0041, © → \u00a9. No additional configuration needed.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <Button onClick={() => setUnicodeEscapeDialogOpen(false)}>
                          Close
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </ButtonGroup>
                <ButtonGroup className="w-full">
                  <Button
                    variant={selectedTransformation === TransformationType.UNICODE_UNESCAPE ? "default" : "outline"}
                    className="flex-1"
                    onClick={() => onTransformationChange(TransformationType.UNICODE_UNESCAPE)}
                  >
                    Unicode Unescape
                  </Button>
                  <Dialog open={unicodeUnescapeDialogOpen} onOpenChange={setUnicodeUnescapeDialogOpen}>
                    <DialogTrigger asChild>
                      <Button
                        variant={selectedTransformation === TransformationType.UNICODE_UNESCAPE ? "default" : "outline"}
                        size="icon"
                      >
                        <Settings className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Unicode Unescape Settings</DialogTitle>
                        <DialogDescription>
                          Unicode unescape decoding converts Unicode escape sequences back to their original characters. For example: \u0041 → A, \u00a9 → ©. No additional configuration needed.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <Button onClick={() => setUnicodeUnescapeDialogOpen(false)}>
                          Close
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </ButtonGroup>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="Symmetric Ciphers">
            <AccordionTrigger className="text-[32px] hover:bg-gray-100 hover:text-gray-800 transition-all duration-200 relative">
              Symmetric Ciphers
              <div className="absolute bottom-4 left-0 right-0 h-px bg-gray-300"></div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-3 gap-2">
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
                <ButtonGroup className="w-full">
                  <Button
                    variant={selectedTransformation === TransformationType.DES ? "default" : "outline"}
                    className="flex-1"
                    onClick={() => onTransformationChange(TransformationType.DES)}
                  >
                    DES Cipher
                  </Button>
                  <Dialog open={desDialogOpen} onOpenChange={(open) => {
                    setDesDialogOpen(open)
                    if (open) {
                      setDesForm({
                        key: options[TransformationType.DES].key,
                        mode: options[TransformationType.DES].mode,
                        padding: options[TransformationType.DES].padding,
                        iv: options[TransformationType.DES].iv
                      })
                    }
                  }}>
                    <DialogTrigger asChild>
                      <Button
                        variant={selectedTransformation === TransformationType.DES ? "default" : "outline"}
                        size="icon"
                      >
                        <Settings className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px]">
                      <DialogHeader>
                        <DialogTitle>DES Cipher Settings</DialogTitle>
                        <DialogDescription>
                          Configure the key, mode of operation, padding scheme, and IV for DES encryption.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <label htmlFor="des-key" className="text-right">
                            Key *
                          </label>
                          <input
                            id="des-key"
                            type="text"
                            placeholder="Enter encryption key"
                            value={desForm.key}
                            onChange={(e) => setDesForm(prev => ({ ...prev, key: e.target.value }))}
                            className="col-span-3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <label htmlFor="des-mode" className="text-right">
                            Mode *
                          </label>
                          <select
                            id="des-mode"
                            value={desForm.mode}
                            onChange={(e) => setDesForm(prev => ({ ...prev, mode: e.target.value as 'ECB' | 'CBC' | 'CFB' | 'OFB' | 'CTR' }))}
                            className="col-span-3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="ECB">ECB</option>
                            <option value="CBC">CBC</option>
                            <option value="CFB">CFB</option>
                            <option value="OFB">OFB</option>
                            <option value="CTR">CTR</option>
                          </select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <label htmlFor="des-padding" className="text-right">
                            Padding *
                          </label>
                          <select
                            id="des-padding"
                            value={desForm.padding}
                            onChange={(e) => setDesForm(prev => ({ ...prev, padding: e.target.value as 'Pkcs7' | 'Iso97971' | 'AnsiX923' | 'Iso10126' | 'ZeroPadding' | 'NoPadding' }))}
                            className="col-span-3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="Pkcs7">Pkcs7</option>
                            <option value="Iso97971">Iso97971</option>
                            <option value="AnsiX923">AnsiX923</option>
                            <option value="Iso10126">Iso10126</option>
                            <option value="ZeroPadding">ZeroPadding</option>
                            <option value="NoPadding">NoPadding</option>
                          </select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <label htmlFor="des-iv" className="text-right">
                            IV (hex)
                          </label>
                          <input
                            id="des-iv"
                            type="text"
                            placeholder="16 hex characters (8 bytes) - required for non-ECB modes"
                            value={desForm.iv}
                            onChange={(e) => setDesForm(prev => ({ ...prev, iv: e.target.value }))}
                            className="col-span-3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setDesDialogOpen(false)}>
                          Cancel
                        </Button>
                        <Button onClick={() => {
                          if (!desForm.key) {
                            toast.error("Key is required")
                            return
                          }
                          
                          if (!desForm.mode) {
                            toast.error("Mode is required")
                            return
                          }
                          
                          if (!desForm.padding) {
                            toast.error("Padding is required")
                            return
                          }
                          
                          if (desForm.mode !== 'ECB' && !desForm.iv) {
                            toast.error("IV is required for non-ECB modes")
                            return
                          }
                          
                          if (desForm.iv && desForm.iv.length !== 16) {
                            toast.error("IV must be exactly 16 hex characters (8 bytes)")
                            return
                          }
                          
                          // Validate hex format for IV
                          if (desForm.iv && !/^[0-9A-Fa-f]{16}$/.test(desForm.iv)) {
                            toast.error("IV must contain only valid hex characters")
                            return
                          }
                          
                          onOptionsChange({
                            ...options,
                            [TransformationType.DES]: {
                              key: desForm.key,
                              mode: desForm.mode,
                              padding: desForm.padding,
                              iv: desForm.iv
                            }
                          })
                          setDesDialogOpen(false)
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
                    variant={selectedTransformation === TransformationType.AES ? "default" : "outline"}
                    className="flex-1"
                    onClick={() => onTransformationChange(TransformationType.AES)}
                  >
                    AES Cipher
                  </Button>
                  <Dialog open={aesDialogOpen} onOpenChange={(open) => {
                    setAesDialogOpen(open)
                    if (open) {
                      setAesForm({
                        key: options[TransformationType.AES].key,
                        mode: options[TransformationType.AES].mode,
                        padding: options[TransformationType.AES].padding,
                        iv: options[TransformationType.AES].iv
                      })
                    }
                  }}>
                    <DialogTrigger asChild>
                      <Button
                        variant={selectedTransformation === TransformationType.AES ? "default" : "outline"}
                        size="icon"
                      >
                        <Settings className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px]">
                      <DialogHeader>
                        <DialogTitle>AES Cipher Settings</DialogTitle>
                        <DialogDescription>
                          Configure the key, mode of operation, padding scheme, and IV for AES encryption.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <label htmlFor="aes-key" className="text-right">
                            Key *
                          </label>
                          <input
                            id="aes-key"
                            type="text"
                            placeholder="Enter encryption key"
                            value={aesForm.key}
                            onChange={(e) => setAesForm(prev => ({ ...prev, key: e.target.value }))}
                            className="col-span-3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <label htmlFor="aes-mode" className="text-right">
                            Mode *
                          </label>
                          <select
                            id="aes-mode"
                            value={aesForm.mode}
                            onChange={(e) => setAesForm(prev => ({ ...prev, mode: e.target.value as 'ECB' | 'CBC' | 'CFB' | 'OFB' | 'CTR' }))}
                            className="col-span-3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="ECB">ECB</option>
                            <option value="CBC">CBC</option>
                            <option value="CFB">CFB</option>
                            <option value="OFB">OFB</option>
                            <option value="CTR">CTR</option>
                          </select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <label htmlFor="aes-padding" className="text-right">
                            Padding *
                          </label>
                          <select
                            id="aes-padding"
                            value={aesForm.padding}
                            onChange={(e) => setAesForm(prev => ({ ...prev, padding: e.target.value as 'Pkcs7' | 'Iso97971' | 'AnsiX923' | 'Iso10126' | 'ZeroPadding' | 'NoPadding' }))}
                            className="col-span-3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="Pkcs7">Pkcs7</option>
                            <option value="Iso97971">Iso97971</option>
                            <option value="AnsiX923">AnsiX923</option>
                            <option value="Iso10126">Iso10126</option>
                            <option value="ZeroPadding">ZeroPadding</option>
                            <option value="NoPadding">NoPadding</option>
                          </select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <label htmlFor="aes-iv" className="text-right">
                            IV (hex)
                          </label>
                          <input
                            id="aes-iv"
                            type="text"
                            placeholder="32 hex characters (16 bytes) - required for non-ECB modes"
                            value={aesForm.iv}
                            onChange={(e) => setAesForm(prev => ({ ...prev, iv: e.target.value }))}
                            className="col-span-3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setAesDialogOpen(false)}>
                          Cancel
                        </Button>
                        <Button onClick={() => {
                          if (!aesForm.key) {
                            toast.error("Key is required")
                            return
                          }
                          
                          if (!aesForm.mode) {
                            toast.error("Mode is required")
                            return
                          }
                          
                          if (!aesForm.padding) {
                            toast.error("Padding is required")
                            return
                          }
                          
                          if (aesForm.mode !== 'ECB' && !aesForm.iv) {
                            toast.error("IV is required for non-ECB modes")
                            return
                          }
                          
                          if (aesForm.iv && aesForm.iv.length !== 32) {
                            toast.error("IV must be exactly 32 hex characters (16 bytes)")
                            return
                          }
                          
                          // Validate hex format for IV
                          if (aesForm.iv && !/^[0-9A-Fa-f]{32}$/.test(aesForm.iv)) {
                            toast.error("IV must contain only valid hex characters")
                            return
                          }
                          
                          onOptionsChange({
                            ...options,
                            [TransformationType.AES]: {
                              key: aesForm.key,
                              mode: aesForm.mode,
                              padding: aesForm.padding,
                              iv: aesForm.iv
                            }
                          })
                          setAesDialogOpen(false)
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
                    variant={selectedTransformation === TransformationType.CHACHA20 ? "default" : "outline"}
                    className="flex-1"
                    onClick={() => onTransformationChange(TransformationType.CHACHA20)}
                  >
                    ChaCha20
                  </Button>
                  <Dialog open={chacha20DialogOpen} onOpenChange={(open) => {
                    setChacha20DialogOpen(open)
                    if (open) {
                      setChacha20Form({
                        key: options[TransformationType.CHACHA20].key,
                        nonce: options[TransformationType.CHACHA20].nonce,
                        outputFormat: options[TransformationType.CHACHA20].outputFormat
                      })
                    }
                  }}>
                    <DialogTrigger asChild>
                      <Button
                        variant={selectedTransformation === TransformationType.CHACHA20 ? "default" : "outline"}
                        size="icon"
                      >
                        <Settings className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px]">
                      <DialogHeader>
                        <DialogTitle>ChaCha20 Cipher Settings</DialogTitle>
                        <DialogDescription>
                          Configure the key, nonce, and output format for ChaCha20 stream cipher. WARNING: Never reuse the same nonce with the same key.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="space-y-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="chacha20-key" className="text-right">
                              Key (hex)
                            </label>
                            <input
                              id="chacha20-key"
                              type="text"
                              placeholder="64 hex characters (32 bytes)"
                              value={chacha20Form.key}
                              onChange={(e) => setChacha20Form(prev => ({ ...prev, key: e.target.value }))}
                              className="col-span-3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="chacha20-nonce" className="text-right">
                              Nonce (hex)
                            </label>
                            <input
                              id="chacha20-nonce"
                              type="text"
                              placeholder="24 hex characters (12 bytes)"
                              value={chacha20Form.nonce}
                              onChange={(e) => setChacha20Form(prev => ({ ...prev, nonce: e.target.value }))}
                              className="col-span-3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="chacha20-format" className="text-right">
                              Output Format
                            </label>
                            <select
                              id="chacha20-format"
                              value={chacha20Form.outputFormat}
                              onChange={(e) => setChacha20Form(prev => ({ ...prev, outputFormat: e.target.value as 'hex' | 'base64' }))}
                              className="col-span-3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                              <option value="hex">Hexadecimal</option>
                              <option value="base64">Base64</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setChacha20DialogOpen(false)}>
                          Cancel
                        </Button>
                        <Button onClick={() => {
                          // Validate key
                          if (!chacha20Form.key || chacha20Form.key.length !== 64) {
                            toast.error("Key must be exactly 64 hexadecimal characters (32 bytes)")
                            return
                          }
                          
                          if (!/^[0-9A-Fa-f]{64}$/.test(chacha20Form.key)) {
                            toast.error("Key must contain only valid hexadecimal characters (0-9, a-f, A-F)")
                            return
                          }
                          
                          // Validate nonce
                          if (!chacha20Form.nonce || chacha20Form.nonce.length !== 24) {
                            toast.error("Nonce must be exactly 24 hexadecimal characters (12 bytes)")
                            return
                          }
                          
                          if (!/^[0-9A-Fa-f]{24}$/.test(chacha20Form.nonce)) {
                            toast.error("Nonce must contain only valid hexadecimal characters (0-9, a-f, A-F)")
                            return
                          }
                          
                          onOptionsChange({
                            ...options,
                            [TransformationType.CHACHA20]: {
                              key: chacha20Form.key,
                              nonce: chacha20Form.nonce,
                              outputFormat: chacha20Form.outputFormat
                            }
                          })
                          setChacha20DialogOpen(false)
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
          <AccordionItem value="Hashing & MAC">
            <AccordionTrigger className="text-[32px] hover:bg-gray-100 hover:text-gray-800 transition-all duration-200 relative">
              Hashing & MAC
              <div className="absolute bottom-4 left-0 right-0 h-px bg-gray-300"></div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-3 gap-2">
              <ButtonGroup className="w-full">
                  <Button
                    variant={selectedTransformation === TransformationType.MD5 ? "default" : "outline"}
                    className="flex-1"
                    onClick={() => onTransformationChange(TransformationType.MD5)}
                  >
                    MD5
                  </Button>
                  <Dialog open={md5DialogOpen} onOpenChange={setMd5DialogOpen}>
                    <DialogTrigger asChild>
                      <Button
                        variant={selectedTransformation === TransformationType.MD5 ? "default" : "outline"}
                        size="icon"
                      >
                        <Settings className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>MD5 Settings</DialogTitle>
                        <DialogDescription>
                          MD5 produces a 128-bit hash. WARNING: MD5 is cryptographically broken and should only be used for non-security purposes like checksums. No additional configuration needed.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <Button onClick={() => setMd5DialogOpen(false)}>
                          Close
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </ButtonGroup>
                <ButtonGroup className="w-full">
                  <Button
                    variant={selectedTransformation === TransformationType.SHA1 ? "default" : "outline"}
                    className="flex-1"
                    onClick={() => onTransformationChange(TransformationType.SHA1)}
                  >
                    SHA1
                  </Button>
                  <Dialog open={sha1DialogOpen} onOpenChange={setSha1DialogOpen}>
                    <DialogTrigger asChild>
                      <Button
                        variant={selectedTransformation === TransformationType.SHA1 ? "default" : "outline"}
                        size="icon"
                      >
                        <Settings className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>SHA1 Settings</DialogTitle>
                        <DialogDescription>
                          SHA1 produces a 160-bit hash. WARNING: SHA1 is deprecated due to collision attacks and should not be used for security purposes. No additional configuration needed.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <Button onClick={() => setSha1DialogOpen(false)}>
                          Close
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </ButtonGroup>
                <ButtonGroup className="w-full">
                  <Button
                    variant={selectedTransformation === TransformationType.SHA256 ? "default" : "outline"}
                    className="flex-1"
                    onClick={() => onTransformationChange(TransformationType.SHA256)}
                  >
                    SHA256
                  </Button>
                  <Dialog open={sha256DialogOpen} onOpenChange={setSha256DialogOpen}>
                    <DialogTrigger asChild>
                      <Button
                        variant={selectedTransformation === TransformationType.SHA256 ? "default" : "outline"}
                        size="icon"
                      >
                        <Settings className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>SHA256 Settings</DialogTitle>
                        <DialogDescription>
                          SHA256 produces a 256-bit hash from the SHA-2 family. Widely used and secure for cryptographic purposes. No additional configuration needed.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <Button onClick={() => setSha256DialogOpen(false)}>
                          Close
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </ButtonGroup>
                <ButtonGroup className="w-full">
                  <Button
                    variant={selectedTransformation === TransformationType.SHA384 ? "default" : "outline"}
                    className="flex-1"
                    onClick={() => onTransformationChange(TransformationType.SHA384)}
                  >
                    SHA384
                  </Button>
                  <Dialog open={sha384DialogOpen} onOpenChange={setSha384DialogOpen}>
                    <DialogTrigger asChild>
                      <Button
                        variant={selectedTransformation === TransformationType.SHA384 ? "default" : "outline"}
                        size="icon"
                      >
                        <Settings className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>SHA384 Settings</DialogTitle>
                        <DialogDescription>
                          SHA384 produces a 384-bit hash from the SHA-2 family. Provides additional security margin over SHA256. No additional configuration needed.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <Button onClick={() => setSha384DialogOpen(false)}>
                          Close
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </ButtonGroup>
                <ButtonGroup className="w-full">
                  <Button
                    variant={selectedTransformation === TransformationType.SHA512 ? "default" : "outline"}
                    className="flex-1"
                    onClick={() => onTransformationChange(TransformationType.SHA512)}
                  >
                    SHA512
                  </Button>
                  <Dialog open={sha512DialogOpen} onOpenChange={setSha512DialogOpen}>
                    <DialogTrigger asChild>
                      <Button
                        variant={selectedTransformation === TransformationType.SHA512 ? "default" : "outline"}
                        size="icon"
                      >
                        <Settings className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>SHA512 Settings</DialogTitle>
                        <DialogDescription>
                          SHA512 produces a 512-bit hash from the SHA-2 family. Offers maximum security margin in the SHA-2 family. No additional configuration needed.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <Button onClick={() => setSha512DialogOpen(false)}>
                          Close
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </ButtonGroup>
                <ButtonGroup className="w-full">
                  <Button
                    variant={selectedTransformation === TransformationType.SHA3_256 ? "default" : "outline"}
                    className="flex-1"
                    onClick={() => onTransformationChange(TransformationType.SHA3_256)}
                  >
                    SHA3-256
                  </Button>
                  <Dialog open={sha3_256DialogOpen} onOpenChange={setSha3_256DialogOpen}>
                    <DialogTrigger asChild>
                      <Button
                        variant={selectedTransformation === TransformationType.SHA3_256 ? "default" : "outline"}
                        size="icon"
                      >
                        <Settings className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>SHA3-256 Settings</DialogTitle>
                        <DialogDescription>
                          SHA3-256 produces a 256-bit hash from the SHA-3 (Keccak) family. Modern alternative to SHA-2 with different design. No additional configuration needed.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <Button onClick={() => setSha3_256DialogOpen(false)}>
                          Close
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </ButtonGroup>
                <ButtonGroup className="w-full">
                  <Button
                    variant={selectedTransformation === TransformationType.BLAKE2B ? "default" : "outline"}
                    className="flex-1"
                    onClick={() => onTransformationChange(TransformationType.BLAKE2B)}
                  >
                    BLAKE2B
                  </Button>
                  <Dialog open={blake2bDialogOpen} onOpenChange={setBlake2bDialogOpen}>
                    <DialogTrigger asChild>
                      <Button
                        variant={selectedTransformation === TransformationType.BLAKE2B ? "default" : "outline"}
                        size="icon"
                      >
                        <Settings className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>BLAKE2B Settings</DialogTitle>
                        <DialogDescription>
                          BLAKE2B is a fast cryptographic hash function, faster than MD5, SHA-1, and SHA-2 while being at least as secure as SHA-3. No additional configuration needed.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <Button onClick={() => setBlake2bDialogOpen(false)}>
                          Close
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </ButtonGroup>
                <ButtonGroup className="w-full">
                  <Button
                    variant={selectedTransformation === TransformationType.HMAC ? "default" : "outline"}
                    className="flex-1"
                    onClick={() => onTransformationChange(TransformationType.HMAC)}
                  >
                    HMAC
                  </Button>
                  <Dialog open={hmacDialogOpen} onOpenChange={(open) => {
                    setHmacDialogOpen(open)
                    if (open) {
                      setHmacForm({
                        key: options[TransformationType.HMAC].key,
                        algorithm: options[TransformationType.HMAC].algorithm
                      })
                    }
                  }}>
                    <DialogTrigger asChild>
                      <Button
                        variant={selectedTransformation === TransformationType.HMAC ? "default" : "outline"}
                        size="icon"
                      >
                        <Settings className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px]">
                      <DialogHeader>
                        <DialogTitle>HMAC Settings</DialogTitle>
                        <DialogDescription>
                          Hash-based Message Authentication Code (HMAC) uses a secret key with a hash function to verify data integrity and authenticity.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="space-y-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="hmac-key" className="text-right">
                              Secret Key
                            </label>
                            <input
                              id="hmac-key"
                              type="text"
                              placeholder="Enter secret key"
                              value={hmacForm.key}
                              onChange={(e) => setHmacForm(prev => ({ ...prev, key: e.target.value }))}
                              className="col-span-3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="hmac-algorithm" className="text-right">
                              Algorithm
                            </label>
                            <select
                              id="hmac-algorithm"
                              value={hmacForm.algorithm}
                              onChange={(e) => setHmacForm(prev => ({ ...prev, algorithm: e.target.value as 'MD5' | 'SHA1' | 'SHA256' | 'SHA384' | 'SHA512' }))}
                              className="col-span-3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                              <option value="MD5">MD5</option>
                              <option value="SHA1">SHA1</option>
                              <option value="SHA256">SHA256</option>
                              <option value="SHA384">SHA384</option>
                              <option value="SHA512">SHA512</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setHmacDialogOpen(false)}>
                          Cancel
                        </Button>
                        <Button onClick={() => {
                          if (!hmacForm.key || hmacForm.key.trim() === '') {
                            toast.error("Secret key must not be empty")
                            return
                          }
                          
                          onOptionsChange({
                            ...options,
                            [TransformationType.HMAC]: {
                              key: hmacForm.key,
                              algorithm: hmacForm.algorithm
                            }
                          })
                          setHmacDialogOpen(false)
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
          <AccordionItem value="Assymetric Ciphers">
            <AccordionTrigger className="text-[32px] hover:bg-gray-100 hover:text-gray-800 transition-all duration-200 relative">
              Assymetric Ciphers
              <div className="absolute bottom-4 left-0 right-0 h-px bg-gray-300"></div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-3 gap-2">
                <ButtonGroup className="w-full">
                  <Button
                    variant={selectedTransformation === TransformationType.RSA_ENCRYPT ? "default" : "outline"}
                    className="flex-1"
                    onClick={() => onTransformationChange(TransformationType.RSA_ENCRYPT)}
                  >
                    RSA Encrypt
                  </Button>
                  <Dialog open={rsaEncryptDialogOpen} onOpenChange={(open) => {
                    setRsaEncryptDialogOpen(open)
                    if (open) {
                      setRsaEncryptForm({
                        publicKey: options[TransformationType.RSA_ENCRYPT].publicKey,
                        padding: options[TransformationType.RSA_ENCRYPT].padding
                      })
                    }
                  }}>
                    <DialogTrigger asChild>
                      <Button
                        variant={selectedTransformation === TransformationType.RSA_ENCRYPT ? "default" : "outline"}
                        size="icon"
                      >
                        <Settings className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px]">
                      <DialogHeader>
                        <DialogTitle>RSA Encrypt Settings</DialogTitle>
                        <DialogDescription>
                          Encrypt data using RSA public key. Requires a PEM-formatted public key.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="space-y-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="rsa-encrypt-key" className="text-right">
                              Public Key (PEM)
                            </label>
                            <textarea
                              id="rsa-encrypt-key"
                              placeholder="-----BEGIN PUBLIC KEY-----&#10;...&#10;-----END PUBLIC KEY-----"
                              value={rsaEncryptForm.publicKey}
                              onChange={(e) => setRsaEncryptForm(prev => ({ ...prev, publicKey: e.target.value }))}
                              className="col-span-3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-xs min-h-[120px]"
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="rsa-encrypt-padding" className="text-right">
                              Padding
                            </label>
                            <select
                              id="rsa-encrypt-padding"
                              value={rsaEncryptForm.padding}
                              onChange={(e) => setRsaEncryptForm(prev => ({ ...prev, padding: e.target.value as 'PKCS1' | 'OAEP' }))}
                              className="col-span-3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                              <option value="PKCS1">PKCS#1 v1.5</option>
                              <option value="OAEP">OAEP</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setRsaEncryptDialogOpen(false)}>
                          Cancel
                        </Button>
                        <Button onClick={() => {
                          if (!rsaEncryptForm.publicKey || rsaEncryptForm.publicKey.trim() === '') {
                            toast.error("Public key is required")
                            return
                          }
                          
                          if (!rsaEncryptForm.publicKey.includes('BEGIN PUBLIC KEY')) {
                            toast.error("Public key must be in PEM format")
                            return
                          }
                          
                          onOptionsChange({
                            ...options,
                            [TransformationType.RSA_ENCRYPT]: {
                              publicKey: rsaEncryptForm.publicKey,
                              padding: rsaEncryptForm.padding
                            }
                          })
                          setRsaEncryptDialogOpen(false)
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
                    variant={selectedTransformation === TransformationType.RSA_DECRYPT ? "default" : "outline"}
                    className="flex-1"
                    onClick={() => onTransformationChange(TransformationType.RSA_DECRYPT)}
                  >
                    RSA Decrypt
                  </Button>
                  <Dialog open={rsaDecryptDialogOpen} onOpenChange={(open) => {
                    setRsaDecryptDialogOpen(open)
                    if (open) {
                      setRsaDecryptForm({
                        privateKey: options[TransformationType.RSA_DECRYPT].privateKey,
                        padding: options[TransformationType.RSA_DECRYPT].padding
                      })
                    }
                  }}>
                    <DialogTrigger asChild>
                      <Button
                        variant={selectedTransformation === TransformationType.RSA_DECRYPT ? "default" : "outline"}
                        size="icon"
                      >
                        <Settings className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px]">
                      <DialogHeader>
                        <DialogTitle>RSA Decrypt Settings</DialogTitle>
                        <DialogDescription>
                          Decrypt data using RSA private key. Requires a PEM-formatted private key.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="space-y-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="rsa-decrypt-key" className="text-right">
                              Private Key (PEM)
                            </label>
                            <textarea
                              id="rsa-decrypt-key"
                              placeholder="-----BEGIN PRIVATE KEY-----&#10;...&#10;-----END PRIVATE KEY-----"
                              value={rsaDecryptForm.privateKey}
                              onChange={(e) => setRsaDecryptForm(prev => ({ ...prev, privateKey: e.target.value }))}
                              className="col-span-3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-xs min-h-[120px]"
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="rsa-decrypt-padding" className="text-right">
                              Padding
                            </label>
                            <select
                              id="rsa-decrypt-padding"
                              value={rsaDecryptForm.padding}
                              onChange={(e) => setRsaDecryptForm(prev => ({ ...prev, padding: e.target.value as 'PKCS1' | 'OAEP' }))}
                              className="col-span-3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                              <option value="PKCS1">PKCS#1 v1.5</option>
                              <option value="OAEP">OAEP</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setRsaDecryptDialogOpen(false)}>
                          Cancel
                        </Button>
                        <Button onClick={() => {
                          if (!rsaDecryptForm.privateKey || rsaDecryptForm.privateKey.trim() === '') {
                            toast.error("Private key is required")
                            return
                          }
                          
                          if (!rsaDecryptForm.privateKey.includes('BEGIN') || !rsaDecryptForm.privateKey.includes('PRIVATE KEY')) {
                            toast.error("Private key must be in PEM format")
                            return
                          }
                          
                          onOptionsChange({
                            ...options,
                            [TransformationType.RSA_DECRYPT]: {
                              privateKey: rsaDecryptForm.privateKey,
                              padding: rsaDecryptForm.padding
                            }
                          })
                          setRsaDecryptDialogOpen(false)
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
                    variant={selectedTransformation === TransformationType.RSA_SIGN ? "default" : "outline"}
                    className="flex-1"
                    onClick={() => onTransformationChange(TransformationType.RSA_SIGN)}
                  >
                    RSA Sign
                  </Button>
                  <Dialog open={rsaSignDialogOpen} onOpenChange={(open) => {
                    setRsaSignDialogOpen(open)
                    if (open) {
                      setRsaSignForm({
                        privateKey: options[TransformationType.RSA_SIGN].privateKey,
                        algorithm: options[TransformationType.RSA_SIGN].algorithm
                      })
                    }
                  }}>
                    <DialogTrigger asChild>
                      <Button
                        variant={selectedTransformation === TransformationType.RSA_SIGN ? "default" : "outline"}
                        size="icon"
                      >
                        <Settings className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px]">
                      <DialogHeader>
                        <DialogTitle>RSA Sign Settings</DialogTitle>
                        <DialogDescription>
                          Create a digital signature using RSA private key. The signature can be verified with the corresponding public key.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="space-y-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="rsa-sign-key" className="text-right">
                              Private Key (PEM)
                            </label>
                            <textarea
                              id="rsa-sign-key"
                              placeholder="-----BEGIN PRIVATE KEY-----&#10;...&#10;-----END PRIVATE KEY-----"
                              value={rsaSignForm.privateKey}
                              onChange={(e) => setRsaSignForm(prev => ({ ...prev, privateKey: e.target.value }))}
                              className="col-span-3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-xs min-h-[120px]"
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="rsa-sign-algorithm" className="text-right">
                              Algorithm
                            </label>
                            <select
                              id="rsa-sign-algorithm"
                              value={rsaSignForm.algorithm}
                              onChange={(e) => setRsaSignForm(prev => ({ ...prev, algorithm: e.target.value as 'SHA256withRSA' | 'SHA512withRSA' }))}
                              className="col-span-3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                              <option value="SHA256withRSA">SHA256 with RSA</option>
                              <option value="SHA512withRSA">SHA512 with RSA</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setRsaSignDialogOpen(false)}>
                          Cancel
                        </Button>
                        <Button onClick={() => {
                          if (!rsaSignForm.privateKey || rsaSignForm.privateKey.trim() === '') {
                            toast.error("Private key is required")
                            return
                          }
                          
                          if (!rsaSignForm.privateKey.includes('BEGIN') || !rsaSignForm.privateKey.includes('PRIVATE KEY')) {
                            toast.error("Private key must be in PEM format")
                            return
                          }
                          
                          onOptionsChange({
                            ...options,
                            [TransformationType.RSA_SIGN]: {
                              privateKey: rsaSignForm.privateKey,
                              algorithm: rsaSignForm.algorithm
                            }
                          })
                          setRsaSignDialogOpen(false)
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
                    variant={selectedTransformation === TransformationType.RSA_VERIFY ? "default" : "outline"}
                    className="flex-1"
                    onClick={() => onTransformationChange(TransformationType.RSA_VERIFY)}
                  >
                    RSA Verify
                  </Button>
                  <Dialog open={rsaVerifyDialogOpen} onOpenChange={(open) => {
                    setRsaVerifyDialogOpen(open)
                    if (open) {
                      setRsaVerifyForm({
                        publicKey: options[TransformationType.RSA_VERIFY].publicKey,
                        signature: options[TransformationType.RSA_VERIFY].signature,
                        algorithm: options[TransformationType.RSA_VERIFY].algorithm
                      })
                    }
                  }}>
                    <DialogTrigger asChild>
                      <Button
                        variant={selectedTransformation === TransformationType.RSA_VERIFY ? "default" : "outline"}
                        size="icon"
                      >
                        <Settings className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px]">
                      <DialogHeader>
                        <DialogTitle>RSA Verify Settings</DialogTitle>
                        <DialogDescription>
                          Verify an RSA signature using a public key. Requires the public key, signature, and original message.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="space-y-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="rsa-verify-key" className="text-right">
                              Public Key (PEM)
                            </label>
                            <textarea
                              id="rsa-verify-key"
                              placeholder="-----BEGIN PUBLIC KEY-----&#10;...&#10;-----END PUBLIC KEY-----"
                              value={rsaVerifyForm.publicKey}
                              onChange={(e) => setRsaVerifyForm(prev => ({ ...prev, publicKey: e.target.value }))}
                              className="col-span-3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-xs min-h-[120px]"
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="rsa-verify-signature" className="text-right">
                              Signature (hex)
                            </label>
                            <textarea
                              id="rsa-verify-signature"
                              placeholder="Enter signature in hexadecimal format"
                              value={rsaVerifyForm.signature}
                              onChange={(e) => setRsaVerifyForm(prev => ({ ...prev, signature: e.target.value }))}
                              className="col-span-3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-xs min-h-[80px]"
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="rsa-verify-algorithm" className="text-right">
                              Algorithm
                            </label>
                            <select
                              id="rsa-verify-algorithm"
                              value={rsaVerifyForm.algorithm}
                              onChange={(e) => setRsaVerifyForm(prev => ({ ...prev, algorithm: e.target.value as 'SHA256withRSA' | 'SHA512withRSA' }))}
                              className="col-span-3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                              <option value="SHA256withRSA">SHA256 with RSA</option>
                              <option value="SHA512withRSA">SHA512 with RSA</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setRsaVerifyDialogOpen(false)}>
                          Cancel
                        </Button>
                        <Button onClick={() => {
                          if (!rsaVerifyForm.publicKey || rsaVerifyForm.publicKey.trim() === '') {
                            toast.error("Public key is required")
                            return
                          }
                          
                          if (!rsaVerifyForm.publicKey.includes('BEGIN PUBLIC KEY')) {
                            toast.error("Public key must be in PEM format")
                            return
                          }
                          
                          if (!rsaVerifyForm.signature || rsaVerifyForm.signature.trim() === '') {
                            toast.error("Signature is required")
                            return
                          }
                          
                          onOptionsChange({
                            ...options,
                            [TransformationType.RSA_VERIFY]: {
                              publicKey: rsaVerifyForm.publicKey,
                              signature: rsaVerifyForm.signature,
                              algorithm: rsaVerifyForm.algorithm
                            }
                          })
                          setRsaVerifyDialogOpen(false)
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
                    variant={selectedTransformation === TransformationType.ECDSA_SIGN ? "default" : "outline"}
                    className="flex-1"
                    onClick={() => onTransformationChange(TransformationType.ECDSA_SIGN)}
                  >
                    ECDSA Sign
                  </Button>
                  <Dialog open={ecdsaSignDialogOpen} onOpenChange={(open) => {
                    setEcdsaSignDialogOpen(open)
                    if (open) {
                      setEcdsaSignForm({
                        privateKey: options[TransformationType.ECDSA_SIGN].privateKey,
                        curve: options[TransformationType.ECDSA_SIGN].curve
                      })
                    }
                  }}>
                    <DialogTrigger asChild>
                      <Button
                        variant={selectedTransformation === TransformationType.ECDSA_SIGN ? "default" : "outline"}
                        size="icon"
                      >
                        <Settings className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px]">
                      <DialogHeader>
                        <DialogTitle>ECDSA Sign Settings</DialogTitle>
                        <DialogDescription>
                          Create an ECDSA digital signature using elliptic curve private key. Private key must be in hexadecimal format.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="space-y-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="ecdsa-sign-key" className="text-right">
                              Private Key (hex)
                            </label>
                            <input
                              id="ecdsa-sign-key"
                              type="text"
                              placeholder="64 hex characters for secp256k1"
                              value={ecdsaSignForm.privateKey}
                              onChange={(e) => setEcdsaSignForm(prev => ({ ...prev, privateKey: e.target.value }))}
                              className="col-span-3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="ecdsa-sign-curve" className="text-right">
                              Curve
                            </label>
                            <select
                              id="ecdsa-sign-curve"
                              value={ecdsaSignForm.curve}
                              onChange={(e) => setEcdsaSignForm(prev => ({ ...prev, curve: e.target.value as 'secp256k1' | 'P-256' | 'P-384' }))}
                              className="col-span-3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                              <option value="secp256k1">secp256k1 (Bitcoin)</option>
                              <option value="P-256">P-256 (NIST)</option>
                              <option value="P-384">P-384 (NIST)</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setEcdsaSignDialogOpen(false)}>
                          Cancel
                        </Button>
                        <Button onClick={() => {
                          if (!ecdsaSignForm.privateKey || ecdsaSignForm.privateKey.trim() === '') {
                            toast.error("Private key is required")
                            return
                          }
                          
                          if (!/^[0-9A-Fa-f]+$/.test(ecdsaSignForm.privateKey)) {
                            toast.error("Private key must be in hexadecimal format")
                            return
                          }
                          
                          onOptionsChange({
                            ...options,
                            [TransformationType.ECDSA_SIGN]: {
                              privateKey: ecdsaSignForm.privateKey,
                              curve: ecdsaSignForm.curve
                            }
                          })
                          setEcdsaSignDialogOpen(false)
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
                    variant={selectedTransformation === TransformationType.ECDSA_VERIFY ? "default" : "outline"}
                    className="flex-1"
                    onClick={() => onTransformationChange(TransformationType.ECDSA_VERIFY)}
                  >
                    ECDSA Verify
                  </Button>
                  <Dialog open={ecdsaVerifyDialogOpen} onOpenChange={(open) => {
                    setEcdsaVerifyDialogOpen(open)
                    if (open) {
                      setEcdsaVerifyForm({
                        publicKey: options[TransformationType.ECDSA_VERIFY].publicKey,
                        signature: options[TransformationType.ECDSA_VERIFY].signature,
                        curve: options[TransformationType.ECDSA_VERIFY].curve
                      })
                    }
                  }}>
                    <DialogTrigger asChild>
                      <Button
                        variant={selectedTransformation === TransformationType.ECDSA_VERIFY ? "default" : "outline"}
                        size="icon"
                      >
                        <Settings className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px]">
                      <DialogHeader>
                        <DialogTitle>ECDSA Verify Settings</DialogTitle>
                        <DialogDescription>
                          Verify an ECDSA signature using elliptic curve public key. Requires public key, signature, and original message.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="space-y-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="ecdsa-verify-key" className="text-right">
                              Public Key (hex)
                            </label>
                            <input
                              id="ecdsa-verify-key"
                              type="text"
                              placeholder="Compressed or uncompressed public key in hex"
                              value={ecdsaVerifyForm.publicKey}
                              onChange={(e) => setEcdsaVerifyForm(prev => ({ ...prev, publicKey: e.target.value }))}
                              className="col-span-3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="ecdsa-verify-signature" className="text-right">
                              Signature (hex)
                            </label>
                            <textarea
                              id="ecdsa-verify-signature"
                              placeholder="Enter signature in hexadecimal format"
                              value={ecdsaVerifyForm.signature}
                              onChange={(e) => setEcdsaVerifyForm(prev => ({ ...prev, signature: e.target.value }))}
                              className="col-span-3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-xs min-h-[80px]"
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="ecdsa-verify-curve" className="text-right">
                              Curve
                            </label>
                            <select
                              id="ecdsa-verify-curve"
                              value={ecdsaVerifyForm.curve}
                              onChange={(e) => setEcdsaVerifyForm(prev => ({ ...prev, curve: e.target.value as 'secp256k1' | 'P-256' | 'P-384' }))}
                              className="col-span-3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                              <option value="secp256k1">secp256k1 (Bitcoin)</option>
                              <option value="P-256">P-256 (NIST)</option>
                              <option value="P-384">P-384 (NIST)</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setEcdsaVerifyDialogOpen(false)}>
                          Cancel
                        </Button>
                        <Button onClick={() => {
                          if (!ecdsaVerifyForm.publicKey || ecdsaVerifyForm.publicKey.trim() === '') {
                            toast.error("Public key is required")
                            return
                          }
                          
                          if (!/^[0-9A-Fa-f]+$/.test(ecdsaVerifyForm.publicKey)) {
                            toast.error("Public key must be in hexadecimal format")
                            return
                          }
                          
                          if (!ecdsaVerifyForm.signature || ecdsaVerifyForm.signature.trim() === '') {
                            toast.error("Signature is required")
                            return
                          }
                          
                          if (!/^[0-9A-Fa-f]+$/.test(ecdsaVerifyForm.signature)) {
                            toast.error("Signature must be in hexadecimal format")
                            return
                          }
                          
                          onOptionsChange({
                            ...options,
                            [TransformationType.ECDSA_VERIFY]: {
                              publicKey: ecdsaVerifyForm.publicKey,
                              signature: ecdsaVerifyForm.signature,
                              curve: ecdsaVerifyForm.curve
                            }
                          })
                          setEcdsaVerifyDialogOpen(false)
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
                    variant={selectedTransformation === TransformationType.RSA_KEYGEN ? "default" : "outline"}
                    className="flex-1"
                    onClick={() => onTransformationChange(TransformationType.RSA_KEYGEN)}
                  >
                    RSA Keygen
                  </Button>
                  <Dialog open={rsaKeygenDialogOpen} onOpenChange={(open) => {
                    setRsaKeygenDialogOpen(open)
                    if (open) {
                      setRsaKeygenForm({
                        keySize: options[TransformationType.RSA_KEYGEN].keySize
                      })
                    }
                  }}>
                    <DialogTrigger asChild>
                      <Button
                        variant={selectedTransformation === TransformationType.RSA_KEYGEN ? "default" : "outline"}
                        size="icon"
                      >
                        <Settings className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px]">
                      <DialogHeader>
                        <DialogTitle>RSA Key Generator Settings</DialogTitle>
                        <DialogDescription>
                          Generate RSA public/private key pairs for encryption, decryption, signing, and verification. Output will be in PEM format.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="space-y-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="rsa-keygen-size" className="text-right">
                              Key Size
                            </label>
                            <select
                              id="rsa-keygen-size"
                              value={rsaKeygenForm.keySize}
                              onChange={(e) => setRsaKeygenForm(prev => ({ ...prev, keySize: parseInt(e.target.value) as 1024 | 2048 | 4096 }))}
                              className="col-span-3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                              <option value="1024">1024 bits (Fast, less secure)</option>
                              <option value="2048">2048 bits (Recommended)</option>
                              <option value="4096">4096 bits (Slow, most secure)</option>
                            </select>
                          </div>
                          <div className="col-span-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                            <p className="text-sm text-yellow-800">
                              ⚠️ <strong>WARNING:</strong> Generated keys are for DEMO purposes only. Do NOT use these keys for production security. Keep private keys secure and never share them.
                            </p>
                          </div>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setRsaKeygenDialogOpen(false)}>
                          Cancel
                        </Button>
                        <Button onClick={() => {
                          onOptionsChange({
                            ...options,
                            [TransformationType.RSA_KEYGEN]: {
                              keySize: rsaKeygenForm.keySize
                            }
                          })
                          setRsaKeygenDialogOpen(false)
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
                    variant={selectedTransformation === TransformationType.ECDSA_KEYGEN ? "default" : "outline"}
                    className="flex-1"
                    onClick={() => onTransformationChange(TransformationType.ECDSA_KEYGEN)}
                  >
                    ECDSA Keygen
                  </Button>
                  <Dialog open={ecdsaKeygenDialogOpen} onOpenChange={(open) => {
                    setEcdsaKeygenDialogOpen(open)
                    if (open) {
                      setEcdsaKeygenForm({
                        curve: options[TransformationType.ECDSA_KEYGEN].curve
                      })
                    }
                  }}>
                    <DialogTrigger asChild>
                      <Button
                        variant={selectedTransformation === TransformationType.ECDSA_KEYGEN ? "default" : "outline"}
                        size="icon"
                      >
                        <Settings className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px]">
                      <DialogHeader>
                        <DialogTitle>ECDSA Key Generator Settings</DialogTitle>
                        <DialogDescription>
                          Generate ECDSA public/private key pairs for signing and verification. Output will be in hexadecimal format.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="space-y-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="ecdsa-keygen-curve" className="text-right">
                              Curve
                            </label>
                            <select
                              id="ecdsa-keygen-curve"
                              value={ecdsaKeygenForm.curve}
                              onChange={(e) => setEcdsaKeygenForm(prev => ({ ...prev, curve: e.target.value as 'secp256k1' | 'P-256' | 'P-384' }))}
                              className="col-span-3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                              <option value="secp256k1">secp256k1 (Bitcoin)</option>
                              <option value="P-256">P-256 (NIST)</option>
                              <option value="P-384">P-384 (NIST)</option>
                            </select>
                          </div>
                          <div className="col-span-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                            <p className="text-sm text-yellow-800">
                              ⚠️ <strong>WARNING:</strong> Generated keys are for DEMO purposes only. Do NOT use these keys for production security. Keep private keys secure and never share them.
                            </p>
                          </div>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setEcdsaKeygenDialogOpen(false)}>
                          Cancel
                        </Button>
                        <Button onClick={() => {
                          onOptionsChange({
                            ...options,
                            [TransformationType.ECDSA_KEYGEN]: {
                              curve: ecdsaKeygenForm.curve
                            }
                          })
                          setEcdsaKeygenDialogOpen(false)
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
