import type { BeltAndRoadInitiativeCountry } from './types'

export const peru: BeltAndRoadInitiativeCountry = {
  name: 'Peru',
  iso3166Alpha2: 'PE',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Lima',
  coordinates: { latitude: -10, longitude: -76 },
  independence: '(Historical — verify)',
  topMajorCities: [ 'Lima', 'Peru — city 2 (verify)', 'Peru — city 3 (verify)', 'Peru — city 4 (verify)', 'Peru — city 5 (verify)' ] as [string, string, string, string, string],
  population: 34350244,
  mainLanguages: [ 'Aymara', 'Quechua', 'Spanish' ],
  currency: 'Peruvian sol (PEN)',
  timezone: 'UTC-05:00',
  foundingLeader: '(Historical — verify)',
  currentLeader: '(Verify with official government sources)',
  cryptocurrencyExchanges: [ 'Binance (P2P)', 'International OTC', 'Local regulation varies' ],
  stablecoin: 'USDT / USDC common globally; legality varies by jurisdiction',
  stockExchange: 'National or regional exchange (verify)',
}
