import type { EccasMemberIsoCode } from './eccasMemberIsoCodes'
import type { RareEarths } from './types'

/**
 * Documented rare-earth element exports (lanthanide series plus Sc and Y) by ISO 3166-1 alpha-2
 * for ECCAS (Economic Community of Central African States) partner states. No ECCAS partner
 * currently runs commercial-scale REE mining or separation; carbonatite-hosted REE prospects
 * in Cameroon (Lobé / Kribi-area) and Burundi remain pre-commercial. All entries empty
 * (informational; verify periodically).
 */
export const ECCAS_RARE_EARTHS: Record<EccasMemberIsoCode, RareEarths> = {
  AO: [],
  BI: [],
  CM: [],
  CF: [],
  TD: [],
  CD: [],
  GQ: [],
  GA: [],
  CG: [],
  ST: [],
}
