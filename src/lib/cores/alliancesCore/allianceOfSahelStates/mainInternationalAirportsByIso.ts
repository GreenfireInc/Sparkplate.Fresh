import type { AesMemberIsoCode } from './aesMemberIsoCodes'
import type { MainInternationalAirport } from './types'

/**
 * Main international airport per AES founding member (capital or primary commercial gateway).
 * Informational; verify URLs, handles, and API bases before production.
 */
export const AES_MAIN_INTERNATIONAL_AIRPORTS: Record<AesMemberIsoCode, MainInternationalAirport> = {
  BF: {
    name: 'Thomas Sankara International Airport Ouagadougou (OUA)',
    website: 'https://www.aeroport-ouagadougou.bf/',
    email: 'contact@aeroport-ouagadougou.bf',
    twitter: 'https://x.com/AIB_OUA',
    instagram: 'https://www.instagram.com/aib_ouagadougou/',
    linkedin: 'https://www.linkedin.com/company/aeroport-international-bobo-dioulasso/',
    apiEndpoint: '',
  },
  ML: {
    name: 'Modibo Keita International Airport (BKO)',
    website: 'https://www.aeroport-bamako.ml/',
    email: 'contact@aeroport-bamako.ml',
    twitter: 'https://x.com/AeroportBKO',
    instagram: 'https://www.instagram.com/aeroportbamako/',
    linkedin: 'https://www.linkedin.com/company/aeroport-modibo-keita/',
    apiEndpoint: '',
  },
  NE: {
    name: 'Diori Hamani International Airport (NIM)',
    website: 'https://www.anac.ne/',
    email: 'contact@anac.ne',
    twitter: 'https://x.com/ANAC_Niger',
    instagram: 'https://www.instagram.com/anac_niger/',
    linkedin: 'https://www.linkedin.com/company/anac-niger/',
    apiEndpoint: '',
  },
}
