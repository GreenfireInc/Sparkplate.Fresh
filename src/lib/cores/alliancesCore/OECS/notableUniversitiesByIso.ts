import type { NotableUniversity } from './types'
import { OECS_MEMBER_ISO_CODES } from './oecsMemberIsoCodes'
import { REGIONAL_NOTABLE_UNIVERSITIES_SUPPLEMENT } from '../regionalNotableUniversitiesSupplement'

type Triple = readonly [NotableUniversity, NotableUniversity, NotableUniversity]

const REGIONAL = REGIONAL_NOTABLE_UNIVERSITIES_SUPPLEMENT as unknown as Partial<Record<string, Triple>>

/** Three notable universities per OECS member (sourced from cross-bloc Caribbean supplement — informational). */
export const OECS_NOTABLE_UNIVERSITIES = Object.fromEntries(
  OECS_MEMBER_ISO_CODES.map((iso) => {
    const row = REGIONAL[iso]
    if (!row) throw new Error(`OECS/notableUniversitiesByIso: missing regional triple for ISO ${iso}`)
    return [iso, row]
  }),
) as Record<(typeof OECS_MEMBER_ISO_CODES)[number], Triple>
