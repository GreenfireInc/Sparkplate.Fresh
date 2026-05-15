import type { IoraCountry } from './types'
import { IORA_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { IORA_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

export const sriLanka: IoraCountry = {
  name: 'Sri Lanka',
  iso3166Alpha2: 'LK',
  capital: 'Sri Jayewardenepura Kotte (legislative); Colombo commercial/administrative hub',
  coordinates: { latitude: 6.9271, longitude: 79.8612 },
  independence:
    '1948 Dominion to republic lineage; southern Bay of Bengal / Arabian Sea littoral trade; IORA member — informational',
  topMajorCities: ['Colombo', 'Dehiwala-Mount Lavinia', 'Maharagama', 'Jaffna', 'Kandy'],
  population: 22000000,
  mainLanguages: ['Sinhala', 'Tamil', 'English'],
  currency: 'Sri Lankan rupee (LKR; post-2022 macro distress episodes — informational)',
  timezone: 'Asia/Colombo',
  foundingLeader: 'D.S. Senanayake Dominion reference — informational',
  currentLeader: 'President Anura Kumara Dissanayake — verify coalition',
  cryptocurrencyExchanges: ['CB restrictive retail screens; OTC informal diaspora rails — informational'],
  stablecoin: 'USD informal dollarisation overlays — informational',
  domesticCourierServices: IORA_DOMESTIC_COURIERS['LK'],
  notableUniversities: IORA_NOTABLE_UNIVERSITIES['LK'],
  stockExchange: 'Colombo Stock Exchange (CSE)',
}
