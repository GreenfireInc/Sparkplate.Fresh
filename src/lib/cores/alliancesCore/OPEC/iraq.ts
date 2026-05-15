import type { OpecCountry } from './types'
import { OPEC_DOMESTIC_COURIERS } from './domesticCouriersByIso'

export const iraq: OpecCountry = {
  name: 'Iraq',
  iso3166Alpha2: 'IQ',
  capital: 'Baghdad',
  coordinates: { latitude: 33.3152, longitude: 44.3661 },
  independence:
    '1932 Kingdom / 1958 republic lineages; post-2003 federal Iraq; OPEC founding member Sep 1960 — informational',
  topMajorCities: ['Baghdad', 'Basra', 'Mosul', 'Erbil', 'Najaf'],
  population: 46000000,
  mainLanguages: ['Arabic', 'Kurdish (KRG region)', 'Turkmen / Syriac communities'],
  currency: 'Iraqi dinar (IQD)',
  timezone: 'Asia/Baghdad',
  foundingLeader: 'Abdul Karim Kassem-era nationalisation prelude — informational',
  currentLeader:
    'President Abdul Latif Rashid — verify; Prime Minister Mohammed Shia al-Sudani — verify coalition',
  cryptocurrencyExchanges: ['CBI cautious posture; OTC informal dollarisation — informational'],
  stablecoin: 'USD settlement oil exports; IQD volatility — informational',
  domesticCourierServices: OPEC_DOMESTIC_COURIERS['IQ'],
  stockExchange: 'Iraq Stock Exchange Baghdad (liquidity episodic — informational)',
}
