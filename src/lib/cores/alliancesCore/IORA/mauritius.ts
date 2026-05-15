import type { IoraCountry } from './types'
import { IORA_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { IORA_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

export const mauritius: IoraCountry = {
  name: 'Mauritius',
  iso3166Alpha2: 'MU',
  capital: 'Port Louis',
  coordinates: { latitude: -20.1609, longitude: 57.5012 },
  independence:
    '1968 independence from UK; hosts IORA Secretariat Ebene; founding Indian Ocean rim hub Mar 1997 — informational',
  topMajorCities: ['Port Louis', 'Beau Bassin-Rose Hill', 'Vacoas-Phoenix', 'Curepipe', 'Quatre Bornes'],
  population: 1260000,
  mainLanguages: ['English', 'French', 'Mauritian Creole'],
  currency: 'Mauritian rupee (MUR)',
  timezone: 'Indian/Mauritius',
  foundingLeader: 'Seewoosagur Ramgoolam independence reference — informational',
  currentLeader: 'President — verify; Prime Minister — verify',
  cryptocurrencyExchanges: ['IFC narrative; FSC regulatory evolution — informational'],
  stablecoin: 'MUR informal USD/EUR tourist rails — informational',
  domesticCourierServices: IORA_DOMESTIC_COURIERS['MU'],
  notableUniversities: IORA_NOTABLE_UNIVERSITIES['MU'],
  stockExchange: 'Stock Exchange of Mauritius (SEM)',
}
