import type { G20InstitutionalMember } from './types'
import { G20_INSTITUTIONAL_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { G20_INSTITUTIONAL_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { EU_MEMBER_ISO_CODES } from '../EU/euMemberIsoCodes'

export const europeanUnion: G20InstitutionalMember = {
  name: 'European Union',
  abbreviation: 'EU',
  code: 'EU',
  headquartersCity: 'Brussels',
  headquartersCountry: 'Belgium',
  coordinates: { latitude: 50.8503, longitude: 4.3517 },
  established:
    '1993-11-01 Maastricht Treaty (EU legal personality); Lisbon Treaty 2009 institutional consolidation; supranational customs union + single market — informational',
  g20Membership:
    'Founding institutional member of the G20 finance ministers and central bank governors track (1999) and the leaders summits (2008) — represented alongside individual EU member states FR/DE/IT (and historically GB) — informational',
  memberStatesIso2: EU_MEMBER_ISO_CODES,
  primaryWorkingLanguages: ['English', 'French', 'German'],
  representativeBodies: [
    'European Commission (Executive)',
    'European Council (Heads of State / Government)',
    'European Central Bank (Eurosystem monetary)',
    'Council of the EU / ECOFIN (finance ministers)',
  ],
  currentRepresentatives:
    'European Commission President Ursula von der Leyen; European Council President António Costa; ECB President Christine Lagarde — verify',
  domesticCourierServices: G20_INSTITUTIONAL_DOMESTIC_COURIERS.EU,
  notableUniversities: G20_INSTITUTIONAL_NOTABLE_UNIVERSITIES.EU,
}
