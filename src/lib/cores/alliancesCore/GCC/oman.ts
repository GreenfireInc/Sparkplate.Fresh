import type { GccCountry } from './types'
import { GCC_DOMESTIC_COURIERS } from './domesticCouriersByIso'

export const oman: GccCountry = {
  name: 'Oman',
  iso3166Alpha2: 'OM',
  capital: 'Muscat',
  coordinates: { latitude: 23.5859, longitude: 58.4059 },
  independence:
    'Treaty-mediated British withdrawal 1951 modernization; Sultanate continuity; GCC charter signatory 1981 — informational',
  topMajorCities: ['Muscat', 'Salalah', 'Seeb', 'Sohar', 'Nizwa'],
  population: 4800000,
  mainLanguages: ['Arabic', 'English', 'Urdu / Swahili (resident communities)'],
  currency: 'Omani rial (OMR); GCC monetary convergence dialogue — informational',
  timezone: 'Asia/Muscat',
  foundingLeader: 'Sultan Qaboos bin Said (GCC founding-era modernization reference — informational)',
  currentLeader: 'Sultan Haitham bin Tariq — verify; heir-apparent Crown Prince — verify',
  cryptocurrencyExchanges: ['CBO cautious licensing evolution; OTC regional — informational'],
  stablecoin: 'OMR dollar peg narratives; sovereign digital-payment pilots — informational',
  domesticCourierServices: GCC_DOMESTIC_COURIERS['OM'],
  stockExchange: 'Muscat Stock Exchange',
}
