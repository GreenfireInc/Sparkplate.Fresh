import type { NotableUniversity } from './types'
import { EU_MEMBER_ISO_CODES } from './euMemberIsoCodes'

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

/** All 27 EU member states with three notable universities each (informational). */
export const EU_NOTABLE_UNIVERSITIES: Record<(typeof EU_MEMBER_ISO_CODES)[number], Triple> = {
  AT: [
    u('University of Vienna', 'https://www.univie.ac.at/', '', '', '', ''),
    u('Vienna University of Technology TU Wien', 'https://www.tuwien.at/', '', '', '', ''),
    u('University of Economics and Business WU Vienna', 'https://www.wu.ac.at/', '', '', '', ''),
  ],
  BE: [
    u('KU Leuven', 'https://www.kuleuven.be/english/', 'study@kuleuven.be', '', '', 'https://www.linkedin.com/school/ku-leuven/'),
    u('Ghent University', 'https://www.ugent.be/en', 'studentenadministratie@ugent.be', '', '', 'https://www.linkedin.com/school/ghent-university/'),
    u('Universit\u00e9 libre de Bruxelles \u2014 Solvay Brussels School Economics & Management', 'https://www.ulb.be/', 'infos@ulb.be', '', '', 'https://www.linkedin.com/school/universite-libre-de-bruxelles/'),
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
  DK: [
    u('University of Copenhagen', 'https://www.ku.dk/', 'studadm@ku.dk', '', '', 'https://www.linkedin.com/school/university-of-copenhagen/'),
    u('Technical University of Denmark', 'https://www.dtu.dk/', 'studyline@dtu.dk', '', '', 'https://www.linkedin.com/school/dtu/'),
    u('Aarhus University', 'https://www.au.dk/', 'studieren@au.dk', '', '', 'https://www.linkedin.com/school/aarhus-university/'),
  ],
  EE: [
    u('University of Tartu', 'https://www.ut.ee/', '', '', '', ''),
    u('TalTech Tallinn University of Technology', 'https://taltech.ee/', '', '', '', ''),
    u('University of Tallinn', '', '', '', '', ''),
  ],
  FI: [
    u('University of Helsinki', 'https://www.helsinki.fi/', 'studyinfo@helsinki.fi', '', '', 'https://www.linkedin.com/school/university-of-helsinki/'),
    u('Aalto University', 'https://www.aalto.fi/', 'study@aalto.fi', '', '', 'https://www.linkedin.com/school/aalto-university/'),
    u('Tampere University', 'https://www.tuni.fi/', 'admissions@tuni.fi', '', '', ''),
  ],
  FR: [
    u('Paris-Saclay University', 'https://www.universite-paris-saclay.fr/', '', '', '', 'https://www.linkedin.com/school/universite-paris-saclay/'),
    u('Sorbonne University', 'https://www.sorbonne-universite.fr/', '', '', '', 'https://www.linkedin.com/school/sorbonne-universite/'),
    u('Sciences Po Paris', 'https://www.sciencespo.fr/', 'admissions@sciencespo.fr', '', '', 'https://www.linkedin.com/school/sciences-po/'),
  ],
  DE: [
    u('Technical University of Munich', 'https://www.tum.de/', 'studium@tum.de', '', '', 'https://www.linkedin.com/school/technical-university-of-munich/'),
    u('Ludwig Maximilian University of Munich', 'https://www.lmu.de/', 'studium@lmu.de', '', '', 'https://www.linkedin.com/school/ludwig-maximilians-universitat-munchen/'),
    u('University of Mannheim \u2014 Business School', 'https://www.uni-mannheim.de/', 'studium@uni-mannheim.de', '', '', 'https://www.linkedin.com/school/uni-mannheim/'),
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
  IE: [
    u('Trinity College Dublin', 'https://www.tcd.ie/', 'academic.registry@tcd.ie', '', '', 'https://www.linkedin.com/school/trinity-college-dublin/'),
    u('University College Dublin', 'https://www.ucd.ie/', 'international@ucd.ie', '', '', 'https://www.linkedin.com/school/university-college-dublin/'),
    u('University College Cork', 'https://www.ucc.ie/', 'studentinfo@ucc.ie', '', '', 'https://www.linkedin.com/school/university-college-cork/'),
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
  MT: [
    u('University of Malta', 'https://www.um.edu.mt/', '', '', '', ''),
    u('Malta College of Arts Science and Technology MCAST', '', '', '', '', ''),
    u('Junior College adjunct accounting courses', '', '', '', '', ''),
  ],
  NL: [
    u('Delft University of Technology', 'https://www.tudelft.nl/', 'study@tudelft.nl', '', '', 'https://www.linkedin.com/school/tudelft/'),
    u('University of Amsterdam', 'https://www.uva.nl/', 'education@uva.nl', '', '', 'https://www.linkedin.com/school/university-of-amsterdam/'),
    u('Erasmus University Rotterdam', 'https://www.eur.nl/', 'info@studentservice.eur.nl', '', '', 'https://www.linkedin.com/school/erasmus-university-rotterdam/'),
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
  ES: [
    u('Universidad Complutense de Madrid', 'https://www.ucm.es/', 'informacion@ucm.es', '', '', 'https://www.linkedin.com/school/universidad-complutense-de-madrid/'),
    u('Universitat de Barcelona', 'https://www.ub.edu/', 'seu.electronica@ub.edu', '', '', 'https://www.linkedin.com/school/universitat-de-barcelona/'),
    u('Universidad Aut\u00f3noma de Madrid', 'https://www.uam.es/', 'relaciones.internacionales@uam.es', '', '', ''),
  ],
  SE: [
    u('KTH Royal Institute of Technology', 'https://www.kth.se/', 'admissions@kth.se', '', '', 'https://www.linkedin.com/school/kth/'),
    u('Stockholm University', 'https://www.su.se/', 'study@su.se', '', '', 'https://www.linkedin.com/school/stockholm-university/'),
    u('Lund University', 'https://www.lunduniversity.lu.se/', 'study@sekretariat.lu.se', '', '', 'https://www.linkedin.com/school/lund-university/'),
  ],
}
