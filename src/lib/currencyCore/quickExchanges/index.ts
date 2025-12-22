// Quick Cryptocurrency Exchanges API Integrations
// Centralized export for all instant/quick exchange integrations

// Import all quick exchange modules
export { AlfaCashExchange } from './alfacash';
export { BitcoinVNExchange } from './bitcoinvn';
export { BityExchange } from './bity';
export { ChangeHeroExchange } from './changehero';
export { ChangeNOWExchange } from './changenow';
export { ChangellyExchange } from './changelly';
export { CoinswitchExchange } from './coinswitch';
export { CypherGoatExchange } from './cyphergoat';
export { EasybitExchange } from './easybit';
export { EasyRabbitExchange } from './easyrabbit';
export { ExmoExchange } from './exmo';
export { ExolixExchange } from './exolix';
export { FaaExchange } from './faast';
export { FixedFloatExchange } from './fixedfloat';
export { FoxExchangeExchange } from './foxexchange';
export { GodexExchange } from './godex';
export { LetsExchangeExchange } from './letsexchange';
export { NanswapExchange } from './nanswap';
export { PegasusSwapExchange } from './pegasusswap';
export { QuickExExchange } from './quickex';
export { ShapeshiftExchange } from './shapeshift';
export { SilkByteExchange } from './silkbyte';
export { SimpleswapExchange } from './simpleswap';
export { StealthEXExchange } from './stealthex';
export { SwapuzExchange } from './swapuz';
export { SwapzoneExchange } from './swapzone';
export { SwitchainExchange } from './switchain';
export { TotleExchange } from './totle';
export { XchangeExchange } from './xchange';
export { WizardSwapExchange } from './wizardswap';

