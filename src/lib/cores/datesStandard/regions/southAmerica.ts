/**
 * South America — independence anniversaries and first post-independence leaders.
 *
 * Source standard: docs/from/Corey/Mar22.Greenfire.Development.CoresAndStandards.datesCore
 *
 * Explicit in datesCore:
 * - `notableFigures (by region)` → **latinAmerica**: Simon Bolivar, Che, Fidel (broader Latin America; cited here for regional figures).
 * - Caribbean / independence prompt tables → **South America** rows: **French Guiana**, **Guyana**, **Suriname** (status, independence from/date, first & current leaders in doc).
 *
 * The doc does **not** tabulate Argentina, Bolivia, Brazil, Chile, Colombia, Ecuador, Paraguay, Peru, Uruguay, or Venezuela in that South America block.
 * Those twelve sovereign entries are included for parity with `africa.ts` (UN South America set) using widely cited independence timelines and first heads of state/government — **verify for production use**.
 *
 * Notes:
 * - Independence `yyyy-mm-dd` where a single calendar day is used; some states have complex paths (notes field).
 * - Reference data only.
 */

/** Grouping for filters / UI (not from datesCore). */
export type SouthAmericaSubregion =
  | 'guianas'
  | 'andean'
  | 'brazil'
  | 'southern_cone'
  | 'dependency'

export type SouthAmericaSovereigntyStatus =
  | 'independent'
  | 'overseas_department'
  | 'other'

export interface LeaderLifeSpan {
  birth?: string
  death?: string
  living?: boolean
}

export interface SouthAmericaFirstLeader {
  name: string
  role?: string
  life: LeaderLifeSpan
  notes?: string
}

export interface SouthAmericaCountryEntry {
  id: string
  iso3166Alpha2: string
  name: string
  commonName?: string
  subregion: SouthAmericaSubregion
  sovereigntyStatus: SouthAmericaSovereigntyStatus
  /** True when row matches datesCore “South America” territory/country table. */
  fromDatesCoreSouthAmericaTable?: boolean
  independenceDate?: string
  independenceYear?: number
  independenceFrom?: string
  independenceNotes?: string
  firstLeader: SouthAmericaFirstLeader
  otherLeadersAtIndependence?: readonly SouthAmericaFirstLeader[]
  capital: string
  majorCities: readonly [string, string, string]
}

/**
 * datesCore → `latinAmerica` under notableFigures (by region).
 */
export const southAmericaNotableFiguresFromLatinAmericaStandard: readonly string[] = [
  'Simon Bolivar',
  'Che',
  'Fidel',
] as const

/**
 * ISO 3166-1 alpha-2 South American set + French Guiana (GF).
 * Guyana, Suriname, French Guiana rows align with datesCore Lucayan / Central & South America tables.
 */
