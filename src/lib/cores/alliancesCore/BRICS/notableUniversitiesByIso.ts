import type { NotableUniversity } from './types'
import { BRICS_MEMBER_ISO_CODES } from './bricsMemberIsoCodes'
import { AU_NOTABLE_UNIVERSITIES } from '../africanUnion/notableUniversitiesByIso'
import { APEC_NOTABLE_UNIVERSITIES } from '../APEC/notableUniversitiesByIso'

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
const BRICS_LOCAL: Partial<Record<string, Triple>> = {
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
}

const LAYERS: ReadonlyArray<Partial<Record<string, Triple>>> = [
  BRICS_LOCAL,
  APEC_NOTABLE_UNIVERSITIES as unknown as Partial<Record<string, Triple>>,
  AU_NOTABLE_UNIVERSITIES as unknown as Partial<Record<string, Triple>>,
]

function pick(iso: string): Triple {
  for (const layer of LAYERS) {
    const row = layer[iso]
    if (row) return row
  }
  throw new Error(`BRICS/notableUniversitiesByIso: missing triple for ISO ${iso}`)
}

export const BRICS_NOTABLE_UNIVERSITIES = Object.fromEntries(
  BRICS_MEMBER_ISO_CODES.map((iso) => [iso, pick(iso)]),
) as Record<(typeof BRICS_MEMBER_ISO_CODES)[number], Triple>
