import type { BeltAndRoadInitiativeCountry } from './types'

export const indonesia: BeltAndRoadInitiativeCountry = {
  name: 'Indonesia',
  iso3166Alpha2: 'ID',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Jakarta',
  coordinates: { latitude: -5, longitude: 120 },
  independence: '(Historical — verify)',
  topMajorCities: [ 'Jakarta', 'Indonesia — city 2 (verify)', 'Indonesia — city 3 (verify)', 'Indonesia — city 4 (verify)', 'Indonesia — city 5 (verify)' ] as [string, string, string, string, string],
  population: 284438782,
  mainLanguages: [ 'Indonesian', 'English', 'Regional languages' ],
  currency: 'Indonesian rupiah (IDR)',
  timezone: 'UTC+07:00',
  foundingLeader: '(Historical — verify)',
  currentLeader: '(Verify with official government sources)',
  cryptocurrencyExchanges: [ 'Binance (P2P)', 'International OTC', 'Local regulation varies' ],
  stablecoin: 'USDT / USDC common globally; legality varies by jurisdiction',
  stockExchange: 'National or regional exchange (verify)',
}
