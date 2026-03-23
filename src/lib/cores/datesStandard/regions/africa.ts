/**
 * Africa — independence anniversaries, first post-independence leaders, and regional notable figures.
 *
 * Source standard: docs/from/Corey/Mar22.Greenfire.Development.CoresAndStandards.datesCore
 * (notableFigures → Africa; Research.Geography: Africa / independence & leader tables)
 *
 * Notes:
 * - Independence `yyyy-mm-dd` is the primary annual observance date where the doc gives a calendar day.
 * - Birth/death values mirror the source doc (including "c." approximations and "living" where stated).
 * - Reference data only — not authoritative for legal/historical disputes; verify for production use.
 */

/** UN-style subregions used in datesCore Africa research blocks */
export type AfricaSubregion =
  | 'north_africa'
  | 'west_africa'
  | 'central_africa'
  | 'east_africa'
  | 'southern_africa'

export type AfricaSovereigntyStatus =
  | 'independent'
  /** e.g. Ethiopia — doc: never formally colonized */
  | 'not_colonized'
  /** e.g. South Africa Union 1910 — doc wording */
  | 'union_self_rule'
  | 'other'

/** Life span fields as given in datesCore (may be partial or approximate). */
export interface LeaderLifeSpan {
  /** ISO date when known, else short text e.g. "c. 1897", "Dec 1912" */
  birth?: string
  /** ISO date when known; omit when doc says living */
  death?: string
  /** Doc used "Passing: Living" for some figures */
  living?: boolean
}

export interface AfricaFirstLeader {
  name: string
  /** e.g. President, Prime Minister, King — from datesCore summaries */
  role?: string
  life: LeaderLifeSpan
  notes?: string
}

export interface AfricaCountryEntry {
  /** Stable slug */
  id: string
  iso3166Alpha2: string
  name: string
  commonName?: string
  subregion: AfricaSubregion
  sovereigntyStatus: AfricaSovereigntyStatus
  /** ISO 8601 calendar date for the independence/union observance; omit when not applicable */
  independenceDate?: string
  /** For sorting / display when full date missing */
  independenceYear?: number
  /** Former colonial power or authority (doc phrasing) */
  independenceFrom?: string
  independenceNotes?: string
  firstLeader: AfricaFirstLeader
  /** Doc lists both President and PM for some cases (e.g. DRC). */
  otherLeadersAtIndependence?: readonly AfricaFirstLeader[]
  capital: string
  /** Top 3 cities per datesCore */
  majorCities: readonly [string, string, string]
}

/**
 * `notableFigures (by region)` → Africa (datesCore).
 * Doc lists both "Mandela" and "Nelson Mandela" — preserved as separate entries.
 */
export const africaNotableFiguresFromStandard: readonly string[] = [
  'Ghaddafi',
  'Mugabe',
  'Mandela',
  'Sadat',
  'Kenyatta',
  'Franz Fanon',
  'Nelson Mandela',
] as const

/**
 * One record per African country in datesCore “54 countries” dataset.
 * Ordered: North → West → Central → East → Southern (then alpha within region in source tables).
 */
