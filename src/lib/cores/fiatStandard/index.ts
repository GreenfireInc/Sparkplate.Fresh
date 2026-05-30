export type { FiatCurrency, FinancialInstitution } from './types'

export { australia } from './AUD.Australia'
export { brazil } from './BRL.Brazil'
export { canada } from './CAD.Canada'
export { switzerland } from './CHF.Switzerland'
export { china } from './CNY.China'
export { eurozone } from './EUR.Eurozone'
export { unitedKingdom } from './GBP.UnitedKingdom'
export { hongKong } from './HKD.HongKong'
export { india } from './INR.India'
export { japan } from './JPY.Japan'
export { kenya } from './KES.Kenya'
export { southKorea } from './KRW.SouthKorea'
export { mexico } from './MXN.Mexico'
export { nigeria } from './NGN.Nigeria'
export { norway } from './NOK.Norway'
export { newZealand } from './NZD.NewZealand'
export { russia } from './RUB.Russia'
export { sweden } from './SEK.Sweden'
export { singapore } from './SGD.Singapore'
export { turkey } from './TRY.Turkey'
export { unitedStates } from './USD.UnitedStates'
export { southAfrica } from './ZAR.SouthAfrica'

import type { FiatCurrency } from './types'
import { australia } from './AUD.Australia'
import { brazil } from './BRL.Brazil'
import { canada } from './CAD.Canada'
import { switzerland } from './CHF.Switzerland'
import { china } from './CNY.China'
import { eurozone } from './EUR.Eurozone'
import { unitedKingdom } from './GBP.UnitedKingdom'
import { hongKong } from './HKD.HongKong'
import { india } from './INR.India'
import { japan } from './JPY.Japan'
import { kenya } from './KES.Kenya'
import { southKorea } from './KRW.SouthKorea'
import { mexico } from './MXN.Mexico'
import { nigeria } from './NGN.Nigeria'
import { norway } from './NOK.Norway'
import { newZealand } from './NZD.NewZealand'
import { russia } from './RUB.Russia'
import { sweden } from './SEK.Sweden'
import { singapore } from './SGD.Singapore'
import { turkey } from './TRY.Turkey'
import { unitedStates } from './USD.UnitedStates'
import { southAfrica } from './ZAR.SouthAfrica'

/** Calculator / select dropdown row shape ({ symbol, name }). */
export interface CalculatorFiatOption {
  symbol: string
  name: string
}

/**
 * Major fiat currencies in ISO 4217 alphabetical order (informational; verify).
 */
export const fiatCurrencies: readonly FiatCurrency[] = [
  australia,
  brazil,
  canada,
  switzerland,
  china,
  eurozone,
  unitedKingdom,
  hongKong,
  india,
  japan,
  kenya,
  southKorea,
  mexico,
  nigeria,
  norway,
  newZealand,
  russia,
  sweden,
  singapore,
  turkey,
  unitedStates,
  southAfrica,
] as const

/** Lookup by ISO 4217 code. */
export const fiatByIso: Record<string, FiatCurrency> = Object.fromEntries(
  fiatCurrencies.map((fiat) => [fiat.isoSymbol, fiat]),
)

/** e.g. "US Dollar (USD)" — matches legacy calculator select labels. */
export function formatFiatOptionLabel(fiat: FiatCurrency): string {
  return `${fiat.currencyName} (${fiat.isoSymbol})`
}

/** e.g. "USD United States" — text beside flag in dropdown rows. */
export function formatFiatDropdownText(fiat: FiatCurrency): string {
  return `${fiat.isoSymbol} ${fiat.countryName}`
}

/** e.g. "🇺🇸 USD United States" — full searchable fiat dropdown label. */
export function formatFiatDropdownLabel(fiat: FiatCurrency): string {
  return `${fiat.flag} ${formatFiatDropdownText(fiat)}`
}

/** ISO 4217 codes in alphabetical order. */
export const FIAT_ISO_SYMBOLS: readonly string[] = fiatCurrencies.map((fiat) => fiat.isoSymbol)

/** e.g. "🇺🇸 USD ($)" — matches user-settings currency select labels. */
export function formatFiatSettingsLabel(fiat: FiatCurrency): string {
  return `${fiat.flag} ${fiat.isoSymbol} (${fiat.currencySymbol})`
}

/** Map a full fiat record to the calculator dropdown row shape. */
export function toCalculatorFiatOption(fiat: FiatCurrency): CalculatorFiatOption {
  return {
    symbol: fiat.isoSymbol,
    name: formatFiatOptionLabel(fiat),
  }
}

/** Calculator dropdown options derived from {@link fiatCurrencies}. */
export const CALCULATOR_FIAT_OPTIONS: readonly CalculatorFiatOption[] = fiatCurrencies.map(
  toCalculatorFiatOption,
)

/** Currency glyph for an ISO 4217 code; falls back to the code itself. */
export function getFiatCurrencySymbol(isoSymbol: string): string {
  return fiatByIso[isoSymbol.toUpperCase()]?.currencySymbol ?? isoSymbol
}
