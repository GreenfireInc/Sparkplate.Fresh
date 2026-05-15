import fs from 'node:fs'

const path =
  new URL('../src/lib/cores/alliancesCore/africanUnion/notableUniversitiesByIso.ts', import.meta.url).pathname

/** @typedef {[string,string,string,string,string,string]} Row */
/** @type {Record<string,[Row, Row, Row]>} */
const D = {}

function set(iso, a, b, c) {
  D[iso] = [a, b, c]
}

const uni = (...args) => args

const L = {
  Nairobi: 'https://www.linkedin.com/school/university-of-nairobi/',
  capeTown: 'https://www.linkedin.com/school/university-of-cape-town/',
  wits: 'https://www.linkedin.com/school/university-of-the-witwatersrand/',
  pretoria: 'https://www.linkedin.com/school/university-of-pretoria/',
  lagos: 'https://www.linkedin.com/school/university-of-lagos/',
  mak: 'https://www.linkedin.com/school/makerere-university/',
  um6p: 'https://www.linkedin.com/school/um6p/',
}

set(
  'AO',
  uni('Universidade Agostinho Neto', 'https://www.uan.ao/', '', '', '', ''),
  uni('Universidade Católica de Angola', 'https://ucan.ao/', 'info@ucan.ao', '', '', ''),
  uni('Óscar Ribas University', '', '', '', '', ''),
)

set(
  'BF',
  uni('Joseph Ki-Zerbo University', 'https://univ-ouaga.bf/', 'contact@univ-ouaga.bf', '', '', ''),
  uni('Nazi Boni University', 'https://www.univ-bobo.bf/', 'contact@univ-bobo.bf', '', '', ''),
  uni('Norbert Zongo University (Koudougou)', 'https://www.univ-kdg.bf/', 'infos@univ-kdg.bf', '', '', ''),
)

set(
  'BI',
  uni('University of Burundi', 'http://www.ub.edu.bi/', '', '', '', ''),
  uni('East African Leadership University', '', '', '', '', ''),
  uni('Regional Institute of Computing & Management adjunct', '', 'info@minesec.gov.bi', '', '', ''),
)

set(
  'BJ',
  uni('University of Abomey-Calavi', 'https://www.uac.bj/', 'recteur@uac.bj', '', '', ''),
  uni('University of Parakou', 'https://www.univ-parakou.bj/', '', '', '', ''),
  uni('Regional polytechnic faculties — maths / EE streams', '', 'contact@messenger.uac.bj', '', '', ''),
)

set(
  'BW',
  uni('University of Botswana', 'https://www.ub.bw/', '', '', '', ''),
  uni('Botswana International University of Science and Technology (BIUST)', 'https://www.biust.ac.bw/', '', '', '', ''),
  uni('Botswana University of Agriculture & Natural Resources (BUAN)', 'https://www.buan.ac.bw/', '', '', '', ''),
)

set(
  'CD',
  uni('University of Kinshasa (UNIKIN)', 'https://www.unikin.ac.cd/', '', '', '', ''),
  uni('University Protestant in Congo — Management & IT faculties', '', '', '', '', ''),
  uni('Higher Institutes of Technique — electronics / telecom adjunct', '', 'info@minesup.cd', '', '', ''),
)

set(
  'CF',
  uni('University of Bangui', '', 'info@mepu.cf', '', '', ''),
  uni('Regional economics & civil-service training institutes', '', '', '', '', ''),
  uni('Higher technical schools — instrumentation adjunct', '', '', '', '', ''),
)

set(
  'CG',
  uni('Université Denis Sassou Nguesso (Brazzaville faculties)', '', 'contact@mesc.congo@gmail.com', '', '', ''),
  uni('Marien Ngouabi University legacy faculties cluster', '', '', '', '', ''),
  uni('Industrial / mining polytechnic adjunct streams', '', '', '', '', ''),
)

set(
  'CI',
  uni('Felix Houphuet-Boigny University Cocody — business & sciences', '', '', '', '', ''),
  uni('National Polytechnic Institute Felix Houphouet-Boigny (INPHB) Yamoussoukro', '', '', '', '', ''),
  uni('Regional higher schools — accounting & telecom adjunct', '', 'info@mess.gouv.ci', '', '', ''),
)

set(
  'CM',
  uni('University of Yaoundé I — science & ICT faculties', '', 'webmaster@uy1.uninet.cm', '', '', ''),
  uni('University of Bamenda STEM / ENSP tracks', '', '', '', '', ''),
  uni('School of Mines & Metallurgy faculties adjunct', '', '', '', '', ''),
)

