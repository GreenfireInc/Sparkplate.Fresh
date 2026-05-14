// Node's `Buffer` is not exposed by browsers, but the bitcoinjs-lib / ecpair
// stack and a handful of currencyCore modules (BTC P2TR, LTC P2SH/P2WPKH, BCH,
// minting helpers) call `Buffer.from(...)` / `Buffer.concat(...)` directly.
// Binding the `buffer` npm package to `globalThis.Buffer` once at boot keeps
// every Buffer.* call working unchanged in the browser. Must run before any
// other crypto-touching import so dynamic `await import(...)` consumers see
// the global set up by the time they execute.
import { Buffer as BufferPolyfill } from 'buffer';
if (typeof globalThis.Buffer === 'undefined') {
  globalThis.Buffer = BufferPolyfill;
}

import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

createApp(App).mount('#app')
