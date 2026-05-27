import type { MintMemberIsoCode } from './mintMemberIsoCodes'
import type { MainInternationalAirport } from './types'

/**
 * Main international airport per member (capital or primary commercial gateway).
 * Informational; verify URLs, handles, and API bases before production.
 */
export const MINT_MAIN_INTERNATIONAL_AIRPORTS: Record<MintMemberIsoCode, MainInternationalAirport> = {
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
  NG: {
    name: 'Murtala Muhammed International Airport (LOS)',
    website: 'https://www.faan.gov.ng/',
    email: 'info@faan.gov.ng',
    twitter: 'https://x.com/FAAN_Official',
    instagram: 'https://www.instagram.com/faan_official/',
    linkedin: 'https://www.linkedin.com/company/federal-airports-authority-of-nigeria/',
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
}