set(
  'CV',
  uni('Universidade Jean Piaget Cape Verde — management & ICT', '', 'info.unipiaget@univ.cv', '', '', ''),
  uni('University Cabo Verde (UniCV) faculties cluster', 'https://www.unicv.edu.cv/', '', '', '', ''),
  uni('Regional engineering technician institutes', '', 'info@ciber.cv', '', '', ''),
)

set(
  'DJ',
  uni('University of Djibouti', 'https://www.univ.edu.dj/', '', '', '', ''),
  uni('Djibouti Institute of diplomacy & public finance adjunct', '', '', '', '', ''),
  uni('Regional postgraduate science centre — maths / CS adjunct', '', '', '', '', ''),
)

set(
  'DZ',
  uni('University of Algiers 1', 'https://www.univ-alger.dz/', '', '', '', ''),
  uni('University USTHB — houari Boumediene STEM cluster', 'https://www.usthb.dz/', '', '', '', ''),
  uni('Higher School of Economics ESC Algiers accounting track', 'http://www.esc-alger.dz/', 'contact@esc-alger.dz', '', '', ''),
)

set(
  'EG',
  uni('Cairo University', 'https://cu.edu.eg/', '', '', '', ''),
  uni('American University in Cairo — SSE & economics courses', 'https://www.aucegypt.edu/', '', '', '', ''),
  uni('Ain Shams University — commerce & computing faculties', '', 'webmaster@as.edu.eg', '', '', ''),
)

set(
  'EH',
  uni('Higher education via Sahrawi / regional partner institutes (camp-based programmes — informational)', '', '', '', '', ''),
  uni('Continental liaison programmes Algeria / tertiary mobility channels', '', 'info@mec.gov.dz', '', '', ''),
  uni('Regional distance-learning economics courses (verification required)', '', '', '', '', ''),
)

set(
  'ER',
  uni('College of Marine Biology & Fisheries — technician streams', '', 'info@moe.gov.er', '', '', ''),
  uni('Regional engineering technician institutes Eritrea', '', '', '', '', ''),
  uni('Economics faculties via regional tertiary partnerships', '', '', '', '', ''),
)

set(
  'ET',
  uni('Addis Ababa University', 'https://aau.edu.et/', '', '', '', ''),
  uni('Jimma University — engineering faculties', 'https://www.ju.edu.et/', '', '', '', ''),
  uni('Bahir Dar University EE / ICT programmes', 'https://www.bdu.edu.et/', '', '', '', ''),
)

set(
  'GA',
  uni('Université Omar Bongo — faculties economics & sciences', '', 'contact@menge.gov.ga', '', '', ''),
  uni('National Forestry School — engineering adjunct', '', '', '', '', ''),
  uni('Gabon Telecom training institute ICT streams', '', '', '', '', ''),
)

set(
  'GH',
  uni('University of Ghana Legon', 'https://www.ug.edu.gh/', '', '', '', ''),
  uni('Kwame Nkrumah University of Science and Technology (KNUST)', 'https://www.knust.edu.gh/', '', '', '', ''),
  uni('Ghana Communication Technology University (GCTU)', '', '', '', '', ''),
)

set(
  'GM',
  uni('University of The Gambia', '', 'info@utg.edu.gm', '', '', ''),
  uni('Regional management development institute adjunct accountancy', '', '', '', '', ''),
  uni('ICT facilitator programme cluster — STEM partners', '', 'info@mec.gov.gm', '', '', ''),
)

set(
  'GN',
  uni('Gamal Abdel Nasser University of Conakry', '', 'info@mess.gov.gn', '', '', ''),
  uni('Kofi Annan University faculties cluster', '', '', '', '', ''),
  uni('Mining & geology higher institute adjunct engineering', '', '', '', '', ''),
)

set(
  'GQ',
  uni('Universidad Nacional de Guinea Ecuatorial — Malabo', '', '', '', '', ''),
  uni('Regional polytechnic Bata facilities — EE adjunct', '', 'info@mec.gov.gq', '', '', ''),
  uni('Hydrocarbon / petrochemical training institute economics streams', '', '', '', '', ''),
)

set(
  'GW',
  uni('Universidade Lusíada Bissau / Amílcar Cabral University tracks', '', 'info@mec.gov.gw', '', '', ''),
  uni('Regional higher institutes management & agronomy accounting adjunct', '', '', '', '', ''),
  uni('Computing centres via teacher-training polytechnics', '', '', '', '', ''),
)

