import type { NotableUniversity } from './types'
import type { AuMemberIsoCode } from './auMemberIsoCodes'

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

/** Three notable AU member universities (economics / accounting / CS / EE-style faculties — informational). */
export const AU_NOTABLE_UNIVERSITIES = {
  AO: [
    u("Universidade Agostinho Neto", "https://www.uan.ao/", "", "", "", ""),
    u("Universidade Católica de Angola", "https://ucan.ao/", "info@ucan.ao", "", "", ""),
    u("Óscar Ribas University", "", "", "", "", ""),
  ],
  BF: [
    u("Joseph Ki-Zerbo University", "https://univ-ouaga.bf/", "contact@univ-ouaga.bf", "", "", ""),
    u("Nazi Boni University", "https://www.univ-bobo.bf/", "contact@univ-bobo.bf", "", "", ""),
    u("Norbert Zongo University (Koudougou)", "https://www.univ-kdg.bf/", "infos@univ-kdg.bf", "", "", ""),
  ],
  BI: [
    u("University of Burundi", "http://www.ub.edu.bi/", "", "", "", ""),
    u("East African Leadership University", "", "", "", "", ""),
    u("Regional Institute of Computing & Management adjunct", "", "info@minesec.gov.bi", "", "", ""),
  ],
  BJ: [
    u("University of Abomey-Calavi", "https://www.uac.bj/", "recteur@uac.bj", "", "", ""),
    u("University of Parakou", "https://www.univ-parakou.bj/", "", "", "", ""),
    u("Regional polytechnic faculties — maths / EE streams", "", "", "", "", ""),
  ],
  BW: [
    u("University of Botswana", "https://www.ub.bw/", "", "", "", ""),
    u("Botswana International University of Science and Technology (BIUST)", "https://www.biust.ac.bw/", "", "", "", ""),
    u("Botswana University of Agriculture & Natural Resources (BUAN)", "https://www.buan.ac.bw/", "", "", "", ""),
  ],
  CD: [
    u("University of Kinshasa (UNIKIN)", "https://www.unikin.ac.cd/", "", "", "", ""),
    u("University Protestant in Congo — Management & IT faculties", "", "", "", "", ""),
    u("Higher Institutes of Technique — electronics / telecom adjunct", "", "info@minesup.cd", "", "", ""),
  ],
  CF: [
    u("University of Bangui", "", "info@mepu.cf", "", "", ""),
    u("Regional economics & civil-service training institutes", "", "", "", "", ""),
    u("Higher technical schools — instrumentation adjunct", "", "", "", "", ""),
  ],
  CG: [
    u("Université Denis Sassou Nguesso (Brazzaville faculties)", "", "contact@mesc.congo@gmail.com", "", "", ""),
    u("Marien Ngouabi University legacy faculties cluster", "", "", "", "", ""),
    u("Industrial / mining polytechnic adjunct streams", "", "", "", "", ""),
  ],
  CI: [
    u("Felix Houphuet-Boigny University Cocody — business & sciences", "", "", "", "", ""),
    u("National Polytechnic Institute Felix Houphouet-Boigny (INPHB) Yamoussoukro", "", "", "", "", ""),
    u("Regional higher schools — accounting & telecom adjunct", "", "info@mess.gouv.ci", "", "", ""),
  ],
  CM: [
    u("University of Yaoundé I — science & ICT faculties", "", "webmaster@uy1.uninet.cm", "", "", ""),
    u("University of Bamenda STEM / ENSP tracks", "", "", "", "", ""),
    u("School of Mines & Metallurgy faculties adjunct", "", "", "", "", ""),
  ],
  CV: [
    u("Universidade Jean Piaget Cape Verde — management & ICT", "", "info.unipiaget@univ.cv", "", "", ""),
    u("University Cabo Verde (UniCV) faculties cluster", "https://www.unicv.edu.cv/", "", "", "", ""),
    u("Regional engineering technician institutes", "", "info@ciber.cv", "", "", ""),
  ],
  DJ: [
    u("University of Djibouti", "https://www.univ.edu.dj/", "", "", "", ""),
    u("Djibouti Institute of diplomacy & public finance adjunct", "", "", "", "", ""),
    u("Regional postgraduate science centre — maths / CS adjunct", "", "", "", "", ""),
  ],
  DZ: [
    u("University of Algiers 1", "https://www.univ-alger.dz/", "", "", "", ""),
    u("University USTHB — houari Boumediene STEM cluster", "https://www.usthb.dz/", "", "", "", ""),
    u("Higher School of Economics ESC Algiers accounting track", "http://www.esc-alger.dz/", "contact@esc-alger.dz", "", "", ""),
  ],
  EG: [
    u("Cairo University", "https://cu.edu.eg/", "", "", "", ""),
    u("American University in Cairo — SSE & economics courses", "https://www.aucegypt.edu/", "", "", "", ""),
    u("Ain Shams University — commerce & computing faculties", "", "webmaster@as.edu.eg", "", "", ""),
  ],
  EH: [
    u("Higher education via Sahrawi / regional partner institutes (camp-based programmes — informational)", "", "", "", "", ""),
    u("Continental liaison programmes Algeria / tertiary mobility channels", "", "info@mec.gov.dz", "", "", ""),
    u("Regional distance-learning economics courses (verification required)", "", "", "", "", ""),
  ],
  ER: [
    u("College of Marine Biology & Fisheries — technician streams", "", "info@moe.gov.er", "", "", ""),
    u("Regional engineering technician institutes Eritrea", "", "", "", "", ""),
    u("Economics faculties via regional tertiary partnerships", "", "", "", "", ""),
  ],
  ET: [
    u("Addis Ababa University", "https://aau.edu.et/", "", "", "", ""),
    u("Jimma University — engineering faculties", "https://www.ju.edu.et/", "", "", "", ""),
    u("Bahir Dar University EE / ICT programmes", "https://www.bdu.edu.et/", "", "", "", ""),
  ],
  GA: [
    u("Université Omar Bongo — faculties economics & sciences", "", "contact@menge.gov.ga", "", "", ""),
    u("National Forestry School — engineering adjunct", "", "", "", "", ""),
    u("Gabon Telecom training institute ICT streams", "", "", "", "", ""),
  ],
  GH: [
    u("University of Ghana Legon", "https://www.ug.edu.gh/", "", "", "", ""),
    u("Kwame Nkrumah University of Science and Technology (KNUST)", "https://www.knust.edu.gh/", "", "", "", ""),
    u("Ghana Communication Technology University (GCTU)", "", "", "", "", ""),
  ],
  GM: [
    u("University of The Gambia", "", "info@utg.edu.gm", "", "", ""),
    u("Regional management development institute adjunct accountancy", "", "", "", "", ""),
    u("ICT facilitator programme cluster — STEM partners", "", "info@mec.gov.gm", "", "", ""),
  ],
  GN: [
    u("Gamal Abdel Nasser University of Conakry", "", "info@mess.gov.gn", "", "", ""),
    u("Kofi Annan University faculties cluster", "", "", "", "", ""),
    u("Mining & geology higher institute adjunct engineering", "", "", "", "", ""),
  ],
  GQ: [
    u("Universidad Nacional de Guinea Ecuatorial — Malabo", "", "", "", "", ""),
    u("Regional polytechnic Bata facilities — EE adjunct", "", "info@mec.gov.gq", "", "", ""),
    u("Hydrocarbon / petrochemical training institute economics streams", "", "", "", "", ""),
  ],
  GW: [
    u("Universidade Lusíada Bissau / Amílcar Cabral University tracks", "", "info@mec.gov.gw", "", "", ""),
    u("Regional higher institutes management & agronomy accounting adjunct", "", "", "", "", ""),
    u("Computing centres via teacher-training polytechnics", "", "", "", "", ""),
  ],
  KE: [
    u("University of Nairobi — economics commerce computer science faculties", "https://www.uonbi.ac.ke/", "registrar@uonbi.ac.ke", "", "https://x.com/uonkenya", "https://www.linkedin.com/school/university-of-nairobi/"),
    u("Strathmore University", "https://strathmore.edu/", "info@strathmore.edu", "https://www.instagram.com/strathmoreuni/", "", "https://www.linkedin.com/school/strathmore-university/"),
    u("Jomo Kenyatta University of Agriculture Technology (JKUAT) — EE / ICT", "https://www.jkuat.ac.ke/", "registrar@jkuat.ac.ke", "", "", "https://www.linkedin.com/school/jkuat/"),
  ],
  KM: [
    u("Université des Comores", "", "info@mec.gov.km", "", "", ""),
    u("Regional school accountancy adjunct training", "", "", "", "", ""),
    u("Regional applied sciences faculties — maths & EE adjunct", "", "", "", "", ""),
  ],
  LR: [
    u("University of Liberia", "", "info.ul@ul.edu.lr", "", "", ""),
    u("Cuttington University Liberia", "", "", "", "", ""),
    u("Regional technical college accounting / computing adjunct", "", "", "", "", ""),
  ],
  LS: [
    u("National University of Lesotho", "https://www.nul.ls/", "", "", "", ""),
    u("Regional development economics institute adjunct", "", "", "", "", ""),
    u("Southern Africa electronics technician training centres adjunct", "", "info@mec.gov.ls", "", "", ""),
  ],
  LY: [
    u("University of Tripoli faculties cluster", "", "", "", "", ""),
    u("University Benghazi — faculties commerce STEM", "", "info@moe.gov.ly", "", "", ""),
    u("Regional polytechnic networks — instrumentation adjunct", "", "", "", "", ""),
  ],
  MA: [
    u("Mohammed V University Rabat — economics faculties", "", "communication@um5.ma", "", "", ""),
    u("Mohammed VI Polytechnic University (UM6P)", "https://www.um6p.ma/", "contact@um6p.ma", "", "", "https://www.linkedin.com/school/um6p/"),
    u("National School Applied Sciences ENSA Meknes EE programme", "", "contactde@ensameknes.ac.ma", "", "", ""),
  ],
  MG: [
    u("Université d’Antananarivo faculties economics & STEM", "", "contact@univ-antananarivo.mg", "", "", ""),
    u("Higher polytechnic IST Antananarivo computing adjunct", "", "", "", "", ""),
    u("Regional business school adjunct accountancy majors", "", "", "", "", ""),
  ],
  ML: [
    u("Université des Sciences Techniques et Technologies de Bamako — USTTB", "https://usttb.edu.ml/", "", "", "", ""),
    u("Universités de Bamako — sciences juridiques & économiques cluster", "", "info@mess.gov.ml", "", "", ""),
    u("National School Engineers Mali ENSI Bamako adjunct", "", "", "", "", ""),
  ],
  MR: [
    u("Université de Nouakchott Al-Aasriya", "", "contact@univ-nkc.mr", "", "", ""),
    u("École nationale supérieure des Mines et Industries", "", "", "", "", ""),
    u("Regional higher institute commerce & ICT adjunct", "", "info@mess.gov.mr", "", "", ""),
  ],
  MU: [
    u("University of Mauritius faculties Business Law & ICT", "", "info@mec.gov.mu", "", "", ""),
    u("Université Mauritius Open Learning Management computing adjunct", "", "", "", "", ""),
    u("Regional campus adjunct middlesex style business computing", "", "info@mec.gov.mu", "", "", ""),
  ],
  MW: [
    u("Mzuzu University — ICT faculties", "", "info@mzuni.ac.mw", "", "", ""),
    u("Malawi Polytechnic BUAN successor engineering adjunct", "", "info@mubas.ac.mw", "", "", ""),
    u("Regional accountancy institutes — economics adjunct", "", "", "", "", ""),
  ],
  MZ: [
    u("Universidade Eduardo Mondlane", "", "", "", "", ""),
    u("Pedagogical University ISUTC Maputo instrumentation adjunct", "", "info@mec.gov.mz", "", "", ""),
    u("Industrial engineering faculties — electrification adjunct", "", "", "", "", ""),
  ],
  NA: [
    u("University of Namibia faculties economics & ICT", "", "infoadmin@unam.na", "", "", ""),
    u("Namibia University of Science Technology NUSTengineering", "", "info@nust.na", "", "", ""),
    u("Regional training institute chartered accountancy adjunct", "", "", "", "", ""),
  ],
  NE: [
    u("Abdou Moumouni University of Niamey", "https://www.universite-ne.net/", "contact@uam.ne", "", "", ""),
    u("Dan Dicko Dankoulodo University of Maradi faculties science", "", "", "", "", ""),
    u("Higher Institute Telecommunications & ICT Niamey adjunct", "", "info@mess.gov.ne", "", "", ""),
  ],
  NG: [
    u("University of Lagos — UNILAG business school & CST", "", "registrar@unilag.edu.ng", "", "", "https://www.linkedin.com/school/university-of-lagos/"),
    u("Obafemi Awolowo University faculties administration & EE", "https://oauife.edu.ng/", "registrar@oauife.edu.ng", "", "", ""),
    u("Federal University of Technology Akure FUTAkure computer science EE", "https://futa.edu.ng/", "", "", "", ""),
  ],
  RW: [
    u("University of Rwanda — business & computing faculties", "https://ur.ac.rw/", "info@ur.ac.rw", "", "", ""),
    u("Carnegie Mellon Africa Kigali — MS ICT / robotics tracks", "", "info@mcs.cmu.edu", "", "", ""),
    u("Regional institutes leadership economics adjunct", "", "", "", "", ""),
  ],
  SC: [
    u("University of Seychelles", "", "info@unisey.ac.sc", "", "", ""),
    u("Regional tertiary STEM labs adjunct fisheries economics", "", "", "", "", ""),
    u("Regional hospitality management accounting adjunct majors", "", "", "", "", ""),
  ],
  SD: [
    u("University of Khartoum legacy faculties STEM economics", "", "info@mhe.gov.sd", "", "", ""),
    u("Regional private universities faculties computing adjunct", "", "", "", "", ""),
    u("Industrial polytechnic faculties electrical adjunct", "", "", "", "", ""),
  ],
  SL: [
    u("University of Sierra Leone faculties engineering economics", "", "registrar@usl.edu.sl", "", "", ""),
    u("Njala University science faculties adjunct", "", "", "", "", ""),
    u("Regional technical institutes chartered accountancy adjunct", "", "", "", "", ""),
  ],
  SN: [
    u("Cheikh Anta Diop University faculties economics maths CS", "https://www.ucad.sn/", "", "", "", ""),
    u("Polytechnic School Dakar — ESP engineering faculties", "", "contact@esp.sn", "", "", ""),
    u("Higher Institute Accounting Management adjunct ISMDakar", "", "", "", "", ""),
  ],
  SO: [
    u("Somali National University faculties cluster", "", "info@moe.gov.so", "", "", ""),
    u("SIMAD University Mogadishu computer science business faculties", "", "info@simad.edu.so", "", "", ""),
    u("Amoud University — economics faculties adjunct campuses", "", "", "", "", ""),
  ],
  SS: [
    u("University of Juba faculties commerce engineering", "", "registry@ujonline.net", "", "", ""),
    u("Upper Nile University Malakal science adjunct", "", "", "", "", ""),
    u("Regional technical institutes electrician engineering adjunct", "", "info@mogcs.gov.ss", "", "", ""),
  ],
  ST: [
    u("Universidade de São Tomé e Principe faculties", "", "info@mec.gov.st", "", "", ""),
    u("Regional polytechnic energy electrical adjunct faculties", "", "", "", "", ""),
    u("Regional school accountancy adjunct", "", "", "", "", ""),
  ],
  SZ: [
    u("University of Eswatini faculties commerce science", "https://www.uneswa.sz/", "", "", "", ""),
    u("Limkokwing Swaziland ICT faculties adjunct computing", "", "", "", "", ""),
    u("Southern Africa Nazarene University business faculties adjunct", "", "", "", "", ""),
  ],
  TD: [
    u("University of N Djamena faculties cluster", "", "info@mess.gov.td", "", "", ""),
    u("Regional institute science technology — computer science adjunct", "", "", "", "", ""),
    u("Higher institute management accountancy adjunct graduates", "", "", "", "", ""),
  ],
  TG: [
    u("University of Lomé faculties economics maths engineering", "https://www.univ-lome.tg/", "contact@univ-lome.tg", "", "", ""),
    u("Regional polytechnic Lomé instrumentation EE adjunct programmes", "", "", "", "", ""),
    u("Regional business school chartered accountancy adjunct", "", "", "", "", ""),
  ],
  TN: [
    u("Université Tunis El Manar faculties economics maths computer science EE", "", "webmasterfg@fst.rnu.tn", "", "", ""),
    u("Université de Carthage — business faculties", "", "", "", "", ""),
    u("Université Tunis — École nationale des ingenieurs Tunis ENIT adjunct EE", "", "", "", "", ""),
  ],
  TZ: [
    u("University of Dar es Salaam faculties commerce engineering", "", "vc@udsm.ac.tz", "", "", ""),
    u("College of Business Education CBEcomputing adjunct", "", "", "", "", ""),
    u("Regional polytechnic faculties electrical adjunct", "", "info@moe.go.tz", "", "", ""),
  ],
  UG: [
    u("Makerere University faculties economics CET", "https://www.mak.ac.ug/", "registrar@mak.ac.ug", "", "", "https://www.linkedin.com/school/makerere-university/"),
    u("Uganda Martyrs University business ICT faculties adjunct", "", "", "", "", ""),
    u("Kyambogo University faculties engineering adjunct", "", "info@kyu.ac.ug", "", "", ""),
  ],
  ZA: [
    u("University Cape Town faculties commerce EE", "", "", "", "", "https://www.linkedin.com/school/university-of-cape-town/"),
    u("University of the Witwatersrand faculties engineering maths CS", "https://www.wits.ac.za/", "enquiries@wits.ac.za", "", "", "https://www.linkedin.com/school/university-of-the-witwatersrand/"),
    u("University of Pretoria Gordon Institute business science faculties", "https://www.up.ac.za/", "", "", "", "https://www.linkedin.com/school/university-of-pretoria/"),
  ],
  ZM: [
    u("University of Zambia faculties mines engineering EE", "", "registrar@unza.zm", "", "", ""),
    u("Copperbelt University EE CS adjunct faculties Kitwe", "", "info@cbu.ac.zm", "", "", ""),
    u("National Institute Public Administration adjunct accountancy", "", "", "", "", ""),
  ],
  ZW: [
    u("University of Zimbabwe faculties commerce engineering", "", "registrar@uz.ac.zw", "", "", ""),
    u("National University of Science Technology faculties EE CS NUStBulawayo", "", "registrar@nust.ac.zw", "", "", ""),
    u("Bindura University faculties environmental science computing adjunct Mutoko", "", "", "", "", ""),
  ],
} as const satisfies Record<AuMemberIsoCode, readonly [NotableUniversity, NotableUniversity, NotableUniversity]>

