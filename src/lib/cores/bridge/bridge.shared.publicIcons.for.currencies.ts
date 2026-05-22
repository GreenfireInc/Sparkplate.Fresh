import { COINBASE50 } from '@/lib/cores/currencyCore/indexComposites/coinbase50'
import { CURRENCY_CORE } from '@/lib/cores/currencyCore/indexComposites/currencyCore'
import { currencyByTicker } from '@/lib/cores/currencyCore/currencies'

/** Tickers with icons under public/assets/icons/crypto/ (base icons only, no variants). */
export const PUBLIC_ICON_CRYPTO_TICKERS = [
  '1INCH', 'AAVE', 'ACU', 'ADA', 'AERO', 'ALEPH', 'ALGO', 'ALI', 'ALICE', 'AMP',
  'ANKR', 'APE', 'API3', 'APT', 'AR', 'ARB', 'ATOM', 'AUCTION', 'AVAX', 'AXS',
  'BAL', 'BAND', 'BASE', 'BAT', 'BCD', 'BCH', 'BCN', 'BDX', 'BEAM', 'BICO',
  'BLUR', 'BLZ', 'BNB', 'BNT', 'BONK', 'BSV', 'BTC', 'BTG', 'BTM', 'BTT',
  'BUSD', 'CFX', 'CHZ', 'CKB', 'CLORE', 'COIN98', 'COMP', 'CRO', 'CRV', 'CTSI',
  'CTX', 'CUBE', 'CVC', 'DAI', 'DASH', 'DCR', 'DGB', 'DIA', 'DIME', 'DOGE',
  'DOT', 'DRIFT', 'EFL', 'EGLD', 'ELON', 'ENA', 'ENJ', 'ENS', 'EOS', 'ERG',
  'ETC', 'ETH', 'ETHW', 'EUR', 'EUROC', 'FARM', 'FET', 'FIL', 'FLOW', 'FLR',
  'FRAX', 'FTM', 'GALA', 'GFI', 'GLM', 'GMT', 'GNO', 'GRT', 'GUSD', 'GYEN',
  'HBAR', 'HNS', 'HNT', 'HUSH', 'ICP', 'IMX', 'INJ', 'IOTX', 'JASMY', 'JITOSOL',
  'JST', 'JTO', 'JUP', 'KAS', 'KDA', 'KMD', 'KMNO', 'KSM', 'LBC', 'LDO',
  'LINK', 'LPT', 'LRC', 'LTC', 'LUNA', 'LUNC', 'MANA', 'MASK', 'MATIC', 'MINA',
  'MKR', 'MLN', 'NEAR', 'NEO', 'NMR', 'OGN', 'ONT', 'OP', 'ORCA', 'OSMO',
  'OXT', 'PAXG', 'PENDLE', 'PEPE', 'PERP', 'POL', 'POWR', 'PYTH', 'PYUSD', 'QNT',
  'QRL', 'QTUM', 'RAD', 'RADICLE', 'RARI', 'RDD', 'RED', 'RENDER', 'REQ', 'REV',
  'RLC', 'RLUSD', 'RNDR', 'RONIN', 'ROSE', 'RVN', 'SAFE', 'SAMO', 'SAND', 'SC',
  'SEI', 'SHIB', 'SKL', 'SKY', 'SNX', 'SOL', 'SPELL', 'STORJ', 'STRK', 'STX',
  'SUI', 'SUSHI', 'SWTCH', 'SYRUP', 'TAO', 'TELLOR', 'TRAC', 'TRB', 'TRU', 'TRX',
  'TUSD', 'UMA', 'UMB', 'UNI', 'USD', 'USDC', 'USDE', 'USDT', 'VET', 'VIRTUAL',
  'VTHO', 'WAVES', 'WIF', 'XCN', 'XLM', 'XMR', 'XRP', 'XTZ', 'XYO', 'YFI',
  'ZCL', 'ZEC', 'ZEN', 'ZIL', 'ZRX', 'ZUSD',
].sort()

const FIAT_AND_STABLE_NAMES: Record<string, string> = {
  USD: 'US Dollar',
  EUR: 'Euro',
  BUSD: 'Binance USD',
  DAI: 'Dai',
  FRAX: 'Frax',
  GUSD: 'Gemini Dollar',
  PYUSD: 'PayPal USD',
  RLUSD: 'Ripple USD',
  TUSD: 'TrueUSD',
  USDC: 'USD Coin',
  USDE: 'Ethena USDe',
  USDT: 'Tether',
  ZUSD: 'ZUSD',
  EUROC: 'Euro Coin',
  GYEN: 'GYEN',
}

function buildNameByTicker(): Map<string, string> {
  const map = new Map<string, string>()

  for (const [symbol, name] of Object.entries(FIAT_AND_STABLE_NAMES)) {
    map.set(symbol.toUpperCase(), name)
  }

  for (const item of [...COINBASE50, ...CURRENCY_CORE]) {
    map.set(item.symbol.toUpperCase(), item.name)
  }

  for (const [ticker, data] of Object.entries(currencyByTicker)) {
    const name = data.basicInfo?.name
    if (name) {
      map.set(ticker.toUpperCase(), name)
    }
  }

  return map
}

const nameByTicker = buildNameByTicker()

export function getCryptoIconPath(coinTicker: string): string | null {
  if (!coinTicker) return null
  return `/assets/icons/crypto/${coinTicker.toLowerCase()}.svg`
}

export function getCryptoDisplayName(ticker: string): string {
  const upper = ticker.toUpperCase()
  return nameByTicker.get(upper) ?? upper
}

/** e.g. "Bitcoin (BTC)" — matches legacy calculator select labels. */
export function formatCryptoOptionLabel(ticker: string): string {
  const upper = ticker.toUpperCase()
  const name = getCryptoDisplayName(upper)
  return `${name} (${upper})`
}
