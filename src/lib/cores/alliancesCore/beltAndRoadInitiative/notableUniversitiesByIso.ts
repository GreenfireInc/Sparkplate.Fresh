import type { NotableUniversity } from './types'
import { BELT_AND_ROAD_PARTICIPANT_ISO_CODES } from './participantStatesIsoCodes'
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

/** Participant-specific notable universities not covered by other layer maps. */
const BRI_LOCAL: Partial<Record<string, Triple>> = {
  AF: [
    u('Kabul University', '', '', '', '', ''),
    u('American University of Afghanistan legacy reference', '', '', '', '', ''),
    u('Polytechnic / engineering technician institutes Kabul', '', '', '', '', ''),
  ],
  AG: [
    u('University of Health Sciences Antigua UBHA', '', '', '', '', ''),
    u('Sir Lester Bird Medical Centre training adjunct faculties', '', '', '', '', ''),
    u('Regional hospitality / ICT certificate institutes', '', '', '', '', ''),
  ],
  AL: [
    u('University of Tirana', 'https://www.unitir.edu.al/', '', '', '', ''),
    u('Polytechnic University of Tirana', 'https://www.upt.al/', '', '', '', ''),
    u('University of Economics Tirana', '', '', '', '', ''),
  ],
  AM: [
    u('Yerevan State University', 'https://ysu.am/', '', '', '', ''),
    u('Russian-Armenian University', '', '', '', '', ''),
    u('National Polytechnic University of Armenia', '', '', '', '', ''),
  ],
  AR: [
    u('Universidad de Buenos Aires', 'https://www.uba.ar/', '', '', '', 'https://www.linkedin.com/school/university-of-buenos-aires/'),
    u('Pontificia Universidad Cat\u00f3lica Argentina Santa Mar\u00eda de los Buenos Aires', 'https://www.uca.edu.ar/', '', '', '', ''),
    u('Universidad Nacional de C\u00f3rdoba', 'https://www.unc.edu.ar/', '', '', '', 'https://www.linkedin.com/school/universidad-nacional-de-cordoba/'),
  ],
  AT: [
    u('University of Vienna', 'https://www.univie.ac.at/', '', '', '', ''),
    u('Vienna University of Technology TU Wien', 'https://www.tuwien.at/', '', '', '', ''),
    u('University of Economics and Business WU Vienna', 'https://www.wu.ac.at/', '', '', '', ''),
  ],
  AZ: [
    u('Baku State University', '', '', '', '', ''),
    u('Azerbaijan State Oil and Industry University ADNSU', '', '', '', '', ''),
    u('Baku Higher Oil School faculties engineering / ICT', '', '', '', '', ''),
  ],
  BA: [
    u('University of Sarajevo', 'https://www.unsa.ba/', '', '', '', ''),
    u('University of Banja Luka', 'https://www.unibl.org/', '', '', '', ''),
    u('University of Tuzla', 'https://www.untz.ba/', '', '', '', ''),
  ],
  BB: [
    u('University of the West Indies Cave Hill Barbados', 'https://cavehill.uwi.edu/', 'helpdesk@open.uwi.edu', '', '', ''),
    u('Erdiston Teachers College adjunct \u2014 management streams', '', '', '', '', ''),
    u('Barbados Community College \u2014 IT / technician programmes', '', '', '', '', ''),
  ],
  BD: [
    u('University of Dhaka', 'https://du.ac.bd/', '', '', '', ''),
    u('Bangladesh University of Engineering and Technology BUET', 'https://www.buet.ac.bd/', '', '', '', ''),
    u('BRAC University', 'https://www.bracu.ac.bd/', '', '', '', ''),
  ],
  BG: [
    u('Sofia University St. Kliment Ohridski', 'https://www.uni-sofia.bg/', '', '', '', ''),
    u('Technical University of Sofia', 'https://www.tu-sofia.bg/', '', '', '', ''),
    u('University of National and World Economy', 'https://www.unwe.bg/', '', '', '', ''),
  ],
  BO: [
    u('Universidad Mayor de San Andr\u00e9s', '', '', '', '', ''),
    u('Universidad Mayor de San Sim\u00f3n UMSS', '', '', '', '', ''),
    u('Universidad T\u00e9cnica de Oruro', '', '', '', '', ''),
  ],
  BY: [
    u('Belarusian State University', 'https://bsu.by/', '', '', '', ''),
    u('Belarusian National Technical University', 'https://www.bntu.by/', '', '', '', ''),
    u('Yanka Kupala State University of Grodno', '', '', '', '', ''),
  ],
  CK: [
    u('University of the South Pacific Cook Islands centre', 'https://www.usp.ac.fj/', '', '', '', ''),
    u('Te Marae Ora Ministry health sciences training adjunct', '', '', '', '', ''),
    u('Regional hospitality / IT certificate institutes Rarotonga', '', '', '', '', ''),
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
  CU: [
    u('Universidad de La Habana', 'https://www.uh.cu/', '', '', '', ''),
    u('Universidad Tecnol\u00f3gica de La Habana Jos\u00e9 Antonio Echeverr\u00eda CUJAE', 'https://cujae.edu.cu/', '', '', '', ''),
    u('Instituto Superior de Ciencias Econ\u00f3micas y Administrativas', '', '', '', '', ''),
  ],
  CY: [
    u('University of Cyprus', 'https://www.ucy.ac.cy/', '', '', '', 'https://www.linkedin.com/school/university-of-cyprus/'),
    u('Cyprus University of Technology', 'https://www.cut.ac.cy/', '', '', '', ''),
    u('European University Cyprus', '', '', '', '', ''),
  ],
  CZ: [
    u('Charles University Prague', 'https://cuni.cz/', '', '', '', 'https://www.linkedin.com/school/charles-university/'),
    u('Czech Technical University in Prague', 'https://www.cvut.cz/', '', '', '', ''),
    u('University of Economics Prague V\u0160E', 'https://www.vse.cz/', '', '', '', ''),
  ],
  DM: [
    u('Dominica State College', '', '', '', '', ''),
    u('Regional UWI hybrid programmes liaison', '', 'helpdesk@open.uwi.edu', '', '', ''),
    u('ICT / electrical technician adjunct institutes', '', '', '', '', ''),
  ],
  DO: [
    u('Pontificia Universidad Cat\u00f3lica Madre y Maestra', 'https://www.pucmm.edu.do/', '', '', '', ''),
    u('Instituto Tecnol\u00f3gico de Santo Domingo INTEC', '', '', '', '', ''),
    u('Universidad Aut\u00f3noma de Santo Domingo', '', '', '', '', ''),
  ],
  EC: [
    u('Escuela Polit\u00e9cnica Nacional', 'https://www.epn.edu.ec/', '', '', '', ''),
    u('Pontificia Universidad Cat\u00f3lica del Ecuador', 'https://www.puce.edu.ec/', '', '', '', ''),
    u('Universidad de San Francisco de Quito USFQ', 'https://www.usfq.edu.ec/', '', '', '', ''),
  ],
  EE: [
    u('University of Tartu', 'https://www.ut.ee/', '', '', '', ''),
    u('TalTech Tallinn University of Technology', 'https://taltech.ee/', '', '', '', ''),
    u('University of Tallinn', '', '', '', '', ''),
  ],
  FJ: [
    u('The University of the South Pacific Laucala', 'https://www.usp.ac.fj/', '', '', '', ''),
    u('Fiji National University', 'https://www.fnu.ac.fj/', '', '', '', ''),
    u('Regional maritime / electrical technician institutes Suva', '', '', '', '', ''),
  ],
  FM: [
    u('College of Micronesia \u2014 FSM', '', '', '', '', ''),
    u('University of Guam extension / distance programmes liaison', '', '', '', '', ''),
    u('Regional public administration / accounting adjunct', '', '', '', '', ''),
  ],
  GD: [
    u('St. George\u2019s University', 'https://www.sgu.edu/', 'admissions@sgu.edu', '', '', ''),
    u('University of The West Indies \u2014 Grenada liaison', 'https://www.open.uwi.edu/', '', '', '', ''),
    u('T.A. Marryshow Community College', '', '', '', '', ''),
  ],
  GE: [
    u('Tbilisi State University', '', '', '', '', ''),
    u('Georgian Institute of Technology Tbilisi', '', '', '', '', ''),
    u('Free University Tbilisi business / CS adjunct', '', '', '', '', ''),
  ],
  GR: [
    u('National Technical University of Athens NTUA', 'https://www.ntua.gr/', '', '', '', ''),
    u('University of Thessaloniki Aristotle AUTh', '', '', '', '', ''),
    u('Athens University of Economics and Business', '', '', '', '', ''),
  ],
  GY: [
    u('University of Guyana Turkeyen', 'https://www.uog.edu.gy/', 'registrar.office@uog.edu.gy', '', '', ''),
    u('Guyana Technical Institute \u2014 electrical adjunct', '', '', '', '', ''),
    u('Regional agribusiness / accounting certificate streams', '', '', '', '', ''),
  ],
  HN: [
    u('Universidad Nacional Aut\u00f3noma de Honduras', '', '', '', '', ''),
    u('Universidad Tecnol\u00f3gica Centroamericana UNITEC', '', '', '', '', ''),
    u('Zamorano Pan-American Agricultural School liaison Honduras', '', '', '', '', ''),
  ],
  HR: [
    u('University of Zagreb', 'https://www.unizg.hr/', '', '', '', ''),
    u('University of Split', 'https://www.unist.hr/', '', '', '', ''),
    u('Faculty of Electrical Engineering and Computing Zagreb', 'https://www.fer.unizg.hr/', '', '', '', ''),
  ],
  HU: [
    u('E\u00f6tv\u00f6s Lor\u00e1nd University', 'https://www.elte.hu/', '', '', '', ''),
    u('Budapest University of Technology and Economics', 'https://www.bme.hu/', '', '', '', ''),
    u('Corvinus University Budapest', '', '', '', '', ''),
  ],
  IR: [
    u('University of Tehran', 'https://ut.ac.ir/', '', '', '', ''),
    u('Sharif University of Technology', '', '', '', '', ''),
    u('Amirkabir University of Technology Tehran Polytechnic', '', '', '', '', ''),
  ],
  IT: [
    u('Politecnico di Milano', 'https://www.polimi.it/', '', '', '', 'https://www.linkedin.com/school/politecnico-di-milano/'),
    u('Bocconi University', 'https://www.unibocconi.eu/', '', '', '', 'https://www.linkedin.com/school/universit-bocconi/'),
    u('Sapienza University of Rome', 'https://www.uniroma1.it/', '', '', '', 'https://www.linkedin.com/school/sapienzauniversitadiroma/'),
  ],
  JM: [
    u('The University of the West Indies Mona', 'https://www.mona.uwi.edu/', 'helpdesk@uwi.edu.jm', '', '', ''),
    u('University of Technology Jamaica', 'https://www.utech.edu.jm/', '', '', '', ''),
    u('University of the Commonwealth Caribbean', '', '', '', '', ''),
  ],
  KG: [
    u('American University of Central Asia', '', '', '', '', ''),
    u('Kyrgyz National University Jusup Balasagyn', '', '', '', '', ''),
    u('Kyrgyz State Technical University', '', '', '', '', ''),
  ],
  KI: [
    u('University of the South Pacific Kiribati campus', 'https://www.usp.ac.fj/', '', '', '', ''),
    u('Kiribati Institute of Technology', '', '', '', '', ''),
    u('Regional fisheries economics certificate adjunct', '', '', '', '', ''),
  ],
  KZ: [
    u('Al-Farabi Kazakh National University', 'https://www.kaznu.kz/', '', '', '', ''),
    u('Nazarbayev University', 'https://nu.edu.kz/', '', '', '', ''),
    u('Kazakh National Technical University Satpayev', '', '', '', '', ''),
  ],
  LK: [
    u('University of Colombo', 'https://cmb.ac.lk/', '', '', '', ''),
    u('University of Moratuwa', 'https://uom.lk/', '', '', '', ''),
    u('University of Peradeniya', '', '', '', '', ''),
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
  LV: [
    u('University of Latvia', 'https://www.lu.lv/', '', '', '', ''),
    u('Riga Technical University RTU', 'https://www.rtu.lv/', '', '', '', ''),
    u('Stockholm School of Economics in Riga partner adjunct programmes', '', '', '', '', ''),
  ],
  MD: [
    u('Technical University of Moldova', '', '', '', '', ''),
    u('Alecu Russo Balti State University', '', '', '', '', ''),
    u('Regional economics / agronomy adjunct faculties', '', '', '', '', ''),
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
  MN: [
    u('National University of Mongolia', '', '', '', '', ''),
    u('Mongolian University of Science and Technology', '', '', '', '', ''),
    u('Mongolia International University', '', '', '', '', ''),
  ],
  MT: [
    u('University of Malta', 'https://www.um.edu.mt/', '', '', '', ''),
    u('Malta College of Arts Science and Technology MCAST', '', '', '', '', ''),
    u('Junior College adjunct accounting courses', '', '', '', '', ''),
  ],
  MV: [
    u('Maldives National University', 'https://www.mnu.edu.mv/', '', '', '', ''),
    u('Cyryx College business / computing adjunct', '', '', '', '', ''),
    u('Regional hospitality finance certificate institutes', '', '', '', '', ''),
  ],
  NI: [
    u('Universidad Nacional Aut\u00f3noma de Nicaragua', '', '', '', '', ''),
    u('Universidad Centroamericana UCA Nicaragua', '', '', '', '', ''),
    u('National Engineering University UNI Nicaragua', '', '', '', '', ''),
  ],
  NP: [
    u('Tribhuvan University Kirtipur', 'https://tribhuvan-university.edu.np/', '', '', '', ''),
    u('Kathmandu University', 'https://www.ku.edu.np/', '', '', '', ''),
    u('Pokhara University', '', '', '', '', ''),
  ],
  NU: [
    u('University of the South Pacific Niue centre', 'https://www.usp.ac.fj/', '', '', '', ''),
    u('Regional teacher education / finance adjunct', '', '', '', '', ''),
    u('Open learning economics modules via USP', '', '', '', '', ''),
  ],
  PA: [
    u('University of Panama', 'https://www.up.ac.pa/', '', '', '', ''),
    u('Technological University of Panama', 'https://www.utp.ac.pa/', '', '', '', ''),
    u('INCAE Business School Costa Rica / Panama executive programmes', '', '', '', '', ''),
  ],
  PK: [
    u('Lahore University of Management Sciences LUMS', 'https://lums.edu.pk/', '', '', '', ''),
    u('National University of Sciences and Technology NUST', 'https://nust.edu.pk/', '', '', '', ''),
    u('Quaid-i-Azam University Islamabad', 'https://qau.edu.pk/', '', '', '', ''),
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
  RS: [
    u('University of Belgrade', 'https://www.bg.ac.rs/', '', '', '', ''),
    u('University of Novi Sad', '', '', '', '', ''),
    u('Faculty of Technical Sciences Novi Sad', '', '', '', '', ''),
  ],
  SB: [
    u('Solomon Islands National University', '', '', '', '', ''),
    u('University of the South Pacific Solomon Islands campus', 'https://www.usp.ac.fj/', '', '', '', ''),
    u('Regional technician / finance adjunct Honiara', '', '', '', '', ''),
  ],
  SI: [
    u('University of Ljubljana', 'https://www.uni-lj.si/', '', '', '', ''),
    u('University of Maribor', '', '', '', '', ''),
    u('Regional electrical engineering faculties adjunct Ljubljana', '', '', '', '', ''),
  ],
  SK: [
    u('Comenius University in Bratislava', 'https://uniba.sk/', '', '', '', ''),
    u('Slovak University of Technology Bratislava', '', '', '', '', ''),
    u('University of Economics Bratislava', '', '', '', '', ''),
  ],
  SR: [
    u('University of Applied Science and Arts Suriname HBO', '', '', '', '', ''),
    u('Anton de Kom University of Suriname', '', '', '', '', ''),
    u('Regional computing / accounting technician institutes', '', '', '', '', ''),
  ],
  SV: [
    u('Universidad de El Salvador', 'https://www.ues.edu.sv/', '', '', '', ''),
    u('Universidad Centroamericana Jos\u00e9 Sime\u00f3n Ca\u00f1as UCA', 'https://www.uca.edu.sv/', '', '', '', ''),
    u('Universidad Tecnol\u00f3gica de El Salvador', '', '', '', '', ''),
  ],
  TJ: [
    u('Tajik National University', '', '', '', '', ''),
    u('Technological University of Tajikistan', '', '', '', '', ''),
    u('Russian-Tajik Slavic University', '', '', '', '', ''),
  ],
  TM: [
    u('Magtymguly Turkmen State University', '', '', '', '', ''),
    u('Turkmen State Institute of Architecture and Construction', '', '', '', '', ''),
    u('Regional oil / gas engineering adjunct institutes', '', '', '', '', ''),
  ],
  TO: [
    u('University of the South Pacific Tonga campus', 'https://www.usp.ac.fj/', '', '', '', ''),
    u('Tonga Institute of Higher Education', '', '', '', '', ''),
    u('Regional economics technician adjunct', '', '', '', '', ''),
  ],
  TR: [
    u('Istanbul Technical University ITU', 'https://www.itu.edu.tr/', '', '', '', ''),
    u('Middle East Technical University METU', 'https://www.metu.edu.tr/', '', '', '', ''),
    u('Bo\u011fazi\u00e7i University', '', '', '', '', ''),
  ],
  TT: [
    u('University of the West Indies St. Augustine campus', 'https://sta.uwi.edu/', 'helpdesk@open.uwi.edu', '', '', ''),
    u('University of Trinidad and Tobago', 'https://utt.edu.tt/', '', '', '', ''),
    u('University of the Southern Caribbean', '', '', '', '', ''),
  ],
  UA: [
    u('Taras Shevchenko National University Kyiv', 'https://knu.ua/', '', '', '', ''),
    u('Igor Sikorsky Kyiv Polytechnic Institute', '', '', '', '', ''),
    u('Kyiv School of Economics', '', '', '', '', ''),
  ],
  UY: [
    u('Universidad de la Rep\u00fablica Uruguay', 'https://udelar.edu.uy/', '', '', '', ''),
    u('Universidad ORT Uruguay', 'https://www.ort.edu.uy/', 'info@ort.edu.uy', '', '', ''),
    u('Universidad Cat\u00f3lica del Uruguay', 'https://www.ucu.edu.uy/', '', '', '', ''),
  ],
  UZ: [
    u('Tashkent State University of Economics', '', '', '', '', ''),
    u('Tashkent Institute of Chemical Technology', '', '', '', '', ''),
    u('Webster University Tashkent campus', '', '', '', '', ''),
  ],
  VE: [
    u('Universidad Central de Venezuela', 'https://www.ucv.ve/', '', '', '', ''),
    u('Universidad Sim\u00f3n Bol\u00edvar', 'https://www.usb.ve/', '', '', '', ''),
    u('Universidad Metropolitana', 'https://www.unimet.edu.ve/', '', '', '', ''),
  ],
  VU: [
    u('University of the South Pacific Emalus Vanuatu', 'https://www.usp.ac.fj/', '', '', '', ''),
    u('Vanuatu Institute of Technology', '', '', '', '', ''),
    u('Regional agribusiness / computing certificate streams', '', '', '', '', ''),
  ],
  WS: [
    u('National University of Samoa', '', '', '', '', ''),
    u('University of the South Pacific Samoa campus', 'https://www.usp.ac.fj/', '', '', '', ''),
    u('Regional accounting / ICT certificate adjunct', '', '', '', '', ''),
  ],
}

/** Layer order — earlier wins (participant-specific overrides broad alliance maps). */
const LAYERS: ReadonlyArray<Partial<Record<string, Triple>>> = [
  BRI_LOCAL,
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
  throw new Error(`beltAndRoadInitiative/notableUniversitiesByIso: missing triple for ISO ${iso}`)
}

/** Three notable BRI-participant universities per ISO (merged from alliance maps + local participants — informational). */
export const BRI_NOTABLE_UNIVERSITIES = Object.fromEntries(
  BELT_AND_ROAD_PARTICIPANT_ISO_CODES.map((iso) => [iso, pick(iso)]),
) as Record<(typeof BELT_AND_ROAD_PARTICIPANT_ISO_CODES)[number], Triple>
