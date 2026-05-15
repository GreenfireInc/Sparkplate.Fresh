import type { NotableUniversity } from './types'
import { CENSAD_MEMBER_ISO_CODES } from './censadMemberIsoCodes'
import { AU_NOTABLE_UNIVERSITIES } from '../africanUnion/notableUniversitiesByIso'

type Triple = readonly [NotableUniversity, NotableUniversity, NotableUniversity]

const AU = AU_NOTABLE_UNIVERSITIES as Partial<Record<string, Triple>>

export const CENSAD_NOTABLE_UNIVERSITIES = Object.fromEntries(
  CENSAD_MEMBER_ISO_CODES.map((iso) => {
    const row = AU[iso]
    if (!row) throw new Error(`CEN-SAD/notableUniversitiesByIso: missing AU triple for ISO ${iso}`)
    return [iso, row]
  }),
) as Record<(typeof CENSAD_MEMBER_ISO_CODES)[number], Triple>
