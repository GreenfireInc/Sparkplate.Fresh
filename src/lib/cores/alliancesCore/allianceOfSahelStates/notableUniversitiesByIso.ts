import type { NotableUniversity } from './types'
import type { AesMemberIsoCode } from './aesMemberIsoCodes'

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

/**
 * Three notable universities per AES member economy (economics / accounting / CS / EE-style faculties — informational).
 */
export const AES_NOTABLE_UNIVERSITIES: Record<
  AesMemberIsoCode,
  readonly [NotableUniversity, NotableUniversity, NotableUniversity]
> = {
  BF: [
    u(
      'Joseph Ki-Zerbo University (Université Joseph Ki-Zerbo)',
      'https://univ-ouaga.bf/',
      'contact@univ-ouaga.bf',
      '',
      '',
      'https://www.linkedin.com/school/universite-joseph-ki-zerbo/',
    ),
    u(
      'Nazi Boni University (Université Nazi Boni de Bobo-Dioulasso)',
      'https://www.univ-bobo.bf/',
      'contact@univ-bobo.bf',
      '',
      '',
      'https://www.linkedin.com/school/université-nazi-boni/',
    ),
    u(
      'Norbert Zongo University (Université Norbert Zongo)',
      'https://www.univ-kdg.bf/',
      'infos@univ-kdg.bf',
      '',
      '',
      '',
    ),
  ],
  ML: [
    u(
      'Université des Sciences, Techniques et Technologies de Bamako (USTTB)',
      'https://usttb.edu.ml/',
      '',
      '',
      '',
      '',
    ),
    u(
      'Université des Sciences Juridiques et Politiques de Bamako (USJPB)',
      '',
      'contact@mess.gov.ml',
      '',
      '',
      '',
    ),
    u(
      'Université des Lettres et des Sciences Humaines de Bamako (ULSHB) — economics / management tracks',
      '',
      'contact@mess.gov.ml',
      '',
      '',
      '',
    ),
  ],
  NE: [
    u(
      'Abdou Moumouni University of Niamey',
      'https://www.universite-ne.net/',
      'contact@uam.ne',
      '',
      '',
      'https://www.linkedin.com/school/abdou-moumouni-university/',
    ),
    u('University Dan Dicko Dankoulodo de Maradi', 'https://univ-maradi.ne/', '', '', '', ''),
    u('African Institute of Mathematical Sciences Niger (reference campus)', 'https://www.nexteinstein.org/', 'info@nexteinstein.org', '', '', 'https://www.linkedin.com/school/AIMS_Niger/'),
  ],
}
