import { eth } from '@/utils/cryptos/index.js'

export {
  getCoinsMeta,
  getCoinsData,
  getTotalMarketCap,
  priceConversions
} from './coinMarketApp.js'

export { getGasPrices } from './gasStation.js'

export const getEthTxFee = eth.txFee
