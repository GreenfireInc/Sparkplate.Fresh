import { useRef, useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { toast } from "sonner";
import { type EncryptedData } from "@/components/partials/force";
import { KeystoreDecryptionModal } from "@/components/modals/privateKeyManagement";
import { getTranslation, type LocaleCode } from "@/lib/i18n";

interface ImportingProps {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  onSubmit?: () => void;
  submitLabel?: string;
  acceptedFileTypes?: string;
  bruteForceMode?: boolean;
  onBruteForceModeChange?: (mode: boolean) => void;
  language?: LocaleCode;
}

export const Importing = ({
  label,
  placeholder,
  value,
  onChange,
  onSubmit,
  submitLabel,
  acceptedFileTypes = ".json,.txt,.genc,.key",
  bruteForceMode = false,
  onBruteForceModeChange,
  language = "en"
}: ImportingProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [encryptedData, setEncryptedData] = useState<EncryptedData | null>(null);
  const [fileName, setFileName] = useState("");
  



  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    console.log('📁 FILE UPLOAD TRIGGERED - File:', file.name, 'Size:', file.size, 'Type:', file.type);

    try {
      setFileName(file.name);
      
      // Handle binary wallet.dat files
      if (file.name.includes('wallet.dat') || file.name.includes('.dat')) {
        console.log('❌ Binary wallet.dat file detected, not supported');
        toast.error(getTranslation(language, "binaryWalletDatNotSupported"));
        return;
      }
      
      console.log('📖 Reading file content...');
      const fileContent = await readFileAsText(file);
      console.log('✅ File content read, length:', fileContent.length, 'preview:', fileContent.substring(0, 100) + '...');
      
      // For JSON files (keystore files)
      if (file.name.endsWith('.json') || file.name.endsWith('.tez')) {
        console.log('📋 Processing JSON file...');
        try {
          const jsonContent = JSON.parse(fileContent);
          console.log('✅ JSON parsed successfully, keys:', Object.keys(jsonContent));
          
          // Handle SubWallet batch export format (multiple accounts)
          if (jsonContent.encoded && jsonContent.encoding && jsonContent.accounts && Array.isArray(jsonContent.accounts)) {
            console.log('🔐 SUBWALLET BATCH EXPORT DETECTED FROM FILE - Setting up decryption');
            setEncryptedData({ type: 'subwallet-batch', data: jsonContent });
            setShowPasswordDialog(true);
            return;
          }
          
          // Handle Ethereum/BNB keystore format (encrypted)
          if (jsonContent.version && jsonContent.crypto) {
            console.log('🔐 ETHEREUM KEYSTORE DETECTED FROM FILE - Setting up decryption');
            setEncryptedData({ type: 'ethereum', data: jsonContent });
            setShowPasswordDialog(true);
            return;
          }
          
          // Handle Tezos encrypted format
          if (jsonContent.version && jsonContent.ciphertext && jsonContent.kdf) {
            console.log('🔐 TEZOS KEYSTORE DETECTED FROM FILE - Setting up decryption');
            setEncryptedData({ type: 'tezos', data: jsonContent });
            setShowPasswordDialog(true);
            return;
          }
          
          // Handle Polkadot/Substrate keystore format (Exodus, Polkadot.js)
          if (jsonContent.encoded && jsonContent.encoding && jsonContent.address) {
            console.log('🔐 POLKADOT KEYSTORE DETECTED FROM FILE - Setting up decryption');
            setEncryptedData({ type: 'polkadot', data: jsonContent });
            setShowPasswordDialog(true);
            return;
          }
          
          // Handle other JSON formats that might contain a private key directly
          if (jsonContent.privateKey) {
            onChange(jsonContent.privateKey);
            return;
          }
          
          if (jsonContent.private_key) {
            onChange(jsonContent.private_key);
            return;
          }
          
          // For Tezos JSON format
          if (jsonContent.edsk) {
            onChange(jsonContent.edsk);
            return;
          }
          
          // For Polkadot JSON format
          if (jsonContent.secretPhrase || jsonContent.seed) {
            onChange(jsonContent.secretPhrase || jsonContent.seed);
            return;
          }
          
          toast.error(getTranslation(language, "couldNotFindPrivateKeyInJson"));
        } catch (error) {
          console.error("Error parsing JSON:", error);
          toast.error(getTranslation(language, "invalidJsonFileFormat"));
        }
      } else {
        // Check if this is an encrypted text file (like Dash backup)
        if (fileContent.startsWith('U2FsdGVkX1')) {
          setEncryptedData({ type: 'dash', data: fileContent });
          setShowPasswordDialog(true);
          return;
        }
        
        // For text files, assume it's a raw private key or seed phrase
        onChange(fileContent.trim());
      }
    } catch (error) {
      console.error("Error reading file:", error);
      toast.error(getTranslation(language, "failedToReadFile"));
    }

    // Clear the file input to allow re-uploading the same file
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const readFileAsText = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(reader.error);
      reader.readAsText(file);
    });
  };

  return (
    <>
      <div>
        <Label className="mb-2 block">{label}</Label>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Input
              placeholder={placeholder || getTranslation(language, "pasteOrImportData")}
              value={value}
              onChange={(e) => {
                const inputValue = e.target.value;
                console.log('📝 Input changed, length:', inputValue.length, 'preview:', inputValue.substring(0, 50) + '...');
                
                // Check if this looks like a keystore JSON that was pasted
                if (inputValue.length > 100 && inputValue.includes('"version"') && inputValue.includes('"crypto"')) {
                  console.log('🔍 DETECTED KEYSTORE JSON - length:', inputValue.length);
                  console.log('🔍 Contains "version":', inputValue.includes('"version"'));
                  console.log('🔍 Contains "crypto":', inputValue.includes('"crypto"'));
                  
                  try {
                    const jsonContent = JSON.parse(inputValue);
                    console.log('✅ JSON parsed successfully, structure:', Object.keys(jsonContent));
                    
                    // Handle Ethereum/BNB keystore format (encrypted)
                    if (jsonContent.version && jsonContent.crypto) {
                      console.log('🔐 ETHEREUM KEYSTORE DETECTED - Showing password dialog');
                      console.log('📋 Keystore data:', { version: jsonContent.version, hascrypto: !!jsonContent.crypto });
                      setEncryptedData({ type: 'ethereum', data: jsonContent });
                      setShowPasswordDialog(true);
                      return; // Don't call onChange with the JSON
                    }
                    
                    // Handle Tezos encrypted format
                    if (jsonContent.version && jsonContent.ciphertext && jsonContent.kdf) {
                      console.log('🔐 TEZOS KEYSTORE DETECTED - Showing password dialog');
                      setEncryptedData({ type: 'tezos', data: jsonContent });
                      setShowPasswordDialog(true);
                      return; // Don't call onChange with the JSON
                    }
                    
                    // Handle Polkadot/Substrate keystore format
                    if (jsonContent.encoded && jsonContent.encoding && jsonContent.address) {
                      console.log('🔐 POLKADOT KEYSTORE DETECTED - Showing password dialog');
                      setEncryptedData({ type: 'polkadot', data: jsonContent });
                      setShowPasswordDialog(true);
                      return; // Don't call onChange with the JSON
                    }
                    
                    console.log('❓ JSON format not recognized as keystore');
                  } catch (error) {
                    console.log('❌ Failed to parse as JSON:', error);
                  }
                }
                
                // Additional safety check: don't allow extremely long inputs that might be JSON
                if (inputValue.length > 200) {
                  console.log('⚠️ Input too long (' + inputValue.length + ' chars), blocking');
                  toast.error(getTranslation(language, "inputTooLongUseUpload"));
                  return;
                }
                
                console.log('✅ Calling onChange with input value');
                onChange(inputValue);
              }}
              className="flex-1 placeholder:text-white text-white pr-10"
            />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
              <button 
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="p-1 rounded hover:bg-gray-200 transition-colors"
                title={getTranslation(language, "uploadFile")}
              >
                <Upload size={16} />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept={`${acceptedFileTypes},.tez,.dat`}
                className="hidden"
                onChange={handleFileUpload}
              />
            </div>
          </div>
          {onSubmit && (
            <Button 
              className="shrink-0" 
              onClick={onSubmit} 
              disabled={!value.trim()}
            >
              {submitLabel || getTranslation(language, "use")}
            </Button>
          )}
        </div>
      </div>

      {/* Password Dialog for Encrypted Files */}
      <KeystoreDecryptionModal
        open={showPasswordDialog}
        onOpenChange={setShowPasswordDialog}
        encryptedData={encryptedData}
        fileName={fileName}
        bruteForceMode={bruteForceMode}
        onBruteForceModeChange={onBruteForceModeChange}
        onSuccess={onChange}
      />
    </>
  );
};

export default Importing;
