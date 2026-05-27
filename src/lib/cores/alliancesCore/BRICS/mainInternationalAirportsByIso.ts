import type { BricsMemberIsoCode } from './bricsMemberIsoCodes'
import type { MainInternationalAirport } from './types'

/**
 * Main international airport per member (capital or primary commercial gateway).
 * Informational; verify URLs, handles, and API bases before production.
 */
export const BRICS_MAIN_INTERNATIONAL_AIRPORTS: Record<BricsMemberIsoCode, MainInternationalAirport> = {
  BR: {
    name: 'Guarulhos International Airport (GRU)',
    website: 'https://www.gru.com.br/',
    email: 'info@gru.com.br',
    twitter: 'https://x.com/AeroportoGRU',
    instagram: 'https://www.instagram.com/aeroportogru/',
    linkedin: 'https://www.linkedin.com/company/gru-airport/',
    apiEndpoint: '',
  },
  RU: {
    name: 'Sheremetyevo International Airport (SVO)',
    website: 'https://www.svo.aero/',
    email: 'info@svo.aero',
    twitter: 'https://x.com/SVO_airport',
    instagram: 'https://www.instagram.com/svo_airport/',
    linkedin: 'https://www.linkedin.com/company/sheremetyevo-international-airport/',
    apiEndpoint: '',
  },
  IN: {
    name: 'Indira Gandhi International Airport (DEL)',
    website: 'https://www.newdelhiairport.in/',
    email: 'feedback@delhiairport.com',
    twitter: 'https://x.com/DelhiAirport',
    instagram: 'https://www.instagram.com/delhiairport/',
    linkedin: 'https://www.linkedin.com/company/delhi-international-airport-limited/',
    apiEndpoint: '',
  },
  CN: {
    name: 'Beijing Capital International Airport (PEK)',
    website: 'https://www.bcia.com.cn/',
    email: 'service@bcia.com.cn',
    twitter: 'https://x.com/BeijingAirport',
    instagram: 'https://www.instagram.com/beijingairport/',
    linkedin: 'https://www.linkedin.com/company/beijing-capital-international-airport/',
    apiEndpoint: '',
  },
  ZA: {
    name: 'O.R. Tambo International Airport (JNB)',
    website: 'https://www.airports.co.za/',
    email: 'info@airports.co.za',
    twitter: 'https://x.com/Airports_ZA',
    instagram: 'https://www.instagram.com/airports_co_za/',
    linkedin: 'https://www.linkedin.com/company/airports-company-south-africa/',
    apiEndpoint: '',
  },
}
