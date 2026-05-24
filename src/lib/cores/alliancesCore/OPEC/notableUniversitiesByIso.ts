import type { NotableUniversity } from './types'
import { OPEC_MEMBER_ISO_CODES } from './opecMemberIsoCodes'
import { AU_NOTABLE_UNIVERSITIES } from '../africanUnion/notableUniversitiesByIso'
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
const OPEC_LOCAL: Partial<Record<string, Triple>> = {
  IR: [
    u('University of Tehran', 'https://ut.ac.ir/', '', '', '', ''),
    u('Sharif University of Technology', '', '', '', '', ''),
    u('Amirkabir University of Technology Tehran Polytechnic', '', '', '', '', ''),
  ],
  VE: [
    u('Universidad Central de Venezuela', 'https://www.ucv.ve/', '', '', '', ''),
    u('Universidad Sim\u00f3n Bol\u00edvar', 'https://www.usb.ve/', '', '', '', ''),
    u('Universidad Metropolitana', 'https://www.unimet.edu.ve/', '', '', '', ''),
  ],
}

const LAYERS: ReadonlyArray<Partial<Record<string, Triple>>> = [
  OPEC_LOCAL,
  ARAB_LEAGUE_NOTABLE_UNIVERSITIES as unknown as Partial<Record<string, Triple>>,
  AU_NOTABLE_UNIVERSITIES as unknown as Partial<Record<string, Triple>>,
]

function pick(iso: string): Triple {
  for (const layer of LAYERS) {
    const row = layer[iso]
    if (row) return row
  }
  throw new Error(`OPEC/notableUniversitiesByIso: missing triple for ISO ${iso}`)
}

/** Three notable universities per OPEC member (merged from shared layers — informational). */
export const OPEC_NOTABLE_UNIVERSITIES = Object.fromEntries(
  OPEC_MEMBER_ISO_CODES.map((iso) => [iso, pick(iso)]),
) as Record<(typeof OPEC_MEMBER_ISO_CODES)[number], Triple>
