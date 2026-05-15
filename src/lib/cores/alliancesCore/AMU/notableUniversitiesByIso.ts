import type { NotableUniversity } from './types'
import type { AmuMemberIsoCode } from './amuMemberIsoCodes'

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

/**
 * Three notable universities per AMU member economy (economics / accounting / CS / EE-style faculties — informational).
 */
export const AMU_NOTABLE_UNIVERSITIES: Record<
  AmuMemberIsoCode,
  readonly [NotableUniversity, NotableUniversity, NotableUniversity]
> = {
  DZ: [
    u('University of Algiers 1 — Benyoucef Benkhedda', 'https://www.univ-alger.dz/', 'contact@univ-alger.dz', '', '', 'https://www.linkedin.com/school/university-of-algiers/'),
    u('University of Sciences and Technology Houari Boumediene (USTHB)', 'https://www.usthb.dz/', 'contactgi@mail.usthb.dz', 'https://www.instagram.com/usthbofficial/', '', 'https://www.linkedin.com/school/usthb-algerie/'),
    u('Higher School of Economics, Commercial and Financial Sciences — Algiers', 'http://www.esc-alger.dz/', 'contact@esc-alger.dz', '', '', ''),
  ],
  LY: [
    u('University of Tripoli', 'http://www.uot.edu.ly/', '', '', '', ''),
    u('University of Libya — Benghazi faculties cluster', '', 'info@mol.gov.ly', '', '', ''),
    u('Libyan Authority for Scientific Research counterpart — engineering & IT institutes', '', 'info@lasr.ly', '', '', ''),
  ],
  MR: [
    u('Université de Nouakchott Al-Aasriya', 'https://www.univ-nkc.mr/', 'contact@univ-nkc.mr', '', '', ''),
    u('Higher Institute of Accounting and Business Administration Nouakchott', '', '', '', '', ''),
    u('École nationale supérieure des Mines et des Technologies', '', '', '', '', ''),
  ],
  MA: [
    u('Mohammed V University in Rabat', 'https://www.um5.ma/', 'communication@um5.ma', '', 'https://x.com/UnivMohammedV', 'https://www.linkedin.com/school/universite-mohammed-v-de-rabat/'),
    u('Mohammed VI Polytechnic University (UM6P)', 'https://www.um6p.ma/', 'contact@um6p.ma', 'https://www.instagram.com/um6p.ma/', '', 'https://www.linkedin.com/school/um6p/'),
    u('National School of Applied Sciences Tetouan (ENSA Tetouan)', 'https://ensat.ac.ma/', 'contact@ensat.ac.ma', '', '', 'https://www.linkedin.com/school/ensa-tétouan/'),
  ],
  TN: [
    u('Université Tunis El Manar', 'https://www.utm.rnu.tn/', 'webmasterfg@fst.rnu.tn', '', '', 'https://www.linkedin.com/school/université-tunis-el-manar/'),
    u('Université Tunis — Faculty of Economics and Management', 'https://www.utunis.rnu.tn/', '', '', '', ''),
    u('Université Nationale du Numérique (reference IT training hub)', '', 'contact@mee.gov.tn', '', '', ''),
  ],
}
