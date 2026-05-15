import type { NotableUniversity } from './types'
import { COMESA_MEMBER_ISO_CODES } from './comesaMemberIsoCodes'
import { AU_NOTABLE_UNIVERSITIES } from '../africanUnion/notableUniversitiesByIso'

type Triple = readonly [NotableUniversity, NotableUniversity, NotableUniversity]

const AU = AU_NOTABLE_UNIVERSITIES as Partial<Record<string, Triple>>

export const COMESA_NOTABLE_UNIVERSITIES = Object.fromEntries(
  COMESA_MEMBER_ISO_CODES.map((iso) => {
    const row = AU[iso]
    if (!row) throw new Error(`COMESA/notableUniversitiesByIso: missing AU triple for ISO ${iso}`)
    return [iso, row]
  }),
) as Record<(typeof COMESA_MEMBER_ISO_CODES)[number], Triple>
