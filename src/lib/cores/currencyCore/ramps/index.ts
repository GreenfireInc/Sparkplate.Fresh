// Cryptocurrency On-Ramp and Off-Ramp Services API Integrations
// Centralized export for all fiat-to-crypto and crypto-to-fiat integrations

// Import all ramp modules
export { AlchemyPayRamp } from './alchemypay';
export { BanxaRamp } from './banxa';
export { ChangeNowRamp } from './changenow';
export { CoinifyRamp } from './coinify';
export { FinchpayRamp } from './finchpay';
export { GuardarianRamp } from './guardarian';
export { InvityRamp } from './invity';
export { KadoRamp } from './kado';
export { KriptomatRamp } from './kriptomat';
export { MercuryoRamp } from './mercuryo';
export { MoonPayRamp } from './moonpay';
export { NoahRamp } from './noah';
export { OnrampRamp } from './onramp';
export { RampRamp } from './ramp';
export { SardineRamp } from './sardine';
export { SimplexRamp } from './simplex';
export { TransakRamp } from './transak';
export { UtorgRamp } from './utorg';
export { WertRamp } from './wert';
export { WyreRamp } from './wyre';
export { ZKP2PRamp } from './zkp2p';

/**
 * Cryptocurrency On-Ramp and Off-Ramp Services Overview
 * 
 * This module provides TypeScript integrations for fiat-to-crypto and crypto-to-fiat services.
 * These services allow users to buy and sell cryptocurrencies using traditional payment methods.
 * Each ramp file includes:
 * - API endpoints for pricing and transaction data
 * - Payment method support (credit cards, bank transfers, etc.)
 * - KYC/AML compliance features
 * - Geographic restrictions and supported regions
 * - Comprehensive documentation and examples
 * - Social media links and official resources
 * 
 * Supported Ramp Services:
 * 
 * 1. AlchemyPay - Global payment infrastructure
 *    - Fiat and crypto payment solutions
 *    - API Documentation: https://docs.alchemypay.org/
 * 
 * 2. Banxa - Licensed payment infrastructure
 *    - Global fiat-to-crypto gateway
 *    - API Documentation: https://docs.banxa.com/
 * 
 * 3. ChangeNow - Instant cryptocurrency exchange
 *    - Non-custodial exchange service
 *    - API Documentation: https://changenow.io/api/docs
 * 
 * 4. Coinify - European cryptocurrency broker
 *    - Fiat-to-crypto services
 *    - API Documentation: https://coinify.com/api/
 * 
 * 5. Finchpay - Mobile-first payment platform
 *    - Instant crypto purchases
 *    - API Documentation: https://finchpay.com/api/
 * 
 * 6. Guardarian - European crypto gateway
 *    - Fiat-to-crypto services
 *    - API Documentation: https://guardarian.com/api/
 * 
 * 7. Invity - Crypto buying platform
 *    - Multiple payment methods
 *    - API Documentation: https://invity.io/api/
 * 
 * 8. Kado - Cross-border payment platform
 *    - Global remittance services
 *    - API Documentation: https://kado.money/api/
 * 
 * 9. Kriptomat - European crypto platform
 *    - Licensed crypto exchange
 *    - API Documentation: https://kriptomat.io/api/
 * 
 * 10. Mercuryo - Global crypto payment platform
 *     - Fiat-to-crypto gateway
 *     - API Documentation: https://mercuryo.io/api/
 * 
 * 11. MoonPay - Leading crypto payment infrastructure
 *     - Global fiat-to-crypto platform
 *     - API Documentation: https://docs.moonpay.com/
 * 
 * 12. Noah - Asian crypto payment platform
 *     - Regional payment solutions
 *     - API Documentation: https://noah.com/api/
 * 
 * 13. Onramp - Crypto payment infrastructure
 *     - Fiat-to-crypto services
 *     - API Documentation: https://onramp.com/api/
 * 
 * 14. Ramp - Global crypto payment platform
 *     - Fiat-to-crypto infrastructure
 *     - API Documentation: https://docs.ramp.network/
 * 
 * 15. Sardine - Fraud prevention platform
 *     - Secure crypto payments
 *     - API Documentation: https://sardine.ai/api/
 * 
 * 16. Simplex - Licensed payment processor
 *     - Fiat-to-crypto infrastructure
 *     - API Documentation: https://www.simplex.com/api/
 * 
 * 17. Transak - Global crypto payment gateway
 *     - Fiat-to-crypto services
 *     - API Documentation: https://docs.transak.com/
 * 
 * 18. Utorg - Global crypto payment platform
 *     - Fiat-to-crypto gateway
 *     - API Documentation: https://utorg.pro/api/
 * 
 * 19. Wert - European crypto payment platform
 *     - Fiat-to-crypto services
 *     - API Documentation: https://wert.io/api/
 * 
 * 20. Wyre - Global crypto payment infrastructure
 *     - Fiat-to-crypto platform
 *     - API Documentation: https://docs.sendwyre.com/
 * 
 * 21. ZKP2P - Privacy-focused P2P platform
 *     - Decentralized crypto trading
 *     - API Documentation: https://zkp2p.io/api/
 * 
 * Usage Example:
 * 
 * ```typescript
 * import { MoonPayRamp, RampRamp, TransakRamp } from '@/lib/cores/currencyCore/ramps';
 * 
 * // Get buy quotes from multiple ramps
 * const moonpayQuote = await MoonPayRamp.getBuyQuote('BTC', 'USD', 100);
 * const rampQuote = await RampRamp.getBuyQuote('BTC', 'USD', 100);
 * const transakQuote = await TransakRamp.getBuyQuote('BTC', 'USD', 100);
 * 
 * console.log('MoonPay Quote:', moonpayQuote);
 * console.log('Ramp Quote:', rampQuote);
 * console.log('Transak Quote:', transakQuote);
 * ```
 * 
 * Transaction Management:
 * 
 * Most ramps provide transaction tracking and management:
 * 
 * ```typescript
 * const moonpay = new MoonPayRamp({
 *   apiKey: 'your_api_key',
 *   apiSecret: 'your_api_secret'
 * });
 * 
 * const transaction = await moonpay.createBuyTransaction({
 *   currencyCode: 'btc',
 *   baseCurrencyCode: 'usd',
 *   baseCurrencyAmount: 100,
 *   walletAddress: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa'
 * });
 * 
 * const status = await moonpay.getTransactionStatus(transaction.id);
 * console.log('Transaction Status:', status);
 * ```
 */

