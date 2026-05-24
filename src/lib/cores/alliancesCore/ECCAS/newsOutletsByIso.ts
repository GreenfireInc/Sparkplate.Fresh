import type { NewsOutlet } from './types'
import type { EccasMemberIsoCode } from './eccasMemberIsoCodes'

function n(
  name: string,
  website: string,
  email: string,
  instagram: string,
  twitter: string,
  apiEndpoint: string,
): NewsOutlet {
  return { name, website, email, instagram, twitter, apiEndpoint }
}

/**
 * Three major + four minor national news outlets per ECCAS economy (informational; verify).
 * 
 * ISOs absent from NEWS_OUTLETS use explicit placeholders (marked "not seeded ... verify"); add seed rows then rerun.
 */
export const ECCAS_NEWS_OUTLETS = {
  AO: {
    major: [
      n("ANGOP (Agência Angola Press)", "https://www.angop.ao", "info@angop.ao", "https://www.instagram.com/angop.ao/", "https://x.com/angopnews", ""),
      n("TPA (Televisão Pública de Angola)", "https://www.tpa.ao", "info@tpa.ao", "https://www.instagram.com/tpa.angola/", "https://x.com/tpaonline", ""),
      n("Jornal de Angola", "https://www.jornaldeangola.ao", "redacao@jornaldeangola.ao", "https://www.instagram.com/jornaldeangola/", "https://x.com/jornaldeangola", ""),
    ],
    minor: [
      n("O País", "https://opais.ao", "info@opais.ao", "https://www.instagram.com/opais.ao/", "https://x.com/opais", ""),
      n("Club-K", "https://club-k.net", "info@club-k.net", "https://www.instagram.com/clubknews/", "https://x.com/clubknews", ""),
      n("Novo Jornal", "https://novojornal.co.ao", "info@novojornal.co.ao", "https://www.instagram.com/novojornal.ao/", "https://x.com/novojornal", ""),
      n("Correio da Kianda", "https://correiokianda.info", "info@correiokianda.info", "https://www.instagram.com/correiokianda/", "https://x.com/correiokianda", ""),
    ],
  },
  BI: {
    major: [
      n("RTNB", "https://rtnb.bi", "", "", "https://x.com/RTNBurundi", ""),
      n("Iwacu", "https://iwacu-burundi.org", "", "https://instagram.com/iwacu_burundi", "https://x.com/iwacuinfo", ""),
      n("ABP", "https://abpinfos.com", "", "", "", ""),
    ],
    minor: [
      n("Yaga Burundi", "https://yaga-burundi.com", "", "https://instagram.com/yagaburundi", "", ""),
      n("Burundi Eco", "https://burundi-eco.com", "", "", "", ""),
      n("Net Press", "https://netpress.bi", "", "", "", ""),
      n("Bonesha FM", "https://bonesha.bi", "", "", "", ""),
    ],
  },
  CM: {
    major: [
      n("CRTV", "https://crtv.cm", "", "https://instagram.com/crtv.cm", "https://x.com/CRTV_web", ""),
      n("Cameroon Tribune", "https://cameroon-tribune.cm", "", "", "", ""),
      n("Journal du Cameroun", "https://journalducameroun.com", "", "", "https://x.com/jdca_news", ""),
    ],
    minor: [
      n("Camer.be", "https://camer.be", "", "", "", ""),
      n("Actu Cameroun", "https://actucameroun.com", "", "", "", ""),
      n("Koaci Cameroun", "https://koaci.com/cameroun", "", "", "", ""),
      n("Cameroun Web", "https://camerounweb.com", "", "", "", ""),
    ],
  },
  CF: {
    major: [
      n("Radio Ndeke Luka", "https://radiondekeluka.org", "", "", "https://x.com/RNdekeLuka", ""),
      n("RJDH", "https://rjdh.org", "", "", "", ""),
      n("ACAP", "https://acap.cf", "", "", "", ""),
    ],
    minor: [
      n("Corbeau News", "https://corbeaunews-centrafrique.org", "", "", "", ""),
      n("Centrafrique Presse", "https://centrafrique-presse.over-blog.com", "", "", "", ""),
      n("Medias Plus RCA", "https://mediasplusrca.com", "", "", "", ""),
      n("Le Confident", "https://leconfident.net", "", "", "", ""),
    ],
  },
  TD: {
    major: [
      n("Alwihda Info", "https://alwihdainfo.com", "", "", "https://x.com/alwihdainfo", ""),
      n("Tchad Infos", "https://tchadinfos.com", "", "", "", ""),
      n("ONAMA", "https://onama.td", "", "", "", ""),
    ],
    minor: [
      n("Journal du Tchad", "https://journaldutchad.com", "", "", "", ""),
      n("Le Visionnaire", "https://visionnaire.td", "", "", "", ""),
      n("Tchad One", "https://tchadone.com", "", "", "", ""),
      n("Toumaï Web Média", "https://toumaiwebmedias.com", "", "", "", ""),
    ],
  },
  CD: {
    major: [
      n("Radio Okapi", "https://www.radiookapi.net", "info@radiookapi.net", "https://www.instagram.com/radiookapi/", "https://x.com/radiookapi", ""),
      n("RTNC", "https://www.rtnc.cd", "info@rtnc.cd", "https://www.instagram.com/rtnc_officiel/", "https://x.com/rtnc_officiel", ""),
      n("Actualité.cd", "https://actualite.cd", "info@actualite.cd", "https://www.instagram.com/actualite.cd/", "https://x.com/actualitecd", ""),
    ],
    minor: [
      n("7sur7.cd", "https://www.7sur7.cd", "info@7sur7.cd", "https://www.instagram.com/7sur7.cd/", "https://x.com/7sur7cd", ""),
      n("Media Congo", "https://www.mediacongo.net", "info@mediacongo.net", "https://www.instagram.com/mediacongo/", "https://x.com/mediacongo", ""),
      n("Congo Independent", "https://www.congoindependant.com", "info@congoindependant.com", "https://www.instagram.com/congoindep/", "https://x.com/congoindep", ""),
      n("Congo Presse", "https://congopresse.net", "info@congopresse.net", "https://www.instagram.com/congopresse/", "https://x.com/congopresse", ""),
    ],
  },
  GQ: {
    major: [
      n("TVGE", "https://tvge.gq", "", "", "", ""),
      n("Ahora EG", "https://ahoraeg.com", "", "", "", ""),
      n("Guinea Ecuatorial Press", "https://guineaecuatorialpress.com", "", "", "", ""),
    ],
    minor: [
      n("Real Equatorial Guinea", "https://realequatorialguinea.com", "", "", "", ""),
      n("Diario Rombe", "https://diariorombe.com", "", "", "", ""),
      n("Asonga TV", "https://asongatv.com", "", "", "", ""),
      n("Ébano FM", "https://ebano-fm.com", "", "", "", ""),
    ],
  },
  GA: {
    major: [
      n("Gabon 24", "https://gabon24.ga", "", "", "https://x.com/Gabon24TV", ""),
      n("RTG", "https://rtg.gabon", "", "", "", ""),
      n("L’Union", "https://union.sonapresse.com", "", "", "", ""),
    ],
    minor: [
      n("Gabon Review", "https://gabonreview.com", "", "", "", ""),
      n("Info Gabon", "https://infogabon.ga", "", "", "", ""),
      n("Gabon Media Time", "https://gabonmediatime.com", "", "", "", ""),
      n("Dépeche Gabon", "https://depechegabon.com", "", "", "", ""),
    ],
  },
  CG: {
    major: [
      n("ADIAC", "https://adiac-congo.com", "", "", "", ""),
      n("Les Dépêches de Brazzaville", "https://lesdepechesdebrazzaville.fr", "", "", "", ""),
      n("RTV Congo", "https://rtvcongo.cg", "", "", "", ""),
    ],
    minor: [
      n("La Semaine Africaine", "https://lasemaineafricaine.info", "", "", "", ""),
      n("Ziana TV", "https://ziana.tv", "", "", "", ""),
      n("Brazza News", "https://brazzanews.com", "", "", "", ""),
      n("Congo Site", "https://congosite.com", "", "", "", ""),
    ],
  },
  ST: {
    major: [
      n("Téla Nón", "https://telanon.info", "", "", "", ""),
      n("STP-Press", "https://stp-press.st", "", "", "", ""),
      n("RTS São Tomé", "https://rtp.st", "", "", "", ""),
    ],
    minor: [
      n("Jornal Transparência", "https://transparencia.st", "", "", "", ""),
      n("STP Digital", "https://stpdigital.net", "", "", "", ""),
      n("O Parvo", "https://oparvo.com", "", "", "", ""),
      n("Sao Tome News", "https://saotomenews.com", "", "", "", ""),
    ],
  },
} as const satisfies Record<EccasMemberIsoCode, {
  major: readonly [NewsOutlet, NewsOutlet, NewsOutlet]
  minor: readonly [NewsOutlet, NewsOutlet, NewsOutlet, NewsOutlet]
}>
