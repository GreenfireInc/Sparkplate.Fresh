import { useState, useEffect } from "react";
import * as bip39 from "bip39";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { AlertCircle, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DerivationPathDiveModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  seedPhrase: string;
  onGenerateWithIndices: (indices: Record<string, number>) => Promise<void>;
}

export const DerivationPathDiveModal = ({ open, onOpenChange, seedPhrase, onGenerateWithIndices }: DerivationPathDiveModalProps) => {
  const [pin, setPin] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [derivationIndex, setDerivationIndex] = useState<number | null>(null);
  const { toast } = useToast();

  // Clear state when modal closes
  useEffect(() => {
    if (!open) {
      setPin("");
      setDerivationIndex(null);
    }
  }, [open]);

  /**
   * Convert PIN to a derivation index
   * Uses a simple hash function to convert the PIN string to a number
   */
  const pinToDerivationIndex = (pinInput: string): number => {
    let hash = 0;
    for (let i = 0; i < pinInput.length; i++) {
      const char = pinInput.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    // Ensure positive number and reasonable range (0 to 999999)
    return Math.abs(hash) % 1000000;
  };

  const handleGenerate = async () => {
    if (!seedPhrase) {
      toast({
        title: "Error",
        description: "No seed phrase available. Please generate or input a seed phrase first.",
        variant: "destructive",
      });
      return;
    }

    if (pin.length < 4 || pin.length > 10) {
      toast({
        title: "Invalid PIN",
        description: "PIN must be between 4 and 10 characters.",
        variant: "destructive",
      });
      return;
    }

    // Validate seed phrase
    if (!bip39.validateMnemonic(seedPhrase)) {
      toast({
        title: "Invalid Seed Phrase",
        description: "The seed phrase is not valid. Please check your seed phrase.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    try {
      // Convert PIN to derivation index
      const index = pinToDerivationIndex(pin);
      setDerivationIndex(index);

      // Create indices object for all currencies with the same index
      const indices: Record<string, number> = {
        BTC: index,
        LTC: index,
        DOGE: index,
        ETH: index,
        TRX: index,
        SOL: index,
        XTZ: index,
        LUNC: index,
      };

      // Call parent's generate function
      await onGenerateWithIndices(indices);

      toast({
        title: "Addresses Generated",
        description: `Generated addresses at derivation index ${index} for all currencies.`,
      });

      // Close modal after successful generation
      onOpenChange(false);
    } catch (error) {
      console.error("Error generating addresses:", error);
      toast({
        title: "Generation Error",
        description: error instanceof Error ? error.message : "Failed to generate addresses",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleClose = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Derivation Path Dive</DialogTitle>
          <DialogDescription>
            Enter a PIN to explore wallet addresses at a specific derivation path index
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* PIN Input Section */}
          <div className="space-y-2">
            <Label htmlFor="derivation-pin">PIN (4-10 characters)</Label>
            <div className="flex gap-2">
              <Input
                id="derivation-pin"
                type="text"
                placeholder="Enter your PIN..."
                value={pin}
                onChange={(e) => setPin(e.target.value.slice(0, 10))}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !isGenerating && pin.length >= 4) {
                    handleGenerate();
                  }
                }}
                className="font-mono max-w-[200px]"
                maxLength={10}
              />
              <Button
                onClick={handleGenerate}
                disabled={isGenerating || pin.length < 4}
                className="flex-shrink-0"
              >
                {isGenerating ? "Generating..." : "Generate Addresses"}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Your PIN will be converted to a derivation index. Same PIN always produces the same addresses.
            </p>
          </div>

          {/* Derivation Index Display */}
          {derivationIndex !== null && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-blue-50 dark:bg-blue-950 border border-blue-500/20">
              <Info className="h-4 w-4 text-blue-600 dark:text-blue-400 flex-shrink-0" />
              <p className="text-sm text-blue-900 dark:text-blue-100">
                <strong>Derivation Index:</strong> {derivationIndex} (Generated from PIN: {pin})
              </p>
            </div>
          )}

          {/* Information Box */}
          <div className="flex items-start gap-2 p-3 rounded-lg bg-muted border border-border">
            <AlertCircle className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
            <div className="text-xs text-muted-foreground">
              <p className="font-semibold text-foreground mb-1">About Derivation Path Dive</p>
              <p className="leading-tight">
                This tool allows you to explore different derivation paths using a memorable PIN. The PIN is converted to a 
                numerical index (0-999,999) which is used in the derivation path. This lets you create multiple "accounts" 
                from the same seed phrase without remembering complex numbers. Click "Generate Addresses" to view the 
                wallet addresses on the main page.
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

