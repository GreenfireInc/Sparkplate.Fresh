import type { BeltAndRoadInitiativeCountry } from './types'

export const papuaNewGuinea: BeltAndRoadInitiativeCountry = {
  name: 'Papua New Guinea',
  iso3166Alpha2: 'PG',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Port Moresby',
  coordinates: { latitude: -6, longitude: 147 },
  independence: '(Historical — verify)',
  topMajorCities: [ 'Port Moresby', 'Papua New Guinea — city 2 (verify)', 'Papua New Guinea — city 3 (verify)', 'Papua New Guinea — city 4 (verify)', 'Papua New Guinea — city 5 (verify)' ] as [string, string, string, string, string],
  population: 11781559,
  mainLanguages: [ 'English', 'Hiri Motu', 'Tok Pisin' ],
  currency: 'Papua New Guinean kina (PGK)',
  timezone: 'UTC+10:00',
  foundingLeader: '(Historical — verify)',
  currentLeader: '(Verify with official government sources)',
  cryptocurrencyExchanges: [ 'Binance (P2P)', 'International OTC', 'Local regulation varies' ],
  stablecoin: 'USDT / USDC common globally; legality varies by jurisdiction',
  stockExchange: 'National or regional exchange (verify)',
}
