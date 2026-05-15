import { BRI_DOMESTIC_COURIERS } from '../beltAndRoadInitiative/domesticCouriersByIso'
import type { DomesticCourierService } from './types'
import { IGAD_MEMBER_ISO_CODES } from './igadMemberIsoCodes'

function c(
  name: string,
  website: string,
  email: string,
  instagram: string,
  twitter: string,
  apiEndpoint: string,
): DomesticCourierService {
  return { name, website, email, instagram, twitter, apiEndpoint }
}

function fallbackDomesticCouriers(iso2: string): DomesticCourierService[] {
  const lc = iso2.toLowerCase()
  const dhlUrl = `https://www.dhl.com/${lc}-en/home.html`
  return [
    c(
      `National postal operator / EMS (${iso2})`,
      '',
      '',
      '',
      '',
      '',
    ),
    c(
      'DHL Express (country desks)',
      dhlUrl,
      'customerservice@dhl.com',
      'https://www.instagram.com/dhlexpress/',
      'https://x.com/DHLexpress',
      'https://api-eu.dhl.com/',
    ),
    c(
      'FedEx Corporation',
      'https://www.fedex.com/',
      'support@fedex.com',
      'https://www.instagram.com/fedex/',
      'https://x.com/FedEx',
      'https://apis.fedex.com/',
    ),
    c(
      'UPS parcel / supply chain partners',
      `https://www.ups.com/${lc}/en`,
      'help@ups.com',
      'https://www.instagram.com/ups/',
      'https://x.com/UPS',
      'https://onlinetools.ups.com/api/',
    ),
  ]
}

/**
 * Domestic courier reference rows by ISO 3166-1 alpha-2 for IGAD members in this module.
 * Reuses BRI layered data where that participant list includes the economy; otherwise informational fallback.
 */
export const IGAD_DOMESTIC_COURIERS = Object.fromEntries(
  IGAD_MEMBER_ISO_CODES.map((iso2) => [
    iso2,
    BRI_DOMESTIC_COURIERS[iso2] ?? fallbackDomesticCouriers(iso2),
  ]),
) as Record<string, DomesticCourierService[]>
