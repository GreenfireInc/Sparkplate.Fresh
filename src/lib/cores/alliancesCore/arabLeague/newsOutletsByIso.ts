import type { NewsOutlet } from './types'
import type { ArabLeagueMemberIsoCode } from './arabLeagueMemberIsoCodes'

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
 * Three major + four minor national news outlets per arabLeague economy (informational; verify).
 */
export const ARAB_LEAGUE_NEWS_OUTLETS = {
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
  BH: {
    major: [
      n("Gulf Daily News", "https://www.gdnonline.com/", "editor@gdnmedia.bh", "https://www.instagram.com/gulf_daily_news/", "https://x.com/GDNOnline", "https://www.gdnonline.com/rss/"),
      n("Bahrain News Agency (BNA)", "https://www.bna.bh/en/", "webmaster@bna.bh", "", "https://x.com/BahrainNA", "https://www.bna.bh/en/feed/"),
      n("Bahrain TV (Information Affairs Authority)", "https://www.bahraintv.com/", "iaa@iaa.gov.bh", "", "https://x.com/iaagovbh", ""),
    ],
    minor: [
      n("Daily Tribune Bahrain", "https://www.newsofbahrain.com/", "editor@dt.bh", "", "https://x.com/Tribune_Bahrain", "https://www.newsofbahrain.com/feed/"),
      n("Al Wasat (legacy reference)", "https://www.alwasatnews.com/", "info@alwasatnews.com", "", "", "https://www.alwasatnews.com/news/rss.xml"),
      n("Akhbar Al Khaleej", "https://www.akhbar-alkhaleej.com/", "akhbar@akhbar-alkhaleej.com", "", "https://x.com/akhbarAlKhaleej", ""),
      n("Bahrain Mirror (advocacy)", "http://bahrainmirror.com/en/", "editor@bahrainmirror.com", "", "https://x.com/BahrainMirror", ""),
    ],
  },
  KM: {
    major: [
      n("Al-Watwan", "https://alwatwan.net", "info@alwatwan.net", "https://www.instagram.com/alwatwan/", "https://x.com/alwatwan", ""),
      n("ORTC (Office de Radio et Télévision des Comores)", "https://ortc.gouv.km", "info@ortc.gouv.km", "https://www.instagram.com/ortccomores/", "https://x.com/ortccomores", ""),
      n("La Gazette des Comores", "https://lagazettedescomores.com", "redaction@lagazettedescomores.com", "https://www.instagram.com/gazettedescomores/", "https://x.com/gazettedescomores", ""),
    ],
    minor: [
      n("Comores Infos", "https://comoresinfos.net", "info@comoresinfos.net", "https://www.instagram.com/comoresinfos/", "https://x.com/comoresinfos", ""),
      n("Habariza Comores", "https://habarizacomores.com", "info@habarizacomores.com", "https://www.instagram.com/habarizacomores/", "https://x.com/habariza", ""),
      n("Comores Online", "https://comores-online.com", "info@comores-online.com", "https://www.instagram.com/comoresonline/", "https://x.com/comoresonline", ""),
      n("Masiwa News", "https://masiwa.com", "news@masiwa.com", "https://www.instagram.com/masiwa/", "https://x.com/masiwa", ""),
    ],
  },
  DJ: {
    major: [
      n("ADI (Agence Djiboutienne d’Information)", "https://adi.dj", "", "", "https://x.com/ADI_Djibouti", ""),
      n("RTD (Radiodiffusion Télévision de Djibouti)", "https://rtd.dj", "", "", "", ""),
      n("La Nation", "https://lanation.dj", "", "", "", ""),
    ],
    minor: [
      n("Djibouti Post", "https://djiboutipost.com", "", "", "", ""),
      n("Africa Intelligence (Djibouti section)", "https://africaintelligence.com", "", "", "", ""),
      n("Horn Observer", "https://hornobserver.com", "", "", "", ""),
      n("Somali Dispatch (regional coverage)", "https://somalidispatch.com", "", "", "", ""),
    ],
  },
  EG: {
    major: [
      n("Al Ahram", "https://english.ahram.org.eg", "gate@ahram.org.eg", "https://www.instagram.com/alahramgate/", "https://x.com/AlAhramGate", ""),
      n("Youm7", "https://www.youm7.com", "editor@youm7.com", "https://www.instagram.com/youm7/", "https://x.com/youm7", ""),
      n("Egypt Today", "https://www.egypttoday.com", "info@egypttoday.com", "https://www.instagram.com/egypttodaymag/", "https://x.com/EgyptTodayMag", ""),
    ],
    minor: [
      n("Mada Masr", "https://www.madamasr.com", "editor@madamasr.com", "https://www.instagram.com/madamasr/", "https://x.com/MadaMasr", ""),
      n("Daily News Egypt", "https://dailynewsegypt.com", "info@dailynewsegypt.com", "https://www.instagram.com/dailynewsegypt/", "https://x.com/DailyNewsEgypt", ""),
      n("Cairo 24", "https://www.cairo24.com", "info@cairo24.com", "https://www.instagram.com/cairo24_/", "https://x.com/cairo24_", ""),
      n("Sada El Balad", "https://www.elbalad.news", "info@elbalad.news", "https://www.instagram.com/elbaladofficial/", "https://x.com/ElBaladOfficial", ""),
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
  JO: {
    major: [
      n("The Jordan Times", "https://jordantimes.com/", "editor@jordantimes.com", "https://www.instagram.com/thejordantimes/", "https://x.com/JordanTimes", "https://jordantimes.com/rss.xml"),
      n("Al-Ra’i", "https://alrai.com/", "webmaster@alrai.com", "", "https://x.com/AlraiNewspaper", "https://alrai.com/rss/news.xml"),
      n("Jordan Television (JRTV) / Al Mamlaka TV", "https://www.almamlakatv.com/", "info@almamlakatv.com", "", "https://x.com/AlmamlakaTV", ""),
    ],
    minor: [
      n("Al-Ghad", "https://alghad.com/", "webmaster@alghad.com", "", "https://x.com/Alghad", "https://alghad.com/feed/"),
      n("Roya News English", "https://en.royanews.tv/", "editor@royanews.tv", "https://www.instagram.com/roya_jo/", "https://x.com/Roya_English", "https://en.royanews.tv/rss/news"),
      n("Ammon News", "https://www.ammonnews.net/", "ammonnews@ammonnews.net", "", "https://x.com/AmmonNews", "https://www.ammonnews.net/rss/feed.xml"),
      n("Jordan News", "https://www.jordannews.jo/", "editor@jordannews.jo", "https://www.instagram.com/jordannews.jo/", "https://x.com/jordannews_jo", "https://www.jordannews.jo/rss/"),
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
  LB: {
    major: [
      n("An-Nahar", "https://www.annahar.com/", "webeditor@annahar.com.lb", "https://www.instagram.com/annaharlb/", "https://x.com/Annahar", "https://www.annahar.com/arabic/rss.xml"),
      n("L’Orient-Le Jour", "https://www.lorientlejour.com/", "redaction@lorientlejour.com", "https://www.instagram.com/lorientlejour/", "https://x.com/LorientLeJour", "https://www.lorientlejour.com/rss.xml"),
      n("Tele Liban (Lebanon TV)", "https://www.teleliban.com.lb/", "tl@teleliban.com.lb", "", "https://x.com/TLebanon", ""),
    ],
    minor: [
      n("The Daily Star Lebanon Archive", "https://www.dailystar.com.lb/", "editor@dailystar.com.lb", "", "https://x.com/DailyStarLeb", "https://www.dailystar.com.lb/RSS.aspx"),
      n("L’Orient Today (English)", "https://today.lorientlejour.com/", "oltsupport@lorientlejour.com", "https://www.instagram.com/lorienttoday/", "https://x.com/LOrientToday", "https://today.lorientlejour.com/feed.rss"),
      n("LBCI Lebanon", "https://www.lbcgroup.tv/", "communication@lbci.com.lb", "https://www.instagram.com/lbcilebanon/", "https://x.com/lbcgroup", "https://www.lbcgroup.tv/RSS-feed/0/0/News"),
      n("National News Agency (NNA Lebanon)", "https://nna-leb.gov.lb/en", "nna@nna-leb.gov.lb", "", "https://x.com/NNAlebanon", "https://nna-leb.gov.lb/en/rss"),
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
  OM: {
    major: [
      n("Times of Oman", "https://timesofoman.com/", "editor@timesofoman.com", "https://www.instagram.com/timesofoman/", "https://x.com/timesofoman", "https://timesofoman.com/rss/news.xml"),
      n("Oman News Agency (ONA)", "https://omannews.gov.om/", "webmaster@omannews.gov.om", "", "https://x.com/ONAnews", "https://omannews.gov.om/rss/news.xml"),
      n("Oman TV (Ministry of Information)", "https://omantv.tv/", "omantv@omantv.tv", "", "https://x.com/OmanTVOfficial", ""),
    ],
    minor: [
      n("Muscat Daily", "https://www.muscatdaily.com/", "editor@muscatdaily.com", "https://www.instagram.com/muscat_daily/", "https://x.com/Muscat_Daily", "https://www.muscatdaily.com/feed/"),
      n("Oman Observer", "https://www.omanobserver.om/", "editor@omanobserver.om", "https://www.instagram.com/oman_observer/", "https://x.com/OmanObserver_om", "https://www.omanobserver.om/feed/"),
      n("Al-Watan Oman", "https://alwatan.com/", "webmaster@alwatan.com", "", "https://x.com/AlwatanNewspape", "https://alwatan.com/feed/"),
      n("Atheer (Arabic)", "https://www.atheer.om/", "info@atheer.om", "", "https://x.com/AtheerOM", "https://www.atheer.om/feed/"),
    ],
  },
  PS: {
    major: [
      n("Wafa News Agency", "https://english.wafa.ps/", "wafa@wafa.ps", "", "https://x.com/WAFANewsEnglish", "https://english.wafa.ps/rss/news.xml"),
      n("Palestine TV", "https://www.pbc.ps/", "pbc@pbc.ps", "", "https://x.com/PalestineTV", ""),
      n("Maan News Agency", "https://www.maannews.com/", "maan@maannews.net", "", "https://x.com/maannews", "https://www.maannews.com/RSS/news.xml"),
    ],
    minor: [
      n("Al-Quds Al-Arabi", "https://www.alquds.co.uk/", "info@alquds.co.uk", "https://www.instagram.com/alqudsalarabi/", "https://x.com/alqudsalarabi", "https://www.alquds.co.uk/feed/"),
      n("Al-Hadath Online", "https://www.alhadath.ps/", "info@alhadath.ps", "", "", "https://www.alhadath.ps/rss/news.xml"),
      n("Al-Resalah Net", "https://alresalah.ps/", "info@alresalah.ps", "", "https://x.com/AlresalahPs", ""),
      n("Quds News Network", "https://qudsn.co/", "info@qudsn.co", "https://www.instagram.com/qudsn/", "https://x.com/QudsNen", "https://qudsn.co/rss"),
    ],
  },
  QA: {
    major: [
      n("Al Jazeera English", "https://www.aljazeera.com/", "feedback@aljazeera.net", "https://www.instagram.com/aljazeeraenglish/", "https://x.com/AJEnglish", "https://www.aljazeera.com/xml/rss/all.xml"),
      n("Qatar News Agency (QNA)", "https://www.qna.org.qa/en", "qna@qna.org.qa", "", "https://x.com/QNAEnglish", "https://www.qna.org.qa/en/feed"),
      n("Qatar TV", "https://www.qatartv.qa/", "qatartv@qatartv.qa", "", "https://x.com/qatartv", ""),
    ],
    minor: [
      n("The Peninsula Qatar", "https://thepeninsulaqatar.com/", "editor@pencompany.com", "https://www.instagram.com/thepeninsulaqatar/", "https://x.com/peninsulaqatar", "https://thepeninsulaqatar.com/feed/"),
      n("Gulf Times", "https://www.gulf-times.com/", "editor@gulf-times.com", "", "https://x.com/GulfTimes_QATAR", "https://www.gulf-times.com/RSS"),
      n("Doha News", "https://dohanews.co/", "editorial@dohanews.co", "https://www.instagram.com/dohanews/", "https://x.com/dohanews", "https://dohanews.co/feed/"),
      n("Al-Sharq Newspaper", "https://al-sharq.com/", "webmaster@al-sharq.com", "", "https://x.com/AlsharqDoha", "https://al-sharq.com/feed/"),
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
  SO: {
    major: [
      n("SONNA (Somali National News Agency)", "https://sonna.so", "", "", "https://x.com/SONNA_Somalia", ""),
      n("Radio Muqdisho", "https://radiomuqdisho.so", "", "", "", ""),
      n("Goobjoog News", "https://goobjoog.com", "", "", "", ""),
    ],
    minor: [
      n("Hiiraan Online", "https://hiiraan.com", "", "", "", ""),
      n("Somali Guardian", "https://somaliguardian.com", "", "", "", ""),
      n("Garowe Online", "https://garoweonline.com", "", "", "", ""),
      n("Shabelle Media", "https://shabellemedia.com", "", "", "", ""),
    ],
  },
  SD: {
    major: [
      n("SUNA (Sudan News Agency)", "https://suna-news.net", "", "", "", ""),
      n("Sudan TV", "https://sudan-tv.net", "", "", "", ""),
      n("Al Rakoba", "https://alrakoba.net", "", "", "", ""),
    ],
    minor: [
      n("Sudan Tribune", "https://sudantribune.com", "", "", "", ""),
      n("Dabanga Radio", "https://dabangasudan.org", "", "", "", ""),
      n("Sudan Daily", "https://sudandaily.net", "", "", "", ""),
      n("Al Taghyeer", "https://altaghyeer.info", "", "", "", ""),
    ],
  },
  SY: {
    major: [
      n("SANA — Syrian Arab News Agency", "https://sana.sy/en/", "webmaster@sana.sy", "", "https://x.com/sanaenofficial", "https://sana.sy/en/?feed=rss2"),
      n("Tishreen", "https://tishreen.news.sy/", "webmaster@tishreen.news.sy", "", "", "https://tishreen.news.sy/?feed=rss2"),
      n("Syrian Radio and TV (ORTAS)", "https://www.rtv.gov.sy/", "rtv@rtv.gov.sy", "", "https://x.com/ORTAS_OFFICIAL", ""),
    ],
    minor: [
      n("Enab Baladi", "https://english.enabbaladi.net/", "editor@enabbaladi.net", "https://www.instagram.com/enabbaladi/", "https://x.com/enabbaladienglish", "https://english.enabbaladi.net/feed/"),
      n("Syria Direct", "https://syriadirect.org/", "info@syriadirect.org", "", "https://x.com/syria_direct", "https://syriadirect.org/feed/"),
      n("North Press Agency", "https://npasyria.com/en/", "info@npasyria.com", "", "https://x.com/NPA_English", "https://npasyria.com/en/feed/"),
      n("Al-Watan", "https://alwatan.sy/", "info@alwatan.sy", "", "", "https://alwatan.sy/feed"),
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
  YE: {
    major: [
      n("SABA — Yemen News Agency", "https://www.saba.ye/en/", "webmaster@saba.ye", "", "https://x.com/sabanew_eng", "https://www.saba.ye/en/news.xml"),
      n("Yemen TV (Sana’a) / Aden TV", "https://www.yementv.gov.ye/", "yementv@yementv.gov.ye", "", "", ""),
      n("Yemen Times Archive (reference)", "https://www.yementimes.com/", "editor@yementimes.com", "", "", ""),
    ],
    minor: [
      n("Al-Masdar Online", "https://almasdaronline.com/", "info@almasdaronline.com", "", "https://x.com/almasdaronline", "https://almasdaronline.com/feed/"),
      n("Yemen Post", "https://www.yemenpost.net/", "editor@yemenpost.net", "", "", ""),
      n("Almahriah TV (Mahra)", "https://almahriah.net/", "editor@almahriah.net", "", "", ""),
      n("Belqees TV", "https://www.belqees.tv/", "info@belqees.tv", "", "https://x.com/Belqees_TV", ""),
    ],
  },
} as const satisfies Record<ArabLeagueMemberIsoCode, {
  major: readonly [NewsOutlet, NewsOutlet, NewsOutlet]
  minor: readonly [NewsOutlet, NewsOutlet, NewsOutlet, NewsOutlet]
}>
