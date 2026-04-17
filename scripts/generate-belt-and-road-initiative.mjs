#!/usr/bin/env node
/**
 * Generates `beltAndRoadInitiative/*.ts` country files and `index.ts` from RestCountries + existing alliance TS enrichment.
 * Usage: node scripts/generate-belt-and-road-initiative.mjs
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { execSync } from 'child_process'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..')
const ALLIANCES = path.join(ROOT, 'src/lib/cores/alliancesCore')
const OUT_DIR = path.join(ALLIANCES, 'beltAndRoadInitiative')
const RC_CACHE = path.join(ROOT, 'scripts/data/restcountries-all.json')

const BRI_NAMES = `Afghanistan, Albania, Algeria, Angola, Antigua and Barbuda, Argentina, Armenia, Austria, Azerbaijan, Bahrain, Bangladesh, Barbados, Belarus, Benin, Bolivia, Bosnia and Herzegovina, Botswana, Brunei, Bulgaria, Burundi, Cabo Verde, Cambodia, Cameroon, Central African Republic, Chad, Chile, China, Colombia, Comoros, Cook Islands, Costa Rica, Côte d'Ivoire, Croatia, Cuba, Cyprus, Czech Republic, Democratic Republic of the Congo, Djibouti, Dominica, Dominican Republic, Ecuador, Egypt, El Salvador, Equatorial Guinea, Eritrea, Estonia, Ethiopia, Fiji, Gabon, The Gambia, Georgia, Ghana, Greece, Grenada, Guinea, Guinea-Bissau, Guyana, Honduras, Hungary, Indonesia, Iran, Iraq, Italy, Jamaica, Jordan, Kazakhstan, Kenya, Kiribati, Kuwait, Kyrgyzstan, Laos, Latvia, Lebanon, Lesotho, Liberia, Libya, Lithuania, Luxembourg, Madagascar, Malawi, Malaysia, Maldives, Mali, Malta, Mauritania, Micronesia, Moldova, Mongolia, Montenegro, Morocco, Mozambique, Myanmar, Namibia, Nepal, New Zealand, Nicaragua, Niger, Nigeria, Niue, North Macedonia, Oman, Pakistan, Panama, Papua New Guinea, Peru, Philippines, Poland, Portugal, Qatar, Republic of the Congo, Romania, Russia, Rwanda, Samoa, Saudi Arabia, Senegal, Serbia, Seychelles, Sierra Leone, Singapore, Slovakia, Slovenia, Solomon Islands, Somalia, South Africa, South Sudan, Sri Lanka, Sudan, Suriname, Syria, Tajikistan, Tanzania, Thailand, Timor-Leste, Togo, Tonga, Trinidad and Tobago, Tunisia, Turkey, Turkmenistan, Uganda, Ukraine, United Arab Emirates, Uruguay, Uzbekistan, Vanuatu, Venezuela, Vietnam, Yemen, Zambia, Zimbabwe`
  .split(',')
  .map((s) => s.trim())

const MANUAL_SLUG = {
  "Côte d'Ivoire": 'ivoryCoast',
  'Czech Republic': 'czechRepublic',
  'Democratic Republic of the Congo': 'democraticRepublicOfTheCongo',
  'Republic of the Congo': 'republicOfTheCongo',
  'Antigua and Barbuda': 'antiguaAndBarbuda',
  'Bosnia and Herzegovina': 'bosniaAndHerzegovina',
  'Central African Republic': 'centralAfricanRepublic',
  'Cook Islands': 'cookIslands',
  'Costa Rica': 'costaRica',
  'Dominican Republic': 'dominicanRepublic',
  'El Salvador': 'elSalvador',
  'Equatorial Guinea': 'equatorialGuinea',
  'The Gambia': 'gambia',
  'Guinea-Bissau': 'guineaBissau',
  'New Zealand': 'newZealand',
  'North Macedonia': 'northMacedonia',
  'Papua New Guinea': 'papuaNewGuinea',
  'Solomon Islands': 'solomonIslands',
  'South Africa': 'southAfrica',
  'South Sudan': 'southSudan',
  'Sri Lanka': 'sriLanka',
  'Timor-Leste': 'timorLeste',
  'Trinidad and Tobago': 'trinidadAndTobago',
  'United Arab Emirates': 'unitedArabEmirates',
  'Cabo Verde': 'caboVerde',
}

const NAME_TO_RC = {
  'Cabo Verde': 'Cape Verde',
  "Côte d'Ivoire": 'Ivory Coast',
  'Czech Republic': 'Czechia',
  'The Gambia': 'Gambia',
}

const ENRICH_ORDER = ['allianceOfSahelStates', 'AMU', 'africanUnion', 'arabLeague']

function defaultSlug(name) {
  const base = name.replace(/^The /, '')
  return base
    .split(/[^A-Za-z]+/)
    .filter(Boolean)
    .map((w, i) => (i === 0 ? w.toLowerCase() : w[0].toUpperCase() + w.slice(1).toLowerCase()))
    .join('')
}

function slugFor(name) {
  return MANUAL_SLUG[name] || defaultSlug(name)
}

function loadEnrichment() {
  const enrich = {}
  const dirs = fs
    .readdirSync(ALLIANCES, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .filter((d) => d !== 'beltAndRoadInitiative')
    .sort((a, b) => (ENRICH_ORDER.indexOf(a) === -1 ? 99 : ENRICH_ORDER.indexOf(a)) - (ENRICH_ORDER.indexOf(b) === -1 ? 99 : ENRICH_ORDER.indexOf(b)))

  for (const dir of dirs) {
    const dpath = path.join(ALLIANCES, dir)
    for (const f of fs.readdirSync(dpath)) {
      if (!f.endsWith('.ts') || f === 'types.ts' || f === 'index.ts') continue
      const text = fs.readFileSync(path.join(dpath, f), 'utf8')
      const iso = text.match(/iso3166Alpha2: '([A-Z]{2})'/)
      if (!iso) continue
      const cities = text.match(/topMajorCities: (\[[\s\S]*?\])\s*,/)
      const ind = text.match(/independence: '([^']*)'/)
      const fl = text.match(/foundingLeader: '([^']*)'/)
      const cl = text.match(/currentLeader: '([^']*)'/)
      const ce = text.match(/cryptocurrencyExchanges: (\[[\s\S]*?\])\s*,/)
      const st = text.match(/stablecoin: '([^']*)'/)
      const se = text.match(/stockExchange: '([^']*)'/)
      const coords = text.match(/coordinates: \{ latitude: ([0-9.-]+), longitude: ([0-9.-]+) \}/)
      if (!cities) continue
      enrich[iso[1]] = {
        topMajorCities: cities[1],
        independence: ind?.[1],
        foundingLeader: fl?.[1],
        currentLeader: cl?.[1],
        cryptocurrencyExchanges: ce?.[1],
        stablecoin: st?.[1],
        stockExchange: se?.[1],
        latitude: coords ? coords[1] : undefined,
        longitude: coords ? coords[2] : undefined,
      }
    }
  }
  return enrich
}

function escapeStr(s) {
  return String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'")
}

function loadRestCountries() {
  if (!fs.existsSync(RC_CACHE)) {
    fs.mkdirSync(path.dirname(RC_CACHE), { recursive: true })
    if (fs.existsSync('/tmp/rc-all.json')) {
      fs.copyFileSync('/tmp/rc-all.json', RC_CACHE)
    } else {
      execSync(
        `curl -sS "https://restcountries.com/v3.1/all?fields=name,cca2,cca3,capital,latlng,currencies,timezones,population,languages" -o "${RC_CACHE}"`,
        { stdio: 'inherit' }
      )
    }
  }
  return JSON.parse(fs.readFileSync(RC_CACHE, 'utf8'))
}

function findRc(rcList, briName) {
  const alias = NAME_TO_RC[briName] || briName
  let c = rcList.find((x) => x.name.common === alias)
  if (c) return c
  c = rcList.find((x) => x.name.common === briName)
  if (c) return c
  c = rcList.find((x) => x.name.official === briName)
  if (c) return c
  return undefined
}

function fmtCurrency(currencies) {
  if (!currencies) return '(verify)'
  const k = Object.keys(currencies)[0]
  const n = currencies[k]?.name || k
  return `${n} (${k})`
}

function langs(rc) {
  const vs = rc.languages ? Object.values(rc.languages) : []
  return [vs[0] || 'Arabic', vs[1] || 'English', vs[2] || 'Regional languages'].slice(0, 3)
}

function defaultCities(capital, countryName) {
  const c = capital || countryName
  return `[ '${escapeStr(c)}', '${escapeStr(countryName)} — city 2 (verify)', '${escapeStr(countryName)} — city 3 (verify)', '${escapeStr(countryName)} — city 4 (verify)', '${escapeStr(countryName)} — city 5 (verify)' ]`
}

function main() {
  const rcList = loadRestCountries()
  const enrich = loadEnrichment()
  fs.mkdirSync(OUT_DIR, { recursive: true })

  const rows = []
  for (const briName of BRI_NAMES) {
    const rc = findRc(rcList, briName)
    if (!rc) throw new Error(`No RestCountries match for: ${briName}`)
    const iso = rc.cca2
    const slug = slugFor(briName)
    const capital = (rc.capital && rc.capital[0]) || briName
    const e = enrich[iso]
    const la = e?.latitude != null ? Number(e.latitude) : rc.latlng?.[0] ?? 0
    const lo = e?.longitude != null ? Number(e.longitude) : rc.latlng?.[1] ?? 0
    const topMajorCities = `${e?.topMajorCities || defaultCities(capital, briName)} as [string, string, string, string, string]`
    const independence = e?.independence || '(Historical — verify)'
    const foundingLeader = e?.foundingLeader || '(Historical — verify)'
    const currentLeader = e?.currentLeader || '(Verify with official government sources)'
    const cryptocurrencyExchanges =
      e?.cryptocurrencyExchanges || `[ 'Binance (P2P)', 'International OTC', 'Local regulation varies' ]`
    const stablecoin = e?.stablecoin || 'USDT / USDC common globally; legality varies by jurisdiction'
    const stockExchange = e?.stockExchange || 'National or regional exchange (verify)'
    const L = langs(rc)

    const content = `import type { BeltAndRoadInitiativeCountry } from './types'

export const ${slug}: BeltAndRoadInitiativeCountry = {
  name: '${escapeStr(briName)}',
  iso3166Alpha2: '${iso}',
  beltAndRoadInitiativeStatus: 'participant',
  capital: '${escapeStr(capital)}',
  coordinates: { latitude: ${la}, longitude: ${lo} },
  independence: '${escapeStr(independence)}',
  topMajorCities: ${topMajorCities},
  population: ${Math.round(rc.population || 0)},
  mainLanguages: [ '${escapeStr(L[0])}', '${escapeStr(L[1])}', '${escapeStr(L[2])}' ],
  currency: '${escapeStr(fmtCurrency(rc.currencies))}',
  timezone: '${escapeStr((rc.timezones && rc.timezones[0]) || 'UTC')}',
  foundingLeader: '${escapeStr(foundingLeader)}',
  currentLeader: '${escapeStr(currentLeader)}',
  cryptocurrencyExchanges: ${cryptocurrencyExchanges},
  stablecoin: '${escapeStr(stablecoin)}',
  stockExchange: '${escapeStr(stockExchange)}',
}
`
    fs.writeFileSync(path.join(OUT_DIR, `${slug}.ts`), content)
    rows.push({ slug, iso })
  }

  const imports = rows.map((r) => `import { ${r.slug} } from './${r.slug}'`).join('\n')
  const exports = rows.map((r) => r.slug).join(',\n  ')
  const arr = rows.map((r) => r.slug).join(',\n  ')
  const isoList = rows.map((r) => `'${r.iso}'`).join(',\n    ')

  const index = `export type {
  BeltAndRoadInitiativeCountry,
  BeltAndRoadInitiativeMembership,
  BeltAndRoadInitiativeOrganizationInfo,
} from './types'

import type { BeltAndRoadInitiativeCountry, BeltAndRoadInitiativeOrganizationInfo } from './types'
${imports}

export {
  ${exports},
}

/** BRI partner-country records in this module (${rows.length}). Order matches the source country list. */
export const beltAndRoadInitiativeMembers: readonly BeltAndRoadInitiativeCountry[] = [
  ${arr},
] as const

