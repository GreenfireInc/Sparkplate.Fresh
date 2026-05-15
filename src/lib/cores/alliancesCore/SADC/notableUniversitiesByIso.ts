import type { NotableUniversity } from './types'
import { SADC_MEMBER_ISO_CODES } from './sadcMemberIsoCodes'
import { AU_NOTABLE_UNIVERSITIES } from '../africanUnion/notableUniversitiesByIso'

type Triple = readonly [NotableUniversity, NotableUniversity, NotableUniversity]

const AU = AU_NOTABLE_UNIVERSITIES as unknown as Partial<Record<string, Triple>>

/** Three notable universities per SADC member (sourced from African Union map — informational). */
export const SADC_NOTABLE_UNIVERSITIES = Object.fromEntries(
  SADC_MEMBER_ISO_CODES.map((iso) => {
    const row = AU[iso]
    if (!row) throw new Error(`SADC/notableUniversitiesByIso: missing AU triple for ISO ${iso}`)
    return [iso, row]
  }),
) as Record<(typeof SADC_MEMBER_ISO_CODES)[number], Triple>
