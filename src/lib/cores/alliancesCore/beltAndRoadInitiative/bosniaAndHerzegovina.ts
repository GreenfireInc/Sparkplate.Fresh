import type { BeltAndRoadInitiativeCountry } from './types'

export const bosniaAndHerzegovina: BeltAndRoadInitiativeCountry = {
  name: 'Bosnia and Herzegovina',
  iso3166Alpha2: 'BA',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Sarajevo',
  coordinates: { latitude: 44, longitude: 18 },
  independence: '(Historical — verify)',
  topMajorCities: [ 'Sarajevo', 'Bosnia and Herzegovina — city 2 (verify)', 'Bosnia and Herzegovina — city 3 (verify)', 'Bosnia and Herzegovina — city 4 (verify)', 'Bosnia and Herzegovina — city 5 (verify)' ] as [string, string, string, string, string],
  population: 3422000,
  mainLanguages: [ 'Bosnian', 'Croatian', 'Serbian' ],
  currency: 'Bosnia and Herzegovina convertible mark (BAM)',
  timezone: 'UTC+01:00',
  foundingLeader: '(Historical — verify)',
  currentLeader: '(Verify with official government sources)',
  cryptocurrencyExchanges: [ 'Binance (P2P)', 'International OTC', 'Local regulation varies' ],
  stablecoin: 'USDT / USDC common globally; legality varies by jurisdiction',
  stockExchange: 'National or regional exchange (verify)',
}
