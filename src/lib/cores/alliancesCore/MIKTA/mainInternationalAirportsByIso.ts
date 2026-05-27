import type { MiktaMemberIsoCode } from './miktaMemberIsoCodes'
import type { MainInternationalAirport } from './types'

/**
 * Main international airport per member (capital or primary commercial gateway).
 * Informational; verify URLs, handles, and API bases before production.
 */
export const MIKTA_MAIN_INTERNATIONAL_AIRPORTS: Record<MiktaMemberIsoCode, MainInternationalAirport> = {
  MX: {
    name: 'Mexico City International Airport (MEX)',
    website: 'https://www.aicm.com.mx/',
    email: 'contacto@aicm.com.mx',
    twitter: 'https://x.com/AICM_mx',
    instagram: 'https://www.instagram.com/aicm_mx/',
    linkedin: 'https://www.linkedin.com/company/aeropuerto-internacional-de-la-ciudad-de-mexico/',
    apiEndpoint: '',
  },
  ID: {
    name: 'Soekarno-Hatta International Airport (CGK)',
    website: 'https://soekarnohatta-airport.co.id/',
    email: 'info@soekarnohatta-airport.co.id',
    twitter: 'https://x.com/SoettaAirport',
    instagram: 'https://www.instagram.com/soettaairport/',
    linkedin: 'https://www.linkedin.com/company/soekarno-hatta-international-airport/',
    apiEndpoint: '',
  },
  KR: {
    name: 'Incheon International Airport (ICN)',
    website: 'https://www.airport.kr/',
    email: 'help@airport.kr',
    twitter: 'https://x.com/IncheonAirport',
    instagram: 'https://www.instagram.com/incheonairport/',
    linkedin: 'https://www.linkedin.com/company/incheon-international-airport-corporation/',
    apiEndpoint: '',
  },
  TR: {
    name: 'Istanbul Airport (IST)',
    website: 'https://www.istairport.com/',
    email: 'info@istairport.com',
    twitter: 'https://x.com/istanbulairport',
    instagram: 'https://www.instagram.com/istanbulairport/',
    linkedin: 'https://www.linkedin.com/company/istanbul-airport/',
    apiEndpoint: '',
  },
  AU: {
    name: 'Sydney Kingsford Smith Airport (SYD)',
    website: 'https://www.sydneyairport.com.au/',
    email: 'info@sydneyairport.com.au',
    twitter: 'https://x.com/SydneyAirport',
    instagram: 'https://www.instagram.com/sydneyairport/',
    linkedin: 'https://www.linkedin.com/company/sydney-airport/',
    apiEndpoint: '',
  },
}
