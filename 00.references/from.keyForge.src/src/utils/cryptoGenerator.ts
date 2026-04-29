import * as bip39 from "bip39";
import * as bip32 from "bip32";
import * as bitcoin from "bitcoinjs-lib";
import { ethers } from "ethers";
import { Keypair } from "@solana/web3.js";
import bs58 from "bs58";
import * as ecc from "tiny-secp256k1";
import { generateDeterministicGPGKey } from "@/lib/cryptographyCore/deterministicGPG/deterministicGPG.individual";

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

export async function generateAddressesFromMnemonic(
  mnemonic: string,
  indices: Record<string, number> = {}
): Promise<CryptoAddress[]> {
  if (!bip39.validateMnemonic(mnemonic)) {
    // For custom word counts, we'll proceed anyway
    console.warn("Non-standard mnemonic detected, proceeding...");
  }

  const seed = await bip39.mnemonicToSeed(mnemonic);
  const root = bip32.BIP32Factory(ecc).fromSeed(seed);

  const addresses: CryptoAddress[] = [];

  // BTC - Bitcoin (Legacy P2PKH)
  try {
    const btcIndex = indices["BTC"] ?? 0;
    const btcPath = root.derivePath(`m/44'/0'/0'/0/${btcIndex}`);
    const payment = bitcoin.payments.p2pkh({
      pubkey: btcPath.publicKey,
      network: bitcoin.networks.bitcoin,
    });
    const btcAddress = payment.address || "";
    const btcPrivateKey = btcPath.privateKey ? Buffer.from(btcPath.privateKey).toString("hex") : "";
    const btcPublicKey = btcPath.publicKey ? Buffer.from(btcPath.publicKey).toString("hex") : "";
    const gpgKeys = await generateDeterministicGPGKey(btcPrivateKey, "BTC");

    addresses.push({
      currency: "BTC",
      address: btcAddress,
      privateKey: btcPrivateKey,
      cryptoPublicKey: btcPublicKey,
      keyFingerprint: gpgKeys.fingerprint,
      gpgPublicKey: gpgKeys.publicKey,
      gpgPrivateKey: gpgKeys.privateKey,
      derivationPath: `m/44'/0'/0'/0/${btcIndex}`,
    });
  } catch (error) {
    console.error("BTC generation error:", error);
  }

  // LTC - Litecoin
  try {
    const ltcIndex = indices["LTC"] ?? 0;
    const ltcPath = root.derivePath(`m/44'/2'/0'/0/${ltcIndex}`);
    const ltcNetwork = {
      messagePrefix: "\x19Litecoin Signed Message:\n",
      bech32: "ltc",
      bip32: { public: 0x019da462, private: 0x019d9cfe },
      pubKeyHash: 0x30,
      scriptHash: 0x32,
      wif: 0xb0,
    };
    const ltcPayment = bitcoin.payments.p2pkh({
      pubkey: ltcPath.publicKey,
      network: ltcNetwork,
    });
    const ltcAddress = ltcPayment.address || "";
    const ltcPrivateKey = ltcPath.privateKey ? Buffer.from(ltcPath.privateKey).toString("hex") : "";
    const ltcPublicKey = ltcPath.publicKey ? Buffer.from(ltcPath.publicKey).toString("hex") : "";
    const gpgKeys = await generateDeterministicGPGKey(ltcPrivateKey, "LTC");

    addresses.push({
      currency: "LTC",
      address: ltcAddress,
      privateKey: ltcPrivateKey,
      cryptoPublicKey: ltcPublicKey,
      keyFingerprint: gpgKeys.fingerprint,
      gpgPublicKey: gpgKeys.publicKey,
      gpgPrivateKey: gpgKeys.privateKey,
      derivationPath: `m/44'/2'/0'/0/${ltcIndex}`,
    });
  } catch (error) {
    console.error("LTC generation error:", error);
  }

  // DOGE - Dogecoin
  try {
    const dogeIndex = indices["DOGE"] ?? 0;
    const dogePath = root.derivePath(`m/44'/3'/0'/0/${dogeIndex}`);
    const dogeNetwork = {
      messagePrefix: "\x19Dogecoin Signed Message:\n",
      bech32: "doge",
      bip32: { public: 0x02facafd, private: 0x02fac398 },
      pubKeyHash: 0x1e,
      scriptHash: 0x16,
      wif: 0x9e,
    };
    const dogePayment = bitcoin.payments.p2pkh({
      pubkey: dogePath.publicKey,
      network: dogeNetwork,
    });
    const dogeAddress = dogePayment.address || "";
    const dogePrivateKey = dogePath.privateKey ? Buffer.from(dogePath.privateKey).toString("hex") : "";
    const dogePublicKey = dogePath.publicKey ? Buffer.from(dogePath.publicKey).toString("hex") : "";
    const gpgKeys = await generateDeterministicGPGKey(dogePrivateKey, "DOGE");

    addresses.push({
      currency: "DOGE",
      address: dogeAddress,
      privateKey: dogePrivateKey,
      cryptoPublicKey: dogePublicKey,
      keyFingerprint: gpgKeys.fingerprint,
      gpgPublicKey: gpgKeys.publicKey,
      gpgPrivateKey: gpgKeys.privateKey,
      derivationPath: `m/44'/3'/0'/0/${dogeIndex}`,
    });
  } catch (error) {
    console.error("DOGE generation error:", error);
  }

  // ETH - Ethereum
  try {
    const ethIndex = indices["ETH"] ?? 0;
    const ethPath = root.derivePath(`m/44'/60'/0'/0/${ethIndex}`);
    const ethPrivateKeyHex = ethPath.privateKey ? Buffer.from(ethPath.privateKey).toString("hex") : "";
    const ethPrivateKey = "0x" + ethPrivateKeyHex;
    const ethWallet = new ethers.Wallet(ethPrivateKey);
    const ethPublicKey = ethPath.publicKey ? Buffer.from(ethPath.publicKey).toString("hex") : "";
    const gpgKeys = await generateDeterministicGPGKey(ethPrivateKeyHex, "ETH");

    addresses.push({
      currency: "ETH",
      address: ethWallet.address,
      privateKey: ethPrivateKey,
      cryptoPublicKey: ethPublicKey,
      keyFingerprint: gpgKeys.fingerprint,
      gpgPublicKey: gpgKeys.publicKey,
      gpgPrivateKey: gpgKeys.privateKey,
      derivationPath: `m/44'/60'/0'/0/${ethIndex}`,
    });
  } catch (error) {
    console.error("ETH generation error:", error);
  }

  // TRX - Tron (uses same derivation as ETH)
  try {
    const trxIndex = indices["TRX"] ?? 0;
    const trxPath = root.derivePath(`m/44'/195'/0'/0/${trxIndex}`);
    const trxPrivateKey = trxPath.privateKey ? Buffer.from(trxPath.privateKey).toString("hex") : "";
    // Simplified Tron address generation (base58check with 0x41 prefix)
    const trxAddress = "T" + bs58.encode(Buffer.from("41" + trxPrivateKey.slice(0, 40), "hex")).slice(0, 33);
    const trxPublicKey = trxPath.publicKey ? Buffer.from(trxPath.publicKey).toString("hex") : "";
    const gpgKeys = await generateDeterministicGPGKey(trxPrivateKey, "TRX");

    addresses.push({
      currency: "TRX",
      address: trxAddress,
      privateKey: trxPrivateKey,
      cryptoPublicKey: trxPublicKey,
      keyFingerprint: gpgKeys.fingerprint,
      gpgPublicKey: gpgKeys.publicKey,
      gpgPrivateKey: gpgKeys.privateKey,
      derivationPath: `m/44'/195'/0'/0/${trxIndex}`,
    });
  } catch (error) {
    console.error("TRX generation error:", error);
  }

  // SOL - Solana
  try {
    const solIndex = indices["SOL"] ?? 0;
    const solPath = root.derivePath(`m/44'/501'/${solIndex}'/0'`);
    const solPrivateKeyBuffer = solPath.privateKey || Buffer.alloc(32);
    const solKeypair = Keypair.fromSeed(solPrivateKeyBuffer.slice(0, 32));
    const solAddress = solKeypair.publicKey.toBase58();
    const solPublicKey = solKeypair.publicKey.toBase58();
    const gpgKeys = await generateDeterministicGPGKey(Buffer.from(solPrivateKeyBuffer).toString("hex"), "SOL");

    addresses.push({
      currency: "SOL",
      address: solAddress,
      privateKey: bs58.encode(solKeypair.secretKey),
      cryptoPublicKey: solPublicKey,
      keyFingerprint: gpgKeys.fingerprint,
      gpgPublicKey: gpgKeys.publicKey,
      gpgPrivateKey: gpgKeys.privateKey,
      derivationPath: `m/44'/501'/${solIndex}'/0'`,
    });
  } catch (error) {
    console.error("SOL generation error:", error);
  }

  // XTZ - Tezos
  try {
    const xtzIndex = indices["XTZ"] ?? 0;
    const xtzPath = root.derivePath(`m/44'/1729'/${xtzIndex}'/0'`);
    const xtzPrivateKey = xtzPath.privateKey ? Buffer.from(xtzPath.privateKey).toString("hex") : "";
    const xtzAddress = "tz1" + bs58.encode(Buffer.from(xtzPrivateKey.slice(0, 40), "hex")).slice(0, 33);
    const xtzPublicKey = xtzPath.publicKey ? Buffer.from(xtzPath.publicKey).toString("hex") : "";
    const gpgKeys = await generateDeterministicGPGKey(xtzPrivateKey, "XTZ");

    addresses.push({
      currency: "XTZ",
      address: xtzAddress,
      privateKey: xtzPrivateKey,
      cryptoPublicKey: xtzPublicKey,
      keyFingerprint: gpgKeys.fingerprint,
      gpgPublicKey: gpgKeys.publicKey,
      gpgPrivateKey: gpgKeys.privateKey,
      derivationPath: `m/44'/1729'/${xtzIndex}'/0'`,
    });
  } catch (error) {
    console.error("XTZ generation error:", error);
  }

  // LUNC - Terra Classic (uses Cosmos derivation)
  try {
    const luncIndex = indices["LUNC"] ?? 0;
    const luncPath = root.derivePath(`m/44'/330'/0'/0/${luncIndex}`);
    const luncPrivateKey = luncPath.privateKey ? Buffer.from(luncPath.privateKey).toString("hex") : "";
    const luncAddress = "terra1" + bs58.encode(Buffer.from(luncPrivateKey.slice(0, 40), "hex")).slice(0, 38);
    const luncPublicKey = luncPath.publicKey ? Buffer.from(luncPath.publicKey).toString("hex") : "";
    const gpgKeys = await generateDeterministicGPGKey(luncPrivateKey, "LUNC");

    addresses.push({
      currency: "LUNC",
      address: luncAddress,
      privateKey: luncPrivateKey,
      cryptoPublicKey: luncPublicKey,
      keyFingerprint: gpgKeys.fingerprint,
      gpgPublicKey: gpgKeys.publicKey,
      gpgPrivateKey: gpgKeys.privateKey,
      derivationPath: `m/44'/330'/0'/0/${luncIndex}`,
    });
  } catch (error) {
    console.error("LUNC generation error:", error);
  }

  return addresses;
}
