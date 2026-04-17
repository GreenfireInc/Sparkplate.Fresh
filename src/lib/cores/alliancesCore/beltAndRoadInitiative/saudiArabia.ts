import type { BeltAndRoadInitiativeCountry } from './types'

export const saudiArabia: BeltAndRoadInitiativeCountry = {
  name: 'Saudi Arabia',
  iso3166Alpha2: 'SA',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Riyadh',
  coordinates: { latitude: 24.7136, longitude: 46.6753 },
  independence: '1932-09-23 (Kingdom unification)',
  topMajorCities: ['Riyadh', 'Jeddah', 'Mecca', 'Medina', 'Dammam'] as [string, string, string, string, string],
  population: 35300280,
  mainLanguages: [ 'Arabic', 'English', 'Regional languages' ],
  currency: 'Saudi riyal (SAR)',
  timezone: 'UTC+03:00',
  foundingLeader: 'Ibn Saud (Abdulaziz Al Saud, first King)',
  currentLeader: 'Salman bin Abdulaziz Al Saud (King); Mohammed bin Salman (Crown Prince & Prime Minister)',
  cryptocurrencyExchanges: ['Rain', 'Regional OTC', 'International P2P'],
  stablecoin: 'USDT informal; sandbox experiments',
  stockExchange: 'Saudi Exchange (Tadawul)',
}
