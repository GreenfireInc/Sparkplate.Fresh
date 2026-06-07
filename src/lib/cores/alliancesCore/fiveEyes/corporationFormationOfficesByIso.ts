import type { CorporationFormationOffice } from './types'
import type { FiveEyesMemberIsoCode } from './fiveEyesMemberIsoCodes'

function office(
  name: string,
  phone: string,
  address: string,
  website: string,
  email: string,
  twitter: string,
  instagram: string,
  linkedin: string,
  formsUrl: string,
  checklistsUrl: string,
  registrationNumberLabel: string,
): CorporationFormationOffice {
  return {
    name,
    phone,
    address,
    website,
    email,
    twitter,
    instagram,
    linkedin,
    formsUrl,
    checklistsUrl,
    registrationNumberLabel,
  }
}

/**
 * National corporation / company formation office per Five Eyes member state.
 * Informational; verify phone numbers, addresses, filing portals, checklists, social handles,
 * and registration-number taxonomy before production. Self-contained — no imports from other alliance modules.
 */
export const FIVE_EYES_CORPORATION_FORMATION_OFFICES: Record<FiveEyesMemberIsoCode, CorporationFormationOffice> = {
  AU:   office(
    'Australian Securities and Investments Commission (ASIC)',
    '+61 1300 300 630',
    'Level 5, 100 Market Street, Sydney NSW 2000, Australia',
    'https://asic.gov.au',
    '',
    'https://twitter.com/asicmedia',
    '',
    'https://www.linkedin.com/company/australian-securities-and-investments-commission/',
    'https://asic.gov.au/for-business/registering-a-company/',
    'https://business.gov.au/planning/new-businesses/register-a-company',
    'Australian Company Number (ACN)',
  ),
  CA:   office(
    'Corporations Canada (Innovation, Science and Economic Development)',
    '+1 866 333 5556',
    '235 Queen Street, Ottawa, ON K1A 0H5, Canada',
    'https://ised-isde.canada.ca/site/corporations-canada/en',
    '',
    '',
    '',
    '',
    'https://ised-isde.canada.ca/site/corporations-canada/en/business-corporations/incorporate-business-corporation',
    'https://ised-isde.canada.ca/site/corporations-canada/en/business-corporations/steps-incorporating',
    'Corporation Number',
  ),
  NZ:   office(
    'New Zealand Companies Office',
    '+64 50 872 2669',
    'Wellington, New Zealand',
    'https://companies-register.companiesoffice.govt.nz',
    '',
    '',
    '',
    '',
    'https://companies-register.companiesoffice.govt.nz/help-centre/starting-a-company',
    'https://www.business.govt.nz/getting-started/advice-for-start-ups/10-step-guide-to-starting-a-business/',
    'New Zealand Business Number (NZBN)',
  ),
  GB:   office(
    'Companies House United Kingdom',
    '+44 303 1234 500',
    'Crown Way, Cardiff CF14 3UZ, United Kingdom',
    'https://www.gov.uk/government/organisations/companies-house',
    'enquiries@companieshouse.gov.uk',
    'https://twitter.com/CompaniesHouse',
    '',
    'https://www.linkedin.com/company/companies-house/',
    'https://www.gov.uk/limited-company-formation',
    'https://www.gov.uk/set-up-limited-company',
    'Company Registration Number (CRN)',
  ),
  US:   office(
    'U.S. State Secretary of State Business Filing Offices (Representative: Delaware Division of Corporations)',
    '+1 302 739 3073',
    '401 Federal Street, Dover, DE 19901, United States',
    'https://corp.delaware.gov',
    '',
    '',
    '',
    '',
    'https://corp.delaware.gov/paytaxes/',
    'https://www.sba.gov/business-guide/launch-your-business/register-your-business',
    'Employer Identification Number (EIN)',
  ),
}
