import type { NotableUniversity } from './types'
import { EU_MEMBER_ISO_CODES } from './euMemberIsoCodes'
import { REGIONAL_NOTABLE_UNIVERSITIES_SUPPLEMENT } from '../regionalNotableUniversitiesSupplement'

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

/** Member states covered by {@link REGIONAL_NOTABLE_UNIVERSITIES_SUPPLEMENT}; remaining EU economies below. */
const EU_MEMBER_SUPPLEMENTED: Partial<Record<string, Triple>> = {
  BE: [
    u(
      'KU Leuven',
      'https://www.kuleuven.be/english/',
      'study@kuleuven.be',
      '',
      '',
      'https://www.linkedin.com/school/ku-leuven/',
    ),
    u(
      'Ghent University',
      'https://www.ugent.be/en',
      'studentenadministratie@ugent.be',
      '',
      '',
      'https://www.linkedin.com/school/ghent-university/',
    ),
    u(
      'Université libre de Bruxelles — Solvay Brussels School Economics & Management',
      'https://www.ulb.be/',
      'infos@ulb.be',
      '',
      '',
      'https://www.linkedin.com/school/universite-libre-de-bruxelles/',
    ),
  ],
  DK: [
    u(
      'University of Copenhagen',
      'https://www.ku.dk/',
      'studadm@ku.dk',
      '',
      '',
      'https://www.linkedin.com/school/university-of-copenhagen/',
    ),
    u(
      'Technical University of Denmark',
      'https://www.dtu.dk/',
      'studyline@dtu.dk',
      '',
      '',
      'https://www.linkedin.com/school/dtu/',
    ),
    u(
      'Aarhus University',
      'https://www.au.dk/',
      'studieren@au.dk',
      '',
      '',
      'https://www.linkedin.com/school/aarhus-university/',
    ),
  ],
  FI: [
    u(
      'University of Helsinki',
      'https://www.helsinki.fi/',
      'studyinfo@helsinki.fi',
      '',
      '',
      'https://www.linkedin.com/school/university-of-helsinki/',
    ),
    u(
      'Aalto University',
      'https://www.aalto.fi/',
      'study@aalto.fi',
      '',
      '',
      'https://www.linkedin.com/school/aalto-university/',
    ),
    u(
      'Tampere University',
      'https://www.tuni.fi/',
      'admissions@tuni.fi',
      '',
      '',
      '',
    ),
  ],
  FR: [
    u(
      'Paris-Saclay University',
      'https://www.universite-paris-saclay.fr/',
      '',
      '',
      '',
      'https://www.linkedin.com/school/universite-paris-saclay/',
    ),
    u(
      'Sorbonne University',
      'https://www.sorbonne-universite.fr/',
      '',
      '',
      '',
      'https://www.linkedin.com/school/sorbonne-universite/',
    ),
    u(
      'Sciences Po Paris',
      'https://www.sciencespo.fr/',
      'admissions@sciencespo.fr',
      '',
      '',
      'https://www.linkedin.com/school/sciences-po/',
    ),
  ],
  DE: [
    u(
      'Technical University of Munich',
      'https://www.tum.de/',
      'studium@tum.de',
      '',
      '',
      'https://www.linkedin.com/school/technical-university-of-munich/',
    ),
    u(
      'Ludwig Maximilian University of Munich',
      'https://www.lmu.de/',
      'studium@lmu.de',
      '',
      '',
      'https://www.linkedin.com/school/ludwig-maximilians-universitat-munchen/',
    ),
    u(
      'University of Mannheim — Business School',
      'https://www.uni-mannheim.de/',
      'studium@uni-mannheim.de',
      '',
      '',
      'https://www.linkedin.com/school/uni-mannheim/',
    ),
  ],
  IE: [
    u(
      'Trinity College Dublin',
      'https://www.tcd.ie/',
      'academic.registry@tcd.ie',
      '',
      '',
      'https://www.linkedin.com/school/trinity-college-dublin/',
    ),
    u(
      'University College Dublin',
      'https://www.ucd.ie/',
      'international@ucd.ie',
      '',
      '',
      'https://www.linkedin.com/school/university-college-dublin/',
    ),
    u(
      'University College Cork',
      'https://www.ucc.ie/',
      'studentinfo@ucc.ie',
      '',
      '',
      'https://www.linkedin.com/school/university-college-cork/',
    ),
  ],
  NL: [
    u(
      'Delft University of Technology',
      'https://www.tudelft.nl/',
      'study@tudelft.nl',
      '',
      '',
      'https://www.linkedin.com/school/tudelft/',
    ),
    u(
      'University of Amsterdam',
      'https://www.uva.nl/',
      'education@uva.nl',
      '',
      '',
      'https://www.linkedin.com/school/university-of-amsterdam/',
    ),
    u(
      'Erasmus University Rotterdam',
      'https://www.eur.nl/',
      'info@studentservice.eur.nl',
      '',
      '',
      'https://www.linkedin.com/school/erasmus-university-rotterdam/',
    ),
  ],
  ES: [
    u(
      'Universidad Complutense de Madrid',
      'https://www.ucm.es/',
      'informacion@ucm.es',
      '',
      '',
      'https://www.linkedin.com/school/universidad-complutense-de-madrid/',
    ),
    u(
      'Universitat de Barcelona',
      'https://www.ub.edu/',
      'seu.electronica@ub.edu',
      '',
      '',
      'https://www.linkedin.com/school/universitat-de-barcelona/',
    ),
    u(
      'Universidad Autónoma de Madrid',
      'https://www.uam.es/',
      'relaciones.internacionales@uam.es',
      '',
      '',
      '',
    ),
  ],
  SE: [
    u(
      'KTH Royal Institute of Technology',
      'https://www.kth.se/',
      'admissions@kth.se',
      '',
      '',
      'https://www.linkedin.com/school/kth/',
    ),
    u(
      'Stockholm University',
      'https://www.su.se/',
      'study@su.se',
      '',
      '',
      'https://www.linkedin.com/school/stockholm-university/',
    ),
    u(
      'Lund University',
      'https://www.lunduniversity.lu.se/',
      'study@sekretariat.lu.se',
      '',
      '',
      'https://www.linkedin.com/school/lund-university/',
    ),
  ],
}

const REGIONAL =
  REGIONAL_NOTABLE_UNIVERSITIES_SUPPLEMENT as unknown as Partial<Record<string, Triple>>

function pick(iso: string): Triple {
  const local = EU_MEMBER_SUPPLEMENTED[iso]
  if (local) return local
  const reg = REGIONAL[iso]
  if (reg) return reg
  throw new Error(`EU/notableUniversitiesByIso: missing triple for ISO ${iso}`)
}

/** Three notable EU member-state universities — regional supplement + BE/DK/FI/FR/DE/IE/NL/ES/SE (informational). */
export const EU_NOTABLE_UNIVERSITIES = Object.fromEntries(
  EU_MEMBER_ISO_CODES.map((iso) => [iso, pick(iso)]),
) as Record<(typeof EU_MEMBER_ISO_CODES)[number], Triple>
