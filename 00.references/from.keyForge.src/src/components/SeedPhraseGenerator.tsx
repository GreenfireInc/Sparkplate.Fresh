import { useState, useEffect } from "react";
import * as bip39 from "bip39";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Copy, RefreshCw, Download, Upload, Shield, FileText, FileImage } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { FileEncryptionModal } from "./modals/FileEncryptionModal";
import { ChecksumModal } from "./modals/ChecksumModal";
import { AdvancedModal } from "./modals/AdvancedModal";
import { DerivationPathDiveModal } from "./modals/DerivationPathDiveModal";
import { PrivateKeyToMnemonicModal } from "./modals/PrivateKeyToMnemonicModal";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import {
  generateSeedFilename,
  generateSeedJSONContent,
  generateSeedTXTContent,
  generateSeedCSVContent,
} from "@/lib/exportStandard/currencies/filenameStructureAndContent.seed.text";
import {
  exportSeedPhraseAsPNG,
  exportSeedPhraseAsPDF,
} from "@/lib/exportStandard/currencies/filenameStructureAndContent.seed.visual";
import { importSeedPhraseFromFile } from "@/lib/importStandard/fileImports.seed";
import { generateGPGFromRootExtendedPrivateKey } from "@/lib/cryptographyCore/deterministicGPG/deterministicGPG.seed";

const WORD_COUNTS = [12, 13, 15, 16, 17, 18, 19, 20, 21, 23, 24, 27, 29, 32, 33];

interface SeedPhraseGeneratorProps {
  onSeedPhraseChange: (phrase: string) => void;
  seedPhrase: string;
  onGenerateWithIndices?: (indices: Record<string, number>) => Promise<void>;
  onRootGPGFingerprintChange?: (fingerprint: string | null) => void;
}

