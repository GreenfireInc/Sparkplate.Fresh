export type { BricsCountry, BricsMembership, BricsOrganizationInfo } from './types'

import type { BricsCountry, BricsOrganizationInfo } from './types'
import { brazil } from './brazil'
import { china } from './china'
import { india } from './india'
import { russia } from './russia'
import { southAfrica } from './southAfrica'

export { brazil, china, india, russia, southAfrica }

/** Brazil, Russia, India, China, and South Africa as BRICS members represented in this module (5). */
export const bricsMembers: readonly BricsCountry[] = [brazil, russia, india, china, southAfrica] as const

/**
 * BRICS is an association of major emerging economies; institutional practice has evolved (including
 * expansion). Reference data — verify against official BRICS and member-state sources.
 */
export const brics: BricsOrganizationInfo = {
  officialName: 'BRICS',
  abbreviation: 'BRICS',
  predecessorContext:
    'Originated as BRIC (Brazil, Russia, India, China); South Africa joined in 2011 forming BRICS. Summits and ministerial tracks coordinate cooperation; membership and institutional details have expanded — informational.',
  established: {
    firstBricsForeignMinistersMeeting: '2006-09 (UN General Assembly — informal BRIC foreign ministers meeting, New York)',
    firstLeadersSummit: '2009-06-16 (Yekaterinburg — first BRIC Summit)',
    southAfricaJoined: '2011-04-14 (Sanya Summit — South Africa admitted as fifth member)',
  },
  headquarters: {
    city: 'Shanghai (New Development Bank)',
    country: 'China',
    coordinates: { latitude: 31.2304, longitude: 121.4737 },
    arrangementNotes:
      'BRICS has no single permanent “capital”; the annual presidency rotates among members. The New Development Bank (NDB) is headquartered in Shanghai — informational.',
  },
  principalOrgans: [
    'BRICS Summit (Heads of State and Government)',
    'BRICS national security advisors / high representatives (as convened)',
    'Ministerial tracks (foreign affairs, finance, trade, etc.)',
    'New Development Bank (NDB) and contingent reserve arrangements (where applicable — informational)',
    'Contact Group / Sherpa process (preparatory; terminology varies by year)',
  ],
  objectivesSummary: [
    'Strengthen cooperation among major emerging markets across economics, finance, and development',
    'Reform global governance institutions and amplify developing-country perspectives',
    'Promote trade, investment, and sustainable development partnerships',
    'Coordinate on multilateral platforms where members’ interests align',
  ],
  foundingMembersBric2009Iso2: ['BR', 'RU', 'IN', 'CN'],
  foundingBrics2011Iso2: ['BR', 'RU', 'IN', 'CN', 'ZA'],
  memberRecordsInModule: 5,
}
