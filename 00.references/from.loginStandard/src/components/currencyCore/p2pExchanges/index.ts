// Peer-to-Peer Cryptocurrency Exchanges API Integrations
// Centralized export for all P2P exchange integrations

// Import all P2P exchange modules
export { BisqExchange } from './bisq';
export { BitbnsExchange } from './bitbns';
export { BitpapaExchange } from './bitpapa';
export { BitvalveExchange } from './bitvalve';
export { CoinsutraExchange } from './coinsutra';
export { HodlhodlExchange } from './hodlhodl';
export { LocalcoinswapExchange } from './localcoinswap';
export { NoonesExchange } from './noones';
export { OpenpeerExchange } from './openpeer';
export { PeachbitcoinExchange } from './peachbitcoin';
export { RemitanoExchange } from './remitano';
export { RobosatsExchange } from './robosats';

/**
 * Peer-to-Peer Cryptocurrency Exchanges Overview
 * 
 * This module provides TypeScript integrations for peer-to-peer cryptocurrency exchange services.
 * These services allow users to trade cryptocurrencies directly with each other without intermediaries.
 * Each P2P exchange file includes:
 * - API endpoints for pricing and trading data
 * - Order book and trade matching functionality
 * - Escrow and dispute resolution features
 * - User verification and reputation systems
 * - Comprehensive documentation and examples
 * - Social media links and official resources
 * 
 * Supported P2P Exchanges:
 * 
 * 1. Bisq - Decentralized P2P exchange
 *    - No KYC required, fully decentralized
 *    - API Documentation: https://bisq.network/api/
 * 
 * 2. Bitbns - Indian P2P exchange
 *    - Focus on Indian market
 *    - API Documentation: https://bitbns.com/api/
 * 
 * 3. Bitpapa - Global P2P exchange
 *    - Multiple payment methods
 *    - API Documentation: https://bitpapa.com/api/
 * 
 * 4. Bitvalve - European P2P exchange
 *    - European focus with SEPA support
 *    - API Documentation: https://bitvalve.com/api/
 * 
 * 5. Coinsutra - Indian P2P platform
 *    - Local Indian market focus
 *    - API Documentation: https://coinsutra.com/api/
 * 
 * 6. Hodlhodl - Non-custodial P2P exchange
 *    - Bitcoin-focused, no KYC
 *    - API Documentation: https://hodlhodl.com/api/
 * 
 * 7. Localcoinswap - Global P2P exchange
 *    - Privacy-focused trading
 *    - API Documentation: https://localcoinswap.com/api/
 * 
 * 8. Noones - African P2P exchange
 *    - Focus on African markets
 *    - API Documentation: https://noones.com/api/
 * 
 * 9. Openpeer - Decentralized P2P exchange
 *    - Ethereum-based P2P trading
 *    - API Documentation: https://openpeer.xyz/api/
 * 
 * 10. Peachbitcoin - Bitcoin P2P exchange
 *     - Bitcoin-only P2P trading
 *     - API Documentation: https://peachbitcoin.com/api/
 * 
 * 11. Remitano - Global P2P exchange
 *     - Multiple payment methods
 *     - API Documentation: https://remitano.com/api/
 * 
 * 12. Robosats - Bitcoin P2P exchange
 *     - Lightning Network integration
 *     - API Documentation: https://robosats.com/api/
 * 
 * Usage Example:
 * 
 * ```typescript
 * import { BisqExchange, HodlhodlExchange, LocalcoinswapExchange } from '@/components/currencyCore/p2pExchanges';
 * 
 * // Get P2P order books from multiple exchanges
 * const bisqOrders = await BisqExchange.getOrderBook('BTC', 'USD');
 * const hodlhodlOrders = await HodlhodlExchange.getOrderBook('BTC', 'USD');
 * const localcoinswapOrders = await LocalcoinswapExchange.getOrderBook('BTC', 'USD');
 * 
 * console.log('Bisq Orders:', bisqOrders);
 * console.log('Hodlhodl Orders:', hodlhodlOrders);
 * console.log('Localcoinswap Orders:', localcoinswapOrders);
 * ```
 * 
 * Order Management:
 * 
 * Most P2P exchanges provide order creation and management:
 * 
 * ```typescript
 * const bisq = new BisqExchange({
 *   apiKey: 'your_api_key',
 *   apiSecret: 'your_api_secret'
 * });
 * 
 * const order = await bisq.createOrder({
 *   currency: 'BTC',
 *   baseCurrency: 'USD',
 *   amount: 0.1,
 *   price: 50000,
 *   type: 'SELL',
 *   paymentMethod: 'bank_transfer'
 * });
 * 
 * const status = await bisq.getOrderStatus(order.id);
 * console.log('Order Status:', status);
 * ```
 */

// Export a consolidated object with all P2P exchanges
export const P2PExchanges = {
  Bisq: BisqExchange,
  Bitbns: BitbnsExchange,
  Bitpapa: BitpapaExchange,
  Bitvalve: BitvalveExchange,
  Coinsutra: CoinsutraExchange,
  Hodlhodl: HodlhodlExchange,
  Localcoinswap: LocalcoinswapExchange,
  Noones: NoonesExchange,
  Openpeer: OpenpeerExchange,
  Peachbitcoin: PeachbitcoinExchange,
  Remitano: RemitanoExchange,
  Robosats: RobosatsExchange,
};

