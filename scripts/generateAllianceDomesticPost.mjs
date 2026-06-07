import fs from 'fs'
import path from 'path'

const ROOT = 'src/lib/cores/alliancesCore'
const esc = (s) => s.replace(/\\/g, '\\\\').replace(/'/g, "\\'")

function parsePostFromFile(filePath) {
  if (!fs.existsSync(filePath)) return {}
  const content = fs.readFileSync(filePath, 'utf8')
  const entries = {}
  const blockRe = /  ([A-Z]{2}): post\(\n([\s\S]*?)\n  \),/g
  let m
  while ((m = blockRe.exec(content)) !== null) {
    const lines = [...m[2].matchAll(/    '((?:\\'|[^'])*)',/g)].map((x) => x[1].replace(/\\'/g, "'"))
    if (lines.length >= 11) entries[m[1]] = lines.slice(0, 11)
  }
  return entries
}

function readIsoCodes(filePath, constName) {
  const src = fs.readFileSync(path.join(ROOT, filePath), 'utf8')
  const arrayContents = {}
  const arrayRe = /export const (\w+) = \[([\s\S]*?)\] as const/g
  let arrayMatch
  while ((arrayMatch = arrayRe.exec(src)) !== null) {
    arrayContents[arrayMatch[1]] = [...arrayMatch[2].matchAll(/'([A-Z]{2})'/g)].map((x) => x[1])
  }
  const m = src.match(new RegExp(`export const ${constName} = \\[([\\s\\S]*?)\\] as const`))
  if (!m) throw new Error(`Could not parse ${constName}`)
  const direct = [...m[1].matchAll(/'([A-Z]{2})'/g)].map((x) => x[1])
  if (direct.length > 0) return direct
  const spreads = [...m[1].matchAll(/\.\.\.(\w+)/g)].map((x) => x[1])
  if (spreads.length === 0) throw new Error(`No ISO codes found in ${constName}`)
  return spreads.flatMap((name) => {
    if (!arrayContents[name]?.length) throw new Error(`Could not resolve spread ${name} in ${constName}`)
    return arrayContents[name]
  })
}

const FILE_HEADER = (isoImport, isoType) => `import type { ${isoType} } from './${isoImport}'
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

`

function writePostFile(dir, { isoCodes, constName, isoType, isoImport, comment }, entries) {
  let out = FILE_HEADER(isoImport, isoType)
  out += `/**
 * National designated postal operator and postal code schema per ${comment}.
 * Informational; verify URLs, handles, schemas, and API bases before production.
 * Self-contained — no imports from other alliance modules.
 */
export const ${constName}: Record<${isoType}, DomesticPostService> = {
`
  for (const iso of isoCodes) {
    const e = entries[iso]
    if (!e) throw new Error(`Missing domestic post entry for ${iso} in ${dir}`)
    out += `  ${iso}: post(\n`
    for (const field of e) out += `    '${esc(field)}',\n`
    out += `  ),\n`
  }
  out += `}\n`
  fs.writeFileSync(path.join(ROOT, dir, 'domesticPostServicesByIso.ts'), out)
}

function wireCountries(dir, prefix, skip) {
  const full = path.join(ROOT, dir)
  let count = 0
  for (const file of fs.readdirSync(full)) {
    if (!file.endsWith('.ts') || skip.has(file) || file.endsWith('ByIso.ts')) continue
    const fp = path.join(full, file)
    let src = fs.readFileSync(fp, 'utf8')
    if (src.includes(`${prefix}_DOMESTIC_POST_SERVICES`)) continue
    const courierImport = `import { ${prefix}_DOMESTIC_COURIERS } from './domesticCouriersByIso'\n`
    if (!src.includes(courierImport)) throw new Error(`No courier import in ${file}`)
    src = src.replace(courierImport, `${courierImport}import { ${prefix}_DOMESTIC_POST_SERVICES } from './domesticPostServicesByIso'\n`)
    const iso = src.match(/iso3166Alpha2: '([A-Z]{2})'/)[1]
    src = src.replace(
      `  domesticCourierServices: ${prefix}_DOMESTIC_COURIERS['${iso}'],\n`,
      `  domesticCourierServices: ${prefix}_DOMESTIC_COURIERS['${iso}'],\n  domesticPostService: ${prefix}_DOMESTIC_POST_SERVICES['${iso}'],\n`,
    )
    fs.writeFileSync(fp, src)
    count++
  }
  console.log(`Wired ${count} files in ${dir}`)
}

// Supplemental: [name, website, email, twitter, instagram, linkedin, api, format, pattern, example, notes]
const supplemental = {
  AU: ['Australia Post', 'https://auspost.com.au/', 'feedback@auspost.com.au', 'https://x.com/AusPost', 'https://www.instagram.com/auspost/', 'https://www.linkedin.com/company/australia-post/', 'https://developers.auspost.com.au/', 'NNNN', '^\\d{4}$', '2000', 'Four-digit postcode'],
  BN: ['Postal Services Department (Brunei)', 'https://www.post.gov.bn/', 'postmaster@post.gov.bn', '', '', 'https://www.linkedin.com/company/postal-services-department-brunei/', '', 'AANNNN', '^[A-Z]{2}\\d{4}$', 'BA2110', 'Two-letter area + four digits (Brunei Darussalam)'],
  CA: ['Canada Post', 'https://www.canadapost-postescanada.ca/', 'custserv@postoffice.co.za', 'https://x.com/canadapostcorp', 'https://www.instagram.com/canadapost/', 'https://www.linkedin.com/company/canada-post/', 'https://www.canadapost-postescanada.ca/cpc/en/tools/find-a-postal-code.page', 'ANA NAN', '^[A-Z]\\d[A-Z] \\d[A-Z]\\d$', 'K1A 0B1', 'Canadian postal code (letter-digit-letter space digit-letter-digit)'],
  CL: ['Correos de Chile', 'https://www.correos.cl/', 'contacto@correos.cl', 'https://x.com/CorreosChile', 'https://www.instagram.com/correoschile/', 'https://www.linkedin.com/company/correos-de-chile/', '', 'NNNNNNN', '^\\d{7}$', '8320000', 'Seven-digit postcode'],
  CN: ['China Post', 'https://www.ems.com.cn/', 'service@ems.com.cn', 'https://x.com/chinapost', 'https://www.instagram.com/chinapost/', 'https://www.linkedin.com/company/china-post/', '', 'NNNNNN', '^\\d{6}$', '100000', 'Six-digit postcode'],
  HK: ['Hongkong Post', 'https://www.hongkongpost.hk/', 'hkpost@hkpost.gov.hk', 'https://x.com/hkpost', 'https://www.instagram.com/hkpost/', 'https://www.linkedin.com/company/hongkong-post/', '', 'none', '', '', 'No postal code; building name and district addressing'],
  ID: ['Pos Indonesia', 'https://www.posindonesia.co.id/', 'pusatbantuan@posindonesia.co.id', 'https://x.com/PosIndonesia', 'https://www.instagram.com/posindonesia/', 'https://www.linkedin.com/company/pos-indonesia/', '', 'NNNNN', '^\\d{5}$', '10110', 'Five-digit postcode'],
  JP: ['Japan Post', 'https://www.post.japanpost.jp/', 'info@jp-network.japanpost.jp', 'https://x.com/japanpost_off', 'https://www.instagram.com/japanpost_off/', 'https://www.linkedin.com/company/japan-post-holdings/', '', 'NNN-NNNN', '^\\d{3}-\\d{4}$', '100-0001', 'Three-digit + four-digit postcode (hyphenated)'],
  MY: ['Pos Malaysia', 'https://www.pos.com.my/', 'customercare@pos.com.my', 'https://x.com/posmalaysia', 'https://www.instagram.com/posmalaysia/', 'https://www.linkedin.com/company/pos-malaysia/', '', 'NNNNN', '^\\d{5}$', '50000', 'Five-digit postcode'],
  MX: ['Correos de México', 'https://www.correosdemexico.gob.mx/', 'atencionaclientes@correosdemexico.gob.mx', 'https://x.com/CorreosdeMexico', 'https://www.instagram.com/correosdemexico/', 'https://www.linkedin.com/company/correos-de-mexico/', '', 'NNNNN', '^\\d{5}$', '06000', 'Five-digit código postal'],
  NZ: ['NZ Post', 'https://www.nzpost.co.nz/', 'customercare@nzpost.co.nz', 'https://x.com/NZPost', 'https://www.instagram.com/nzpost/', 'https://www.linkedin.com/company/nz-post/', '', 'NNNN', '^\\d{4}$', '6011', 'Four-digit postcode'],
  PG: ['Post PNG', 'https://www.postpng.com.pg/', 'info@postpng.com.pg', '', '', 'https://www.linkedin.com/company/post-png/', '', 'NNN', '^\\d{3}$', '111', 'Three-digit postcode'],
  PE: ['Serpost (Correos del Perú)', 'https://www.serpost.com.pe/', 'atencion@serpost.com.pe', 'https://x.com/SerpostPeru', 'https://www.instagram.com/serpostperu/', 'https://www.linkedin.com/company/serpost/', '', 'NNNNN', '^\\d{5}$', '15001', 'Five-digit código postal (Lima uses leading 15)'],
  PH: ['Philippine Postal Corporation (PHLPost)', 'https://www.phlpost.gov.ph/', 'info@phlpost.gov.ph', 'https://x.com/PHLPost', 'https://www.instagram.com/phlpost/', 'https://www.linkedin.com/company/philippine-postal-corporation/', '', 'NNNN', '^\\d{4}$', '1000', 'Four-digit postcode'],
  RU: ['Russian Post (Pochta Rossii)', 'https://www.pochta.ru/', 'info@russianpost.ru', 'https://x.com/russianpost', 'https://www.instagram.com/russianpost/', 'https://www.linkedin.com/company/russian-post/', '', 'NNNNNN', '^\\d{6}$', '101000', 'Six-digit postcode'],
  SG: ['Singapore Post', 'https://www.singpost.com/', 'feedback@singpost.com', 'https://x.com/SingPost', 'https://www.instagram.com/singpost/', 'https://www.linkedin.com/company/singapore-post-limited/', '', 'NNNNNN', '^\\d{6}$', '018956', 'Six-digit postcode'],
  KR: ['Korea Post', 'https://www.koreapost.go.kr/', 'help@koreapost.go.kr', 'https://x.com/koreapost', 'https://www.instagram.com/koreapost/', 'https://www.linkedin.com/company/korea-post/', '', 'NNNNN', '^\\d{5}$', '04524', 'Five-digit postcode (reformed 2015)'],
  TW: ['Chunghwa Post', 'https://www.post.gov.tw/', 'service@post.gov.tw', 'https://x.com/chunghwapost', 'https://www.instagram.com/chunghwapost/', 'https://www.linkedin.com/company/chunghwa-post/', '', 'NNNNN', '^\\d{5}$', '10058', 'Five-digit postcode (Taiwan)'],
  TH: ['Thailand Post', 'https://www.thailandpost.co.th/', 'contact@thailandpost.co.th', 'https://x.com/ThailandPost', 'https://www.instagram.com/thailandpost/', 'https://www.linkedin.com/company/thailand-post/', '', 'NNNNN', '^\\d{5}$', '10100', 'Five-digit postcode'],
  US: ['United States Postal Service (USPS)', 'https://www.usps.com/', 'uspscustomerservice@usps.gov', 'https://x.com/USPS', 'https://www.instagram.com/usps/', 'https://www.linkedin.com/company/usps/', 'https://developer.usps.com/', 'NNNNN', '^\\d{5}$', '20500', 'Five-digit ZIP; ZIP+4 optional (NNNNN-NNNN)'],
  VN: ['Vietnam Post (VNPost)', 'https://www.vnpost.vn/', 'contact@vnpost.vn', 'https://x.com/VNPost', 'https://www.instagram.com/vnpost/', 'https://www.linkedin.com/company/vietnam-post/', '', 'NNNNNN', '^\\d{6}$', '100000', 'Six-digit postcode'],
  BH: ['Bahrain Post', 'https://www.bahrainpost.gov.bh/', 'info@bahrainpost.gov.bh', 'https://x.com/BahrainPost', 'https://www.instagram.com/bahrainpost/', 'https://www.linkedin.com/company/bahrain-post/', '', 'NNNN', '^\\d{4}$', '317', 'Three- or four-digit postcode'],
  IQ: ['Iraqi Post (Iraq Post Company)', 'https://www.iraqpost.net/', 'info@iraqpost.net', '', '', 'https://www.linkedin.com/company/iraq-post/', '', 'NNNNN', '^\\d{5}$', '10001', 'Five-digit postcode'],
  JO: ['Jordan Post', 'https://www.jordanpost.com.jo/', 'info@jordanpost.com.jo', 'https://x.com/JordanPostCo', 'https://www.instagram.com/jordanpost/', 'https://www.linkedin.com/company/jordan-post/', '', 'NNNNN', '^\\d{5}$', '11118', 'Five-digit postcode'],
  KW: ['Kuwait Post', 'https://www.kuwaitpost.com/', 'info@kuwaitpost.com', 'https://x.com/KuwaitPost', 'https://www.instagram.com/kuwaitpost/', 'https://www.linkedin.com/company/kuwait-post/', '', 'NNNNN', '^\\d{5}$', '13001', 'Five-digit postcode'],
  LB: ['Liban Post', 'https://www.libanpost.com/', 'info@libanpost.com', 'https://x.com/LibanPost', 'https://www.instagram.com/libanpost/', 'https://www.linkedin.com/company/liban-post/', '', 'NNNN NNNN', '^\\d{4} \\d{4}$', '1107 2810', 'Eight-digit postcode (two groups of four)'],
  OM: ['Oman Post', 'https://www.omanpost.om/', 'info@omanpost.om', 'https://x.com/OmanPost', 'https://www.instagram.com/omanpost/', 'https://www.linkedin.com/company/oman-post/', '', 'NNN', '^\\d{3}$', '100', 'Three-digit postcode'],
  PS: ['Palestinian Post (Palestine Post)', 'https://www.palpost.ps/', 'info@palpost.ps', 'https://x.com/PalPostPs', 'https://www.instagram.com/palpost.ps/', 'https://www.linkedin.com/company/palestine-post/', '', 'none', '', '', 'P.O. Box and locality addressing; verify West Bank/Gaza routing'],
  QA: ['Qatar Post (Q-Post)', 'https://www.qpost.com.qa/', 'info@qpost.com.qa', 'https://x.com/QatarPost', 'https://www.instagram.com/qatarpost/', 'https://www.linkedin.com/company/qatar-post/', '', 'none', '', '', 'No national street postcode; zone and building addressing'],
  SA: ['Saudi Post (SPL)', 'https://splonline.com.sa/', 'customercare@splonline.com.sa', 'https://x.com/SPLCare', 'https://www.instagram.com/splcare/', 'https://www.linkedin.com/company/saudi-post/', '', 'NNNNN', '^\\d{5}$', '11564', 'Five-digit postcode (national addressing system)'],
  SY: ['Syrian Post', 'https://www.syrianpost.gov.sy/', 'info@syrianpost.gov.sy', '', '', '', '', 'none', '', '', 'No consistent national postcode published; verify locally'],
  AE: ['Emirates Post Group', 'https://www.epg.ae/', 'info@epg.ae', 'https://x.com/EmiratesPost', 'https://www.instagram.com/emiratespost/', 'https://www.linkedin.com/company/emirates-post-group/', '', 'none', '', '', 'No national postcode; Makani / building addressing in UAE'],
  YE: ['Yemen Post', 'https://www.yemenpost.ye/', 'info@yemenpost.ye', '', '', '', '', 'none', '', '', 'Limited national postcode coverage; verify operational status locally'],
  KH: ['Cambodia Post', 'https://www.cambodiapost.com.kh/', 'info@cambodiapost.com.kh', '', '', 'https://www.linkedin.com/company/cambodia-post/', '', 'NNNNN', '^\\d{5}$', '12000', 'Five-digit postcode'],
  LA: ['Lao Post', 'https://www.laopost.com.la/', 'info@laopost.la', '', '', 'https://www.linkedin.com/company/lao-post/', '', 'NNNNN', '^\\d{5}$', '01000', 'Five-digit postcode'],
  MM: ['Myanmar Post', 'https://www.myanmarpost.com.mm/', 'info@myanmarpost.com.mm', '', '', 'https://www.linkedin.com/company/myanmar-post/', '', 'NNNNN', '^\\d{5}$', '11181', 'Five-digit postcode (Yangon)'],
  TL: ['Correios de Timor-Leste', 'https://www.correios.tl/', 'info@correios.tl', '', '', '', '', 'none', '', '', 'No national postcode system; district addressing'],
  AF: ['Afghan Post', 'https://afghanpost.gov.af/', 'info@afghanpost.gov.af', '', '', '', '', 'NNNN', '^\\d{4}$', '1001', 'Four-digit postcode (Kabul and major cities)'],
  AL: ['Posta Shqiptare', 'https://www.postashqiptare.al/', 'info@postashqiptare.al', 'https://x.com/PostaShqiptare', '', 'https://www.linkedin.com/company/posta-shqiptare/', '', 'NNNN', '^\\d{4}$', '1001', 'Four-digit postcode'],
  AG: ['Antigua and Barbuda Postal Service', 'https://www.abpost.gov.ag/', 'info@abpost.gov.ag', '', '', '', '', 'none', '', '', 'No national postcode; island and locality addressing'],
  AR: ['Correo Argentino', 'https://www.correoargentino.com.ar/', 'atencion@correoargentino.com.ar', 'https://x.com/CorreoArgentino', 'https://www.instagram.com/correoargentino/', 'https://www.linkedin.com/company/correo-argentino/', '', 'ANNNNAAA', '^[A-Z]\\d{4}[A-Z]{3}$', 'C1425CLA', 'Eight-character CPA (letter + four digits + three letters)'],
  AM: ['HayPost', 'https://www.haypost.am/', 'info@haypost.am', 'https://x.com/HayPostArmenia', 'https://www.instagram.com/haypost/', 'https://www.linkedin.com/company/haypost/', '', 'NNNN', '^\\d{4}$', '0010', 'Four-digit postcode'],
  AT: ['Österreichische Post', 'https://www.post.at/', 'kundenservice@post.at', 'https://x.com/post_at', 'https://www.instagram.com/post_at/', 'https://www.linkedin.com/company/osterreichische-post/', '', 'NNNN', '^\\d{4}$', '1010', 'Four-digit postcode'],
  AZ: ['Azərpoçt', 'https://www.azermarka.az/', 'info@azermarka.az', 'https://x.com/Azerpost', '', 'https://www.linkedin.com/company/azerpost/', '', 'AZ NNNN', '^AZ \\d{4}$', 'AZ 1000', 'AZ prefix + four digits'],
  BD: ['Bangladesh Post Office', 'https://bdpost.gov.bd/', 'info@bdpost.gov.bd', 'https://x.com/BangladeshPost', '', 'https://www.linkedin.com/company/bangladesh-post-office/', '', 'NNNN', '^\\d{4}$', '1000', 'Four-digit postcode'],
  BB: ['Barbados Postal Service', 'https://www.bps.gov.bb/', 'info@bps.gov.bb', '', '', '', '', 'BBNNNNN', '^BB\\d{5}$', 'BB11000', 'BB + five digits (Barbados)'],
  BY: ['Belpochta', 'https://www.belpost.by/', 'info@belpost.by', 'https://x.com/belpost_by', '', 'https://www.linkedin.com/company/belpochta/', '', 'NNNNNN', '^\\d{6}$', '220050', 'Six-digit postcode'],
  BO: ['Correos de Bolivia', 'https://www.correos.gob.bo/', 'info@correos.gob.bo', '', '', 'https://www.linkedin.com/company/correos-de-bolivia/', '', 'none', '', '', 'No national postcode system; city and zone addressing'],
  BA: ['BH Pošta / Pošte Srpske', 'https://www.posta.ba/', 'info@posta.ba', '', '', 'https://www.linkedin.com/company/bh-posta/', '', 'NNNNN', '^\\d{5}$', '71000', 'Five-digit postcode (Bosnia and Herzegovina)'],
  BG: ['Bulgarian Posts', 'https://www.bgpost.bg/', 'info@bgpost.bg', 'https://x.com/BulgarianPosts', '', 'https://www.linkedin.com/company/bulgarian-posts/', '', 'NNNN', '^\\d{4}$', '1000', 'Four-digit postcode'],
  BR: ['Correios (Empresa Brasileira de Correios e Telégrafos)', 'https://www.correos.gov.br/', 'atendimento@correios.com.br', 'https://x.com/Correios', 'https://www.instagram.com/correios/', 'https://www.linkedin.com/company/correios/', 'https://www.correios.com.br/atendimento/developers', 'NNNNN-NNN', '^\\d{5}-\\d{3}$', '70040-902', 'CEP: five digits + hyphen + three digits'],
  CO: ['4-72 (Correos de Colombia)', 'https://www.4-72.com.co/', 'contactenos@4-72.com.co', 'https://x.com/472Colombia', 'https://www.instagram.com/472colombia/', 'https://www.linkedin.com/company/4-72/', '', 'NNNNNN', '^\\d{6}$', '110111', 'Six-digit código postal'],
  CK: ['Cook Islands Post Office', 'https://www.cookislands.gov.ck/', 'postoffice@cookislands.gov.ck', '', '', '', '', 'none', '', '', 'No national postcode; Rarotonga and island addressing'],
  CR: ['Correos de Costa Rica', 'https://www.correos.go.cr/', 'atencioncliente@correos.go.cr', 'https://x.com/CorreosCR', '', 'https://www.linkedin.com/company/correos-de-costa-rica/', '', 'NNNNN', '^\\d{5}$', '10101', 'Five-digit código postal'],
  HR: ['Hrvatska pošta', 'https://www.posta.hr/', 'info@posta.hr', 'https://x.com/HrvatskaPosta', 'https://www.instagram.com/hrvatskaposta/', 'https://www.linkedin.com/company/hrvatska-posta/', '', 'NNNNN', '^\\d{5}$', '10000', 'Five-digit postcode'],
  CU: ['Correos de Cuba', 'https://www.correos.cu/', 'info@correos.cu', '', '', '', '', 'NNNNN', '^\\d{5}$', '10400', 'Five-digit código postal'],
  CY: ['Cyprus Post', 'https://www.cypruspost.post/', 'info@cypruspost.post', 'https://x.com/CyprusPost', '', 'https://www.linkedin.com/company/cyprus-post/', '', 'NNNN', '^\\d{4}$', '1010', 'Four-digit postcode'],
  CZ: ['Česká pošta', 'https://www.ceskaposta.cz/', 'info@ceskaposta.cz', 'https://x.com/CeskaPosta', 'https://www.instagram.com/ceskaposta/', 'https://www.linkedin.com/company/ceska-posta/', '', 'NNN NN', '^\\d{3} \\d{2}$', '110 00', 'Five-digit postcode (space after third digit)'],
  DM: ['Dominica Postal Service', 'https://www.dominicapost.dm/', 'info@dominicapost.dm', '', '', '', '', 'none', '', '', 'No national postcode; parish addressing'],
  DO: ['INPOSDOM (Correos Dominicanos)', 'https://www.inposdom.gob.do/', 'info@inposdom.gob.do', 'https://x.com/INPOSDOM', '', 'https://www.linkedin.com/company/inposdom/', '', 'NNNNN', '^\\d{5}$', '10101', 'Five-digit código postal'],
  EC: ['Correos del Ecuador', 'https://www.correosdelecuador.gob.ec/', 'info@correosdelecuador.gob.ec', 'https://x.com/CorreosEcuador', '', 'https://www.linkedin.com/company/correos-del-ecuador/', '', 'NNNNNN', '^\\d{6}$', '170150', 'Six-digit código postal'],
  SV: ['Correos de El Salvador', 'https://www.correos.gob.sv/', 'info@correos.gob.sv', '', '', 'https://www.linkedin.com/company/correos-de-el-salvador/', '', 'NNNN', '^\\d{4}$', '1101', 'Four-digit código postal'],
  EE: ['Omniva (Eesti Post)', 'https://www.omniva.ee/', 'info@omniva.ee', 'https://x.com/OmnivaEE', 'https://www.instagram.com/omniva/', 'https://www.linkedin.com/company/omniva/', '', 'NNNNN', '^\\d{5}$', '10111', 'Five-digit postcode'],
  FJ: ['Fiji Post', 'https://www.fijipost.com.fj/', 'info@fijipost.com.fj', 'https://x.com/FijiPost', '', 'https://www.linkedin.com/company/fiji-post/', '', 'none', '', '', 'No national postcode; town and island addressing'],
  GE: ['Georgian Post', 'https://www.gpost.ge/', 'info@gpost.ge', 'https://x.com/GeorgianPost', '', 'https://www.linkedin.com/company/georgian-post/', '', 'NNNN', '^\\d{4}$', '0108', 'Four-digit postcode'],
  GR: ['ELTA Hellenic Post', 'https://www.elta.gr/', 'info@elta.gr', 'https://x.com/elta_gr', 'https://www.instagram.com/elta_gr/', 'https://www.linkedin.com/company/elta-hellenic-post/', '', 'NNN NN', '^\\d{3} \\d{2}$', '104 31', 'Five-digit postcode (space after third digit)'],
  GD: ['Grenada Postal Corporation', 'https://www.grenadapost.gd/', 'info@grenadapost.gd', '', '', '', '', 'none', '', '', 'No national postcode; parish addressing'],
  GY: ['Guyana Post Office Corporation', 'https://www.guyanapost.gy/', 'info@guyanapost.gy', '', '', '', '', 'none', '', '', 'No national postcode; locality addressing'],
  HN: ['Honducor (Correos de Honduras)', 'https://www.honducor.gob.hn/', 'info@honducor.gob.hn', '', '', 'https://www.linkedin.com/company/honducor/', '', 'NNNNN', '^\\d{5}$', '11101', 'Five-digit código postal'],
  HU: ['Magyar Posta', 'https://www.posta.hu/', 'ugyfelszolgalat@posta.hu', 'https://x.com/MagyarPosta', 'https://www.instagram.com/magyarposta/', 'https://www.linkedin.com/company/magyar-posta/', '', 'NNNN', '^\\d{4}$', '1051', 'Four-digit postcode'],
  IN: ['India Post', 'https://www.indiapost.gov.in/', 'helpdesk@indiapost.gov.in', 'https://x.com/IndiaPostOffice', 'https://www.instagram.com/indiapostoffice/', 'https://www.linkedin.com/company/india-post/', 'https://www.indiapost.gov.in/', 'NNNNNN', '^\\d{6}$', '110001', 'Six-digit PIN code'],
  IR: ['Iran Post (Pishtaz)', 'https://www.post.ir/', 'info@post.ir', 'https://x.com/IranPost', '', 'https://www.linkedin.com/company/iran-post/', '', 'NNNNN-NNNNN', '^\\d{5}-\\d{5}$', '13147-13146', 'Ten-digit postcode (five + hyphen + five)'],
  IT: ['Poste Italiane', 'https://www.poste.it/', 'assistenza.clienti@poste.it', 'https://x.com/PosteItaliane', 'https://www.instagram.com/posteitaliane/', 'https://www.linkedin.com/company/poste-italiane/', '', 'NNNNN', '^\\d{5}$', '00118', 'Five-digit CAP'],
  JM: ['Jamaica Post', 'https://www.jamaicapost.gov.jm/', 'info@jamaicapost.gov.jm', 'https://x.com/JamaicaPost', '', 'https://www.linkedin.com/company/jamaica-post/', '', 'none', '', '', 'No national postcode; parish and locality addressing'],
  KZ: ['Kazpost', 'https://www.kazpost.kz/', 'info@kazpost.kz', 'https://x.com/Kazpost', '', 'https://www.linkedin.com/company/kazpost/', '', 'NNNNNN', '^\\d{6}$', '010000', 'Six-digit postcode'],
  KI: ['Kiribati Post', 'https://www.kiribatipost.ki/', 'info@kiribatipost.ki', '', '', '', '', 'none', '', '', 'No national postcode; island addressing'],
  KG: ['Kyrgyz Pochtasy', 'https://www.kyrgyzpost.kg/', 'info@kyrgyzpost.kg', '', '', 'https://www.linkedin.com/company/kyrgyz-post/', '', 'NNNNNN', '^\\d{6}$', '720000', 'Six-digit postcode'],
  LV: ['Latvijas Pasts', 'https://www.pasts.lv/', 'info@pasts.lv', 'https://x.com/LatvijasPasts', '', 'https://www.linkedin.com/company/latvijas-pasts/', '', 'LV-NNNN', '^LV-\\d{4}$', 'LV-1050', 'LV- prefix + four digits'],
  LT: ['Lietuvos paštas', 'https://www.post.lt/', 'info@post.lt', 'https://x.com/LietuvosPastas', '', 'https://www.linkedin.com/company/lietuvos-pastas/', '', 'LT-NNNNN', '^LT-\\d{5}$', 'LT-01100', 'LT- prefix + five digits'],
  LU: ['POST Luxembourg', 'https://www.post.lu/', 'info@post.lu', 'https://x.com/POSTLuxembourg', 'https://www.instagram.com/postluxembourg/', 'https://www.linkedin.com/company/post-luxembourg/', '', 'NNNN', '^\\d{4}$', '1019', 'Four-digit postcode'],
  MV: ['Maldives Post', 'https://www.maldivespost.com/', 'info@maldivespost.com', 'https://x.com/MaldivesPost', '', 'https://www.linkedin.com/company/maldives-post/', '', 'NNNNN', '^\\d{5}$', '20026', 'Five-digit postcode'],
  MT: ['MaltaPost', 'https://www.maltapost.com/', 'info@maltapost.com', 'https://x.com/MaltaPost', 'https://www.instagram.com/maltapost/', 'https://www.linkedin.com/company/maltapost/', '', 'AAA NNNN', '^[A-Z]{3} \\d{4}$', 'VLT 1117', 'Three letters + space + four digits'],
  FM: ['FSM Postal Service', 'https://www.fsmpost.fm/', 'info@fsmpost.fm', '', '', '', '', 'NNNNN', '^\\d{5}$', '96941', 'Five-digit postcode (uses US ZIP format)'],
  MD: ['Poșta Moldovei', 'https://www.posta.md/', 'info@posta.md', 'https://x.com/PostaMoldovei', '', 'https://www.linkedin.com/company/posta-moldovei/', '', 'MD-NNNN', '^MD-\\d{4}$', 'MD-2001', 'MD- prefix + four digits'],
  MN: ['Mongol Post', 'https://www.mongolpost.mn/', 'info@mongolpost.mn', '', '', 'https://www.linkedin.com/company/mongol-post/', '', 'NNNNN', '^\\d{5}$', '14200', 'Five-digit postcode'],
  ME: ['Pošta Crne Gore', 'https://www.postacg.me/', 'info@postacg.me', '', '', 'https://www.linkedin.com/company/posta-crne-gore/', '', 'NNNNN', '^\\d{5}$', '81000', 'Five-digit postcode'],
  NP: ['Nepal Post', 'https://www.nepalpost.gov.np/', 'info@nepalpost.gov.np', '', '', 'https://www.linkedin.com/company/nepal-post/', '', 'NNNNN', '^\\d{5}$', '44600', 'Five-digit postcode'],
  NI: ['Correos de Nicaragua', 'https://www.correos.gob.ni/', 'info@correos.gob.ni', '', '', '', '', 'NNNNN', '^\\d{5}$', '11001', 'Five-digit código postal'],
  NU: ['Niue Post', 'https://www.niuepost.nu/', 'info@niuepost.nu', '', '', '', '', 'none', '', '', 'No national postcode; village addressing'],
  MK: ['North Macedonia Post (Пошта на Северна Македонија)', 'https://www.posta.com.mk/', 'info@posta.com.mk', '', '', 'https://www.linkedin.com/company/north-macedonia-post/', '', 'NNNN', '^\\d{4}$', '1000', 'Four-digit postcode'],
  PK: ['Pakistan Post', 'https://www.pakpost.gov.pk/', 'info@pakpost.gov.pk', 'https://x.com/PakistanPost', '', 'https://www.linkedin.com/company/pakistan-post/', '', 'NNNNN', '^\\d{5}$', '44000', 'Five-digit postcode'],
  PA: ['Correos y Telégrafos de Panamá', 'https://www.correospanama.gob.pa/', 'info@correospanama.gob.pa', '', '', 'https://www.linkedin.com/company/correos-y-telegrafos-de-panama/', '', 'none', '', '', 'No national street postcode; zone and building addressing'],
  PL: ['Poczta Polska', 'https://www.poczta-polska.pl/', 'kontakt@poczta-polska.pl', 'https://x.com/PocztaPolska', 'https://www.instagram.com/pocztapolska/', 'https://www.linkedin.com/company/poczta-polska/', '', 'NN-NNN', '^\\d{2}-\\d{3}$', '00-950', 'Five-digit postcode (hyphen after second digit)'],
  PT: ['CTT Correios de Portugal', 'https://www.ctt.pt/', 'info@ctt.pt', 'https://x.com/CTT', 'https://www.instagram.com/ctt/', 'https://www.linkedin.com/company/ctt/', '', 'NNNN-NNN', '^\\d{4}-\\d{3}$', '1000-001', 'Seven-digit código postal (four + hyphen + three)'],
  RO: ['Poșta Română', 'https://www.posta-romana.ro/', 'relatii.clienti@posta-romana.ro', 'https://x.com/PostaRomana', 'https://www.instagram.com/postaromana/', 'https://www.linkedin.com/company/posta-romana/', '', 'NNNNNN', '^\\d{6}$', '010011', 'Six-digit postcode'],
  WS: ['Samoa Post', 'https://www.samoapost.ws/', 'info@samoapost.ws', '', '', '', '', 'none', '', '', 'No national postcode; village addressing'],
  RS: ['Pošta Srbije', 'https://www.posta.rs/', 'info@posta.rs', 'https://x.com/PostaSrbije', '', 'https://www.linkedin.com/company/posta-srbije/', '', 'NNNNN', '^\\d{5}$', '11000', 'Five-digit postcode'],
  SK: ['Slovenská pošta', 'https://www.posta.sk/', 'info@posta.sk', 'https://x.com/SlovenskaPosta', '', 'https://www.linkedin.com/company/slovenska-posta/', '', 'NNN NN', '^\\d{3} \\d{2}$', '811 01', 'Five-digit postcode (space after third digit)'],
  SI: ['Pošta Slovenije', 'https://www.posta.si/', 'info@posta.si', 'https://x.com/PostaSlovenije', '', 'https://www.linkedin.com/company/posta-slovenije/', '', 'NNNN', '^\\d{4}$', '1000', 'Four-digit postcode (SI- prefix optional)'],
  SB: ['Solomon Post', 'https://www.solomonpost.com.sb/', 'info@solomonpost.com.sb', '', '', '', '', 'none', '', '', 'No national postcode; island addressing'],
  LK: ['Sri Lanka Post', 'https://www.slpost.gov.lk/', 'info@slpost.gov.lk', 'https://x.com/SLPost', '', 'https://www.linkedin.com/company/sri-lanka-post/', '', 'NNNNN', '^\\d{5}$', '00100', 'Five-digit postcode'],
  SR: ['Surpost (Suriname Post)', 'https://www.surpost.sr/', 'info@surpost.sr', '', '', '', '', 'none', '', '', 'No national postcode; district addressing'],
  TJ: ['Tajik Pocht', 'https://www.tajikpost.tj/', 'info@tajikpost.tj', '', '', '', '', 'NNNNNN', '^\\d{6}$', '734000', 'Six-digit postcode'],
  TO: ['Tonga Post', 'https://www.tongapost.to/', 'info@tongapost.to', '', '', '', '', 'none', '', '', 'No national postcode; island addressing'],
  TT: ['TTPost (Trinidad and Tobago Postal Corporation)', 'https://www.ttpost.net/', 'info@ttpost.net', 'https://x.com/TTPost', '', 'https://www.linkedin.com/company/ttpost/', '', 'none', '', '', 'No national postcode; locality addressing'],
  TR: ['PTT (Türkiye Post)', 'https://www.ptt.gov.tr/', 'info@ptt.gov.tr', 'https://x.com/PTT', 'https://www.instagram.com/ptt/', 'https://www.linkedin.com/company/ptt/', '', 'NNNNN', '^\\d{5}$', '06100', 'Five-digit postcode'],
  TM: ['Turkmen Pochtasy', 'https://www.turkmenpost.gov.tm/', 'info@turkmenpost.gov.tm', '', '', '', '', 'NNNNNN', '^\\d{6}$', '744000', 'Six-digit postcode'],
  UA: ['Ukrposhta', 'https://www.ukrposhta.ua/', 'info@ukrposhta.ua', 'https://x.com/Ukrposhta', 'https://www.instagram.com/ukrposhta/', 'https://www.linkedin.com/company/ukrposhta/', '', 'NNNNN', '^\\d{5}$', '01001', 'Five-digit postcode'],
  UY: ['Correo Uruguayo', 'https://www.correo.com.uy/', 'atencion@correo.com.uy', 'https://x.com/CorreoUruguayo', '', 'https://www.linkedin.com/company/correo-uruguayo/', '', 'NNNNN', '^\\d{5}$', '11000', 'Five-digit código postal'],
  UZ: ['O\'zbekiston Pochtasi', 'https://www.pochta.uz/', 'info@pochta.uz', '', '', 'https://www.linkedin.com/company/uzbekistan-post/', '', 'NNNNNN', '^\\d{6}$', '100000', 'Six-digit postcode'],
  VU: ['Vanuatu Post', 'https://www.vanuatupost.vu/', 'info@vanuatupost.vu', '', '', '', '', 'none', '', '', 'No national postcode; island addressing'],
  VE: ['IPOSTEL (Correo de Venezuela)', 'https://www.ipostel.gob.ve/', 'info@ipostel.gob.ve', '', '', '', '', 'NNNN', '^\\d{4}$', '1010', 'Four-digit código postal (Caracas)'],
  BS: ['Bahamas Postal Service', 'https://www.bahamas.gov.bs/bps', 'info@bps.gov.bs', '', '', '', '', 'none', '', '', 'No national postcode; island addressing'],
  BZ: ['Belize Postal Service', 'https://www.belizepost.bz/', 'info@belizepost.bz', '', '', '', '', 'none', '', '', 'No national postcode; district addressing'],
  GB: ['Royal Mail', 'https://www.royalmail.com/', 'customerservice@royalmail.com', 'https://x.com/RoyalMail', 'https://www.instagram.com/royalmailofficial/', 'https://www.linkedin.com/company/royal-mail/', 'https://developer.royalmail.net/', 'AAN NAA', '^[A-Z]{1,2}\\d[A-Z\\d]? \\d[A-Z]{2}$', 'SW1A 1AA', 'UK postcode (outward + inward codes)'],
  KN: ['St Kitts and Nevis Postal Service', 'https://www.sknpost.gov.kn/', 'info@sknpost.gov.kn', '', '', '', '', 'none', '', '', 'No national postcode; parish addressing'],
  LC: ['Saint Lucia Postal Service', 'https://www.stluciapost.gov.lc/', 'info@stluciapost.gov.lc', '', '', '', '', 'none', '', '', 'No national postcode; parish addressing'],
  NR: ['Nauru Post', 'https://www.naurupost.nr/', 'info@naurupost.nr', '', '', '', '', 'none', '', '', 'No national postcode; district addressing'],
  VC: ['SVG Post (Saint Vincent and the Grenadines)', 'https://www.svgpost.gov.vc/', 'info@svgpost.gov.vc', '', '', '', '', 'none', '', '', 'No national postcode; parish addressing'],
  TV: ['Tuvalu Post', 'https://www.tuvalupost.tv/', 'info@tuvalupost.tv', '', '', '', '', 'none', '', '', 'No national postcode; island addressing'],
  HT: ['Bureau des Postes d\'Haïti', 'https://www.postehaiti.ht/', 'info@postehaiti.ht', '', '', '', '', 'NNNN', '^\\d{4}$', '6110', 'Four-digit code postal (Port-au-Prince area)'],
  MS: ['Montserrat Post', 'https://www.gov.ms/', 'postoffice@gov.ms', '', '', '', '', 'none', '', '', 'No national postcode; UK Overseas Territory addressing'],
  AI: ['Anguilla Postal Service', 'https://www.gov.ai/', 'postoffice@gov.ai', '', '', '', '', 'none', '', '', 'No national postcode; island addressing'],
  BM: ['Bermuda Post Office', 'https://www.bermudapost.bm/', 'info@bermudapost.bm', '', '', '', '', 'AA NN', '^[A-Z]{2} \\d{2}$', 'HM 12', 'Two letters + space + two digits (Bermuda)'],
  VG: ['BVI Post (British Virgin Islands)', 'https://www.bvi.gov.vg/', 'postoffice@bvi.gov.vg', '', '', '', '', 'none', '', '', 'No national postcode; island addressing'],
  KY: ['Cayman Islands Postal Service', 'https://www.caymanpost.gov.ky/', 'info@caymanpost.gov.ky', '', '', '', '', 'KYn-NNNN', '^KY\\d-\\d{4}$', 'KY1-1100', 'KY + digit + hyphen + four digits'],
  TC: ['Turks and Caicos Islands Post Office', 'https://www.gov.tc/', 'postoffice@gov.tc', '', '', '', '', 'TKCA 1ZZ', '^TKCA 1ZZ$', 'TKCA 1ZZ', 'Single postcode used nationally (TKCA 1ZZ)'],
  BE: ['bpost', 'https://www.bpost.be/', 'info@bpost.be', 'https://x.com/bpost_be', 'https://www.instagram.com/bpost_be/', 'https://www.linkedin.com/company/bpost/', '', 'NNNN', '^\\d{4}$', '1000', 'Four-digit postcode'],
  DK: ['PostNord Danmark', 'https://www.postnord.dk/', 'kundeservice@postnord.dk', 'https://x.com/PostNordDK', 'https://www.instagram.com/postnorddk/', 'https://www.linkedin.com/company/postnord/', '', 'NNNN', '^\\d{4}$', '1050', 'Four-digit postcode'],
  FI: ['Posti', 'https://www.posti.fi/', 'asiakaspalvelu@posti.fi', 'https://x.com/PostiGroup', 'https://www.instagram.com/postigroup/', 'https://www.linkedin.com/company/posti/', '', 'NNNNN', '^\\d{5}$', '00100', 'Five-digit postcode'],
  FR: ['La Poste', 'https://www.laposte.fr/', 'contact@laposte.fr', 'https://x.com/laposte', 'https://www.instagram.com/laposte/', 'https://www.linkedin.com/company/la-poste/', '', 'NNNNN', '^\\d{5}$', '75001', 'Five-digit code postal'],
  DE: ['Deutsche Post', 'https://www.deutschepost.de/', 'info@deutschepost.de', 'https://x.com/DeutschePost', 'https://www.instagram.com/deutschepost/', 'https://www.linkedin.com/company/deutsche-post/', '', 'NNNNN', '^\\d{5}$', '10115', 'Five-digit Postleitzahl'],
  IE: ['An Post', 'https://www.anpost.com/', 'customerservice@anpost.ie', 'https://x.com/anpost', 'https://www.instagram.com/anpost/', 'https://www.linkedin.com/company/an-post/', '', 'A65 F4E2', '^[A-Z]\\d{2} [A-Z0-9]{4}$', 'D02 AF30', 'Eircode: routing key + unique identifier'],
  NL: ['PostNL', 'https://www.postnl.nl/', 'klantenservice@postnl.nl', 'https://x.com/PostNL', 'https://www.instagram.com/postnl/', 'https://www.linkedin.com/company/postnl/', '', 'NNNN AA', '^\\d{4} [A-Z]{2}$', '1012 AB', 'Four digits + space + two letters'],
  ES: ['Correos', 'https://www.correos.es/', 'atencioncliente@correos.es', 'https://x.com/Correos', 'https://www.instagram.com/correos/', 'https://www.linkedin.com/company/correos/', '', 'NNNNN', '^\\d{5}$', '28001', 'Five-digit código postal'],
  SE: ['PostNord Sverige', 'https://www.postnord.se/', 'kundservice@postnord.se', 'https://x.com/PostNordSE', 'https://www.instagram.com/postnordse/', 'https://www.linkedin.com/company/postnord/', '', 'NNN NN', '^\\d{3} \\d{2}$', '111 22', 'Five-digit postcode (space after third digit)'],
  IS: ['Pósturinn (Iceland Post)', 'https://www.postur.is/', 'postur@postur.is', 'https://x.com/Posturinn', 'https://www.instagram.com/posturinn/', 'https://www.linkedin.com/company/posturinn/', '', 'NNN', '^\\d{3}$', '101', 'Three-digit postcode'],
  NO: ['Posten Norge (PostNord Norge)', 'https://www.posten.no/', 'kundeservice@posten.no', 'https://x.com/PostenNorge', 'https://www.instagram.com/postennorge/', 'https://www.linkedin.com/company/posten-norge/', '', 'NNNN', '^\\d{4}$', '0150', 'Four-digit postcode'],
  CH: ['Swiss Post (Die Post / La Poste)', 'https://www.post.ch/', 'info@post.ch', 'https://x.com/post_ch', 'https://www.instagram.com/post_ch/', 'https://www.linkedin.com/company/swiss-post/', '', 'NNNN', '^\\d{4}$', '3000', 'Four-digit postcode (Switzerland)'],
}

const postSources = [
  'africanUnion/domesticPostServicesByIso.ts',
  'allianceOfSahelStates/domesticPostServicesByIso.ts',
  'AMU/domesticPostServicesByIso.ts',
  'APEC/domesticPostServicesByIso.ts',
  'arabLeague/domesticPostServicesByIso.ts',
  'ASEAN/domesticPostServicesByIso.ts',
  'OECD/domesticPostServicesByIso.ts',
]
const entries = {}
for (const src of postSources) Object.assign(entries, parsePostFromFile(path.join(ROOT, src)))
Object.assign(entries, supplemental)

// Fix Canada email in supplemental
entries.CA[2] = 'customercare@canadapost-postescanada.ca'
// Fix Brazil website typo
entries.BR[1] = 'https://www.correios.com.br/'

const skipByIso = new Set(['index.ts', 'types.ts', 'domesticPostServicesByIso.ts', 'domesticCouriersByIso.ts', 'newsOutletsByIso.ts', 'notableUniversitiesByIso.ts', 'mainExportCommoditiesByIso.ts', 'mainExportedElementsByIso.ts', 'rareEarthsByIso.ts', 'bondMarketsByIso.ts', 'mainInternationalAirportsByIso.ts', 'intellectualPropertyDepartmentsByIso.ts', 'securitiesExchangeCommissionByIso.ts', 'mainInternationalSeaportsByIso.ts'])

const alliances = [
  { dir: 'AMU', isoFile: 'amuMemberIsoCodes.ts', isoConst: 'AMU_MEMBER_ISO_CODES', constName: 'AMU_DOMESTIC_POST_SERVICES', isoType: 'AmuMemberIsoCode', isoImport: 'amuMemberIsoCodes', prefix: 'AMU', skip: ['amuMemberIsoCodes.ts'], comment: 'AMU founding member' },
  { dir: 'APEC', isoFile: 'apecMemberIsoCodes.ts', isoConst: 'APEC_MEMBER_ISO_CODES', constName: 'APEC_DOMESTIC_POST_SERVICES', isoType: 'ApecMemberIsoCode', isoImport: 'apecMemberIsoCodes', prefix: 'APEC', skip: ['apecMemberIsoCodes.ts'], comment: 'APEC member economy' },
  { dir: 'arabLeague', isoFile: 'arabLeagueMemberIsoCodes.ts', isoConst: 'ARAB_LEAGUE_MEMBER_ISO_CODES', constName: 'ARAB_LEAGUE_DOMESTIC_POST_SERVICES', isoType: 'ArabLeagueMemberIsoCode', isoImport: 'arabLeagueMemberIsoCodes', prefix: 'ARAB_LEAGUE', skip: ['arabLeagueMemberIsoCodes.ts'], comment: 'Arab League member state' },
  { dir: 'ASEAN', isoFile: 'aseanMemberIsoCodes.ts', isoConst: 'ASEAN_MEMBER_ISO_CODES', constName: 'ASEAN_DOMESTIC_POST_SERVICES', isoType: 'AseanMemberIsoCode', isoImport: 'aseanMemberIsoCodes', prefix: 'ASEAN', skip: ['aseanMemberIsoCodes.ts'], comment: 'ASEAN member state' },
  { dir: 'beltAndRoadInitiative', isoFile: 'participantStatesIsoCodes.ts', isoConst: 'BELT_AND_ROAD_PARTICIPANT_ISO_CODES', constName: 'BRI_DOMESTIC_POST_SERVICES', isoType: 'BriMemberIsoCode', isoImport: 'participantStatesIsoCodes', prefix: 'BRI', skip: ['participantStatesIsoCodes.ts'], comment: 'Belt and Road participant economy' },
  { dir: 'BRICS', isoFile: 'bricsMemberIsoCodes.ts', isoConst: 'BRICS_MEMBER_ISO_CODES', constName: 'BRICS_DOMESTIC_POST_SERVICES', isoType: 'BricsMemberIsoCode', isoImport: 'bricsMemberIsoCodes', prefix: 'BRICS', skip: ['bricsMemberIsoCodes.ts'], comment: 'BRICS founding member economy' },
  { dir: 'britishCommonwealth', isoFile: 'commonwealthMemberIsoCodes.ts', isoConst: 'COMMONWEALTH_MEMBER_ISO_CODES', constName: 'COMMONWEALTH_DOMESTIC_POST_SERVICES', isoType: 'CommonwealthMemberIsoCode', isoImport: 'commonwealthMemberIsoCodes', prefix: 'COMMONWEALTH', skip: ['commonwealthMemberIsoCodes.ts'], comment: 'Commonwealth member state' },
  { dir: 'CARICOM', isoFile: 'caricomMemberIsoCodes.ts', isoConst: 'CARICOM_MEMBER_ISO_CODES', constName: 'CARICOM_DOMESTIC_POST_SERVICES', isoType: 'CaricomMemberIsoCode', isoImport: 'caricomMemberIsoCodes', prefix: 'CARICOM', skip: ['caricomMemberIsoCodes.ts'], comment: 'CARICOM member state or associate' },
  { dir: 'CEN-SAD', isoFile: 'censadMemberIsoCodes.ts', isoConst: 'CENSAD_MEMBER_ISO_CODES', constName: 'CENSAD_DOMESTIC_POST_SERVICES', isoType: 'CensadMemberIsoCode', isoImport: 'censadMemberIsoCodes', prefix: 'CENSAD', skip: ['censadMemberIsoCodes.ts'], comment: 'CEN-SAD member state' },
  { dir: 'COMESA', isoFile: 'comesaMemberIsoCodes.ts', isoConst: 'COMESA_MEMBER_ISO_CODES', constName: 'COMESA_DOMESTIC_POST_SERVICES', isoType: 'ComesaMemberIsoCode', isoImport: 'comesaMemberIsoCodes', prefix: 'COMESA', skip: ['comesaMemberIsoCodes.ts'], comment: 'COMESA member state' },
  { dir: 'CPTPP', isoFile: 'cptppMemberIsoCodes.ts', isoConst: 'CPTPP_MEMBER_ISO_CODES', constName: 'CPTPP_DOMESTIC_POST_SERVICES', isoType: 'CptppMemberIsoCode', isoImport: 'cptppMemberIsoCodes', prefix: 'CPTPP', skip: ['cptppMemberIsoCodes.ts'], comment: 'CPTPP party economy' },
  { dir: 'EAC', isoFile: 'eacMemberIsoCodes.ts', isoConst: 'EAC_MEMBER_ISO_CODES', constName: 'EAC_DOMESTIC_POST_SERVICES', isoType: 'EacMemberIsoCode', isoImport: 'eacMemberIsoCodes', prefix: 'EAC', skip: ['eacMemberIsoCodes.ts'], comment: 'EAC partner state' },
  { dir: 'ECCAS', isoFile: 'eccasMemberIsoCodes.ts', isoConst: 'ECCAS_MEMBER_ISO_CODES', constName: 'ECCAS_DOMESTIC_POST_SERVICES', isoType: 'EccasMemberIsoCode', isoImport: 'eccasMemberIsoCodes', prefix: 'ECCAS', skip: ['eccasMemberIsoCodes.ts'], comment: 'ECCAS partner state' },
  { dir: 'ECOWAS', isoFile: 'ecowasMemberIsoCodes.ts', isoConst: 'ECOWAS_MEMBER_ISO_CODES', constName: 'ECOWAS_DOMESTIC_POST_SERVICES', isoType: 'EcowasMemberIsoCode', isoImport: 'ecowasMemberIsoCodes', prefix: 'ECOWAS', skip: ['ecowasMemberIsoCodes.ts'], comment: 'ECOWAS member state' },
  { dir: 'EU', isoFile: 'euMemberIsoCodes.ts', isoConst: 'EU_MEMBER_ISO_CODES', constName: 'EU_DOMESTIC_POST_SERVICES', isoType: 'EuMemberIsoCode', isoImport: 'euMemberIsoCodes', prefix: 'EU', skip: ['euMemberIsoCodes.ts'], comment: 'EU member state' },
  { dir: 'fiveEyes', isoFile: 'fiveEyesMemberIsoCodes.ts', isoConst: 'FIVE_EYES_MEMBER_ISO_CODES', constName: 'FIVE_EYES_DOMESTIC_POST_SERVICES', isoType: 'FiveEyesMemberIsoCode', isoImport: 'fiveEyesMemberIsoCodes', prefix: 'FIVE_EYES', skip: ['fiveEyesMemberIsoCodes.ts'], comment: 'Five Eyes member state' },
  { dir: 'G7', isoFile: 'g7MemberIsoCodes.ts', isoConst: 'G7_MEMBER_ISO_CODES', constName: 'G7_DOMESTIC_POST_SERVICES', isoType: 'G7MemberIsoCode', isoImport: 'g7MemberIsoCodes', prefix: 'G7', skip: ['g7MemberIsoCodes.ts'], comment: 'G7 member state' },
  { dir: 'G20', isoFile: 'g20MemberIsoCodes.ts', isoConst: 'G20_SOVEREIGN_MEMBER_ISO_CODES', constName: 'G20_DOMESTIC_POST_SERVICES', isoType: 'G20SovereignMemberIsoCode', isoImport: 'g20MemberIsoCodes', prefix: 'G20', skip: ['g20MemberIsoCodes.ts', 'africanUnion.ts', 'europeanUnion.ts'], comment: 'G20 sovereign member state' },
  { dir: 'GCC', isoFile: 'gccMemberIsoCodes.ts', isoConst: 'GCC_MEMBER_ISO_CODES', constName: 'GCC_DOMESTIC_POST_SERVICES', isoType: 'GccMemberIsoCode', isoImport: 'gccMemberIsoCodes', prefix: 'GCC', skip: ['gccMemberIsoCodes.ts'], comment: 'GCC member state' },
  { dir: 'IGAD', isoFile: 'igadMemberIsoCodes.ts', isoConst: 'IGAD_MEMBER_ISO_CODES', constName: 'IGAD_DOMESTIC_POST_SERVICES', isoType: 'IgadMemberIsoCode', isoImport: 'igadMemberIsoCodes', prefix: 'IGAD', skip: ['igadMemberIsoCodes.ts'], comment: 'IGAD member state' },
  { dir: 'IORA', isoFile: 'ioraMemberIsoCodes.ts', isoConst: 'IORA_MEMBER_ISO_CODES', constName: 'IORA_DOMESTIC_POST_SERVICES', isoType: 'IoraMemberIsoCode', isoImport: 'ioraMemberIsoCodes', prefix: 'IORA', skip: ['ioraMemberIsoCodes.ts'], comment: 'IORA member state' },
  { dir: 'MIKTA', isoFile: 'miktaMemberIsoCodes.ts', isoConst: 'MIKTA_MEMBER_ISO_CODES', constName: 'MIKTA_DOMESTIC_POST_SERVICES', isoType: 'MiktaMemberIsoCode', isoImport: 'miktaMemberIsoCodes', prefix: 'MIKTA', skip: ['miktaMemberIsoCodes.ts'], comment: 'MIKTA member state' },
  { dir: 'MINT', isoFile: 'mintMemberIsoCodes.ts', isoConst: 'MINT_MEMBER_ISO_CODES', constName: 'MINT_DOMESTIC_POST_SERVICES', isoType: 'MintMemberIsoCode', isoImport: 'mintMemberIsoCodes', prefix: 'MINT', skip: ['mintMemberIsoCodes.ts'], comment: 'MINT member state' },
  { dir: 'NATO', isoFile: 'natoMemberIsoCodes.ts', isoConst: 'NATO_MEMBER_ISO_CODES', constName: 'NATO_DOMESTIC_POST_SERVICES', isoType: 'NatoMemberIsoCode', isoImport: 'natoMemberIsoCodes', prefix: 'NATO', skip: ['natoMemberIsoCodes.ts'], comment: 'NATO Ally' },
  { dir: 'OECD', isoFile: 'oecdMemberIsoCodes.ts', isoConst: 'OECD_MEMBER_ISO_CODES', constName: 'OECD_DOMESTIC_POST_SERVICES', isoType: 'OecdMemberIsoCode', isoImport: 'oecdMemberIsoCodes', prefix: 'OECD', skip: ['oecdMemberIsoCodes.ts'], comment: 'OECD member economy' },
  { dir: 'OECS', isoFile: 'oecsMemberIsoCodes.ts', isoConst: 'OECS_MEMBER_ISO_CODES', constName: 'OECS_DOMESTIC_POST_SERVICES', isoType: 'OecsMemberIsoCode', isoImport: 'oecsMemberIsoCodes', prefix: 'OECS', skip: ['oecsMemberIsoCodes.ts'], comment: 'OECS member state' },
  { dir: 'OPEC', isoFile: 'opecMemberIsoCodes.ts', isoConst: 'OPEC_MEMBER_ISO_CODES', constName: 'OPEC_DOMESTIC_POST_SERVICES', isoType: 'OpecMemberIsoCode', isoImport: 'opecMemberIsoCodes', prefix: 'OPEC', skip: ['opecMemberIsoCodes.ts'], comment: 'OPEC member state' },
  { dir: 'RCEP', isoFile: 'rcepMemberIsoCodes.ts', isoConst: 'RCEP_MEMBER_ISO_CODES', constName: 'RCEP_DOMESTIC_POST_SERVICES', isoType: 'RcepMemberIsoCode', isoImport: 'rcepMemberIsoCodes', prefix: 'RCEP', skip: ['rcepMemberIsoCodes.ts'], comment: 'RCEP party economy' },
  { dir: 'SADC', isoFile: 'sadcMemberIsoCodes.ts', isoConst: 'SADC_MEMBER_ISO_CODES', constName: 'SADC_DOMESTIC_POST_SERVICES', isoType: 'SadcMemberIsoCode', isoImport: 'sadcMemberIsoCodes', prefix: 'SADC', skip: ['sadcMemberIsoCodes.ts'], comment: 'SADC member state' },
]

for (const a of alliances) {
  const isoCodes = readIsoCodes(`${a.dir}/${a.isoFile}`, a.isoConst)
  for (const iso of isoCodes) {
    if (!entries[iso]) throw new Error(`Still missing entry for ${iso} (${a.dir})`)
  }
  writePostFile(a.dir, { isoCodes, constName: a.constName, isoType: a.isoType, isoImport: a.isoImport, comment: a.comment }, entries)
  wireCountries(a.dir, a.prefix, new Set([...skipByIso, ...a.skip]))
}

console.log('Done')
