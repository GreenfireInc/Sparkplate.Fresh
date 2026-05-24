import type { SadcCountry } from './types'
import { SADC_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { SADC_NEWS_OUTLETS } from './newsOutletsByIso'
import { SADC_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { SADC_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'

export const seychelles: SadcCountry = {
  name: 'Seychelles',
  iso3166Alpha2: 'SC',
  capital: 'Victoria',
  coordinates: { latitude: -4.6796, longitude: 55.492 },
  independence: '1976-06-29',
  topMajorCities: ['Victoria', 'Beau Vallon', 'Anse Royale', 'Takamaka', 'Cascade'],
  population: 100000,
  mainLanguages: ['Seychellois Creole', 'French', 'English'],
  currency: 'Seychellois rupee (SCR)',
  timezone: 'Indian/Mahe',
  foundingLeader: 'James Mancham / France-Albert René (early republic coalition — informational)',
  currentLeader:
    'President Wavel Ramkalawan — verify (dual-island administrations informational only)',
  cryptocurrencyExchanges: ['Tourism OTC; sandbox licensing narrative'],
  stablecoin: 'Informal EUR/USD references',
  domesticCourierServices: SADC_DOMESTIC_COURIERS['SC'],
  newsOutlets: SADC_NEWS_OUTLETS['SC'],
  notableUniversities: SADC_NOTABLE_UNIVERSITIES['SC'],
  mainExportCommodities: SADC_MAIN_EXPORT_COMMODITIES['SC'],
  stockExchange: 'Merjex / small domestic market — verify',
}
