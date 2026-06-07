import type { AesMemberIsoCode } from './aesMemberIsoCodes'
import type { DomesticPostService } from './types'

function post(
  name: string,
  website: string,
  email: string,
  twitter: string,
  instagram: string,
  linkedin: string,
  apiEndpoint: string,
  format: string,
  pattern: string,
  example: string,
  notes: string,
): DomesticPostService {
  return {
    name,
    website,
    email,
    twitter,
    instagram,
    linkedin,
    apiEndpoint,
    postalCodeSchema: { format, pattern, example, notes },
  }
}

/**
 * National designated postal operator and postal code schema per AES founding member.
 * Informational; verify URLs, handles, schemas, and API bases before production.
 * Self-contained — no imports from other alliance modules.
 */
export const AES_DOMESTIC_POST_SERVICES: Record<AesMemberIsoCode, DomesticPostService> = {
  ML: post(
    'La Poste du Mali EMS',
    'https://www.sap.ml/',
    'contact@post.ml',
    '',
    '',
    'https://www.linkedin.com/company/la-poste-du-mali/',
    '',
    'none',
    '',
    '',
    'No national postcode; commune addressing',
  ),
  NE: post(
    'La Poste du Niger',
    'https://www.nigerpost.ne/',
    'npn@refer.ne',
    '',
    '',
    'https://www.linkedin.com/company/la-poste-du-niger/',
    '',
    'NNNN',
    '^\\d{4}$',
    '8001',
    'Four-digit postcode (Niamey and regions)',
  ),
  BF: post(
    'La Poste Burkina Faso (SONAPOST)',
    'http://www.sonapost.bf/',
    'contact@sonapost.bf',
    '',
    '',
    'https://www.linkedin.com/company/sonapost/',
    '',
    'none',
    '',
    '',
    'No national postcode system; commune and P.O. Box routing',
  ),
}
