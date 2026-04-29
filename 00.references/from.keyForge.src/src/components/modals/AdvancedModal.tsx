import { useState, useEffect } from "react";
import * as bip39 from "bip39";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { AlertCircle, Info, Copy, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AdvancedModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  seedPhrase: string;
  onSeedPhraseChange: (phrase: string) => void;
}

type ExpansionMethod = "duplicate" | "deterministic" | "random" | "hybrid";

export const AdvancedModal = ({ open, onOpenChange, seedPhrase, onSeedPhraseChange }: AdvancedModalProps) => {
  const [inputSeedPhrase, setInputSeedPhrase] = useState(seedPhrase);
  const [expansionMethod, setExpansionMethod] = useState<ExpansionMethod>("deterministic");
  const [expandedPhrase, setExpandedPhrase] = useState<string>("");
  const [isExpanding, setIsExpanding] = useState(false);
  const { toast } = useToast();

  // Update input when seedPhrase prop changes
  useEffect(() => {
    if (open && seedPhrase) {
      setInputSeedPhrase(seedPhrase);
      setExpandedPhrase("");
    }
  }, [open, seedPhrase]);

  /**
   * Method 1: Duplicate and Append
   * Uses the original entropy twice to create a 24-word phrase with valid checksum.
   * This is the simplest method but provides no additional entropy.
   */
  const expandByDuplication = (phrase: string): string => {
    const words = phrase.trim().split(/\s+/).filter(word => word.length > 0);
    if (words.length !== 12) {
      return phrase;
    }

    try {
      // Get the entropy from the original 12-word phrase (128 bits)
      const originalEntropy = bip39.mnemonicToEntropy(phrase);
      
      // Duplicate the entropy to create 256 bits
      const combinedEntropy = originalEntropy + originalEntropy;
      
      // Generate a proper 24-word phrase with valid checksum
      return bip39.entropyToMnemonic(combinedEntropy);
    } catch (error) {
      console.error("Error in duplicate expansion:", error);
      return phrase;
    }
  };

  /**
   * Method 2: Deterministic Expansion
   * Uses the original seed phrase as entropy to deterministically generate
   * additional entropy. This ensures the same 12-word phrase always expands
   * to the same 24-word phrase.
   */
  const expandByDeterministic = async (phrase: string): Promise<string> => {
    const words = phrase.trim().split(/\s+/).filter(word => word.length > 0);
    if (words.length !== 12) {
      return phrase;
    }

    try {
      // Get the entropy from the original 12-word phrase (128 bits = 32 hex chars)
      const originalEntropy = bip39.mnemonicToEntropy(phrase);
      
      // Convert original phrase to seed for deterministic generation
      const originalSeed = await bip39.mnemonicToSeed(phrase);
      const seedBytes = new Uint8Array(originalSeed);
      
      // Create deterministic additional entropy by hashing the seed
      // This ensures same input always produces same output
      const hashBuffer = await crypto.subtle.digest('SHA-256', seedBytes);
      const hashArray = new Uint8Array(hashBuffer);
      
      // Take first 16 bytes (128 bits = 32 hex chars)
      const additionalEntropy = Array.from(hashArray.slice(0, 16))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
      
      // Combine both entropies to create 256 bits (64 hex chars)
      const combinedEntropy = originalEntropy + additionalEntropy;
      
      // Generate a proper 24-word phrase with valid checksum
      return bip39.entropyToMnemonic(combinedEntropy);
    } catch (error) {
      console.error("Error in deterministic expansion:", error);
      return phrase;
    }
  };

  /**
   * Method 3: Random Expansion
   * Generates additional random entropy and combines it with the original.
   * WARNING: This creates a non-deterministic expansion.
   */
  const expandByRandom = (phrase: string): string => {
    const words = phrase.trim().split(/\s+/).filter(word => word.length > 0);
    if (words.length !== 12) {
      return phrase;
    }

    try {
      // Get the entropy from the original 12-word phrase (128 bits = 32 hex chars)
      const originalEntropy = bip39.mnemonicToEntropy(phrase);
      
      // Generate 128 bits of random entropy
      const additionalEntropy = crypto.getRandomValues(new Uint8Array(16));
      const additionalEntropyHex = Array.from(additionalEntropy)
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
      
      // Combine both entropies to create 256 bits (64 hex chars)
      const combinedEntropy = originalEntropy + additionalEntropyHex;
      
      // Generate a proper 24-word phrase with valid checksum
      return bip39.entropyToMnemonic(combinedEntropy);
    } catch (error) {
      console.error("Error in random expansion:", error);
      return phrase;
    }
  };

  /**
   * Method 4: Hybrid Expansion
   * Uses a combination of deterministic and random entropy.
   * First 64 bits are deterministic, last 64 bits are random.
   */
  const expandByHybrid = async (phrase: string): Promise<string> => {
    const words = phrase.trim().split(/\s+/).filter(word => word.length > 0);
    if (words.length !== 12) {
      return phrase;
    }

    try {
      // Get the entropy from the original 12-word phrase (128 bits = 32 hex chars)
      const originalEntropy = bip39.mnemonicToEntropy(phrase);
      
      // Generate deterministic part (64 bits = 16 hex chars)
      const originalSeed = await bip39.mnemonicToSeed(phrase);
      const seedBytes = new Uint8Array(originalSeed);
      const hashBuffer = await crypto.subtle.digest('SHA-256', seedBytes);
      const hashArray = new Uint8Array(hashBuffer);
      
      // Take first 8 bytes (64 bits = 16 hex chars) for deterministic part
      const deterministicPart = Array.from(hashArray.slice(0, 8))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
      
      // Generate random part (64 bits = 16 hex chars)
      const randomBytes = crypto.getRandomValues(new Uint8Array(8));
      const randomPart = Array.from(randomBytes)
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
      
      // Combine: original (128) + deterministic (64) + random (64) = 256 bits
      const combinedEntropy = originalEntropy + deterministicPart + randomPart;
      
      // Generate a proper 24-word phrase with valid checksum
      return bip39.entropyToMnemonic(combinedEntropy);
    } catch (error) {
      console.error("Error in hybrid expansion:", error);
      return phrase;
    }
  };

  const handleExpand = async () => {
    const trimmedPhrase = inputSeedPhrase.trim();
    
    if (!trimmedPhrase) {
      toast({
        title: "Error",
        description: "Please enter a seed phrase to expand",
        variant: "destructive",
      });
      return;
    }

    const words = trimmedPhrase.split(/\s+/).filter(word => word.length > 0);
    
    if (words.length !== 12) {
      toast({
        title: "Invalid Word Count",
        description: "Expansion currently only supports 12-word seed phrases. Please enter a 12-word phrase.",
        variant: "destructive",
      });
      return;
    }

    // Validate that it's a valid BIP39 mnemonic
    if (!bip39.validateMnemonic(trimmedPhrase)) {
      toast({
        title: "Invalid Mnemonic",
        description: "The seed phrase must be a valid BIP39 mnemonic. Please validate it first using the Checksum button.",
        variant: "destructive",
      });
      return;
    }

    setIsExpanding(true);
    try {
      let expanded: string;
      
      switch (expansionMethod) {
        case "duplicate":
          expanded = expandByDuplication(trimmedPhrase);
          break;
        case "deterministic":
          expanded = await expandByDeterministic(trimmedPhrase);
          break;
        case "random":
          expanded = expandByRandom(trimmedPhrase);
          break;
        case "hybrid":
          expanded = await expandByHybrid(trimmedPhrase);
          break;
        default:
          expanded = trimmedPhrase;
      }

      // Validate the expanded phrase
      const isValid = bip39.validateMnemonic(expanded);
      const expandedWords = expanded.split(/\s+/).filter(word => word.length > 0);
      
      if (isValid && expandedWords.length === 24) {
        setExpandedPhrase(expanded);
        toast({
          title: "Expansion Successful",
          description: `Seed phrase expanded from 12 to 24 words using ${expansionMethod} method. Checksum is valid!`,
        });
      } else {
        console.error("Expansion validation failed:", {
          isValid,
          wordCount: expandedWords.length,
          expanded
        });
        toast({
          title: "Expansion Failed",
          description: `The expanded phrase is invalid. Word count: ${expandedWords.length}, Valid checksum: ${isValid}`,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error expanding seed phrase:", error);
      toast({
        title: "Expansion Error",
        description: error instanceof Error ? error.message : "An error occurred during expansion",
        variant: "destructive",
      });
    } finally {
      setIsExpanding(false);
    }
  };

  const handleApplyExpansion = () => {
    if (expandedPhrase) {
      onSeedPhraseChange(expandedPhrase);
      toast({
        title: "Applied",
        description: "Expanded seed phrase has been applied to the main form",
      });
      onOpenChange(false);
    }
  };

  const handleCopyExpanded = async () => {
    if (expandedPhrase) {
      await navigator.clipboard.writeText(expandedPhrase);
      toast({
        title: "Copied!",
        description: "Expanded seed phrase copied to clipboard",
      });
    }
  };

  const handleClose = () => {
    setExpandedPhrase("");
    onOpenChange(false);
  };

  const methodDescriptions: Record<ExpansionMethod, { title: string; description: string; warning?: string }> = {
    duplicate: {
      title: "Duplicate Method",
      description: "Duplicates the original entropy to create a 24-word phrase with valid checksum. Provides no additional entropy but is the simplest method.",
      warning: "This method does not increase security - same entropy is used twice."
    },
    deterministic: {
      title: "Deterministic Method",
      description: "Uses the original seed phrase to deterministically generate additional entropy. The same 12-word phrase will always expand to the same 24-word phrase with valid checksum.",
      warning: "This method is deterministic - same input always produces same output."
    },
    random: {
      title: "Random Method",
      description: "Combines original entropy with new random entropy to create a 24-word phrase with valid checksum. Each expansion produces different results.",
      warning: "⚠️ WARNING: This method is non-deterministic. You will NOT be able to recreate this expansion later. Use with caution!"
    },
    hybrid: {
      title: "Hybrid Method",
      description: "Combines original entropy with deterministic entropy (64 bits) and random entropy (64 bits). Creates a 24-word phrase with valid checksum.",
      warning: "⚠️ WARNING: Contains random elements. The random portion cannot be recreated later."
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Advanced: Mnemonic Phrase Expansion</DialogTitle>
          <DialogDescription>
            Expand a 12-word seed phrase to 24 words using various methods
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Input Section */}
          <div className="space-y-2">
            <Label htmlFor="advanced-seed-phrase">Original Seed Phrase (12 words)</Label>
            <Textarea
              id="advanced-seed-phrase"
              placeholder="Enter your 12-word mnemonic seed phrase..."
              value={inputSeedPhrase}
              onChange={(e) => setInputSeedPhrase(e.target.value)}
              className="min-h-[80px] font-mono text-sm"
            />
            <p className="text-xs text-muted-foreground">
              Enter a valid 12-word BIP39 seed phrase to expand it to 24 words.
            </p>
          </div>

          {/* Expansion Method Selection - 2 Column Grid */}
          <div className="space-y-2">
            <Label className="text-sm font-semibold">Expansion Method</Label>
            <RadioGroup value={expansionMethod} onValueChange={(value) => setExpansionMethod(value as ExpansionMethod)}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                {Object.entries(methodDescriptions).map(([method, info]) => (
                  <div key={method} className="flex items-start space-x-2 p-3 rounded-lg border border-border hover:bg-muted/50">
                    <RadioGroupItem value={method} id={method} className="mt-0.5" />
                    <div className="flex-1 space-y-1">
                      <Label htmlFor={method} className="font-semibold cursor-pointer text-sm">
                        {info.title}
                      </Label>
                      <p className="text-xs text-muted-foreground leading-tight">
                        {info.description}
                      </p>
                      {info.warning && (
                        <div className="flex items-start gap-1.5 mt-1.5 p-1.5 rounded bg-yellow-50 dark:bg-yellow-950 border border-yellow-500/20">
                          <AlertCircle className="h-3 w-3 text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0" />
                          <p className="text-xs text-yellow-900 dark:text-yellow-100 leading-tight">
                            {info.warning}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </div>

          {/* Expand Button */}
          <Button 
            onClick={handleExpand} 
            className="w-full" 
            size="lg"
            disabled={isExpanding || !inputSeedPhrase.trim()}
          >
            {isExpanding ? "Expanding..." : "Expand to 24 Words"}
          </Button>

          {/* Expanded Phrase Display */}
          {expandedPhrase && (
            <div className="space-y-2 p-3 bg-green-50 dark:bg-green-950 border-2 border-green-500 rounded-lg">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                <Label className="text-sm font-semibold text-green-900 dark:text-green-100">
                  Expanded Seed Phrase (24 words)
                </Label>
              </div>
              
              {/* Checksum Validation Display */}
              <div className="bg-background/50 p-2 rounded-md border border-green-500/30">
                <div className="space-y-1 text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-3 w-3 text-green-600 dark:text-green-400" />
                    <span className="text-green-900 dark:text-green-100">
                      Word count: {expandedPhrase.split(/\s+/).filter(w => w.length > 0).length} ✓
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-3 w-3 text-green-600 dark:text-green-400" />
                    <span className="text-green-900 dark:text-green-100">
                      Entropy bits: 256 ✓
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-3 w-3 text-green-600 dark:text-green-400" />
                    <span className="text-green-900 dark:text-green-100">
                      Checksum: Valid ✓
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-3 w-3 text-green-600 dark:text-green-400" />
                    <span className="text-green-900 dark:text-green-100">
                      Method: {methodDescriptions[expansionMethod].title}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Textarea
                  value={expandedPhrase}
                  readOnly
                  className="min-h-[100px] font-mono text-sm bg-background/50"
                />
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCopyExpanded}
                    className="flex-1"
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                  <Button
                    variant="default"
                    size="sm"
                    onClick={handleApplyExpansion}
                    className="flex-1 bg-green-600 hover:bg-green-700"
                  >
                    Apply to Main Form
                  </Button>
                </div>
              </div>

              <div className="flex items-start gap-2 p-2 rounded bg-blue-50 dark:bg-blue-950 border border-blue-500/20">
                <Info className="h-4 w-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-blue-900 dark:text-blue-100 leading-tight">
                  <strong>Important:</strong> The expanded 24-word phrase is a new seed phrase. 
                  {expansionMethod === "random" || expansionMethod === "hybrid" 
                    ? " Contains random elements - cannot be recreated later. Save it now!" 
                    : " Can be recreated using the same method."}
                </p>
              </div>
            </div>
          )}

          {/* Information Box - Compact */}
          <div className="flex items-start gap-2 p-3 rounded-lg bg-muted border border-border">
            <Info className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
            <div className="text-xs text-muted-foreground">
              <p className="font-semibold text-foreground mb-1">About Mnemonic Expansion</p>
              <p className="leading-tight">
                Expansion converts 12-word (128-bit) to 24-word (256-bit) phrases. Different methods provide different levels of determinism. 
                Always validate expanded phrases and store them securely.
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

