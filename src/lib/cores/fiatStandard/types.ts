/**
 * Reference payloads for major fiat currencies (informational; verify before production).
 *
 * Each record pairs an ISO 4217 currency with its issuing economy and the three principal
 * financial institutions that govern it: the central bank (monetary authority), the primary
 * stock exchange, and the securities regulator ("SEC" equivalent).
 */

/**
 * Financial institution row (central bank, exchange, or securities regulator).
 * `abbreviation` is the common acronym (e.g. `Fed`, `NYSE`, `SEC`); empty string when none is used.
 */
export interface FinancialInstitution {
  name: string
  abbreviation: string
  website: string
}

/**
 * Single fiat currency reference record keyed by ISO 4217 code (informational; verify).
 */
export interface FiatCurrency {
  /** ISO 4217 three-letter code, e.g. `USD`. */
  isoSymbol: string
  /** Currency glyph / sign, e.g. `$`, `€`, `¥`. */
  currencySymbol: string
  /** Human-readable currency name, e.g. `US Dollar`. */
  currencyName: string
  /** Issuing country or monetary union, e.g. `United States`, `Eurozone`. */
  countryName: string
  /** Flag emoji for the issuing economy, e.g. `🇺🇸`. */
  flag: string
  /** Monetary authority that issues the currency. */
  centralBank: FinancialInstitution
  /** Primary national stock exchange. */
  stockExchange: FinancialInstitution
  /** Securities-markets regulator (the "SEC" equivalent for the economy). */
  securitiesRegulator: FinancialInstitution
}
