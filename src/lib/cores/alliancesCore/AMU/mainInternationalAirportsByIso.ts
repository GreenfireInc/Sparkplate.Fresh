import type { AmuMemberIsoCode } from './amuMemberIsoCodes'
import type { MainInternationalAirport } from './types'

/**
 * Main international airport per AMU founding member (capital or primary commercial gateway).
 * Informational; verify URLs, handles, and API bases before production.
 */
export const AMU_MAIN_INTERNATIONAL_AIRPORTS: Record<AmuMemberIsoCode, MainInternationalAirport> = {
  DZ: {
    name: 'Houari Boumediene Airport (ALG)',
    website: 'https://www.aeroportalger.dz/',
    email: 'contact@aeroportalger.dz',
    twitter: 'https://x.com/AeroportALG',
    instagram: 'https://www.instagram.com/aeroportalger/',
    linkedin: 'https://www.linkedin.com/company/egsa-alger/',
    apiEndpoint: '',
  },
  LY: {
    name: 'Mitiga International Airport (MJI)',
    website: 'https://www.lycaa.gov.ly/',
    email: 'info@lycaa.gov.ly',
    twitter: 'https://x.com/LYCAA_Libya',
    instagram: 'https://www.instagram.com/lycaa_libya/',
    linkedin: 'https://www.linkedin.com/company/libyan-civil-aviation-authority/',
    apiEndpoint: '',
  },
  MR: {
    name: 'Nouakchott-Oumtounsy International Airport (NKC)',
    website: 'https://www.anac.mr/',
    email: 'contact@anac.mr',
    twitter: 'https://x.com/ANAC_Mauritanie',
    instagram: 'https://www.instagram.com/anac_mauritanie/',
    linkedin: 'https://www.linkedin.com/company/anac-mauritanie/',
    apiEndpoint: '',
  },
  MA: {
    name: 'Mohammed V International Airport (CMN)',
    website: 'https://www.onda.ma/en',
    email: 'contact@onda.ma',
    twitter: 'https://x.com/ONDA_MAROC',
    instagram: 'https://www.instagram.com/onda_maroc/',
    linkedin: 'https://www.linkedin.com/company/onda-officiel/',
    apiEndpoint: '',
  },
  TN: {
    name: 'Tunis-Carthage International Airport (TUN)',
    website: 'https://www.oaca.nat.tn/',
    email: 'contact@oaca.nat.tn',
    twitter: 'https://x.com/OACA_Tunisia',
    instagram: 'https://www.instagram.com/oaca_tunisia/',
    linkedin: 'https://www.linkedin.com/company/office-de-l-aviation-civile-et-des-aeroports-oaca/',
    apiEndpoint: '',
  },
}
