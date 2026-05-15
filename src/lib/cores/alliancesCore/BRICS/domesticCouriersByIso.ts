import type { DomesticCourierService } from './types'
import { BRI_DOMESTIC_COURIERS } from '../beltAndRoadInitiative/domesticCouriersByIso'

/**
 * BRICS members — courier rows sourced from the Belt & Road reference merge for these ISO codes
 * (APEC / AU / Arab League / ASEAN / AMU overlays + fallbacks). Verify locally before production use.
 */
export const BRICS_DOMESTIC_COURIERS = {
  BR: BRI_DOMESTIC_COURIERS['BR'],
  RU: BRI_DOMESTIC_COURIERS['RU'],
  IN: BRI_DOMESTIC_COURIERS['IN'],
  CN: BRI_DOMESTIC_COURIERS['CN'],
  ZA: BRI_DOMESTIC_COURIERS['ZA'],
} satisfies Record<string, DomesticCourierService[]>
