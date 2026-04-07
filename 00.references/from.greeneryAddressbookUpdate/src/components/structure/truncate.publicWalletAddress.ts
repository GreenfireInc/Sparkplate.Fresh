import { computed, type ComputedRef } from 'vue';
import type { Wallet } from '../../services/walletService';

/**
 * Truncate address to show first 7 and last 7 characters of the address (excluding ticker:// prefix) with ellipses
 */
export function useTruncatedAddress(wallet: ComputedRef<Wallet> | { value: Wallet }) {
  return computed(() => {
    const prefix = `${wallet.value.coinTicker.toLowerCase()}://`;
    const address = wallet.value.address;
    
    if (address.length <= 14) {
      return `${prefix}${address}`;
    }
    
    const firstPart = address.substring(0, 7);
    const lastPart = address.substring(address.length - 7);
    return `${prefix}${firstPart}...${lastPart}`;
  });
}





