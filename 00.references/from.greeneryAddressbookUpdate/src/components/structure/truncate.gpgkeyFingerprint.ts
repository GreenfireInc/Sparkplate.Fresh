import { computed, type ComputedRef } from 'vue';
import type { Wallet } from '../../services/walletService';

/**
 * Truncate fingerprint to show first 5 pairs and last 5 pairs with ellipses
 * Handles space-separated pairs like "B4 D0 92 66 52 C2 90 A0 2F F4 E5 11 49 A9 6A A7 8E 56 9E 81"
 */
export function useTruncatedFingerprint(wallet: ComputedRef<Wallet> | { value: Wallet }) {
  return computed(() => {
    if (!wallet.value.keyFingerprint) return '';
    
    const fingerprint = wallet.value.keyFingerprint;
    const pairs = fingerprint.trim().split(/\s+/);
    const pairsToShow = 5;
    
    if (pairs.length <= pairsToShow * 2) {
      return fingerprint;
    }
    
    const firstPairs = pairs.slice(0, pairsToShow).join(' ');
    const lastPairs = pairs.slice(-pairsToShow).join(' ');
    return `${firstPairs} ... ${lastPairs}`;
  });
}
