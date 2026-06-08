import type { FiveEyesMemberIsoCode } from './fiveEyesMemberIsoCodes'
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
 * National designated postal operator and postal code schema per Five Eyes member state.
 * Informational; verify URLs, handles, schemas, and API bases before production.
 * Self-contained — no imports from other alliance modules.
 */
export const FIVE_EYES_DOMESTIC_POST_SERVICES: Record<FiveEyesMemberIsoCode, DomesticPostService> = {
  AU: post(
    'Australia Post',
    'https://auspost.com.au/',
    'feedback@auspost.com.au',
    'https://x.com/AusPost',
    'https://www.instagram.com/auspost/',
    'https://www.linkedin.com/company/australia-post/',
    'https://developers.auspost.com.au/',
    'NNNN',
    '^\\d{4}$',
    '2000',
    'Four-digit postcode',
  ),
  CA: post(
    'Canada Post',
    'https://www.canadapost-postescanada.ca/',
    'customercare@canadapost-postescanada.ca',
    'https://x.com/canadapostcorp',
    'https://www.instagram.com/canadapost/',
    'https://www.linkedin.com/company/canada-post/',
    'https://www.canadapost-postescanada.ca/cpc/en/tools/find-a-postal-code.page',
    'ANA NAN',
    '^[A-Z]\\d[A-Z] \\d[A-Z]\\d$',
    'K1A 0B1',
    'Canadian postal code (letter-digit-letter space digit-letter-digit)',
  ),
  NZ: post(
    'NZ Post',
    'https://www.nzpost.co.nz/',
    'customercare@nzpost.co.nz',
    'https://x.com/NZPost',
    'https://www.instagram.com/nzpost/',
    'https://www.linkedin.com/company/nz-post/',
    '',
    'NNNN',
    '^\\d{4}$',
    '6011',
    'Four-digit postcode',
  ),
  GB: post(
    'Royal Mail',
    'https://www.royalmail.com/',
    'customerservice@royalmail.com',
    'https://x.com/RoyalMail',
    'https://www.instagram.com/royalmailofficial/',
    'https://www.linkedin.com/company/royal-mail/',
    'https://developer.royalmail.net/',
    'AAN NAA',
    '^[A-Z]{1,2}\\d[A-Z\\d]? \\d[A-Z]{2}$',
    'SW1A 1AA',
    'UK postcode (outward + inward codes)',
  ),
  US: post(
    'United States Postal Service (USPS)',
    'https://www.usps.com/',
    'uspscustomerservice@usps.gov',
    'https://x.com/USPS',
    'https://www.instagram.com/usps/',
    'https://www.linkedin.com/company/usps/',
    'https://developer.usps.com/',
    'NNNNN',
    '^\\d{5}$',
    '20500',
    'Five-digit ZIP; ZIP+4 optional (NNNNN-NNNN)',
  ),
}
