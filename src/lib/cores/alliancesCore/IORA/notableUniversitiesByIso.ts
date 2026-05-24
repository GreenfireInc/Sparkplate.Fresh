import type { NotableUniversity } from './types'
import { IORA_MEMBER_ISO_CODES } from './ioraMemberIsoCodes'
import { AU_NOTABLE_UNIVERSITIES } from '../africanUnion/notableUniversitiesByIso'
import { APEC_NOTABLE_UNIVERSITIES } from '../APEC/notableUniversitiesByIso'
import { ASEAN_NOTABLE_UNIVERSITIES } from '../ASEAN/notableUniversitiesByIso'
import { ARAB_LEAGUE_NOTABLE_UNIVERSITIES } from '../arabLeague/notableUniversitiesByIso'
import { EU_NOTABLE_UNIVERSITIES } from '../EU/notableUniversitiesByIso'

function u(
  name: string,
  website: string,
  email: string,
  instagram: string,
  twitter: string,
  linkedin: string,
): NotableUniversity {
  return { name, website, email, instagram, twitter, linkedin }
}

type Triple = readonly [NotableUniversity, NotableUniversity, NotableUniversity]

/** Member-specific notable universities not covered by other layer maps. */
const IORA_LOCAL: Partial<Record<string, Triple>> = {
  BD: [
    u('University of Dhaka', 'https://du.ac.bd/', '', '', '', ''),
    u('Bangladesh University of Engineering and Technology BUET', 'https://www.buet.ac.bd/', '', '', '', ''),
    u('BRAC University', 'https://www.bracu.ac.bd/', '', '', '', ''),
  ],
  IN: [
    u('Indian Institute of Technology Bombay', 'https://www.iitb.ac.in/', '', '', '', 'https://www.linkedin.com/school/indian-institute-of-technology-bombay/'),
    u('Indian Institute of Science Bangalore', 'https://iisc.ac.in/', '', '', '', 'https://www.linkedin.com/school/indian-institute-of-science/'),
    u('University of Delhi', 'https://www.du.ac.in/', '', '', '', 'https://www.linkedin.com/school/university-of-delhi/'),
  ],
  IR: [
    u('University of Tehran', 'https://ut.ac.ir/', '', '', '', ''),
    u('Sharif University of Technology', '', '', '', '', ''),
    u('Amirkabir University of Technology Tehran Polytechnic', '', '', '', '', ''),
  ],
  LK: [
    u('University of Colombo', 'https://cmb.ac.lk/', '', '', '', ''),
    u('University of Moratuwa', 'https://uom.lk/', '', '', '', ''),
    u('University of Peradeniya', '', '', '', '', ''),
  ],
  MV: [
    u('Maldives National University', 'https://www.mnu.edu.mv/', '', '', '', ''),
    u('Cyryx College business / computing adjunct', '', '', '', '', ''),
    u('Regional hospitality finance certificate institutes', '', '', '', '', ''),
  ],
}

/** Layer order — earlier wins (regional specifics override broad AU adjunct rows). */
const LAYERS: ReadonlyArray<Partial<Record<string, Triple>>> = [
  IORA_LOCAL,
  EU_NOTABLE_UNIVERSITIES as unknown as Partial<Record<string, Triple>>,
  APEC_NOTABLE_UNIVERSITIES as unknown as Partial<Record<string, Triple>>,
  ASEAN_NOTABLE_UNIVERSITIES as unknown as Partial<Record<string, Triple>>,
  ARAB_LEAGUE_NOTABLE_UNIVERSITIES as unknown as Partial<Record<string, Triple>>,
  AU_NOTABLE_UNIVERSITIES as unknown as Partial<Record<string, Triple>>,
]

function pick(iso: string): Triple {
  for (const layer of LAYERS) {
    const row = layer[iso]
    if (row) return row
  }
  throw new Error(`IORA/notableUniversitiesByIso: missing triple for ISO ${iso}`)
}

/** Three notable universities per IORA member (merged maps — informational). */
export const IORA_NOTABLE_UNIVERSITIES = Object.fromEntries(
  IORA_MEMBER_ISO_CODES.map((iso) => [iso, pick(iso)]),
) as Record<(typeof IORA_MEMBER_ISO_CODES)[number], Triple>
