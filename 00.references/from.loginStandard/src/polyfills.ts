// Polyfill for Buffer (Node.js compatibility)
import { Buffer } from 'buffer';
if (typeof window !== 'undefined') {
  (window as any).Buffer = Buffer;
  (window as any).global = window;
  (window as any).process = { env: {} };
}

// Polyfill for crypto.getRandomValues
if (typeof window !== 'undefined' && !window.crypto) {
  window.crypto = {} as Crypto;
}

if (typeof window !== 'undefined' && window.crypto && !window.crypto.getRandomValues) {
  window.crypto.getRandomValues = function(array: Uint8Array) {
    for (let i = 0; i < array.length; i++) {
      array[i] = Math.floor(Math.random() * 256);
    }
    return array;
  };
}
