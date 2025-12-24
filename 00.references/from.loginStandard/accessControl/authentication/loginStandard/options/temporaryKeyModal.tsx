import { useMemo, useState, useEffect, useCallback } from "react";
import { getTranslation, type LocaleCode } from "@/lib/i18n";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import QRCode from "react-qr-code";
import { Copy, ExternalLink, Eye, EyeOff, Archive, ArchiveX } from "lucide-react";
import { toast } from "sonner";
import { Importing } from "@/components/global";
import { Exporting } from "@/components/global/privateKeyManagement/exporting";
import { PrivateKeyExtraction } from "@/components/global/privateKeyManagement";
import {
  BitcoinAddressDisplay,
  LitecoinAddressDisplay,
  PolkadotAddressDisplay,
  MultiFormatAddressRenderer,
  generateMultiFormatAddresses,
  type StacksAddresses
} from '@/components/currencyCore/currencies/ext/multiFormatAddresses';
import type { DerivedInfo } from '@/components/currencyCore/currencies/currencyData';
import { QrCodeMultFormatAddressDisplay } from '@/components/partials/qrCode';
import { ImportGenerationStyle } from '@/components/currencyCore/currencies/ext';
// import { cardanoData, CardanoAddressFormat } from "@/components/currencyCore/currencies/ADA.Cardano"; // DISABLED
import { DomainRouter } from '@/components/currencyCore/domains/router.domains';
import { SupportedTicker, NETWORKS, PROTOCOL_PREFIXES } from '@/components/currencyCore/currencies';


interface TemporaryKeyModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  bruteForceMode?: boolean;
  onBruteForceModeChange?: (mode: boolean) => void;
  language?: LocaleCode;
}

import {
  BitcoinAddresses,
  LitecoinAddresses,
  StacksAddressDisplay
} from '@/components/currencyCore/currencies/ext/multiFormatAddresses';


// DISABLED: Cardano types and functionality
// type CardanoAddresses = {
//   BaseAddress?: { address: string; description: string };
//   ByronAddress?: { address: string; description: string };
//   RewardAddress?: { address: string; description: string };
// };


// Function to get block explorer link using currency-specific methods
const getBlockExplorerLink = async (ticker: string, format: string, address: string): Promise<string | null> => {
  try {
    // Import the currency data
    const { currencyByTicker } = await import('@/components/currencyCore/currencies');
    const currency = currencyByTicker[ticker];
    
    // All currencies now have their own getBlockExplorerLink method
    if (currency?.getBlockExplorerLink) {
      return currency.getBlockExplorerLink(address, format);
    }
    
    // No fallback needed - all currencies have been migrated
    console.warn(`Currency ${ticker} does not have a getBlockExplorerLink method`);
    return null;
  } catch (error) {
    console.error(`Error getting block explorer link for ${ticker}:`, error);
    return null;
  }
};

