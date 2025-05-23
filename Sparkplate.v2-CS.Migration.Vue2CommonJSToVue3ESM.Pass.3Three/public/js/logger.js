/* global window */
import winston from 'winston'
import prettyMs from 'pretty-ms'
import { app } from 'electron'

/**
 * Proxy the standard 'console' object and redirect it toward a logger.
 */
class Logger {
  constructor() {
    // Retain a reference to the original console
    this.originalConsole = window.console
    this.timers = new Map([])

    // Configure a logger
    this.logger = winston.createLogger({
      level: 'info',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ level, message, timestamp }) => {
          return `${timestamp} ${level}: ${message}`
        })
      ),
      transports: [
        new winston.transports.File({
          filename: `${app.getPath('userData')}/logs/downloader.log`,
          handleExceptions: true, // Log unhandled exceptions
          maxsize: 5242880, // 5MB
          maxFiles: 5
        })
      ]
    })

    const _this = this

    // Switch out the console with a proxied version
    window.console = new Proxy(this.originalConsole, {
      // Override the console functions
      get(target, property) {
        // Leverage the identical logger functions
        if (['debug', 'info', 'warn', 'error'].includes(property)) {
          return (...parameters) => {
            _this.logger[property](parameters)
            // Simple approach to logging to console. Initially considered
            // using a custom logger. But this is much easier to implement.
            // Downside is that the format differs but I can live with that
            _this.originalConsole[property](...parameters)
          }
        }
        // The log function differs in logger so map it to info
        if (property === 'log') {
          return (...parameters) => {
            _this.logger.info(parameters)
            _this.originalConsole.info(...parameters)
          }
        }
        // Re-implement the time and timeEnd functions
        if (property === 'time')
          return (label) => _this.timers.set(label, window.performance.now())
        if (property === 'timeEnd') {
          return (label) => {
            const now = window.performance.now()
            if (!_this.timers.has(label)) {
              _this.logger.warn(
                `console.timeEnd('${label}') called without preceding console.time('${label}')! Or console.timeEnd('${label}') has been called more than once.`
              )
            }
            const timeTaken = prettyMs(now - _this.timers.get(label))
            _this.timers.delete(label)
            const message = `${label} ${timeTaken}`
            _this.logger.info(message)
            _this.originalConsole.info(message)
          }
        }

        // Any non-overriden functions are passed to console
        return target[property]
      }
    })
  }
}

/**
 * Calling this function switches the window.console for a proxied version.
 * The proxy allows us to redirect the call to a logger.
 */

new Logger()

export default winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level}]: ${message}`
    })
  ),
  transports: [
    new winston.transports.File({
      filename: `${app.getPath('userData')}/logs/downloader.log`,
      maxsize: 5242880, // 5MB
      maxFiles: 5
    })
  ]
})
