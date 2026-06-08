import type { AmuMemberIsoCode } from './amuMemberIsoCodes'
import type { MainInternationalSeaport } from './types'

function seaport(
  name: string,
  website: string,
  email: string,
  twitter: string,
  instagram: string,
  linkedin: string,
  customsEmail: string,
  customsWebsite: string,
  customsAddress: string,
  apiEndpoint = '',
): MainInternationalSeaport {
  return {
    name,
    website,
    email,
    twitter,
    instagram,
    linkedin,
    apiEndpoint,
    customsOffice: {
      email: customsEmail,
      website: customsWebsite,
      address: customsAddress,
    },
  }
}

/**
 * Main international seaport per AMU founding member (coastal gateway or principal maritime access point).
 * Informational; verify URLs, handles, customs contacts, and API bases before production.
 * Self-contained — no imports from other alliance modules.
 */
export const AMU_MAIN_INTERNATIONAL_SEAPORTS: Record<AmuMemberIsoCode, MainInternationalSeaport> = {
  DZ: seaport(
    'Port of Algiers',
    'https://www.epal.dz/',
    'contact@epal.dz',
    'https://x.com/EPA_Alger',
    'https://www.instagram.com/epa_alger/',
    'https://www.linkedin.com/company/entreprise-portuaire-d-alger/',
    'douane@douane.gov.dz',
    'https://www.douane.gov.dz',
    'Direction Générale des Douanes — Port d\'Alger, Alger, Algeria',
  ),
  LY: seaport(
    'Port of Tripoli',
    'https://www.lpc.ly/',
    'info@lpc.ly',
    'https://x.com/LibyanPorts',
    'https://www.instagram.com/libyanports/',
    'https://www.linkedin.com/company/libyan-ports-corporation/',
    'customs@customs.gov.ly',
    'https://www.customs.gov.ly',
    'Libyan Customs Authority — Port of Tripoli, Tripoli, Libya',
  ),
  MR: seaport(
    'Port of Nouadhibou',
    'https://www.otal.com/mauritania/port-of-nouadhibou',
    'contact@portnouadhibou.mr',
    'https://x.com/PortNouadhibou',
    'https://www.instagram.com/portnouadhibou/',
    'https://www.linkedin.com/company/port-de-nouadhibou/',
    'douanes@finances.gov.mr',
    'https://www.douanes.gov.mr',
    'Direction Générale des Douanes — Port de Nouadhibou, Nouadhibou, Mauritania',
  ),
  MA: seaport(
    'Port of Tanger Med',
    'https://www.tangermed.ma/',
    'contact@tangermed.ma',
    'https://x.com/TangerMed',
    'https://www.instagram.com/tangermed/',
    'https://www.linkedin.com/company/tanger-med/',
    'douane@douane.gov.ma',
    'https://www.douane.gov.ma',
    'Administration des Douanes — Tanger Med, Tanger, Morocco',
  ),
  TN: seaport(
    'Port of Rades',
    'https://www.ommp.nat.tn/',
    'contact@ommp.nat.tn',
    'https://x.com/OMMP_Tunisia',
    'https://www.instagram.com/ommp_tunisia/',
    'https://www.linkedin.com/company/ommp-tunisia/',
    'douane@douane.gov.tn',
    'https://www.douane.gov.tn',
    'Direction Générale des Douanes — Port de Radès, Radès, Tunisia',
  ),
}
