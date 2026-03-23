/**
 * General globally referenced calendar dates & observances (by calendar month).
 *
 * Source standard: docs/from/Corey/Mar22.Greenfire.Development.CoresAndStandards.datesCore
 * (globalHolidays + Research.TimeDates / NotableGlobalDatesAndHolidays sections)
 *
 * Notes:
 * - Fixed dates use `mmdd` as "MM-DD" (Gregorian, non-leap template). Leap-day entries are flagged.
 * - Floating / cultural / lunar dates use `schedule` instead of `mmdd`.
 * - This module is reference data only — not a holiday engine (no locale or jurisdiction rules).
 */

/** High-level grouping for filtering / UI */
export type GlobalDateCategory =
  | 'month_anchor'
  | 'public_holiday'
  | 'cultural'
  | 'crypto'
  | 'commemoration'
  | 'varies'

export interface GlobalDateEntry {
  /** Stable id for keys / i18n */
  id: string
  /** Human-readable label */
  label: string
  /** Fixed annual calendar day "MM-DD" when applicable */
  mmdd?: string
  /**
   * Human-readable rule when the date is not a single fixed MDY day
   * (e.g. US federal Monday holidays, lunar new year, Thanksgiving).
   */
  schedule?: string
  category: GlobalDateCategory
  /** Optional extra context from the standards doc */
  notes?: string
}

/** Months 1–12 → entries that “belong” to that month (anchors + observances dated in that month). */
export const generalGlobalDatesByMonth: Readonly<Record<number, readonly GlobalDateEntry[]>> = {
  1: [
    {
      id: 'first-of-january',
      label: 'First of January',
      mmdd: '01-01',
      category: 'month_anchor',
    },
    {
      id: 'haiti-independence-day',
      label: 'Haiti Independence Day',
      mmdd: '01-01',
      category: 'public_holiday',
      notes: 'Independence from France (1804).',
    },
    {
      id: 'goldie',
      label: 'Goldie',
      mmdd: '01-19',
      category: 'commemoration',
    },
    {
      id: 'martin-luther-king-jr-day-us',
      label: "Martin Luther King Jr. Day",
      schedule: 'Third Monday in January (U.S. federal holiday)',
      category: 'public_holiday',
      notes: 'United States.',
    },
  ],

  2: [
    {
      id: 'first-of-february',
      label: 'First of February',
      mmdd: '02-01',
      category: 'month_anchor',
    },
    {
      id: 'valentines-day',
      label: "Valentine's Day",
      mmdd: '02-14',
      category: 'cultural',
    },
    {
      id: 'february-29-leap',
      label: 'February 29th',
      schedule: 'February 29 in leap years only',
      category: 'month_anchor',
      notes: 'Leap day.',
    },
  ],

  3: [
    {
      id: 'first-of-march',
      label: 'First of March',
      mmdd: '03-01',
      category: 'month_anchor',
    },
    {
      id: 'founders-day',
      label: 'Founders Day',
      mmdd: '03-25',
      category: 'cultural',
      notes: 'Varies by organization / country; 03/25 listed in datesCore prompt section.',
    },
  ],

  4: [
    {
      id: 'first-of-april',
      label: 'First of April',
      mmdd: '04-01',
      category: 'month_anchor',
    },
  ],

  5: [
    {
      id: 'first-of-may',
      label: 'First of May',
      mmdd: '05-01',
      category: 'month_anchor',
    },
    {
      id: 'malcolm-x-birthday',
      label: 'Malcolm X (birthday)',
      mmdd: '05-19',
      category: 'commemoration',
      notes: 'Listed under global / notable figures in datesCore.',
    },
  ],

  6: [
    {
      id: 'first-of-june',
      label: 'First of June',
      mmdd: '06-01',
      category: 'month_anchor',
    },
    {
      id: 'juneteenth',
      label: 'Juneteenth',
      mmdd: '06-19',
      category: 'public_holiday',
      notes: 'U.S. federal commemoration.',
    },
  ],

  7: [
    {
      id: 'first-of-july',
      label: 'First of July',
      mmdd: '07-01',
      category: 'month_anchor',
    },
    {
      id: 'ethereum-day',
      label: 'Ethereum Day',
      mmdd: '07-30',
      category: 'crypto',
      notes: 'Ethereum mainnet launch (2015) — datesCore “cryptocurrency days” section.',
    },
    {
      id: 'fourth-of-july-us',
      label: 'Fourth of July (U.S. Independence Day)',
      mmdd: '07-04',
      category: 'public_holiday',
      notes: 'United States.',
    },
    {
      id: 'nickys-day',
      label: "Nicky's Day",
      mmdd: '07-13',
      category: 'commemoration',
    },
    {
      id: 'nelson-mandela-day',
      label: 'Nelson Mandela International Day',
      mmdd: '07-18',
      category: 'commemoration',
    },
    {
      id: 'franz-fanon-birthday',
      label: 'Franz Fanon (birthday)',
      mmdd: '07-20',
      category: 'commemoration',
    },
  ],

  8: [
    {
      id: 'first-of-august',
      label: 'First of August',
      mmdd: '08-01',
      category: 'month_anchor',
    },
    {
      id: 'james-baldwin-birthday',
      label: 'James Baldwin (birthday)',
      mmdd: '08-02',
      category: 'commemoration',
    },
  ],

  9: [
    {
      id: 'first-of-september',
      label: 'First of September',
      mmdd: '09-01',
      category: 'month_anchor',
    },
  ],

  10: [
    {
      id: 'first-of-october',
      label: 'First of October',
      mmdd: '10-01',
      category: 'month_anchor',
    },
    {
      id: 'litecoin-day',
      label: 'Litecoin Day',
      mmdd: '10-13',
      category: 'crypto',
      notes: 'Litecoin genesis block (2011) — datesCore.',
    },
    {
      id: 'bitcoin-day-whitepaper',
      label: 'Bitcoin Day (whitepaper)',
      mmdd: '10-31',
      category: 'crypto',
      notes: '“Bitcoin: A Peer-to-Peer Electronic Cash System” published 2008.',
    },
  ],

  11: [
    {
      id: 'first-of-november',
      label: 'First of November',
      mmdd: '11-01',
      category: 'month_anchor',
    },
    {
      id: 'singles-day',
      label: 'Singles Day',
      mmdd: '11-11',
      category: 'cultural',
      notes: 'Often associated with China / e-commerce.',
    },
    {
      id: 'cors-day',
      label: "Cor's Day",
      mmdd: '11-16',
      category: 'commemoration',
    },
    {
      id: 'uzis-day',
      label: "Uzi's Day",
      mmdd: '11-28',
      category: 'commemoration',
    },
    {
      id: 'thanksgiving-us',
      label: 'Thanksgiving (United States)',
      schedule: 'Fourth Thursday in November',
      category: 'public_holiday',
    },
  ],

  12: [
    {
      id: 'first-of-december',
      label: 'First of December',
      mmdd: '12-01',
      category: 'month_anchor',
    },
    {
      id: 'christmas',
      label: 'Christmas',
      mmdd: '12-25',
      category: 'public_holiday',
      notes: 'Christian / widespread civil observance.',
    },
    {
      id: 'boxing-day',
      label: 'Boxing Day',
      mmdd: '12-26',
      category: 'public_holiday',
      notes: 'UK, Canada, and others; exact observance can vary by jurisdiction.',
    },
    {
      id: 'kwanzaa',
      label: 'Kwanzaa',
      schedule: 'December 26 – January 1',
      category: 'cultural',
    },
  ],
} as const

