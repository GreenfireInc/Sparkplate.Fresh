import type { NotableUniversity } from './types'
import { MIKTA_MEMBER_ISO_CODES } from './miktaMemberIsoCodes'
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
const MIKTA_LOCAL: Partial<Record<string, Triple>> = {
  TR: [
    u('Istanbul Technical University ITU', 'https://www.itu.edu.tr/', '', '', '', ''),
    u('Middle East Technical University METU', 'https://www.metu.edu.tr/', '', '', '', ''),
    u('Bo\u011fazi\u00e7i University', '', '', '', '', ''),
  ],
}

const LAYERS: ReadonlyArray<Partial<Record<string, Triple>>> = [
  MIKTA_LOCAL,
  APEC_NOTABLE_UNIVERSITIES as unknown as Partial<Record<string, Triple>>,
  ASEAN_NOTABLE_UNIVERSITIES as unknown as Partial<Record<string, Triple>>,
]

function pick(iso: string): Triple {
  for (const layer of LAYERS) {
    const row = layer[iso]
    if (row) return row
  }
  throw new Error(`MIKTA/notableUniversitiesByIso: missing triple for ISO ${iso}`)
}

/** Three notable universities per MIKTA member (merged maps — informational). */
export const MIKTA_NOTABLE_UNIVERSITIES = Object.fromEntries(
  MIKTA_MEMBER_ISO_CODES.map((iso) => [iso, pick(iso)]),
) as Record<(typeof MIKTA_MEMBER_ISO_CODES)[number], Triple>
