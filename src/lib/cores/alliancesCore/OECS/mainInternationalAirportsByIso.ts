import type { OecsMemberIsoCode } from './oecsMemberIsoCodes'
import type { MainInternationalAirport } from './types'

/**
 * Main international airport per member (capital or primary commercial gateway).
 * Informational; verify URLs, handles, and API bases before production.
 */
export const OECS_MAIN_INTERNATIONAL_AIRPORTS: Record<OecsMemberIsoCode, MainInternationalAirport> = {
  AG: {
    name: 'V.C. Bird International Airport (ANU)',
    website: 'https://www.antigua-barbuda.com/',
    email: 'info@ab.gov.ag',
    twitter: 'https://x.com/AntiguaAirport',
    instagram: 'https://www.instagram.com/antiguaairport/',
    linkedin: 'https://www.linkedin.com/company/vc-bird-international-airport/',
    apiEndpoint: '',
  },
  DM: {
    name: 'Douglas-Charles Airport (DOM)',
    website: 'https://www.dominicaairport.com/',
    email: 'info@dominicaairport.com',
    twitter: 'https://x.com/DominicaAirport',
    instagram: 'https://www.instagram.com/dominicaairport/',
    linkedin: 'https://www.linkedin.com/company/douglas-charles-airport/',
    apiEndpoint: '',
  },
  GD: {
    name: 'Maurice Bishop International Airport (GND)',
    website: 'https://www.grenadaairports.com/',
    email: 'info@grenadaairports.com',
    twitter: 'https://x.com/GrenadaAirport',
    instagram: 'https://www.instagram.com/grenadaairport/',
    linkedin: 'https://www.linkedin.com/company/maurice-bishop-international-airport/',
    apiEndpoint: '',
  },
  MS: {
    name: 'John A. Osborne Airport (MNI)',
    website: 'https://www.flymontserrat.com/',
    email: 'info@flymontserrat.com',
    twitter: 'https://x.com/FlyMontserrat',
    instagram: 'https://www.instagram.com/flymontserrat/',
    linkedin: 'https://www.linkedin.com/company/john-a-osborne-airport/',
    apiEndpoint: '',
  },
  KN: {
    name: 'Robert L. Bradshaw International Airport (SKB)',
    website: 'https://www.stkittsskeairs.com/',
    email: 'info@stkittsskeairs.com',
    twitter: 'https://x.com/SKB_Airport',
    instagram: 'https://www.instagram.com/skb_airport/',
    linkedin: 'https://www.linkedin.com/company/robert-l-bradshaw-international-airport/',
    apiEndpoint: '',
  },
  LC: {
    name: 'Hewanorra International Airport (UVF)',
    website: 'https://www.slusha.com/',
    email: 'info@slusha.com',
    twitter: 'https://x.com/UVF_Airport',
    instagram: 'https://www.instagram.com/uvf_airport/',
    linkedin: 'https://www.linkedin.com/company/hewanorra-international-airport/',
    apiEndpoint: '',
  },
  VC: {
    name: 'Argyle International Airport (SVD)',
    website: 'https://www.svgairport.com/',
    email: 'info@svgairport.com',
    twitter: 'https://x.com/SVGAirport',
    instagram: 'https://www.instagram.com/svgairport/',
    linkedin: 'https://www.linkedin.com/company/argyle-international-airport/',
    apiEndpoint: '',
  },
  AI: {
    name: 'Clayton J. Lloyd International Airport (AXA)',
    website: 'https://www.anguilla-airways.com/',
    email: 'info@anguilla-airways.com',
    twitter: 'https://x.com/AnguillaAirport',
    instagram: 'https://www.instagram.com/anguillaairport/',
    linkedin: 'https://www.linkedin.com/company/clayton-j-lloyd-international-airport/',
    apiEndpoint: '',
  },
}
