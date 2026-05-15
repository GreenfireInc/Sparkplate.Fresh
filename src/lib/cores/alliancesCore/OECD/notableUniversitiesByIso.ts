import type { NotableUniversity } from './types'
import { OECD_MEMBER_ISO_CODES } from './oecdMemberIsoCodes'
import { APEC_NOTABLE_UNIVERSITIES } from '../APEC/notableUniversitiesByIso'
import { EU_NOTABLE_UNIVERSITIES } from '../EU/notableUniversitiesByIso'
import { REGIONAL_NOTABLE_UNIVERSITIES_SUPPLEMENT } from '../regionalNotableUniversitiesSupplement'

type Triple = readonly [NotableUniversity, NotableUniversity, NotableUniversity]

const LAYERS: ReadonlyArray<Partial<Record<string, Triple>>> = [
  REGIONAL_NOTABLE_UNIVERSITIES_SUPPLEMENT as unknown as Partial<Record<string, Triple>>,
  EU_NOTABLE_UNIVERSITIES as unknown as Partial<Record<string, Triple>>,
  APEC_NOTABLE_UNIVERSITIES as unknown as Partial<Record<string, Triple>>,
]

function pick(iso: string): Triple {
  for (const layer of LAYERS) {
    const row = layer[iso]
    if (row) return row
  }
  throw new Error(`OECD/notableUniversitiesByIso: missing triple for ISO ${iso}`)
}

/** Three notable universities per OECD member economy (merged from shared layers — informational). */
export const OECD_NOTABLE_UNIVERSITIES = Object.fromEntries(
  OECD_MEMBER_ISO_CODES.map((iso) => [iso, pick(iso)]),
) as Record<(typeof OECD_MEMBER_ISO_CODES)[number], Triple>
