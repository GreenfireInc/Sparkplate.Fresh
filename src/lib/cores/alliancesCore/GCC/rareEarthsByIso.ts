import type { GccMemberIsoCode } from './gccMemberIsoCodes'
import type { RareEarths } from './types'

/**
 * Documented rare-earth element exports (lanthanide series plus Sc and Y) by ISO 3166-1 alpha-2
 * for GCC members. No GCC member currently has commercial-scale primary REE mining or
 * lanthanide-separation exports. Saudi Arabia's Ma'aden has announced REE prospects under the
 * Vision 2030 minerals program and the UAE has explored downstream / processing partnerships,
 * but these remain pre-commercial; refining of imported feedstock is not enumerated here.
 * Informational; verify periodically.
 */
export const GCC_RARE_EARTHS: Record<GccMemberIsoCode, RareEarths> = {
  BH: [],
  KW: [],
  OM: [],
  QA: [],
  SA: [],
  AE: [],
}
