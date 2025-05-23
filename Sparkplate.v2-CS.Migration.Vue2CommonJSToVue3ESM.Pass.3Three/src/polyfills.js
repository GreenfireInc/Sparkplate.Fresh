import { Buffer } from 'buffer'
import { EventEmitter } from 'eventemitter3'
import {
  ReadableStream,
  WritableStream,
  TransformStream
} from 'web-streams-polyfill'

// Make Buffer available globally
window.Buffer = Buffer

// Only set global.Buffer if we're in a Node.js environment
if (typeof global !== 'undefined') {
  global.Buffer = Buffer
  global.EventEmitter = EventEmitter
  global.ReadableStream = ReadableStream
  global.WritableStream = WritableStream
  global.TransformStream = TransformStream
}

// TextEncoder and TextDecoder are available natively in modern browsers
// No need to polyfill them

// Process polyfill is handled by Vite's built-in process polyfill
// No need to explicitly import or set it
