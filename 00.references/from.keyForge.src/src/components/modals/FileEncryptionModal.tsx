import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Upload, Lock, Unlock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import * as openpgp from "openpgp";

interface FileEncryptionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const FileEncryptionModal = ({ open, onOpenChange }: FileEncryptionModalProps) => {
  const [mode, setMode] = useState<"encrypt" | "decrypt">("encrypt");
  const [publicKey, setPublicKey] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const { toast } = useToast();

  const extractPublicKeyFromFile = async (file: File): Promise<string> => {
    const text = await file.text();
    
    // Try parsing as JSON
    try {
      const json = JSON.parse(text);
      // Check for cryptoPublicKey field from exported addresses
      if (json.cryptoPublicKey) {
        return json.cryptoPublicKey;
      }
      // Check if it's an array of addresses (from CSV/JSON export)
      if (Array.isArray(json) && json.length > 0 && json[0].cryptoPublicKey) {
        return json[0].cryptoPublicKey;
      }
    } catch {
      // Not JSON, try parsing as CSV or text
      const lines = text.split('\n');
      for (const line of lines) {
        // Look for public key patterns
        if (line.includes('cryptoPublicKey') || line.includes('Public Key')) {
          const parts = line.split(/[,:\t]/);
          const keyIndex = parts.findIndex(p => p.includes('cryptoPublicKey') || p.includes('Public Key'));
          if (keyIndex >= 0 && parts[keyIndex + 1]) {
            return parts[keyIndex + 1].trim().replace(/"/g, '');
          }
        }
      }
    }
    
    throw new Error("Could not extract public key from file. Please input manually.");
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "Error",
          description: "File is too large (max 10MB)",
          variant: "destructive",
        });
        return;
      }
      setSelectedFile(file);
    }
    event.target.value = '';
  };

  const handlePublicKeyFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const extractedKey = await extractPublicKeyFromFile(file);
      setPublicKey(extractedKey);
      toast({
        title: "Success",
        description: "Public key extracted from file",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to extract public key",
        variant: "destructive",
      });
    }
    event.target.value = '';
  };

  const handleEncrypt = async () => {
    if (!selectedFile || !publicKey) {
      toast({
        title: "Error",
        description: "Please select a file and provide a public key",
        variant: "destructive",
      });
      return;
    }

    setProcessing(true);
    try {
      const fileContent = await selectedFile.arrayBuffer();
      const message = await openpgp.createMessage({ binary: new Uint8Array(fileContent) });
      
      // Try to read as armored key first, if fails treat as hex
      let publicKeyObj;
      try {
        publicKeyObj = await openpgp.readKey({ armoredKey: publicKey });
      } catch {
        // If not armored, assume it's a hex public key - create a temporary GPG key
        toast({
          title: "Error",
          description: "Please provide a valid GPG public key (armored format)",
          variant: "destructive",
        });
        setProcessing(false);
        return;
      }

      const encrypted = await openpgp.encrypt({
        message,
        encryptionKeys: publicKeyObj,
      });

      const blob = new Blob([encrypted as string], { type: "application/pgp-encrypted" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${selectedFile.name}.gpg`;
      a.click();
      URL.revokeObjectURL(url);

      toast({
        title: "Success",
        description: "File encrypted and downloaded",
      });
      
      setSelectedFile(null);
      setPublicKey("");
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Encryption Error",
        description: error instanceof Error ? error.message : "Failed to encrypt file",
        variant: "destructive",
      });
    } finally {
      setProcessing(false);
    }
  };

  const handleDecrypt = async () => {
    if (!selectedFile || !privateKey) {
      toast({
        title: "Error",
        description: "Please select an encrypted file and provide a private key",
        variant: "destructive",
      });
      return;
    }

    setProcessing(true);
    try {
      const encryptedContent = await selectedFile.text();
      const message = await openpgp.readMessage({ armoredMessage: encryptedContent });
      
      const privateKeyObj = await openpgp.decryptKey({
        privateKey: await openpgp.readPrivateKey({ armoredKey: privateKey }),
        passphrase: "", // Assuming no passphrase, adjust if needed
      });

      const { data } = await openpgp.decrypt({
        message,
        decryptionKeys: privateKeyObj,
        format: 'binary',
      });

      const uint8Array = new Uint8Array(data as ArrayBuffer);
      const blob = new Blob([uint8Array], { type: "application/octet-stream" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      // Remove .gpg extension if present
      const originalName = selectedFile.name.replace(/\.gpg$/, '');
      a.download = `decrypted_${originalName}`;
      a.click();
      URL.revokeObjectURL(url);

      toast({
        title: "Success",
        description: "File decrypted and downloaded",
      });
      
      setSelectedFile(null);
      setPrivateKey("");
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Decryption Error",
        description: error instanceof Error ? error.message : "Failed to decrypt file. Check your private key.",
        variant: "destructive",
      });
    } finally {
      setProcessing(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>File Encryption / Decryption</DialogTitle>
          <DialogDescription>
            Encrypt files with a GPG public key or decrypt with a private key
          </DialogDescription>
        </DialogHeader>

        <Tabs value={mode} onValueChange={(v) => setMode(v as "encrypt" | "decrypt")}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="encrypt">
              <Lock className="h-4 w-4 mr-2" />
              Encrypt
            </TabsTrigger>
            <TabsTrigger value="decrypt">
              <Unlock className="h-4 w-4 mr-2" />
              Decrypt
            </TabsTrigger>
          </TabsList>

          <TabsContent value="encrypt" className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label>File to Encrypt</Label>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => document.getElementById('file-to-encrypt')?.click()}
                  className="w-full"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  {selectedFile ? selectedFile.name : "Select File"}
                </Button>
                <input
                  id="file-to-encrypt"
                  type="file"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>GPG Public Key</Label>
              <Textarea
                placeholder="Paste GPG public key (armored format) here..."
                value={publicKey}
                onChange={(e) => setPublicKey(e.target.value)}
                className="font-mono text-xs min-h-[150px]"
              />
              <div className="flex gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => document.getElementById('public-key-file')?.click()}
                  className="w-full"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Load from Exported File
                </Button>
                <input
                  id="public-key-file"
                  type="file"
                  accept=".json,.csv,.txt"
                  onChange={handlePublicKeyFileSelect}
                  className="hidden"
                />
              </div>
            </div>

            <Button
              onClick={handleEncrypt}
              disabled={!selectedFile || !publicKey || processing}
              className="w-full"
            >
              <Lock className="h-4 w-4 mr-2" />
              {processing ? "Encrypting..." : "Encrypt & Download"}
            </Button>
          </TabsContent>

          <TabsContent value="decrypt" className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label>Encrypted File (.gpg)</Label>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => document.getElementById('file-to-decrypt')?.click()}
                  className="w-full"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  {selectedFile ? selectedFile.name : "Select Encrypted File"}
                </Button>
                <input
                  id="file-to-decrypt"
                  type="file"
                  accept=".gpg"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>GPG Private Key</Label>
              <Textarea
                placeholder="Paste GPG private key (armored format) here..."
                value={privateKey}
                onChange={(e) => setPrivateKey(e.target.value)}
                className="font-mono text-xs min-h-[150px]"
              />
              <p className="text-xs text-muted-foreground">
                Use the GPG Private Key from your exported cryptocurrency addresses
              </p>
            </div>

            <Button
              onClick={handleDecrypt}
              disabled={!selectedFile || !privateKey || processing}
              className="w-full"
            >
              <Unlock className="h-4 w-4 mr-2" />
              {processing ? "Decrypting..." : "Decrypt & Download"}
            </Button>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