// Type definitions for P2P exchange data
export interface P2POrder {
  id: string;
  currency: string;
  baseCurrency: string;
  amount: number;
  price: number;
  type: 'BUY' | 'SELL';
  paymentMethod: string;
  paymentWindow: number;
  minAmount: number;
  maxAmount: number;
  traderId: string;
  traderRating: number;
  traderTrades: number;
  createdAt: string;
  updatedAt: string;
  status: 'ACTIVE' | 'PAUSED' | 'COMPLETED' | 'CANCELLED';
  escrowSupported: boolean;
  disputeSupported: boolean;
}

export interface P2PTrade {
  id: string;
  orderId: string;
  buyerId: string;
  sellerId: string;
  currency: string;
  baseCurrency: string;
  amount: number;
  price: number;
  totalAmount: number;
  paymentMethod: string;
  status: 'PENDING' | 'PAID' | 'CONFIRMED' | 'DISPUTED' | 'COMPLETED' | 'CANCELLED';
  createdAt: string;
  updatedAt: string;
  paymentWindow: number;
  escrowStatus: 'PENDING' | 'ACTIVE' | 'RELEASED' | 'DISPUTED';
  disputeReason?: string;
  chatMessages?: any[];
}

export interface P2PUser {
  id: string;
  username: string;
  rating: number;
  totalTrades: number;
  completedTrades: number;
  cancelledTrades: number;
  disputeRate: number;
  verified: boolean;
  kycLevel: 'NONE' | 'BASIC' | 'FULL';
  joinedAt: string;
  lastActive: string;
  country?: string;
  languages?: string[];
}

export interface P2PConfig {
  apiKey?: string;
  apiSecret?: string;
  baseUrl?: string;
  sandbox?: boolean;
  timeout?: number;
}

// Helper function to get order books from multiple P2P exchanges
export async function getMultiP2POrderBooks(
  currency: string,
  baseCurrency: string,
  exchanges: string[] = ['Bisq', 'Hodlhodl', 'Localcoinswap']
): Promise<Record<string, P2POrder[]>> {
  const results: Record<string, P2POrder[]> = {};
  
  for (const exchangeName of exchanges) {
    try {
      const exchange = P2PExchanges[exchangeName as keyof typeof P2PExchanges];
      if (exchange && typeof exchange.getOrderBook === 'function') {
        const orders = await exchange.getOrderBook(currency, baseCurrency);
        results[exchangeName] = orders;
      }
    } catch (error) {
      console.error(`Error fetching order book from ${exchangeName}:`, error);
    }
  }
  
  return results;
}

// Helper function to find best P2P rates
export async function findBestP2PRates(
  currency: string,
  baseCurrency: string,
  amount: number,
  type: 'BUY' | 'SELL',
  exchanges: string[] = ['Bisq', 'Hodlhodl', 'Localcoinswap', 'Remitano']
): Promise<{ exchange: string; order: P2POrder } | null> {
  const orderBooks = await getMultiP2POrderBooks(currency, baseCurrency, exchanges);
  
  if (Object.keys(orderBooks).the === 0) return null;
  
  let bestExchange = '';
  let bestOrder: P2POrder | null = null;
  let bestPrice = 0;
  
  for (const [exchangeName, orders] of Object.entries(orderBooks)) {
    const filteredOrders = orders.filter(order => 
      order.type === type && 
      order.amount >= amount &&
      order.status === 'ACTIVE'
    );
    
    if (filteredOrders.length === 0) continue;
    
    const order = type === 'BUY' 
      ? filteredOrders.sort((a, b) => a.price - b.price)[0] // Lowest price for buying
      : filteredOrders.sort((a, b) => b.price - a.price)[0]; // Highest price for selling
    
    if (order && (bestOrder === null || 
        (type === 'BUY' && order.price < bestPrice) || 
        (type === 'SELL' && order.price > bestPrice))) {
      bestPrice = order.price;
      bestExchange = exchangeName;
      bestOrder = order;
    }
  }
  
  return bestOrder ? { exchange: bestExchange, order: bestOrder } : null;
}

// Helper function to get supported payment methods
export async function getSupportedPaymentMethods(): Promise<Record<string, string[]>> {
  const paymentMethods: Record<string, string[]> = {};
  
  for (const [exchangeName, exchange] of Object.entries(P2PExchanges)) {
    try {
      if (exchange && typeof exchange.getPaymentMethods === 'function') {
        paymentMethods[exchangeName] = await exchange.getPaymentMethods();
      }
    } catch (error) {
      console.error(`Error fetching payment methods from ${exchangeName}:`, error);
    }
  }
  
  return paymentMethods;
}

// Helper function to get supported currencies
export async function getSupportedCurrencies(): Promise<Record<string, string[]>> {
  const currencies: Record<string, string[]> = {};
  
  for (const [exchangeName, exchange] of Object.entries(P2PExchanges)) {
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
  exchanges: P2PExchanges,
  getMultiP2POrderBooks,
  findBestP2PRates,
  getSupportedPaymentMethods,
  getSupportedCurrencies,
};
