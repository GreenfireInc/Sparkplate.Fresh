export type {
  AllianceOfSahelStatesCountry,
  AllianceOfSahelStatesMembership,
  AllianceOfSahelStatesOrganizationInfo,
} from './types'

import type { AllianceOfSahelStatesCountry, AllianceOfSahelStatesOrganizationInfo } from './types'
import { burkinaFaso } from './burkinaFaso'
import { mali } from './mali'
import { niger } from './niger'

export { burkinaFaso, mali, niger }

/** Mali, Niger, and Burkina Faso as founding members of the Alliance of Sahel States (3). */
export const allianceOfSahelStatesMembers: readonly AllianceOfSahelStatesCountry[] = [
  mali,
  niger,
  burkinaFaso,
] as const

/**
 * The Alliance of Sahel States (French: Alliance des États du Sahel, AES) groups Burkina Faso, Mali,
 * and Niger in closer political, security, and economic cooperation (including confederation steps).
 * Institutional details evolve — verify against official communiqués.
 */
export const allianceOfSahelStates: AllianceOfSahelStatesOrganizationInfo = {
  officialName: 'Alliance of Sahel States',
  officialNameFrench: 'Alliance des États du Sahel',
  abbreviation: 'AES',
  predecessorContext:
    'Evolved from the Liptako–Gourma mutual defense pact (2023); confederation treaty signed in Niamey (2024). ECOWAS withdrawal context (2024–2025, informational).',
  established: {
    allianceDefensePact: '2023-09-16 (Liptako–Gourma Charter — Alliance of Sahel States mutual defense, Bamako)',
    confederationTreaty: '2024-07-06 (Niamey — confederation treaty and first joint AES summit)',
  },
  headquarters: {
    city: 'Niamey',
    country: 'Niger',
    coordinates: { latitude: 13.5127, longitude: 2.1254 },
    arrangementNotes:
      'No single permanent secretariat like the AU Commission; leadership and hosting rotate among the three capitals (informational).',
  },
  workingLanguages: ['French'],
  principalOrgans: [
    'Conference of Heads of State (supreme body)',
    'Defence and Security structures (joint Sahel efforts; informational)',
    'Economic and development cooperation tracks (monetary union aspirations over time)',
    'Permanent coordination / technical committees (per summit decisions — evolving)',
  ],
  objectivesSummary: [
    'Deepen mutual defence, security, and stability cooperation in the Sahel',
    'Strengthen economic integration and shared infrastructure where feasible',
    'Assert collective political positioning and south–south cooperation',
    'Coordinate institutional evolution (including confederation-level integration goals)',
  ],
  foundingMembersIso2: ['ML', 'NE', 'BF'],
  memberRecordsInModule: 3,
}
