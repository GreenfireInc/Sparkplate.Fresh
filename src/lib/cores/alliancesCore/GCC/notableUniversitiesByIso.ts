import type { NotableUniversity } from './types'
import { GCC_MEMBER_ISO_CODES } from './gccMemberIsoCodes'
import { ARAB_LEAGUE_NOTABLE_UNIVERSITIES } from '../arabLeague/notableUniversitiesByIso'

type Triple = readonly [NotableUniversity, NotableUniversity, NotableUniversity]

const ARAB = ARAB_LEAGUE_NOTABLE_UNIVERSITIES as Partial<Record<string, Triple>>

/** Three notable universities per GCC member (sourced from Arab League map — informational). */
export const GCC_NOTABLE_UNIVERSITIES = Object.fromEntries(
  GCC_MEMBER_ISO_CODES.map((iso) => {
    const row = ARAB[iso]
    if (!row) throw new Error(`GCC/notableUniversitiesByIso: missing Arab League triple for ISO ${iso}`)
    return [iso, row]
  }),
) as Record<(typeof GCC_MEMBER_ISO_CODES)[number], Triple>
