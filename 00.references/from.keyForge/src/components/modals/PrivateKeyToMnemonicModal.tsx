import { useState, useEffect } from "react";
import * as bip39 from "bip39";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircle, Info, Copy, CheckCircle2, Loader2, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { generateGPGFromRootExtendedPrivateKey } from "@/lib/cryptographyCore/deterministicGPG/deterministicGPG.seed";

interface PrivateKeyToMnemonicModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onMnemonicSelect?: (mnemonic: string) => void;
}

interface MnemonicSuggestion {
  mnemonic: string;
  wordCount: number;
  method: string;
  gpgFingerprint: string | null;
  isValid: boolean;
  isGenerating?: boolean;
}

export const PrivateKeyToMnemonicModal = ({ open, onOpenChange, onMnemonicSelect }: PrivateKeyToMnemonicModalProps) => {
  const [privateKey, setPrivateKey] = useState("");
  const [suggestions, setSuggestions] = useState<MnemonicSuggestion[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (!open) {
      setPrivateKey("");
      setSuggestions([]);
    }
  }, [open]);

  /**
   * Convert hex string to entropy and generate mnemonic
   */
  const hexToMnemonic = (hex: string, wordCount: 12 | 24): string | null => {
    try {
      // Remove 0x prefix if present
      const cleanHex = hex.toLowerCase().replace(/^0x/, '');
      
      // Validate hex
      if (!/^[0-9a-f]+$/i.test(cleanHex)) {
        return null;
      }

      // Determine required length
      const requiredLength = wordCount === 12 ? 32 : 64; // 128 bits or 256 bits
      
      let entropyHex = cleanHex;
      
      // Pad or truncate to required length
      if (cleanHex.length < requiredLength) {
        // Pad with zeros
        entropyHex = cleanHex.padEnd(requiredLength, '0');
      } else if (cleanHex.length > requiredLength) {
        // Truncate or use hash
        entropyHex = cleanHex.slice(0, requiredLength);
      }

      // Convert hex to buffer
      const entropyBuffer = Buffer.from(entropyHex, 'hex');
      
      // Generate mnemonic from entropy
      const mnemonic = bip39.entropyToMnemonic(entropyBuffer);
      
      return mnemonic;
    } catch (error) {
      console.error("Error converting hex to mnemonic:", error);
      return null;
    }
  };

  /**
   * Alternative method: Map each hex character to a word
   * Uses deterministic mapping based on character position in hex alphabet
   */
  const hexCharToWordMapping = (hex: string, wordCount: 12 | 24): string | null => {
    try {
      const cleanHex = hex.toLowerCase().replace(/^0x/, '').replace(/[^0-9a-f]/g, '');
      
      if (cleanHex.length === 0) return null;

      const wordlist = bip39.wordlists.english;
      const words: string[] = [];

      // Map each pair of hex characters to a word
      for (let i = 0; i < wordCount; i++) {
        // Use modulo to cycle through the hex string
        const hexIndex = (i * 2) % cleanHex.length;
        const hexPair = cleanHex.slice(hexIndex, hexIndex + 2).padEnd(2, '0');
        
        // Convert hex pair to number and map to word index (0-2047)
        const value = parseInt(hexPair, 16);
        const wordIndex = Math.floor((value / 255) * 2047);
        
        words.push(wordlist[wordIndex]);
      }

      const mnemonic = words.join(' ');
      
      // Check if valid, if not, try to fix checksum
      if (!bip39.validateMnemonic(mnemonic)) {
        // Try to generate a valid mnemonic by using the entropy approach
        const entropyHex = cleanHex.padEnd(wordCount === 12 ? 32 : 64, '0').slice(0, wordCount === 12 ? 32 : 64);
        return bip39.entropyToMnemonic(Buffer.from(entropyHex, 'hex'));
      }

      return mnemonic;
    } catch (error) {
      console.error("Error in hex char to word mapping:", error);
      return null;
    }
  };

  /**
   * Alternative method: SHA-256 hash of private key as entropy
   */
  const hashBasedMnemonic = async (privateKeyInput: string, wordCount: 12 | 24): Promise<string | null> => {
    try {
      const cleanKey = privateKeyInput.replace(/^0x/, '');
      
      // Hash the private key
      const encoder = new TextEncoder();
      const data = encoder.encode(cleanKey);
      const hashBuffer = await crypto.subtle.digest('SHA-256', data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      
      // Use appropriate length for word count
      const entropyLength = wordCount === 12 ? 32 : 64;
      let entropyHex = hashHex;
      
      if (wordCount === 24 && hashHex.length < 64) {
        // For 24 words, hash again and concatenate
        const secondHashBuffer = await crypto.subtle.digest('SHA-256', new Uint8Array(hashBuffer));
        const secondHashArray = Array.from(new Uint8Array(secondHashBuffer));
        const secondHashHex = secondHashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        entropyHex = (hashHex + secondHashHex).slice(0, 64);
      } else {
        entropyHex = hashHex.slice(0, entropyLength);
      }
      
      const entropyBuffer = Buffer.from(entropyHex, 'hex');
      return bip39.entropyToMnemonic(entropyBuffer);
    } catch (error) {
      console.error("Error in hash-based mnemonic:", error);
      return null;
    }
  };

  /**
   * Generate GPG fingerprint for a mnemonic
   */
  const generateGPGFingerprint = async (mnemonic: string): Promise<string | null> => {
    try {
      if (!bip39.validateMnemonic(mnemonic)) {
        return null;
      }
      const result = await generateGPGFromRootExtendedPrivateKey(mnemonic);
      return result.gpgFingerprint;
    } catch (error) {
      console.error("Error generating GPG fingerprint:", error);
      return null;
    }
  };

  /**
   * Parse CSV content and extract private key
   */
  const parseCSV = (content: string): string | null => {
    const lines = content.split('\n').filter(line => line.trim());
    if (lines.length < 2) return null;

    // Get headers
    const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
    const privateKeyIndex = headers.findIndex(h => 
      h === 'privatekey' || h === 'private_key' || h === 'private key' || h === 'privkey'
    );

    if (privateKeyIndex === -1) return null;

    // Get first data row
    const values = lines[1].split(',').map(v => v.trim().replace(/^["']|["']$/g, ''));
    return values[privateKeyIndex] || null;
  };

  /**
   * Parse TXT content and extract private key
   */
  const parseTXT = (content: string): string | null => {
    const lines = content.split('\n');
    
    for (const line of lines) {
      const trimmed = line.trim();
      
      // Look for patterns like "privateKey: xxx" or "Private Key: xxx"
      const match = trimmed.match(/(?:private[_\s]?key|privkey)\s*[:=]\s*(.+)/i);
      if (match) {
        return match[1].trim().replace(/^["']|["']$/g, '');
      }
      
      // If line looks like a hex string (64 chars, hex only)
      if (/^[0-9a-f]{64}$/i.test(trimmed)) {
        return trimmed;
      }
      
      // If line starts with 0x and is hex
      if (/^0x[0-9a-f]+$/i.test(trimmed)) {
        return trimmed;
      }
    }
    
    return null;
  };

  /**
   * Load private key from file
   */
  const loadFromFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const content = await file.text();
      let extractedKey: string | null = null;

      if (file.name.endsWith('.json')) {
        // Parse JSON
        try {
          const data = JSON.parse(content);
          extractedKey = data.privateKey || data.private_key || data.privKey || null;
        } catch (error) {
          console.error("Error parsing JSON:", error);
          toast({
            title: "Error",
            description: "Invalid JSON file format",
            variant: "destructive",
          });
          return;
        }
      } else if (file.name.endsWith('.csv')) {
        // Parse CSV
        extractedKey = parseCSV(content);
      } else if (file.name.endsWith('.txt')) {
        // Parse TXT
        extractedKey = parseTXT(content);
      }

      if (extractedKey) {
        setPrivateKey(extractedKey);
        toast({
          title: "Success!",
          description: "Private key loaded from file",
        });
      } else {
        toast({
          title: "Error",
          description: "Could not find private key in file",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error reading file:", error);
      toast({
        title: "Error",
        description: "Failed to read file",
        variant: "destructive",
      });
    }

    // Reset input so the same file can be selected again
    event.target.value = '';
  };

  const handleGenerate = async () => {
    if (!privateKey.trim()) {
      toast({
        title: "Error",
        description: "Please enter a private key",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    const newSuggestions: MnemonicSuggestion[] = [];

    try {
      // Method 1: Direct hex to 12-word mnemonic
      const mnemonic12Direct = hexToMnemonic(privateKey, 12);
      if (mnemonic12Direct) {
        const isValid = bip39.validateMnemonic(mnemonic12Direct);
        newSuggestions.push({
          mnemonic: mnemonic12Direct,
          wordCount: 12,
          method: "Direct Hex Conversion (128-bit)",
          gpgFingerprint: null,
          isValid,
          isGenerating: true,
        });
      }

      // Method 2: Direct hex to 24-word mnemonic
      const mnemonic24Direct = hexToMnemonic(privateKey, 24);
      if (mnemonic24Direct) {
        const isValid = bip39.validateMnemonic(mnemonic24Direct);
        newSuggestions.push({
          mnemonic: mnemonic24Direct,
          wordCount: 24,
          method: "Direct Hex Conversion (256-bit)",
          gpgFingerprint: null,
          isValid,
          isGenerating: true,
        });
      }

      // Method 3: Hash-based 12-word mnemonic
      const mnemonic12Hash = await hashBasedMnemonic(privateKey, 12);
      if (mnemonic12Hash) {
        const isValid = bip39.validateMnemonic(mnemonic12Hash);
        newSuggestions.push({
          mnemonic: mnemonic12Hash,
          wordCount: 12,
          method: "SHA-256 Hash Derived (128-bit)",
          gpgFingerprint: null,
          isValid,
          isGenerating: true,
        });
      }

      // Method 4: Hash-based 24-word mnemonic
      const mnemonic24Hash = await hashBasedMnemonic(privateKey, 24);
      if (mnemonic24Hash) {
        const isValid = bip39.validateMnemonic(mnemonic24Hash);
        newSuggestions.push({
          mnemonic: mnemonic24Hash,
          wordCount: 24,
          method: "SHA-256 Hash Derived (256-bit)",
          gpgFingerprint: null,
          isValid,
          isGenerating: true,
        });
      }

      // Method 5: Character mapping 12-word
      const mnemonic12Mapping = hexCharToWordMapping(privateKey, 12);
      if (mnemonic12Mapping && !newSuggestions.find(s => s.mnemonic === mnemonic12Mapping)) {
        const isValid = bip39.validateMnemonic(mnemonic12Mapping);
        newSuggestions.push({
          mnemonic: mnemonic12Mapping,
          wordCount: 12,
          method: "Character Mapping (128-bit)",
          gpgFingerprint: null,
          isValid,
          isGenerating: true,
        });
      }

      // Method 6: Character mapping 24-word
      const mnemonic24Mapping = hexCharToWordMapping(privateKey, 24);
      if (mnemonic24Mapping && !newSuggestions.find(s => s.mnemonic === mnemonic24Mapping)) {
        const isValid = bip39.validateMnemonic(mnemonic24Mapping);
        newSuggestions.push({
          mnemonic: mnemonic24Mapping,
          wordCount: 24,
          method: "Character Mapping (256-bit)",
          gpgFingerprint: null,
          isValid,
          isGenerating: true,
        });
      }

      setSuggestions(newSuggestions);

      // Generate GPG fingerprints for valid mnemonics
      for (let i = 0; i < newSuggestions.length; i++) {
        if (newSuggestions[i].isValid) {
          const fingerprint = await generateGPGFingerprint(newSuggestions[i].mnemonic);
          setSuggestions(prev => prev.map((s, idx) => 
            idx === i ? { ...s, gpgFingerprint: fingerprint, isGenerating: false } : s
          ));
        } else {
          setSuggestions(prev => prev.map((s, idx) => 
            idx === i ? { ...s, isGenerating: false } : s
          ));
        }
      }

      if (newSuggestions.length === 0) {
        toast({
          title: "No Suggestions",
          description: "Unable to generate valid mnemonics from the provided private key",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: `Generated ${newSuggestions.length} mnemonic suggestion(s)`,
        });
      }
    } catch (error) {
      console.error("Error generating mnemonics:", error);
      toast({
        title: "Error",
        description: "Failed to generate mnemonics from private key",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: `${label} copied to clipboard`,
    });
  };

  const handleApply = (mnemonic: string) => {
    if (onMnemonicSelect) {
      onMnemonicSelect(mnemonic);
    }
    toast({
      title: "Applied",
      description: "Mnemonic applied to main form",
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-7xl">
        <DialogHeader>
          <DialogTitle>Derive Mnemonic from Private Key</DialogTitle>
          <DialogDescription>
            Enter a private key to generate possible BIP39 mnemonic phrases
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3">
          {/* Private Key Input */}
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <Label htmlFor="private-key-input" className="text-sm">Private Key (Hex)</Label>
              <Button
                variant="outline"
                size="sm"
                onClick={() => document.getElementById('private-key-file-upload')?.click()}
                className="h-7"
              >
                <Upload className="h-3 w-3 mr-1" />
                Load File
              </Button>
              <input
                id="private-key-file-upload"
                type="file"
                accept=".json,.csv,.txt"
                onChange={loadFromFile}
                className="hidden"
              />
            </div>
            <Textarea
              id="private-key-input"
              placeholder="Enter private key or load from file..."
              value={privateKey}
              onChange={(e) => setPrivateKey(e.target.value)}
              className="min-h-[60px] font-mono text-xs"
            />
          </div>

          {/* Generate Button */}
          <Button 
            onClick={handleGenerate} 
            disabled={isGenerating || !privateKey.trim()}
            className="w-full h-9"
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating Mnemonics...
              </>
            ) : (
              "Generate Mnemonic Suggestions"
            )}
          </Button>

          {/* Information Box */}
          <div className="flex items-start gap-2 p-2 rounded-lg bg-muted border border-border">
            <Info className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
            <p className="text-xs text-muted-foreground leading-tight">
              Generates BIP39 mnemonics from a private key using multiple methods. Each valid mnemonic includes a GPG key fingerprint for verification.
            </p>
          </div>

          {/* Suggestions Display */}
          {suggestions.length > 0 && (
            <div className="space-y-2">
              <Label className="text-sm font-semibold">
                Mnemonic Suggestions ({suggestions.filter(s => s.isValid).length} valid)
              </Label>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {suggestions.map((suggestion, index) => (
                  <Card 
                    key={index} 
                    className={`${
                      suggestion.isValid 
                        ? "bg-blue-50 dark:bg-blue-900/50 border-2 border-blue-500 dark:border-blue-600" 
                        : "bg-red-100 dark:bg-red-900 border-2 border-red-600 dark:border-red-500"
                    }`}
                  >
                    <CardContent className="p-3 space-y-2">
                      {/* Header */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          {suggestion.isValid ? (
                            <CheckCircle2 className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                          ) : (
                            <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
                          )}
                          <div>
                            <p className="font-semibold text-xs">
                              {suggestion.wordCount}-word
                            </p>
                            <p className="text-[10px] text-muted-foreground">
                              {suggestion.method.replace(' (128-bit)', '').replace(' (256-bit)', '')}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleCopy(suggestion.mnemonic, "Mnemonic")}
                            className="h-7 w-7 p-0 bg-background hover:bg-muted"
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                          {suggestion.isValid && (
                            <Button
                              variant="default"
                              size="sm"
                              onClick={() => handleApply(suggestion.mnemonic)}
                              className="h-7 text-xs px-2 bg-primary hover:bg-primary/90"
                            >
                              Apply
                            </Button>
                          )}
                        </div>
                      </div>

                      {/* Mnemonic */}
                      <div className="space-y-1">
                        <Textarea
                          value={suggestion.mnemonic}
                          readOnly
                          className="min-h-[50px] font-mono text-[10px] leading-tight bg-background border-border resize-none"
                        />
                      </div>

                      {/* GPG Fingerprint */}
                      {suggestion.isValid && (
                        <div className="space-y-1">
                          {suggestion.isGenerating ? (
                            <div className="flex items-center gap-1 p-1 bg-background rounded border border-border">
                              <Loader2 className="h-3 w-3 animate-spin" />
                              <span className="text-[10px] text-muted-foreground">Generating...</span>
                            </div>
                          ) : suggestion.gpgFingerprint ? (
                            <div className="flex items-center gap-1">
                              <Input
                                value={suggestion.gpgFingerprint}
                                readOnly
                                className="font-mono text-[10px] bg-background flex-1 h-7 border-border"
                              />
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleCopy(suggestion.gpgFingerprint!, "GPG Fingerprint")}
                                className="h-7 w-7 p-0 bg-background hover:bg-muted"
                              >
                                <Copy className="h-3 w-3" />
                              </Button>
                            </div>
                          ) : (
                            <p className="text-[10px] text-destructive p-1 bg-background rounded border border-border">
                              Failed to generate
                            </p>
                          )}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Warning */}
          {suggestions.length > 0 && (
            <div className="flex items-start gap-2 p-2 rounded-lg bg-yellow-50 dark:bg-yellow-950 border border-yellow-500/20">
              <AlertCircle className="h-4 w-4 text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-yellow-900 dark:text-yellow-100 leading-tight">
                <strong>Important:</strong> These mnemonics are deterministically derived from your private key. Each method produces a different valid BIP39 phrase. Verify which derivation method matches your use case.
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

