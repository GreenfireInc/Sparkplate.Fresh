import type { OpecMemberIsoCode } from './opecMemberIsoCodes'
import type { RareEarths } from './types'

/**
 * Documented rare-earth element exports (lanthanide series plus Sc and Y) by ISO 3166-1 alpha-2
 * for OPEC members. No OPEC member currently has commercial-scale primary REE mining or
 * lanthanide-separation exports. Notable pre-commercial prospects (not enumerated below):
 *  - Saudi Arabia (SA): Ma'aden-led REE projects targeted under Vision 2030 minerals program.
 *  - United Arab Emirates (AE): downstream / processing partnerships explored under Operation
 *    300bn industrial strategy.
 *  - Nigeria (NG): monazite occurrences in tin tailings (Plateau / Bauchi) — artisanal only.
 *  - Iran (IR): bastnäsite and monazite occurrences (Yazd / Saghand area) — pre-commercial.
 *  - Algeria (DZ): Hoggar / Eglab carbonatite prospects — pre-commercial.
 * Informational; verify periodically.
 */
export const OPEC_RARE_EARTHS: Record<OpecMemberIsoCode, RareEarths> = {
  DZ: [],
  CG: [],
  GQ: [],
  GA: [],
  IR: [],
  IQ: [],
  KW: [],
  LY: [],
  NG: [],
  SA: [],
  AE: [],
  VE: [],
}
