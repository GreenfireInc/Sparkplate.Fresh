import type { DomesticCourierService } from './types'
import { AMU_DOMESTIC_COURIERS } from '../AMU/domesticCouriersByIso'
import { APEC_DOMESTIC_COURIERS } from '../APEC/domesticCouriersByIso'
import { ASEAN_DOMESTIC_COURIERS } from '../ASEAN/domesticCouriersByIso'
import { AU_DOMESTIC_COURIERS } from '../africanUnion/domesticCouriersByIso'
import { ARAB_LEAGUE_DOMESTIC_COURIERS } from '../arabLeague/domesticCouriersByIso'
import { BELT_AND_ROAD_PARTICIPANT_ISO_CODES } from './participantStatesIsoCodes'

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

/**
 * Layers applied in order; later maps override overlapping ISO codes (AMU refinement for Maghreb, etc.).
 */
function mergeCourierLayers(layers: ReadonlyArray<Record<string, readonly DomesticCourierService[]>>) {
  const merged: Record<string, DomesticCourierService[]> = {}
  for (const layer of layers) {
    for (const [iso, rows] of Object.entries(layer)) {
      merged[iso] = rows as DomesticCourierService[]
    }
  }
  return merged
}

/** Template rows when no curated module carries this ISO yet (informational). */
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

const MERGED_MODULES = mergeCourierLayers([
  AU_DOMESTIC_COURIERS,
  ASEAN_DOMESTIC_COURIERS,
  APEC_DOMESTIC_COURIERS,
  ARAB_LEAGUE_DOMESTIC_COURIERS,
  AMU_DOMESTIC_COURIERS,
])

/**
 * Domestic courier reference rows by ISO 3166-1 alpha-2 for BRI participant economies in this module.
 * Rows are sourced from AU / ASEAN / APEC / Arab League / AMU cores where present; verify before production use.
 */
export const BRI_DOMESTIC_COURIERS = Object.fromEntries(
  BELT_AND_ROAD_PARTICIPANT_ISO_CODES.map((iso2) => [
    iso2,
    MERGED_MODULES[iso2] ?? fallbackDomesticCouriers(iso2),
  ]),
) as Record<string, DomesticCourierService[]>
