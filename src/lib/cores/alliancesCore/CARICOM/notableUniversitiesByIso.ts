import type { NotableUniversity } from './types'
import { CARICOM_MEMBER_ISO_CODES } from './caricomMemberIsoCodes'
import { REGIONAL_NOTABLE_UNIVERSITIES_SUPPLEMENT } from '../regionalNotableUniversitiesSupplement'

type Triple = readonly [NotableUniversity, NotableUniversity, NotableUniversity]

/** CARICOM territories use the adjunct rows captured in {@link REGIONAL_NOTABLE_UNIVERSITIES_SUPPLEMENT}. */
export const CARICOM_NOTABLE_UNIVERSITIES = Object.fromEntries(
  CARICOM_MEMBER_ISO_CODES.map((iso) => {
    const row = (REGIONAL_NOTABLE_UNIVERSITIES_SUPPLEMENT as Partial<Record<string, Triple>>)[iso]
    if (!row) {
      throw new Error(`CARICOM/notableUniversitiesByIso: missing regional supplement triple for ISO ${iso}`)
    }
    return [iso, row]
  }),
) as Record<(typeof CARICOM_MEMBER_ISO_CODES)[number], Triple>
