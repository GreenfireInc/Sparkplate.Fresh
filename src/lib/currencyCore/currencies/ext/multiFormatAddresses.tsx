import { Copy } from "lucide-vue-next";
import { bitcoinData, BitcoinAddressFormat } from "@/lib/currencyCore/currencies/BTC.Bitcoin";
import { litecoinData, LitecoinAddressFormat } from "@/lib/currencyCore/currencies/LTC.Litecoin";
import type { DerivedInfo } from "@/lib/currencyCore/currencies/currencyData";

// Define types for Bitcoin, Litecoin, Tron and Polkadot addresses
export type BitcoinAddresses = {
  P2PKH?: { address: string; description: string };
  P2SH?: { address: string; description: string };
  P2WPKH?: { address: string; description: string };
  P2TR?: { address: string; description: string };
};

export type LitecoinAddresses = {
  P2PKH?: { address: string; description: string };
  P2SH?: { address: string; description: string };
  P2WPKH?: { address: string; description: string };
};


export type StacksAddresses = {
  Mainnet?: { address: string; description: string };
  Testnet?: { address: string; description: string };
  NativeSegwit?: { address: string; description: string };
  Taproot?: { address: string; description: string };
};

// Polkadot multi-network formatted display
export interface PolkadotMultiNetworkInfo {
  formattedDisplay: string;
}

interface MultiFormatAddressDisplayProps {
  title: string;
  addresses: Record<string, { address: string; description: string } | undefined>;
  ticker: string;
  copyToClipboard: (text: string, description: string) => void;
  className?: string;
  getBlockExplorerLink?: (ticker: string, format: string, address: string) => string | null | Promise<string | null>;
}

