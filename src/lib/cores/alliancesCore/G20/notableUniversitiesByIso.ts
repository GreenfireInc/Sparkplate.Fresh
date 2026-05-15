import type { NotableUniversity } from './types'
import { G20_SOVEREIGN_MEMBER_ISO_CODES } from './g20MemberIsoCodes'
import { AU_NOTABLE_UNIVERSITIES } from '../africanUnion/notableUniversitiesByIso'
import { APEC_NOTABLE_UNIVERSITIES } from '../APEC/notableUniversitiesByIso'
import { ASEAN_NOTABLE_UNIVERSITIES } from '../ASEAN/notableUniversitiesByIso'
import { ARAB_LEAGUE_NOTABLE_UNIVERSITIES } from '../arabLeague/notableUniversitiesByIso'
import { EU_NOTABLE_UNIVERSITIES } from '../EU/notableUniversitiesByIso'
import { REGIONAL_NOTABLE_UNIVERSITIES_SUPPLEMENT } from '../regionalNotableUniversitiesSupplement'

type Triple = readonly [NotableUniversity, NotableUniversity, NotableUniversity]

const LAYERS: ReadonlyArray<Partial<Record<string, Triple>>> = [
  REGIONAL_NOTABLE_UNIVERSITIES_SUPPLEMENT as Partial<Record<string, Triple>>,
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
  throw new Error(`G20/notableUniversitiesByIso: missing triple for sovereign ISO ${iso}`)
}

/** Three notable universities per G20 sovereign member (merged maps — informational). */
export const G20_NOTABLE_UNIVERSITIES = Object.fromEntries(
  G20_SOVEREIGN_MEMBER_ISO_CODES.map((iso) => [iso, pick(iso)]),
) as Record<(typeof G20_SOVEREIGN_MEMBER_ISO_CODES)[number], Triple>

/**
 * Three notable universities per G20 institutional seat, sourced from each body's HQ economy
 * (EU → Brussels / Belgium triple; African Union → Addis Ababa / Ethiopia triple) — informational.
 */
export const G20_INSTITUTIONAL_NOTABLE_UNIVERSITIES = {
  EU: EU_NOTABLE_UNIVERSITIES['BE'] as Triple,
  AFRICAN_UNION: AU_NOTABLE_UNIVERSITIES['ET'] as unknown as Triple,
} as const