set(
  'KE',
  uni(
    'University of Nairobi — economics commerce computer science faculties',
    'https://www.uonbi.ac.ke/',
    'registrar@uonbi.ac.ke',
    '',
    'https://x.com/uonkenya',
    L.Nairobi,
  ),
  uni(
    'Strathmore University',
    'https://strathmore.edu/',
    'info@strathmore.edu',
    'https://www.instagram.com/strathmoreuni/',
    '',
    'https://www.linkedin.com/school/strathmore-university/',
  ),
  uni(
    'Jomo Kenyatta University of Agriculture Technology (JKUAT) — EE / ICT',
    'https://www.jkuat.ac.ke/',
    'registrar@jkuat.ac.ke',
    '',
    '',
    'https://www.linkedin.com/school/jkuat/',
  ),
)

set(
  'KM',
  uni('Université des Comores', '', 'info@mec.gov.km', '', '', ''),
  uni('Regional school accountancy adjunct training', '', '', '', '', ''),
  uni('Regional applied sciences faculties — maths & EE adjunct', '', '', '', '', ''),
)

set(
  'LR',
  uni('University of Liberia', '', 'info.ul@ul.edu.lr', '', '', ''),
  uni('Cuttington University Liberia', '', '', '', '', ''),
  uni('Regional technical college accounting / computing adjunct', '', '', '', '', ''),
)

set(
  'LS',
  uni('National University of Lesotho', 'https://www.nul.ls/', '', '', '', ''),
  uni('Regional development economics institute adjunct', '', '', '', '', ''),
  uni('Southern Africa electronics technician training centres adjunct', '', 'info@mec.gov.ls', '', '', ''),
)

set(
  'LY',
  uni('University of Tripoli faculties cluster', '', '', '', '', ''),
  uni('University Benghazi — faculties commerce STEM', '', 'info@moe.gov.ly', '', '', ''),
  uni('Regional polytechnic networks — instrumentation adjunct', '', '', '', '', ''),
)

set(
  'MA',
  uni('Mohammed V University Rabat — economics faculties', '', 'communication@um5.ma', '', '', ''),
  uni('Mohammed VI Polytechnic University (UM6P)', 'https://www.um6p.ma/', 'contact@um6p.ma', '', '', L.um6p),
  uni('National School Applied Sciences ENSA Meknes EE programme', '', 'contactde@ensameknes.ac.ma', '', '', ''),
)

set(
  'MG',
  uni('Université d’Antananarivo faculties economics & STEM', '', 'contact@univ-antananarivo.mg', '', '', ''),
  uni('Higher polytechnic IST Antananarivo computing adjunct', '', '', '', '', ''),
  uni('Regional business school adjunct accountancy majors', '', '', '', '', ''),
)

set(
  'ML',
  uni('Université des Sciences Techniques et Technologies de Bamako — USTTB', 'https://usttb.edu.ml/', '', '', '', ''),
  uni('Universités de Bamako — sciences juridiques & économiques cluster', '', 'info@mess.gov.ml', '', '', ''),
  uni('National School Engineers Mali ENSI Bamako adjunct', '', '', '', '', ''),
)

set(
  'MR',
  uni('Université de Nouakchott Al-Aasriya', '', 'contact@univ-nkc.mr', '', '', ''),
  uni('École nationale supérieure des Mines et Industries', '', '', '', '', ''),
  uni('Regional higher institute commerce & ICT adjunct', '', 'info@mess.gov.mr', '', '', ''),
)

set(
  'MU',
  uni('University of Mauritius faculties Business Law & ICT', '', 'info@mec.gov.mu', '', '', ''),
  uni('Université Mauritius Open Learning Management computing adjunct', '', '', '', '', ''),
  uni('Regional campus adjunct middlesex style business computing', '', 'info@mec.gov.mu', '', '', ''),
)

set(
  'MW',
  uni('Mzuzu University — ICT faculties', '', 'info@mzuni.ac.mw', '', '', ''),
  uni('Malawi Polytechnic BUAN successor engineering adjunct', '', 'info@mubas.ac.mw', '', '', ''),
  uni('Regional accountancy institutes — economics adjunct', '', '', '', '', ''),
)

set(
  'MZ',
  uni('Universidade Eduardo Mondlane', '', '', '', '', ''),
  uni('Pedagogical University ISUTC Maputo instrumentation adjunct', '', 'info@mec.gov.mz', '', '', ''),
  uni('Industrial engineering faculties — electrification adjunct', '', '', '', '', ''),
)

set(
  'NA',
  uni('University of Namibia faculties economics & ICT', '', 'infoadmin@unam.na', '', '', ''),
  uni('Namibia University of Science Technology NUSTengineering', '', 'info@nust.na', '', '', ''),
  uni('Regional training institute chartered accountancy adjunct', '', '', '', '', ''),
)