// Generic component for displaying multi-format addresses
export const MultiFormatAddressDisplay = ({
  title,
  addresses,
  ticker,
  copyToClipboard,
  className = "",
  getBlockExplorerLink
}: MultiFormatAddressDisplayProps) => {
  const addressEntries = Object.entries(addresses).filter(([_, value]) => value !== undefined);

  if (addressEntries.length === 0) {
    return null;
  }

  return (
    <div className={`mt-4 p-5 bg-gray-50 dark:bg-gray-800 rounded-lg w-full max-w-4xl ${className}`}>
      <div className="text-sm text-gray-600 dark:text-gray-400 mb-3 font-semibold text-center">{title}</div>
      <div className="space-y-3 text-xs">
        {addressEntries.map(([format, data]) => {
          if (!data) return null;
          
          // Get label based on format
          let label: string;
          switch (format) {
            case "P2PKH": label = "Legacy"; break;
            case "P2SH": label = "SegWit Compatible"; break;
            case "P2WPKH": label = "Native SegWit"; break;
            case "P2TR": label = "Taproot"; break;
            case "Mainnet": label = "Stacks Mainnet"; break;
            case "Testnet": label = "Stacks Testnet"; break;
            case "NativeSegwit": label = "Bitcoin Native SegWit"; break;
            case "Taproot": label = "Bitcoin Taproot"; break;
            default: label = format;
          }
          
          // Format address for clipboard
          const addressForClipboard = `${format}.${ticker}://${data.address}`;
          
          return (
            <div key={format} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-2 bg-white dark:bg-gray-700 rounded">
              <div className="font-medium text-gray-800 dark:text-gray-200 min-w-fit">{label}:</div>
              <div className="flex items-center justify-between flex-grow">
                {getBlockExplorerLink ? (
                  <a
                    href="#"
                    onClick={async (e) => {
                      e.preventDefault();
                      const link = await getBlockExplorerLink(ticker, format, data.address);
                      if (link) window.open(link, '_blank', 'noopener,noreferrer');
                    }}
                    className="break-all text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-mono text-xs mr-2 underline cursor-pointer"
                    title={`View ${format} address on block explorer`}
                  >
                    {addressForClipboard}
                  </a>
                ) : (
                  <span className="break-all text-blue-600 dark:text-blue-400 font-mono text-xs mr-2">
                    {addressForClipboard}
                  </span>
                )}
                <button
                  onClick={() => copyToClipboard(addressForClipboard, `${format} address`)}
                  className="p-1 rounded bg-gray-100 hover:bg-gray-200 dark:bg-gray-600 dark:hover:bg-gray-500 transition-colors flex items-center justify-center flex-shrink-0"
                  title={`Copy ${format} address`}
                >
                  <Copy size={12} className="text-gray-600 dark:text-gray-300" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Specific component for Bitcoin addresses
export const BitcoinAddressDisplay = ({
  addresses,
  copyToClipboard,
  className,
  getBlockExplorerLink
}: {
  addresses: BitcoinAddresses;
  copyToClipboard: (text: string, description: string) => void;
  className?: string;
  getBlockExplorerLink?: (ticker: string, format: string, address: string) => string | null | Promise<string | null>;
}) => {
  return (
    <MultiFormatAddressDisplay
      title="Bitcoin Multi-format Addresses"
      addresses={addresses}
      ticker="BTC"
      copyToClipboard={copyToClipboard}
      className={className}
      getBlockExplorerLink={getBlockExplorerLink}
    />
  );
};

// Specific component for Litecoin addresses
export const LitecoinAddressDisplay = ({
  addresses,
  copyToClipboard,
  className,
  getBlockExplorerLink
}: {
  addresses: LitecoinAddresses;
  copyToClipboard: (text: string, description: string) => void;
  className?: string;
  getBlockExplorerLink?: (ticker: string, format: string, address: string) => string | null | Promise<string | null>;
}) => {
  return (
    <MultiFormatAddressDisplay
      title="Litecoin Multi-format Addresses"
      addresses={addresses}
      ticker="LTC"
      copyToClipboard={copyToClipboard}
      className={className}
      getBlockExplorerLink={getBlockExplorerLink}
    />
  );
};


// Specific component for Stacks addresses
export const StacksAddressDisplay = ({
  addresses,
  copyToClipboard,
  className,
  getBlockExplorerLink
}: {
  addresses: StacksAddresses;
  copyToClipboard: (text: string, description: string) => void;
  className?: string;
  getBlockExplorerLink?: (ticker: string, format: string, address: string) => string | null | Promise<string | null>;
}) => {
  return (
    <MultiFormatAddressDisplay
      title="Stacks Multi-format Addresses"
      addresses={addresses}
      ticker="STX"
      copyToClipboard={copyToClipboard}
      className={className}
      getBlockExplorerLink={getBlockExplorerLink}
    />
  );
};

// Specific component for Polkadot multi-network addresses
export const PolkadotAddressDisplay = ({
  networkInfo,
  copyToClipboard,
  className,
  getBlockExplorerLink
}: {
  networkInfo: PolkadotMultiNetworkInfo;
  copyToClipboard: (text: string, description: string) => void;
  className?: string;
  getBlockExplorerLink?: (ticker: string, format: string, address: string) => string | null | Promise<string | null>;
}) => {
  if (!networkInfo.formattedDisplay) {
    return null;
  }

  // Check if ETH address is missing (indicates keystore import)
  const hasEthAddress = networkInfo.formattedDisplay.includes('ETH://');
  const isKeystoreImport = !hasEthAddress && networkInfo.formattedDisplay.includes('DOT://');

  return (
    <div className={`mt-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg ${className}`}>
      <div className="text-xs text-gray-600 dark:text-gray-400 mb-2">
        Multi-network addresses:
        {isKeystoreImport && (
          <span className="ml-2 text-gray-500 dark:text-gray-500 italic">
            (Ethereum address requires raw private key)
          </span>
        )}
      </div>
      <div className="space-y-1 text-xs">
        {networkInfo.formattedDisplay.split('\n').map((line, index) => (
          <div key={index} className="flex items-center justify-between">
              <div className="flex items-center justify-between flex-grow">
                {getBlockExplorerLink ? (
                  <a
                    href="#"
                    onClick={async (e) => {
                      e.preventDefault();
                      // Extract network and address from the line (format: NETWORK://address)
                      const [networkPart, address] = line.split('://');
                      if (address) {
                        // Use appropriate ticker for block explorer (ETH for Ethereum, DOT for others)
                        const ticker = networkPart === 'ETH' ? 'ETH' : 'DOT';
                        const link = await getBlockExplorerLink(ticker, networkPart, address);
                        if (link) window.open(link, '_blank', 'noopener,noreferrer');
                      }
                    }}
                    className="break-all text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-mono mr-2 underline cursor-pointer"
                    title={`View ${line.split('://')[0]} address on block explorer`}
                  >
                    {line}
                  </a>
                ) : (
                  <span className="break-all text-blue-600 dark:text-blue-400 font-mono mr-2">
                    {line}
                  </span>
                )}
                <button
                  onClick={() => copyToClipboard(line, `${line.split('://')[0]} address`)}
                  className="p-1 rounded bg-gray-100 hover:bg-gray-200 dark:bg-gray-600 dark:hover:bg-gray-500 transition-colors flex items-center justify-center flex-shrink-0"
                  title={`Copy ${line.split('://')[0]} address`}
                >
                  <Copy size={12} className="text-gray-600 dark:text-gray-300" />
                </button>
              </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Helper functions for generating multi-format addresses
const generateBitcoinAddresses = async (privateKey: string): Promise<BitcoinAddresses> => {
  const formats: BitcoinAddressFormat[] = ['P2PKH', 'P2SH', 'P2WPKH', 'P2TR'];
  const addresses: BitcoinAddresses = {};

  for (const format of formats) {
    try {
      const result = await bitcoinData.deriveFromPrivateKey!(privateKey, format);
      addresses[format] = {
        address: result.address,
        description: result.formatDescription || format
      };
    } catch (error) {
      console.error(`Error generating ${format} address:`, error);
      // Continue with other formats even if one fails
    }
  }

  return addresses;
};

const generateLitecoinAddresses = async (privateKey: string): Promise<LitecoinAddresses> => {
  const formats: LitecoinAddressFormat[] = ['P2PKH', 'P2SH', 'P2WPKH'];
  const addresses: LitecoinAddresses = {};

  for (const format of formats) {
    try {
      const result = await litecoinData.deriveFromPrivateKey!(privateKey, format);
      addresses[format] = {
        address: result.address,
        description: result.formatDescription || format
      };
    } catch (error) {
      console.error(`Error generating LTC ${format} address:`, error);
      // Continue with other formats even if one fails
    }
  }

  return addresses;
};

const generateStacksAddresses = async (derivedInfo: DerivedInfo): Promise<StacksAddresses> => {
  const addresses: StacksAddresses = {};

  if (derivedInfo.mainnetAddress) {
    addresses.Mainnet = {
      address: derivedInfo.mainnetAddress,
      description: "Stacks Mainnet Address"
    };
  }

  if (derivedInfo.testnetAddress) {
    addresses.Testnet = {
      address: derivedInfo.testnetAddress,
      description: "Stacks Testnet Address"
    };
  }

  if (derivedInfo.nativeSegwitAddress) {
    addresses.NativeSegwit = {
      address: derivedInfo.nativeSegwitAddress,
      description: "Bitcoin Native SegWit (P2WPKH)"
    };
  }

  if (derivedInfo.taprootAddress) {
    addresses.Taproot = {
      address: derivedInfo.taprootAddress,
      description: "Bitcoin Taproot (P2TR)"
    };
  }

  return addresses;
};

// Address generation result interface
export interface AddressGenerationResult {
  derived: DerivedInfo;
  bitcoinAddresses?: BitcoinAddresses | null;
  litecoinAddresses?: LitecoinAddresses | null;
  stacksAddresses?: StacksAddresses | null;
}

// Unified address generation service
export const generateMultiFormatAddresses = async (
  ticker: string,
  privateKey: string,
  polkadotMethod?: 'auto' | 'polkadotjs' | 'exodus'
): Promise<AddressGenerationResult> => {
  // Import the derivation function
  const { currencyByTicker } = await import('@/lib/currencyCore/currencies');

  // Get the currency data for the selected ticker
  const currency = currencyByTicker[ticker];

  if (!currency) {
    throw new Error(`Unsupported ticker: ${ticker}`);
  }

  if (!currency.deriveFromPrivateKey) {
    throw new Error(`No derivation function available for ${ticker}`);
  }

  // Derive the primary address
  const derived = await currency.deriveFromPrivateKey(
    privateKey,
    ticker === 'DOT' ? polkadotMethod : undefined
  );

  console.log("✅ Successfully derived:", derived);

  const result: AddressGenerationResult = { derived };

  // Generate multi-format addresses based on ticker
  if (ticker === "BTC") {
    console.log("🪙 Generating all Bitcoin address formats...");
    const btcAddresses = await generateBitcoinAddresses(privateKey);
    console.log("✅ Bitcoin addresses generated:", btcAddresses);
    result.bitcoinAddresses = btcAddresses;
  }
  else if (ticker === "LTC") {
    console.log("🪙 Generating all Litecoin address formats...");
    const ltcAddresses = await generateLitecoinAddresses(privateKey);
    console.log("✅ Litecoin addresses generated:", ltcAddresses);
    result.litecoinAddresses = ltcAddresses;
  }
  else if (ticker === "STX") {
    console.log("🪙 Generating all Stacks address formats...");
    const stxAddresses = await generateStacksAddresses(derived);
    console.log("✅ Stacks addresses generated:", stxAddresses);
    result.stacksAddresses = stxAddresses;
  }

  return result;
};

// Unified component for displaying multi-format addresses based on ticker and available data
interface MultiFormatAddressRendererProps {
  ticker: string;
  derived?: DerivedInfo | null;
  bitcoinAddresses?: BitcoinAddresses | null;
  litecoinAddresses?: LitecoinAddresses | null;
  copyToClipboard: (text: string, description: string) => void;
  getBlockExplorerLink?: (ticker: string, format: string, address: string) => string | null | Promise<string | null>;
}

export const MultiFormatAddressRenderer = ({
  ticker,
  derived,
  bitcoinAddresses,
  litecoinAddresses,
  copyToClipboard,
  getBlockExplorerLink
}: MultiFormatAddressRendererProps) => {
  // Polkadot multi-network addresses display
  if (ticker === "DOT" && derived?.formattedDisplay) {
    return (
      <PolkadotAddressDisplay
        networkInfo={{ formattedDisplay: derived.formattedDisplay }}
        copyToClipboard={copyToClipboard}
        getBlockExplorerLink={getBlockExplorerLink}
      />
    );
  }

  // Bitcoin multi-format addresses display
  if (ticker === "BTC" && bitcoinAddresses) {
    return (
      <BitcoinAddressDisplay
        addresses={bitcoinAddresses}
        copyToClipboard={copyToClipboard}
        getBlockExplorerLink={getBlockExplorerLink}
      />
    );
  }

  // Litecoin multi-format addresses display
  if (ticker === "LTC" && litecoinAddresses) {
    return (
      <LitecoinAddressDisplay
        addresses={litecoinAddresses}
        copyToClipboard={copyToClipboard}
        getBlockExplorerLink={getBlockExplorerLink}
      />
    );
  }

  // Stacks multi-format addresses display
  if (ticker === "STX" && derived && derived.format) {
    // Parse the format data into StacksAddresses structure
    const formats = derived.format.split("|");
    const descriptions = derived.formatDescription?.split("|") || [];

    const stacksAddresses: StacksAddresses = {};

    // Main Stacks address
    stacksAddresses.Mainnet = {
      address: derived.address || "",
      description: "Stacks Mainnet Address"
    };

    // Parse additional addresses
    formats.forEach((address: string, index: number) => {
      const description = descriptions[index] || `Format ${index + 1}`;

      if (description.includes("Testnet")) {
        stacksAddresses.Testnet = {
          address: address,
          description: "Stacks Testnet Address"
        };
      } else if (description.includes("Native SegWit")) {
        stacksAddresses.NativeSegwit = {
          address: address,
          description: "Bitcoin Native SegWit Address"
        };
      } else if (description.includes("Taproot")) {
        stacksAddresses.Taproot = {
          address: address,
          description: "Bitcoin Taproot Address"
        };
      }
    });

    return (
      <StacksAddressDisplay
        addresses={stacksAddresses}
        copyToClipboard={copyToClipboard}
        getBlockExplorerLink={getBlockExplorerLink}
      />
    );
  }

  // No matching multi-format addresses to display
  return null;


};

// DISABLED: Cardano multi-format addresses display component
/*
export type CardanoAddresses = {
  BaseAddress?: { address: string; description: string };
  ByronAddress?: { address: string; description: string };
  RewardAddress?: { address: string; description: string };
};

// Specific component for Cardano addresses
export const CardanoAddressDisplay = ({
  addresses,
  copyToClipboard,
  className,
  getBlockExplorerLink
}: {
  addresses: CardanoAddresses;
  copyToClipboard: (text: string, description: string) => void;
  className?: string;
  getBlockExplorerLink?: (ticker: string, format: string, address: string) => string | null | Promise<string | null>;
}) => {
  return (
    <div className={`mt-4 p-5 bg-gray-50 dark:bg-gray-800 rounded-lg w-full max-w-4xl ${className}`}>
      <div className="text-sm text-gray-600 dark:text-gray-400 mb-3 font-semibold text-center">Cardano Multi-format Addresses:</div>
      <div className="space-y-3 text-xs">
        {addresses.BaseAddress && (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-2 bg-white dark:bg-gray-700 rounded">
            <div className="font-medium text-gray-800 dark:text-gray-200 min-w-fit">Shelley (Base):</div>
            <span className="break-all text-blue-600 dark:text-blue-400 font-mono flex-grow text-xs">
              BaseAddress.ADA://{addresses.BaseAddress.address}
            </span>
            <button
              onClick={() => copyToClipboard(`BaseAddress.ADA://${addresses.BaseAddress.address}`, "copyAdaBaseAddress")}
              className="ml-2 p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              title="copyAdaBaseAddress"
            >
              <Copy size={12} />
            </button>
          </div>
        )}
        {addresses.ByronAddress && (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-2 bg-white dark:bg-gray-700 rounded">
            <div className="font-medium text-gray-800 dark:text-gray-200 min-w-fit">Byron (Legacy):</div>
            <span className="break-all text-blue-600 dark:text-blue-400 font-mono flex-grow text-xs">
              ByronAddress.ADA://{addresses.ByronAddress.address}
            </span>
            <button
              onClick={() => copyToClipboard(`ByronAddress.ADA://${addresses.ByronAddress.address}`, "copyAdaByronAddress")}
              className="ml-2 p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              title="copyAdaByronAddress"
            >
              <Copy size={12} />
            </button>
          </div>
        )}
        {addresses.RewardAddress && (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-2 bg-white dark:bg-gray-700 rounded">
            <div className="font-medium text-gray-800 dark:text-gray-200 min-w-fit">Staking (Reward):</div>
            <span className="break-all text-blue-600 dark:text-blue-400 font-mono flex-grow text-xs">
              RewardAddress.ADA://{addresses.RewardAddress.address}
            </span>
            <button
              onClick={() => copyToClipboard(`RewardAddress.ADA://${addresses.RewardAddress.address}`, "copyAdaRewardAddress")}
              className="ml-2 p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              title="copyAdaRewardAddress"
            >
              <Copy size={12} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
*/

// DISABLED: Cardano address generation function
// const generateCardanoAddresses = async (privateKey: string): Promise<CardanoAddresses> => {
//   const formats: CardanoAddressFormat[] = ['BaseAddress', 'ByronAddress', 'RewardAddress'];
//   const addresses: CardanoAddresses = {};

//   for (const format of formats) {
//     try {
//       const result = await cardanoData.deriveFromPrivateKey!(privateKey, format);
//       addresses[format] = {
//         address: result.address,
//         description: result.formatDescription || format
//       };
//     } catch (error) {
//       console.error(`Error generating ADA ${format} address:`, error);
//       // Continue with other formats even if one fails
//     }
//   }

//   return addresses;
// };