/**
 * Quick Cryptocurrency Exchanges Overview
 * 
 * This module provides TypeScript integrations for instant cryptocurrency exchange services.
 * These services allow users to swap cryptocurrencies quickly without creating accounts.
 * Each exchange file includes:
 * - API endpoints for pricing and transaction data
 * - Quote and estimation endpoints
 * - Transaction tracking and status
 * - Comprehensive documentation and examples
 * - Social media links and official resources
 * 
 * Supported Quick Exchanges:
 * 
 * 1. AlfaCash - Swiss instant exchange service
 *    - Swiss quality and security
 *    - API Documentation: https://alfacash.com/api/
 * 
 * 2. BitcoinVN - Vietnamese instant exchange
 *    - Vietnamese market focus
 *    - API Documentation: https://bitcoinvn.com/api/
 * 
 * 3. Bity - Swiss instant exchange service
 *    - Fiat and crypto conversions
 *    - API Documentation: https://bity.com/api/
 * 
 * 4. ChangeHero - Global instant exchange
 *    - Fast and secure swaps
 *    - API Documentation: https://changehero.io/api/
 * 
 * 5. ChangeNOW - Global instant exchange
 *    - 200+ cryptocurrencies supported
 *    - API Documentation: https://changenow.io/api/docs
 * 
 * 6. Changelly - Global instant exchange
 *    - 200+ cryptocurrencies supported
 *    - API Documentation: https://changelly.com/developers/api
 * 
 * 7. Coinswitch - Indian instant exchange
 *    - Focus on Indian market
 *    - API Documentation: https://coinswitch.co/api/
 * 
 * 8. CypherGoat - Global instant exchange
 *    - Fast and secure swaps
 *    - API Documentation: https://cyphergoat.com/api/
 * 
 * 9. Easybit - Simple instant exchange
 *    - User-friendly interface
 *    - API Documentation: https://easybit.com/api/
 * 
 * 10. EasyRabbit - Global instant exchange
 *     - Fast and secure swaps
 *     - API Documentation: https://easyrabbit.io/api/
 * 
 * 11. EXMO - European exchange with instant swaps
 *     - Spot and instant trading
 *     - API Documentation: https://exmo.com/en/api
 * 
 * 12. Exolix - Global instant exchange
 *     - Fast and secure swaps
 *     - API Documentation: https://exolix.com/api/
 * 
 * 13. Faa.st - Fast instant exchange
 *     - Quick swaps and transfers
 *     - API Documentation: https://faa.st/api/
 * 
 * 14. FixedFloat - Global instant exchange
 *     - Fixed rate exchanges
 *     - API Documentation: https://fixedfloat.com/api/
 * 
 * 15. Fox.Exchange - Global instant exchange
 *     - Fast and secure swaps
 *     - API Documentation: https://fox.exchange/api/
 * 
 * 16. Godex - Anonymous instant exchange
 *     - No KYC required
 *     - API Documentation: https://godex.io/api/
 * 
 * 17. LetsExchange - Global instant exchange
 *     - Fast and secure swaps
 *     - API Documentation: https://letsexchange.io/api/
 * 
 * 18. Nanswap - Global instant exchange
 *     - Fast and secure swaps
 *     - API Documentation: https://nanswap.com/api/
 * 
 * 19. PegasusSwap - Global instant exchange
 *     - Fast and secure swaps
 *     - API Documentation: https://pegasusswap.com/api/
 * 
 * 20. QuickEx - Global instant exchange
 *     - Fast and secure swaps
 *     - API Documentation: https://quickex.io/api/
 * 
 * 21. Shapeshift - Decentralized exchange
 *     - Non-custodial swaps
 *     - API Documentation: https://shapeshift.com/api/
 * 
 * 22. SilkByte - Global instant exchange
 *     - Fast and secure swaps
 *     - API Documentation: https://silkbyte.com/api/
 * 
 * 23. Simpleswap - Simple instant exchange
 *     - Easy-to-use interface
 *     - API Documentation: https://simpleswap.io/api/
 * 
 * 24. StealthEX - Privacy-focused instant exchange
 *     - Privacy-focused swaps
 *     - API Documentation: https://stealthex.io/api/
 * 
 * 25. Swapuz - Global instant exchange
 *     - Fast and secure swaps
 *     - API Documentation: https://swapuz.com/api/
 * 
 * 26. Swapzone - Aggregator of exchanges
 *     - Compares multiple exchanges
 *     - API Documentation: https://swapzone.io/api/
 * 
 * 27. Switchain - Instant crypto exchange
 *     - Multiple payment methods
 *     - API Documentation: https://switchain.com/api/
 * 
 * 28. Totle - DEX aggregator
 *     - Decentralized exchange aggregator
 *     - API Documentation: https://totle.com/api/
 * 
 * 29. Xchange (xchange.me) - Global instant exchange
 *     - Fast and secure swaps
 *     - API Documentation: https://xchange.me/api/
 * 
 * 30. WizardSwap - Global instant exchange
 *     - Fast and secure swaps
 *     - API Documentation: https://wizardswap.io/api/
 * 
 * Usage Example:
 * 
 * ```typescript
 * import { ChangellyExchange, SimpleswapExchange } from '@/components/currencyCore/quickExchanges';
 * 
 * // Get exchange rate from multiple services
 * const changellyRate = await ChangellyExchange.getExchangeAmount('btc', 'eth', 1);
 * const simpleswapRate = await SimpleswapExchange.getEstimatedAmount('btc', 'eth', 1);
 * 
 * console.log('Changelly Rate:', changellyRate);
 * console.log('Simpleswap Rate:', simpleswapRate);
 * ```
 * 
 * Transaction Tracking:
 * 
 * Most quick exchanges provide transaction tracking:
 * 
 * ```typescript
 * const changelly = new ChangellyExchange({
 *   apiKey: 'your_api_key',
 *   apiSecret: 'your_api_secret'
 * });
 * 
 * const transaction = await changelly.getTransactionStatus('transaction_id');
 * console.log('Transaction Status:', transaction);
 * ```
 */

