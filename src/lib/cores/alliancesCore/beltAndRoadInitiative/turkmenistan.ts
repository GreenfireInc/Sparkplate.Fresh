import type { BeltAndRoadInitiativeCountry } from './types'

export const turkmenistan: BeltAndRoadInitiativeCountry = {
  name: 'Turkmenistan',
  iso3166Alpha2: 'TM',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Ashgabat',
  coordinates: { latitude: 40, longitude: 60 },
  independence: '(Historical — verify)',
  topMajorCities: [ 'Ashgabat', 'Turkmenistan — city 2 (verify)', 'Turkmenistan — city 3 (verify)', 'Turkmenistan — city 4 (verify)', 'Turkmenistan — city 5 (verify)' ] as [string, string, string, string, string],
  population: 7057841,
  mainLanguages: [ 'Russian', 'Turkmen', 'Regional languages' ],
  currency: 'Turkmenistan manat (TMT)',
  timezone: 'UTC+05:00',
  foundingLeader: '(Historical — verify)',
  currentLeader: '(Verify with official government sources)',
  cryptocurrencyExchanges: [ 'Binance (P2P)', 'International OTC', 'Local regulation varies' ],
  stablecoin: 'USDT / USDC common globally; legality varies by jurisdiction',
  stockExchange: 'National or regional exchange (verify)',
}
