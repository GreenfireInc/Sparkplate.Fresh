export type {
  ApecCountry,
  ApecOrganizationInfo,
  BondMarketVenue,
  DomesticCourierService,
  MainExportCommodities,
  MainExportedElements,
  MainInternationalAirport,
  NewsOutlet,
  NewsOutletsRoster,
  NotableUniversity,
  RareEarths,
} from './types'
export { APEC_MEMBER_ISO_CODES } from './apecMemberIsoCodes'
export type { ApecMemberIsoCode } from './apecMemberIsoCodes'

import type { ApecCountry, ApecOrganizationInfo } from './types'
import { APEC_MEMBER_ISO_CODES } from './apecMemberIsoCodes'
import { australia } from './australia'
import { brunei } from './brunei'
import { canada } from './canada'
import { chile } from './chile'
import { china } from './china'
import { hongKong } from './hongKong'
import { indonesia } from './indonesia'
import { japan } from './japan'
import { malaysia } from './malaysia'
import { mexico } from './mexico'
import { newZealand } from './newZealand'
import { papuaNewGuinea } from './papuaNewGuinea'
import { peru } from './peru'
import { philippines } from './philippines'
import { russia } from './russia'
import { singapore } from './singapore'
import { southKorea } from './southKorea'
import { chineseTaipei } from './chineseTaipei'
import { thailand } from './thailand'
import { unitedStates } from './unitedStates'
import { vietnam } from './vietnam'

export {
  australia,
  brunei,
  canada,
  chile,
  china,
  hongKong,
  indonesia,
  japan,
  malaysia,
  mexico,
  newZealand,
  papuaNewGuinea,
  peru,
  philippines,
  russia,
  singapore,
  southKorea,
  chineseTaipei,
  thailand,
  unitedStates,
  vietnam,
}

/** APEC member economies per official roster snapshot (21 in user list order). */
export const apecMembers: readonly ApecCountry[] = [
  australia,
  brunei,
  canada,
  chile,
  china,
  hongKong,
  indonesia,
  japan,
  malaysia,
  mexico,
  newZealand,
  papuaNewGuinea,
  peru,
  philippines,
  russia,
  singapore,
  southKorea,
  chineseTaipei,
  thailand,
  unitedStates,
  vietnam,
] as const

/**
 * Asia-Pacific Economic Cooperation — Secretariat in Singapore per apec.org; economies vs sovereign states distinctions
 * (HK / Chinese Taipei) follow APEC nomenclature — informational.
 */
export const apec: ApecOrganizationInfo = {
  officialName: 'Asia-Pacific Economic Cooperation',
  abbreviation: 'APEC',
  established:
    '1989 Canberra inaugural ministerial; Leaders\' Meeting rotational hosting model evolution — informational',
  headquartersCity: 'Singapore',
  headquartersCountry: 'Singapore',
  memberStatesIso2: APEC_MEMBER_ISO_CODES,
  memberRecordsInModule: 21,
}
