import type { BeltAndRoadInitiativeCountry } from './types'

export const elSalvador: BeltAndRoadInitiativeCountry = {
  name: 'El Salvador',
  iso3166Alpha2: 'SV',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'San Salvador',
  coordinates: { latitude: 13.83333333, longitude: -88.91666666 },
  independence: '(Historical — verify)',
  topMajorCities: [ 'San Salvador', 'El Salvador — city 2 (verify)', 'El Salvador — city 3 (verify)', 'El Salvador — city 4 (verify)', 'El Salvador — city 5 (verify)' ] as [string, string, string, string, string],
  population: 6029976,
  mainLanguages: [ 'Spanish', 'English', 'Regional languages' ],
  currency: 'United States dollar (USD)',
  timezone: 'UTC-06:00',
  foundingLeader: '(Historical — verify)',
  currentLeader: '(Verify with official government sources)',
  cryptocurrencyExchanges: [ 'Binance (P2P)', 'International OTC', 'Local regulation varies' ],
  stablecoin: 'USDT / USDC common globally; legality varies by jurisdiction',
  stockExchange: 'National or regional exchange (verify)',
}
