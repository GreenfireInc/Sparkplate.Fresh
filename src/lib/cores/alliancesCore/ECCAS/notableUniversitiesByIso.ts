import type { NotableUniversity } from './types'
import { ECCAS_MEMBER_ISO_CODES } from './eccasMemberIsoCodes'
import { AU_NOTABLE_UNIVERSITIES } from '../africanUnion/notableUniversitiesByIso'

type Triple = readonly [NotableUniversity, NotableUniversity, NotableUniversity]

const AU = AU_NOTABLE_UNIVERSITIES as Partial<Record<string, Triple>>

/** Three notable universities per ECCAS member (sourced from AU map — informational). */
export const ECCAS_NOTABLE_UNIVERSITIES = Object.fromEntries(
  ECCAS_MEMBER_ISO_CODES.map((iso) => {
    const row = AU[iso]
    if (!row) throw new Error(`ECCAS/notableUniversitiesByIso: missing AU triple for ISO ${iso}`)
    return [iso, row]
  }),
) as Record<(typeof ECCAS_MEMBER_ISO_CODES)[number], Triple>