// Export a consolidated object with all quick exchanges
export const QuickExchanges = {
  AlfaCash: AlfaCashExchange,
  BitcoinVN: BitcoinVNExchange,
  Bity: BityExchange,
  ChangeHero: ChangeHeroExchange,
  ChangeNOW: ChangeNOWExchange,
  Changelly: ChangellyExchange,
  Coinswitch: CoinswitchExchange,
  CypherGoat: CypherGoatExchange,
  Easybit: EasybitExchange,
  EasyRabbit: EasyRabbitExchange,
  Exmo: ExmoExchange,
  Exolix: ExolixExchange,
  Faa: FaaExchange,
  FixedFloat: FixedFloatExchange,
  FoxExchange: FoxExchangeExchange,
  Godex: GodexExchange,
  LetsExchange: LetsExchangeExchange,
  Nanswap: NanswapExchange,
  PegasusSwap: PegasusSwapExchange,
  QuickEx: QuickExExchange,
  Shapeshift: ShapeshiftExchange,
  SilkByte: SilkByteExchange,
  Simpleswap: SimpleswapExchange,
  StealthEX: StealthEXExchange,
  Swapuz: SwapuzExchange,
  Swapzone: SwapzoneExchange,
  Switchain: SwitchainExchange,
  Totle: TotleExchange,
  Xchange: XchangeExchange,
  WizardSwap: WizardSwapExchange,
};

// Type definitions for quick exchange data
export interface ExchangeQuote {
  fromCurrency: string;
  toCurrency: string;
  fromAmount: number;
  toAmount: number;
  rate: number;
  fee: number;
  estimatedTime?: string;
  exchangeId?: string;
  timestamp: number;
}

export interface ExchangeTransaction {
  id: string;
  status: 'pending' | 'waiting' | 'confirming' | 'exchanging' | 'finished' | 'failed' | 'refunded';
  fromCurrency: string;
  toCurrency: string;
  fromAmount: number;
  toAmount: number;
  fromAddress: string;
  toAddress: string;
  payinAddress?: string;
  payoutAddress?: string;
  rate: number;
  fee: number;
  createdAt: string;
  updatedAt: string;
  estimatedTime?: string;
  transactionHash?: string;
  refundAddress?: string;
}

export interface ExchangeLimits {
  min: number;
  max: number;
  currency: string;
}

export interface QuickExchangeConfig {
  apiKey?: string;
  apiSecret?: string;
  baseUrl?: string;
  sandbox?: boolean;
}

// Helper function to get quotes from multiple exchanges
export async function getMultiExchangeQuotes(
  fromCurrency: string,
  toCurrency: string,
  amount: number,
  exchanges: string[] = ['Changelly', 'Simpleswap', 'Switchain']
): Promise<Record<string, ExchangeQuote>> {
  const results: Record<string, ExchangeQuote> = {};
  
  for (const exchangeName of exchanges) {
    try {
      const exchange = QuickExchanges[exchangeName as keyof typeof QuickExchanges];
      if (exchange && typeof exchange.getQuote === 'function') {
        const quote = await exchange.getQuote(fromCurrency, toCurrency, amount);
        results[exchangeName] = quote;
      }
    } catch (error) {
      console.error(`Error fetching quote from ${exchangeName}:`, error);
    }
  }
  
  return results;
}

// Helper function to find best exchange rate
export async function findBestExchangeRate(
  fromCurrency: string,
  toCurrency: string,
  amount: number,
  exchanges: string[] = ['Changelly', 'Simpleswap', 'Switchain', 'Godex']
): Promise<{ exchange: string; quote: ExchangeQuote } | null> {
  const quotes = await getMultiExchangeQuotes(fromCurrency, toCurrency, amount, exchanges);
  
  if (Object.keys(quotes).length === 0) return null;
  
  let bestExchange = '';
  let bestQuote: ExchangeQuote | null = null;
  let bestRate = 0;
  
  for (const [exchangeName, quote] of Object.entries(quotes)) {
    if (quote.toAmount > bestRate) {
      bestRate = quote.toAmount;
      bestExchange = exchangeName;
      bestQuote = quote;
    }
  }
  
  return bestQuote ? { exchange: bestExchange, quote: bestQuote } : null;
}

// Helper function to get available currencies
export async function getAvailableCurrencies(): Promise<Record<string, string[]>> {
  const currencies: Record<string, string[]> = {};
  
  for (const [exchangeName, exchange] of Object.entries(QuickExchanges)) {
    try {
      if (exchange && typeof exchange.getCurrencies === 'function') {
        currencies[exchangeName] = await exchange.getCurrencies();
      }
    } catch (error) {
      console.error(`Error fetching currencies from ${exchangeName}:`, error);
    }
  }
  
  return currencies;
}

export default {
  exchanges: QuickExchanges,
  getMultiExchangeQuotes,
  findBestExchangeRate,
  getAvailableCurrencies,
};
