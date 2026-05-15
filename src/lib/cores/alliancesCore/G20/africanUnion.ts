import type { G20InstitutionalMember } from './types'
import { G20_INSTITUTIONAL_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { G20_INSTITUTIONAL_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { AU_MEMBER_ISO_CODES } from '../africanUnion/auMemberIsoCodes'

export const africanUnion: G20InstitutionalMember = {
  name: 'African Union',
  abbreviation: 'AU',
  code: 'AU',
  headquartersCity: 'Addis Ababa',
  headquartersCountry: 'Ethiopia',
  coordinates: { latitude: 9.005401, longitude: 38.763611 },
  established:
    '2002-07-09 African Union (Durban) succeeding the 1963-05-25 Organisation of African Unity (OAU, Addis Ababa Charter); continental political and economic integration body — informational',
  g20Membership:
    'Admitted as permanent G20 member at the 2023-09 New Delhi leaders summit under the Indian presidency — second institutional/supranational member alongside the EU; coordinated through the AU Commission and current AU Chair — informational',
  memberStatesIso2: AU_MEMBER_ISO_CODES,
  primaryWorkingLanguages: ['English', 'French', 'Arabic', 'Portuguese', 'Spanish', 'Swahili'],
  representativeBodies: [
    'African Union Commission (Executive secretariat — Addis Ababa)',
    'Assembly of the Union (Heads of State / Government)',
    'Executive Council (Foreign ministers)',
    'African Continental Free Trade Area (AfCFTA) Secretariat — Accra',
  ],
  currentRepresentatives:
    'AU Commission Chairperson Mahmoud Ali Youssouf; Assembly Chair (rotating annually) — verify',
  domesticCourierServices: G20_INSTITUTIONAL_DOMESTIC_COURIERS.AFRICAN_UNION,
  notableUniversities: G20_INSTITUTIONAL_NOTABLE_UNIVERSITIES.AFRICAN_UNION,
}
