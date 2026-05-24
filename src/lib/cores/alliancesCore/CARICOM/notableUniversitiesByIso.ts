import type { NotableUniversity } from './types'
import { CARICOM_MEMBER_ISO_CODES } from './caricomMemberIsoCodes'

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

/** Three notable universities per CARICOM territory (informational). */
export const CARICOM_NOTABLE_UNIVERSITIES: Record<(typeof CARICOM_MEMBER_ISO_CODES)[number], Triple> = {
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
  DM: [
    u('Dominica State College', '', '', '', '', ''),
    u('Regional UWI hybrid programmes liaison', '', 'helpdesk@open.uwi.edu', '', '', ''),
    u('ICT / electrical technician adjunct institutes', '', '', '', '', ''),
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
  HT: [
    u('Universit\u00e9 d\u2019\u00c9tat d\u2019Ha\u00efti', '', '', '', '', ''),
    u('Universit\u00e9 Quisqueya', '', '', '', '', ''),
    u('Universit\u00e9 Notre Dame d\u2019Ha\u00efti', '', '', '', '', ''),
  ],
  JM: [
    u('The University of the West Indies Mona', 'https://www.mona.uwi.edu/', 'helpdesk@uwi.edu.jm', '', '', ''),
    u('University of Technology Jamaica', 'https://www.utech.edu.jm/', '', '', '', ''),
    u('University of the Commonwealth Caribbean', '', '', '', '', ''),
  ],
  MS: [
    u('Montserrat Community College', '', '', '', '', ''),
    u('University of the West Indies Open Campus liaison', 'https://www.open.uwi.edu/', 'helpdesk@open.uwi.edu', '', '', ''),
    u('Regional technician / finance certificate adjunct', '', '', '', '', ''),
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
  SR: [
    u('University of Applied Science and Arts Suriname HBO', '', '', '', '', ''),
    u('Anton de Kom University of Suriname', '', '', '', '', ''),
    u('Regional computing / accounting technician institutes', '', '', '', '', ''),
  ],
  TT: [
    u('University of the West Indies St. Augustine campus', 'https://sta.uwi.edu/', 'helpdesk@open.uwi.edu', '', '', ''),
    u('University of Trinidad and Tobago', 'https://utt.edu.tt/', '', '', '', ''),
    u('University of the Southern Caribbean', '', '', '', '', ''),
  ],
  AI: [
    u('University of the West Indies Open Campus liaison', 'https://www.open.uwi.edu/', 'helpdesk@open.uwi.edu', '', '', ''),
    u('Regional business / ICT certificate institutes', '', '', '', '', ''),
    u('Associate-member distance economics / accounting adjunct', '', '', '', '', ''),
  ],
  BM: [
    u('University of the West Indies Open Campus liaison', 'https://www.open.uwi.edu/', 'helpdesk@open.uwi.edu', '', '', ''),
    u('Regional business / ICT certificate institutes', '', '', '', '', ''),
    u('Associate-member distance economics / accounting adjunct', '', '', '', '', ''),
  ],
  VG: [
    u('University of the West Indies Open Campus liaison', 'https://www.open.uwi.edu/', 'helpdesk@open.uwi.edu', '', '', ''),
    u('Regional business / ICT certificate institutes', '', '', '', '', ''),
    u('Associate-member distance economics / accounting adjunct', '', '', '', '', ''),
  ],
  KY: [
    u('University of the West Indies Open Campus liaison', 'https://www.open.uwi.edu/', 'helpdesk@open.uwi.edu', '', '', ''),
    u('Regional business / ICT certificate institutes', '', '', '', '', ''),
    u('Associate-member distance economics / accounting adjunct', '', '', '', '', ''),
  ],
  TC: [
    u('University of the West Indies Open Campus liaison', 'https://www.open.uwi.edu/', 'helpdesk@open.uwi.edu', '', '', ''),
    u('Regional business / ICT certificate institutes', '', '', '', '', ''),
    u('Associate-member distance economics / accounting adjunct', '', '', '', '', ''),
  ],
}
