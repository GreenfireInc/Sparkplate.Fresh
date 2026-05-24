import type { NotableUniversity } from './types'
import { OECD_MEMBER_ISO_CODES } from './oecdMemberIsoCodes'
import { APEC_NOTABLE_UNIVERSITIES } from '../APEC/notableUniversitiesByIso'
import { EU_NOTABLE_UNIVERSITIES } from '../EU/notableUniversitiesByIso'

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
const OECD_LOCAL: Partial<Record<string, Triple>> = {
  AT: [
    u('University of Vienna', 'https://www.univie.ac.at/', '', '', '', ''),
    u('Vienna University of Technology TU Wien', 'https://www.tuwien.at/', '', '', '', ''),
    u('University of Economics and Business WU Vienna', 'https://www.wu.ac.at/', '', '', '', ''),
  ],
  CO: [
    u('Universidad de los Andes', 'https://uniandes.edu.co/', '', '', '', 'https://www.linkedin.com/school/universidad-de-los-andes/'),
    u('Universidad Nacional de Colombia', 'https://unal.edu.co/', '', '', '', 'https://www.linkedin.com/school/universidad-nacional-de-colombia/'),
    u('Universidad Pontificia Bolivariana \u2014 engineering / management', 'https://www.upb.edu.co/', '', '', '', 'https://www.linkedin.com/school/universidad-pontificia-bolivariana/'),
  ],
  CR: [
    u('Universidad de Costa Rica', 'https://www.ucr.ac.cr/', '', '', '', ''),
    u('Costa Rica Institute of Technology', 'https://www.tec.ac.cr/', '', '', '', ''),
    u('Universidad Nacional de Costa Rica', 'https://www.una.ac.cr/', '', '', '', ''),
  ],
  CZ: [
    u('Charles University Prague', 'https://cuni.cz/', '', '', '', 'https://www.linkedin.com/school/charles-university/'),
    u('Czech Technical University in Prague', 'https://www.cvut.cz/', '', '', '', ''),
    u('University of Economics Prague V\u0160E', 'https://www.vse.cz/', '', '', '', ''),
  ],
  EE: [
    u('University of Tartu', 'https://www.ut.ee/', '', '', '', ''),
    u('TalTech Tallinn University of Technology', 'https://taltech.ee/', '', '', '', ''),
    u('University of Tallinn', '', '', '', '', ''),
  ],
  GR: [
    u('National Technical University of Athens NTUA', 'https://www.ntua.gr/', '', '', '', ''),
    u('University of Thessaloniki Aristotle AUTh', '', '', '', '', ''),
    u('Athens University of Economics and Business', '', '', '', '', ''),
  ],
  HU: [
    u('E\u00f6tv\u00f6s Lor\u00e1nd University', 'https://www.elte.hu/', '', '', '', ''),
    u('Budapest University of Technology and Economics', 'https://www.bme.hu/', '', '', '', ''),
    u('Corvinus University Budapest', '', '', '', '', ''),
  ],
  IS: [
    u('University of Iceland (H\u00e1sk\u00f3li \u00cdslands)', 'https://english.hi.is/', 'hi@hi.is', 'https://www.instagram.com/haskoli_islands/', 'https://x.com/haskoliislands', 'https://www.linkedin.com/school/university-of-iceland/'),
    u('Reykjav\u00edk University (H\u00e1sk\u00f3linn \u00ed Reykjav\u00edk) \u2014 School of Business & Department of Engineering', 'https://en.ru.is/', 'ru@ru.is', 'https://www.instagram.com/reykjavikuniversity/', 'https://x.com/RUniversity', 'https://www.linkedin.com/school/reykjavik-university/'),
    u('University of Akureyri (H\u00e1sk\u00f3linn \u00e1 Akureyri) \u2014 Faculty of Business & Science', 'https://english.unak.is/', 'unak@unak.is', 'https://www.instagram.com/haskolinnaakureyri/', '', 'https://www.linkedin.com/school/haskolinn-a-akureyri/'),
  ],
  IT: [
    u('Politecnico di Milano', 'https://www.polimi.it/', '', '', '', 'https://www.linkedin.com/school/politecnico-di-milano/'),
    u('Bocconi University', 'https://www.unibocconi.eu/', '', '', '', 'https://www.linkedin.com/school/universit-bocconi/'),
    u('Sapienza University of Rome', 'https://www.uniroma1.it/', '', '', '', 'https://www.linkedin.com/school/sapienzauniversitadiroma/'),
  ],
  LV: [
    u('University of Latvia', 'https://www.lu.lv/', '', '', '', ''),
    u('Riga Technical University RTU', 'https://www.rtu.lv/', '', '', '', ''),
    u('Stockholm School of Economics in Riga partner adjunct programmes', '', '', '', '', ''),
  ],
  LT: [
    u('Vilnius University', 'https://www.vu.lt/', '', '', '', ''),
    u('Kaunas University of Technology', 'https://www.ktu.edu/', '', '', '', ''),
    u('ISM University Management and Economics', '', '', '', '', ''),
  ],
  LU: [
    u('University of Luxembourg', 'https://www.uni.lu/', '', '', '', ''),
    u('Sacred Heart University adjunct Luxembourg campus', '', '', '', '', ''),
    u('Regional fintech analyst certificate institutes', '', '', '', '', ''),
  ],
  NO: [
    u('University of Oslo (UiO) \u2014 Faculty of Mathematics and Natural Sciences / Department of Economics', 'https://www.uio.no/english/', 'admissions@uio.no', 'https://www.instagram.com/universitetetioslo/', 'https://x.com/uniofoslo', 'https://www.linkedin.com/school/university-of-oslo/'),
    u('Norwegian University of Science and Technology (NTNU) \u2014 Faculty of Information Technology & Electrical Engineering', 'https://www.ntnu.edu/', 'postmottak@ntnu.no', 'https://www.instagram.com/ntnu/', 'https://x.com/ntnu', 'https://www.linkedin.com/school/ntnu/'),
    u('NHH Norwegian School of Economics', 'https://www.nhh.no/en/', 'kontaktsenter@nhh.no', 'https://www.instagram.com/nhh_nhs/', 'https://x.com/NHHnews', 'https://www.linkedin.com/school/nhh-norwegian-school-of-economics/'),
  ],
  PL: [
    u('University of Warsaw', 'https://www.uw.edu.pl/', '', '', '', 'https://www.linkedin.com/school/university-of-warsaw/'),
    u('Warsaw University of Technology PW', '', '', '', '', ''),
    u('Krak\u00f3w University of Economics', '', '', '', '', ''),
  ],
  PT: [
    u('University of Lisbon', 'https://www.ulisboa.pt/', '', '', '', ''),
    u('University of Porto', 'https://www.up.pt/', '', '', '', ''),
    u('Nova School of Business and Economics', '', '', '', '', ''),
  ],
  SK: [
    u('Comenius University in Bratislava', 'https://uniba.sk/', '', '', '', ''),
    u('Slovak University of Technology Bratislava', '', '', '', '', ''),
    u('University of Economics Bratislava', '', '', '', '', ''),
  ],
  SI: [
    u('University of Ljubljana', 'https://www.uni-lj.si/', '', '', '', ''),
    u('University of Maribor', '', '', '', '', ''),
    u('Regional electrical engineering faculties adjunct Ljubljana', '', '', '', '', ''),
  ],
  CH: [
    u('ETH Z\u00fcrich (Swiss Federal Institute of Technology \u2014 D-MTEC, D-ITET, D-INFK)', 'https://ethz.ch/en.html', 'study@ethz.ch', 'https://www.instagram.com/ethzurich/', 'https://x.com/ETH_en', 'https://www.linkedin.com/school/eth-zurich/'),
    u('EPFL \u2014 \u00c9cole polytechnique f\u00e9d\u00e9rale de Lausanne', 'https://www.epfl.ch/en/', 'student.services@epfl.ch', 'https://www.instagram.com/epflcampus/', 'https://x.com/EPFL_en', 'https://www.linkedin.com/school/epfl/'),
    u('University of St. Gallen (HSG) \u2014 Economics, Finance & Accounting', 'https://www.unisg.ch/en/', 'info@unisg.ch', 'https://www.instagram.com/uni_stgallen/', 'https://x.com/HSGStGallen', 'https://www.linkedin.com/school/university-of-st-gallen/'),
  ],
  TR: [
    u('Istanbul Technical University ITU', 'https://www.itu.edu.tr/', '', '', '', ''),
    u('Middle East Technical University METU', 'https://www.metu.edu.tr/', '', '', '', ''),
    u('Bo\u011fazi\u00e7i University', '', '', '', '', ''),
  ],
  GB: [
    u('University of Oxford', 'https://www.ox.ac.uk/', 'graduate.admissions@ox.ac.uk', '', '', 'https://www.linkedin.com/school/oxforduni/'),
    u('University of Cambridge', 'https://www.cam.ac.uk/', 'admissions@cam.ac.uk', '', '', 'https://www.linkedin.com/school/university-of-cambridge/'),
    u('London School of Economics and Political Science', 'https://www.lse.ac.uk/', 'info@lse.ac.uk', 'https://www.instagram.com/londonschoolofeconomics/', 'https://x.com/LSEnews', 'https://www.linkedin.com/school/london-school-of-economics/'),
  ],
}

const LAYERS: ReadonlyArray<Partial<Record<string, Triple>>> = [
  OECD_LOCAL,
  EU_NOTABLE_UNIVERSITIES as unknown as Partial<Record<string, Triple>>,
  APEC_NOTABLE_UNIVERSITIES as unknown as Partial<Record<string, Triple>>,
]

function pick(iso: string): Triple {
  for (const layer of LAYERS) {
    const row = layer[iso]
    if (row) return row
  }
  throw new Error(`OECD/notableUniversitiesByIso: missing triple for ISO ${iso}`)
}

/** Three notable universities per OECD member economy (merged from shared layers — informational). */
export const OECD_NOTABLE_UNIVERSITIES = Object.fromEntries(
  OECD_MEMBER_ISO_CODES.map((iso) => [iso, pick(iso)]),
) as Record<(typeof OECD_MEMBER_ISO_CODES)[number], Triple>
