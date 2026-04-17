export type { AmuCountry, AmuMembership, AmuOrganizationInfo } from './types'

import type { AmuCountry, AmuOrganizationInfo } from './types'
import { algeria } from './algeria'
import { libya } from './libya'
import { mauritania } from './mauritania'
import { morocco } from './morocco'
import { tunisia } from './tunisia'

export { algeria, libya, mauritania, morocco, tunisia }

/** Algeria, Libya, Mauritania, Morocco, and Tunisia as AMU founding members (5). */
export const amuMembers: readonly AmuCountry[] = [algeria, libya, mauritania, morocco, tunisia] as const

/**
 * The Arab Maghreb Union (French: Union du Maghreb Arabe, UMA; Arabic: اتحاد المغرب العربي) is the
 * regional grouping of five North African states. Integration has been limited in practice; verify
 * current institutional activity against official sources.
 */
export const amu: AmuOrganizationInfo = {
  officialName: 'Arab Maghreb Union',
  officialNameFrench: 'Union du Maghreb Arabe',
  officialNameArabic: 'اتحاد المغرب العربي',
  abbreviation: 'AMU',
  abbreviationFrench: 'UMA',
  predecessorContext:
    'Founded by the Treaty of Marrakesh (1989). Political tensions (including Western Sahara) have largely frozen high-level AMU institutions since the 1990s — informational overview only.',
  established: {
    treatyOfMarrakesh: '1989-02-17 (Marrakesh — founding treaty of the Arab Maghreb Union)',
  },
  headquarters: {
    city: 'Rabat',
    country: 'Morocco',
    coordinates: { latitude: 34.0209, longitude: -6.8416 },
    arrangementNotes:
      'AMU General Secretariat located in Rabat (per founding arrangements; operational engagement has varied over time).',
  },
  workingLanguages: ['Arabic', 'French'],
  principalOrgans: [
    'Council of the Arab Maghreb Union (Heads of State — supreme body)',
    'Council of Foreign Ministers',
    'Joint Ministerial Committees (e.g. economy, interior, human resources)',
    'AMU General Secretariat',
    'Consultative Council (advisory)',
  ],
  objectivesSummary: [
    'Promote economic integration, free movement of persons, goods, services, and capital',
    'Coordinate foreign policy, security, and justice cooperation where agreed',
    'Harmonize legislation and build shared infrastructure (transport, energy, etc.)',
    'Strengthen a common Maghreb identity and joint institutions over time',
  ],
  foundingMembersIso2: ['DZ', 'LY', 'MR', 'MA', 'TN'],
  memberRecordsInModule: 5,
}
