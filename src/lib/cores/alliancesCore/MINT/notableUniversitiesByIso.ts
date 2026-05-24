import type { NotableUniversity } from './types'
import { MINT_MEMBER_ISO_CODES } from './mintMemberIsoCodes'
import { AU_NOTABLE_UNIVERSITIES } from '../africanUnion/notableUniversitiesByIso'
import { APEC_NOTABLE_UNIVERSITIES } from '../APEC/notableUniversitiesByIso'
import { ASEAN_NOTABLE_UNIVERSITIES } from '../ASEAN/notableUniversitiesByIso'

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
const MINT_LOCAL: Partial<Record<string, Triple>> = {
  TR: [
    u('Istanbul Technical University ITU', 'https://www.itu.edu.tr/', '', '', '', ''),
    u('Middle East Technical University METU', 'https://www.metu.edu.tr/', '', '', '', ''),
    u('Bo\u011fazi\u00e7i University', '', '', '', '', ''),
  ],
}

const LAYERS: ReadonlyArray<Partial<Record<string, Triple>>> = [
  MINT_LOCAL,
  APEC_NOTABLE_UNIVERSITIES as unknown as Partial<Record<string, Triple>>,
  ASEAN_NOTABLE_UNIVERSITIES as unknown as Partial<Record<string, Triple>>,
  AU_NOTABLE_UNIVERSITIES as unknown as Partial<Record<string, Triple>>,
]

function pick(iso: string): Triple {
  for (const layer of LAYERS) {
    const row = layer[iso]
    if (row) return row
  }
  throw new Error(`MINT/notableUniversitiesByIso: missing triple for ISO ${iso}`)
}

/** Three notable universities per MINT member (merged maps — informational). */
export const MINT_NOTABLE_UNIVERSITIES = Object.fromEntries(
  MINT_MEMBER_ISO_CODES.map((iso) => [iso, pick(iso)]),
) as Record<(typeof MINT_MEMBER_ISO_CODES)[number], Triple>
