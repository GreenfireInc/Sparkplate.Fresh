export type { ArabLeagueCountry, ArabLeagueMembership, ArabLeagueOrganizationInfo } from './types'

import type { ArabLeagueCountry, ArabLeagueOrganizationInfo } from './types'
import { algeria } from './algeria'
import { bahrain } from './bahrain'
import { comoros } from './comoros'
import { djibouti } from './djibouti'
import { egypt } from './egypt'
import { iraq } from './iraq'
import { jordan } from './jordan'
import { kuwait } from './kuwait'
import { lebanon } from './lebanon'
import { libya } from './libya'
import { mauritania } from './mauritania'
import { morocco } from './morocco'
import { oman } from './oman'
import { palestine } from './palestine'
import { qatar } from './qatar'
import { saudiArabia } from './saudiArabia'
import { somalia } from './somalia'
import { sudan } from './sudan'
import { syria } from './syria'
import { tunisia } from './tunisia'
import { unitedArabEmirates } from './unitedArabEmirates'
import { yemen } from './yemen'

export {
  algeria,
  bahrain,
  comoros,
  djibouti,
  egypt,
  iraq,
  jordan,
  kuwait,
  lebanon,
  libya,
  mauritania,
  morocco,
  oman,
  palestine,
  qatar,
  saudiArabia,
  somalia,
  sudan,
  syria,
  tunisia,
  unitedArabEmirates,
  yemen,
}

/** League of Arab States members represented in this module (22). */
export const arabLeagueMembers: readonly ArabLeagueCountry[] = [
  algeria,
  bahrain,
  comoros,
  djibouti,
  egypt,
  iraq,
  jordan,
  kuwait,
  lebanon,
  libya,
  mauritania,
  morocco,
  oman,
  palestine,
  qatar,
  saudiArabia,
  somalia,
  sudan,
  syria,
  tunisia,
  unitedArabEmirates,
  yemen,
] as const

/**
 * The League of Arab States (Arab League) coordinates policy across the Arab world. General Secretariat:
 * Cairo. Reference data — verify for official use.
 */
export const arabLeague: ArabLeagueOrganizationInfo = {
  officialName: 'League of Arab States',
  officialNameArabic: 'جامعة الدول العربية',
  abbreviation: 'LAS',
  predecessorContext:
    'Evolved from the Alexandria Protocol (1944) toward Arab unity; Charter signed in Cairo (1945). Membership and suspensions have changed over time — informational.',
  established: {
    alexandriaProtocol: '1944-10-07 (Alexandria — preparatory conference)',
    leagueCharterCairo: '1945-03-22 (Cairo — Pact of the League of Arab States)',
  },
  headquarters: {
    city: 'Cairo',
    country: 'Egypt',
    coordinates: { latitude: 30.0444, longitude: 31.2357 },
    arrangementNotes:
      'General Secretariat of the Arab League (Tahrir / downtown Cairo area). Summit presidency rotates among member states.',
  },
  officialLanguage: 'Arabic',
  principalOrgans: [
    'Council of the League (summit — Heads of State)',
    'Council of Foreign Ministers',
    'Permanent delegations / Permanent Secretariat (Cairo)',
    'Specialized ministerial councils (economy, social, etc.)',
    'Arab League specialized organizations (e.g. ALECSO, AMA, ASCU — informational)',
    'Arab Parliament (seat: Cairo / Damascus rotation context — informational)',
  ],
  objectivesSummary: [
    'Coordinate member policies and strengthen ties between Arab states',
    'Safeguard independence and sovereignty; peaceful dispute settlement',
    'Economic, communications, cultural, nationality, and social cooperation',
    'Collective consideration of Arab affairs in regional and international forums',
  ],
  foundingMembers1945Iso2: ['EG', 'IQ', 'JO', 'LB', 'SA', 'SY', 'YE'],
  memberStatesIso2: [
    'DZ',
    'BH',
    'KM',
    'DJ',
    'EG',
    'IQ',
    'JO',
    'KW',
    'LB',
    'LY',
    'MR',
    'MA',
    'OM',
    'PS',
    'QA',
    'SA',
    'SO',
    'SD',
    'SY',
    'TN',
    'AE',
    'YE',
  ],
  memberRecordsInModule: 22,
}
