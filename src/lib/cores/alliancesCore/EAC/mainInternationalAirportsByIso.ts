import type { EacMemberIsoCode } from './eacMemberIsoCodes'
import type { MainInternationalAirport } from './types'

/**
 * Main international airport per member (capital or primary commercial gateway).
 * Informational; verify URLs, handles, and API bases before production.
 */
export const EAC_MAIN_INTERNATIONAL_AIRPORTS: Record<EacMemberIsoCode, MainInternationalAirport> = {
  BI: {
    name: 'Melchior Ndadaye International Airport (BJM)',
    website: 'https://www.aeroport-bujumbura.bi/',
    email: 'info@aeroport-bujumbura.bi',
    twitter: 'https://x.com/AeroportBJM',
    instagram: 'https://www.instagram.com/aeroportbujumbura/',
    linkedin: 'https://www.linkedin.com/company/aeroport-international-bujumbura/',
    apiEndpoint: '',
  },
  CD: {
    name: 'N\'djili International Airport (FIH)',
    website: 'https://www.rva-rdc.cd/',
    email: 'contact@rva-rdc.cd',
    twitter: 'https://x.com/RVA_RDC',
    instagram: 'https://www.instagram.com/rva_rdc/',
    linkedin: 'https://www.linkedin.com/company/regie-des-voies-aeriennes-rva/',
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
  RW: {
    name: 'Kigali International Airport (KGL)',
    website: 'https://www.rcaa.gov.rw/',
    email: 'info@rcaa.gov.rw',
    twitter: 'https://x.com/RCAA_Rwanda',
    instagram: 'https://www.instagram.com/rcaa_rwanda/',
    linkedin: 'https://www.linkedin.com/company/rwanda-civil-aviation-authority/',
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
  TZ: {
    name: 'Julius Nyerere International Airport (DAR)',
    website: 'https://www.taa.go.tz/',
    email: 'info@taa.go.tz',
    twitter: 'https://x.com/TAA_Tanzania',
    instagram: 'https://www.instagram.com/taa_tanzania/',
    linkedin: 'https://www.linkedin.com/company/tanzania-airports-authority/',
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
