import type { NotableUniversity } from './types'
import { G20_SOVEREIGN_MEMBER_ISO_CODES } from './g20MemberIsoCodes'
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
const G20_LOCAL: Partial<Record<string, Triple>> = {
  AR: [
    u('Universidad de Buenos Aires', 'https://www.uba.ar/', '', '', '', 'https://www.linkedin.com/school/university-of-buenos-aires/'),
    u('Pontificia Universidad Cat\u00f3lica Argentina Santa Mar\u00eda de los Buenos Aires', 'https://www.uca.edu.ar/', '', '', '', ''),
    u('Universidad Nacional de C\u00f3rdoba', 'https://www.unc.edu.ar/', '', '', '', 'https://www.linkedin.com/school/universidad-nacional-de-cordoba/'),
  ],
  BR: [
    u('Universidade de S\u00e3o Paulo', 'https://www5.usp.br/', '', '', '', 'https://www.linkedin.com/school/universidade-de-sao-paulo/'),
    u('Universidade Estadual de Campinas (UNICAMP)', 'https://www.unicamp.br/', '', '', '', 'https://www.linkedin.com/school/universidade-estadual-de-campinas/'),
    u('Universidade Federal do Rio de Janeiro', 'https://ufrj.br/', '', '', '', 'https://www.linkedin.com/school/universidade-federal-do-rio-de-janeiro/'),
  ],
  IN: [
    u('Indian Institute of Technology Bombay', 'https://www.iitb.ac.in/', '', '', '', 'https://www.linkedin.com/school/indian-institute-of-technology-bombay/'),
    u('Indian Institute of Science Bangalore', 'https://iisc.ac.in/', '', '', '', 'https://www.linkedin.com/school/indian-institute-of-science/'),
    u('University of Delhi', 'https://www.du.ac.in/', '', '', '', 'https://www.linkedin.com/school/university-of-delhi/'),
  ],
  IT: [
    u('Politecnico di Milano', 'https://www.polimi.it/', '', '', '', 'https://www.linkedin.com/school/politecnico-di-milano/'),
    u('Bocconi University', 'https://www.unibocconi.eu/', '', '', '', 'https://www.linkedin.com/school/universit-bocconi/'),
    u('Sapienza University of Rome', 'https://www.uniroma1.it/', '', '', '', 'https://www.linkedin.com/school/sapienzauniversitadiroma/'),
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
  G20_LOCAL,
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
  throw new Error(`G20/notableUniversitiesByIso: missing triple for sovereign ISO ${iso}`)
}

/** Three notable universities per G20 sovereign member (merged maps — informational). */
export const G20_NOTABLE_UNIVERSITIES = Object.fromEntries(
  G20_SOVEREIGN_MEMBER_ISO_CODES.map((iso) => [iso, pick(iso)]),
) as Record<(typeof G20_SOVEREIGN_MEMBER_ISO_CODES)[number], Triple>

/**
 * Three notable universities per G20 institutional seat, sourced from each body's HQ economy
 * (EU → Brussels / Belgium triple; African Union → Addis Ababa / Ethiopia triple) — informational.
 */
export const G20_INSTITUTIONAL_NOTABLE_UNIVERSITIES = {
  EU: EU_NOTABLE_UNIVERSITIES['BE'] as Triple,
  AFRICAN_UNION: AU_NOTABLE_UNIVERSITIES['ET'] as unknown as Triple,
} as const
