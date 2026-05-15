import type { NotableUniversity } from './types'
import { EAC_MEMBER_ISO_CODES } from './eacMemberIsoCodes'
import { AU_NOTABLE_UNIVERSITIES } from '../africanUnion/notableUniversitiesByIso'

type Triple = readonly [NotableUniversity, NotableUniversity, NotableUniversity]

const AU = AU_NOTABLE_UNIVERSITIES as Partial<Record<string, Triple>>

/** Three notable universities per EAC economy (sourced from AU map — informational). */
export const EAC_NOTABLE_UNIVERSITIES = Object.fromEntries(
  EAC_MEMBER_ISO_CODES.map((iso) => {
    const row = AU[iso]
    if (!row) throw new Error(`EAC/notableUniversitiesByIso: missing AU triple for ISO ${iso}`)
    return [iso, row]
  }),
) as Record<(typeof EAC_MEMBER_ISO_CODES)[number], Triple>
