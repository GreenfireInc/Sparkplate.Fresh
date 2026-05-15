import type { NotableUniversity } from './types'
import { CPTPP_MEMBER_ISO_CODES } from './cptppMemberIsoCodes'
import { APEC_NOTABLE_UNIVERSITIES } from '../APEC/notableUniversitiesByIso'
import { ASEAN_NOTABLE_UNIVERSITIES } from '../ASEAN/notableUniversitiesByIso'
import { REGIONAL_NOTABLE_UNIVERSITIES_SUPPLEMENT } from '../regionalNotableUniversitiesSupplement'

type Triple = readonly [NotableUniversity, NotableUniversity, NotableUniversity]

const LAYERS: ReadonlyArray<Partial<Record<string, Triple>>> = [
  REGIONAL_NOTABLE_UNIVERSITIES_SUPPLEMENT as Partial<Record<string, Triple>>,
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
