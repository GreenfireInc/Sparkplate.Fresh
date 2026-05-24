import type { NotableUniversity } from './types'
import { CPTPP_MEMBER_ISO_CODES } from './cptppMemberIsoCodes'
import { APEC_NOTABLE_UNIVERSITIES } from '../APEC/notableUniversitiesByIso'
import { ASEAN_NOTABLE_UNIVERSITIES } from '../ASEAN/notableUniversitiesByIso'

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
const CPTPP_LOCAL: Partial<Record<string, Triple>> = {
  GB: [
    u('University of Oxford', 'https://www.ox.ac.uk/', 'graduate.admissions@ox.ac.uk', '', '', 'https://www.linkedin.com/school/oxforduni/'),
    u('University of Cambridge', 'https://www.cam.ac.uk/', 'admissions@cam.ac.uk', '', '', 'https://www.linkedin.com/school/university-of-cambridge/'),
    u('London School of Economics and Political Science', 'https://www.lse.ac.uk/', 'info@lse.ac.uk', 'https://www.instagram.com/londonschoolofeconomics/', 'https://x.com/LSEnews', 'https://www.linkedin.com/school/london-school-of-economics/'),
  ],
}

const LAYERS: ReadonlyArray<Partial<Record<string, Triple>>> = [
  CPTPP_LOCAL,
  APEC_NOTABLE_UNIVERSITIES as unknown as Partial<Record<string, Triple>>,
  ASEAN_NOTABLE_UNIVERSITIES as unknown as Partial<Record<string, Triple>>,
]

function pick(iso: string): Triple {
  for (const layer of LAYERS) {
    const row = layer[iso]
    if (row) return row
  }
  throw new Error(`CPTPP/notableUniversitiesByIso: missing triple for ISO ${iso}`)
}

export const CPTPP_NOTABLE_UNIVERSITIES = Object.fromEntries(
  CPTPP_MEMBER_ISO_CODES.map((iso) => [iso, pick(iso)]),
) as Record<(typeof CPTPP_MEMBER_ISO_CODES)[number], Triple>
