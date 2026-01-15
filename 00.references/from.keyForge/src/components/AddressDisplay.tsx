import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Key, Download, FileImage, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { QRCodeSVG } from "qrcode.react";
import {
  exportCryptoAsPDF,
  exportCryptoAsPNG,
  exportGeneralAddressesAsPDF,
  exportGeneralAddressesAsPNG,
  exportIndividualCryptoAsJSON,
  exportIndividualCryptoAsCSV,
  exportIndividualCryptoAsTXT,
  exportWalletAddressesAsJSON,
  exportWalletAddressesAsCSV,
  exportWalletAddressesAsTXT,
  type ExportCryptoAddress,
  type GeneralAddress,
} from "@/lib/exportStandard/currencies";
import { useState } from "react";

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

interface AddressDisplayProps {
  addresses: CryptoAddress[];
  derivationIndices: Record<string, number>;
  onDerivationIndexChange: (currency: string, index: number) => void;
  mnemonic?: string;
  rootGPGFingerprint?: string;
}

/**
 * Get the crypto icon path for a given currency name
 * Maps currency names to their corresponding SVG files in /assets/icons/crypto/
 */
function getCryptoIconPath(currency: string): string {
  // Normalize currency name to lowercase for matching
  const normalized = currency.toLowerCase();
  
  // Map common currency variations to their icon filenames
  const iconMap: Record<string, string> = {
    btc: "btc",
    bitcoin: "btc",
    eth: "eth",
    ethereum: "eth",
    ltc: "ltc",
    litecoin: "ltc",
    sol: "sol",
    solana: "sol",
    trx: "trx",
    tron: "trx",
    xtz: "xtz",
    tezos: "xtz",
    lunc: "lunc",
    terra: "lunc",
    ada: "ada",
    cardano: "ada",
    dot: "dot",
    polkadot: "dot",
    link: "link",
    chainlink: "link",
    matic: "matic",
    polygon: "matic",
    avax: "avax",
    avalanche: "avax",
    bnb: "bnb",
    binance: "bnb",
    xrp: "xrp",
    ripple: "xrp",
    doge: "doge",
    dogecoin: "doge",
    shib: "shib",
    shiba: "shib",
    atom: "atom",
    cosmos: "atom",
    algo: "algo",
    algorand: "algo",
    near: "near",
    etc: "etc",
    ethereumclassic: "etc",
    bch: "bch",
    bitcoincash: "bch",
    xlm: "xlm",
    stellar: "xlm",
    zec: "zec",
    zcash: "zec",
    eos: "eos",
    icp: "icp",
    internetcomputer: "icp",
    fil: "fil",
    filecoin: "fil",
    aave: "aave",
    uni: "uni",
    uniswap: "uni",
    dai: "dai",
    usdc: "usdc",
    usdt: "usdt",
    tether: "usdt",
    busd: "busd",
    wbtc: "wbtc",
    wrappedbitcoin: "wbtc",
  };

  // Try to find a match in the icon map
  const iconName = iconMap[normalized];
  
  if (iconName) {
    return `/assets/icons/crypto/${iconName}.svg`;
  }
  
  // Fallback: try using the normalized currency name directly
  return `/assets/icons/crypto/${normalized}.svg`;
}

