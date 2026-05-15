import type { NotableUniversity } from './types'
import { MINT_MEMBER_ISO_CODES } from './mintMemberIsoCodes'
import { AU_NOTABLE_UNIVERSITIES } from '../africanUnion/notableUniversitiesByIso'
import { APEC_NOTABLE_UNIVERSITIES } from '../APEC/notableUniversitiesByIso'
import { ASEAN_NOTABLE_UNIVERSITIES } from '../ASEAN/notableUniversitiesByIso'
import { REGIONAL_NOTABLE_UNIVERSITIES_SUPPLEMENT } from '../regionalNotableUniversitiesSupplement'

type Triple = readonly [NotableUniversity, NotableUniversity, NotableUniversity]

const LAYERS: ReadonlyArray<Partial<Record<string, Triple>>> = [
  REGIONAL_NOTABLE_UNIVERSITIES_SUPPLEMENT as Partial<Record<string, Triple>>,
  APEC_NOTABLE_UNIVERSITIES as unknown as Partial<Record<string, Triple>>,
  ASEAN_NOTABLE_UNIVERSITIES as unknown as Partial<Record<string, Triple>>,
  AU_NOTABLE_UNIVERSITIES as unknown as Partial<Record<string, Triple>>,
]

function pick(iso: string): Triple {
  for (const layer of LAYERS) {
    const row = layer[iso]
    if (row) return row
  }
  throw new Error(`MINT/notableUniversitiesByIso: missing triple for ISO ${iso}`)
}

/** Three notable universities per MINT member (merged maps — informational). */
export const MINT_NOTABLE_UNIVERSITIES = Object.fromEntries(
  MINT_MEMBER_ISO_CODES.map((iso) => [iso, pick(iso)]),
) as Record<(typeof MINT_MEMBER_ISO_CODES)[number], Triple>
