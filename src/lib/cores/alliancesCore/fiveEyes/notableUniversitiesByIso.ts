import type { NotableUniversity } from './types'
import { FIVE_EYES_MEMBER_ISO_CODES } from './fiveEyesMemberIsoCodes'
import { AU_NOTABLE_UNIVERSITIES } from '../africanUnion/notableUniversitiesByIso'
import { APEC_NOTABLE_UNIVERSITIES } from '../APEC/notableUniversitiesByIso'
import { ASEAN_NOTABLE_UNIVERSITIES } from '../ASEAN/notableUniversitiesByIso'
import { ARAB_LEAGUE_NOTABLE_UNIVERSITIES } from '../arabLeague/notableUniversitiesByIso'

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
const FIVE_EYES_LOCAL: Partial<Record<string, Triple>> = {
  GB: [
    u('University of Oxford', 'https://www.ox.ac.uk/', 'graduate.admissions@ox.ac.uk', '', '', 'https://www.linkedin.com/school/oxforduni/'),
    u('University of Cambridge', 'https://www.cam.ac.uk/', 'admissions@cam.ac.uk', '', '', 'https://www.linkedin.com/school/university-of-cambridge/'),
    u('London School of Economics and Political Science', 'https://www.lse.ac.uk/', 'info@lse.ac.uk', 'https://www.instagram.com/londonschoolofeconomics/', 'https://x.com/LSEnews', 'https://www.linkedin.com/school/london-school-of-economics/'),
  ],
}

const LAYERS: ReadonlyArray<Partial<Record<string, Triple>>> = [
  FIVE_EYES_LOCAL,
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
  throw new Error(`fiveEyes/notableUniversitiesByIso: missing triple for ISO ${iso}`)
}

/** Three notable universities per Five Eyes economy (merged maps — informational). */
export const FIVE_EYES_NOTABLE_UNIVERSITIES = Object.fromEntries(
  FIVE_EYES_MEMBER_ISO_CODES.map((iso) => [iso, pick(iso)]),
) as Record<(typeof FIVE_EYES_MEMBER_ISO_CODES)[number], Triple>
