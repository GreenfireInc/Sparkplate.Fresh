import type { BeltAndRoadInitiativeCountry } from './types'

export const unitedArabEmirates: BeltAndRoadInitiativeCountry = {
  name: 'United Arab Emirates',
  iso3166Alpha2: 'AE',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Abu Dhabi',
  coordinates: { latitude: 24.4539, longitude: 54.3773 },
  independence: '1971-12-02 (federation; from British treaty)',
  topMajorCities: ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 'Ras Al Khaimah'] as [string, string, string, string, string],
  population: 11294243,
  mainLanguages: [ 'Arabic', 'English', 'Regional languages' ],
  currency: 'United Arab Emirates dirham (AED)',
  timezone: 'UTC+04:00',
  foundingLeader: 'Zayed bin Sultan Al Nahyan (first President)',
  currentLeader: 'Mohamed bin Zayed Al Nahyan (President); Mohammed bin Rashid Al Maktoum (Vice President & PM of UAE, Ruler of Dubai)',
  cryptocurrencyExchanges: ['BitOasis (historical)', 'International brokers', 'VARA-regulated Dubai activity'],
  stablecoin: 'USDT / USDC; AED-linked experiments',
  stockExchange: 'Abu Dhabi Securities Exchange (ADX); Dubai Financial Market (DFM)',
}
