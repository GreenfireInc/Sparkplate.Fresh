import fs from 'fs'
import path from 'path'

const ROOT = 'src/lib/cores/alliancesCore/africanUnion'
const esc = (s) => s.replace(/\\/g, '\\\\').replace(/'/g, "\\'")

/** [name, website, email, twitter, instagram, linkedin, api, format, pattern, example, notes] */
const DATA = {
  AO: ['CTT Angola (Empresa Nacional de Correios)', 'https://www.ctt.ao/', 'geral@ctt.ao', 'https://x.com/cttangola', 'https://www.instagram.com/correiosdeangola/', 'https://www.linkedin.com/company/correios-de-angola/', '', 'none', '', '', 'No national structured postcode; descriptive street addressing and P.O. Box common'],
  BF: ['La Poste Burkina Faso (SONAPOST)', 'http://www.sonapost.bf/', 'contact@sonapost.bf', '', '', 'https://www.linkedin.com/company/sonapost/', '', 'none', '', '', 'No national postcode system; commune and P.O. Box routing'],
  BI: ['Régie nationale des Postes du Burundi', 'http://www.poste.bi/', 'info@burundipost.bi', '', '', 'https://www.linkedin.com/company/poste-burundi/', '', 'none', '', '', 'No national postcode; commune-based addressing'],
  BJ: ['La Poste du Bénin', 'https://www.poste.bj/', 'contact@poste.bj', '', '', 'https://www.linkedin.com/company/la-poste-du-benin/', '', 'none', '', '', 'No national postcode; arrondissement and P.O. Box'],
  BW: ['BotswanaPost', 'https://www.botspost.co.bw/', 'customercare@botspost.co.bw', 'https://x.com/BotswanaPost', 'https://www.instagram.com/botswanapost/', 'https://www.linkedin.com/company/botswanapost/', '', 'NNNNN', '^\\d{5}$', '00000', 'Five-digit national postcode (verify district mapping locally)'],
  CD: ['SCPT RDC (Services postaux)', 'https://scpt.cd/', 'info@postesrdc.cd', '', '', 'https://www.linkedin.com/company/scpt-rdc/', '', 'none', '', '', 'No universal national postcode; commune and P.O. Box'],
  CF: ['Office national des Postes RCA', 'https://onet-rca.cf/', 'contact@onet-rca.cf', '', '', '', '', 'none', '', '', 'No national postcode system'],
  CG: ['La Poste du Congo EMS', 'http://laposte.cg/', 'contact@lacongolaise.cg', '', '', 'https://www.linkedin.com/company/la-poste-congo/', '', 'none', '', '', 'No national postcode; Brazzaville/Pointe-Noire district addressing'],
  CI: ["La Poste de Côte d'Ivoire", 'https://www.la-poste.ci/', 'info@laposte.ci', 'https://x.com/LaPosteCI', 'https://www.instagram.com/laposteci/', 'https://www.linkedin.com/company/la-poste-de-cote-divoire/', '', 'none', '', '', 'No national postcode; commune and P.O. Box dominant'],
  CM: ['CAMPOST', 'http://campost.cm/', 'info@campost.cm', '', '', 'https://www.linkedin.com/company/campost/', '', 'none', '', '', 'No national postcode; regional and P.O. Box routing'],
  CV: ['Correios de Cabo Verde', 'https://correios.cv/', 'cac@cvcorreios.cv', 'https://x.com/correioscv', 'https://www.instagram.com/correioscv/', 'https://www.linkedin.com/company/correios-de-cabo-verde/', '', 'NNNN-NNNN', '^\\d{4}-\\d{4}$', '7600-001', 'Four-digit island prefix + four-digit delivery zone'],
  DJ: ['La Poste de Djibouti', 'https://www.laposte.dj/', 'poste.contact@yahoo.fr', '', '', '', '', 'none', '', '', 'No national postcode; district addressing in Djibouti City'],
  DZ: ['Algérie Poste', 'https://www.poste.dz/', 'contact@poste.dz', 'https://x.com/AlgPoste', 'https://www.instagram.com/postealgerie/', 'https://www.linkedin.com/company/algerie-poste/', '', 'NNNNN', '^\\d{5}$', '16000', 'Five-digit postcode (wilaya + delivery area)'],
  EG: ['Egypt Post', 'http://www.egpost.org/', 'webmaster@egpost.org', 'https://x.com/Egyptpost', 'https://www.instagram.com/egypt.post/', 'https://www.linkedin.com/company/egypt-post/', '', 'NNNNN', '^\\d{5}$', '11511', 'Five-digit national postcode'],
  EH: ['Sahrawi postal relay (APS corridor — informational)', 'https://www.poste.dz/', 'contact@poste.dz', '', '', '', '', 'none', '', '', 'No sovereign national postcode; disputed territory — verify routing with carrier'],
  ER: ['Eritrean Postal Service', 'https://www.shabait.com/category/national-development/telecom-post/', 'info@ericsson.com.er', '', '', '', '', 'none', '', '', 'No published national postcode system'],
  ET: ['Ethiopian Postal Service (EPSE)', 'https://www.ethiopostal.com/', 'info@ethiopostal.com', '', '', 'https://www.linkedin.com/company/ethiopian-postal-service/', '', 'NNNN', '^\\d{4}$', '1000', 'Four-digit postcode (Addis Ababa and regional centres)'],
  GA: ['Gabon Poste EMS', 'https://www.gabonpost.ga/', 'infos@gpost.ga', '', '', 'https://www.linkedin.com/company/gabon-poste/', '', 'none', '', '', 'No national postcode; Libreville/Port-Gentil district addressing'],
  GH: ['Ghana Post', 'http://ghanapost.com.gh/', 'info@ghanapost.com.gh', 'https://x.com/ghanapostgh', 'https://www.instagram.com/ghanapostgh/', 'https://www.linkedin.com/company/ghana-post/', '', 'none', '', '', 'GhanaPostGPS digital address parallel to legacy P.O. Box; no legacy numeric postcode'],
  GM: ['GamPost', 'https://gampost.gm/', 'info@gampost.gm', '', '', 'https://www.linkedin.com/company/gampost/', '', 'none', '', '', 'No national postcode; settlement and P.O. Box'],
  GN: ['La Poste Guinée', 'https://www.gui.post/', 'direction@gui.post', '', '', 'https://www.linkedin.com/company/la-poste-guinee/', '', 'none', '', '', 'No national postcode system'],
  GQ: ['Correos de Guinea Ecuatorial', 'https://www.correosgq.com/', 'info@correosgq.com', '', '', '', '', 'none', '', '', 'No national postcode; Malabo/Bata addressing'],
  GW: ['Correios da Guiné-Bissau', 'https://www.correios.gw/', 'geral@cgb.gw', '', '', '', '', 'NNNN', '^\\d{4}$', '1000', 'Four-digit postcode (Bissau and regional)'],
  KE: ['Postal Corporation of Kenya', 'http://posta.co.ke/', 'customercare@posta.co.ke', 'https://x.com/postakenya', 'https://www.instagram.com/postakenya/', 'https://www.linkedin.com/company/postal-corporation-of-kenya/', '', 'NNNNN', '^\\d{5}$', '00100', 'Five-digit postcode; P.O. Box culture remains common'],
  KM: ['Comores Poste', 'https://poste-comores.com/', 'contact@poste-comores.km', '', '', '', '', 'none', '', '', 'No national postcode; island and village addressing'],
  LR: ['LIBPOST', 'https://libpost.com.lr/', 'info@libpost.com.lr', '', '', 'https://www.linkedin.com/company/libpost/', '', 'NNNN', '^\\d{4}$', '1000', 'Four-digit postcode (Monrovia and counties)'],
  LS: ['Lesotho Postal Services', 'https://lesothopost.org.ls/', 'info@post.org.ls', '', '', 'https://www.linkedin.com/company/lesotho-postal-services/', '', 'NNN', '^\\d{3}$', '100', 'Three-digit postcode'],
  LY: ['Libyan Post Company', 'http://nlpc.ly/', 'info@nlpc.ly', '', '', 'https://www.linkedin.com/company/libyan-post/', '', 'none', '', '', 'No consistent national postcode published; verify locally'],
  MA: ['Barid Al-Maghrib', 'https://www.barid.ma/', 'webmaster@barid.ma', 'https://x.com/PosteMaroc', 'https://www.instagram.com/baridalma_', 'https://www.linkedin.com/company/barid-al-maghrib/', '', 'NNNNN', '^\\d{5}$', '20000', 'Five-digit postcode'],
  MG: ['Paositra Malagasy', 'http://www.poste.mg/', 'contact@paositra.mg', 'https://x.com/Paositra', 'https://www.instagram.com/paositramalagasy/', 'https://www.linkedin.com/company/paositra-malagasy/', '', 'NNN', '^\\d{3}$', '101', 'Three-digit postcode'],
  ML: ['La Poste du Mali EMS', 'https://www.sap.ml/', 'contact@post.ml', '', '', 'https://www.linkedin.com/company/la-poste-du-mali/', '', 'none', '', '', 'No national postcode; commune addressing'],
  MR: ['Mauripost (Société mauritanienne des postes)', 'https://www.mauripost.mr/', 'contact@mauripost.mr', '', '', '', '', 'none', '', '', 'No national postcode system'],
  MU: ['Mauritius Post Ltd', 'https://www.mauritiuspost.mu/', 'info@mpl.mu', '', '', 'https://www.linkedin.com/company/mauritius-post-ltd/', '', 'NNNNN', '^\\d{5}$', '42602', 'Five-digit postcode (optional letter suffix in some datasets)'],
  MW: ['Malawi Posts Corporation', 'https://malawipost.gov.mw/', 'info@malawipost.gov.mw', '', '', 'https://www.linkedin.com/company/malawi-posts-corporation/', '', 'none', '', '', 'No national postcode; district and P.O. Box'],
  MZ: ['Correios de Moçambique', 'http://correios.co.mz/', 'cac@correios.co.mz', '', '', 'https://www.linkedin.com/company/correios-de-mocambique/', '', 'NNNN', '^\\d{4}$', '1100', 'Four-digit postcode'],
  NA: ['NamPost', 'https://nampost.na/', 'customerservice@namibiapost.na', '', '', 'https://www.linkedin.com/company/nampost/', '', 'none', '', '', 'Private bag / P.O. Box numbering; no universal street postcode'],
  NE: ['La Poste du Niger', 'https://www.nigerpost.ne/', 'npn@refer.ne', '', '', 'https://www.linkedin.com/company/la-poste-du-niger/', '', 'NNNN', '^\\d{4}$', '8001', 'Four-digit postcode (Niamey and regions)'],
  NG: ['Nigeria Postal Service (NIPOST)', 'http://nipost.gov.ng/', 'info@nipost.gov.ng', 'https://x.com/e_nipost', 'https://www.instagram.com/e_nipost/', 'https://www.linkedin.com/company/nipost/', '', 'NNNNNN', '^\\d{6}$', '100001', 'Six-digit postcode (state + LGA + delivery)'],
  RW: ['Rwanda Post (Iposita)', 'https://i-posita.rw/', 'info@ipostarltd.rw', 'https://x.com/ipositaryw', 'https://www.instagram.com/ipositaryw/', 'https://www.linkedin.com/company/iposta-rwanda/', '', 'none', '', '', 'No legacy numeric postcode; Kigali addressing reforms — verify locally'],
  SC: ['Seychelles Postal Services', 'https://www.seychelles-post.com/', 'info@sib.gov.sc', '', '', 'https://www.linkedin.com/company/seychelles-postal-services/', '', 'none', '', '', 'No national postcode; island and district addressing'],
  SD: ['Sudan Post (Sudapost)', 'https://sudapost.sd/', 'info@sudapost.sd', '', '', 'https://www.linkedin.com/company/sudan-post/', '', 'NNNNN', '^\\d{5}$', '11111', 'Five-digit postcode (verify operational coverage)'],
  SL: ['Salone Post EMS', 'https://www.slpost.gov.sl/', 'info@slipa.gov.sl', '', '', 'https://www.linkedin.com/company/sierra-leone-postal-services/', '', 'none', '', '', 'No national postcode; Freetown district addressing'],
  SN: ['La Poste Sénégal', 'https://www.laposte.sn/', 'dircom@laposte.sn', 'https://x.com/LaPosteSenegal', 'https://www.instagram.com/lapostesenegal/', 'https://www.linkedin.com/company/la-poste-senegal/', '', 'NNNNN', '^\\d{5}$', '12500', 'Five-digit postcode'],
  SO: ['Somali Postal Service', 'https://www.upu.int/en/Somalia', 'minister@mpt.gov.so', '', '', '', '', 'none', '', '', 'No national postcode; district and landmark addressing'],
  SS: ['South Sudan Post', 'http://ssscc.org/', 'sssccngo@gmail.com', '', '', '', '', 'none', '', '', 'No national postcode system; Juba district addressing'],
  ST: ['Correios de São Tomé e Príncipe', 'https://www.correios.st/', 'cac@correios.st', '', '', '', '', 'none', '', '', 'No national postcode'],
  SZ: ['Eswatini Posts & Telecommunications Corporation', 'https://www.eswatinipost.co.sz/', 'info@post.co.sz', '', '', 'https://www.linkedin.com/company/eswatini-posts-telecommunications/', '', 'ANNN', '^[A-Z]\\d{3}$', 'H100', 'Letter + three digits (H = Hhohho region prefix)'],
  TD: ['La Poste Tchadienne', 'https://www.laposte.td/', 'contact@laposte.td', '', '', 'https://www.linkedin.com/company/la-poste-tchadienne/', '', 'none', '', '', 'No national postcode system'],
  TG: ['La Poste du Togo', 'https://www.laposte.tg/', 'contact@laposte.tg', '', '', 'https://www.linkedin.com/company/la-poste-du-togo/', '', 'none', '', '', 'No national postcode; commune addressing'],
  TN: ['Rapid-Poste (La Poste Tunisia)', 'https://www.pos.tn/', 'contact@rapidpost.com.tn', 'https://x.com/RapidposteTN', 'https://www.instagram.com/rapidpostenetunisienne/', 'https://www.linkedin.com/company/la-poste-tunisienne/', '', 'NNNN', '^\\d{4}$', '1000', 'Four-digit postcode'],
  TZ: ['Tanzania Posts Corporation', 'https://posta.co.tz/', 'info@tpoc.co.tz', '', '', 'https://www.linkedin.com/company/tanzania-posts-corporation/', '', 'NNNNN', '^\\d{5}$', '11101', 'Five-digit postcode'],
  UG: ['Uganda Post Limited', 'https://www.eposta.ug/', 'info@posta.co.ug', 'https://x.com/ugposts', 'https://www.instagram.com/ugposts/', 'https://www.linkedin.com/company/uganda-post-limited/', '', 'none', '', '', 'P.O. Box dominant; no universal street postcode'],
  ZA: ['South African Post Office', 'http://www.postoffice.co.za/', 'custserv@postoffice.co.za', 'https://x.com/PostofficeSa', 'https://www.instagram.com/sapostoffice/', 'https://www.linkedin.com/company/south-african-post-office/', '', 'NNNN', '^\\d{4}$', '2000', 'Four-digit postcode (street delivery and P.O. Box)'],
  ZM: ['Zambia Postal Services Corporation', 'http://www.zampost.gov.zm/', 'info.zampost@gmail.com', '', '', 'https://www.linkedin.com/company/zambia-postal-services-corporation/', '', 'NNNNN', '^\\d{5}$', '10101', 'Five-digit postcode'],
  ZW: ['Zimpost', 'http://www.zimpost.co.zw/', 'zimpost@zimpost.co.zw', 'https://x.com/zimpost_', 'https://www.instagram.com/zimpost_/', 'https://www.linkedin.com/company/zimpost/', '', 'none', '', '', 'No national postcode; suburb and P.O. Box routing'],
}

const isoCodes = Object.keys(DATA).sort((a, b) => {
  const order = fs.readFileSync(path.join(ROOT, 'auMemberIsoCodes.ts'), 'utf8')
  const idx = (c) => order.indexOf(`'${c}'`)
  return idx(a) - idx(b)
})

// Re-read order from file properly
function readIsoCodes() {
  const src = fs.readFileSync(path.join(ROOT, 'auMemberIsoCodes.ts'), 'utf8')
  return [...src.matchAll(/'([A-Z]{2})'/g)].map((m) => m[1])
}

const ordered = readIsoCodes()
for (const iso of ordered) {
  if (!DATA[iso]) throw new Error(`Missing domestic post data for ${iso}`)
}

let out = `import type { AuMemberIsoCode } from './auMemberIsoCodes'
import type { DomesticPostService } from './types'

function post(
  name: string,
  website: string,
  email: string,
  twitter: string,
  instagram: string,
  linkedin: string,
  apiEndpoint: string,
  format: string,
  pattern: string,
  example: string,
  notes: string,
): DomesticPostService {
  return {
    name,
    website,
    email,
    twitter,
    instagram,
    linkedin,
    apiEndpoint,
    postalCodeSchema: { format, pattern, example, notes },
  }
}

/**
 * National designated postal operator and postal code schema per AU member.
 * Informational; verify URLs, handles, schemas, and API bases before production.
 * Self-contained — no imports from other alliance modules.
 */
export const AU_DOMESTIC_POST_SERVICES: Record<AuMemberIsoCode, DomesticPostService> = {
`
for (const iso of ordered) {
  const e = DATA[iso]
  out += `  ${iso}: post(\n`
  for (const field of e) out += `    '${esc(field)}',\n`
  out += `  ),\n`
}
out += `}\n`

fs.writeFileSync(path.join(ROOT, 'domesticPostServicesByIso.ts'), out)

const skip = new Set(['index.ts', 'types.ts', 'domesticPostServicesByIso.ts', 'auMemberIsoCodes.ts', 'domesticCouriersByIso.ts', 'newsOutletsByIso.ts', 'notableUniversitiesByIso.ts', 'mainExportCommoditiesByIso.ts', 'mainExportedElementsByIso.ts', 'rareEarthsByIso.ts', 'bondMarketsByIso.ts', 'mainInternationalAirportsByIso.ts', 'intellectualPropertyDepartmentsByIso.ts', 'securitiesExchangeCommissionByIso.ts', 'mainInternationalSeaportsByIso.ts'])
let count = 0
for (const file of fs.readdirSync(ROOT)) {
  if (!file.endsWith('.ts') || skip.has(file) || file.endsWith('ByIso.ts')) continue
  const fp = path.join(ROOT, file)
  let src = fs.readFileSync(fp, 'utf8')
  if (src.includes('AU_DOMESTIC_POST_SERVICES')) continue
  const courierImport = "import { AU_DOMESTIC_COURIERS } from './domesticCouriersByIso'\n"
  if (!src.includes(courierImport)) throw new Error(`No courier import in ${file}`)
  src = src.replace(courierImport, `${courierImport}import { AU_DOMESTIC_POST_SERVICES } from './domesticPostServicesByIso'\n`)
  const iso = src.match(/iso3166Alpha2: '([A-Z]{2})'/)[1]
  src = src.replace(
    `  domesticCourierServices: AU_DOMESTIC_COURIERS['${iso}'],\n`,
    `  domesticCourierServices: AU_DOMESTIC_COURIERS['${iso}'],\n  domesticPostService: AU_DOMESTIC_POST_SERVICES['${iso}'],\n`,
  )
  fs.writeFileSync(fp, src)
  count++
}
console.log(`Wrote domesticPostServicesByIso.ts (${ordered.length} entries)`)
console.log(`Wired ${count} country files`)
