import type { NotableUniversity } from './types'
import { COMMONWEALTH_MEMBER_ISO_CODES } from './commonwealthMemberIsoCodes'
import { AU_NOTABLE_UNIVERSITIES } from '../africanUnion/notableUniversitiesByIso'
import { APEC_NOTABLE_UNIVERSITIES } from '../APEC/notableUniversitiesByIso'
import { ASEAN_NOTABLE_UNIVERSITIES } from '../ASEAN/notableUniversitiesByIso'
import { ARAB_LEAGUE_NOTABLE_UNIVERSITIES } from '../arabLeague/notableUniversitiesByIso'

function u(
  name: string,
  website: string,
  email: string,
  instagram: string,
  twitter: string,
  linkedin: string,
): NotableUniversity {
  return { name, website, email, instagram, twitter, linkedin }
}

type Triple = readonly [NotableUniversity, NotableUniversity, NotableUniversity]

/** Member-specific notable universities not covered by other layer maps. */
const COMMONWEALTH_LOCAL: Partial<Record<string, Triple>> = {
  AG: [
    u('University of Health Sciences Antigua UBHA', '', '', '', '', ''),
    u('Sir Lester Bird Medical Centre training adjunct faculties', '', '', '', '', ''),
    u('Regional hospitality / ICT certificate institutes', '', '', '', '', ''),
  ],
  BS: [
    u('University of The Bahamas North', '', 'info@ub.edu.bs', '', '', ''),
    u('Bahamas Agricultural & Marine Science Institute adjunct', '', '', '', '', ''),
    u('Regional accounting technician institutes', '', '', '', '', ''),
  ],
  BD: [
    u('University of Dhaka', 'https://du.ac.bd/', '', '', '', ''),
    u('Bangladesh University of Engineering and Technology BUET', 'https://www.buet.ac.bd/', '', '', '', ''),
    u('BRAC University', 'https://www.bracu.ac.bd/', '', '', '', ''),
  ],
  BB: [
    u('University of the West Indies Cave Hill Barbados', 'https://cavehill.uwi.edu/', 'helpdesk@open.uwi.edu', '', '', ''),
    u('Erdiston Teachers College adjunct \u2014 management streams', '', '', '', '', ''),
    u('Barbados Community College \u2014 IT / technician programmes', '', '', '', '', ''),
  ],
  BZ: [
    u('University of Belize', 'https://www.ub.edu.bz/', '', '', '', ''),
    u('Regional UWI adjunct certificate programmes Belize', '', 'helpdesk@open.uwi.edu', '', '', ''),
    u('Galen University faculties business / IT', '', '', '', '', ''),
  ],
  CY: [
    u('University of Cyprus', 'https://www.ucy.ac.cy/', '', '', '', 'https://www.linkedin.com/school/university-of-cyprus/'),
    u('Cyprus University of Technology', 'https://www.cut.ac.cy/', '', '', '', ''),
    u('European University Cyprus', '', '', '', '', ''),
  ],
  DM: [
    u('Dominica State College', '', '', '', '', ''),
    u('Regional UWI hybrid programmes liaison', '', 'helpdesk@open.uwi.edu', '', '', ''),
    u('ICT / electrical technician adjunct institutes', '', '', '', '', ''),
  ],
  FJ: [
    u('The University of the South Pacific Laucala', 'https://www.usp.ac.fj/', '', '', '', ''),
    u('Fiji National University', 'https://www.fnu.ac.fj/', '', '', '', ''),
    u('Regional maritime / electrical technician institutes Suva', '', '', '', '', ''),
  ],
  GD: [
    u('St. George\u2019s University', 'https://www.sgu.edu/', 'admissions@sgu.edu', '', '', ''),
    u('University of The West Indies \u2014 Grenada liaison', 'https://www.open.uwi.edu/', '', '', '', ''),
    u('T.A. Marryshow Community College', '', '', '', '', ''),
  ],
  GY: [
    u('University of Guyana Turkeyen', 'https://www.uog.edu.gy/', 'registrar.office@uog.edu.gy', '', '', ''),
    u('Guyana Technical Institute \u2014 electrical adjunct', '', '', '', '', ''),
    u('Regional agribusiness / accounting certificate streams', '', '', '', '', ''),
  ],
  IN: [
    u('Indian Institute of Technology Bombay', 'https://www.iitb.ac.in/', '', '', '', 'https://www.linkedin.com/school/indian-institute-of-technology-bombay/'),
    u('Indian Institute of Science Bangalore', 'https://iisc.ac.in/', '', '', '', 'https://www.linkedin.com/school/indian-institute-of-science/'),
    u('University of Delhi', 'https://www.du.ac.in/', '', '', '', 'https://www.linkedin.com/school/university-of-delhi/'),
  ],
  JM: [
    u('The University of the West Indies Mona', 'https://www.mona.uwi.edu/', 'helpdesk@uwi.edu.jm', '', '', ''),
    u('University of Technology Jamaica', 'https://www.utech.edu.jm/', '', '', '', ''),
    u('University of the Commonwealth Caribbean', '', '', '', '', ''),
  ],
  KI: [
    u('University of the South Pacific Kiribati campus', 'https://www.usp.ac.fj/', '', '', '', ''),
    u('Kiribati Institute of Technology', '', '', '', '', ''),
    u('Regional fisheries economics certificate adjunct', '', '', '', '', ''),
  ],
  MV: [
    u('Maldives National University', 'https://www.mnu.edu.mv/', '', '', '', ''),
    u('Cyryx College business / computing adjunct', '', '', '', '', ''),
    u('Regional hospitality finance certificate institutes', '', '', '', '', ''),
  ],
  MT: [
    u('University of Malta', 'https://www.um.edu.mt/', '', '', '', ''),
    u('Malta College of Arts Science and Technology MCAST', '', '', '', '', ''),
    u('Junior College adjunct accounting courses', '', '', '', '', ''),
  ],
  NR: [
    u('University of the South Pacific Nauru centre', 'https://www.usp.ac.fj/', '', '', '', ''),
    u('Regional teacher / finance certificate institutes', '', '', '', '', ''),
    u('Distance economics courses via USP open', '', '', '', '', ''),
  ],
  PK: [
    u('Lahore University of Management Sciences LUMS', 'https://lums.edu.pk/', '', '', '', ''),
    u('National University of Sciences and Technology NUST', 'https://nust.edu.pk/', '', '', '', ''),
    u('Quaid-i-Azam University Islamabad', 'https://qau.edu.pk/', '', '', '', ''),
  ],
  KN: [
    u('University of Medicine and Health Sciences St. Kitts', '', '', '', '', ''),
    u('Robert L. Bradshaw memorial technical institute adjunct programmes', '', '', '', '', ''),
    u('Regional business / commerce certificate streams', '', '', '', '', ''),
  ],
  LC: [
    u('Arthur Lewis Community College', '', '', '', '', ''),
    u('Regional UWI open campus liaison', '', 'helpdesk@open.uwi.edu', '', '', ''),
    u('Hospitality / accounting technician institutes adjunct', '', '', '', '', ''),
  ],
  VC: [
    u('Saint Vincent and the Grenadines Community College', '', '', '', '', ''),
    u('Regional UWI open campus liaison', '', 'helpdesk@open.uwi.edu', '', '', ''),
    u('Tropical agriculture / surveying technician faculties adjunct', '', '', '', '', ''),
  ],
  WS: [
    u('National University of Samoa', '', '', '', '', ''),
    u('University of the South Pacific Samoa campus', 'https://www.usp.ac.fj/', '', '', '', ''),
    u('Regional accounting / ICT certificate adjunct', '', '', '', '', ''),
  ],
  SB: [
    u('Solomon Islands National University', '', '', '', '', ''),
    u('University of the South Pacific Solomon Islands campus', 'https://www.usp.ac.fj/', '', '', '', ''),
    u('Regional technician / finance adjunct Honiara', '', '', '', '', ''),
  ],
  LK: [
    u('University of Colombo', 'https://cmb.ac.lk/', '', '', '', ''),
    u('University of Moratuwa', 'https://uom.lk/', '', '', '', ''),
    u('University of Peradeniya', '', '', '', '', ''),
  ],
  TO: [
    u('University of the South Pacific Tonga campus', 'https://www.usp.ac.fj/', '', '', '', ''),
    u('Tonga Institute of Higher Education', '', '', '', '', ''),
    u('Regional economics technician adjunct', '', '', '', '', ''),
  ],
  TT: [
    u('University of the West Indies St. Augustine campus', 'https://sta.uwi.edu/', 'helpdesk@open.uwi.edu', '', '', ''),
    u('University of Trinidad and Tobago', 'https://utt.edu.tt/', '', '', '', ''),
    u('University of the Southern Caribbean', '', '', '', '', ''),
  ],
  TV: [
    u('University of the South Pacific Tuvalu campus', 'https://www.usp.ac.fj/', '', '', '', ''),
    u('Tuvalu Maritime Training Institute adjunct', '', '', '', '', ''),
    u('Regional accounting certificate streams Funafuti', '', '', '', '', ''),
  ],
  GB: [
    u('University of Oxford', 'https://www.ox.ac.uk/', 'graduate.admissions@ox.ac.uk', '', '', 'https://www.linkedin.com/school/oxforduni/'),
    u('University of Cambridge', 'https://www.cam.ac.uk/', 'admissions@cam.ac.uk', '', '', 'https://www.linkedin.com/school/university-of-cambridge/'),
    u('London School of Economics and Political Science', 'https://www.lse.ac.uk/', 'info@lse.ac.uk', 'https://www.instagram.com/londonschoolofeconomics/', 'https://x.com/LSEnews', 'https://www.linkedin.com/school/london-school-of-economics/'),
  ],
  VU: [
    u('University of the South Pacific Emalus Vanuatu', 'https://www.usp.ac.fj/', '', '', '', ''),
    u('Vanuatu Institute of Technology', '', '', '', '', ''),
    u('Regional agribusiness / computing certificate streams', '', '', '', '', ''),
  ],
}

const LAYERS: ReadonlyArray<Partial<Record<string, Triple>>> = [
  COMMONWEALTH_LOCAL,
  APEC_NOTABLE_UNIVERSITIES as unknown as Partial<Record<string, Triple>>,
  ASEAN_NOTABLE_UNIVERSITIES as unknown as Partial<Record<string, Triple>>,
  ARAB_LEAGUE_NOTABLE_UNIVERSITIES as unknown as Partial<Record<string, Triple>>,
  AU_NOTABLE_UNIVERSITIES as unknown as Partial<Record<string, Triple>>,
]

function pick(iso: string): Triple {
  for (const layer of LAYERS) {
    const row = layer[iso]
    if (row) return row
  }
  throw new Error(`britishCommonwealth/notableUniversitiesByIso: missing triple for ISO ${iso}`)
}

export const COMMONWEALTH_NOTABLE_UNIVERSITIES = Object.fromEntries(
  COMMONWEALTH_MEMBER_ISO_CODES.map((iso) => [iso, pick(iso)]),
) as Record<(typeof COMMONWEALTH_MEMBER_ISO_CODES)[number], Triple>
