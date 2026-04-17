export type { CommonwealthCountry, CommonwealthMembership, BritishCommonwealthOrganizationInfo } from './types'

import type { CommonwealthCountry, BritishCommonwealthOrganizationInfo } from './types'
import { antiguaAndBarbuda } from './antiguaAndBarbuda'
import { australia } from './australia'
import { bahamas } from './bahamas'
import { bangladesh } from './bangladesh'
import { barbados } from './barbados'
import { belize } from './belize'
import { botswana } from './botswana'
import { brunei } from './brunei'
import { cameroon } from './cameroon'
import { canada } from './canada'
import { cyprus } from './cyprus'
import { dominica } from './dominica'
import { eswatini } from './eswatini'
import { fiji } from './fiji'
import { gabon } from './gabon'
import { gambia } from './gambia'
import { ghana } from './ghana'
import { grenada } from './grenada'
import { guyana } from './guyana'
import { india } from './india'
import { jamaica } from './jamaica'
import { kenya } from './kenya'
import { kiribati } from './kiribati'
import { lesotho } from './lesotho'
import { malawi } from './malawi'
import { malaysia } from './malaysia'
import { maldives } from './maldives'
import { malta } from './malta'
import { mauritius } from './mauritius'
import { mozambique } from './mozambique'
import { namibia } from './namibia'
import { nauru } from './nauru'
import { newZealand } from './newZealand'
import { nigeria } from './nigeria'
import { pakistan } from './pakistan'
import { papuaNewGuinea } from './papuaNewGuinea'
import { rwanda } from './rwanda'
import { saintKittsAndNevis } from './saintKittsAndNevis'
import { saintLucia } from './saintLucia'
import { saintVincentAndTheGrenadines } from './saintVincentAndTheGrenadines'
import { samoa } from './samoa'
import { seychelles } from './seychelles'
import { sierraLeone } from './sierraLeone'
import { singapore } from './singapore'
import { solomonIslands } from './solomonIslands'
import { southAfrica } from './southAfrica'
import { sriLanka } from './sriLanka'
import { tanzania } from './tanzania'
import { togo } from './togo'
import { tonga } from './tonga'
import { trinidadAndTobago } from './trinidadAndTobago'
import { tuvalu } from './tuvalu'
import { uganda } from './uganda'
import { unitedKingdom } from './unitedKingdom'
import { vanuatu } from './vanuatu'
import { zambia } from './zambia'

export { antiguaAndBarbuda, australia, bahamas, bangladesh, barbados, belize, botswana, brunei, cameroon, canada, cyprus, dominica, eswatini, fiji, gabon, gambia, ghana, grenada, guyana, india, jamaica, kenya, kiribati, lesotho, malawi, malaysia, maldives, malta, mauritius, mozambique, namibia, nauru, newZealand, nigeria, pakistan, papuaNewGuinea, rwanda, saintKittsAndNevis, saintLucia, saintVincentAndTheGrenadines, samoa, seychelles, sierraLeone, singapore, solomonIslands, southAfrica, sriLanka, tanzania, togo, tonga, trinidadAndTobago, tuvalu, uganda, unitedKingdom, vanuatu, zambia }

/** Commonwealth members represented in this module (56). */
export const britishCommonwealthMembers: readonly CommonwealthCountry[] = [antiguaAndBarbuda, australia, bahamas, bangladesh, barbados, belize, botswana, brunei, cameroon, canada, cyprus, dominica, eswatini, fiji, gabon, gambia, ghana, grenada, guyana, india, jamaica, kenya, kiribati, lesotho, malawi, malaysia, maldives, malta, mauritius, mozambique, namibia, nauru, newZealand, nigeria, pakistan, papuaNewGuinea, rwanda, saintKittsAndNevis, saintLucia, saintVincentAndTheGrenadines, samoa, seychelles, sierraLeone, singapore, solomonIslands, southAfrica, sriLanka, tanzania, togo, tonga, trinidadAndTobago, tuvalu, uganda, unitedKingdom, vanuatu, zambia] as const

/**
 * The Commonwealth of Nations is a political association of former British Empire and aligned states.
 * Reference data — verify against the Commonwealth Secretariat and member governments.
 */
export const britishCommonwealth: BritishCommonwealthOrganizationInfo = {
  officialName: 'Commonwealth of Nations',
  abbreviation: 'Commonwealth',
  predecessorContext:
    'Evolved from the British Empire through independence and constitutional evolution; the modern association is voluntary and consensus-based. Membership and criteria have changed over time (e.g. Harare principles, Latimer House, CHOGM communiqués) — informational.',
  established: {
    londonDeclaration: '1949-04-26 (London Declaration — India as republic within Commonwealth)',
    modernCharterContext: '2012 Commonwealth Charter (values: democracy, human rights, rule of law, etc.) — verify current texts',
  },
  headquarters: {
    city: 'London',
    country: 'United Kingdom',
    coordinates: { latitude: 51.5074, longitude: -0.1278 },
    arrangementNotes:
      'Commonwealth Secretariat at Marlborough House, Pall Mall. The Head of the Commonwealth is a symbolic role; the Secretary-General leads the Secretariat — informational.',
  },
  headOfTheCommonwealth: 'Charles III (as Head of the Commonwealth — ceremonial; verify official style)',
  principalOrgans: [
    'Commonwealth Heads of Government Meeting (CHOGM)',
    'Commonwealth Secretariat (Marlborough House)',
    'Commonwealth Ministerial Action Group (CMAG — when convened)',
    'Foundation and affiliated networks (e.g. Commonwealth Foundation, CPA — informational)',
  ],
  objectivesSummary: [
    'Support development, democracy, and peace among member states',
    'Strengthen civil society, youth, gender equality, and small states’ voices',
    'Facilitate trade, legal cooperation, and technical assistance where agreed',
    'Uphold shared values in the Commonwealth Charter (as adopted and amended)',
  ],
  memberStatesIso2: ['AG', 'AU', 'BS', 'BD', 'BB', 'BZ', 'BW', 'BN', 'CM', 'CA', 'CY', 'DM', 'SZ', 'FJ', 'GA', 'GM', 'GH', 'GD', 'GY', 'IN', 'JM', 'KE', 'KI', 'LS', 'MW', 'MY', 'MV', 'MT', 'MU', 'MZ', 'NA', 'NR', 'NZ', 'NG', 'PK', 'PG', 'RW', 'KN', 'LC', 'VC', 'WS', 'SC', 'SL', 'SG', 'SB', 'ZA', 'LK', 'TZ', 'TG', 'TO', 'TT', 'TV', 'UG', 'GB', 'VU', 'ZM'],
  memberRecordsInModule: 56,
}
