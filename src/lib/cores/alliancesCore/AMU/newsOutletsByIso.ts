import type { NewsOutlet } from './types'
import type { AmuMemberIsoCode } from './amuMemberIsoCodes'

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
 * Three major + four minor national news outlets per AMU economy (informational; verify).
 */
export const AMU_NEWS_OUTLETS = {
  DZ: {
    major: [
      n("Algérie Presse Service", "https://www.aps.dz/en", "contact@aps.dz", "https://www.instagram.com/aps.algerie/", "https://x.com/APS_Algerie", ""),
      n("Echorouk", "https://www.echoroukonline.com", "contact@echoroukonline.com", "https://www.instagram.com/echoroukonline/", "https://x.com/echoroukonline", ""),
      n("El Watan", "https://elwatan-dz.com", "redaction@elwatan.com", "https://www.instagram.com/elwatanofficiel/", "https://x.com/elwatancom", ""),
    ],
    minor: [
      n("TSA Algérie", "https://www.tsa-algerie.com", "contact@tsa-algerie.com", "https://www.instagram.com/tsa_algerie/", "https://x.com/TSA_Algerie", ""),
      n("Le Soir d'Algérie", "https://www.lesoirdalgerie.com", "redaction@lesoirdalgerie.com", "", "https://x.com/soir_officiel", ""),
      n("Dzair Daily", "https://www.dzairdaily.com", "contact@dzairdaily.com", "https://www.instagram.com/dzairdaily/", "https://x.com/DzairDaily", ""),
      n("ObservAlgérie", "https://observalgerie.com", "contact@observalgerie.com", "https://www.instagram.com/observalgerie/", "https://x.com/ObservAlgerie", ""),
    ],
  },
  LY: {
    major: [
      n("Libya Observer", "https://libyaobserver.ly", "info@libyaobserver.ly", "https://www.instagram.com/libyaobserver/", "https://x.com/Lyobserver", ""),
      n("218TV", "https://218tv.net", "info@218tv.net", "https://www.instagram.com/218tv/", "https://x.com/218TV", ""),
      n("Libyan Express", "https://www.libyanexpress.com", "info@libyanexpress.com", "https://www.instagram.com/libyanexpress/", "https://x.com/LibyanExpress", ""),
    ],
    minor: [
      n("Address Libya", "https://addresslibya.com", "info@addresslibya.com", "", "https://x.com/AddressLibya", ""),
      n("Afrigate News", "https://www.afrigatenews.net", "info@afrigatenews.net", "", "https://x.com/AfrigateNews", ""),
      n("The Libya Herald", "https://libyaherald.com", "newsroom@libyaherald.com", "", "https://x.com/LibyaHerald", ""),
      n("Febrayer", "https://febrayer.com", "info@febrayer.com", "", "https://x.com/febrayermedia", ""),
    ],
  },
  MR: {
    major: [
      n("Agence Mauritanienne d’Information", "https://ami.mr", "ami@ami.mr", "https://www.instagram.com/agence_ami/", "https://x.com/agence_ami", ""),
      n("Sahara Media", "https://saharamedias.net", "contact@saharamedias.net", "", "https://x.com/SaharaMedias", ""),
      n("Mauriweb", "https://mauriweb.info", "contact@mauriweb.info", "", "https://x.com/MauriwebNews", ""),
    ],
    minor: [
      n("Le Calame", "https://lecalame.info", "redaction@lecalame.info", "", "https://x.com/LeCalameInfo", "https://lecalame.info/rss.xml"),
      n("Al-Akhbar", "https://alakhbar.info", "info@alakhbar.info", "", "https://x.com/AlakhbarInfo", ""),
      n("Kassataya", "https://kassataya.com", "contact@kassataya.com", "", "https://x.com/KassatayaNews", "https://kassataya.com/feed"),
      n("Taqadoum", "https://taqadoum.mr", "contact@taqadoum.mr", "", "https://x.com/Taqadoum_mr", ""),
    ],
  },
  MA: {
    major: [
      n("Hespress", "https://www.hespress.com", "contact@hespress.com", "https://www.instagram.com/hespress/", "https://x.com/hespress", ""),
      n("Le360", "https://fr.le360.ma", "contact@le360.ma", "https://www.instagram.com/le360officiel/", "https://x.com/Le360fr", ""),
      n("Morocco World News", "https://www.moroccoworldnews.com", "contact@moroccoworldnews.com", "https://www.instagram.com/moroccoworldnews/", "https://x.com/MoroccoWNews", ""),
    ],
    minor: [
      n("Yabiladi", "https://www.yabiladi.com", "contact@yabiladi.com", "https://www.instagram.com/yabiladi/", "https://x.com/yabiladi_fr", ""),
      n("Medias24", "https://medias24.com", "redaction@medias24.com", "https://www.instagram.com/medias24/", "https://x.com/Medias24", ""),
      n("Bladi.net", "https://www.bladi.net", "contact@bladi.net", "", "https://x.com/bladinet", ""),
      n("TelQuel", "https://telquel.ma", "contact@telquel.ma", "https://www.instagram.com/telquelofficiel/", "https://x.com/TelQuelOfficiel", ""),
    ],
  },
  TN: {
    major: [
      n("Tunis Afrique Presse", "https://www.tap.info.tn/en", "tap@tap.info.tn", "https://www.instagram.com/tapnewsagency/", "https://x.com/TapNewsAgency", ""),
      n("Mosaique FM", "https://www.mosaiquefm.net", "contact@mosaiquefm.net", "https://www.instagram.com/mosaiquefm/", "https://x.com/mosaiquefm", ""),
      n("Business News Tunisia", "https://www.businessnews.com.tn", "redaction@businessnews.com.tn", "", "https://x.com/businessnews_tn", ""),
    ],
    minor: [
      n("Kapitalis", "https://kapitalis.com", "contact@kapitalis.com", "", "https://x.com/Kapitalis_com", ""),
      n("Tunisie Numerique", "https://www.tunisienumerique.com", "contact@tunisienumerique.com", "https://www.instagram.com/tunisienumerique/", "https://x.com/TnNumerique", ""),
      n("Webdo", "https://www.webdo.tn", "contact@webdo.tn", "", "https://x.com/WebdoTunisie", ""),
      n("Tunivisions", "https://tunivisions.net", "contact@tunivisions.net", "https://www.instagram.com/tunivisionsofficiel/", "https://x.com/TunivisionsMag", ""),
    ],
  },
} as const satisfies Record<AmuMemberIsoCode, {
  major: readonly [NewsOutlet, NewsOutlet, NewsOutlet]
  minor: readonly [NewsOutlet, NewsOutlet, NewsOutlet, NewsOutlet]
}>
