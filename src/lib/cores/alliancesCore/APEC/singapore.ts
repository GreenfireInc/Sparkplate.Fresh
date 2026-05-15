import type { ApecCountry } from './types'
import { APEC_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { APEC_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

export const singapore: ApecCountry = {
  name: 'Singapore',
  iso3166Alpha2: 'SG',
  capital: 'Singapore (city-state)',
  coordinates: { latitude: 1.3521, longitude: 103.8198 },
  independence:
    '1965 separation Malaysia; hosts APEC Secretariat premises; transpacific chokepoint logistics finance hub — informational',
  topMajorCities: ['Singapore Central', 'Jurong West', 'Tampines', 'Woodlands', 'Sengkang'],
  population: 5920000,
  mainLanguages: ['English', 'Mandarin', 'Malay / Tamil official minorities'],
  currency: 'Singapore dollar (SGD)',
  timezone: 'Asia/Singapore',
  foundingLeader: 'Lee Kuan Yew developmental reference — informational',
  currentLeader: 'President Tharman Shanmugaratnam; Prime Minister Lawrence Wong — verify',
  cryptocurrencyExchanges: ['MAS DPT licensing regime flagship — informational'],
  stablecoin: 'MAS stable-value digital guidance flagship — informational',
  domesticCourierServices: APEC_DOMESTIC_COURIERS['SG'],
  notableUniversities: APEC_NOTABLE_UNIVERSITIES['SG'],
  stockExchange: 'Singapore Exchange (SGX)',
}
