import fs from 'fs'
import path from 'path'

const ROOT = 'src/lib/cores/alliancesCore'
const esc = (s) => s.replace(/\\/g, '\\\\').replace(/'/g, "\\'")

function parseSeaportsFromFile(filePath) {
  if (!fs.existsSync(filePath)) return {}
  const content = fs.readFileSync(filePath, 'utf8')
  const entries = {}
  const blockRe = /  ([A-Z]{2}): seaport\(\n([\s\S]*?)\n  \),/g
  let m
  while ((m = blockRe.exec(content)) !== null) {
    const lines = [...m[2].matchAll(/    '((?:\\'|[^'])*)',/g)].map((x) => x[1].replace(/\\'/g, "'"))
    if (lines.length >= 9) entries[m[1]] = lines.slice(0, 9)
  }
  return entries
}

function mergeEntries(...maps) {
  return Object.assign({}, ...maps)
}

const FILE_HEADER = (isoImport, isoType) => `import type { ${isoType} } from './${isoImport}'
import type { MainInternationalSeaport } from './types'

function seaport(
  name: string,
  website: string,
  email: string,
  twitter: string,
  instagram: string,
  linkedin: string,
  customsEmail: string,
  customsWebsite: string,
  customsAddress: string,
  apiEndpoint = '',
): MainInternationalSeaport {
  return {
    name,
    website,
    email,
    twitter,
    instagram,
    linkedin,
    apiEndpoint,
    customsOffice: {
      email: customsEmail,
      website: customsWebsite,
      address: customsAddress,
    },
  }
}

`

function writeSeaportsFile(dir, { isoCodes, constName, isoType, isoImport, comment }, entries) {
  let out = FILE_HEADER(isoImport, isoType)
  out += `/**
 * Main international seaport per ${comment} (coastal gateway or principal maritime access point).
 * Informational; verify URLs, handles, customs contacts, and API bases before production.
 * Self-contained — no imports from other alliance modules.
 */
export const ${constName}: Record<${isoType}, MainInternationalSeaport> = {
`
  for (const iso of isoCodes) {
    const e = entries[iso]
    if (!e) throw new Error(`Missing seaport entry for ${iso} in ${dir}`)
    out += `  ${iso}: seaport(\n`
    for (const field of e) out += `    '${esc(field)}',\n`
    out += `  ),\n`
  }
  out += `}\n`
  fs.writeFileSync(path.join(ROOT, dir, 'mainInternationalSeaportsByIso.ts'), out)
}

function wireCountries(dir, prefix, skip) {
  const full = path.join(ROOT, dir)
  let count = 0
  for (const file of fs.readdirSync(full)) {
    if (!file.endsWith('.ts') || skip.has(file) || file.endsWith('ByIso.ts')) continue
    const fp = path.join(full, file)
    let src = fs.readFileSync(fp, 'utf8')
    if (src.includes(`${prefix}_MAIN_INTERNATIONAL_SEAPORTS`)) continue
    const secImport = `import { ${prefix}_SECURITIES_EXCHANGE_COMMISSIONS } from './securitiesExchangeCommissionByIso'\n`
    if (!src.includes(secImport)) throw new Error(`No SEC import in ${file}`)
    src = src.replace(secImport, `${secImport}import { ${prefix}_MAIN_INTERNATIONAL_SEAPORTS } from './mainInternationalSeaportsByIso'\n`)
    const iso = src.match(/iso3166Alpha2: '([A-Z]{2})'/)[1]
    src = src.replace(
      `  mainInternationalAirport: ${prefix}_MAIN_INTERNATIONAL_AIRPORTS['${iso}'],\n`,
      `  mainInternationalAirport: ${prefix}_MAIN_INTERNATIONAL_AIRPORTS['${iso}'],\n  mainInternationalSeaport: ${prefix}_MAIN_INTERNATIONAL_SEAPORTS['${iso}'],\n`,
    )
    fs.writeFileSync(fp, src)
    count++
  }
  console.log(`Wired ${count} files in ${dir}`)
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

// Supplemental entries for ISO codes not yet in other alliance modules
const supplemental = {
  AF: ['Port of Karachi (primary maritime gateway; landlocked)', 'https://www.kpt.gov.pk/', 'info@kpt.gov.pk', 'https://x.com/KarachiPort', 'https://www.instagram.com/karachiport/', 'https://www.linkedin.com/company/karachi-port-trust/', 'customs@customs.gov.af', 'https://www.customs.gov.af', 'Afghanistan Customs — Kabul, Afghanistan'],
  AL: ['Port of Durrës', 'https://www.portdurres.com.al/', 'info@portdurres.com.al', 'https://x.com/PortDurres', 'https://www.instagram.com/portdurres/', 'https://www.linkedin.com/company/port-of-durres/', 'dogana@dogana.gov.al', 'https://www.dogana.gov.al', 'Albanian Customs — Port of Durrës, Durrës, Albania'],
  AO: ['Port of Luanda', 'https://www.otal.com/angola/port-of-luanda', 'info@portosdeangola.co.ao', 'https://x.com/PortosAngola', 'https://www.instagram.com/portosdeangola/', 'https://www.linkedin.com/company/portos-de-angola/', 'aduaneira@minfin.gov.ao', 'https://www.minfin.gov.ao', 'Customs Post — Port of Luanda, Luanda, Angola'],
  AG: ['Port of St. John\'s', 'https://www.antiguaport.com/', 'info@antiguaport.com', 'https://x.com/AntiguaPort', 'https://www.instagram.com/antiguaport/', 'https://www.linkedin.com/company/antigua-port-authority/', 'customs@antigua.gov.ag', 'https://www.customs.gov.ag', 'Antigua and Barbuda Customs — Port of St. John\'s, St. John\'s, Antigua and Barbuda'],
  AR: ['Port of Buenos Aires', 'https://www.argentina.gob.ar/puertos', 'puertos@argentina.gob.ar', 'https://x.com/PuertosArgentina', 'https://www.instagram.com/puertosargentina/', 'https://www.linkedin.com/company/puertos-argentina/', 'aduana@afip.gob.ar', 'https://www.afip.gob.ar', 'AFIP Aduana — Puerto Buenos Aires, Buenos Aires, Argentina'],
  AM: ['Port of Poti (primary maritime gateway; landlocked)', 'https://www.potiport.com/', 'info@potiport.com', 'https://x.com/PotiPort', 'https://www.instagram.com/potiport/', 'https://www.linkedin.com/company/poti-port/', 'customs@customs.am', 'https://www.customs.am', 'State Revenue Committee — Yerevan, Armenia'],
  AT: ['Port of Koper (primary maritime gateway; landlocked)', 'https://www.luka-kp.si/', 'info@luka-kp.si', 'https://x.com/PortKoper', 'https://www.instagram.com/portkoper/', 'https://www.linkedin.com/company/luka-koper/', 'zoll@bmf.gv.at', 'https://www.bmf.gv.at', 'Bundesministerium Finanzen Zoll — Vienna, Austria'],
  AZ: ['Port of Baku (Alat)', 'https://www.portofbaku.com/', 'info@portofbaku.com', 'https://x.com/PortofBaku', 'https://www.instagram.com/portofbaku/', 'https://www.linkedin.com/company/baku-international-sea-trade-port/', 'customs@taxes.gov.az', 'https://www.customs.gov.az', 'State Customs Committee — Port of Baku, Baku, Azerbaijan'],
  BD: ['Port of Chittagong (Chattogram)', 'https://www.cpa.gov.bd/', 'info@cpa.gov.bd', 'https://x.com/CPA_Bangladesh', 'https://www.instagram.com/cpa_bangladesh/', 'https://www.linkedin.com/company/chittagong-port-authority/', 'customs@customs.gov.bd', 'https://www.customs.gov.bd', 'National Board of Revenue Customs — Chattogram Port, Chattogram, Bangladesh'],
  BB: ['Port of Bridgetown', 'https://www.barbadosport.com/', 'info@barbadosport.com', 'https://x.com/BarbadosPort', 'https://www.instagram.com/barbadosport/', 'https://www.linkedin.com/company/barbados-port-inc/', 'customs@bra.gov.bb', 'https://www.bra.gov.bb', 'Barbados Revenue Authority Customs — Port of Bridgetown, Bridgetown, Barbados'],
  BY: ['Port of Klaipėda (primary maritime gateway; landlocked)', 'https://www.portofklaipeda.lt/', 'info@portofklaipeda.lt', 'https://x.com/PortKlaipeda', 'https://www.instagram.com/portklaipeda/', 'https://www.linkedin.com/company/klaipeda-state-seaport-authority/', 'customs@gov.by', 'https://www.customs.gov.by', 'State Customs Committee — Minsk, Belarus'],
  BJ: ['Port of Cotonou', 'https://www.portdecotonou.com/', 'contact@portdecotonou.com', 'https://x.com/PortCotonou', 'https://www.instagram.com/portcotonou/', 'https://www.linkedin.com/company/port-autonome-de-cotonou/', 'douanes@finances.bj', 'https://www.douanes.bj', 'Direction Générale des Douanes — Port de Cotonou, Cotonou, Benin'],
  BO: ['Port of Arica (primary maritime gateway; landlocked)', 'https://www.puertoarica.cl/', 'contacto@puertoarica.cl', 'https://x.com/PuertoArica', 'https://www.instagram.com/puertoarica/', 'https://www.linkedin.com/company/puerto-arica/', 'aduana@aduana.gob.bo', 'https://www.aduana.gob.bo', 'Aduana Nacional — La Paz, Bolivia'],
  BA: ['Port of Ploče (primary maritime gateway; landlocked)', 'https://www.portploce.hr/', 'info@portploce.hr', 'https://x.com/PortPloce', 'https://www.instagram.com/portploce/', 'https://www.linkedin.com/company/port-of-ploce/', 'carina@uino.gov.ba', 'https://www.uino.gov.ba', 'Indirect Taxation Authority — Sarajevo, Bosnia and Herzegovina'],
  BW: ['Port of Walvis Bay (primary maritime gateway; landlocked)', 'https://www.namport.com.na/', 'info@namport.com.na', 'https://x.com/NamportNamibia', 'https://www.instagram.com/namport_namibia/', 'https://www.linkedin.com/company/namport/', 'info@botswanacustoms.gov.bw', 'https://www.botswanacustoms.gov.bw', 'Botswana Unified Revenue Service — Gaborone, Botswana'],
  BG: ['Port of Varna', 'https://www.port-varna.com/', 'info@port-varna.com', 'https://x.com/PortVarna', 'https://www.instagram.com/portvarna/', 'https://www.linkedin.com/company/port-of-varna/', 'customs@customs.bg', 'https://www.customs.bg', 'Bulgarian Customs — Port of Varna, Varna, Bulgaria'],
  BI: ['Port of Bujumbura (Lake Tanganyika)', 'https://www.obr.bi/', 'info@obr.bi', 'https://x.com/OBR_Burundi', 'https://www.instagram.com/obr_burundi/', 'https://www.linkedin.com/company/office-burundais-des-recettes/', 'douanes@obr.bi', 'https://www.obr.bi', 'Bureau des Douanes — Port de Bujumbura, Bujumbura, Burundi'],
  BR: ['Port of Santos', 'https://www.portodesantos.com.br/', 'atendimento@portodesantos.com.br', 'https://x.com/PortoSantos', 'https://www.instagram.com/portodesantos/', 'https://www.linkedin.com/company/porto-de-santos/', 'atendimento@receita.fazenda.gov.br', 'https://www.gov.br/receitafederal', 'Receita Federal — Porto de Santos, Santos, Brazil'],
  BS: ['Port of Nassau (Freeport)', 'https://www.bahamasports.com/', 'info@bahamasports.com', 'https://x.com/BahamasPorts', 'https://www.instagram.com/bahamasports/', 'https://www.linkedin.com/company/bahamas-port-department/', 'customs@bahamas.gov.bs', 'https://www.bahamas.gov.bs/customs', 'Bahamas Customs — Freeport, Grand Bahama, Bahamas'],
  BZ: ['Port of Belize City', 'https://www.portbelize.com/', 'info@portbelize.com', 'https://x.com/PortBelize', 'https://www.instagram.com/portbelize/', 'https://www.linkedin.com/company/port-of-belize/', 'customs@belize.gov.bz', 'https://www.customs.gov.bz', 'Belize Customs and Excise — Port of Belize City, Belize City, Belize'],
  CA: ['Port of Vancouver', 'https://www.portvancouver.com/', 'info@portvancouver.com', 'https://x.com/portvancouver', 'https://www.instagram.com/portvancouver/', 'https://www.linkedin.com/company/port-of-vancouver/', 'cbcsa-client-services@cbsa-asfc.gc.ca', 'https://www.cbsa-asfc.gc.ca', 'Canada Border Services Agency — Port of Vancouver, Vancouver, Canada'],
  CK: ['Port of Avatiu (Rarotonga)', 'https://www.ports.co.ck/', 'info@ports.co.ck', 'https://x.com/CookIslandsPorts', 'https://www.instagram.com/cookislandsports/', 'https://www.linkedin.com/company/cook-islands-ports-authority/', 'customs@cookislands.gov.ck', 'https://www.customs.gov.ck', 'Cook Islands Customs — Port of Avatiu, Rarotonga, Cook Islands'],
  CO: ['Port of Cartagena', 'https://www.puertocartagena.com/', 'info@puertocartagena.com', 'https://x.com/PuertoCartagena', 'https://www.instagram.com/puertocartagena/', 'https://www.linkedin.com/company/sociedad-portuaria-regional-de-cartagena/', 'contacto@dian.gov.co', 'https://www.dian.gov.co', 'DIAN Aduanas — Puerto de Cartagena, Cartagena, Colombia'],
  CR: ['Port of Limón (Puerto Limón)', 'https://www.japdeva.go.cr/', 'info@japdeva.go.cr', 'https://x.com/JAPDEVA', 'https://www.instagram.com/japdeva/', 'https://www.linkedin.com/company/japdeva/', 'aduana@hacienda.go.cr', 'https://www.hacienda.go.cr', 'Servicio Nacional de Aduanas — Puerto Limón, Limón, Costa Rica'],
  HR: ['Port of Rijeka', 'https://www.lukarijeka.hr/', 'info@lukarijeka.hr', 'https://x.com/PortRijeka', 'https://www.instagram.com/portrijeka/', 'https://www.linkedin.com/company/port-of-rijeka-authority/', 'carina@carina.hr', 'https://www.carina.hr', 'Croatian Customs — Port of Rijeka, Rijeka, Croatia'],
  CU: ['Port of Mariel', 'https://www.zedmariel.cu/', 'info@zedmariel.cu', 'https://x.com/ZonaMariel', 'https://www.instagram.com/zonamariel/', 'https://www.linkedin.com/company/zona-especial-mariel/', 'aduana@aduana.gob.cu', 'https://www.aduana.gob.cu', 'Aduana General de la República — Puerto Mariel, Mariel, Cuba'],
  CY: ['Port of Limassol', 'https://www.cyprusports.gov.cy/', 'info@cyprusports.gov.cy', 'https://x.com/CyprusPorts', 'https://www.instagram.com/cyprusports/', 'https://www.linkedin.com/company/cyprus-ports-authority/', 'customs@mof.gov.cy', 'https://www.mof.gov.cy/customs', 'Cyprus Customs — Port of Limassol, Limassol, Cyprus'],
  CZ: ['Port of Hamburg (primary maritime gateway; landlocked)', 'https://www.hafen-hamburg.de/', 'info@hafen-hamburg.de', 'https://x.com/hafenhamburg', 'https://www.instagram.com/hafenhamburg/', 'https://www.linkedin.com/company/hamburg-port-authority/', 'celni@cs.mfcr.cz', 'https://www.celnisprava.cz', 'Czech Customs Administration — Prague, Czech Republic'],
  DM: ['Port of Roseau', 'https://www.dominicaports.dm/', 'info@dominicaports.dm', 'https://x.com/DominicaPorts', 'https://www.instagram.com/dominicaport/', 'https://www.linkedin.com/company/dominica-ports-authority/', 'customs@customs.gov.dm', 'https://www.customs.gov.dm', 'Dominica Customs — Port of Roseau, Roseau, Dominica'],
  DO: ['Port of Caucedo', 'https://www.dpworld.com/dominican-republic', 'info@dpworld.com', 'https://x.com/DP_World', 'https://www.instagram.com/dpworld/', 'https://www.linkedin.com/company/dp-world/', 'aduana@dgii.gov.do', 'https://www.dgii.gov.do', 'DGA Aduanas — Puerto Caucedo, Santo Domingo, Dominican Republic'],
  EC: ['Port of Guayaquil', 'https://www.puertodeguayaquil.com/', 'info@puertodeguayaquil.com', 'https://x.com/PuertoGuayaquil', 'https://www.instagram.com/puertoguayaquil/', 'https://www.linkedin.com/company/autoridad-portuaria-de-guayaquil/', 'aduana@aduana.gob.ec', 'https://www.aduana.gob.ec', 'Servicio Nacional de Aduanas — Puerto de Guayaquil, Guayaquil, Ecuador'],
  SV: ['Port of Acajutla', 'https://www.portacajutla.gob.sv/', 'info@portacajutla.gob.sv', 'https://x.com/PortAcajutla', 'https://www.instagram.com/portacajutla/', 'https://www.linkedin.com/company/autoridad-portuaria-acajutla/', 'aduana@aduana.gob.sv', 'https://www.aduana.gob.sv', 'Dirección General de Aduanas — Puerto Acajutla, Acajutla, El Salvador'],
  EE: ['Port of Muuga (Tallinn)', 'https://www.portoftallinn.com/', 'info@portoftallinn.com', 'https://x.com/PortofTallinn', 'https://www.instagram.com/portoftallinn/', 'https://www.linkedin.com/company/port-of-tallinn/', 'info@toll.ee', 'https://www.emta.ee', 'Estonian Tax and Customs Board — Port of Muuga, Tallinn, Estonia'],
  FJ: ['Port of Suva', 'https://www.fijiports.com.fj/', 'info@fijiports.com.fj', 'https://x.com/FijiPorts', 'https://www.instagram.com/fijiports/', 'https://www.linkedin.com/company/fiji-ports-corporation/', 'customs@fiji.gov.fj', 'https://www.frcs.org.fj', 'FRCS Customs — Port of Suva, Suva, Fiji'],
  GB: ['Port of Felixstowe', 'https://www.portoffelixstowe.co.uk/', 'info@portoffelixstowe.co.uk', 'https://x.com/PortofFelixstowe', 'https://www.instagram.com/portoffelixstowe/', 'https://www.linkedin.com/company/port-of-felixstowe/', 'national.advice@hmrc.gov.uk', 'https://www.gov.uk/government/organisations/hm-revenue-customs', 'HMRC Border Force — Port of Felixstowe, Felixstowe, United Kingdom'],
  GD: ['Port of St. George\'s', 'https://www.grenadaports.com/', 'info@grenadaports.com', 'https://x.com/GrenadaPorts', 'https://www.instagram.com/grenadaports/', 'https://www.linkedin.com/company/grenada-ports-authority/', 'customs@customs.gov.gd', 'https://www.customs.gov.gd', 'Grenada Customs — Port of St. George\'s, St. George\'s, Grenada'],
  GY: ['Port of Georgetown', 'https://www.guyanaports.com/', 'info@guyanaports.com', 'https://x.com/GuyanaPorts', 'https://www.instagram.com/guyanaports/', 'https://www.linkedin.com/company/guyana-ports-inc/', 'customs@gra.gov.gy', 'https://www.gra.gov.gy', 'Guyana Revenue Authority Customs — Port of Georgetown, Georgetown, Guyana'],
  GR: ['Port of Piraeus', 'https://www.olp.gr/', 'info@olp.gr', 'https://x.com/PiraeusPort', 'https://www.instagram.com/piraeusport/', 'https://www.linkedin.com/company/piraeus-port-authority/', 'info@aade.gr', 'https://www.aade.gr', 'Independent Authority for Public Revenue — Port of Piraeus, Piraeus, Greece'],
  HN: ['Port of Puerto Cortés', 'https://www.enp.hn/', 'info@enp.hn', 'https://x.com/ENP_Honduras', 'https://www.instagram.com/enp_honduras/', 'https://www.linkedin.com/company/empresa-nacional-portuaria/', 'aduana@aduana.gob.hn', 'https://www.aduana.gob.hn', 'Administración Aduanera — Puerto Cortés, Puerto Cortés, Honduras'],
  HU: ['Port of Rijeka (primary maritime gateway; landlocked)', 'https://www.lukarijeka.hr/', 'info@lukarijeka.hr', 'https://x.com/PortRijeka', 'https://www.instagram.com/portrijeka/', 'https://www.linkedin.com/company/port-of-rijeka-authority/', 'vaminfo@nav.gov.hu', 'https://nav.gov.hu', 'National Tax and Customs Administration — Budapest, Hungary'],
  IR: ['Port of Bandar Abbas (Shahid Rajaee)', 'https://www.pmo.ir/', 'info@pmo.ir', 'https://x.com/PortsMaritimeIR', 'https://www.instagram.com/pmo_ir/', 'https://www.linkedin.com/company/ports-and-maritime-organization/', 'customs@irica.gov.ir', 'https://www.irica.gov.ir', 'Iran Customs — Shahid Rajaee Port, Bandar Abbas, Iran'],
  IT: ['Port of Genoa', 'https://www.portsofgenoa.com/', 'info@portsofgenoa.com', 'https://x.com/PortofGenoa', 'https://www.instagram.com/portofgenoa/', 'https://www.linkedin.com/company/western-ligurian-sea-port-authority/', 'dogane@dogane.gov.it', 'https://www.adm.gov.it', 'Agenzia delle Dogane — Porto di Genova, Genoa, Italy'],
  KZ: ['Port of Aktau', 'https://www.seaportaktau.kz/', 'info@seaportaktau.kz', 'https://x.com/AktauPort', 'https://www.instagram.com/aktauport/', 'https://www.linkedin.com/company/aktau-seaport/', 'customs@kgd.gov.kz', 'https://www.gov.kz/memleket/entities/kgd', 'Committee of State Revenue — Port of Aktau, Aktau, Kazakhstan'],
  KI: ['Port of Betio (Tarawa)', 'https://www.mic.gov.ki/', 'info@mic.gov.ki', 'https://x.com/KiribatiPorts', 'https://www.instagram.com/kiribatiports/', 'https://www.linkedin.com/company/kiribati-ports/', 'customs@mfed.gov.ki', 'https://www.mfed.gov.ki', 'Kiribati Customs — Port of Betio, Tarawa, Kiribati'],
  KG: ['Port of Bandar Abbas (primary maritime gateway; landlocked)', 'https://www.pmo.ir/', 'info@pmo.ir', 'https://x.com/PortsMaritimeIR', 'https://www.instagram.com/pmo_ir/', 'https://www.linkedin.com/company/ports-and-maritime-organization/', 'customs@customs.gov.kg', 'https://www.customs.gov.kg', 'State Customs Service — Bishkek, Kyrgyzstan'],
  KN: ['Port of Basseterre', 'https://www.stkittsnevisports.com/', 'info@stkittsnevisports.com', 'https://x.com/StKittsPorts', 'https://www.instagram.com/stkittsports/', 'https://www.linkedin.com/company/st-kitts-nevis-ports/', 'customs@customs.gov.kn', 'https://www.customs.gov.kn', 'St. Kitts and Nevis Customs — Port of Basseterre, Basseterre, Saint Kitts and Nevis'],
  LC: ['Port of Castries', 'https://www.sluciaports.com/', 'info@sluciaports.com', 'https://x.com/StLuciaPorts', 'https://www.instagram.com/stluciaports/', 'https://www.linkedin.com/company/saint-lucia-ports-authority/', 'customs@customs.gov.lc', 'https://www.customs.gov.lc', 'Saint Lucia Customs — Port of Castries, Castries, Saint Lucia'],
  VC: ['Port of Kingstown', 'https://www.svgports.com/', 'info@svgports.com', 'https://x.com/SVGPorts', 'https://www.instagram.com/svgports/', 'https://www.linkedin.com/company/saint-vincent-ports/', 'customs@customs.gov.vc', 'https://www.customs.gov.vc', 'Saint Vincent and the Grenadines Customs — Port of Kingstown, Kingstown, Saint Vincent and the Grenadines'],
  LV: ['Port of Riga', 'https://www.rop.lv/', 'info@rop.lv', 'https://x.com/FreeportRiga', 'https://www.instagram.com/freeportriga/', 'https://www.linkedin.com/company/freeport-of-riga/', 'info@vid.gov.lv', 'https://www.vid.gov.lv', 'State Revenue Service — Port of Riga, Riga, Latvia'],
  LT: ['Port of Klaipėda', 'https://www.portofklaipeda.lt/', 'info@portofklaipeda.lt', 'https://x.com/PortKlaipeda', 'https://www.instagram.com/portklaipeda/', 'https://www.linkedin.com/company/klaipeda-state-seaport-authority/', 'muitine@muitine.lt', 'https://www.lrmuitine.lt', 'Lithuanian Customs — Port of Klaipėda, Klaipėda, Lithuania'],
  LU: ['Port of Antwerp-Bruges (primary maritime gateway; landlocked)', 'https://www.portofantwerpbruges.com/', 'info@portofantwerpbruges.com', 'https://x.com/PortofAntwerp', 'https://www.instagram.com/portofantwerpbruges/', 'https://www.linkedin.com/company/port-of-antwerp-bruges/', 'douanes@do.etat.lu', 'https://www.do.etat.lu', 'Administration des Douanes — Luxembourg City, Luxembourg'],
  MV: ['Port of Malé', 'https://www.mpa.gov.mv/', 'info@mpa.gov.mv', 'https://x.com/MPA_Maldives', 'https://www.instagram.com/mpa_maldives/', 'https://www.linkedin.com/company/maldives-ports-limited/', 'customs@customs.gov.mv', 'https://www.customs.gov.mv', 'Maldives Customs Service — Port of Malé, Malé, Maldives'],
  MU: ['Port Louis', 'https://www.mpa.mu/', 'info@mpa.mu', 'https://x.com/MPA_Mauritius', 'https://www.instagram.com/mpa_mauritius/', 'https://www.linkedin.com/company/mauritius-ports-authority/', 'customs@mra.mu', 'https://www.mra.mu', 'Mauritius Revenue Authority — Customs, Port Louis, Mauritius'],
  FM: ['Port of Micronesia (Pohnpei)', 'https://www.fsmgov.org/', 'info@fsmgov.org', '', '', 'https://www.linkedin.com/company/federated-states-of-micronesia/', 'customs@fsmgov.org', 'https://www.fsmgov.org', 'FSM Customs — Kolonia, Pohnpei, Micronesia'],
  MD: ['Port of Giurgiulești', 'https://www.portgiurgiulesti.md/', 'info@portgiurgiulesti.md', 'https://x.com/PortGiurgiulesti', 'https://www.instagram.com/portgiurgiulesti/', 'https://www.linkedin.com/company/port-giurgiulesti/', 'customs@customs.gov.md', 'https://www.customs.gov.md', 'Customs Service — Port of Giurgiulești, Giurgiulești, Moldova'],
  MN: ['Port of Tianjin (primary maritime gateway; landlocked)', 'https://www.ptacn.com/', 'info@ptacn.com', 'https://x.com/TianjinPort', 'https://www.instagram.com/tianjinport/', 'https://www.linkedin.com/company/tianjin-port/', 'customs@customs.gov.mn', 'https://www.customs.gov.mn', 'Mongolian Customs — Ulaanbaatar, Mongolia'],
  ME: ['Port of Bar', 'https://www.portofbar.me/', 'info@portofbar.me', 'https://x.com/PortofBar', 'https://www.instagram.com/portofbar/', 'https://www.linkedin.com/company/port-of-bar/', 'carina@uino.gov.me', 'https://www.gov.me/en/customs', 'Customs Administration — Port of Bar, Bar, Montenegro'],
  NP: ['Port of Kolkata (primary maritime gateway; landlocked)', 'https://www.kolkataport.gov.in/', 'info@kolkataport.gov.in', 'https://x.com/KolkataPort', 'https://www.instagram.com/kolkata_port/', 'https://www.linkedin.com/company/kolkata-port-trust/', 'customs@customs.gov.np', 'https://www.customs.gov.np', 'Department of Customs — Kathmandu, Nepal'],
  NI: ['Port of Corinto', 'https://www.epn.com.ni/', 'info@epn.com.ni', 'https://x.com/EPN_Nicaragua', 'https://www.instagram.com/epn_nicaragua/', 'https://www.linkedin.com/company/empresa-portuaria-nacional/', 'aduana@dga.gob.ni', 'https://www.dga.gob.ni', 'DGA Aduanas — Puerto Corinto, Corinto, Nicaragua'],
  NU: ['Port of Alofi', 'https://www.niueports.nu/', 'info@niueports.nu', '', '', 'https://www.linkedin.com/company/niue-ports/', 'customs@niue.gov.nu', 'https://www.niue.gov.nu', 'Niue Customs — Port of Alofi, Alofi, Niue'],
  MK: ['Port of Thessaloniki (primary maritime gateway; landlocked)', 'https://www.thpa.gr/', 'info@thpa.gr', 'https://x.com/ThessalonikiPort', 'https://www.instagram.com/thessalonikiport/', 'https://www.linkedin.com/company/thessaloniki-port-authority/', 'customs@customs.gov.mk', 'https://www.customs.gov.mk', 'Customs Administration — Skopje, North Macedonia'],
  PK: ['Port of Karachi', 'https://www.kpt.gov.pk/', 'info@kpt.gov.pk', 'https://x.com/KarachiPort', 'https://www.instagram.com/karachiport/', 'https://www.linkedin.com/company/karachi-port-trust/', 'customs@customs.gov.pk', 'https://www.fbr.gov.pk', 'Pakistan Customs — Port of Karachi, Karachi, Pakistan'],
  PA: ['Port of Balboa (Panama Canal)', 'https://www.pancanal.com/', 'info@pancanal.com', 'https://x.com/thepanamacanal', 'https://www.instagram.com/panamacanal/', 'https://www.linkedin.com/company/panama-canal-authority/', 'aduana@ana.gob.pa', 'https://www.ana.gob.pa', 'National Customs Authority — Port of Balboa, Panama City, Panama'],
  PL: ['Port of Gdańsk', 'https://www.portgdansk.pl/', 'info@portgdansk.pl', 'https://x.com/PortGdansk', 'https://www.instagram.com/portgdansk/', 'https://www.linkedin.com/company/port-of-gdansk/', 'info@mf.gov.pl', 'https://www.gov.pl/web/kas', 'National Revenue Administration — Port of Gdańsk, Gdańsk, Poland'],
  PT: ['Port of Sines', 'https://www.portodesines.pt/', 'info@portodesines.pt', 'https://x.com/PortodeSines', 'https://www.instagram.com/portodesines/', 'https://www.linkedin.com/company/porto-de-sines/', 'aduaneira@at.gov.pt', 'https://www.portaldasfinancas.gov.pt', 'Autoridade Tributária — Port of Sines, Sines, Portugal'],
  RO: ['Port of Constanța', 'https://www.portofconstantza.com/', 'info@portofconstantza.com', 'https://x.com/PortConstanta', 'https://www.instagram.com/portofconstantza/', 'https://www.linkedin.com/company/maritime-ports-administration-constantza/', 'customs@customs.ro', 'https://www.customs.ro', 'Romanian Customs — Port of Constanța, Constanța, Romania'],
  RS: ['Port of Bar', 'https://www.portofbar.rs/', 'info@portofbar.rs', 'https://x.com/PortofBarRS', 'https://www.instagram.com/portofbar/', 'https://www.linkedin.com/company/port-of-bar-serbia/', 'carina@uino.gov.rs', 'https://www.carina.rs', 'Serbian Customs — Port of Bar, Bar, Serbia'],
  SK: ['Port of Bratislava (Danube)', 'https://www.spap.sk/', 'info@spap.sk', 'https://x.com/SPAP_Bratislava', 'https://www.instagram.com/spap_bratislava/', 'https://www.linkedin.com/company/slovak-shipping-and-ports/', 'celny@financnasprava.sk', 'https://www.financnasprava.sk', 'Financial Administration — Port of Bratislava, Bratislava, Slovakia'],
  SI: ['Port of Koper', 'https://www.luka-kp.si/', 'info@luka-kp.si', 'https://x.com/PortKoper', 'https://www.instagram.com/portkoper/', 'https://www.linkedin.com/company/luka-koper/', 'carina@carina.gov.si', 'https://www.carina.gov.si', 'Financial Administration — Port of Koper, Koper, Slovenia'],
  SB: ['Port of Honiara', 'https://www.sipa.com.sb/', 'info@sipa.com.sb', 'https://x.com/SolomonPorts', 'https://www.instagram.com/solomonports/', 'https://www.linkedin.com/company/solomon-ports/', 'customs@customs.gov.sb', 'https://www.customs.gov.sb', 'Solomon Islands Customs — Port of Honiara, Honiara, Solomon Islands'],
  WS: ['Port of Apia', 'https://www.samoaports.ws/', 'info@samoaports.ws', 'https://x.com/SamoaPorts', 'https://www.instagram.com/samoaports/', 'https://www.linkedin.com/company/samoa-ports-authority/', 'customs@revenue.gov.ws', 'https://www.revenue.gov.ws', 'Samoa Revenue Authority Customs — Port of Apia, Apia, Samoa'],
  LK: ['Port of Colombo', 'https://www.slpa.lk/', 'info@slpa.lk', 'https://x.com/SLPA_LK', 'https://www.instagram.com/slpa_lk/', 'https://www.linkedin.com/company/sri-lanka-ports-authority/', 'customs@gov.lk', 'https://www.customs.gov.lk', 'Sri Lanka Customs — Port of Colombo, Colombo, Sri Lanka'],
  SR: ['Port of Paramaribo (Nieuwe Haven)', 'https://www.havenbeheer.sr/', 'info@havenbeheer.sr', 'https://x.com/SurinamePorts', 'https://www.instagram.com/surinameports/', 'https://www.linkedin.com/company/suriname-ports/', 'customs@customs.gov.sr', 'https://www.customs.gov.sr', 'Suriname Customs — Nieuwe Haven, Paramaribo, Suriname'],
  TJ: ['Port of Bandar Abbas (primary maritime gateway; landlocked)', 'https://www.pmo.ir/', 'info@pmo.ir', 'https://x.com/PortsMaritimeIR', 'https://www.instagram.com/pmo_ir/', 'https://www.linkedin.com/company/ports-and-maritime-organization/', 'customs@customs.tj', 'https://www.customs.tj', 'Customs Service — Dushanbe, Tajikistan'],
  TO: ['Port of Nuku\'alofa', 'https://www.tongaports.to/', 'info@tongaports.to', 'https://x.com/TongaPorts', 'https://www.instagram.com/tongaports/', 'https://www.linkedin.com/company/tonga-ports-authority/', 'customs@customs.gov.to', 'https://www.customs.gov.to', 'Tonga Customs — Port of Nuku\'alofa, Nuku\'alofa, Tonga'],
  TT: ['Port of Port of Spain', 'https://www.patnt.com/', 'info@patnt.com', 'https://x.com/PATNT', 'https://www.instagram.com/patnt/', 'https://www.linkedin.com/company/port-authority-of-trinidad-and-tobago/', 'customs@customs.gov.tt', 'https://www.customs.gov.tt', 'Trinidad and Tobago Customs — Port of Spain, Port of Spain, Trinidad and Tobago'],
  TR: ['Port of Mersin', 'https://www.mersinport.com.tr/', 'info@mersinport.com.tr', 'https://x.com/MersinPort', 'https://www.instagram.com/mersinport/', 'https://www.linkedin.com/company/mersin-international-port/', 'gumruk@gumruk.gov.tr', 'https://www.gumruk.gov.tr', 'Turkish Customs — Port of Mersin, Mersin, Turkey'],
  TM: ['Port of Turkmenbashi', 'https://www.turkmenbashiseaport.gov.tm/', 'info@turkmenbashiseaport.gov.tm', 'https://x.com/TurkmenbashiPort', 'https://www.instagram.com/turkmenbashiport/', 'https://www.linkedin.com/company/turkmenbashi-international-seaport/', 'customs@customs.gov.tm', 'https://www.customs.gov.tm', 'State Customs Service — Port of Turkmenbashi, Turkmenbashi, Turkmenistan'],
  TV: ['Port of Funafuti', 'https://www.tuvaluports.tv/', 'info@tuvaluports.tv', '', '', 'https://www.linkedin.com/company/tuvalu-ports/', 'customs@customs.gov.tv', 'https://www.customs.gov.tv', 'Tuvalu Customs — Port of Funafuti, Funafuti, Tuvalu'],
  UA: ['Port of Odesa', 'https://www.uspa.gov.ua/', 'info@uspa.gov.ua', 'https://x.com/USPA_Ukraine', 'https://www.instagram.com/uspa_ukraine/', 'https://www.linkedin.com/company/ukraine-sea-ports-authority/', 'customs@customs.gov.ua', 'https://www.customs.gov.ua', 'State Customs Service — Port of Odesa, Odesa, Ukraine'],
  UY: ['Port of Montevideo', 'https://www.anp.com.uy/', 'info@anp.com.uy', 'https://x.com/ANP_Uruguay', 'https://www.instagram.com/anp_uruguay/', 'https://www.linkedin.com/company/administracion-nacional-de-puertos/', 'aduana@aduana.gub.uy', 'https://www.aduana.gub.uy', 'Dirección Nacional de Aduanas — Puerto de Montevideo, Montevideo, Uruguay'],
  UZ: ['Port of Bandar Abbas (primary maritime gateway; landlocked)', 'https://www.pmo.ir/', 'info@pmo.ir', 'https://x.com/PortsMaritimeIR', 'https://www.instagram.com/pmo_ir/', 'https://www.linkedin.com/company/ports-and-maritime-organization/', 'customs@customs.uz', 'https://www.customs.uz', 'State Customs Committee — Tashkent, Uzbekistan'],
  VU: ['Port Vila', 'https://www.vanuatuports.vu/', 'info@vanuatuports.vu', 'https://x.com/VanuatuPorts', 'https://www.instagram.com/vanuatuports/', 'https://www.linkedin.com/company/vanuatu-ports/', 'customs@customs.gov.vu', 'https://www.customs.gov.vu', 'Vanuatu Customs — Port Vila, Port Vila, Vanuatu'],
  VE: ['Port of La Guaira', 'https://www.bolipuertos.gob.ve/', 'info@bolipuertos.gob.ve', 'https://x.com/Bolipuertos', 'https://www.instagram.com/bolipuertos/', 'https://www.linkedin.com/company/bolipuertos/', 'aduana@sencamer.gob.ve', 'https://www.seniat.gob.ve', 'SENIAT Aduanas — Puerto de La Guaira, La Guaira, Venezuela'],
  NR: ['Port of Nauru (Aiwo)', 'https://www.nauruports.nr/', 'info@nauruports.nr', '', '', 'https://www.linkedin.com/company/nauru-ports/', 'customs@customs.gov.nr', 'https://www.customs.gov.nr', 'Nauru Customs — Aiwo District, Nauru'],
  BF: ['Port of Lomé (primary maritime gateway; landlocked)', 'https://www.portdelome.tg/', 'contact@portdelome.tg', 'https://x.com/PortLome', 'https://www.instagram.com/portdelome/', 'https://www.linkedin.com/company/port-autonome-de-lome/', 'douanes@finances.gov.bf', 'https://www.douanes.gov.bf', 'Direction Générale des Douanes, Ouagadougou, Burkina Faso'],
  ML: ['Port of Dakar (primary maritime gateway; landlocked)', 'https://www.portdedakar.sn/', 'contact@portdedakar.sn', 'https://x.com/PortDakar', 'https://www.instagram.com/portdedakar/', 'https://www.linkedin.com/company/port-autonome-de-dakar/', 'douanes@finances.ml', 'https://www.douanes.ml', 'Direction Générale des Douanes — Bamako, Mali'],
  NE: ['Port of Cotonou (primary maritime gateway; landlocked)', 'https://www.portdecotonou.com/', 'contact@portdecotonou.com', 'https://x.com/PortCotonou', 'https://www.instagram.com/portcotonou/', 'https://www.linkedin.com/company/port-autonome-de-cotonou/', 'douanes@finances.ne', 'https://www.douanes.ne', 'Direction Générale des Douanes — Niamey, Niger'],
  SZ: ['Port of Durban (primary maritime gateway; landlocked)', 'https://www.transnetnationalportsauthority.net/', 'info@tnpa.co.za', 'https://x.com/TNPA_Official', 'https://www.instagram.com/tnpa_official/', 'https://www.linkedin.com/company/transnet-national-ports-authority/', 'info@sra.org.sz', 'https://www.sra.org.sz', 'Eswatini Revenue Service — Mbabane, Eswatini'],
  GE: ['Port of Poti', 'https://www.potiport.com/', 'info@potiport.com', 'https://x.com/PotiPort', 'https://www.instagram.com/potiport/', 'https://www.linkedin.com/company/poti-port/', 'customs@customs.gov.ge', 'https://www.customs.gov.ge', 'Revenue Service of Georgia — Port of Poti, Poti, Georgia'],
  MT: ['Port of Marsaxlokk (Malta Freeport)', 'https://www.maltafreeport.com/', 'info@maltafreeport.com', 'https://x.com/MaltaFreeport', 'https://www.instagram.com/maltafreeport/', 'https://www.linkedin.com/company/malta-freeport/', 'customs@gov.mt', 'https://cfr.gov.mt', 'Malta Customs — Malta Freeport, Marsaxlokk, Malta'],
  JM: ['Port of Kingston', 'https://www.portjam.com/', 'info@portjam.com', 'https://x.com/PortAuthorityJM', 'https://www.instagram.com/portauthorityjm/', 'https://www.linkedin.com/company/port-authority-of-jamaica/', 'customs@jacustoms.gov.jm', 'https://www.jacustoms.gov.jm', 'Jamaica Customs Agency — Port of Kingston, Kingston, Jamaica'],
  IN: ['Jawaharlal Nehru Port (Nhava Sheva)', 'https://www.jnport.gov.in/', 'info@jnport.gov.in', 'https://x.com/JNPort', 'https://www.instagram.com/jnport/', 'https://www.linkedin.com/company/jawaharlal-nehru-port-trust/', 'customs@cbic.gov.in', 'https://www.cbic.gov.in', 'Indian Customs — Jawaharlal Nehru Port, Navi Mumbai, India'],
  HT: ['Port of Port-au-Prince', 'https://www.apn.gou.ht/', 'info@apn.gou.ht', 'https://x.com/APN_Haiti', 'https://www.instagram.com/apn_haiti/', 'https://www.linkedin.com/company/autorite-portuaire-nationale/', 'douanes@douanes.gou.ht', 'https://www.douanes.gou.ht', 'Agence Nationale des Douanes — Port de Port-au-Prince, Port-au-Prince, Haiti'],
  MS: ['Port of Little Bay', 'https://www.gov.ms/port/', 'info@gov.ms', '', '', 'https://www.linkedin.com/company/montserrat-ports/', 'customs@gov.ms', 'https://www.gov.ms/customs', 'Montserrat Customs — Port of Little Bay, Little Bay, Montserrat'],
  AI: ['Port of Road Bay', 'https://www.gov.ai/ports/', 'info@gov.ai', '', '', 'https://www.linkedin.com/company/anguilla-ports/', 'customs@gov.ai', 'https://www.gov.ai/customs', 'Anguilla Customs — Road Bay, The Valley, Anguilla'],
  BM: ['Port of Hamilton', 'https://www.bermudaports.com/', 'info@bermudaports.com', 'https://x.com/BermudaPorts', 'https://www.instagram.com/bermudaports/', 'https://www.linkedin.com/company/bermuda-ports/', 'customs@customs.gov.bm', 'https://www.customs.gov.bm', 'Bermuda Customs — Port of Hamilton, Hamilton, Bermuda'],
  VG: ['Port Purcell (Road Town)', 'https://www.bviports.org/', 'info@bviports.org', 'https://x.com/BVIPorts', 'https://www.instagram.com/bviports/', 'https://www.linkedin.com/company/bvi-ports-authority/', 'customs@bvi.gov.vg', 'https://www.bvi.gov.vg/customs', 'British Virgin Islands Customs — Port Purcell, Road Town, Tortola'],
  KY: ['Port of Georgetown (Grand Cayman)', 'https://www.ports.ky/', 'info@ports.ky', 'https://x.com/CaymanPorts', 'https://www.instagram.com/caymanports/', 'https://www.linkedin.com/company/cayman-islands-port-authority/', 'customs@gov.ky', 'https://www.customs.gov.ky', 'Cayman Islands Customs — Port of Georgetown, Grand Cayman'],
  TC: ['Port of Grand Turk', 'https://www.turksandcaicosports.tc/', 'info@turksandcaicosports.tc', 'https://x.com/TCPorts', 'https://www.instagram.com/tcports/', 'https://www.linkedin.com/company/turks-and-caicos-ports/', 'customs@gov.tc', 'https://www.gov.tc/customs', 'Turks and Caicos Customs — Port of Grand Turk, Grand Turk'],
  BE: ['Port of Antwerp-Bruges', 'https://www.portofantwerpbruges.com/', 'info@portofantwerpbruges.com', 'https://x.com/PortofAntwerp', 'https://www.instagram.com/portofantwerpbruges/', 'https://www.linkedin.com/company/port-of-antwerp-bruges/', 'douanes@minfin.fed.be', 'https://finances.belgium.be/fr/douanes_accises', 'Belgian Customs — Port of Antwerp, Antwerp, Belgium'],
  DK: ['Port of Aarhus', 'https://www.aarhushavn.dk/', 'info@aarhushavn.dk', 'https://x.com/AarhusHavn', 'https://www.instagram.com/aarhushavn/', 'https://www.linkedin.com/company/port-of-aarhus/', 'told@skat.dk', 'https://www.skat.dk', 'Danish Customs — Port of Aarhus, Aarhus, Denmark'],
  DE: ['Port of Hamburg', 'https://www.hafen-hamburg.de/', 'info@hafen-hamburg.de', 'https://x.com/hafenhamburg', 'https://www.instagram.com/hafenhamburg/', 'https://www.linkedin.com/company/hamburg-port-authority/', 'info@zoll.de', 'https://www.zoll.de', 'German Customs — Port of Hamburg, Hamburg, Germany'],
  ES: ['Port of Algeciras', 'https://www.puertoalgeciras.com/', 'info@puertoalgeciras.com', 'https://x.com/PuertoAlgeciras', 'https://www.instagram.com/puertoalgeciras/', 'https://www.linkedin.com/company/autoridad-portuaria-bahia-de-algeciras/', 'aduana@aeat.es', 'https://www.agenciatributaria.es', 'Spanish Customs — Port of Algeciras, Algeciras, Spain'],
  FI: ['Port of HaminaKotka', 'https://www.portofhamina.fi/', 'info@portofhamina.fi', 'https://x.com/PortOfHamina', 'https://www.instagram.com/portofhamina/', 'https://www.linkedin.com/company/port-of-hamina-kotka/', 'tulli@tulli.fi', 'https://www.tulli.fi', 'Finnish Customs — Port of HaminaKotka, Hamina, Finland'],
  FR: ['Port of Le Havre', 'https://www.havre-port.fr/', 'info@havre-port.fr', 'https://x.com/HavrePort', 'https://www.instagram.com/havreport/', 'https://www.linkedin.com/company/grand-port-maritime-du-havre/', 'douane@douane.gouv.fr', 'https://www.douane.gouv.fr', 'French Customs — Port of Le Havre, Le Havre, France'],
  IE: ['Port of Dublin', 'https://www.dublinport.ie/', 'info@dublinport.ie', 'https://x.com/DublinPort', 'https://www.instagram.com/dublinport/', 'https://www.linkedin.com/company/dublin-port-company/', 'revenue@revenue.ie', 'https://www.revenue.ie', 'Revenue Commissioners Customs — Port of Dublin, Dublin, Ireland'],
  NL: ['Port of Rotterdam', 'https://www.portofrotterdam.com/', 'info@portofrotterdam.com', 'https://x.com/PortOfRotterdam', 'https://www.instagram.com/portofrotterdam/', 'https://www.linkedin.com/company/port-of-rotterdam/', 'douane@belastingdienst.nl', 'https://www.belastingdienst.nl', 'Dutch Customs — Port of Rotterdam, Rotterdam, Netherlands'],
  SE: ['Port of Gothenburg', 'https://www.goteborgshamn.se/', 'info@goteborgshamn.se', 'https://x.com/Goteborgshamn', 'https://www.instagram.com/goteborgshamn/', 'https://www.linkedin.com/company/port-of-gothenburg/', 'tullverket@tullverket.se', 'https://www.tullverket.se', 'Swedish Customs — Port of Gothenburg, Gothenburg, Sweden'],
  IS: ['Port of Reykjavík (Sundahöfn)', 'https://www.portofreykjavik.is/', 'info@portofreykjavik.is', 'https://x.com/PortReykjavik', 'https://www.instagram.com/portofreykjavik/', 'https://www.linkedin.com/company/port-of-reykjavik/', 'tollur@tollur.is', 'https://www.tollur.is', 'Icelandic Customs — Sundahöfn, Reykjavík, Iceland'],
  NO: ['Port of Oslo', 'https://www.oslohavn.no/', 'info@oslohavn.no', 'https://x.com/OsloHavn', 'https://www.instagram.com/oslohavn/', 'https://www.linkedin.com/company/port-of-oslo/', 'toll.no@toll.no', 'https://www.toll.no', 'Norwegian Customs — Port of Oslo, Oslo, Norway'],
  CH: ['Port of Basel (Rhine; primary maritime gateway; landlocked)', 'https://www.baslerhafen.ch/', 'info@baslerhafen.ch', 'https://x.com/BaslerHafen', 'https://www.instagram.com/baslerhafen/', 'https://www.linkedin.com/company/basler-rheinhafen/', 'info@ezv.admin.ch', 'https://www.bazg.admin.ch', 'Federal Office for Customs and Border Security — Port of Basel, Basel, Switzerland'],
}

const existingSources = [
  'africanUnion/mainInternationalSeaportsByIso.ts',
  'APEC/mainInternationalSeaportsByIso.ts',
  'arabLeague/mainInternationalSeaportsByIso.ts',
  'ASEAN/mainInternationalSeaportsByIso.ts',
  'AMU/mainInternationalSeaportsByIso.ts',
  'allianceOfSahelStates/mainInternationalSeaportsByIso.ts',
  'beltAndRoadInitiative/mainInternationalSeaportsByIso.ts',
  'BRICS/mainInternationalSeaportsByIso.ts',
  'britishCommonwealth/mainInternationalSeaportsByIso.ts',
  'CARICOM/mainInternationalSeaportsByIso.ts',
  'CEN-SAD/mainInternationalSeaportsByIso.ts',
  'COMESA/mainInternationalSeaportsByIso.ts',
  'CPTPP/mainInternationalSeaportsByIso.ts',
  'EAC/mainInternationalSeaportsByIso.ts',
  'EU/mainInternationalSeaportsByIso.ts',
  'fiveEyes/mainInternationalSeaportsByIso.ts',
  'G7/mainInternationalSeaportsByIso.ts',
  'G20/mainInternationalSeaportsByIso.ts',
  'GCC/mainInternationalSeaportsByIso.ts',
  'IGAD/mainInternationalSeaportsByIso.ts',
  'IORA/mainInternationalSeaportsByIso.ts',
  'MIKTA/mainInternationalSeaportsByIso.ts',
  'MINT/mainInternationalSeaportsByIso.ts',
  'NATO/mainInternationalSeaportsByIso.ts',
]

const entries = mergeEntries(...existingSources.map((f) => parseSeaportsFromFile(path.join(ROOT, f))), supplemental)

const alliances = [
  { dir: 'beltAndRoadInitiative', isoFile: 'participantStatesIsoCodes.ts', isoConst: 'BELT_AND_ROAD_PARTICIPANT_ISO_CODES', constName: 'BRI_MAIN_INTERNATIONAL_SEAPORTS', isoType: 'BriMemberIsoCode', isoImport: 'participantStatesIsoCodes', prefix: 'BRI', skip: ['participantStatesIsoCodes.ts'], comment: 'Belt and Road participant economy' },
  { dir: 'BRICS', isoFile: 'bricsMemberIsoCodes.ts', isoConst: 'BRICS_MEMBER_ISO_CODES', constName: 'BRICS_MAIN_INTERNATIONAL_SEAPORTS', isoType: 'BricsMemberIsoCode', isoImport: 'bricsMemberIsoCodes', prefix: 'BRICS', skip: ['bricsMemberIsoCodes.ts'], comment: 'BRICS founding member' },
  { dir: 'britishCommonwealth', isoFile: 'commonwealthMemberIsoCodes.ts', isoConst: 'COMMONWEALTH_MEMBER_ISO_CODES', constName: 'COMMONWEALTH_MAIN_INTERNATIONAL_SEAPORTS', isoType: 'CommonwealthMemberIsoCode', isoImport: 'commonwealthMemberIsoCodes', prefix: 'COMMONWEALTH', skip: ['commonwealthMemberIsoCodes.ts'], comment: 'Commonwealth member state' },
  { dir: 'CARICOM', isoFile: 'caricomMemberIsoCodes.ts', isoConst: 'CARICOM_MEMBER_ISO_CODES', constName: 'CARICOM_MAIN_INTERNATIONAL_SEAPORTS', isoType: 'CaricomMemberIsoCode', isoImport: 'caricomMemberIsoCodes', prefix: 'CARICOM', skip: ['caricomMemberIsoCodes.ts'], comment: 'CARICOM member state' },
  { dir: 'CEN-SAD', isoFile: 'censadMemberIsoCodes.ts', isoConst: 'CENSAD_MEMBER_ISO_CODES', constName: 'CENSAD_MAIN_INTERNATIONAL_SEAPORTS', isoType: 'CensadMemberIsoCode', isoImport: 'censadMemberIsoCodes', prefix: 'CENSAD', skip: ['censadMemberIsoCodes.ts'], comment: 'CEN-SAD member state' },
  { dir: 'COMESA', isoFile: 'comesaMemberIsoCodes.ts', isoConst: 'COMESA_MEMBER_ISO_CODES', constName: 'COMESA_MAIN_INTERNATIONAL_SEAPORTS', isoType: 'ComesaMemberIsoCode', isoImport: 'comesaMemberIsoCodes', prefix: 'COMESA', skip: ['comesaMemberIsoCodes.ts'], comment: 'COMESA member state' },
  { dir: 'CPTPP', isoFile: 'cptppMemberIsoCodes.ts', isoConst: 'CPTPP_MEMBER_ISO_CODES', constName: 'CPTPP_MAIN_INTERNATIONAL_SEAPORTS', isoType: 'CptppMemberIsoCode', isoImport: 'cptppMemberIsoCodes', prefix: 'CPTPP', skip: ['cptppMemberIsoCodes.ts'], comment: 'CPTPP party' },
  { dir: 'EAC', isoFile: 'eacMemberIsoCodes.ts', isoConst: 'EAC_MEMBER_ISO_CODES', constName: 'EAC_MAIN_INTERNATIONAL_SEAPORTS', isoType: 'EacMemberIsoCode', isoImport: 'eacMemberIsoCodes', prefix: 'EAC', skip: ['eacMemberIsoCodes.ts'], comment: 'EAC partner state' },
  { dir: 'ECCAS', isoFile: 'eccasMemberIsoCodes.ts', isoConst: 'ECCAS_MEMBER_ISO_CODES', constName: 'ECCAS_MAIN_INTERNATIONAL_SEAPORTS', isoType: 'EccasMemberIsoCode', isoImport: 'eccasMemberIsoCodes', prefix: 'ECCAS', skip: ['eccasMemberIsoCodes.ts'], comment: 'ECCAS partner state' },
  { dir: 'ECOWAS', isoFile: 'ecowasMemberIsoCodes.ts', isoConst: 'ECOWAS_MEMBER_ISO_CODES', constName: 'ECOWAS_MAIN_INTERNATIONAL_SEAPORTS', isoType: 'EcowasMemberIsoCode', isoImport: 'ecowasMemberIsoCodes', prefix: 'ECOWAS', skip: ['ecowasMemberIsoCodes.ts'], comment: 'ECOWAS member state' },
  { dir: 'EU', isoFile: 'euMemberIsoCodes.ts', isoConst: 'EU_MEMBER_ISO_CODES', constName: 'EU_MAIN_INTERNATIONAL_SEAPORTS', isoType: 'EuMemberIsoCode', isoImport: 'euMemberIsoCodes', prefix: 'EU', skip: ['euMemberIsoCodes.ts'], comment: 'EU member state' },
  { dir: 'fiveEyes', isoFile: 'fiveEyesMemberIsoCodes.ts', isoConst: 'FIVE_EYES_MEMBER_ISO_CODES', constName: 'FIVE_EYES_MAIN_INTERNATIONAL_SEAPORTS', isoType: 'FiveEyesMemberIsoCode', isoImport: 'fiveEyesMemberIsoCodes', prefix: 'FIVE_EYES', skip: ['fiveEyesMemberIsoCodes.ts'], comment: 'Five Eyes member' },
  { dir: 'G7', isoFile: 'g7MemberIsoCodes.ts', isoConst: 'G7_MEMBER_ISO_CODES', constName: 'G7_MAIN_INTERNATIONAL_SEAPORTS', isoType: 'G7MemberIsoCode', isoImport: 'g7MemberIsoCodes', prefix: 'G7', skip: ['g7MemberIsoCodes.ts'], comment: 'G7 member' },
  { dir: 'G20', isoFile: 'g20MemberIsoCodes.ts', isoConst: 'G20_SOVEREIGN_MEMBER_ISO_CODES', constName: 'G20_MAIN_INTERNATIONAL_SEAPORTS', isoType: 'G20SovereignMemberIsoCode', isoImport: 'g20MemberIsoCodes', prefix: 'G20', skip: ['g20MemberIsoCodes.ts', 'africanUnion.ts', 'europeanUnion.ts'], comment: 'G20 sovereign member' },
  { dir: 'GCC', isoFile: 'gccMemberIsoCodes.ts', isoConst: 'GCC_MEMBER_ISO_CODES', constName: 'GCC_MAIN_INTERNATIONAL_SEAPORTS', isoType: 'GccMemberIsoCode', isoImport: 'gccMemberIsoCodes', prefix: 'GCC', skip: ['gccMemberIsoCodes.ts'], comment: 'GCC member state' },
  { dir: 'IGAD', isoFile: 'igadMemberIsoCodes.ts', isoConst: 'IGAD_MEMBER_ISO_CODES', constName: 'IGAD_MAIN_INTERNATIONAL_SEAPORTS', isoType: 'IgadMemberIsoCode', isoImport: 'igadMemberIsoCodes', prefix: 'IGAD', skip: ['igadMemberIsoCodes.ts'], comment: 'IGAD member state' },
  { dir: 'IORA', isoFile: 'ioraMemberIsoCodes.ts', isoConst: 'IORA_MEMBER_ISO_CODES', constName: 'IORA_MAIN_INTERNATIONAL_SEAPORTS', isoType: 'IoraMemberIsoCode', isoImport: 'ioraMemberIsoCodes', prefix: 'IORA', skip: ['ioraMemberIsoCodes.ts'], comment: 'IORA member state' },
  { dir: 'MIKTA', isoFile: 'miktaMemberIsoCodes.ts', isoConst: 'MIKTA_MEMBER_ISO_CODES', constName: 'MIKTA_MAIN_INTERNATIONAL_SEAPORTS', isoType: 'MiktaMemberIsoCode', isoImport: 'miktaMemberIsoCodes', prefix: 'MIKTA', skip: ['miktaMemberIsoCodes.ts'], comment: 'MIKTA member' },
  { dir: 'MINT', isoFile: 'mintMemberIsoCodes.ts', isoConst: 'MINT_MEMBER_ISO_CODES', constName: 'MINT_MAIN_INTERNATIONAL_SEAPORTS', isoType: 'MintMemberIsoCode', isoImport: 'mintMemberIsoCodes', prefix: 'MINT', skip: ['mintMemberIsoCodes.ts'], comment: 'MINT member' },
  { dir: 'NATO', isoFile: 'natoMemberIsoCodes.ts', isoConst: 'NATO_MEMBER_ISO_CODES', constName: 'NATO_MAIN_INTERNATIONAL_SEAPORTS', isoType: 'NatoMemberIsoCode', isoImport: 'natoMemberIsoCodes', prefix: 'NATO', skip: ['natoMemberIsoCodes.ts'], comment: 'NATO Ally' },
  { dir: 'OECD', isoFile: 'oecdMemberIsoCodes.ts', isoConst: 'OECD_MEMBER_ISO_CODES', constName: 'OECD_MAIN_INTERNATIONAL_SEAPORTS', isoType: 'OecdMemberIsoCode', isoImport: 'oecdMemberIsoCodes', prefix: 'OECD', skip: ['oecdMemberIsoCodes.ts'], comment: 'OECD member economy' },
  { dir: 'OECS', isoFile: 'oecsMemberIsoCodes.ts', isoConst: 'OECS_MEMBER_ISO_CODES', constName: 'OECS_MAIN_INTERNATIONAL_SEAPORTS', isoType: 'OecsMemberIsoCode', isoImport: 'oecsMemberIsoCodes', prefix: 'OECS', skip: ['oecsMemberIsoCodes.ts'], comment: 'OECS member state' },
  { dir: 'OPEC', isoFile: 'opecMemberIsoCodes.ts', isoConst: 'OPEC_MEMBER_ISO_CODES', constName: 'OPEC_MAIN_INTERNATIONAL_SEAPORTS', isoType: 'OpecMemberIsoCode', isoImport: 'opecMemberIsoCodes', prefix: 'OPEC', skip: ['opecMemberIsoCodes.ts'], comment: 'OPEC member state' },
  { dir: 'RCEP', isoFile: 'rcepMemberIsoCodes.ts', isoConst: 'RCEP_MEMBER_ISO_CODES', constName: 'RCEP_MAIN_INTERNATIONAL_SEAPORTS', isoType: 'RcepMemberIsoCode', isoImport: 'rcepMemberIsoCodes', prefix: 'RCEP', skip: ['rcepMemberIsoCodes.ts'], comment: 'RCEP party' },
  { dir: 'SADC', isoFile: 'sadcMemberIsoCodes.ts', isoConst: 'SADC_MEMBER_ISO_CODES', constName: 'SADC_MAIN_INTERNATIONAL_SEAPORTS', isoType: 'SadcMemberIsoCode', isoImport: 'sadcMemberIsoCodes', prefix: 'SADC', skip: ['sadcMemberIsoCodes.ts'], comment: 'SADC member state' },
]

const skipFiles = (extra) => new Set(['index.ts', 'types.ts', 'mainInternationalSeaportsByIso.ts', ...extra])

for (const a of alliances) {
  const isoCodes = readIsoCodes(`${a.dir}/${a.isoFile}`, a.isoConst)
  for (const iso of isoCodes) {
    if (!entries[iso]) throw new Error(`Still missing entry for ${iso} (${a.dir})`)
  }
  writeSeaportsFile(a.dir, { isoCodes, constName: a.constName, isoType: a.isoType, isoImport: a.isoImport, comment: a.comment }, entries)
  wireCountries(a.dir, a.prefix, skipFiles(a.skip))
}

console.log('Done')