export const southAmericaCountries: readonly SouthAmericaCountryEntry[] = [
  // ——— Guianas (datesCore South America subsection) ———
  {
    id: 'guyana',
    iso3166Alpha2: 'GY',
    name: 'Guyana',
    subregion: 'guianas',
    sovereigntyStatus: 'independent',
    fromDatesCoreSouthAmericaTable: true,
    independenceDate: '1966-05-26',
    independenceYear: 1966,
    independenceFrom: 'United Kingdom',
    firstLeader: {
      name: 'Forbes Burnham',
      role: 'Premier (head of government at independence)',
      life: { birth: '1923-02-20', death: '1985-08-06' },
      notes: 'datesCore tables; first PM equivalent.',
    },
    capital: 'Georgetown',
    majorCities: ['Linden', 'New Amsterdam', 'Anna Regina'],
  },
  {
    id: 'suriname',
    iso3166Alpha2: 'SR',
    name: 'Suriname',
    subregion: 'guianas',
    sovereigntyStatus: 'independent',
    fromDatesCoreSouthAmericaTable: true,
    independenceDate: '1975-11-25',
    independenceYear: 1975,
    independenceFrom: 'Netherlands',
    firstLeader: {
      name: 'Johan Ferrier',
      role: 'President',
      life: { birth: '1910-05-12', death: '1999-05-04' },
      notes: 'datesCore lists Ferrier as first leader; Henck Arron was PM at independence.',
    },
    otherLeadersAtIndependence: [
      {
        name: 'Henck Arron',
        role: 'Prime Minister',
        life: { birth: '1936-04-25', death: '2000-08-04' },
      },
    ],
    capital: 'Paramaribo',
    majorCities: ['Lelydorp', 'Nieuw Nickerie', 'Moengo'],
  },
  {
    id: 'french-guiana',
    iso3166Alpha2: 'GF',
    name: 'French Guiana',
    subregion: 'dependency',
    sovereigntyStatus: 'overseas_department',
    fromDatesCoreSouthAmericaTable: true,
    independenceFrom: 'France (integral department; no independence)',
    independenceNotes: 'datesCore: territory — no independence date; First Leader —.',
    firstLeader: {
      name: '—',
      life: {},
      notes: 'No separate sovereign head; integral part of France per datesCore.',
    },
    capital: 'Cayenne',
    majorCities: ['Saint-Laurent-du-Maroni', 'Kourou', 'Rémire-Montjoly'],
  },

  // ——— Andean (standard historical complement; not in datesCore South America table) ———
  {
    id: 'venezuela',
    iso3166Alpha2: 'VE',
    name: 'Venezuela',
    subregion: 'andean',
    sovereigntyStatus: 'independent',
    independenceDate: '1811-07-05',
    independenceYear: 1811,
    independenceFrom: 'Spain (First Republic; full recognition followed)',
    firstLeader: {
      name: 'Cristóbal Mendoza',
      role: 'President of the First Republic',
      life: { birth: '1772-06-23', death: '1829-02-08' },
    },
    capital: 'Caracas',
    majorCities: ['Maracaibo', 'Valencia', 'Barquisimeto'],
  },
  {
    id: 'colombia',
    iso3166Alpha2: 'CO',
    name: 'Colombia',
    subregion: 'andean',
    sovereigntyStatus: 'independent',
    independenceDate: '1810-07-20',
    independenceYear: 1810,
    independenceFrom: 'Spain',
    independenceNotes: 'National day marks 1810 declaration; Gran Colombia / republic consolidation continued through 1819+.',
    firstLeader: {
      name: 'Simón Bolívar',
      role: 'Key liberator; President of Gran Colombia (1819–1830)',
      life: { birth: '1783-07-24', death: '1830-12-17' },
      notes: 'Simplified “first leader” for post-independence era.',
    },
    capital: 'Bogotá',
    majorCities: ['Medellín', 'Cali', 'Barranquilla'],
  },
  {
    id: 'ecuador',
    iso3166Alpha2: 'EC',
    name: 'Ecuador',
    subregion: 'andean',
    sovereigntyStatus: 'independent',
    independenceDate: '1830-05-13',
    independenceYear: 1830,
    independenceFrom: 'Gran Colombia',
    firstLeader: {
      name: 'Juan José Flores',
      role: 'President',
      life: { birth: '1800-07-19', death: '1864-10-01' },
    },
    capital: 'Quito',
    majorCities: ['Guayaquil', 'Cuenca', 'Santo Domingo'],
  },
  {
    id: 'peru',
    iso3166Alpha2: 'PE',
    name: 'Peru',
    subregion: 'andean',
    sovereigntyStatus: 'independent',
    independenceDate: '1821-07-28',
    independenceYear: 1821,
    independenceFrom: 'Spain',
    firstLeader: {
      name: 'José de San Martín',
      role: 'Protector of Peru',
      life: { birth: '1778-02-25', death: '1850-08-17' },
    },
    capital: 'Lima',
    majorCities: ['Arequipa', 'Trujillo', 'Chiclayo'],
  },
  {
    id: 'bolivia',
    iso3166Alpha2: 'BO',
    name: 'Bolivia',
    subregion: 'andean',
    sovereigntyStatus: 'independent',
    independenceDate: '1825-08-06',
    independenceYear: 1825,
    independenceFrom: 'Spain (Republic declared)',
    firstLeader: {
      name: 'Antonio José de Sucre',
      role: 'President',
      life: { birth: '1795-02-03', death: '1830-06-04' },
      notes: 'Simón Bolívar held executive authority briefly before Sucre’s presidency.',
    },
    capital: 'Sucre (constitutional); La Paz (seat of government)',
    majorCities: ['Santa Cruz de la Sierra', 'El Alto', 'Cochabamba'],
  },

  // ——— Brazil ———
  {
    id: 'brazil',
    iso3166Alpha2: 'BR',
    name: 'Brazil',
    subregion: 'brazil',
    sovereigntyStatus: 'independent',
    independenceDate: '1822-09-07',
    independenceYear: 1822,
    independenceFrom: 'Portugal',
    firstLeader: {
      name: 'Dom Pedro I',
      role: 'Emperor',
      life: { birth: '1798-10-12', death: '1834-09-24' },
    },
    capital: 'Brasília',
    independenceNotes: 'Rio de Janeiro was capital until 1960.',
    majorCities: ['São Paulo', 'Rio de Janeiro', 'Salvador'],
  },

  // ——— Southern Cone ———
  {
    id: 'paraguay',
    iso3166Alpha2: 'PY',
    name: 'Paraguay',
    subregion: 'southern_cone',
    sovereigntyStatus: 'independent',
    independenceDate: '1811-05-14',
    independenceYear: 1811,
    independenceFrom: 'Spain',
    firstLeader: {
      name: 'José Gaspar Rodríguez de Francia',
      role: 'Consul / effective head of state (post-independence era)',
      life: { birth: '1766-01-06', death: '1840-09-20' },
    },
    capital: 'Asunción',
    majorCities: ['Ciudad del Este', 'San Lorenzo', 'Luque'],
  },
  {
    id: 'uruguay',
    iso3166Alpha2: 'UY',
    name: 'Uruguay',
    subregion: 'southern_cone',
    sovereigntyStatus: 'independent',
    independenceDate: '1825-08-25',
    independenceYear: 1825,
    independenceFrom: 'Brazil / Provincia Oriental (La Banda Oriental); Brazil–Argentina context',
    independenceNotes: '1828 Treaty of Montevideo recognized separate state.',
    firstLeader: {
      name: 'Fructuoso Rivera',
      role: 'First constitutional President (from 1830)',
      life: { birth: '1784-09-17', death: '1854-01-13' },
      notes: 'August 25 marks declaration; first presidency began 1830.',
    },
    capital: 'Montevideo',
    majorCities: ['Salto', 'Ciudad de la Costa', 'Paysandú'],
  },
  {
    id: 'argentina',
    iso3166Alpha2: 'AR',
    name: 'Argentina',
    subregion: 'southern_cone',
    sovereigntyStatus: 'independent',
    independenceDate: '1816-07-09',
    independenceYear: 1816,
    independenceFrom: 'Spain',
    firstLeader: {
      name: 'Bernardino Rivadavia',
      role: 'First President of Argentina (1826–1827)',
      life: { birth: '1780-08-20', death: '1845-06-02' },
      notes: 'Supreme Directors preceded presidential era; Rivadavia first to hold “President” title.',
    },
    capital: 'Buenos Aires',
    majorCities: ['Córdoba', 'Rosario', 'Mendoza'],
  },
  {
    id: 'chile',
    iso3166Alpha2: 'CL',
    name: 'Chile',
    subregion: 'southern_cone',
    sovereigntyStatus: 'independent',
    independenceDate: '1818-02-12',
    independenceYear: 1818,
    independenceFrom: 'Spain',
    firstLeader: {
      name: "Bernardo O'Higgins",
      role: 'Supreme Director',
      life: { birth: '1778-08-20', death: '1842-10-24' },
    },
    capital: 'Santiago',
    majorCities: ['Valparaíso', 'Concepción', 'Viña del Mar'],
  },
] as const

