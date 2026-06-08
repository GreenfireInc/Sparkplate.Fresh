import type { BricsMemberIsoCode } from './bricsMemberIsoCodes'
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
 * National designated postal operator and postal code schema per BRICS founding member economy.
 * Informational; verify URLs, handles, schemas, and API bases before production.
 * Self-contained — no imports from other alliance modules.
 */
export const BRICS_DOMESTIC_POST_SERVICES: Record<BricsMemberIsoCode, DomesticPostService> = {
  BR: post(
    'Correios (Empresa Brasileira de Correios e Telégrafos)',
    'https://www.correios.com.br/',
    'atendimento@correios.com.br',
    'https://x.com/Correios',
    'https://www.instagram.com/correios/',
    'https://www.linkedin.com/company/correios/',
    'https://www.correios.com.br/atendimento/developers',
    'NNNNN-NNN',
    '^\\d{5}-\\d{3}$',
    '70040-902',
    'CEP: five digits + hyphen + three digits',
  ),
  RU: post(
    'Russian Post (Pochta Rossii)',
    'https://www.pochta.ru/',
    'info@russianpost.ru',
    'https://x.com/russianpost',
    'https://www.instagram.com/russianpost/',
    'https://www.linkedin.com/company/russian-post/',
    '',
    'NNNNNN',
    '^\\d{6}$',
    '101000',
    'Six-digit postcode',
  ),
  IN: post(
    'India Post',
    'https://www.indiapost.gov.in/',
    'helpdesk@indiapost.gov.in',
    'https://x.com/IndiaPostOffice',
    'https://www.instagram.com/indiapostoffice/',
    'https://www.linkedin.com/company/india-post/',
    'https://www.indiapost.gov.in/',
    'NNNNNN',
    '^\\d{6}$',
    '110001',
    'Six-digit PIN code',
  ),
  CN: post(
    'China Post',
    'https://www.ems.com.cn/',
    'service@ems.com.cn',
    'https://x.com/chinapost',
    'https://www.instagram.com/chinapost/',
    'https://www.linkedin.com/company/china-post/',
    '',
    'NNNNNN',
    '^\\d{6}$',
    '100000',
    'Six-digit postcode',
  ),
  ZA: post(
    'South African Post Office',
    'http://www.postoffice.co.za/',
    'custserv@postoffice.co.za',
    'https://x.com/PostofficeSa',
    'https://www.instagram.com/sapostoffice/',
    'https://www.linkedin.com/company/south-african-post-office/',
    '',
    'NNNN',
    '^\\\\d{4}$',
    '2000',
    'Four-digit postcode (street delivery and P.O. Box)',
  ),
}
