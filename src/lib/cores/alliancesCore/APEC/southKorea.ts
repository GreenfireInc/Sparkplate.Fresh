import type { ApecCountry } from './types'
import { APEC_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { APEC_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

export const southKorea: ApecCountry = {
  name: 'South Korea',
  iso3166Alpha2: 'KR',
  capital: 'Seoul',
  coordinates: { latitude: 37.5665, longitude: 126.978 },
  independence:
    '1948 Republic of Korea lineage; chip-ship heavyweight transpacific CPTPP exploratory APEC host narratives — informational',
  topMajorCities: ['Seoul', 'Busan', 'Incheon', 'Daegu', 'Daejeon'],
  population: 51700000,
  mainLanguages: ['Korean', 'English education', 'Chinese Vietnamese communities resident'],
  currency: 'South Korean won (KRW)',
  timezone: 'Asia/Seoul',
  foundingLeader:
    'Park Chung-hee industrialisation-era reference — informational',
  currentLeader: 'President — verify (ROK executive branch cycle)',
  cryptocurrencyExchanges: ['Upbit Bithumb FSC VASP regime — informational'],
  stablecoin: 'KRW won-linked CBDC sandbox Bank of Korea — informational',
  domesticCourierServices: APEC_DOMESTIC_COURIERS['KR'],
  notableUniversities: APEC_NOTABLE_UNIVERSITIES['KR'],
  stockExchange: 'Korea Exchange KOSPI / KOSDAQ',
}
