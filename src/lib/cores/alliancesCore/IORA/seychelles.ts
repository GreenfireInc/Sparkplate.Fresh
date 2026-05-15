import type { IoraCountry } from './types'
import { IORA_DOMESTIC_COURIERS } from './domesticCouriersByIso'

export const seychelles: IoraCountry = {
  name: 'Seychelles',
  iso3166Alpha2: 'SC',
  capital: 'Victoria',
  coordinates: { latitude: -4.6796, longitude: 55.492 },
  independence:
    '1976-06-29 independent state; granular Indian Ocean archipelago fiduciary hub; IORA member — informational',
  topMajorCities: ['Victoria', 'Beau Vallon', 'Anse Royale', 'Takamaka', 'Cascade'],
  population: 100000,
  mainLanguages: ['Seychellois Creole', 'French', 'English'],
  currency: 'Seychellois rupee (SCR)',
  timezone: 'Indian/Mahe',
  foundingLeader: 'James R. Mancham / France-Albert René early republic coalition — informational',
  currentLeader: 'President Wavel Ramkalawan — verify',
  cryptocurrencyExchanges: ['Tourism OTC; IFC sandbox licences — informational'],
  stablecoin: 'Informal EUR/USD resort settlement — informational',
  domesticCourierServices: IORA_DOMESTIC_COURIERS['SC'],
  stockExchange: 'Merjex SME market / thin equities — informational',
}
