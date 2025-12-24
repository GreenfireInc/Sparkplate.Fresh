import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, FileText, Lock, Shield, Unlock, Database, HardDrive } from "lucide-react";
import { toast } from "sonner";
import { PasswordModal } from "./passwordModal";
import { polkadotData } from "@/components/currencyCore/currencies/DOT.Polkadot";
import { getTranslation, type LocaleCode } from "@/lib/i18n";

interface ExportingProps {
  privateKey: string;
  publicKey?: string;
  address?: string;
  currency?: string;
  onClose?: () => void;
  className?: string;
  language?: LocaleCode;
}

type ExportFormat = 'json' | 'keystore' | 'json-encrypted' | 'keystore-unencrypted' | 'wallet-dat-encrypted' | 'wallet-dat-unencrypted' | 'polkadot-json';

export const Exporting = ({
  privateKey,
  publicKey,
  address,
  currency = 'Generic',
  onClose,
  className = "",
  language = "en"
}: ExportingProps) => {
  const [exportFormat, setExportFormat] = useState<ExportFormat>('json');
  const [isExporting, setIsExporting] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const encryptKeystore = async (privateKey: string, password: string): Promise<object> => {
    try {
      // Check for Polkadot keystore public key marker
      if (privateKey.startsWith('PKCS8_PUB:')) {
        throw new Error('Cannot export keystore from a public key. You imported from a keystore file - you already have the keystore, no need to export again.');
      }

      // Import crypto-js for AES encryption
      const CryptoJS = await import('crypto-js');
      
      // Generate a random salt and IV
      const salt = CryptoJS.lib.WordArray.random(32);
      const iv = CryptoJS.lib.WordArray.random(16);
      
      // Derive key using PBKDF2
      const key = CryptoJS.PBKDF2(password, salt, {
        keySize: 256/32,
        iterations: 10000
      });
      
      // Encrypt the private key
      const encrypted = CryptoJS.AES.encrypt(privateKey, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      });
      
      // Create keystore object (similar to Ethereum keystore format)
      const keystore = {
        version: 3,
        id: CryptoJS.lib.WordArray.random(16).toString(),
        address: address || "",
        currency: currency,
        crypto: {
          ciphertext: encrypted.ciphertext.toString(),
          cipherparams: {
            iv: iv.toString()
          },
          cipher: "aes-128-cbc",
          kdf: "pbkdf2",
          kdfparams: {
            dklen: 32,
            salt: salt.toString(),
            c: 10000,
            prf: "hmac-sha256"
          }
        },
        metadata: {
          publicKey: publicKey || "",
          exportDate: new Date().toISOString(),
          exportedBy: "LoginStandard"
        }
      };
      
      return keystore;
    } catch (error) {
      throw new Error(`Failed to encrypt keystore: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const encryptBIP38 = async (privateKey: string, password: string): Promise<string> => {
    try {
      // Import crypto-js for BIP38-style encryption
      const CryptoJS = await import('crypto-js');

      // Generate a random salt and IV
      const salt = CryptoJS.lib.WordArray.random(32);
      const iv = CryptoJS.lib.WordArray.random(16);

      // Use scrypt-like key derivation (simplified for BIP38 compatibility)
      const key = CryptoJS.PBKDF2(password, salt, {
        keySize: 512/32, // 512 bits for BIP38
        iterations: 16384 // Higher iterations for BIP38
      });

      // Split key for encryption and MAC
      const encryptionKey = CryptoJS.lib.WordArray.create(key.words.slice(0, 8)); // First 256 bits
      const macKey = CryptoJS.lib.WordArray.create(key.words.slice(8, 12)); // Next 128 bits

      // Encrypt the private key
      const encrypted = CryptoJS.AES.encrypt(privateKey, encryptionKey, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      });

      // Create MAC for integrity
      const macData = salt.concat(iv).concat(encrypted.ciphertext);
      const mac = CryptoJS.HmacSHA256(macData, macKey);

      // Format as BIP38-like string (simplified representation)
      const bip38Data = {
        version: '01', // BIP38 version byte
        flag: 'C0', // Compressed, EC-multiply
        salt: salt.toString(),
        encrypted: encrypted.ciphertext.toString(),
        iv: iv.toString(),
        mac: mac.toString()
      };

      return JSON.stringify(bip38Data);

    } catch (error) {
      throw new Error(`Failed to encrypt with BIP38: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const privateKeyToWIF = async (privateKey: string, compressed: boolean = true): Promise<string> => {
    try {
      // Convert hex private key to bytes
      const privateKeyBytes = new Uint8Array(privateKey.match(/.{1,2}/g)?.map(byte => parseInt(byte, 16)) || []);

      // Bitcoin mainnet private key prefix (0x80)
      const prefix = new Uint8Array([0x80]);

      // Add compression flag if compressed
      const keyData = compressed ?
        new Uint8Array([...prefix, ...privateKeyBytes, 0x01]) :
        new Uint8Array([...prefix, ...privateKeyBytes]);

      // Calculate checksum (double SHA256)
      const CryptoJS = await import('crypto-js');
      const hash1 = CryptoJS.SHA256(CryptoJS.lib.WordArray.create(keyData));
      const hash2 = CryptoJS.SHA256(hash1);
      const checksum = hash2.toString().substring(0, 8).match(/.{1,2}/g)?.map(byte => parseInt(byte, 16)) || [];

      // Combine key data with checksum
      const fullData = new Uint8Array([...keyData, ...checksum]);

      // Base58 encode
      return base58Encode(fullData);
    } catch (error) {
      throw new Error(`Failed to convert private key to WIF: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const base58Encode = (bytes: Uint8Array): string => {
    const alphabet = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
    let result = '';

    // Count leading zeros
    let leadingZeros = 0;
    for (let i = 0; i < bytes.length && bytes[i] === 0; i++) {
      leadingZeros++;
    }

    // Convert to big integer and encode
    let num = BigInt('0x' + Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join(''));

    while (num > 0) {
      const remainder = Number(num % BigInt(58));
      result = alphabet[remainder] + result;
      num = num / BigInt(58);
    }

    // Add leading zeros back
    return '1'.repeat(leadingZeros) + result;
  };

  const createWalletDat = async (privateKey: string, password?: string): Promise<string> => {
    try {
      const wifKey = await privateKeyToWIF(privateKey, true);

      // Create a simplified wallet.dat structure
      // In a real wallet.dat, this would be a Berkeley DB file with multiple records
      // For export purposes, we'll create a JSON representation that can be imported
      const walletData = {
        version: 1,
        format: 'wallet.dat',
        currency: currency,
        created: new Date().toISOString(),
        keys: [{
          address: address || '',
          publicKey: publicKey || '',
          privateKey: password ? await encryptWalletDatKey(wifKey, password) : wifKey,
          encrypted: !!password,
          format: 'wif',
          compressed: true
        }],
        metadata: {
          exportedBy: 'LoginStandard',
          exportDate: new Date().toISOString(),
          warning: password ? undefined : '⚠️ This wallet.dat contains unencrypted private keys. Keep secure!'
        }
      };

      return JSON.stringify(walletData, null, 2);
    } catch (error) {
      throw new Error(`Failed to create wallet.dat: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const encryptWalletDatKey = async (wifKey: string, password: string): Promise<string> => {
    try {
      const CryptoJS = await import('crypto-js');

      // Use a simpler encryption for wallet.dat compatibility
      const encrypted = CryptoJS.AES.encrypt(wifKey, password, {
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      });

      return encrypted.toString();
    } catch (error) {
      throw new Error(`Failed to encrypt wallet.dat key: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const generateFileName = (format: ExportFormat): string => {
    // Get system information (limited in browser environment)
    const username = 'user'; // Placeholder - browsers don't expose system username
    const machineName = navigator.platform || 'unknown'; // Use platform as machine identifier

    // Use full address instead of short version
    const fullAddress = address || 'noaddress';

    // Create detailed timestamp: YYYYMMDD_HHMMSS
    const now = new Date();
    const dateTime = now.getFullYear().toString() +
                     (now.getMonth() + 1).toString().padStart(2, '0') +
                     now.getDate().toString().padStart(2, '0') + '_' +
                     now.getHours().toString().padStart(2, '0') +
                     now.getMinutes().toString().padStart(2, '0') +
                     now.getSeconds().toString().padStart(2, '0');

    // Clean strings to be filesystem-safe (remove/replace problematic characters)
    const cleanUsername = username.replace(/[^a-zA-Z0-9_-]/g, '_');
    const cleanMachineName = machineName.replace(/[^a-zA-Z0-9_-]/g, '_');
    const cleanCurrency = currency.replace(/[^a-zA-Z0-9_-]/g, '_');
    const cleanAddress = fullAddress.replace(/[^a-zA-Z0-9_-]/g, '_');

    // Determine file extension
    let extension: string;
    if (format === 'json' || format === 'json-encrypted') {
      extension = 'json';
    } else if (format === 'keystore' || format === 'keystore-unencrypted') {
      extension = 'keystore';
    } else if (format === 'wallet-dat-encrypted' || format === 'wallet-dat-unencrypted') {
      extension = 'dat';
    } else {
      extension = 'json'; // fallback
    }

    // Format: username.machineName.currencyTicker.publicWalletAddress.dateTime.extension
    return `${cleanUsername}.${cleanMachineName}.${cleanCurrency}.${cleanAddress}.${dateTime}.${extension}`;
  };

  const downloadFile = (content: string, filename: string, mimeType: string = 'application/json') => {
    try {
      const blob = new Blob([content], { type: mimeType });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      link.style.display = 'none';
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      URL.revokeObjectURL(url);
    } catch (error) {
      throw new Error(`Failed to download file: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const handleExport = async () => {
    if (!privateKey) {
      toast.error(getTranslation(language, "noPrivateKeyToExport"));
      return;
    }

    // For encrypted formats, open password modal
    if (exportFormat === 'keystore' || exportFormat === 'json-encrypted' || exportFormat === 'wallet-dat-encrypted' || exportFormat === 'polkadot-json') {
      setShowPasswordModal(true);
      return;
    }

    // For unencrypted formats, proceed directly
    await performExport("");
  };

  const performExport = async (password: string) => {
    setIsExporting(true);
    setShowPasswordModal(false);

    try {
      let exportContent: string;
      let filename: string;

      // Clean the private key by removing any markers (like PKCS8_PUB:)
      // This allows exporting public keys as JSON for reference
      const cleanPrivateKey = privateKey.startsWith('PKCS8_PUB:') 
        ? privateKey.replace('PKCS8_PUB:', '')
        : privateKey;
      const isPublicKeyOnly = privateKey.startsWith('PKCS8_PUB:');

      if (exportFormat === 'json') {
        // Export as plain unencrypted JSON (all currencies)
        const jsonData = {
          version: 1,
          currency: currency,
          privateKey: isPublicKeyOnly ? undefined : cleanPrivateKey,
          publicKey: isPublicKeyOnly ? cleanPrivateKey : (publicKey || ""),
          address: address || "",
          exportDate: new Date().toISOString(),
          exportedBy: "LoginStandard",
          warning: isPublicKeyOnly 
            ? "ℹ️ This file contains only a public key (from keystore import). It cannot be used to create new keystores."
            : "⚠️ KEEP THIS FILE SECURE - Contains unencrypted private key",
          note: isPublicKeyOnly ? "Imported from keystore - only public key available" : undefined
        };

        exportContent = JSON.stringify(jsonData, null, 2);
        filename = generateFileName('json');

        downloadFile(exportContent, filename);
        toast.success(`${getTranslation(language, "privateKeyExportedAs")} ${filename}`);

      } else if (exportFormat === 'polkadot-json') {
        // Export Polkadot as encrypted JSON (for Talisman, SubWallet, etc.)
        console.log('[EXPORT] Polkadot encrypted JSON export - using keystore format for wallet compatibility');
        const keystore = await polkadotData.exportKeystore(cleanPrivateKey, password, {
          name: `${currency} Account`,
          address: address
        });
        
        exportContent = JSON.stringify(keystore, null, 2);
        filename = generateFileName('json');
        
        downloadFile(exportContent, filename);
        toast.success(`${getTranslation(language, "polkadotKeystoreExportedAs")} ${filename} ${getTranslation(language, "polkadotKeystoreCompatible")}`);

      } else if (exportFormat === 'keystore') {
        // Export as encrypted keystore
        // Use Polkadot-specific export for DOT currency
        let keystore: object;
        
        if (currency === 'DOT' && polkadotData.exportKeystore) {
          console.log('[EXPORT] Using Polkadot-specific keystore export (official format)');
          keystore = await polkadotData.exportKeystore(cleanPrivateKey, password, {
            name: `${currency} Account`,
            address: address
          });
          console.log('[EXPORT] Polkadot keystore generated with official format');
        } else {
          console.log('[EXPORT] Using generic keystore export (Ethereum-style)');
          keystore = await encryptKeystore(cleanPrivateKey, password);
        }
        
        exportContent = JSON.stringify(keystore, null, 2);
        filename = generateFileName('keystore');

        downloadFile(exportContent, filename);
        toast.success(`${getTranslation(language, "encryptedKeystoreExportedAs")} ${filename}`);

      } else if (exportFormat === 'json-encrypted') {
        // Export as BIP38 encrypted JSON
        const bip38Encrypted = await encryptBIP38(cleanPrivateKey, password);
        const jsonData = {
          version: 1,
          currency: currency,
          encryptedPrivateKey: bip38Encrypted,
          publicKey: publicKey || "",
          address: address || "",
          encryption: "BIP38",
          exportDate: new Date().toISOString(),
          exportedBy: "LoginStandard"
        };

        exportContent = JSON.stringify(jsonData, null, 2);
        filename = generateFileName('json');

        downloadFile(exportContent, filename);
        toast.success(`${getTranslation(language, "bip38EncryptedPrivateKeyExportedAs")} ${filename}`);

      } else if (exportFormat === 'keystore-unencrypted') {
        // Export as unencrypted keystore format
        const unencryptedKeystore = {
          version: 3,
          id: Math.random().toString(36).substring(2, 15),
          address: address || "",
          currency: currency,
          crypto: {
            ciphertext: "", // No encryption
            cipherparams: {
              iv: ""
            },
            cipher: "none",
            kdf: "none",
            kdfparams: {
              dklen: 0,
              salt: "",
              c: 0,
              prf: ""
            }
          },
          metadata: {
            publicKey: publicKey || "",
            exportDate: new Date().toISOString(),
            exportedBy: "LoginStandard",
            warning: "⚠️ This keystore is NOT encrypted - Contains unencrypted private key"
          },
          privateKey: privateKey // Include unencrypted private key
        };

        exportContent = JSON.stringify(unencryptedKeystore, null, 2);
        filename = generateFileName('keystore');

        downloadFile(exportContent, filename);
        toast.success(`${getTranslation(language, "unencryptedKeystoreExportedAs")} ${filename}`);

      } else if (exportFormat === 'wallet-dat-encrypted') {
        // Export as encrypted wallet.dat format
        const walletDat = await createWalletDat(privateKey, password);
        exportContent = walletDat;
        filename = generateFileName('wallet-dat-encrypted');

        downloadFile(exportContent, filename, 'application/octet-stream');
        toast.success(`${getTranslation(language, "encryptedWalletDatExportedAs")} ${filename}`);

      } else if (exportFormat === 'wallet-dat-unencrypted') {
        // Export as unencrypted wallet.dat format
        const walletDat = await createWalletDat(privateKey);
        exportContent = walletDat;
        filename = generateFileName('wallet-dat-unencrypted');

        downloadFile(exportContent, filename, 'application/octet-stream');
        toast.success(`${getTranslation(language, "unencryptedWalletDatExportedAs")} ${filename}`);
      }

      if (onClose) {
        onClose();
      }

    } catch (error) {
      console.error("Export error:", error);
      toast.error(error instanceof Error ? error.message : getTranslation(language, "failedToExportPrivateKey"));
    } finally {
      setIsExporting(false);
    }
  };

  const handlePasswordConfirm = async (password: string) => {
    await performExport(password);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="border-t pt-4">
        <Label className="text-base font-medium mb-3 flex items-center gap-2 text-black">
          <Download size={16} />
          {getTranslation(language, "exportPrivateKey")}
        </Label>
        
        {/* Export Format Selection */}
        <div className="space-y-4">
          <div>
            <Label htmlFor="export-format" className="text-sm text-black">{getTranslation(language, "exportFormat")}</Label>
            <Select value={exportFormat} onValueChange={(value: ExportFormat) => setExportFormat(value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder={getTranslation(language, "selectExportFormat")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="json" className="flex items-center gap-2">
                  <div className="flex items-center gap-2">
                    <FileText size={16} />
                    <div>
                      <div className="font-medium">{getTranslation(language, "jsonFileUnencrypted")}</div>
                      <div className="text-xs text-muted-foreground text-white">
                        {getTranslation(language, "unencryptedLoginStandardOnly")}
                      </div>
                    </div>
                  </div>
                </SelectItem>
                {currency === 'DOT' && (
                  <SelectItem value="polkadot-json" className="flex items-center gap-2">
                    <div className="flex items-center gap-2">
                      <Lock size={16} />
                      <div>
                        <div className="font-medium">{getTranslation(language, "polkadotJsonEncrypted")}</div>
                        <div className="text-xs text-muted-foreground text-white">
                          {getTranslation(language, "talismanSubwalletCompatible")}
                        </div>
                      </div>
                    </div>
                  </SelectItem>
                )}
                <SelectItem value="keystore" className="flex items-center gap-2">
                  <div className="flex items-center gap-2">
                    <Lock size={16} />
                    <div>
                      <div className="font-medium">{getTranslation(language, "encryptedKeystore")}</div>
                      <div className="text-xs text-muted-foreground text-white">
                        {getTranslation(language, "passwordProtectedSecure")}
                        {currency === 'DOT' && ` ${getTranslation(language, "walletCompatible")}`}
                      </div>
                    </div>
                  </div>
                </SelectItem>
                <SelectItem value="json-encrypted" className="flex items-center gap-2">
                  <div className="flex items-center gap-2">
                    <Shield size={16} />
                    <div>
                      <div className="font-medium">{getTranslation(language, "jsonEncryptedBip38")}</div>
                      <div className="text-xs text-muted-foreground text-white">{getTranslation(language, "bip38EncryptedStandard")}</div>
                    </div>
                  </div>
                </SelectItem>
                <SelectItem value="keystore-unencrypted" className="flex items-center gap-2">
                  <div className="flex items-center gap-2">
                    <Unlock size={16} />
                    <div>
                      <div className="font-medium">{getTranslation(language, "keystoreUnencrypted")}</div>
                      <div className="text-xs text-muted-foreground text-white">{getTranslation(language, "keystoreFormatNoEncryption")}</div>
                    </div>
                  </div>
                </SelectItem>
                <SelectItem value="wallet-dat-encrypted" className="flex items-center gap-2">
                  <div className="flex items-center gap-2">
                    <Database size={16} />
                    <div>
                      <div className="font-medium">{getTranslation(language, "walletDatEncrypted")}</div>
                      <div className="text-xs text-muted-foreground text-white">{getTranslation(language, "bitcoinWalletDatEncrypted")}</div>
                    </div>
                  </div>
                </SelectItem>
                <SelectItem value="wallet-dat-unencrypted" className="flex items-center gap-2">
                  <div className="flex items-center gap-2">
                    <HardDrive size={16} />
                    <div>
                      <div className="font-medium">{getTranslation(language, "walletDatUnencrypted")}</div>
                      <div className="text-xs text-muted-foreground text-white">{getTranslation(language, "bitcoinWalletDatUnencrypted")}</div>
                    </div>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>


          {/* Security Warning */}
          <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-start gap-2">
              <div className="text-yellow-600 mt-0.5">⚠️</div>
              <div className="text-sm">
                <div className="font-medium text-yellow-800">{getTranslation(language, "securityWarning")}</div>
                <div className="text-yellow-700 mt-1">
                  {exportFormat === 'json' || exportFormat === 'keystore-unencrypted' || exportFormat === 'wallet-dat-unencrypted'
                    ? getTranslation(language, "unencryptedExportWarning")
                    : getTranslation(language, "encryptedExportWarning")
                  }
                </div>
              </div>
            </div>
          </div>

          {/* Export Summary */}
          {(publicKey || address) && (
            <div className="p-3 bg-muted/30 rounded-lg">
              <div className="text-sm font-medium mb-2 text-black">{getTranslation(language, "exportSummary")}</div>
              <div className="space-y-1 text-xs text-muted-foreground">
                <div>{getTranslation(language, "currencyLabel")} {currency}</div>
                {address && <div>{getTranslation(language, "addressLabel")} {address.length > 24 ? `${address.substring(0, 12)}...${address.substring(address.length - 12)}` : address}</div>}
                {publicKey && <div>{getTranslation(language, "publicKeyLabel")} {publicKey.length > 24 ? `${publicKey.substring(0, 12)}...${publicKey.substring(publicKey.length - 12)}` : publicKey}</div>}
                <div>{getTranslation(language, "formatLabel")} {
                  exportFormat === 'json' ? getTranslation(language, "unencryptedJson") :
                  exportFormat === 'polkadot-json' ? getTranslation(language, "polkadotEncryptedJsonTalisman") :
                  exportFormat === 'keystore' ? getTranslation(language, "encryptedKeystoreFormat") :
                  exportFormat === 'json-encrypted' ? getTranslation(language, "bip38EncryptedJson") :
                  exportFormat === 'keystore-unencrypted' ? getTranslation(language, "unencryptedKeystoreFormat") :
                  exportFormat === 'wallet-dat-encrypted' ? getTranslation(language, "encryptedWalletDat") :
                  exportFormat === 'wallet-dat-unencrypted' ? getTranslation(language, "unencryptedWalletDat") : getTranslation(language, "unknownFormat")
                }</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Export Button */}
      <div className="flex justify-end gap-2 pt-2 border-t">
        {onClose && (
          <Button variant="outline" onClick={onClose} disabled={isExporting}>
            {getTranslation(language, "cancel")}
          </Button>
        )}
        <Button
          onClick={handleExport}
          disabled={isExporting}
          className="flex items-center gap-2"
        >
          {isExporting ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              {getTranslation(language, "exporting")}
            </>
          ) : (
            <>
              <Download size={16} />
              {getTranslation(language, "export")} {exportFormat === 'json' ? getTranslation(language, "jsonFormat") :
                       exportFormat === 'keystore' ? getTranslation(language, "keystoreFormat") :
                       exportFormat === 'json-encrypted' ? getTranslation(language, "bip38Format") :
                       exportFormat === 'keystore-unencrypted' ? getTranslation(language, "keystoreFormat") :
                       exportFormat === 'wallet-dat-encrypted' ? getTranslation(language, "walletDatFormat") :
                       exportFormat === 'wallet-dat-unencrypted' ? getTranslation(language, "walletDatFormat") : getTranslation(language, "fileFormat")}
            </>
          )}
        </Button>
      </div>

      {/* Password Modal for encrypted exports */}
      <PasswordModal
        isOpen={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
        onConfirm={handlePasswordConfirm}
        exportFormat={exportFormat as 'keystore' | 'json-encrypted' | 'wallet-dat-encrypted'}
        isExporting={isExporting}
      />
    </div>
  );
};

export default Exporting;
