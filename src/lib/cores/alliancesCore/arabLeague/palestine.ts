import type { ArabLeagueCountry } from './types'

/** State of Palestine — UN observer; Arab League member; territorial status disputed (informational). */
export const palestine: ArabLeagueCountry = {
  name: 'Palestine',
  iso3166Alpha2: 'PS',
  arabLeagueStatus: 'member',
  capital: 'Ramallah (administrative); East Jerusalem (declared)',
  coordinates: { latitude: 31.902, longitude: 35.1954 },
  independence: '1988-11-15 (Algiers declaration of State of Palestine)',
  topMajorCities: ['Gaza City', 'Ramallah', 'Hebron', 'Nablus', 'Jenin'],
  population: 5400000,
  mainLanguages: ['Arabic', 'Hebrew (communication)', 'English'],
  currency: 'Israeli new shekel (ILS); Jordanian dinar in some contexts',
  timezone: 'Asia/Gaza',
  foundingLeader: 'Yasser Arafat (first President, PLO era)',
  currentLeader: 'Mahmoud Abbas (President, Palestinian Authority — verify mandate)',
  cryptocurrencyExchanges: ['Binance (P2P)', 'OTC', 'Diaspora remittance'],
  stablecoin: 'USDT informal; shekel economy dominant',
  stockExchange: 'Palestine Securities Exchange (limited)',
}