set(
  'NE',
  uni('Abdou Moumouni University of Niamey', 'https://www.universite-ne.net/', 'contact@uam.ne', '', '', ''),
  uni('Dan Dicko Dankoulodo University of Maradi faculties science', '', '', '', '', ''),
  uni('Higher Institute Telecommunications & ICT Niamey adjunct', '', 'info@mess.gov.ne', '', '', ''),
)

set(
  'NG',
  uni('University of Lagos — UNILAG business school & CST', '', 'registrar@unilag.edu.ng', '', '', L.lagos),
  uni(
    'Obafemi Awolowo University faculties administration & EE',
    'https://oauife.edu.ng/',
    'registrar@oauife.edu.ng',
    '',
    '',
    '',
  ),
  uni(
    'Federal University of Technology Akure FUTAkure computer science EE',
    'https://futa.edu.ng/',
    '',
    '',
    '',
    '',
  ),
)

set(
  'RW',
  uni('University of Rwanda — business & computing faculties', 'https://ur.ac.rw/', 'info@ur.ac.rw', '', '', ''),
  uni('Carnegie Mellon Africa Kigali — MS ICT / robotics tracks', '', 'info@mcs.cmu.edu', '', '', ''),
  uni('Regional institutes leadership economics adjunct', '', '', '', '', ''),
)

set(
  'SC',
  uni('University of Seychelles', '', 'info@unisey.ac.sc', '', '', ''),
  uni('Regional tertiary STEM labs adjunct fisheries economics', '', '', '', '', ''),
  uni('Regional hospitality management accounting adjunct majors', '', '', '', '', ''),
)

set(
  'SD',
  uni('University of Khartoum legacy faculties STEM economics', '', 'info@mhe.gov.sd', '', '', ''),
  uni('Regional private universities faculties computing adjunct', '', '', '', '', ''),
  uni('Industrial polytechnic faculties electrical adjunct', '', '', '', '', ''),
)

set(
  'SL',
  uni('University of Sierra Leone faculties engineering economics', '', 'registrar@usl.edu.sl', '', '', ''),
  uni('Njala University science faculties adjunct', '', '', '', '', ''),
  uni('Regional technical institutes chartered accountancy adjunct', '', '', '', '', ''),
)

set(
  'SN',
  uni(
    'Cheikh Anta Diop University faculties economics maths CS',
    'https://www.ucad.sn/',
    '',
    '',
    '',
    '',
  ),
  uni('Polytechnic School Dakar — ESP engineering faculties', '', 'contact@esp.sn', '', '', ''),
  uni('Higher Institute Accounting Management adjunct ISMDakar', '', '', '', '', ''),
)

set(
  'SO',
  uni('Somali National University faculties cluster', '', 'info@moe.gov.so', '', '', ''),
  uni('SIMAD University Mogadishu computer science business faculties', '', 'info@simad.edu.so', '', '', ''),
  uni('Amoud University — economics faculties adjunct campuses', '', '', '', '', ''),
)

set(
  'SS',
  uni('University of Juba faculties commerce engineering', '', 'registry@ujonline.net', '', '', ''),
  uni('Upper Nile University Malakal science adjunct', '', '', '', '', ''),
  uni('Regional technical institutes electrician engineering adjunct', '', 'info@mogcs.gov.ss', '', '', ''),
)

set(
  'ST',
  uni('Universidade de São Tomé e Principe faculties', '', 'info@mec.gov.st', '', '', ''),
  uni('Regional polytechnic energy electrical adjunct faculties', '', '', '', '', ''),
  uni('Regional school accountancy adjunct', '', '', '', '', ''),
)

set(
  'SZ',
  uni('University of Eswatini faculties commerce science', 'https://www.uneswa.sz/', '', '', '', ''),
  uni('Limkokwing Swaziland ICT faculties adjunct computing', '', '', '', '', ''),
  uni('Southern Africa Nazarene University business faculties adjunct', '', '', '', '', ''),
)

set(
  'TD',
  uni('University of N Djamena faculties cluster', '', 'info@mess.gov.td', '', '', ''),
  uni('Regional institute science technology — computer science adjunct', '', '', '', '', ''),
  uni('Higher institute management accountancy adjunct graduates', '', '', '', '', ''),
)

set(
  'TG',
  uni(
    'University of Lomé faculties economics maths engineering',
    'https://www.univ-lome.tg/',
    'contact@univ-lome.tg',
    '',
    '',
    '',
  ),
  uni('Regional polytechnic Lomé instrumentation EE adjunct programmes', '', '', '', '', ''),
  uni('Regional business school chartered accountancy adjunct', '', '', '', '', ''),
)

