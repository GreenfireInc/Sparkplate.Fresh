import type { NotableUniversity } from './types'
import { IGAD_MEMBER_ISO_CODES } from './igadMemberIsoCodes'
import { AU_NOTABLE_UNIVERSITIES } from '../africanUnion/notableUniversitiesByIso'

type Triple = readonly [NotableUniversity, NotableUniversity, NotableUniversity]

const AU = AU_NOTABLE_UNIVERSITIES as unknown as Partial<Record<string, Triple>>

/** Three notable universities per IGAD member (sourced from AU map — informational). */
export const IGAD_NOTABLE_UNIVERSITIES = Object.fromEntries(
  IGAD_MEMBER_ISO_CODES.map((iso) => {
    const row = AU[iso]
    if (!row) throw new Error(`IGAD/notableUniversitiesByIso: missing AU triple for ISO ${iso}`)
    return [iso, row]
  }),
) as Record<(typeof IGAD_MEMBER_ISO_CODES)[number], Triple>