/** Cross-month or non-month-indexed items from datesCore (kept separate for clarity). */
export const generalGlobalDatesUnanchored: readonly GlobalDateEntry[] = [
  {
    id: 'chinese-new-year',
    label: 'Chinese New Year',
    schedule: 'Varies (lunar calendar; typically late January–February)',
    category: 'cultural',
  },
  {
    id: 'african-independence-examples-ghana',
    label: 'Ghana Independence Day (example)',
    mmdd: '03-06',
    category: 'public_holiday',
    notes: 'Example cited in datesCore for African independence dates (varies by country).',
  },
  {
    id: 'african-independence-examples-nigeria',
    label: 'Nigeria Independence Day (example)',
    mmdd: '10-01',
    category: 'public_holiday',
    notes: 'Example cited in datesCore.',
  },
  {
    id: 'african-independence-examples-kenya',
    label: 'Kenya Independence Day (example)',
    mmdd: '12-12',
    category: 'public_holiday',
    notes: 'Example cited in datesCore.',
  },
  {
    id: 'aciel',
    label: 'Aciel',
    category: 'commemoration',
    schedule: 'See organizational / personal calendar',
    notes: 'Named in datesCore global list without fixed public mmdd.',
  },
  {
    id: 'tim',
    label: 'Tim',
    category: 'commemoration',
    schedule: 'See organizational / personal calendar',
    notes: 'Named in datesCore global list without fixed public mmdd.',
  },
] as const

/** Flat list: all month-bucketed entries (1–12), sorted by month then label. */
export function listAllGeneralGlobalDates(): GlobalDateEntry[] {
  const out: GlobalDateEntry[] = []
  for (let m = 1; m <= 12; m++) {
    out.push(...generalGlobalDatesByMonth[m])
  }
  return out
}

/** Lookup helper */
export function getGeneralGlobalDatesForMonth(month: number): readonly GlobalDateEntry[] {
  if (month < 1 || month > 12) return []
  return generalGlobalDatesByMonth[month] ?? []
}