async function deriveFromPrivateKey(
  ticker: SupportedTicker, 
  priv: string,
  polkadotMethod?: 'auto' | 'polkadotjs' | 'exodus'
): Promise<DerivedInfo> {
  // Import the currency data
  const { currencyByTicker } = await import('@/components/currencyCore/currencies');
  
  // Get the currency data for the selected ticker
  const currency = currencyByTicker[ticker];
  
  // Check if the currency exists and has a derivation function
  if (!currency) {
    throw new Error(`Unsupported ticker: ${ticker}`);
  }
  
  if (!currency.deriveFromPrivateKey) {
    throw new Error(`No derivation function available for ${ticker}`);
  }
  
  // Use the currency-specific derivation function
  try {
    // For Polkadot, pass the selected method
    if (ticker === 'DOT' && polkadotMethod) {
      return await currency.deriveFromPrivateKey(priv, polkadotMethod);
    }
    
    return await currency.deriveFromPrivateKey(priv);
  } catch (error) {
    console.error(`Error deriving ${ticker} address:`, error);
    throw new Error(`Failed to derive ${ticker} address: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export const TemporaryKeyModal = ({ open, onOpenChange, bruteForceMode, onBruteForceModeChange, language = "en" }: TemporaryKeyModalProps) => {
  const [ticker, setTicker] = useState<SupportedTicker>("ETH");
  const [privateKeyInput, setPrivateKeyInput] = useState("");
  const [processedPrivateKey, setProcessedPrivateKey] = useState<string>(""); // Store the actual private key used for derivation
  const [derived, setDerived] = useState<DerivedInfo | null>(null);
  const [bitcoinAddresses, setBitcoinAddresses] = useState<BitcoinAddresses | null>(null);
  const [litecoinAddresses, setLitecoinAddresses] = useState<LitecoinAddresses | null>(null);
  const [stacksAddresses, setStacksAddresses] = useState<StacksAddresses | null>(null);
  const [showPrivateKey, setShowPrivateKey] = useState(false);
  const [qrCodeAddress, setQrCodeAddress] = useState<string>("");
  const [selectedNetwork, setSelectedNetwork] = useState<string>("");
  const [showExportPanel, setShowExportPanel] = useState(false);
  const [polkadotImportMethod, setPolkadotImportMethod] = useState<'exodus' | 'polkadotjs' | 'auto'>('auto');
  // const [cardanoAddresses, setCardanoAddresses] = useState<CardanoAddresses | null>(null); // DISABLED

  const resetAll = () => {
    setTicker("ETH");
    setPrivateKeyInput("");
    setProcessedPrivateKey("");
    setDerived(null);
    setBitcoinAddresses(null);
    setLitecoinAddresses(null);
    setStacksAddresses(null);
    setShowPrivateKey(false);
    setQrCodeAddress("");
    setSelectedNetwork("");
    setShowExportPanel(false);
    setPolkadotImportMethod('auto');
    // setCardanoAddresses(null); // DISABLED
  };

  const handleAddressChange = (address: string, network: string) => {
    setQrCodeAddress(address);
    setSelectedNetwork(network);
  };

  const networkOption = useMemo(() => NETWORKS.find(n => n.ticker === ticker)!, [ticker]);

  // Re-derive address when Polkadot import method changes
  useEffect(() => {
    if (ticker === 'DOT' && derived && privateKeyInput) {
      console.log(`🔄 [TemporaryKeyModal] Polkadot method changed to: ${polkadotImportMethod}`);
      console.log(`🔄 [TemporaryKeyModal] Re-deriving address with new method...`);
      // Trigger re-derivation by calling handleDerive
      handleDerive();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [polkadotImportMethod]);





  const handleDerive = async () => {
    console.log("🎯 handleDerive called with ticker:", ticker, "privateKey length:", privateKeyInput.trim().length);
    console.log("🔑 privateKeyInput preview:", privateKeyInput.trim().substring(0, 100) + "...");

    const resolvedInput = privateKeyInput.trim();

    // Additional check for JSON content
    if (resolvedInput.startsWith('{"version"') || resolvedInput.includes('"crypto"')) {
      console.log("❌ ERROR: resolvedInput contains JSON keystore instead of private key!");
      console.log("🚨 This means the Importing component didn't properly handle the keystore");
      toast.error(getTranslation(language, "invalidPrivateKeyFormat"));
      return;
    }
    
    try {
      // Use the unified address generation service
      const result = await generateMultiFormatAddresses(
        ticker,
        resolvedInput,
        ticker === 'DOT' ? polkadotImportMethod : undefined
      );

      // Store the processed private key for export
      setProcessedPrivateKey(resolvedInput);

      // Update all state with the generated addresses
      setDerived(result.derived);
      setQrCodeAddress(result.derived.address);
      setBitcoinAddresses(result.bitcoinAddresses || null);
      setLitecoinAddresses(result.litecoinAddresses || null);
      setStacksAddresses(result.stacksAddresses || null);

      // Clear addresses for unsupported tickers
      if (!result.bitcoinAddresses && !result.litecoinAddresses && !result.stacksAddresses) {
        setBitcoinAddresses(null);
        setLitecoinAddresses(null);
        setStacksAddresses(null);
      }
    } catch (e) {
      console.error("❌ Error in handleDerive:", e);
      toast.error(`${getTranslation(language, "error")} ${e instanceof Error ? e.message : 'Unknown error'}`);
      setDerived(null);
      setQrCodeAddress("");
      setSelectedNetwork("");
      setBitcoinAddresses(null);
      setLitecoinAddresses(null);
      setStacksAddresses(null);
      // setCardanoAddresses(null); // DISABLED
      
      // If this is a Tezos or Polkadot error related to format, provide more guidance
      const errorMsg = e instanceof Error ? e.message : 'Unknown error';
      if (ticker === "XTZ" && errorMsg.includes("Tezos")) {
        toast(getTranslation(language, "tezosTip"), {
          description: getTranslation(language, "tezosTipDescription")
        });
      } else if (ticker === "DOT" && errorMsg.includes("Polkadot")) {
        toast(getTranslation(language, "polkadotTip"), {
          description: getTranslation(language, "polkadotTipDescription")
        });
      }
    }
  };

  const getExplorerLink = async (ticker: SupportedTicker, address: string) => {
    const { currencyByTicker } = await import('@/components/currencyCore/currencies');
    const currency = currencyByTicker[ticker];
    if (currency?.blockExplorer?.blockExplorerLink) {
      return `${currency.blockExplorer.blockExplorerLink}${address}`;
    }
    return null;
  };

  
  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        toast.success(`${label} copied to clipboard`);
      })
      .catch((err) => {
        console.error('Failed to copy:', err);
        toast.error('Failed to copy to clipboard');
      });
  };

  return (
    <>
    <Dialog
      open={open}
      onOpenChange={(o) => {
        if (!o) {
          resetAll();
          onOpenChange(false);
        } else {
          onOpenChange(true);
        }
      }}
    >
      <DialogContent className={`w-full ${showExportPanel ? 'max-w-5xl' : 'max-w-2xl'} bg-card rounded-2xl shadow-login-panel overflow-hidden`}>
        <div className="px-6 py-4 relative">
          <button
            aria-label="Close"
            className="absolute right-3 top-3 inline-flex items-center justify-center h-8 w-8 rounded-full bg-transparent hover:bg-black/5 text-black/70 hover:text-black transition"
            onClick={() => { resetAll(); onOpenChange(false); }}
          >
            ✕
          </button>
          <DialogHeader>
            <DialogTitle className="text-xl text-black">{getTranslation(language, "temporaryPrivateKey")}</DialogTitle>
          </DialogHeader>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-[125px_1fr] gap-4 items-end">
            <div>
              <Label className="mb-2 block text-black">{getTranslation(language, "network")}</Label>
              <Select value={ticker} onValueChange={(v) => {
                const newTicker = v as SupportedTicker;
                if (newTicker !== ticker) {
                  setTicker(newTicker);
                  setPrivateKeyInput("");
                  setProcessedPrivateKey("");
                  setDerived(null);
                  setQrCodeAddress("");
                  setSelectedNetwork("");
                  setBitcoinAddresses(null);
                  setLitecoinAddresses(null);
                  setPolkadotImportMethod('auto');
                  // setCardanoAddresses(null); // DISABLED
                }
              }}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={getTranslation(language, "selectNetwork")} />
                </SelectTrigger>
                <SelectContent>
                  {NETWORKS.map((n) => (
                    <SelectItem key={n.ticker} value={n.ticker}>
                      <span className="inline-flex items-center gap-2">
                        <img src={n.icon} alt={n.ticker} className="w-4 h-4" />
                        {n.label}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Importing
              label={`${networkOption.label} ${getTranslation(language, "privateKey")}`}
              placeholder={getTranslation(language, "pastePrivateKey")}
              value={privateKeyInput}
              onChange={setPrivateKeyInput}
              onSubmit={handleDerive}
              submitLabel={getTranslation(language, "use")}
              acceptedFileTypes=".json,.txt,.key"
              bruteForceMode={bruteForceMode}
              onBruteForceModeChange={onBruteForceModeChange}
              language={language}
            />
          </div>

          //TODO: Consider moving this to a separate component.2
          {/* Polkadot Import Method Toggle - Only shown when DOT is selected */}
          {ticker === "DOT" && (
            <div className="mt-4">
              <div className="flex items-center justify-start gap-3 px-1">
                <Label className="text-sm text-black font-medium">{getTranslation(language, "importMethod")}</Label>
                <ImportGenerationStyle
                  value={polkadotImportMethod}
                  onChange={setPolkadotImportMethod}
                />
              </div>
              {/* Show note if keystore was imported */}
              {privateKeyInput.startsWith('PKCS8_PUB:') && (
                <div className="mt-2 px-1 text-xs text-gray-600 dark:text-gray-400">
{getTranslation(language, "keystoreImportNote")}
                </div>
              )}
            </div>
          )}

          {derived && (
            <div className="mt-6 w-full">
              <div className={`flex ${showExportPanel ? 'flex-row' : 'flex-col'} items-start gap-6`}>
                {/* QR Code and Address Information */}
                <div className="flex flex-col items-center gap-3 flex-shrink-0">
                  <div className="relative">
                    <QRCode
                      value={qrCodeAddress || derived.address}
                      size={280}
                      level="H"
                      bgColor="white"
                      fgColor="black"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <img
                        src={networkOption.icon}
                        alt={ticker}
                        className="w-16 h-16 bg-white rounded-full p-2 shadow-lg"
                      />
                    </div>
                  </div>

                  {/* Pill switcher for Polkadot, Litecoin, Bitcoin, and Stacks multi-format addresses */}
                  {(ticker === "DOT" || ticker === "LTC" || ticker === "BTC" || ticker === "STX") && derived.formattedDisplay && (
                    <QrCodeMultFormatAddressDisplay
                      formattedDisplay={derived.formattedDisplay}
                      onAddressChange={handleAddressChange}
                    />
                  )}
                  <div className="mt-4 text-xs break-all text-muted-foreground text-center w-full max-w-[520px] flex items-center justify-center gap-2">
                    <div className="flex-grow text-center">
                      {/* Handle Polkadot, Litecoin, Bitcoin, and Stacks multi-format display */}
                      {(ticker === "DOT" || ticker === "LTC" || ticker === "BTC" || ticker === "STX") && derived.formattedDisplay && selectedNetwork ? (
                        // Display only the selected network address
                        <a
                          href="#"
                          onClick={async (e) => {
                            e.preventDefault();
                            const link = await getExplorerLink(ticker, qrCodeAddress);
                            if (link) {
                              window.open(link, '_blank', 'noopener,noreferrer');
                            }
                          }}
                          className="text-blue-600 hover:text-blue-800 underline break-all block"
                        >
                          {selectedNetwork}://{qrCodeAddress}
                        </a>
                      ) : (ticker === "DOT" || ticker === "LTC" || ticker === "BTC" || ticker === "STX") && derived.formattedDisplay ? (
                        // Fallback: Display all networks/formats on separate lines (when no selection made yet)
                        <div className="space-y-1">
                          {derived.formattedDisplay.split('\n').map((line, index) => (
                            <div key={index}>
                              <a
                                href="#"
                                onClick={async (e) => {
                                  e.preventDefault();
                                  // Extract address from the line (remove protocol prefix)
                                  const address = line.replace(/^.*:\/\/(.*)$/, '$1');
                                  const link = await getExplorerLink(ticker, address);
                                  if (link) {
                                    window.open(link, '_blank', 'noopener,noreferrer');
                                  }
                                }}
                                className="text-blue-600 hover:text-blue-800 underline break-all block"
                              >
                                {line}
                              </a>
                            </div>
                          ))}
                        </div>
                      ) : (
                        /* Regular single network display */
                        <a
                          href="#"
                          onClick={async (e) => {
                            e.preventDefault();
                            const link = await getExplorerLink(ticker, derived.address);
                            if (link) {
                              window.open(link, '_blank', 'noopener,noreferrer');
                            }
                          }}
                          className="text-blue-600 hover:text-blue-800 underline break-all"
                        >
                          {`${PROTOCOL_PREFIXES[ticker]}${derived.address}`}
                        </a>
                      )}
                    </div>
                    <button
                      onClick={() => copyToClipboard(
                        (ticker === "DOT" || ticker === "LTC" || ticker === "BTC" || ticker === "STX") && derived.formattedDisplay && selectedNetwork
                          ? `${selectedNetwork}://${qrCodeAddress}` // Copy selected network/format address
                          : (ticker === "DOT" || ticker === "LTC" || ticker === "BTC" || ticker === "STX") && derived.formattedDisplay
                          ? derived.formattedDisplay // Copy all addresses when no selection made
                          : `${PROTOCOL_PREFIXES[ticker]}${derived.address}`, // Standard format for other currencies
getTranslation(language, "walletAddress")
                      )}
                      className="p-1 rounded hover:bg-gray-200 transition-colors"
                      title={getTranslation(language, "copyWalletAddress")}
                    >
                      <Copy size={16} />
                    </button>
                  </div>

                  {/* Domain Name Display - resolves automatically */}
                  <DomainRouter 
                    address={derived.address}
                    ticker={ticker}
                    copyToClipboard={copyToClipboard}
                    language={language}
                  />
                  
                  
                  {/* STX Private Key Display - using extracted component */}
                  <PrivateKeyExtraction
                    ticker={ticker}
                    derived={derived}
                    showPrivateKey={showPrivateKey}
                    setShowPrivateKey={setShowPrivateKey}
                    copyToClipboard={copyToClipboard}
                    language={language}
                  />

                  <div className="mt-2 text-xs break-all text-muted-foreground text-center w-full max-w-[520px] flex items-center justify-center gap-2">
                    <div className="flex-grow text-center">
                      <span className="break-all">
                        publicKey.{ticker}://{derived.publicKey}
                      </span>
                    </div>
                    <button
                      onClick={() => copyToClipboard(derived.publicKey, getTranslation(language, "publicKey"))}
                      className="p-1 rounded hover:bg-gray-200 transition-colors"
                      title={getTranslation(language, "copyPublicKey")}
                    >
                      <Copy size={16} />
                    </button>
                  </div>
                  
                  {/* Multi-format addresses display - unified component */}
                  <MultiFormatAddressRenderer
                    ticker={ticker}
                    derived={derived}
                    bitcoinAddresses={bitcoinAddresses}
                    litecoinAddresses={litecoinAddresses}
                    copyToClipboard={copyToClipboard}
                    getBlockExplorerLink={getBlockExplorerLink}
                  />

                </div>

                {/* Export Panel - shown when toggle is active */}
                {showExportPanel && (
                  <div className="flex-shrink-0 w-80">
                    <Exporting
                      privateKey={processedPrivateKey}
                      publicKey={derived.publicKey}
                      address={derived.address}
                      currency={ticker}
                      onClose={() => setShowExportPanel(false)}
                      language={language}
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Archive/Export Toggle Button - Bottom Right Corner */}
          {derived && (
            <button
              onClick={() => setShowExportPanel(!showExportPanel)}
              className={`absolute bottom-2 right-2 p-3 rounded-full transition-colors shadow-lg ${
                showExportPanel
                  ? 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              title={showExportPanel ? getTranslation(language, "hideExportOptions") : getTranslation(language, "showExportOptions")}
            >
              {showExportPanel ? <ArchiveX size={20} /> : <Archive size={20} />}
            </button>
          )}
        </div>
      </DialogContent>
    </Dialog>
    </>
  );
};

export default TemporaryKeyModal;
