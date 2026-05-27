import type { GccMemberIsoCode } from './gccMemberIsoCodes'
import type { MainInternationalAirport } from './types'

/**
 * Main international airport per member (capital or primary commercial gateway).
 * Informational; verify URLs, handles, and API bases before production.
 */
export const GCC_MAIN_INTERNATIONAL_AIRPORTS: Record<GccMemberIsoCode, MainInternationalAirport> = {
  BH: {
    name: 'Bahrain International Airport (BAH)',
    website: 'https://www.bahrainairport.com/',
    email: 'info@bahrainairport.com',
    twitter: 'https://x.com/BahrainAirport',
    instagram: 'https://www.instagram.com/bahrainairport/',
    linkedin: 'https://www.linkedin.com/company/bahrain-airport-company/',
    apiEndpoint: '',
  },
  KW: {
    name: 'Kuwait International Airport (KWI)',
    website: 'https://www.kuwait-airport.com.kw/',
    email: 'info@kuwait-airport.com.kw',
    twitter: 'https://x.com/KuwaitAirport',
    instagram: 'https://www.instagram.com/kuwaitairport/',
    linkedin: 'https://www.linkedin.com/company/kuwait-airports/',
    apiEndpoint: '',
  },
  OM: {
    name: 'Muscat International Airport (MCT)',
    website: 'https://www.muscatairport.co.om/',
    email: 'info@muscatairport.co.om',
    twitter: 'https://x.com/MuscatAirport',
    instagram: 'https://www.instagram.com/muscatairport/',
    linkedin: 'https://www.linkedin.com/company/oman-airports/',
    apiEndpoint: '',
  },
  QA: {
    name: 'Hamad International Airport (DOH)',
    website: 'https://www.dohahamadairport.com/',
    email: 'info@dohahamadairport.com',
    twitter: 'https://x.com/HIAQatar',
    instagram: 'https://www.instagram.com/hiaqatar/',
    linkedin: 'https://www.linkedin.com/company/hamad-international-airport/',
    apiEndpoint: '',
  },
  SA: {
    name: 'King Khalid International Airport (RUH)',
    website: 'https://www.riyadhairports.com/',
    email: 'info@riyadhairports.com',
    twitter: 'https://x.com/RUH_Airport',
    instagram: 'https://www.instagram.com/ruh_airport/',
    linkedin: 'https://www.linkedin.com/company/riyadh-airports-company/',
    apiEndpoint: '',
  },
  AE: {
    name: 'Zayed International Airport (AUH)',
    website: 'https://www.zayedinternationalairport.ae/',
    email: 'info@adairports.ae',
    twitter: 'https://x.com/ZayedAirport',
    instagram: 'https://www.instagram.com/zayedairport/',
    linkedin: 'https://www.linkedin.com/company/abu-dhabi-airports/',
    apiEndpoint: '',
  },
}
