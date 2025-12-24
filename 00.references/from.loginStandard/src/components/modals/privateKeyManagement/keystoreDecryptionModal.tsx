import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { BruteForceSection, type EncryptedData } from "@/components/partials/force";

interface KeystoreDecryptionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  encryptedData: EncryptedData | null;
  fileName: string;
  bruteForceMode: boolean;
  onBruteForceModeChange?: (mode: boolean) => void;
  onSuccess: (decryptedKey: string) => void;
}

export const KeystoreDecryptionModal = ({
  open,
  onOpenChange,
  encryptedData,
  fileName,
  bruteForceMode,
  onBruteForceModeChange,
  onSuccess
}: KeystoreDecryptionModalProps) => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showBruteForceSection, setShowBruteForceSection] = useState(false);

  const handleClose = () => {
    setPassword("");
    setShowBruteForceSection(false);
    if (onBruteForceModeChange) {
      onBruteForceModeChange(false);
    }
    onOpenChange(false);
  };

  const handlePasswordSubmit = async () => {
    if (!password.trim()) {
      toast.error("Please enter a password");
      return;
    }

    try {
      // Import keystore decryption functions
      const {
        decryptEthereumKeystore,
        decryptTezosKeystore,
        decryptPolkadotKeystore,
        decryptSubWalletBatchExport,
        decryptDashKeystore
      } = await import('@/components/currencyCore/currencies/ext/keystoreDecryption');

      let decryptedKey = "";

      if (encryptedData.type === 'ethereum') {
        console.log('🔧 Processing Ethereum keystore...');
        decryptedKey = await decryptEthereumKeystore(encryptedData.data, password);
        console.log('✅ Ethereum decryption result length:', decryptedKey.length);
      } else if (encryptedData.type === 'tezos') {
        const decryptedData = await decryptTezosKeystore(encryptedData.data, password);

        // Galleon stores wallet data as JSON array after decryption
        try {
          console.log("🔍 Trying to parse decrypted data as JSON...");
          const parsedData = JSON.parse(decryptedData);

          // Galleon format: array of wallet objects
          if (Array.isArray(parsedData) && parsedData.length > 0) {
            const firstWallet = parsedData[0];
            console.log("📝 Found Galleon wallet format:", Object.keys(firstWallet));

            // Look for Galleon-style keys
            if (firstWallet.secretKey) {
              decryptedKey = firstWallet.secretKey;
              console.log("✅ Extracted secretKey from Galleon format");
            } else if (firstWallet.privateKey) {
              decryptedKey = firstWallet.privateKey;
              console.log("✅ Extracted privateKey from Galleon format");
            } else {
              console.log("❌ No recognizable key in Galleon format");
              decryptedKey = JSON.stringify(firstWallet);
            }
          }
          // Single object format
          else if (typeof parsedData === 'object') {
            console.log("📝 Found single object format:", Object.keys(parsedData));

            if (parsedData.secretKey) {
              decryptedKey = parsedData.secretKey;
            } else if (parsedData.privateKey) {
              decryptedKey = parsedData.privateKey;
            } else if (parsedData.private_key) {
              decryptedKey = parsedData.private_key;
            } else if (parsedData.edsk) {
              decryptedKey = parsedData.edsk;
            } else {
              // If it's JSON but no recognizable key field, show the raw data
              decryptedKey = decryptedData;
            }
          } else {
            // If it's not an object or array, use raw data
            decryptedKey = decryptedData;
          }
        } catch (parseError) {
          console.log("⚠️ Not JSON format, using raw decrypted data");
          // If it's not JSON, assume it's the raw private key
          decryptedKey = decryptedData;
        }
      } else if (encryptedData.type === 'polkadot') {
        console.log('🔧 Processing Polkadot keystore...');
        decryptedKey = await decryptPolkadotKeystore(encryptedData.data, password);
        console.log('✅ Polkadot decryption result length:', decryptedKey.length);
      } else if (encryptedData.type === 'subwallet-batch') {
        console.log('🔧 Processing SubWallet batch export...');
        decryptedKey = await decryptSubWalletBatchExport(encryptedData.data, password);
        console.log('✅ SubWallet batch decryption result length:', decryptedKey.length);
      } else if (encryptedData.type === 'dash') {
        decryptedKey = await decryptDashKeystore(encryptedData.data as string, password);
      }

      if (decryptedKey) {
        console.log('🎉 Final decrypted key preview:', decryptedKey.substring(0, 20) + '...');
        onSuccess(decryptedKey);
        toast.success("Keystore decrypted successfully!");
        handleClose();
      } else {
        console.error('❌ No decrypted key obtained');
        toast.error("Failed to decrypt keystore");
      }
    } catch (error) {
      console.error("Decryption error:", error);
      toast.error(error instanceof Error ? error.message : "Failed to decrypt keystore");
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        onOpenChange(open);
        if (!open) {
          // Reset showBruteForceSection when dialog is closed
          setShowBruteForceSection(false);
        }
      }}
    >
      <DialogContent
        className="w-full max-w-xl max-h-[90vh] overflow-y-auto transition-all duration-300 ease-in-out"
        aria-describedby="decrypt-dialog-description"
        key={`dialog-${showBruteForceSection ? 'expanded' : 'normal'}`}
      >
        <DialogHeader>
          <DialogTitle>Decrypt Keystore File</DialogTitle>
           <p id="decrypt-dialog-description" className="text-sm text-muted-foreground text-black">
              This file is encrypted and requires a password to decrypt.
            </p>
        </DialogHeader>
        <div className="space-y-4 min-h-0">
          <div>
            <Label className="break-all">File: {fileName}</Label>
            
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pr-10"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handlePasswordSubmit();
                  }
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 rounded hover:bg-gray-200 transition-colors"
                title={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
          {/* Brute Force Section */}
          {showBruteForceSection && (
            <BruteForceSection
              encryptedData={encryptedData}
              onSuccess={onSuccess}
            />
          )}

          <div className="flex justify-between items-center">
            {/* Only show Force Decrypt button when bruteForce command has been activated */}
            {bruteForceMode && !showBruteForceSection && (
              <Button
                variant="destructive"
                onClick={() => {
                  setShowBruteForceSection(true);
                }}
              >
                Force Decrypt
              </Button>
            )}
            <div className="flex gap-2 ml-auto">
              <Button
                variant="outline"
                onClick={handleClose}
              >
                Cancel
              </Button>
              <Button onClick={handlePasswordSubmit} disabled={!password.trim()}>
                Decrypt
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default KeystoreDecryptionModal;
