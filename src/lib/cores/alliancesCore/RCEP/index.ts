export type { RcepCountry, RcepOrganizationInfo, DomesticCourierService, NotableUniversity } from './types'

import type { RcepCountry, RcepOrganizationInfo } from './types'
import { RCEP_MEMBER_ISO_CODES } from './rcepMemberIsoCodes'
import { australia } from './australia'
import { brunei } from './brunei'
import { cambodia } from './cambodia'
import { china } from './china'
import { indonesia } from './indonesia'
import { japan } from './japan'
import { southKorea } from './southKorea'
import { laos } from './laos'
import { malaysia } from './malaysia'
import { myanmar } from './myanmar'
import { newZealand } from './newZealand'
import { philippines } from './philippines'
import { singapore } from './singapore'
import { thailand } from './thailand'
import { vietnam } from './vietnam'

export {
  australia,
  brunei,
  cambodia,
  china,
  indonesia,
  japan,
  southKorea,
  laos,
  malaysia,
  myanmar,
  newZealand,
  philippines,
  singapore,
  thailand,
  vietnam,
}

/** RCEP Parties represented in this module (15 economies in user list order). */
export const rcepMembers: readonly RcepCountry[] = [
  australia,
  brunei,
  cambodia,
  china,
  indonesia,
  japan,
  southKorea,
  laos,
  malaysia,
  myanmar,
  newZealand,
  philippines,
  singapore,
  thailand,
  vietnam,
] as const

/**
 * Regional Comprehensive Economic Partnership — ASEAN-centred mega-FTA depositary narrative (implementation
 * schedules vary chapter-by-chapter — informational).
 */
export const rcep: RcepOrganizationInfo = {
  officialName: 'Regional Comprehensive Economic Partnership',
  abbreviation: 'RCEP',
  established:
    'Agreement signed 2020-11-15; entry into force 2022-01-01 among sufficient ratifiers (ROK deposit Feb 2022 tranche timing — informational)',
  headquartersCity: 'Jakarta',
  headquartersCountry:
    'Indonesia (ASEAN Secretariat depositary/administrative support per Agreement — informational)',
  memberStatesIso2: RCEP_MEMBER_ISO_CODES,
  memberRecordsInModule: 15,
}
