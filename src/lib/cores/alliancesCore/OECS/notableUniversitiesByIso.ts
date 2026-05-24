import type { NotableUniversity } from './types'
import { OECS_MEMBER_ISO_CODES } from './oecsMemberIsoCodes'

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

/** Three notable universities per OECS member (Eastern Caribbean — informational). */
export const OECS_NOTABLE_UNIVERSITIES: Record<(typeof OECS_MEMBER_ISO_CODES)[number], Triple> = {
  AG: [
    u('University of Health Sciences Antigua UBHA', '', '', '', '', ''),
    u('Sir Lester Bird Medical Centre training adjunct faculties', '', '', '', '', ''),
    u('Regional hospitality / ICT certificate institutes', '', '', '', '', ''),
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
  AI: [
    u('University of the West Indies Open Campus liaison', 'https://www.open.uwi.edu/', 'helpdesk@open.uwi.edu', '', '', ''),
    u('Regional business / ICT certificate institutes', '', '', '', '', ''),
    u('Associate-member distance economics / accounting adjunct', '', '', '', '', ''),
  ],
}
