/**
 * West Indies / Caribbean — independence, first leaders, and current leaders (datesCore snapshot).
 *
 * Source standard: docs/from/Corey/Mar22.Greenfire.Development.CoresAndStandards.datesCore
 * - `Regions` → **westIndies**
 * - Greater Antilles, Lesser Antilles, and Lucayan Archipelago / Central & South America tables
 *   (same markdown tables repeated in the doc).
 * - Supplemental “Independent Caribbean Countries” block in the doc adds first-leader death notes;
 *   merged where they align with the main tables (Trinidad current leader stays **Keith Rowley** per main table).
 *
 * Notes:
 * - `independenceDate` uses ISO `yyyy-mm-dd` when the doc gives a calendar day.
 * - Territories: no independence date; first leader may be “—” or a historically first premier/governor-type figure per doc.
 * - **Guyana, Suriname, French Guiana** also appear in `southAmerica.ts` (same doc rows).
 * - Capitals / major cities are geographic reference (not in the datesCore tables).
 * - Reference data only.
 */

export type WestIndiesArchipelago =
  | 'greater_antilles'
  | 'lesser_antilles'
  /** Bahamas, Turks & Caicos, Belize + doc’s combined “Lucayan…” table rows */
  | 'lucayan_and_linked'

/** Normalized from datesCore “Status” column */
export type WestIndiesSovereigntyStatus =
  | 'independent'
  | 'uk_territory'
  | 'us_territory'
  | 'dutch_territory'
  | 'dutch_special_municipality'
  | 'france_department'
  | 'other'

export interface LeaderLifeSpan {
  birth?: string
  death?: string
  living?: boolean
}

export interface WestIndiesLeaderRef {
  name: string
  role?: string
  life: LeaderLifeSpan
  notes?: string
}

/** Current leader as in datesCore “Current Leader” / “Birth / Death (Current)” columns (early 2026 snapshot). */
export interface WestIndiesCurrentLeaderFromStandard {
  name: string
  /** Verbatim-style note from doc, e.g. `b. Apr 20, 1960`, `b. ~1960`, or em dash when none */
  birthOrStatusNote?: string
}

export interface WestIndiesCountryEntry {
  id: string
  iso3166Alpha2: string
  name: string
  archipelago: WestIndiesArchipelago
  sovereigntyStatus: WestIndiesSovereigntyStatus
  /** Raw status label from datesCore for display */
  statusLabelFromStandard: string
  independenceFrom?: string
  independenceDate?: string
  independenceYear?: number
  independenceNotes?: string
  firstLeader: WestIndiesLeaderRef
  currentLeader: WestIndiesCurrentLeaderFromStandard
  capital: string
  majorCities: readonly [string, string, string]
}

/**
 * datesCore → `notableFigures (by region)` → westIndies (spellings as in doc).
 */
export const westIndiesNotableFiguresFromStandard: readonly string[] = [
  'Alcot?',
  'Desaline',
  'Toussant?',
] as const

/** Normalized hints (not in datesCore; for search/UI only). */
export const westIndiesNotableFigureHints: readonly { raw: string; hint?: string }[] = [
  { raw: 'Alcot?', hint: 'Possibly Alexander Hamilton or other figure — doc uncertain.' },
  { raw: 'Desaline', hint: 'Jean-Jacques Dessalines' },
  { raw: 'Toussant?', hint: 'Toussaint Louverture' },
] as const

