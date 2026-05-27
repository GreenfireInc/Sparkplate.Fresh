import type { FiveEyesMemberIsoCode } from './fiveEyesMemberIsoCodes'
import type { MainInternationalAirport } from './types'

/**
 * Main international airport per member (capital or primary commercial gateway).
 * Informational; verify URLs, handles, and API bases before production.
 */
export const FIVE_EYES_MAIN_INTERNATIONAL_AIRPORTS: Record<FiveEyesMemberIsoCode, MainInternationalAirport> = {
  AU: {
    name: 'Sydney Kingsford Smith Airport (SYD)',
    website: 'https://www.sydneyairport.com.au/',
    email: 'info@sydneyairport.com.au',
    twitter: 'https://x.com/SydneyAirport',
    instagram: 'https://www.instagram.com/sydneyairport/',
    linkedin: 'https://www.linkedin.com/company/sydney-airport/',
    apiEndpoint: '',
  },
  CA: {
    name: 'Toronto Pearson International Airport (YYZ)',
    website: 'https://www.torontopearson.com/',
    email: 'info@torontopearson.com',
    twitter: 'https://x.com/TorontoPearson',
    instagram: 'https://www.instagram.com/torontopearson/',
    linkedin: 'https://www.linkedin.com/company/toronto-pearson-international-airport/',
    apiEndpoint: '',
  },
  NZ: {
    name: 'Auckland Airport (AKL)',
    website: 'https://www.aucklandairport.co.nz/',
    email: 'info@aucklandairport.co.nz',
    twitter: 'https://x.com/AucklandAirport',
    instagram: 'https://www.instagram.com/aucklandairport/',
    linkedin: 'https://www.linkedin.com/company/auckland-airport/',
    apiEndpoint: '',
  },
  GB: {
    name: 'Heathrow Airport (LHR)',
    website: 'https://www.heathrow.com/',
    email: 'customer.service@heathrow.com',
    twitter: 'https://x.com/HeathrowAirport',
    instagram: 'https://www.instagram.com/heathrowairport/',
    linkedin: 'https://www.linkedin.com/company/heathrow-airport/',
    apiEndpoint: '',
  },
  US: {
    name: 'Los Angeles International Airport (LAX)',
    website: 'https://www.flylax.com/',
    email: 'info@lawa.org',
    twitter: 'https://x.com/flyLAXairport',
    instagram: 'https://www.instagram.com/flylax/',
    linkedin: 'https://www.linkedin.com/company/los-angeles-world-airports/',
    apiEndpoint: '',
  },
}
