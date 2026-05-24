import type { NewsOutlet } from './types'
import type { OpecMemberIsoCode } from './opecMemberIsoCodes'

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
 * Three major + four minor national news outlets per OPEC economy (informational; verify).
 * 
 * ISOs absent from NEWS_OUTLETS use explicit placeholders (marked "not seeded ... verify"); add seed rows then rerun.
 */
export const OPEC_NEWS_OUTLETS = {
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
  IR: {
    major: [
      n("IRNA (Islamic Republic News Agency)", "https://irna.ir", "", "", "https://twitter.com/IrnaEnglish", ""),
      n("Press TV", "https://presstv.ir", "", "", "https://twitter.com/PressTV", ""),
      n("Mehr News Agency", "https://mehrnews.com", "", "", "", ""),
    ],
    minor: [
      n("Tehran Times", "https://tehrantimes.com", "", "", "", ""),
      n("Tasnim News", "https://tasnimnews.com", "", "", "", ""),
      n("Fars News", "https://farsnews.ir", "", "", "", ""),
      n("Al-Monitor Iran", "https://al-monitor.com", "", "", "", ""),
    ],
  },
  IQ: {
    major: [
      n("Al-Sabaah", "https://www.alsabaah.iq/", "webmaster@alsabaah.iq", "", "", ""),
      n("Iraqi Media Network (IMN) / Al-Iraqiya TV", "https://imn.iq/", "imn@imn.iq", "", "https://x.com/imn_iq", ""),
      n("Iraqi News Agency (INA)", "https://www.ina.iq/eng", "ina@ina.iq", "", "https://x.com/inaenglish", "https://www.ina.iq/rss.php"),
    ],
    minor: [
      n("Rudaw English", "https://www.rudaw.net/english", "english@rudaw.net", "https://www.instagram.com/rudawenglish/", "https://x.com/RudawEnglish", "https://www.rudaw.net/english/rss"),
      n("Kurdistan24", "https://www.kurdistan24.net/en/", "editor@kurdistan24.net", "https://www.instagram.com/kurdistan24/", "https://x.com/k24english", "https://www.kurdistan24.net/feed/index/en"),
      n("Al Mada Press", "https://almadapaper.net/", "webmaster@almadapaper.net", "", "", "https://almadapaper.net/feed/"),
      n("Shafaq News", "https://shafaq.com/en", "shafaqnews@gmail.com", "https://www.instagram.com/shafaq.news/", "https://x.com/ShafaqNewsEN", "https://shafaq.com/en/rss"),
    ],
  },
  KW: {
    major: [
      n("Kuwait News Agency (KUNA)", "https://www.kuna.net.kw/Default.aspx?language=en", "webmaster@kuna.net.kw", "", "https://x.com/kunanews_eng", "https://www.kuna.net.kw/rss/news.aspx?language=en"),
      n("Kuwait Times", "https://www.kuwaittimes.com/", "editor@kuwaittimes.com", "https://www.instagram.com/kuwait_times/", "https://x.com/kuwaittimesnews", "https://www.kuwaittimes.com/feed/"),
      n("Arab Times Kuwait", "https://www.arabtimesonline.com/", "editor@arabtimesonline.com", "https://www.instagram.com/arabtimesonline/", "https://x.com/Arab_Times", "https://www.arabtimesonline.com/news/feed/"),
    ],
    minor: [
      n("Al-Qabas", "https://www.alqabas.com/", "editor@alqabas.com", "", "https://x.com/alqabas", "https://www.alqabas.com/feed/"),
      n("Al-Anba", "https://www.alanba.com.kw/", "editor@alanba.com.kw", "", "https://x.com/alanba_kuwait", "https://www.alanba.com.kw/feed/"),
      n("Al Rai", "https://www.alraimedia.com/", "webmaster@alraimedia.com", "", "https://x.com/AlraiMedia", "https://www.alraimedia.com/rssFeed.aspx?nID=1"),
      n("Al-Seyassah", "http://www.al-seyassah.com/", "editor@al-seyassah.com", "", "", ""),
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
  NG: {
    major: [
      n("Punch", "https://punchng.com", "", "https://instagram.com/punchnewspaper", "https://x.com/punchnewspaper", ""),
      n("The Guardian Nigeria", "https://guardian.ng", "", "", "", ""),
      n("Channels TV", "https://channelstv.com", "", "", "https://x.com/channelstv", ""),
    ],
    minor: [
      n("Sahara Reporters", "https://saharareporters.com", "", "", "", ""),
      n("Premium Times", "https://premiumtimesng.com", "", "", "", ""),
      n("Legit.ng", "https://legit.ng", "", "", "", ""),
      n("The Cable", "https://thecable.ng", "", "", "", ""),
    ],
  },
  SA: {
    major: [
      n("Saudi Press Agency (SPA)", "https://www.spa.gov.sa/en", "webmaster@spa.gov.sa", "", "https://x.com/SPAregions", "https://www.spa.gov.sa/feed.php?lang=en"),
      n("Al Arabiya", "https://english.alarabiya.net/", "editor@alarabiya.net", "https://www.instagram.com/alarabiya/", "https://x.com/AlArabiya_Eng", "https://english.alarabiya.net/.mrss/en.xml"),
      n("Arab News", "https://www.arabnews.com/", "webmaster@arabnews.com", "https://www.instagram.com/arabnews/", "https://x.com/arabnews", "https://www.arabnews.com/rss/saudi-arabia"),
    ],
    minor: [
      n("Saudi Gazette", "https://saudigazette.com.sa/", "newsdesk@saudigazette.com.sa", "", "https://x.com/Saudi_Gazette", "https://saudigazette.com.sa/feed/"),
      n("Asharq Al-Awsat", "https://english.aawsat.com/", "webmaster@aawsat.com", "https://www.instagram.com/aawsatenglish/", "https://x.com/aawsat_eng", "https://english.aawsat.com/feed"),
      n("Al-Riyadh Daily", "https://www.alriyadh.com/", "newsroom@alriyadh.com", "", "https://x.com/AlriyadhDaily", "https://www.alriyadh.com/rss/articles.xml"),
      n("Okaz", "https://www.okaz.com.sa/", "editor@okaz.com.sa", "", "https://x.com/OKAZ_online", "https://www.okaz.com.sa/rss"),
    ],
  },
  AE: {
    major: [
      n("Khaleej Times", "https://www.khaleejtimes.com/", "editor@khaleejtimes.com", "https://www.instagram.com/khaleejtimes/", "https://x.com/khaleejtimes", "https://www.khaleejtimes.com/rss/uae"),
      n("Gulf News", "https://gulfnews.com/", "readers@gulfnews.com", "https://www.instagram.com/gulfnews/", "https://x.com/gulf_news", "https://gulfnews.com/rss?path=uae"),
      n("The National (UAE)", "https://www.thenationalnews.com/", "newsdesk@thenational.ae", "https://www.instagram.com/thenational/", "https://x.com/TheNationalNews", "https://www.thenationalnews.com/arc/outboundfeeds/rss/?outputType=xml"),
    ],
    minor: [
      n("WAM — Emirates News Agency", "https://wam.ae/en", "webmaster@wam.ae", "", "https://x.com/wamnewsenglish", "https://wam.ae/en/rss"),
      n("Al Bayan", "https://www.albayan.ae/", "info@albayan.ae", "", "https://x.com/AlBayanNews", "https://www.albayan.ae/rss/feed.xml"),
      n("Emirates 24|7", "https://www.emirates247.com/", "webmaster@emirates247.com", "", "https://x.com/Emirates247", "https://www.emirates247.com/feed"),
      n("Arabian Business", "https://www.arabianbusiness.com/", "editor@arabianbusiness.com", "https://www.instagram.com/arabianbusiness/", "https://x.com/ArabianBusiness", "https://www.arabianbusiness.com/feed"),
    ],
  },
  VE: {
    major: [
      n("AVN (Agencia Venezolana de Noticias)", "https://www.avn.info.ve", "info@avn.info.ve", "https://www.instagram.com/avnve/", "https://x.com/avnve", ""),
      n("Venezolana de Televisión (VTV)", "https://www.vtv.gob.ve", "info@vtv.gob.ve", "https://www.instagram.com/vtvcanal8/", "https://x.com/VTVcanal8", ""),
      n("Últimas Noticias", "https://ultimasnoticias.com.ve", "contacto@ultimasnoticias.com.ve", "https://www.instagram.com/ultimasnoticias/", "https://x.com/UNoticias", ""),
    ],
    minor: [
      n("El Nacional", "https://www.elnacional.com", "contacto@elnacional.com", "https://www.instagram.com/elnacionalweb/", "https://x.com/ElNacionalWeb", ""),
      n("El Pitazo", "https://elpitazo.net", "contacto@elpitazo.net", "https://www.instagram.com/elpitazotv/", "https://x.com/ElPitazoTV", ""),
      n("TalCual", "https://talcualdigital.com", "info@talcualdigital.com", "https://www.instagram.com/talcualdigital/", "https://x.com/TalCual", ""),
      n("Runrunes", "https://runrun.es", "info@runrun.es", "https://www.instagram.com/runrunesweb/", "https://x.com/runrunesweb", ""),
    ],
  },
} as const satisfies Record<OpecMemberIsoCode, {
  major: readonly [NewsOutlet, NewsOutlet, NewsOutlet]
  minor: readonly [NewsOutlet, NewsOutlet, NewsOutlet, NewsOutlet]
}>
