import type { NotableUniversity } from './types'
import { BRICS_MEMBER_ISO_CODES } from './bricsMemberIsoCodes'
import { AU_NOTABLE_UNIVERSITIES } from '../africanUnion/notableUniversitiesByIso'
import { APEC_NOTABLE_UNIVERSITIES } from '../APEC/notableUniversitiesByIso'
import { REGIONAL_NOTABLE_UNIVERSITIES_SUPPLEMENT } from '../regionalNotableUniversitiesSupplement'

type Triple = readonly [NotableUniversity, NotableUniversity, NotableUniversity]

const LAYERS: ReadonlyArray<Partial<Record<string, Triple>>> = [
  REGIONAL_NOTABLE_UNIVERSITIES_SUPPLEMENT as Partial<Record<string, Triple>>,
  APEC_NOTABLE_UNIVERSITIES as unknown as Partial<Record<string, Triple>>,
  AU_NOTABLE_UNIVERSITIES as unknown as Partial<Record<string, Triple>>,
]

function pick(iso: string): Triple {
  for (const layer of LAYERS) {
    const row = layer[iso]
    if (row) return row
  }
  throw new Error(`BRICS/notableUniversitiesByIso: missing triple for ISO ${iso}`)
}

export const BRICS_NOTABLE_UNIVERSITIES = Object.fromEntries(
  BRICS_MEMBER_ISO_CODES.map((iso) => [iso, pick(iso)]),
) as Record<(typeof BRICS_MEMBER_ISO_CODES)[number], Triple>