/** Current leaders / birthdays as listed in datesCore territory tables (early 2026 snapshot in doc). */
export const southAmericaCurrentLeadersFromDatesCore: readonly {
  territory: string
  iso3166Alpha2: string
  name: string
  birthNote: string
}[] = [
  { territory: 'French Guiana', iso3166Alpha2: 'GF', name: 'Gabriel Serville', birthNote: 'b. Sep 27, 1959' },
  { territory: 'Guyana', iso3166Alpha2: 'GY', name: 'Irfaan Ali', birthNote: 'b. Apr 25, 1980' },
  { territory: 'Suriname', iso3166Alpha2: 'SR', name: 'Chan Santokhi', birthNote: 'b. Feb 3, 1959' },
] as const

export function getSouthAmericaCountryByIso2(code: string): SouthAmericaCountryEntry | undefined {
  const upper = code.trim().toUpperCase()
  return southAmericaCountries.find((c) => c.iso3166Alpha2 === upper)
}

export function listSouthAmericaCountriesBySubregion(
  subregion: SouthAmericaSubregion,
): readonly SouthAmericaCountryEntry[] {
  return southAmericaCountries.filter((c) => c.subregion === subregion)
}

export function listSouthAmericaCountriesByIndependenceChrono(): readonly SouthAmericaCountryEntry[] {
  return [...southAmericaCountries].sort((a, b) => {
    const da = a.independenceDate ?? ''
    const db = b.independenceDate ?? ''
    if (da && db) return da.localeCompare(db)
    if (da) return -1
    if (db) return 1
    return (a.name ?? '').localeCompare(b.name ?? '')
  })
}

export function listSouthAmericaFromDatesCoreTable(): readonly SouthAmericaCountryEntry[] {
  return southAmericaCountries.filter((c) => c.fromDatesCoreSouthAmericaTable === true)
}
