import type { NotableUniversity } from './types'
import { OPEC_MEMBER_ISO_CODES } from './opecMemberIsoCodes'
import { AU_NOTABLE_UNIVERSITIES } from '../africanUnion/notableUniversitiesByIso'
import { ARAB_LEAGUE_NOTABLE_UNIVERSITIES } from '../arabLeague/notableUniversitiesByIso'
import { REGIONAL_NOTABLE_UNIVERSITIES_SUPPLEMENT } from '../regionalNotableUniversitiesSupplement'

type Triple = readonly [NotableUniversity, NotableUniversity, NotableUniversity]

const LAYERS: ReadonlyArray<Partial<Record<string, Triple>>> = [
  REGIONAL_NOTABLE_UNIVERSITIES_SUPPLEMENT as unknown as Partial<Record<string, Triple>>,
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
