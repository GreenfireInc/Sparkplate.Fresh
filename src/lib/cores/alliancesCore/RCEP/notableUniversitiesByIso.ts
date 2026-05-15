import type { NotableUniversity } from './types'
import { RCEP_MEMBER_ISO_CODES } from './rcepMemberIsoCodes'
import { APEC_NOTABLE_UNIVERSITIES } from '../APEC/notableUniversitiesByIso'
import { ASEAN_NOTABLE_UNIVERSITIES } from '../ASEAN/notableUniversitiesByIso'
import { REGIONAL_NOTABLE_UNIVERSITIES_SUPPLEMENT } from '../regionalNotableUniversitiesSupplement'

type Triple = readonly [NotableUniversity, NotableUniversity, NotableUniversity]

const LAYERS: ReadonlyArray<Partial<Record<string, Triple>>> = [
  REGIONAL_NOTABLE_UNIVERSITIES_SUPPLEMENT as unknown as Partial<Record<string, Triple>>,
  APEC_NOTABLE_UNIVERSITIES as unknown as Partial<Record<string, Triple>>,
  ASEAN_NOTABLE_UNIVERSITIES as unknown as Partial<Record<string, Triple>>,
]

function pick(iso: string): Triple {
  for (const layer of LAYERS) {
    const row = layer[iso]
    if (row) return row
  }
  throw new Error(`RCEP/notableUniversitiesByIso: missing triple for ISO ${iso}`)
}

/** Three notable universities per RCEP party (merged from shared layers — informational). */
export const RCEP_NOTABLE_UNIVERSITIES = Object.fromEntries(
  RCEP_MEMBER_ISO_CODES.map((iso) => [iso, pick(iso)]),
) as Record<(typeof RCEP_MEMBER_ISO_CODES)[number], Triple>
