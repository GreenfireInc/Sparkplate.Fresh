import type { BeltAndRoadInitiativeCountry } from './types'

export const belarus: BeltAndRoadInitiativeCountry = {
  name: 'Belarus',
  iso3166Alpha2: 'BY',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Minsk',
  coordinates: { latitude: 53, longitude: 28 },
  independence: '(Historical — verify)',
  topMajorCities: [ 'Minsk', 'Belarus — city 2 (verify)', 'Belarus — city 3 (verify)', 'Belarus — city 4 (verify)', 'Belarus — city 5 (verify)' ] as [string, string, string, string, string],
  population: 9109280,
  mainLanguages: [ 'Belarusian', 'Russian', 'Regional languages' ],
  currency: 'Belarusian ruble (BYN)',
  timezone: 'UTC+03:00',
  foundingLeader: '(Historical — verify)',
  currentLeader: '(Verify with official government sources)',
  cryptocurrencyExchanges: [ 'Binance (P2P)', 'International OTC', 'Local regulation varies' ],
  stablecoin: 'USDT / USDC common globally; legality varies by jurisdiction',
  stockExchange: 'National or regional exchange (verify)',
}