/**
 * Belt and Road Initiative (BRI / 一带一路): policy framework for transnational infrastructure and trade
 * connectivity; cooperation depth varies by country. Reference only — verify for official use.
 */
export const beltAndRoadInitiative: BeltAndRoadInitiativeOrganizationInfo = {
  officialName: 'Belt and Road Initiative',
  officialNameChinese: '一带一路',
  abbreviation: 'BRI',
  predecessorContext:
    'Announced as the Silk Road Economic Belt and 21st Century Maritime Silk Road (2013); evolved into umbrella cooperation with many partner states (informational).',
  established: {
    silkRoadEconomicBelt: '2013-09-07 (Kazakhstan — Silk Road Economic Belt speech context, informational)',
    maritimeSilkRoad: '2013-10-03 (Indonesia — 21st Century Maritime Silk Road speech context, informational)',
  },
  headquarters: {
    notes:
      'No single international secretariat equivalent to the Arab League; Chinese coordinating ministries and partner institutions (informational).',
  },
  cooperationLanguages: ['Chinese (Mandarin)', 'English', 'Arabic', 'French', 'Spanish', 'Russian', 'Others by project'],
  principalThemes: [
    'Infrastructure connectivity (transport, energy, digital)',
    'Trade, investment, and industrial cooperation',
    'Financial cooperation and people-to-people exchanges',
    'Policy coordination and project-level partnerships',
  ],
  objectivesSummary: [
    'Enhance connectivity and practical cooperation among participating countries',
    'Support trade facilitation and economic development through projects and financing',
    'Strengthen cultural, academic, and technical exchange where agreed',
  ],
  participantStatesIso2: [
    ${isoList},
  ],
  memberRecordsInModule: ${rows.length},
}
`
  fs.writeFileSync(path.join(OUT_DIR, 'index.ts'), index)
  console.log(`Wrote ${rows.length} country files + index.ts under beltAndRoadInitiative/`)
}

main()