export const westIndiesCountries: readonly WestIndiesCountryEntry[] = [
  // ——— Greater Antilles ———
  {
    id: 'cayman-islands',
    iso3166Alpha2: 'KY',
    name: 'Cayman Islands',
    archipelago: 'greater_antilles',
    sovereigntyStatus: 'uk_territory',
    statusLabelFromStandard: 'UK Territory',
    firstLeader: {
      name: '—',
      life: {},
      notes: 'datesCore: no first leader in table.',
    },
    currentLeader: {
      name: "Julianna O'Connor-Connolly",
      birthOrStatusNote: 'b. 1961',
    },
    capital: 'George Town',
    majorCities: ['West Bay', 'Bodden Town', 'East End'],
  },
  {
    id: 'cuba',
    iso3166Alpha2: 'CU',
    name: 'Cuba',
    archipelago: 'greater_antilles',
    sovereigntyStatus: 'independent',
    statusLabelFromStandard: 'Independent',
    independenceFrom: 'Spain / US',
    independenceDate: '1902-05-20',
    independenceYear: 1902,
    firstLeader: {
      name: 'Tomás Estrada Palma',
      role: 'President (PM equivalent per doc note)',
      life: { death: '1908' },
      notes: 'Abbrev. “T. Estrada Palma” in table; death year from doc supplemental block.',
    },
    currentLeader: {
      name: 'Miguel Díaz-Canel',
      birthOrStatusNote: 'b. Apr 20, 1960',
    },
    capital: 'Havana',
    majorCities: ['Santiago de Cuba', 'Camagüey', 'Holguín'],
  },
  {
    id: 'dominican-republic',
    iso3166Alpha2: 'DO',
    name: 'Dominican Republic',
    archipelago: 'greater_antilles',
    sovereigntyStatus: 'independent',
    statusLabelFromStandard: 'Independent',
    independenceFrom: 'Haiti',
    independenceDate: '1844-02-27',
    independenceYear: 1844,
    independenceNotes:
      'Doc: main independence date Feb 27, 1844 from Haiti; earlier declaration from Spain (1821) noted in doc summary.',
    firstLeader: {
      name: 'Francisco del Rosario Sánchez',
      life: { death: '1864' },
      notes: 'Abbrev. “F. del Rosario Sánchez” in table.',
    },
    currentLeader: {
      name: 'Luis Abinader',
      birthOrStatusNote: 'b. Jul 12, 1967',
    },
    capital: 'Santo Domingo',
    majorCities: ['Santiago de los Caballeros', 'La Vega', 'San Cristóbal'],
  },
  {
    id: 'haiti',
    iso3166Alpha2: 'HT',
    name: 'Haiti',
    archipelago: 'greater_antilles',
    sovereigntyStatus: 'independent',
    statusLabelFromStandard: 'Independent',
    independenceFrom: 'France',
    independenceDate: '1804-01-01',
    independenceYear: 1804,
    firstLeader: {
      name: 'Jean-Jacques Dessalines',
      life: { death: '1806' },
      notes: 'Abbrev. “J.J. Dessalines” in table.',
    },
    currentLeader: {
      name: 'Transitional Council',
      birthOrStatusNote: '—',
    },
    capital: 'Port-au-Prince',
    majorCities: ['Cap-Haïtien', 'Les Cayes', 'Jacmel'],
  },
  {
    id: 'jamaica',
    iso3166Alpha2: 'JM',
    name: 'Jamaica',
    archipelago: 'greater_antilles',
    sovereigntyStatus: 'independent',
    statusLabelFromStandard: 'Independent',
    independenceFrom: 'United Kingdom',
    independenceDate: '1962-08-06',
    independenceYear: 1962,
    firstLeader: {
      name: 'Sir Alexander Bustamante',
      life: { death: '1977' },
      notes: '“Alexander Bustamante” in table.',
    },
    currentLeader: {
      name: 'Andrew Holness',
      birthOrStatusNote: 'b. Jul 22, 1972',
    },
    capital: 'Kingston',
    majorCities: ['Montego Bay', 'Spanish Town', 'Portmore'],
  },
  {
    id: 'puerto-rico',
    iso3166Alpha2: 'PR',
    name: 'Puerto Rico',
    archipelago: 'greater_antilles',
    sovereigntyStatus: 'us_territory',
    statusLabelFromStandard: 'US Territory',
    firstLeader: {
      name: '—',
      life: {},
      notes: 'datesCore: no first leader in table.',
    },
    currentLeader: {
      name: 'Pedro Pierluisi',
      birthOrStatusNote: 'b. Apr 26, 1959',
    },
    capital: 'San Juan',
    majorCities: ['Bayamón', 'Carolina', 'Ponce'],
  },

  // ——— Lesser Antilles ———
  {
    id: 'anguilla',
    iso3166Alpha2: 'AI',
    name: 'Anguilla',
    archipelago: 'lesser_antilles',
    sovereigntyStatus: 'uk_territory',
    statusLabelFromStandard: 'UK Territory',
    firstLeader: {
      name: 'Ronald Webster',
      life: {},
      notes: 'Doc: first leader under current political status.',
    },
    currentLeader: {
      name: 'Ellis Webster',
      birthOrStatusNote: 'b. ~1960',
    },
    capital: 'The Valley',
    majorCities: ['Stoney Ground', 'Island Harbour', 'Sandy Hill'],
  },
  {
    id: 'antigua-barbuda',
    iso3166Alpha2: 'AG',
    name: 'Antigua & Barbuda',
    archipelago: 'lesser_antilles',
    sovereigntyStatus: 'independent',
    statusLabelFromStandard: 'Independent',
    independenceFrom: 'United Kingdom',
    independenceDate: '1981-11-01',
    independenceYear: 1981,
    firstLeader: {
      name: 'Sir Vere Bird',
      life: { death: '1999' },
      notes: '“Vere Bird” in table.',
    },
    currentLeader: {
      name: 'Gaston Browne',
      birthOrStatusNote: 'b. Feb 9, 1967',
    },
    capital: "St. John's",
    majorCities: ['All Saints', 'Liberta', 'Potters Village'],
  },
  {
    id: 'aruba',
    iso3166Alpha2: 'AW',
    name: 'Aruba',
    archipelago: 'lesser_antilles',
    sovereigntyStatus: 'dutch_territory',
    statusLabelFromStandard: 'Dutch Territory',
    firstLeader: {
      name: 'Henny Eman',
      life: {},
      notes: 'Doc: first leader under current status.',
    },
    currentLeader: {
      name: 'Evelyn Wever-Croes',
      birthOrStatusNote: 'b. Dec 5, 1966',
    },
    capital: 'Oranjestad',
    majorCities: ['San Nicolaas', 'Santa Cruz', 'Paradera'],
  },
  {
    id: 'barbados',
    iso3166Alpha2: 'BB',
    name: 'Barbados',
    archipelago: 'lesser_antilles',
    sovereigntyStatus: 'independent',
    statusLabelFromStandard: 'Independent',
    independenceFrom: 'United Kingdom',
    independenceDate: '1966-11-30',
    independenceYear: 1966,
    firstLeader: {
      name: 'Errol Barrow',
      life: { death: '1987' },
    },
    currentLeader: {
      name: 'Mia Mottley',
      birthOrStatusNote: 'b. Oct 1, 1965',
    },
    capital: 'Bridgetown',
    majorCities: ['Speightstown', 'Oistins', 'Holetown'],
  },
  {
    id: 'bonaire',
    iso3166Alpha2: 'BQ',
    name: 'Bonaire',
    archipelago: 'lesser_antilles',
    sovereigntyStatus: 'dutch_special_municipality',
    statusLabelFromStandard: 'Dutch Special Mun.',
    firstLeader: {
      name: '—',
      life: {},
      notes: 'datesCore: em dash in First Leader column.',
    },
    currentLeader: {
      name: 'James Kroon',
      birthOrStatusNote: 'b. 1960',
    },
    capital: 'Kralendijk',
    majorCities: ['Rincon', 'Dorp Tera Kora', 'Antriol'],
  },
  {
    id: 'british-virgin-islands',
    iso3166Alpha2: 'VG',
    name: 'British Virgin Islands',
    archipelago: 'lesser_antilles',
    sovereigntyStatus: 'uk_territory',
    statusLabelFromStandard: 'UK Territory',
    firstLeader: {
      name: 'H. Lavity Stoutt',
      life: {},
      notes: 'Doc: first leader under current status.',
    },
    currentLeader: {
      name: 'Natalio Wheatley',
      birthOrStatusNote: 'b. Jul 2, 1980',
    },
    capital: 'Road Town',
    majorCities: ['Spanish Town', 'The Settlement', 'East End'],
  },
  {
    id: 'curacao',
    iso3166Alpha2: 'CW',
    name: 'Curaçao',
    archipelago: 'lesser_antilles',
    sovereigntyStatus: 'dutch_territory',
    statusLabelFromStandard: 'Dutch Territory',
    firstLeader: {
      name: 'Gerrit Schotte',
      life: {},
    },
    currentLeader: {
      name: 'Gilmar Pisas',
      birthOrStatusNote: 'b. Oct 28, 1971',
    },
    capital: 'Willemstad',
    majorCities: ['Sint Michiel', 'Barber', 'Dorp Soto'],
  },
  {
    id: 'dominica',
    iso3166Alpha2: 'DM',
    name: 'Dominica',
    archipelago: 'lesser_antilles',
    sovereigntyStatus: 'independent',
    statusLabelFromStandard: 'Independent',
    independenceFrom: 'United Kingdom',
    independenceDate: '1978-11-03',
    independenceYear: 1978,
    firstLeader: {
      name: 'Patrick John',
      life: { death: '2021' },
      notes: 'Death year from doc supplemental block.',
    },
    currentLeader: {
      name: 'Roosevelt Skerrit',
      birthOrStatusNote: 'b. Jun 8, 1972',
    },
    capital: 'Roseau',
    majorCities: ['Portsmouth', 'Marigot', 'Berekua'],
  },
  {
    id: 'grenada',
    iso3166Alpha2: 'GD',
    name: 'Grenada',
    archipelago: 'lesser_antilles',
    sovereigntyStatus: 'independent',
    statusLabelFromStandard: 'Independent',
    independenceFrom: 'United Kingdom',
    independenceDate: '1974-02-07',
    independenceYear: 1974,
    firstLeader: {
      name: 'Eric Gairy',
      life: { death: '1997' },
    },
    currentLeader: {
      name: 'Dickon Mitchell',
      birthOrStatusNote: 'b. Oct 8, 1978',
    },
    capital: "St. George's",
    majorCities: ['Gouyave', 'Grenville', 'Victoria'],
  },
  {
    id: 'guadeloupe',
    iso3166Alpha2: 'GP',
    name: 'Guadeloupe',
    archipelago: 'lesser_antilles',
    sovereigntyStatus: 'france_department',
    statusLabelFromStandard: 'France Dept.',
    firstLeader: {
      name: '—',
      life: {},
    },
    currentLeader: {
      name: 'Guy Losbar',
      birthOrStatusNote: 'b. 1961',
    },
    capital: 'Basse-Terre',
    majorCities: ['Pointe-à-Pitre', 'Les Abymes', 'Le Gosier'],
  },
  {
    id: 'martinique',
    iso3166Alpha2: 'MQ',
    name: 'Martinique',
    archipelago: 'lesser_antilles',
    sovereigntyStatus: 'france_department',
    statusLabelFromStandard: 'France Dept.',
    firstLeader: {
      name: '—',
      life: {},
    },
    currentLeader: {
      name: 'Serge Letchimy',
      birthOrStatusNote: 'b. Jan 13, 1953',
    },
    capital: 'Fort-de-France',
    majorCities: ['Le Lamentin', 'Le Robert', 'Schoelcher'],
  },
  {
    id: 'montserrat',
    iso3166Alpha2: 'MS',
    name: 'Montserrat',
    archipelago: 'lesser_antilles',
    sovereigntyStatus: 'uk_territory',
    statusLabelFromStandard: 'UK Territory',
    firstLeader: {
      name: 'W.H. Bramble',
      life: {},
    },
    currentLeader: {
      name: 'Easton Taylor-Farrell',
      birthOrStatusNote: 'b. ~1960',
    },
    capital: 'Plymouth (de jure); Brades (de facto)',
    majorCities: ['Little Bay', 'Salem', 'St. Johns'],
  },
  {
    id: 'saint-kitts-nevis',
    iso3166Alpha2: 'KN',
    name: 'St. Kitts & Nevis',
    archipelago: 'lesser_antilles',
    sovereigntyStatus: 'independent',
    statusLabelFromStandard: 'Independent',
    independenceFrom: 'United Kingdom',
    independenceDate: '1983-09-19',
    independenceYear: 1983,
    firstLeader: {
      name: 'Sir Kennedy Simmonds',
      life: { living: true },
      notes: '“Kennedy Simmonds” in table; supplemental notes alive.',
    },
    currentLeader: {
      name: 'Terrance Drew',
      birthOrStatusNote: 'b. Nov 22, 1976',
    },
    capital: 'Basseterre',
    majorCities: ['Charlestown', 'Sandy Point Town', 'Cayon'],
  },
  {
    id: 'saint-lucia',
    iso3166Alpha2: 'LC',
    name: 'Saint Lucia',
    archipelago: 'lesser_antilles',
    sovereigntyStatus: 'independent',
    statusLabelFromStandard: 'Independent',
    independenceFrom: 'United Kingdom',
    independenceDate: '1979-02-22',
    independenceYear: 1979,
    firstLeader: {
      name: 'John Compton',
      life: {},
    },
    currentLeader: {
      name: 'Philip Pierre',
      birthOrStatusNote: 'b. 1954',
    },
    capital: 'Castries',
    majorCities: ['Vieux Fort', 'Micoud', 'Soufrière'],
  },
  {
    id: 'saint-vincent-grenadines',
    iso3166Alpha2: 'VC',
    name: 'St. Vincent & Gren.',
    archipelago: 'lesser_antilles',
    sovereigntyStatus: 'independent',
    statusLabelFromStandard: 'Independent',
    independenceFrom: 'United Kingdom',
    independenceDate: '1979-10-27',
    independenceYear: 1979,
    firstLeader: {
      name: 'Milton Cato',
      life: { death: '1997' },
    },
    currentLeader: {
      name: 'Ralph Gonsalves',
      birthOrStatusNote: 'b. Aug 8, 1946',
    },
    capital: 'Kingstown',
    majorCities: ['Georgetown', 'Barrouallie', 'Port Elizabeth'],
  },
  {
    id: 'sint-maarten',
    iso3166Alpha2: 'SX',
    name: 'Sint Maarten',
    archipelago: 'lesser_antilles',
    sovereigntyStatus: 'dutch_territory',
    statusLabelFromStandard: 'Dutch Territory',
    firstLeader: {
      name: 'Sarah Wescot-Williams',
      life: {},
    },
    currentLeader: {
      name: 'Luc Mercelina',
      birthOrStatusNote: 'b. ~1964',
    },
    capital: 'Philipsburg',
    majorCities: ['Lower Prince’s Quarter', 'Cul de Sac', 'Simpson Bay'],
  },
  {
    id: 'trinidad-tobago',
    iso3166Alpha2: 'TT',
    name: 'Trinidad & Tobago',
    archipelago: 'lesser_antilles',
    sovereigntyStatus: 'independent',
    statusLabelFromStandard: 'Independent',
    independenceFrom: 'United Kingdom',
    independenceDate: '1962-08-31',
    independenceYear: 1962,
    firstLeader: {
      name: 'Eric Williams',
      role: 'Prime Minister',
      life: { death: '1981' },
      notes: '“Dr Eric Williams” in supplemental block.',
    },
    currentLeader: {
      name: 'Keith Rowley',
      birthOrStatusNote: 'b. Oct 24, 1949',
    },
    capital: 'Port of Spain',
    majorCities: ['San Fernando', 'Chaguanas', 'Arima'],
  },
  {
    id: 'us-virgin-islands',
    iso3166Alpha2: 'VI',
    name: 'US Virgin Islands',
    archipelago: 'lesser_antilles',
    sovereigntyStatus: 'us_territory',
    statusLabelFromStandard: 'US Territory',
    firstLeader: {
      name: 'Melvin H. Evans',
      life: {},
      notes: 'Doc: first leader under current status.',
    },
    currentLeader: {
      name: 'Albert Bryan',
      birthOrStatusNote: 'b. Feb 21, 1968',
    },
    capital: 'Charlotte Amalie',
    majorCities: ['Christiansted', 'Frederiksted', 'Cruz Bay'],
  },

  // ——— Lucayan Archipelago, Central & South America (doc combined table) ———
  {
    id: 'bahamas',
    iso3166Alpha2: 'BS',
    name: 'Bahamas',
    archipelago: 'lucayan_and_linked',
    sovereigntyStatus: 'independent',
    statusLabelFromStandard: 'Independent',
    independenceFrom: 'United Kingdom',
    independenceDate: '1973-07-10',
    independenceYear: 1973,
    firstLeader: {
      name: 'Lynden Pindling',
      life: { death: '2000' },
    },
    currentLeader: {
      name: 'Philip Davis',
      birthOrStatusNote: 'b. Jun 13, 1951',
    },
    capital: 'Nassau',
    majorCities: ['Freeport', 'West End', 'Coopers Town'],
  },
  {
    id: 'turks-caicos',
    iso3166Alpha2: 'TC',
    name: 'Turks & Caicos',
    archipelago: 'lucayan_and_linked',
    sovereigntyStatus: 'uk_territory',
    statusLabelFromStandard: 'UK Territory',
    firstLeader: {
      name: 'James McCartney',
      life: {},
    },
    currentLeader: {
      name: 'Washington Misick',
      birthOrStatusNote: 'b. Mar 13, 1950',
    },
    capital: 'Cockburn Town',
    majorCities: ['Providenciales', 'Blue Hills', 'Wheeland'],
  },
  {
    id: 'belize',
    iso3166Alpha2: 'BZ',
    name: 'Belize',
    archipelago: 'lucayan_and_linked',
    sovereigntyStatus: 'independent',
    statusLabelFromStandard: 'Independent',
    independenceFrom: 'United Kingdom',
    independenceDate: '1981-09-21',
    independenceYear: 1981,
    firstLeader: {
      name: 'George Cadle Price',
      life: { death: '2011' },
      notes: '“George Cadle Price” in table.',
    },
    currentLeader: {
      name: 'Johnny Briceño',
      birthOrStatusNote: 'b. Jul 17, 1960',
    },
    capital: 'Belmopan',
    majorCities: ['Belize City', 'San Ignacio', 'Orange Walk'],
  },
  {
    id: 'french-guiana',
    iso3166Alpha2: 'GF',
    name: 'French Guiana',
    archipelago: 'lucayan_and_linked',
    sovereigntyStatus: 'france_department',
    statusLabelFromStandard: 'France Dept.',
    firstLeader: {
      name: '—',
      life: {},
    },
    currentLeader: {
      name: 'Gabriel Serville',
      birthOrStatusNote: 'b. Sep 27, 1959',
    },
    capital: 'Cayenne',
    majorCities: ['Saint-Laurent-du-Maroni', 'Kourou', 'Rémire-Montjoly'],
  },
  {
    id: 'guyana',
    iso3166Alpha2: 'GY',
    name: 'Guyana',
    archipelago: 'lucayan_and_linked',
    sovereigntyStatus: 'independent',
    statusLabelFromStandard: 'Independent',
    independenceFrom: 'United Kingdom',
    independenceDate: '1966-05-26',
    independenceYear: 1966,
    firstLeader: {
      name: 'Forbes Burnham',
      life: { death: '1985' },
    },
    currentLeader: {
      name: 'Irfaan Ali',
      birthOrStatusNote: 'b. Apr 25, 1980',
    },
    capital: 'Georgetown',
    majorCities: ['Linden', 'New Amsterdam', 'Anna Regina'],
  },
  {
    id: 'suriname',
    iso3166Alpha2: 'SR',
    name: 'Suriname',
    archipelago: 'lucayan_and_linked',
    sovereigntyStatus: 'independent',
    statusLabelFromStandard: 'Independent',
    independenceFrom: 'Netherlands',
    independenceDate: '1975-11-25',
    independenceYear: 1975,
    firstLeader: {
      name: 'Johan Ferrier',
      role: 'President',
      life: { death: '1999-05-04' },
      notes: 'Table first leader; Henck Arron was PM — see southAmerica.ts for dual row.',
    },
    currentLeader: {
      name: 'Chan Santokhi',
      birthOrStatusNote: 'b. Feb 3, 1959',
    },
    capital: 'Paramaribo',
    majorCities: ['Lelydorp', 'Nieuw Nickerie', 'Moengo'],
  },
] as const

export function getWestIndiesCountryByIso2(code: string): WestIndiesCountryEntry | undefined {
  const upper = code.trim().toUpperCase()
  return westIndiesCountries.find((c) => c.iso3166Alpha2 === upper)
}

export function listWestIndiesByArchipelago(
  archipelago: WestIndiesArchipelago,
): readonly WestIndiesCountryEntry[] {
  return westIndiesCountries.filter((c) => c.archipelago === archipelago)
}

export function listWestIndiesIndependent(): readonly WestIndiesCountryEntry[] {
  return westIndiesCountries.filter((c) => c.sovereigntyStatus === 'independent')
}

export function listWestIndiesByIndependenceChrono(): readonly WestIndiesCountryEntry[] {
  return [...westIndiesCountries].sort((a, b) => {
    const da = a.independenceDate ?? ''
    const db = b.independenceDate ?? ''
    if (da && db) return da.localeCompare(db)
    if (da) return -1
    if (db) return 1
    return a.name.localeCompare(b.name)
  })
}