export const SeedPhraseGenerator = ({ onSeedPhraseChange, seedPhrase, onGenerateWithIndices, onRootGPGFingerprintChange }: SeedPhraseGeneratorProps) => {
  const [wordCount, setWordCount] = useState("12");
  const [inputMode, setInputMode] = useState<"generate" | "input">("generate");
  const [encryptionModalOpen, setEncryptionModalOpen] = useState(false);
  const [checksumModalOpen, setChecksumModalOpen] = useState(false);
  const [advancedModalOpen, setAdvancedModalOpen] = useState(false);
  const [derivationDiveModalOpen, setDerivationDiveModalOpen] = useState(false);
  const [privateKeyModalOpen, setPrivateKeyModalOpen] = useState(false);
  const [wrapAroundEnabled, setWrapAroundEnabled] = useState(false);
  const [wrapAroundValue, setWrapAroundValue] = useState("");
  const [rootGPGFingerprint, setRootGPGFingerprint] = useState<string | null>(null);
  const [isGeneratingGPG, setIsGeneratingGPG] = useState(false);
  const { toast } = useToast();

  // Generate GPG fingerprint from root extended private key whenever seed phrase changes
  useEffect(() => {
    const generateRootGPG = async () => {
      if (!seedPhrase || seedPhrase.trim().length === 0) {
        setRootGPGFingerprint(null);
        onRootGPGFingerprintChange?.(null);
        return;
      }

      // Only generate if seed phrase has changed and is valid
      setIsGeneratingGPG(true);
      try {
        const result = await generateGPGFromRootExtendedPrivateKey(seedPhrase);
        setRootGPGFingerprint(result.gpgFingerprint);
        onRootGPGFingerprintChange?.(result.gpgFingerprint);
      } catch (error) {
        console.error("Error generating root GPG fingerprint:", error);
        setRootGPGFingerprint(null);
        onRootGPGFingerprintChange?.(null);
      } finally {
        setIsGeneratingGPG(false);
      }
    };

    generateRootGPG();
  }, [seedPhrase, onRootGPGFingerprintChange]);

  const handleWrapAroundChange = (value: string) => {
    // Only allow digits, max 6 characters
    const digitsOnly = value.replace(/\D/g, "").slice(0, 6);
    setWrapAroundValue(digitsOnly);
  };

  const handleWrap = () => {
    if (wrapAroundValue.length !== 6) {
      toast({
        title: "Invalid Input",
        description: "Please enter exactly 6 digits",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Wrap Applied",
      description: `Wrap value: ${wrapAroundValue}`,
    });
    // TODO: Implement wrap around logic here
  };

  const generateMnemonic = () => {
    const count = parseInt(wordCount);
    
    // Map word count to entropy bits for standard BIP39 counts
    const standardEntropyMap: { [key: number]: number } = {
      12: 128,
      15: 160,
      18: 192,
      21: 224,
      24: 256
    };
    
    // Use standard entropy if available, otherwise use closest standard and adjust
    const entropyBits = standardEntropyMap[count] || 256;
    const mnemonic = bip39.generateMnemonic(entropyBits);
    
    // Adjust to exact word count if needed (for non-standard counts)
    const words = mnemonic.split(" ");
    const adjustedMnemonic = count <= words.length 
      ? words.slice(0, count).join(" ")
      : mnemonic;
    
    onSeedPhraseChange(adjustedMnemonic);
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(seedPhrase);
    toast({
      title: "Copied!",
      description: "Seed phrase copied to clipboard",
    });
  };

  const downloadSeedPhrase = async (format: "json" | "txt" | "csv" | "png" | "pdf") => {
    const date = new Date();

    if (format === "png") {
      await exportSeedPhraseAsPNG(seedPhrase);
      toast({
        title: "Downloaded!",
        description: "Seed phrase downloaded as PNG",
      });
      return;
    }

    if (format === "pdf") {
      await exportSeedPhraseAsPDF(seedPhrase);
      toast({
        title: "Downloaded!",
        description: "Seed phrase downloaded as PDF",
      });
      return;
    }

    let content: string;
    let mimeType: string;
    let filename: string;

    switch (format) {
      case "json":
        content = await generateSeedJSONContent(seedPhrase, date);
        mimeType = "application/json";
        filename = generateSeedFilename("json", seedPhrase, date);
        break;
      case "txt":
        content = await generateSeedTXTContent(seedPhrase, date);
        mimeType = "text/plain";
        filename = generateSeedFilename("txt", seedPhrase, date);
        break;
      case "csv":
        content = await generateSeedCSVContent(seedPhrase, date);
        mimeType = "text/csv";
        filename = generateSeedFilename("csv", seedPhrase, date);
        break;
    }

    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);

    toast({
      title: "Downloaded!",
      description: `Seed phrase downloaded as ${format.toUpperCase()}`,
    });
  };

  const loadFromFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const result = await importSeedPhraseFromFile(file);
    
    if (result.success) {
      onSeedPhraseChange(result.seedPhrase);
      setInputMode("input");
      toast({
        title: "Success!",
        description: "Seed phrase loaded from file",
      });
    } else {
      toast({
        title: "Error",
        description: result.error || "Failed to import seed phrase",
        variant: "destructive",
      });
    }
    
    // Reset input so the same file can be selected again
    event.target.value = '';
  };

  return (
    <Card className="bg-gradient-to-br from-card to-secondary border-border">
      <CardHeader>
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Seed Phrase Generator
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          Generate or input your mnemonic seed phrase
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Button
            variant={inputMode === "generate" ? "default" : "secondary"}
            onClick={() => setInputMode("generate")}
            className="flex-1"
          >
            Generate
          </Button>
          <Button
            variant={inputMode === "input" ? "default" : "secondary"}
            onClick={() => setInputMode("input")}
            className="flex-1"
          >
            Input
          </Button>
          <Button
            variant="outline"
            onClick={() => document.getElementById('seed-file-upload')?.click()}
            className="flex-shrink-0"
            title="Load from JSON or CSV file"
          >
            <Upload className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            onClick={() => setEncryptionModalOpen(true)}
            className="flex-shrink-0"
            title="Encrypt / Decrypt Files"
          >
            <Shield className="h-4 w-4" />
          </Button>
          <input
            id="seed-file-upload"
            type="file"
            accept=".json,.csv"
            onChange={loadFromFile}
            className="hidden"
          />
        </div>

        {inputMode === "generate" && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="wordCount">Word Count</Label>
              <Select value={wordCount} onValueChange={setWordCount}>
                <SelectTrigger id="wordCount">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {WORD_COUNTS.map((count) => (
                    <SelectItem key={count} value={count.toString()}>
                      {count} words
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button onClick={generateMnemonic} className="w-full" size="lg">
              <RefreshCw className="mr-2 h-4 w-4" />
              Generate Seed Phrase
            </Button>
          </div>
        )}

        {inputMode === "input" && (
          <div className="space-y-2">
            <Label htmlFor="seedInput">Enter Seed Phrase</Label>
            <Textarea
              id="seedInput"
              placeholder="Enter your mnemonic seed phrase..."
              value={seedPhrase}
              onChange={(e) => onSeedPhraseChange(e.target.value)}
              className="min-h-[100px] font-mono text-sm"
            />
          </div>
        )}

        {seedPhrase && (
          <div className="space-y-2">
          <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-3 flex-wrap">
                <Label>Your Seed Phrase</Label>
                <Button size="sm" className="h-8" onClick={() => setChecksumModalOpen(true)}>
                  Checksum
                </Button>
                <Button size="sm" className="h-8" variant="outline" onClick={() => setAdvancedModalOpen(true)}>
                  Advanced
                </Button>
                <Button size="sm" className="h-8" variant="outline" onClick={() => setDerivationDiveModalOpen(true)}>
                  Derivation Path Dive
                </Button>
                <Button size="sm" className="h-8" variant="outline" onClick={() => setPrivateKeyModalOpen(true)}>
                  From privateKey
                </Button>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" onClick={copyToClipboard}>
                  <Copy className="h-4 w-4" />
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => downloadSeedPhrase("json")}>
                      Download as JSON
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => downloadSeedPhrase("txt")}>
                      Download as TXT
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => downloadSeedPhrase("csv")}>
                      Download as CSV
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => downloadSeedPhrase("png")}>
                      <FileImage className="h-4 w-4 mr-2" />
                      Download as PNG
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => downloadSeedPhrase("pdf")}>
                      <FileText className="h-4 w-4 mr-2" />
                      Download as PDF
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <div className="relative">
              <Textarea
                value={seedPhrase}
                readOnly
                className="min-h-[100px] font-mono text-sm bg-secondary/50"
              />
            </div>
            
            {/* Root Extended Private Key GPG Fingerprint */}
            {rootGPGFingerprint && (
              <div className="space-y-2 p-3 bg-muted/50 rounded-lg border border-border">
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-semibold text-muted-foreground">
                    BIP32 Root GPG Key Fingerprint
                  </Label>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={async () => {
                      await navigator.clipboard.writeText(rootGPGFingerprint);
                      toast({
                        title: "Copied!",
                        description: "Root GPG fingerprint copied to clipboard",
                      });
                    }}
                    className="h-6 px-2"
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
                <div className="font-mono text-xs text-foreground bg-background/50 p-2 rounded border border-border/50">
                  {rootGPGFingerprint}
                </div>
                <p className="text-xs text-muted-foreground">
                  This GPG fingerprint is derived from your BIP32 root extended private key and represents the cryptographic identity of your entire wallet hierarchy.
                </p>
              </div>
            )}
            
            {isGeneratingGPG && (
              <div className="p-2 bg-muted/30 rounded-lg border border-border/50 text-center">
                <p className="text-xs text-muted-foreground">
                  Generating root GPG fingerprint...
                </p>
              </div>
            )}
            
            <p className="text-xs text-destructive">
              ⚠️ Never share your seed phrase with anyone. Store it securely offline.
            </p>
          </div>
        )}
      </CardContent>
      <FileEncryptionModal open={encryptionModalOpen} onOpenChange={setEncryptionModalOpen} />
      <ChecksumModal 
        open={checksumModalOpen} 
        onOpenChange={setChecksumModalOpen} 
        seedPhrase={seedPhrase}
        onSeedPhraseChange={onSeedPhraseChange}
      />
      <AdvancedModal
        open={advancedModalOpen}
        onOpenChange={setAdvancedModalOpen}
        seedPhrase={seedPhrase}
        onSeedPhraseChange={onSeedPhraseChange}
      />
      <DerivationPathDiveModal
        open={derivationDiveModalOpen}
        onOpenChange={setDerivationDiveModalOpen}
        seedPhrase={seedPhrase}
        onGenerateWithIndices={onGenerateWithIndices || (async () => {})}
      />
      <PrivateKeyToMnemonicModal
        open={privateKeyModalOpen}
        onOpenChange={setPrivateKeyModalOpen}
        onMnemonicSelect={onSeedPhraseChange}
      />
    </Card>
  );
};
