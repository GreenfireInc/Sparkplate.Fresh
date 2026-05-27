import type { G7MemberIsoCode } from './g7MemberIsoCodes'
import type { MainInternationalAirport } from './types'

/**
 * Main international airport per member (capital or primary commercial gateway).
 * Informational; verify URLs, handles, and API bases before production.
 */
export const G7_MAIN_INTERNATIONAL_AIRPORTS: Record<G7MemberIsoCode, MainInternationalAirport> = {
  CA: {
    name: 'Toronto Pearson International Airport (YYZ)',
    website: 'https://www.torontopearson.com/',
    email: 'info@torontopearson.com',
    twitter: 'https://x.com/TorontoPearson',
    instagram: 'https://www.instagram.com/torontopearson/',
    linkedin: 'https://www.linkedin.com/company/toronto-pearson-international-airport/',
    apiEndpoint: '',
  },
  FR: {
    name: 'Paris Charles de Gaulle Airport (CDG)',
    website: 'https://www.parisaeroport.fr/',
    email: 'contact@adp.fr',
    twitter: 'https://x.com/ParisAeroport',
    instagram: 'https://www.instagram.com/parisaeroport/',
    linkedin: 'https://www.linkedin.com/company/groupe-adp/',
    apiEndpoint: '',
  },
  DE: {
    name: 'Frankfurt Airport (FRA)',
    website: 'https://www.frankfurt-airport.com/',
    email: 'info@fraport.de',
    twitter: 'https://x.com/Airport_FRA',
    instagram: 'https://www.instagram.com/airport_fra/',
    linkedin: 'https://www.linkedin.com/company/frankfurt-airport/',
    apiEndpoint: '',
  },
  IT: {
    name: 'Leonardo da Vinci–Fiumicino Airport (FCO)',
    website: 'https://www.adr.it/',
    email: 'info@adr.it',
    twitter: 'https://x.com/ADRAirports',
    instagram: 'https://www.instagram.com/adr_airports/',
    linkedin: 'https://www.linkedin.com/company/adr-aeroporti-di-roma/',
    apiEndpoint: '',
  },
  JP: {
    name: 'Tokyo Haneda Airport (HND)',
    website: 'https://www.haneda-airport.jp/',
    email: 'info@haneda-airport.jp',
    twitter: 'https://x.com/TokyoHaneda',
    instagram: 'https://www.instagram.com/tokyohaneda/',
    linkedin: 'https://www.linkedin.com/company/tokyo-international-airport/',
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