// Export a consolidated object with all ramps
export const CryptoRamps = {
  AlchemyPay: AlchemyPayRamp,
  Banxa: BanxaRamp,
  ChangeNow: ChangeNowRamp,
  Coinify: CoinifyRamp,
  Finchpay: FinchpayRamp,
  Guardarian: GuardarianRamp,
  Invity: InvityRamp,
  Kado: KadoRamp,
  Kriptomat: KriptomatRamp,
  Mercuryo: MercuryoRamp,
  MoonPay: MoonPayRamp,
  Noah: NoahRamp,
  Onramp: OnrampRamp,
  Ramp: RampRamp,
  Sardine: SardineRamp,
  Simplex: SimplexRamp,
  Transak: TransakRamp,
  Utorg: UtorgRamp,
  Wert: WertRamp,
  Wyre: WyreRamp,
  ZKP2P: ZKP2PRamp,
};

// Type definitions for ramp data
export interface RampQuote {
  fromCurrency: string;
  toCurrency: string;
  fromAmount: number;
  toAmount: number;
  rate: number;
  fee: number;
  paymentMethod: string;
  estimatedTime?: string;
  rampId?: string;
  timestamp: number;
}

export interface RampTransaction {
  id: string;
  status: 'pending' | 'waiting_payment' | 'confirming' | 'processing' | 'completed' | 'failed' | 'cancelled' | 'refunded';
  type: 'buy' | 'sell';
  fromCurrency: string;
  toCurrency: string;
  fromAmount: number;
  toAmount: number;
  paymentMethod: string;
  walletAddress: string;
  rate: number;
  fee: number;
  createdAt: string;
  updatedAt: string;
  estimatedTime?: string;
  transactionHash?: string;
  paymentId?: string;
  kycStatus?: string;
}

export interface RampLimits {
  min: number;
  max: number;
  currency: string;
  paymentMethod: string;
  region: string;
}

export interface RampConfig {
  apiKey?: string;
  apiSecret?: string;
  baseUrl?: string;
  sandbox?: boolean;
  region?: string;
}

// Helper function to get quotes from multiple ramps
export async function getMultiRampQuotes(
  fromCurrency: string,
  toCurrency: string,
  amount: number,
  ramps: string[] = ['MoonPay', 'Ramp', 'Transak']
): Promise<Record<string, RampQuote>> {
  const results: Record<string, RampQuote> = {};
  
  for (const rampName of ramps) {
    try {
      const ramp = CryptoRamps[rampName as keyof typeof CryptoRamps];
      if (ramp && typeof ramp.getBuyQuote === 'function') {
        const quote = await ramp.getBuyQuote(toCurrency, fromCurrency, amount);
        results[rampName] = quote;
      }
    } catch (error) {
      console.error(`Error fetching quote from ${rampName}:`, error);
    }
  }
  
  return results;
}

// Helper function to find best ramp rate
export async function findBestRampRate(
  fromCurrency: string,
  toCurrency: string,
  amount: number,
  ramps: string[] = ['MoonPay', 'Ramp', 'Transak', 'Banxa']
): Promise<{ ramp: string; quote: RampQuote } | null> {
  const quotes = await getMultiRampQuotes(fromCurrency, toCurrency, amount, ramps);
  
  if (Object.keys(quotes).length === 0) return null;
  
  let bestRamp = '';
  let bestQuote: RampQuote | null = null;
  let bestRate = 0;
  
  for (const [rampName, quote] of Object.entries(quotes)) {
    if (quote.toAmount > bestRate) {
      bestRate = quote.toAmount;
      bestRamp = rampName;
      bestQuote = quote;
    }
  }
  
  return bestQuote ? { ramp: bestRamp, quote: bestQuote } : null;
}

// Helper function to get available payment methods
export async function getAvailablePaymentMethods(): Promise<Record<string, string[]>> {
  const paymentMethods: Record<string, string[]> = {};
  
  for (const [rampName, ramp] of Object.entries(CryptoRamps)) {
    try {
      if (ramp && typeof ramp.getPaymentMethods === 'function') {
        paymentMethods[rampName] = await ramp.getPaymentMethods();
      }
    } catch (error) {
      console.error(`Error fetching payment methods from ${rampName}:`, error);
    }
  }
  
  return paymentMethods;
}

// Helper function to get supported regions
export async function getSupportedRegions(): Promise<Record<string, string[]>> {
  const regions: Record<string, string[]> = {};
  
  for (const [rampName, ramp] of Object.entries(CryptoRamps)) {
    try {
      if (ramp && typeof ramp.getSupportedRegions === 'function') {
        regions[rampName] = await ramp.getSupportedRegions();
      }
    } catch (error) {
      console.error(`Error fetching regions from ${rampName}:`, error);
    }
  }
  
  return regions;
}

export default {
  ramps: CryptoRamps,
  getMultiRampQuotes,
  findBestRampRate,
  getAvailablePaymentMethods,
  getSupportedRegions,
};
