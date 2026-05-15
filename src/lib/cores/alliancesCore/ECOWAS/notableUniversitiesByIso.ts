import type { NotableUniversity } from './types'
import { ECOWAS_MEMBER_ISO_CODES } from './ecowasMemberIsoCodes'
import { AU_NOTABLE_UNIVERSITIES } from '../africanUnion/notableUniversitiesByIso'

type Triple = readonly [NotableUniversity, NotableUniversity, NotableUniversity]

const AU = AU_NOTABLE_UNIVERSITIES as Partial<Record<string, Triple>>

/** Three notable universities per ECOWAS member (sourced from AU map — informational). */
export const ECOWAS_NOTABLE_UNIVERSITIES = Object.fromEntries(
  ECOWAS_MEMBER_ISO_CODES.map((iso) => {
    const row = AU[iso]
    if (!row) throw new Error(`ECOWAS/notableUniversitiesByIso: missing AU triple for ISO ${iso}`)
    return [iso, row]
  }),
) as Record<(typeof ECOWAS_MEMBER_ISO_CODES)[number], Triple>