export const africaCountries: readonly AfricaCountryEntry[] = [
  // ——— North Africa ———
  {
    id: 'algeria',
    iso3166Alpha2: 'DZ',
    name: 'Algeria',
    subregion: 'north_africa',
    sovereigntyStatus: 'independent',
    independenceDate: '1962-07-05',
    independenceYear: 1962,
    independenceFrom: 'France',
    firstLeader: {
      name: 'Ahmed Ben Bella',
      role: 'President',
      life: { birth: '1916-12-25', death: '2012-04-11' },
    },
    capital: 'Algiers',
    majorCities: ['Oran', 'Constantine', 'Annaba'],
  },
  {
    id: 'egypt',
    iso3166Alpha2: 'EG',
    name: 'Egypt',
    subregion: 'north_africa',
    sovereigntyStatus: 'independent',
    independenceDate: '1922-02-28',
    independenceYear: 1922,
    independenceFrom: 'United Kingdom',
    firstLeader: {
      name: 'King Fuad I',
      life: { birth: '1868-03-26', death: '1936-04-28' },
    },
    capital: 'Cairo',
    majorCities: ['Alexandria', 'Giza', 'Shubra El Kheima'],
  },
  {
    id: 'libya',
    iso3166Alpha2: 'LY',
    name: 'Libya',
    subregion: 'north_africa',
    sovereigntyStatus: 'independent',
    independenceDate: '1951-12-24',
    independenceYear: 1951,
    independenceFrom: 'Italy (via UN trusteeship after WWII, per doc)',
    firstLeader: {
      name: 'King Idris I',
      life: { birth: '1890-03-12', death: '1983-05-25' },
    },
    capital: 'Tripoli',
    majorCities: ['Benghazi', 'Misrata', 'Bayda'],
  },
  {
    id: 'morocco',
    iso3166Alpha2: 'MA',
    name: 'Morocco',
    subregion: 'north_africa',
    sovereigntyStatus: 'independent',
    independenceDate: '1956-03-02',
    independenceYear: 1956,
    independenceFrom: 'France (Spanish zone integrated later 1956–58, per doc timeline)',
    firstLeader: {
      name: 'King Mohammed V',
      life: { birth: '1909-08-10', death: '1961-02-26' },
    },
    capital: 'Rabat',
    majorCities: ['Casablanca', 'Fes', 'Marrakesh'],
  },
  {
    id: 'tunisia',
    iso3166Alpha2: 'TN',
    name: 'Tunisia',
    subregion: 'north_africa',
    sovereigntyStatus: 'independent',
    independenceDate: '1956-03-20',
    independenceYear: 1956,
    independenceFrom: 'France',
    firstLeader: {
      name: 'Habib Bourguiba',
      role: 'Prime Minister; later President',
      life: { birth: '1903-08-03', death: '2000-04-06' },
    },
    capital: 'Tunis',
    majorCities: ['Sfax', 'Sousse', 'Kairouan'],
  },
  {
    id: 'sudan',
    iso3166Alpha2: 'SD',
    name: 'Sudan',
    subregion: 'north_africa',
    sovereigntyStatus: 'independent',
    independenceDate: '1956-01-01',
    independenceYear: 1956,
    independenceFrom: 'United Kingdom & Egypt (Anglo-Egyptian Condominium)',
    firstLeader: {
      name: 'Ismail al-Azhari',
      role: 'Prime Minister',
      life: { birth: '1900', death: '1969-08-26' },
    },
    capital: 'Khartoum',
    majorCities: ['Omdurman', 'Port Sudan', 'Kassala'],
  },

  // ——— West Africa ———
  {
    id: 'benin',
    iso3166Alpha2: 'BJ',
    name: 'Benin',
    commonName: 'Benin (Dahomey)',
    subregion: 'west_africa',
    sovereigntyStatus: 'independent',
    independenceDate: '1960-08-01',
    independenceYear: 1960,
    independenceFrom: 'France',
    firstLeader: {
      name: 'Hubert Maga',
      role: 'President',
      life: { birth: '1916-08-10', death: '2000-05-08' },
    },
    capital: 'Porto-Novo',
    majorCities: ['Cotonou', 'Parakou', 'Djougou'],
  },
  {
    id: 'burkina-faso',
    iso3166Alpha2: 'BF',
    name: 'Burkina Faso',
    commonName: 'Burkina Faso (Upper Volta)',
    subregion: 'west_africa',
    sovereigntyStatus: 'independent',
    independenceDate: '1960-08-05',
    independenceYear: 1960,
    independenceFrom: 'France',
    firstLeader: {
      name: 'Maurice Yaméogo',
      role: 'President',
      life: { birth: '1921-12-31', death: '1993-09-15' },
    },
    capital: 'Ouagadougou',
    majorCities: ['Bobo-Dioulasso', 'Koudougou', 'Ouahigouya'],
  },
  {
    id: 'cape-verde',
    iso3166Alpha2: 'CV',
    name: 'Cape Verde',
    subregion: 'west_africa',
    sovereigntyStatus: 'independent',
    independenceDate: '1975-07-05',
    independenceYear: 1975,
    independenceFrom: 'Portugal',
    firstLeader: {
      name: 'Aristides Pereira',
      role: 'President',
      life: { birth: '1923-11-17', death: '2011-09-22' },
    },
    capital: 'Praia',
    majorCities: ['Mindelo', 'Santa Maria', 'Assomada'],
  },
  {
    id: 'cote-divoire',
    iso3166Alpha2: 'CI',
    name: "Côte d'Ivoire",
    subregion: 'west_africa',
    sovereigntyStatus: 'independent',
    independenceDate: '1960-08-07',
    independenceYear: 1960,
    independenceFrom: 'France',
    firstLeader: {
      name: 'Félix Houphouët-Boigny',
      role: 'President',
      life: { birth: '1905-10-18', death: '1993-12-07' },
    },
    capital: 'Yamoussoukro',
    majorCities: ['Abidjan', 'Bouaké', 'Daloa'],
  },
  {
    id: 'gambia',
    iso3166Alpha2: 'GM',
    name: 'The Gambia',
    subregion: 'west_africa',
    sovereigntyStatus: 'independent',
    independenceDate: '1965-02-18',
    independenceYear: 1965,
    independenceFrom: 'United Kingdom',
    firstLeader: {
      name: 'Dawda Jawara',
      role: 'Prime Minister',
      life: { birth: '1924-05-16', death: '2019-08-27' },
    },
    capital: 'Banjul',
    majorCities: ['Serekunda', 'Brikama', 'Bakau'],
  },
  {
    id: 'ghana',
    iso3166Alpha2: 'GH',
    name: 'Ghana',
    subregion: 'west_africa',
    sovereigntyStatus: 'independent',
    independenceDate: '1957-03-06',
    independenceYear: 1957,
    independenceFrom: 'United Kingdom',
    firstLeader: {
      name: 'Kwame Nkrumah',
      role: 'Prime Minister',
      life: { birth: '1909-09-21', death: '1972-04-27' },
    },
    capital: 'Accra',
    majorCities: ['Kumasi', 'Tamale', 'Takoradi'],
  },
  {
    id: 'guinea',
    iso3166Alpha2: 'GN',
    name: 'Guinea',
    subregion: 'west_africa',
    sovereigntyStatus: 'independent',
    independenceDate: '1958-10-02',
    independenceYear: 1958,
    independenceFrom: 'France',
    firstLeader: {
      name: 'Ahmed Sékou Touré',
      role: 'President',
      life: { birth: '1922-01-09', death: '1984-03-26' },
    },
    capital: 'Conakry',
    majorCities: ['Nzérékoré', 'Kankan', 'Kindia'],
  },
  {
    id: 'guinea-bissau',
    iso3166Alpha2: 'GW',
    name: 'Guinea-Bissau',
    subregion: 'west_africa',
    sovereigntyStatus: 'independent',
    independenceDate: '1973-09-24',
    independenceYear: 1973,
    independenceFrom: 'Portugal (recognized 1974, per doc)',
    firstLeader: {
      name: 'Luís Cabral',
      role: 'President',
      life: { birth: '1931-04-11', death: '2009-05-30' },
    },
    capital: 'Bissau',
    majorCities: ['Bafatá', 'Gabú', 'Cacheu'],
  },
  {
    id: 'liberia',
    iso3166Alpha2: 'LR',
    name: 'Liberia',
    subregion: 'west_africa',
    sovereigntyStatus: 'independent',
    independenceDate: '1847-07-26',
    independenceYear: 1847,
    independenceFrom: 'American Colonization Society (U.S.-backed settlement, per doc)',
    firstLeader: {
      name: 'Joseph Jenkins Roberts',
      role: 'President',
      life: { birth: '1809-03-15', death: '1876-02-24' },
    },
    capital: 'Monrovia',
    majorCities: ['Gbarnga', 'Buchanan', 'Kakata'],
  },
  {
    id: 'mali',
    iso3166Alpha2: 'ML',
    name: 'Mali',
    subregion: 'west_africa',
    sovereigntyStatus: 'independent',
    independenceDate: '1960-09-22',
    independenceYear: 1960,
    independenceFrom: 'France',
    firstLeader: {
      name: 'Modibo Keïta',
      role: 'President',
      life: { birth: '1915-06-04', death: '1977-05-16' },
    },
    capital: 'Bamako',
    majorCities: ['Sikasso', 'Mopti', 'Koutiala'],
  },
  {
    id: 'mauritania',
    iso3166Alpha2: 'MR',
    name: 'Mauritania',
    subregion: 'west_africa',
    sovereigntyStatus: 'independent',
    independenceDate: '1960-11-28',
    independenceYear: 1960,
    independenceFrom: 'France',
    firstLeader: {
      name: 'Moktar Ould Daddah',
      role: 'President',
      life: { birth: '1924-12-25', death: '2003-10-14' },
    },
    capital: 'Nouakchott',
    majorCities: ['Nouadhibou', 'Rosso', 'Kaédi'],
  },
  {
    id: 'niger',
    iso3166Alpha2: 'NE',
    name: 'Niger',
    subregion: 'west_africa',
    sovereigntyStatus: 'independent',
    independenceDate: '1960-08-03',
    independenceYear: 1960,
    independenceFrom: 'France',
    firstLeader: {
      name: 'Hamani Diori',
      role: 'President',
      life: { birth: '1916-06-06', death: '1989-04-23' },
    },
    capital: 'Niamey',
    majorCities: ['Zinder', 'Maradi', 'Agadez'],
  },
  {
    id: 'nigeria',
    iso3166Alpha2: 'NG',
    name: 'Nigeria',
    subregion: 'west_africa',
    sovereigntyStatus: 'independent',
    independenceDate: '1960-10-01',
    independenceYear: 1960,
    independenceFrom: 'United Kingdom',
    firstLeader: {
      name: 'Abubakar Tafawa Balewa',
      role: 'Prime Minister',
      life: { birth: 'Dec 1912', death: '1966-01-15' },
    },
    capital: 'Abuja',
    majorCities: ['Lagos', 'Kano', 'Ibadan'],
  },
  {
    id: 'senegal',
    iso3166Alpha2: 'SN',
    name: 'Senegal',
    subregion: 'west_africa',
    sovereigntyStatus: 'independent',
    independenceDate: '1960-04-04',
    independenceYear: 1960,
    independenceFrom: 'France',
    firstLeader: {
      name: 'Léopold Sédar Senghor',
      role: 'President',
      life: { birth: '1906-10-09', death: '2001-12-20' },
    },
    capital: 'Dakar',
    majorCities: ['Touba', 'Thiès', 'Kaolack'],
  },
  {
    id: 'sierra-leone',
    iso3166Alpha2: 'SL',
    name: 'Sierra Leone',
    subregion: 'west_africa',
    sovereigntyStatus: 'independent',
    independenceDate: '1961-04-27',
    independenceYear: 1961,
    independenceFrom: 'United Kingdom',
    firstLeader: {
      name: 'Milton Margai',
      role: 'Prime Minister',
      life: { birth: '1895-12-07', death: '1964-04-28' },
    },
    capital: 'Freetown',
    majorCities: ['Bo', 'Kenema', 'Makeni'],
  },
  {
    id: 'togo',
    iso3166Alpha2: 'TG',
    name: 'Togo',
    subregion: 'west_africa',
    sovereigntyStatus: 'independent',
    independenceDate: '1960-04-27',
    independenceYear: 1960,
    independenceFrom: 'France',
    firstLeader: {
      name: 'Sylvanus Olympio',
      role: 'President',
      life: { birth: '1902-09-06', death: '1963-01-13' },
    },
    capital: 'Lomé',
    majorCities: ['Sokodé', 'Kara', 'Kpalimé'],
  },

  // ——— Central Africa ———
  {
    id: 'cameroon',
    iso3166Alpha2: 'CM',
    name: 'Cameroon',
    subregion: 'central_africa',
    sovereigntyStatus: 'independent',
    independenceDate: '1960-01-01',
    independenceYear: 1960,
    independenceFrom: 'France',
    firstLeader: {
      name: 'Ahmadou Ahidjo',
      role: 'President',
      life: { birth: '1924-08-24', death: '1989-11-30' },
    },
    capital: 'Yaoundé',
    majorCities: ['Douala', 'Garoua', 'Bamenda'],
  },
  {
    id: 'central-african-republic',
    iso3166Alpha2: 'CF',
    name: 'Central African Republic',
    subregion: 'central_africa',
    sovereigntyStatus: 'independent',
    independenceDate: '1960-08-13',
    independenceYear: 1960,
    independenceFrom: 'France',
    firstLeader: {
      name: 'David Dacko',
      role: 'President',
      life: { birth: '1930-03-24', death: '2003-11-20' },
    },
    capital: 'Bangui',
    majorCities: ['Bimbo', 'Berbérati', 'Carnot'],
  },
  {
    id: 'chad',
    iso3166Alpha2: 'TD',
    name: 'Chad',
    subregion: 'central_africa',
    sovereigntyStatus: 'independent',
    independenceDate: '1960-08-11',
    independenceYear: 1960,
    independenceFrom: 'France',
    firstLeader: {
      name: 'François Tombalbaye',
      role: 'President',
      life: { birth: '1918-06-15', death: '1975-04-13' },
    },
    capital: "N'Djamena",
    majorCities: ['Moundou', 'Sarh', 'Abéché'],
  },
  {
    id: 'congo',
    iso3166Alpha2: 'CG',
    name: 'Republic of the Congo',
    subregion: 'central_africa',
    sovereigntyStatus: 'independent',
    independenceDate: '1960-08-15',
    independenceYear: 1960,
    independenceFrom: 'France',
    firstLeader: {
      name: 'Fulbert Youlou',
      role: 'President',
      life: { birth: '1917-06-09', death: '1972-05-06' },
    },
    capital: 'Brazzaville',
    majorCities: ['Pointe-Noire', 'Dolisie', 'Nkayi'],
  },
  {
    id: 'dr-congo',
    iso3166Alpha2: 'CD',
    name: 'Democratic Republic of the Congo',
    subregion: 'central_africa',
    sovereigntyStatus: 'independent',
    independenceDate: '1960-06-30',
    independenceYear: 1960,
    independenceFrom: 'Belgium',
    firstLeader: {
      name: 'Joseph Kasa-Vubu',
      role: 'President',
      life: { birth: 'c. 1917', death: '1969-03-24' },
    },
    otherLeadersAtIndependence: [
      {
        name: 'Patrice Lumumba',
        role: 'Prime Minister',
        life: { death: '1961-01-17' },
        notes: 'Listed alongside Kasa-Vubu in datesCore summary.',
      },
    ],
    capital: 'Kinshasa',
    majorCities: ['Lubumbashi', 'Mbuji-Mayi', 'Kisangani'],
  },
  {
    id: 'equatorial-guinea',
    iso3166Alpha2: 'GQ',
    name: 'Equatorial Guinea',
    subregion: 'central_africa',
    sovereigntyStatus: 'independent',
    independenceDate: '1968-10-12',
    independenceYear: 1968,
    independenceFrom: 'Spain',
    firstLeader: {
      name: 'Francisco Macías Nguema',
      role: 'President',
      life: { birth: '1924-01-01', death: '1979-09-29' },
    },
    capital: 'Malabo',
    majorCities: ['Bata', 'Ebebiyín', 'Mongomo'],
  },
  {
    id: 'gabon',
    iso3166Alpha2: 'GA',
    name: 'Gabon',
    subregion: 'central_africa',
    sovereigntyStatus: 'independent',
    independenceDate: '1960-08-17',
    independenceYear: 1960,
    independenceFrom: 'France',
    firstLeader: {
      name: "Léon M'ba",
      role: 'President',
      life: { birth: '1902-02-09', death: '1967-11-27' },
    },
    capital: 'Libreville',
    majorCities: ['Port-Gentil', 'Franceville', 'Oyem'],
  },
  {
    id: 'sao-tome-principe',
    iso3166Alpha2: 'ST',
    name: 'São Tomé and Príncipe',
    subregion: 'central_africa',
    sovereigntyStatus: 'independent',
    independenceDate: '1975-07-12',
    independenceYear: 1975,
    independenceFrom: 'Portugal',
    firstLeader: {
      name: 'Manuel Pinto da Costa',
      role: 'President',
      life: { birth: '1937-08-05', death: '2022-11-07' },
      notes: 'Life dates as given in datesCore.',
    },
    capital: 'São Tomé',
    majorCities: ['Trindade', 'Neves', 'Santana'],
  },

  // ——— East Africa ———
  {
    id: 'burundi',
    iso3166Alpha2: 'BI',
    name: 'Burundi',
    subregion: 'east_africa',
    sovereigntyStatus: 'independent',
    independenceDate: '1962-07-01',
    independenceYear: 1962,
    independenceFrom: 'Belgium',
    firstLeader: {
      name: 'King Mwambutsa IV',
      role: 'King',
      life: { birth: '1912-05-06', death: '1977-04-26' },
    },
    capital: 'Gitega',
    majorCities: ['Bujumbura', 'Ngozi', 'Rumonge'],
  },
  {
    id: 'comoros',
    iso3166Alpha2: 'KM',
    name: 'Comoros',
    subregion: 'east_africa',
    sovereigntyStatus: 'independent',
    independenceDate: '1975-07-06',
    independenceYear: 1975,
    independenceFrom: 'France',
    firstLeader: {
      name: 'Ahmed Abdallah',
      role: 'President',
      life: { birth: '1919-06-12', death: '1989-11-26' },
    },
    capital: 'Moroni',
    majorCities: ['Mutsamudu', 'Fomboni', 'Domoni'],
  },
  {
    id: 'djibouti',
    iso3166Alpha2: 'DJ',
    name: 'Djibouti',
    subregion: 'east_africa',
    sovereigntyStatus: 'independent',
    independenceDate: '1977-06-27',
    independenceYear: 1977,
    independenceFrom: 'France',
    firstLeader: {
      name: 'Hassan Gouled Aptidon',
      role: 'President',
      life: { birth: '1916-10-15', death: '2006-11-21' },
    },
    capital: 'Djibouti City',
    majorCities: ['Ali Sabieh', 'Tadjoura', 'Obock'],
  },
  {
    id: 'eritrea',
    iso3166Alpha2: 'ER',
    name: 'Eritrea',
    subregion: 'east_africa',
    sovereigntyStatus: 'independent',
    independenceDate: '1993-05-24',
    independenceYear: 1993,
    independenceFrom: 'Ethiopia',
    firstLeader: {
      name: 'Isaias Afwerki',
      role: 'President',
      life: { birth: '1946-02-02', living: true },
    },
    capital: 'Asmara',
    majorCities: ['Keren', 'Massawa', 'Assab'],
  },
  {
    id: 'ethiopia',
    iso3166Alpha2: 'ET',
    name: 'Ethiopia',
    subregion: 'east_africa',
    sovereigntyStatus: 'not_colonized',
    independenceNotes:
      'Never formally colonized (Italian occupation 1936–1941). Leader at restoration (1941): Emperor Haile Selassie.',
    firstLeader: {
      name: 'Emperor Haile Selassie',
      role: 'Leader at restoration (1941)',
      life: { birth: '1892-07-23', death: '1975-08-27' },
    },
    capital: 'Addis Ababa',
    majorCities: ['Dire Dawa', 'Mekelle', 'Gondar'],
  },
  {
    id: 'kenya',
    iso3166Alpha2: 'KE',
    name: 'Kenya',
    subregion: 'east_africa',
    sovereigntyStatus: 'independent',
    independenceDate: '1963-12-12',
    independenceYear: 1963,
    independenceFrom: 'United Kingdom',
    firstLeader: {
      name: 'Jomo Kenyatta',
      role: 'Prime Minister; later President',
      life: { birth: 'c. 1897', death: '1978-08-22' },
    },
    capital: 'Nairobi',
    majorCities: ['Mombasa', 'Kisumu', 'Nakuru'],
  },
  {
    id: 'rwanda',
    iso3166Alpha2: 'RW',
    name: 'Rwanda',
    subregion: 'east_africa',
    sovereigntyStatus: 'independent',
    independenceDate: '1962-07-01',
    independenceYear: 1962,
    independenceFrom: 'Belgium',
    firstLeader: {
      name: 'Grégoire Kayibanda',
      role: 'President',
      life: { birth: '1924-05-01', death: '1976-12-15' },
    },
    capital: 'Kigali',
    majorCities: ['Huye (Butare)', 'Muhanga (Gitarama)', 'Musanze (Ruhengeri)'],
  },
  {
    id: 'somalia',
    iso3166Alpha2: 'SO',
    name: 'Somalia',
    subregion: 'east_africa',
    sovereigntyStatus: 'independent',
    independenceDate: '1960-07-01',
    independenceYear: 1960,
    independenceFrom: 'Italy / United Kingdom',
    firstLeader: {
      name: 'Aden Abdullah Osman Daar',
      role: 'President',
      life: { birth: '1908', death: '2007-06-08' },
    },
    capital: 'Mogadishu',
    majorCities: ['Hargeisa', 'Bosaso', 'Kismayo'],
  },
  {
    id: 'south-sudan',
    iso3166Alpha2: 'SS',
    name: 'South Sudan',
    subregion: 'east_africa',
    sovereigntyStatus: 'independent',
    independenceDate: '2011-07-09',
    independenceYear: 2011,
    independenceFrom: 'Sudan',
    firstLeader: {
      name: 'Salva Kiir Mayardit',
      role: 'President',
      life: { birth: '1951-09-13', living: true },
    },
    capital: 'Juba',
    majorCities: ['Wau', 'Malakal', 'Bor'],
  },
  {
    id: 'tanzania',
    iso3166Alpha2: 'TZ',
    name: 'Tanzania',
    subregion: 'east_africa',
    sovereigntyStatus: 'independent',
    independenceDate: '1961-12-09',
    independenceYear: 1961,
    independenceFrom: 'United Kingdom (Tanganyika; union with Zanzibar 1964, per doc)',
    firstLeader: {
      name: 'Julius Nyerere',
      role: 'Prime Minister; later President',
      life: { birth: '1922-04-13', death: '1999-10-14' },
    },
    capital: 'Dodoma',
    majorCities: ['Dar es Salaam', 'Mwanza', 'Arusha'],
  },
  {
    id: 'uganda',
    iso3166Alpha2: 'UG',
    name: 'Uganda',
    subregion: 'east_africa',
    sovereigntyStatus: 'independent',
    independenceDate: '1962-10-09',
    independenceYear: 1962,
    independenceFrom: 'United Kingdom',
    firstLeader: {
      name: 'Milton Obote',
      role: 'Prime Minister',
      life: { birth: '1925-12-28', death: '2005-10-10' },
    },
    capital: 'Kampala',
    majorCities: ['Gulu', 'Mbarara', 'Jinja'],
  },

  // ——— Southern Africa ———
  {
    id: 'angola',
    iso3166Alpha2: 'AO',
    name: 'Angola',
    subregion: 'southern_africa',
    sovereigntyStatus: 'independent',
    independenceDate: '1975-11-11',
    independenceYear: 1975,
    independenceFrom: 'Portugal',
    firstLeader: {
      name: 'Agostinho Neto',
      role: 'President',
      life: { birth: '1922-09-17', death: '1979-09-10' },
    },
    capital: 'Luanda',
    majorCities: ['Huambo', 'Lobito', 'Benguela'],
  },
  {
    id: 'botswana',
    iso3166Alpha2: 'BW',
    name: 'Botswana',
    subregion: 'southern_africa',
    sovereigntyStatus: 'independent',
    independenceDate: '1966-09-30',
    independenceYear: 1966,
    independenceFrom: 'United Kingdom',
    firstLeader: {
      name: 'Seretse Khama',
      role: 'President',
      life: { birth: '1921-07-01', death: '1980-07-13' },
    },
    capital: 'Gaborone',
    majorCities: ['Francistown', 'Maun', 'Molepolole'],
  },
  {
    id: 'eswatini',
    iso3166Alpha2: 'SZ',
    name: 'Eswatini',
    commonName: 'Eswatini (Swaziland)',
    subregion: 'southern_africa',
    sovereigntyStatus: 'independent',
    independenceDate: '1968-09-06',
    independenceYear: 1968,
    independenceFrom: 'United Kingdom',
    firstLeader: {
      name: 'King Sobhuza II',
      role: 'King',
      life: { birth: '1899-07-22', death: '1982-08-21' },
    },
    capital: 'Mbabane (administrative), Lobamba (royal)',
    majorCities: ['Manzini', 'Siteki', 'Big Bend'],
  },
  {
    id: 'lesotho',
    iso3166Alpha2: 'LS',
    name: 'Lesotho',
    subregion: 'southern_africa',
    sovereigntyStatus: 'independent',
    independenceDate: '1966-10-04',
    independenceYear: 1966,
    independenceFrom: 'United Kingdom',
    firstLeader: {
      name: 'Leabua Jonathan',
      role: 'Prime Minister',
      life: { birth: '1914-10-30', death: '1987-04-05' },
    },
    capital: 'Maseru',
    majorCities: ['Teyateyaneng', 'Mafeteng', 'Hlotse'],
  },
  {
    id: 'madagascar',
    iso3166Alpha2: 'MG',
    name: 'Madagascar',
    subregion: 'southern_africa',
    sovereigntyStatus: 'independent',
    independenceDate: '1960-06-26',
    independenceYear: 1960,
    independenceFrom: 'France',
    firstLeader: {
      name: 'Philibert Tsiranana',
      role: 'President',
      life: { birth: '1912-10-18', death: '1978-04-16' },
    },
    capital: 'Antananarivo',
    majorCities: ['Toamasina', 'Antsirabe', 'Mahajanga'],
  },
  {
    id: 'malawi',
    iso3166Alpha2: 'MW',
    name: 'Malawi',
    subregion: 'southern_africa',
    sovereigntyStatus: 'independent',
    independenceDate: '1964-07-06',
    independenceYear: 1964,
    independenceFrom: 'United Kingdom',
    firstLeader: {
      name: 'Hastings Banda',
      role: 'Prime Minister; later President',
      life: { birth: 'c. 1898', death: '1997-11-25' },
    },
    capital: 'Lilongwe',
    majorCities: ['Blantyre', 'Mzuzu', 'Zomba'],
  },
  {
    id: 'mauritius',
    iso3166Alpha2: 'MU',
    name: 'Mauritius',
    subregion: 'southern_africa',
    sovereigntyStatus: 'independent',
    independenceDate: '1968-03-12',
    independenceYear: 1968,
    independenceFrom: 'United Kingdom',
    firstLeader: {
      name: 'Seewoosagur Ramgoolam',
      role: 'Prime Minister',
      life: { birth: '1900-09-18', death: '1985-12-15' },
    },
    capital: 'Port Louis',
    majorCities: ['Curepipe', 'Vacoas-Phoenix', 'Beau Bassin-Rose Hill'],
  },
  {
    id: 'mozambique',
    iso3166Alpha2: 'MZ',
    name: 'Mozambique',
    subregion: 'southern_africa',
    sovereigntyStatus: 'independent',
    independenceDate: '1975-06-25',
    independenceYear: 1975,
    independenceFrom: 'Portugal',
    firstLeader: {
      name: 'Samora Machel',
      role: 'President',
      life: { birth: '1933-09-29', death: '1986-10-19' },
    },
    capital: 'Maputo',
    majorCities: ['Matola', 'Beira', 'Nampula'],
  },
  {
    id: 'namibia',
    iso3166Alpha2: 'NA',
    name: 'Namibia',
    subregion: 'southern_africa',
    sovereigntyStatus: 'independent',
    independenceDate: '1990-03-21',
    independenceYear: 1990,
    independenceFrom: 'South Africa (administration)',
    firstLeader: {
      name: 'Sam Nujoma',
      role: 'President',
      life: { birth: '1929-05-12', living: true },
    },
    capital: 'Windhoek',
    majorCities: ['Walvis Bay', 'Swakopmund', 'Rundu'],
  },
  {
    id: 'seychelles',
    iso3166Alpha2: 'SC',
    name: 'Seychelles',
    subregion: 'southern_africa',
    sovereigntyStatus: 'independent',
    independenceDate: '1976-06-29',
    independenceYear: 1976,
    independenceFrom: 'United Kingdom',
    firstLeader: {
      name: 'James Mancham',
      role: 'President',
      life: { birth: '1939-08-11', death: '2017-01-08' },
    },
    capital: 'Victoria',
    majorCities: ['Anse Boileau', 'Beau Vallon', 'Takamaka'],
  },
  {
    id: 'south-africa',
    iso3166Alpha2: 'ZA',
    name: 'South Africa',
    subregion: 'southern_africa',
    sovereigntyStatus: 'union_self_rule',
    independenceDate: '1910-05-31',
    independenceYear: 1910,
    independenceFrom: 'United Kingdom',
    independenceNotes: 'Union (self-rule). Doc also mentions Republic 31 May 1961.',
    firstLeader: {
      name: 'Louis Botha',
      role: 'Prime Minister',
      life: { birth: '1862-09-27', death: '1919-08-27' },
    },
    capital: 'Pretoria (admin), Cape Town (legislative), Bloemfontein (judicial)',
    majorCities: ['Johannesburg', 'Cape Town', 'Durban'],
  },
  {
    id: 'zambia',
    iso3166Alpha2: 'ZM',
    name: 'Zambia',
    subregion: 'southern_africa',
    sovereigntyStatus: 'independent',
    independenceDate: '1964-10-24',
    independenceYear: 1964,
    independenceFrom: 'United Kingdom',
    firstLeader: {
      name: 'Kenneth Kaunda',
      role: 'President',
      life: { birth: '1924-04-28', death: '2021-06-17' },
    },
    capital: 'Lusaka',
    majorCities: ['Kitwe', 'Ndola', 'Livingstone'],
  },
  {
    id: 'zimbabwe',
    iso3166Alpha2: 'ZW',
    name: 'Zimbabwe',
    subregion: 'southern_africa',
    sovereigntyStatus: 'independent',
    independenceDate: '1980-04-18',
    independenceYear: 1980,
    independenceFrom: 'United Kingdom',
    firstLeader: {
      name: 'Robert Mugabe',
      role: 'Prime Minister',
      life: { birth: '1924-02-21', death: '2019-09-06' },
    },
    capital: 'Harare',
    majorCities: ['Bulawayo', 'Chitungwiza', 'Mutare'],
  },
] as const

/** Ghana / Nigeria / Kenya examples also appear under “African country independence days” in datesCore. */
export const africaIndependenceExamplesFromStandard: readonly { country: string; mmdd: string }[] = [
  { country: 'Ghana', mmdd: '03-06' },
  { country: 'Nigeria', mmdd: '10-01' },
  { country: 'Kenya', mmdd: '12-12' },
] as const

export function getAfricaCountryByIso2(code: string): AfricaCountryEntry | undefined {
  const upper = code.trim().toUpperCase()
  return africaCountries.find((c) => c.iso3166Alpha2 === upper)
}

export function listAfricaCountriesBySubregion(subregion: AfricaSubregion): readonly AfricaCountryEntry[] {
  return africaCountries.filter((c) => c.subregion === subregion)
}

/** Chronological by `independenceDate` / `independenceYear`; entries without a sortable date last. */
export function listAfricaCountriesByIndependenceChrono(): readonly AfricaCountryEntry[] {
  return [...africaCountries].sort((a, b) => {
    const da = a.independenceDate ?? ''
    const db = b.independenceDate ?? ''
    if (da && db) return da.localeCompare(db)
    if (da) return -1
    if (db) return 1
    return (a.name ?? '').localeCompare(b.name ?? '')
  })
}
