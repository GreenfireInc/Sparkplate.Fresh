import type { IgadMemberIsoCode } from './igadMemberIsoCodes'
import type { MainInternationalAirport } from './types'

/**
 * Main international airport per member (capital or primary commercial gateway).
 * Informational; verify URLs, handles, and API bases before production.
 */
export const IGAD_MAIN_INTERNATIONAL_AIRPORTS: Record<IgadMemberIsoCode, MainInternationalAirport> = {
  DJ: {
    name: 'Djibouti-Ambouli International Airport (JIB)',
    website: 'https://www.aeroport-djibouti.dj/',
    email: 'contact@aeroport-djibouti.dj',
    twitter: 'https://x.com/AeroportJIB',
    instagram: 'https://www.instagram.com/aeroportdjibouti/',
    linkedin: 'https://www.linkedin.com/company/djibouti-ambouli-international-airport/',
    apiEndpoint: '',
  },
  ET: {
    name: 'Addis Ababa Bole International Airport (ADD)',
    website: 'https://www.ethiopianairlines.com/add',
    email: 'addinfo@ethiopianairlines.com',
    twitter: 'https://x.com/flyethiopian',
    instagram: 'https://www.instagram.com/flyethiopian/',
    linkedin: 'https://www.linkedin.com/company/ethiopian-airlines/',
    apiEndpoint: '',
  },
  SO: {
    name: 'Aden Adde International Airport (MGQ)',
    website: 'https://www.scaa.gov.so/',
    email: 'info@scaa.gov.so',
    twitter: 'https://x.com/SCAA_Somalia',
    instagram: 'https://www.instagram.com/scaa_somalia/',
    linkedin: 'https://www.linkedin.com/company/somalia-civil-aviation-authority/',
    apiEndpoint: '',
  },
  SS: {
    name: 'Juba International Airport (JUB)',
    website: 'https://www.sscaa.gov.ss/',
    email: 'info@sscaa.gov.ss',
    twitter: 'https://x.com/SSCAA_SouthSudan',
    instagram: 'https://www.instagram.com/sscaa_southsudan/',
    linkedin: 'https://www.linkedin.com/company/south-sudan-civil-aviation-authority/',
    apiEndpoint: '',
  },
  SD: {
    name: 'Khartoum International Airport (KRT)',
    website: 'https://www.krtairport.gov.sd/',
    email: 'info@krtairport.gov.sd',
    twitter: 'https://x.com/KRTAirport',
    instagram: 'https://www.instagram.com/krtairport/',
    linkedin: 'https://www.linkedin.com/company/khartoum-international-airport/',
    apiEndpoint: '',
  },
  KE: {
    name: 'Jomo Kenyatta International Airport (NBO)',
    website: 'https://www.kaa.go.ke/',
    email: 'info@kaa.go.ke',
    twitter: 'https://x.com/KenyaAirports',
    instagram: 'https://www.instagram.com/kenyaairports/',
    linkedin: 'https://www.linkedin.com/company/kenya-airports-authority/',
    apiEndpoint: '',
  },
  UG: {
    name: 'Entebbe International Airport (EBB)',
    website: 'https://www.caa.co.ug/',
    email: 'info@caa.co.ug',
    twitter: 'https://x.com/CAA_Uganda',
    instagram: 'https://www.instagram.com/caa_uganda/',
    linkedin: 'https://www.linkedin.com/company/civil-aviation-authority-uganda/',
    apiEndpoint: '',
  },
}
