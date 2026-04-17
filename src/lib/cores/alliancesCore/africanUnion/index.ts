export type {
  AfricanUnionCountry,
  AfricanUnionMembership,
  AfricanUnionOrganizationInfo,
} from './types'

import type { AfricanUnionCountry, AfricanUnionOrganizationInfo } from './types'
import { algeria } from './algeria'
import { angola } from './angola'
import { benin } from './benin'
import { botswana } from './botswana'
import { burkinaFaso } from './burkinaFaso'
import { burundi } from './burundi'
import { cameroon } from './cameroon'
import { capeVerde } from './capeVerde'
import { centralAfricanRepublic } from './centralAfricanRepublic'
import { chad } from './chad'
import { comoros } from './comoros'
import { democraticRepublicOfTheCongo } from './democraticRepublicOfTheCongo'
import { republicOfTheCongo } from './republicOfTheCongo'
import { djibouti } from './djibouti'
import { egypt } from './egypt'
import { equatorialGuinea } from './equatorialGuinea'
import { eritrea } from './eritrea'
import { eswatini } from './eswatini'
import { ethiopia } from './ethiopia'
import { gabon } from './gabon'
import { gambia } from './gambia'
import { ghana } from './ghana'
import { guinea } from './guinea'
import { guineaBissau } from './guineaBissau'
import { ivoryCoast } from './ivoryCoast'
import { kenya } from './kenya'
import { lesotho } from './lesotho'
import { liberia } from './liberia'
import { libya } from './libya'
import { madagascar } from './madagascar'
import { malawi } from './malawi'
import { mali } from './mali'
import { mauritania } from './mauritania'
import { mauritius } from './mauritius'
import { morocco } from './morocco'
import { mozambique } from './mozambique'
import { namibia } from './namibia'
import { niger } from './niger'
import { nigeria } from './nigeria'
import { rwanda } from './rwanda'
import { sahrawiRepublic } from './sahrawiRepublic'
import { saoTomeAndPrincipe } from './saoTomeAndPrincipe'
import { senegal } from './senegal'
import { seychelles } from './seychelles'
import { sierraLeone } from './sierraLeone'
import { somalia } from './somalia'
import { southAfrica } from './southAfrica'
import { southSudan } from './southSudan'
import { sudan } from './sudan'
import { tanzania } from './tanzania'
import { togo } from './togo'
import { tunisia } from './tunisia'
import { uganda } from './uganda'
import { zambia } from './zambia'
import { zimbabwe } from './zimbabwe'

export {
  algeria,
  angola,
  benin,
  botswana,
  burkinaFaso,
  burundi,
  cameroon,
  capeVerde,
  centralAfricanRepublic,
  chad,
  comoros,
  democraticRepublicOfTheCongo,
  republicOfTheCongo,
  djibouti,
  egypt,
  equatorialGuinea,
  eritrea,
  eswatini,
  ethiopia,
  gabon,
  gambia,
  ghana,
  guinea,
  guineaBissau,
  ivoryCoast,
  kenya,
  lesotho,
  liberia,
  libya,
  madagascar,
  malawi,
  mali,
  mauritania,
  mauritius,
  morocco,
  mozambique,
  namibia,
  niger,
  nigeria,
  rwanda,
  sahrawiRepublic,
  saoTomeAndPrincipe,
  senegal,
  seychelles,
  sierraLeone,
  somalia,
  southAfrica,
  southSudan,
  sudan,
  tanzania,
  togo,
  tunisia,
  uganda,
  zambia,
  zimbabwe,
}

/** All African Union member records in this module (55). */
export const africanUnionMembers: readonly AfricanUnionCountry[] = [
  algeria,
  angola,
  benin,
  botswana,
  burkinaFaso,
  burundi,
  cameroon,
  capeVerde,
  centralAfricanRepublic,
  chad,
  comoros,
  democraticRepublicOfTheCongo,
  republicOfTheCongo,
  djibouti,
  egypt,
  equatorialGuinea,
  eritrea,
  eswatini,
  ethiopia,
  gabon,
  gambia,
  ghana,
  guinea,
  guineaBissau,
  ivoryCoast,
  kenya,
  lesotho,
  liberia,
  libya,
  madagascar,
  malawi,
  mali,
  mauritania,
  mauritius,
  morocco,
  mozambique,
  namibia,
  niger,
  nigeria,
  rwanda,
  sahrawiRepublic,
  saoTomeAndPrincipe,
  senegal,
  seychelles,
  sierraLeone,
  somalia,
  southAfrica,
  southSudan,
  sudan,
  tanzania,
  togo,
  tunisia,
  uganda,
  zambia,
  zimbabwe,
] as const

/**
 * The African Union (AU) is the continental union of African states. It succeeded the Organisation of
 * African Unity (OAU) to deepen integration, promote peace and security, and accelerate political &
 * economic cooperation. Headquarters: Addis Ababa (host: Ethiopia). Reference data — verify for official use.
 */
export const africanUnion: AfricanUnionOrganizationInfo = {
  officialName: 'African Union',
  abbreviation: 'AU',
  predecessorOrganization: 'Organisation of African Unity (OAU), 1963–2002',
  established: {
    organisationOfAfricanUnity: '1963-05-25 (Addis Ababa Charter)',
    africanUnion: '2002-07-09 (in force; launched Durban 2002)',
  },
  headquarters: {
    city: 'Addis Ababa',
    country: 'Ethiopia',
    coordinates: { latitude: 9.0054, longitude: 38.7636 },
  },
  workingLanguages: ['Arabic', 'English', 'French', 'Kiswahili', 'Portuguese', 'Spanish'],
  principalOrgans: [
    'Assembly of the African Union (Heads of State and Government)',
    'Executive Council',
    'Permanent Representatives Committee (PRC)',
    'African Union Commission (Secretariat)',
    'Peace and Security Council',
    'Pan-African Parliament (seat: Midrand, South Africa)',
    'Economic, Social and Cultural Council (ECOSOCC)',
    'African Court on Human and Peoples\' Rights',
    'Specialized agencies and financial institutions (per AU structure; evolving)',
  ],
  objectivesSummary: [
    'Achieve greater unity and solidarity between African countries and peoples',
    'Defend sovereignty, territorial integrity and independence of member states',
    'Accelerate political, economic and social integration',
    'Promote peace, security and stability; advance democratic principles and institutions',
    'Coordinate and harmonize policies across trade, transport, communications and more',
  ],
  memberRecordsInModule: 55,
}
