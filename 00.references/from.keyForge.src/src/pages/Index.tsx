import { useState } from "react";
import { SeedPhraseGenerator } from "@/components/SeedPhraseGenerator";
import { AddressDisplay } from "@/components/AddressDisplay";
import { Button } from "@/components/ui/button";
import { Loader2, Shield } from "lucide-react";
import { generateAddressesFromMnemonic } from "@/utils/cryptoGenerator";
import { useToast } from "@/hooks/use-toast";

interface CryptoAddress {
  currency: string;
  address: string;
  privateKey: string;
  cryptoPublicKey: string;
  keyFingerprint: string;
  gpgPublicKey: string;
  gpgPrivateKey: string;
  derivationPath: string;
}

const Index = () => {
  const [seedPhrase, setSeedPhrase] = useState("");
  const [addresses, setAddresses] = useState<CryptoAddress[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [derivationIndices, setDerivationIndices] = useState<Record<string, number>>({});
  const [rootGPGFingerprint, setRootGPGFingerprint] = useState<string | null>(null);
  const { toast } = useToast();

  const handleGenerateAddresses = async (indices: Record<string, number> = derivationIndices) => {
    if (!seedPhrase.trim()) {
      toast({
        title: "Error",
        description: "Please generate or enter a seed phrase first",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    try {
      const generatedAddresses = await generateAddressesFromMnemonic(seedPhrase, indices);
      setAddresses(generatedAddresses);
      
      // Initialize derivationIndices with all currencies from the generated addresses
      const updatedIndices: Record<string, number> = {};
      generatedAddresses.forEach(addr => {
        // Extract the index from the derivation path
        // For most currencies: m/44'/X'/0'/0/{index} - index is last number (no quote)
        // For SOL/XTZ: m/44'/X'/{index}'/0' - index is second-to-last number (with quote)
        const segments = addr.derivationPath.split('/');
        let extractedIndex = 0;
        
        if (segments.length > 0) {
          const lastSegment = segments[segments.length - 1];
          
          // Check if this is SOL/XTZ format: last segment is "0'" (quoted zero)
          if (lastSegment === "0'" && segments.length > 1) {
            // SOL/XTZ format: extract from second-to-last segment
            const secondToLast = segments[segments.length - 2].replace(/'/g, '');
            const secondToLastNum = parseInt(secondToLast, 10);
            if (!isNaN(secondToLastNum)) {
              extractedIndex = secondToLastNum;
            }
          } else {
            // Standard format: extract from last segment
            const lastNum = parseInt(lastSegment.replace(/'/g, ''), 10);
            if (!isNaN(lastNum)) {
              extractedIndex = lastNum;
            }
          }
        }
        
        updatedIndices[addr.currency] = extractedIndex;
      });
      setDerivationIndices(updatedIndices);
      
      toast({
        title: "Success!",
        description: `Generated addresses for ${generatedAddresses.length} cryptocurrencies`,
      });
    } catch (error) {
      console.error("Address generation error:", error);
      toast({
        title: "Error",
        description: "Failed to generate addresses. Please check your seed phrase.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDerivationIndexChange = async (currency: string, index: number) => {
    // Extract current indices from existing addresses to preserve all currencies
    const currentIndices: Record<string, number> = {};
    addresses.forEach(addr => {
      const segments = addr.derivationPath.split('/');
      let extractedIndex = 0;
      
      if (segments.length > 0) {
        const lastSegment = segments[segments.length - 1];
        
        // Check if this is SOL/XTZ format: last segment is "0'" (quoted zero)
        if (lastSegment === "0'" && segments.length > 1) {
          // SOL/XTZ format: extract from second-to-last segment
          const secondToLast = segments[segments.length - 2].replace(/'/g, '');
          const secondToLastNum = parseInt(secondToLast, 10);
          if (!isNaN(secondToLastNum)) {
            extractedIndex = secondToLastNum;
          }
        } else {
          // Standard format: extract from last segment
          const lastNum = parseInt(lastSegment.replace(/'/g, ''), 10);
          if (!isNaN(lastNum)) {
            extractedIndex = lastNum;
          }
        }
      }
      
      currentIndices[addr.currency] = extractedIndex;
    });
    
    // Update only the changed currency's index
    const newIndices = { ...currentIndices, [currency]: index };
    setDerivationIndices(newIndices);
    await handleGenerateAddresses(newIndices);
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4 py-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Shield className="h-12 w-12 text-primary" />
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Crypto Wallet Generator
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Generate deterministic cryptocurrency wallets with GPG/PGP keypairs from BIP39 mnemonic seed phrases
          </p>
          <div className="flex flex-wrap gap-2 justify-center text-xs text-muted-foreground">
            <span className="px-3 py-1 bg-secondary rounded-full">BTC</span>
            <span className="px-3 py-1 bg-secondary rounded-full">LTC</span>
            <span className="px-3 py-1 bg-secondary rounded-full">DOGE</span>
            <span className="px-3 py-1 bg-secondary rounded-full">ETH</span>
            <span className="px-3 py-1 bg-secondary rounded-full">TRX</span>
            <span className="px-3 py-1 bg-secondary rounded-full">SOL</span>
            <span className="px-3 py-1 bg-secondary rounded-full">XTZ</span>
            <span className="px-3 py-1 bg-secondary rounded-full">LUNC</span>
          </div>
        </div>

        {/* Seed Phrase Generator */}
        <div className="max-w-4xl mx-auto">
          <SeedPhraseGenerator 
            onSeedPhraseChange={setSeedPhrase} 
            seedPhrase={seedPhrase}
            onGenerateWithIndices={handleGenerateAddresses}
            onRootGPGFingerprintChange={setRootGPGFingerprint}
          />
        </div>

        {/* Generate Button */}
        {seedPhrase && (
          <div className="flex justify-center">
            <Button
              onClick={() => handleGenerateAddresses()}
              disabled={isGenerating}
              size="lg"
              className="px-8 bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Generating Addresses...
                </>
              ) : (
                <>
                  <Shield className="mr-2 h-5 w-5" />
                  Generate Wallet Addresses
                </>
              )}
            </Button>
          </div>
        )}

        {/* Address Display */}
        {addresses.length > 0 && (
          <AddressDisplay 
            addresses={addresses} 
            derivationIndices={derivationIndices}
            onDerivationIndexChange={handleDerivationIndexChange}
            mnemonic={seedPhrase}
            rootGPGFingerprint={rootGPGFingerprint || undefined}
          />
        )}

        {/* Security Notice */}
        <div className="max-w-4xl mx-auto mt-12 p-6 bg-destructive/10 border border-destructive/20 rounded-lg">
          <h3 className="text-lg font-semibold text-destructive mb-2 flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Security Warning
          </h3>
          <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
            <li>Never share your seed phrase or private keys with anyone</li>
            <li>Store your seed phrase offline in a secure location</li>
            <li>This tool runs entirely in your browser - no data is sent to any server</li>
            <li>GPG keypairs are deterministically generated from each currency's private key</li>
            <li>Always verify addresses before sending funds</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Index;