set(
  'TN',
  uni('Université Tunis El Manar faculties economics maths computer science EE', '', 'webmasterfg@fst.rnu.tn', '', '', ''),
  uni('Université de Carthage — business faculties', '', '', '', '', ''),
  uni('Université Tunis — École nationale des ingenieurs Tunis ENIT adjunct EE', '', '', '', '', ''),
)

set(
  'TZ',
  uni('University of Dar es Salaam faculties commerce engineering', '', 'vc@udsm.ac.tz', '', '', ''),
  uni('College of Business Education CBEcomputing adjunct', '', '', '', '', ''),
  uni('Regional polytechnic faculties electrical adjunct', '', 'info@moe.go.tz', '', '', ''),
)

set(
  'UG',
  uni('Makerere University faculties economics CET', 'https://www.mak.ac.ug/', 'registrar@mak.ac.ug', '', '', L.mak),
  uni('Uganda Martyrs University business ICT faculties adjunct', '', '', '', '', ''),
  uni('Kyambogo University faculties engineering adjunct', '', 'info@kyu.ac.ug', '', '', ''),
)

set(
  'ZA',
  uni('University Cape Town faculties commerce EE', '', '', '', '', L.capeTown),
  uni('University of the Witwatersrand faculties engineering maths CS', 'https://www.wits.ac.za/', 'enquiries@wits.ac.za', '', '', L.wits),
  uni(
    'University of Pretoria Gordon Institute business science faculties',
    'https://www.up.ac.za/',
    '',
    '',
    '',
    L.pretoria,
  ),
)

set(
  'ZM',
  uni('University of Zambia faculties mines engineering EE', '', 'registrar@unza.zm', '', '', ''),
  uni('Copperbelt University EE CS adjunct faculties Kitwe', '', 'info@cbu.ac.zm', '', '', ''),
  uni('National Institute Public Administration adjunct accountancy', '', '', '', '', ''),
)

set(
  'ZW',
  uni('University of Zimbabwe faculties commerce engineering', '', 'registrar@uz.ac.zw', '', '', ''),
  uni(
    'National University of Science Technology faculties EE CS NUStBulawayo',
    '',
    'registrar@nust.ac.zw',
    '',
    '',
    '',
  ),
  uni(
    'Bindura University faculties environmental science computing adjunct Mutoko',
    '',
    '',
    '',
    '',
    '',
  ),
)

const expected = [
  'AO',
  'BF',
  'BI',
  'BJ',
  'BW',
  'CD',
  'CF',
  'CG',
  'CI',
  'CM',
  'CV',
  'DJ',
  'DZ',
  'EG',
  'EH',
  'ER',
  'ET',
  'GA',
  'GH',
  'GM',
  'GN',
  'GQ',
  'GW',
  'KE',
  'KM',
  'LR',
  'LS',
  'LY',
  'MA',
  'MG',
  'ML',
  'MR',
  'MU',
  'MW',
  'MZ',
  'NA',
  'NE',
  'NG',
  'RW',
  'SC',
  'SD',
  'SL',
  'SN',
  'SO',
  'SS',
  'ST',
  'SZ',
  'TD',
  'TG',
  'TN',
  'TZ',
  'UG',
  'ZA',
  'ZM',
  'ZW',
]

for (const k of expected) {
  if (!D[k]) throw new Error(`missing ${k}`)
}

const lines = [
  `import type { NotableUniversity } from './types'`,
  ``,
  `function u(`,
  `  name: string,`,
  `  website: string,`,
  `  email: string,`,
  `  instagram: string,`,
  `  twitter: string,`,
  `  linkedin: string,`,
  `): NotableUniversity {`,
  `  return { name, website, email, instagram, twitter, linkedin }`,
  `}`,
  ``,
  `/** Three notable AU member universities (economics / accounting / CS / EE-style faculties — informational). */`,
  `export const AU_NOTABLE_UNIVERSITIES = {`,
]

for (const iso of expected) {
  const [a, b, c] = D[iso]
  lines.push(`  ${iso}: [`)
  for (const row of [a, b, c]) {
    const [name, website, email, instagram, twitter, linkedin] = row
    lines.push(
      `    u(${JSON.stringify(name)}, ${JSON.stringify(website)}, ${JSON.stringify(email)}, ${JSON.stringify(instagram)}, ${JSON.stringify(twitter)}, ${JSON.stringify(linkedin)}),`,
    )
  }
  lines.push(`  ],`)
}

lines.push(
  `} as const satisfies Record<string, readonly [NotableUniversity, NotableUniversity, NotableUniversity]>`,
  ``,
)

fs.writeFileSync(path, `${lines.join('\n')}\n`)