export const AddressDisplay = ({ addresses, derivationIndices, onDerivationIndexChange, mnemonic, rootGPGFingerprint }: AddressDisplayProps) => {
  const { toast } = useToast();
  const [gpgQrModalOpen, setGpgQrModalOpen] = useState(false);
  const [selectedGpgPublicKey, setSelectedGpgPublicKey] = useState<string | null>(null);
  const [selectedCurrency, setSelectedCurrency] = useState<string | null>(null);

  const copyToClipboard = async (text: string, label: string) => {
    await navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: `${label} copied to clipboard`,
    });
  };

  const downloadAddresses = (format: "csv" | "json" | "txt") => {
    if (!mnemonic) {
      toast({
        title: "Error",
        description: "Mnemonic seed phrase is required for export",
        variant: "destructive",
      });
      return;
    }

    // Convert CryptoAddress[] to GeneralAddress[]
    const generalAddresses: GeneralAddress[] = addresses.map(a => ({
      currency: a.currency,
      address: a.address,
      derivationPath: a.derivationPath,
      keyFingerprint: a.keyFingerprint,
      cryptoPublicKey: a.cryptoPublicKey,
      privateKey: a.privateKey,
      gpgPublicKey: a.gpgPublicKey,
      gpgPrivateKey: a.gpgPrivateKey,
    }));

    if (format === "csv") {
      exportWalletAddressesAsCSV(generalAddresses, mnemonic);
    } else if (format === "json") {
      exportWalletAddressesAsJSON(generalAddresses, mnemonic);
    } else {
      exportWalletAddressesAsTXT(generalAddresses, mnemonic);
    }
    
    toast({
      title: "Downloaded!",
      description: `Addresses downloaded as ${format.toUpperCase()}`,
    });
  };

  const downloadSingleAddress = (crypto: CryptoAddress, format: "csv" | "json" | "txt") => {
    // Convert CryptoAddress to ExportCryptoAddress format
    const exportData: ExportCryptoAddress = {
      currency: crypto.currency,
      address: crypto.address,
      privateKey: crypto.privateKey,
      cryptoPublicKey: crypto.cryptoPublicKey,
      keyFingerprint: crypto.keyFingerprint,
      gpgPublicKey: crypto.gpgPublicKey,
      gpgPrivateKey: crypto.gpgPrivateKey,
      derivationPath: crypto.derivationPath,
      mnemonic: mnemonic, // Use mnemonic from props
    };

    if (format === "csv") {
      exportIndividualCryptoAsCSV(exportData);
    } else if (format === "json") {
      exportIndividualCryptoAsJSON(exportData);
    } else {
      exportIndividualCryptoAsTXT(exportData);
    }
    
    toast({
      title: "Downloaded!",
      description: `${crypto.currency} address downloaded as ${format.toUpperCase()}`,
    });
  };

  const downloadAsPDF = async (crypto: CryptoAddress) => {
    // Find the current address from the addresses array to ensure we have the latest derivation path
    const currentAddress = addresses.find(a => a.currency === crypto.currency) || crypto;
    await exportCryptoAsPDF({ ...currentAddress, mnemonic });
    toast({
      title: "Downloaded!",
      description: `${currentAddress.currency} keys exported as PDF`,
    });
  };

  const downloadAsPNG = async (crypto: CryptoAddress) => {
    // Find the current address from the addresses array to ensure we have the latest derivation path
    const currentAddress = addresses.find(a => a.currency === crypto.currency) || crypto;
    await exportCryptoAsPNG({ ...currentAddress, mnemonic });
    toast({
      title: "Downloaded!",
      description: `${currentAddress.currency} keys exported as PNG`,
    });
  };

  const downloadAllAddressesAsPDF = async () => {
    if (!mnemonic) {
      toast({
        title: "Error",
        description: "Mnemonic seed phrase is required for export",
        variant: "destructive",
      });
      return;
    }

    const generalAddresses = addresses.map(a => ({
      currency: a.currency,
      address: a.address,
      derivationPath: a.derivationPath,
      keyFingerprint: a.keyFingerprint,
    }));
    await exportGeneralAddressesAsPDF(generalAddresses, mnemonic, rootGPGFingerprint);
    toast({
      title: "Downloaded!",
      description: "All wallet addresses exported as PDF",
    });
  };

  const downloadAllAddressesAsPNG = async () => {
    if (!mnemonic) {
      toast({
        title: "Error",
        description: "Mnemonic seed phrase is required for export",
        variant: "destructive",
      });
      return;
    }

    const generalAddresses = addresses.map(a => ({
      currency: a.currency,
      address: a.address,
      derivationPath: a.derivationPath,
      keyFingerprint: a.keyFingerprint,
    }));
    await exportGeneralAddressesAsPNG(generalAddresses, mnemonic, rootGPGFingerprint);
    toast({
      title: "Downloaded!",
      description: "All wallet addresses exported as PNG",
    });
  };

  if (addresses.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Generated Addresses & Keys
        </h2>
        {/* Download dropdown for all wallet addresses
            - CSV/JSON/TXT: Uses filenameStructureAndContent.walletAddresses.text.ts
              (generates filenames via generateWalletAddressesFilename)
            - PDF/PNG: Uses filenameStructureAndContent.walletAddresses.visual.ts
              (generates filenames via generateWalletAddressesFilename from text file)
        */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => downloadAddresses("csv")}>
              Download as CSV
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => downloadAddresses("json")}>
              Download as JSON
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => downloadAddresses("txt")}>
              Download as TXT
            </DropdownMenuItem>
            <DropdownMenuItem onClick={downloadAllAddressesAsPDF}>
              <FileText className="h-4 w-4 mr-2" />
              Download Addresses as PDF
            </DropdownMenuItem>
            <DropdownMenuItem onClick={downloadAllAddressesAsPNG}>
              <FileImage className="h-4 w-4 mr-2" />
              Download Addresses as PNG
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        {addresses.map((crypto) => (
          <Card key={crypto.currency} className="bg-gradient-to-br from-card to-secondary border-border hover:shadow-[var(--glow-primary)] transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <img 
                      src={getCryptoIconPath(crypto.currency)} 
                      alt={crypto.currency}
                      className="w-6 h-6"
                      onError={(e) => {
                        // Hide icon if it fails to load
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                    <span className="text-lg">{crypto.currency}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground font-mono font-normal">
                        {crypto.derivationPath}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">Derivation Index:</span>
                      <Input
                        type="number"
                        min="0"
                        max="999999"
                        value={derivationIndices[crypto.currency] ?? 0}
                        onChange={(e) => {
                          const value = parseInt(e.target.value);
                          if (!isNaN(value) && value >= 0 && value <= 999999) {
                            onDerivationIndexChange(crypto.currency, value);
                          }
                        }}
                        className="h-6 w-24 text-xs font-mono"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="font-mono text-xs flex items-center gap-1">
                    <img 
                      src={getCryptoIconPath(crypto.currency)} 
                      alt={crypto.currency}
                      className="w-3 h-3"
                      onError={(e) => {
                        // Hide icon if it fails to load
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                    {crypto.currency}
                  </Badge>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <Download className="h-3 w-3" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => downloadAsPDF(crypto)}>
                        <FileText className="h-3 w-3 mr-2" />
                        Download as PDF
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => downloadAsPNG(crypto)}>
                        <FileImage className="h-3 w-3 mr-2" />
                        Download as PNG
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => downloadSingleAddress(crypto, "csv")}>
                        Download as CSV
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => downloadSingleAddress(crypto, "json")}>
                        Download as JSON
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => downloadSingleAddress(crypto, "txt")}>
                        Download as TXT
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Tabs defaultValue="general" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="general">General</TabsTrigger>
                  <TabsTrigger value="advanced">Advanced</TabsTrigger>
                </TabsList>
                <TabsContent value="general" className="mt-4 space-y-6">
                  {/* Address QR Code */}
                  <div className="flex flex-col items-center space-y-3">
                    <span className="text-sm font-medium text-muted-foreground">Wallet Address</span>
                    <div className="p-3 bg-white rounded-lg relative">
                      <QRCodeSVG value={crypto.address} size={120} level="M" />
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <img 
                          src={getCryptoIconPath(crypto.currency)} 
                          alt={crypto.currency}
                          className="w-8 h-8"
                          onError={(e) => {
                            // Hide icon if it fails to load
                            (e.target as HTMLImageElement).style.display = 'none';
                          }}
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-2 w-full">
                      <div className="flex-1 p-2 bg-secondary/50 rounded-md font-mono text-xs break-all text-center">
                        {crypto.address}
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(crypto.address, "Address")}
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>

                  {/* GPG Public Key QR Code */}
                  <div className="flex flex-col items-center space-y-3">
                    <span className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                      <Key className="h-3 w-3" />
                      GPG Public Key
                    </span>
                    <div 
                      className="p-3 bg-white rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                      onClick={() => {
                        setSelectedGpgPublicKey(crypto.gpgPublicKey);
                        setSelectedCurrency(crypto.currency);
                        setGpgQrModalOpen(true);
                      }}
                    >
                      <QRCodeSVG value={crypto.gpgPublicKey} size={120} level="L" />
                    </div>
                    <div className="flex items-center gap-2 w-full">
                      <div className="flex-1 p-2 bg-secondary/50 rounded-md font-mono text-xs break-all text-center">
                        {crypto.keyFingerprint}
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(crypto.keyFingerprint, "Key Fingerprint")}
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="advanced" className="mt-4 space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Address</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(crypto.address, "Address")}
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                    <div className="p-3 bg-secondary/50 rounded-md font-mono text-xs break-all">
                      {crypto.address}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Public Key</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(crypto.cryptoPublicKey, "Public Key")}
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                    <div className="p-3 bg-secondary/50 rounded-md font-mono text-xs break-all">
                      {crypto.cryptoPublicKey}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Private Key</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(crypto.privateKey, "Private Key")}
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                    <div className="p-3 bg-destructive/10 rounded-md font-mono text-xs break-all border border-destructive/20">
                      {crypto.privateKey}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Key Fingerprint</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(crypto.keyFingerprint, "Key Fingerprint")}
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                    <div className="p-3 bg-secondary/50 rounded-md font-mono text-xs break-all">
                      {crypto.keyFingerprint}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground flex items-center gap-1">
                        <Key className="h-3 w-3" />
                        GPG Public Key
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(crypto.gpgPublicKey, "GPG Public Key")}
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                    <div className="p-3 bg-secondary/50 rounded-md font-mono text-xs break-all max-h-32 overflow-y-auto">
                      {crypto.gpgPublicKey}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground flex items-center gap-1">
                        <Key className="h-3 w-3" />
                        GPG Private Key
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(crypto.gpgPrivateKey, "GPG Private Key")}
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                    <div className="p-3 bg-destructive/10 rounded-md font-mono text-xs break-all max-h-32 overflow-y-auto border border-destructive/20">
                      {crypto.gpgPrivateKey}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* GPG Public Key QR Code Modal */}
      <Dialog open={gpgQrModalOpen} onOpenChange={setGpgQrModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Key className="h-5 w-5" />
              GPG Public Key QR Code
              {selectedCurrency && (
                <>
                  <span className="text-muted-foreground">-</span>
                  <img 
                    src={getCryptoIconPath(selectedCurrency)} 
                    alt={selectedCurrency}
                    className="w-5 h-5"
                    onError={(e) => {
                      // Hide icon if it fails to load
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                  <span>{selectedCurrency}</span>
                </>
              )}
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center space-y-4 py-4">
            {selectedGpgPublicKey && (
              <div className="p-4 bg-white rounded-lg relative">
                <QRCodeSVG value={selectedGpgPublicKey} size={300} level="L" />
                {selectedCurrency && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <img 
                      src={getCryptoIconPath(selectedCurrency)} 
                      alt={selectedCurrency}
                      className="w-16 h-16"
                      onError={(e) => {
                        // Hide icon if it fails to load
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  </div>
                )}
              </div>
            )}
            <p className="text-sm text-muted-foreground text-center">
              Scan this QR code to import the GPG public key
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
