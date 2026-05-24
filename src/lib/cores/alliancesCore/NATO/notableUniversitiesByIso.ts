import type { NotableUniversity } from './types'
import { NATO_MEMBER_ISO_CODES } from './natoMemberIsoCodes'
import { AU_NOTABLE_UNIVERSITIES } from '../africanUnion/notableUniversitiesByIso'
import { APEC_NOTABLE_UNIVERSITIES } from '../APEC/notableUniversitiesByIso'
import { ASEAN_NOTABLE_UNIVERSITIES } from '../ASEAN/notableUniversitiesByIso'
import { ARAB_LEAGUE_NOTABLE_UNIVERSITIES } from '../arabLeague/notableUniversitiesByIso'
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
const NATO_LOCAL: Partial<Record<string, Triple>> = {
  AL: [
    u('University of Tirana', 'https://www.unitir.edu.al/', '', '', '', ''),
    u('Polytechnic University of Tirana', 'https://www.upt.al/', '', '', '', ''),
    u('University of Economics Tirana', '', '', '', '', ''),
  ],
  BG: [
    u('Sofia University St. Kliment Ohridski', 'https://www.uni-sofia.bg/', '', '', '', ''),
    u('Technical University of Sofia', 'https://www.tu-sofia.bg/', '', '', '', ''),
    u('University of National and World Economy', 'https://www.unwe.bg/', '', '', '', ''),
  ],
  HR: [
    u('University of Zagreb', 'https://www.unizg.hr/', '', '', '', ''),
    u('University of Split', 'https://www.unist.hr/', '', '', '', ''),
    u('Faculty of Electrical Engineering and Computing Zagreb', 'https://www.fer.unizg.hr/', '', '', '', ''),
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
  ME: [
    u('University of Montenegro Podgorica', '', '', '', '', ''),
    u('Regional maritime / electrical adjunct institutes Adriatic', '', '', '', '', ''),
    u('Regional business school adjunct Budva Riviera', '', '', '', '', ''),
  ],
  MK: [
    u('Ss. Cyril and Methodius University Skopje', 'https://www.ukim.edu.mk/', '', '', '', ''),
    u('St. Clement of Ohrid University of Bitola faculties engineering', '', '', '', '', ''),
    u('International Balkan University', '', '', '', '', ''),
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
  RO: [
    u('University of Bucharest', 'https://unibuc.ro/', '', '', '', ''),
    u('POLITEHNICA Bucharest', 'https://upb.ro/', '', '', '', ''),
    u('Academy of Economic Studies Bucharest', '', '', '', '', ''),
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
  NATO_LOCAL,
  EU_NOTABLE_UNIVERSITIES as unknown as Partial<Record<string, Triple>>,
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
  throw new Error(`NATO/notableUniversitiesByIso: missing triple for ISO ${iso}`)
}

/** Three notable universities per NATO Ally (merged from shared layers — informational). */
export const NATO_NOTABLE_UNIVERSITIES = Object.fromEntries(
  NATO_MEMBER_ISO_CODES.map((iso) => [iso, pick(iso)]),
) as Record<(typeof NATO_MEMBER_ISO_CODES)[number], Triple>
