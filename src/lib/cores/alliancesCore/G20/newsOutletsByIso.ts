import type { NewsOutlet } from './types'
import type { G20SovereignMemberIsoCode } from './g20MemberIsoCodes'

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
 * Three major + four minor national news outlets per G20 economy (informational; verify).
 * 
 * ISOs absent from NEWS_OUTLETS use explicit placeholders (marked "not seeded ... verify"); add seed rows then rerun.
 */
export const G20_NEWS_OUTLETS = {
  AR: {
    major: [
      n("Clarín", "https://clarin.com", "", "https://instagram.com/clarincom", "https://twitter.com/clarincom", ""),
      n("La Nación", "https://lanacion.com.ar", "", "", "https://twitter.com/LANACION", ""),
      n("Infobae", "https://infobae.com", "", "", "https://twitter.com/infobae", ""),
    ],
    minor: [
      n("Página/12", "https://pagina12.com.ar", "", "", "", ""),
      n("TN", "https://tn.com.ar", "", "", "", ""),
      n("Ambito", "https://ambito.com", "", "", "", ""),
      n("Perfil", "https://perfil.com", "", "", "", ""),
    ],
  },
  AU: {
    major: [
      n("ABC News (Australia)", "https://www.abc.net.au/news", "contact@your.abc.net.au", "https://www.instagram.com/abcnews_au/", "https://x.com/abcnews", "https://www.abc.net.au/news/feed/45910/rss.xml"),
      n("The Sydney Morning Herald", "https://www.smh.com.au/", "newsdesk@smh.com.au", "https://www.instagram.com/smhonline/", "https://x.com/smh", "https://www.smh.com.au/rss/feed.xml"),
      n("The Australian", "https://www.theaustralian.com.au/", "editor@theaustralian.com.au", "https://www.instagram.com/theaustralian/", "https://x.com/australian", "https://www.theaustralian.com.au/rss"),
    ],
    minor: [
      n("Australian Associated Press (AAP)", "https://www.aap.com.au/", "contact@aap.com.au", "", "https://x.com/AAPNewswire", "https://www.aap.com.au/feed/"),
      n("The Age (Melbourne)", "https://www.theage.com.au/", "newsdesk@theage.com.au", "", "https://x.com/theage", "https://www.theage.com.au/rss/feed.xml"),
      n("Guardian Australia", "https://www.theguardian.com/au", "editor@theguardian.com", "https://www.instagram.com/guardianaustralia/", "https://x.com/GuardianAus", "https://www.theguardian.com/au/rss"),
      n("SBS News", "https://www.sbs.com.au/news", "contactus@sbs.com.au", "https://www.instagram.com/sbsnews_au/", "https://x.com/SBSNews", "https://www.sbs.com.au/news/topic/latest/feed"),
    ],
  },
  BR: {
    major: [
      n("Agência Brasil (EBC)", "https://agenciabrasil.ebc.com.br/", "redacao@radiobrasilia.ebc.com.br", "https://www.instagram.com/agenciabrasil/", "https://x.com/agenciabrasil", "https://agenciabrasil.ebc.com.br/rss/ultimasnoticias/feed/rss.xml"),
      n("g1 — Globo", "https://g1.globo.com/", "oglobo@g1.globo.com", "https://www.instagram.com/g1/", "https://x.com/g1", ""),
      n("Folha de S.Paulo", "https://www.folha.uol.com.br/", "oportunidades@contact.folhapress.net", "https://www.instagram.com/folhadespaulo/", "https://x.com/fsp", ""),
    ],
    minor: [
      n("O Estado de S. Paulo (Estadão)", "https://www.estadao.com.br/", "oportunidades@estadao.com", "https://www.instagram.com/estadao/", "https://x.com/EstadaoPolitica", "https://www.estadao.com.br/arc/outboundfeeds/rss/feeds/rss/?outputType=xml"),
      n("BBC News Brasil", "https://www.bbc.com/portuguese", "brasil.stories@bbc.co.uk", "https://www.instagram.com/bbcbrasil/", "https://x.com/BBCBrasil", "https://feeds.bbci.co.uk/news/world/latin_america/rss.xml"),
      n("CNN Brasil", "https://www.cnnbrasil.com.br/", "", "https://www.instagram.com/cnnbrasil/", "https://x.com/cnnbrasil", ""),
      n("Valor Econômico", "https://valor.globo.com/", "redacao-valor@sptelecom.globo.com", "https://www.instagram.com/valoreconomico/", "https://x.com/valor", ""),
    ],
  },
  CA: {
    major: [
      n("CBC News", "https://www.cbc.ca/news", "newscbc@cbc.ca", "https://www.instagram.com/cbcnews/", "https://x.com/CBCNews", "https://www.cbc.ca/cmlink/rss-topstories"),
      n("The Globe and Mail", "https://www.theglobeandmail.com/", "newsroom@globeandmail.com", "https://www.instagram.com/globeandmail/", "https://x.com/globeandmail", "https://www.theglobeandmail.com/arc/outboundfeeds/rss/?outputType=xml"),
      n("CTV News", "https://www.ctvnews.ca/", "newsdesk@ctv.ca", "https://www.instagram.com/ctvnews/", "https://x.com/CTVNews", "https://www.ctvnews.ca/rss/ctvnews-ca-top-stories-public-rss-1.822009"),
    ],
    minor: [
      n("Toronto Star", "https://www.thestar.com/", "newsdesk@thestar.ca", "https://www.instagram.com/torontostar/", "https://x.com/TorontoStar", "https://www.thestar.com/feeds.articles.news.rss"),
      n("National Post", "https://nationalpost.com/", "feedback@nationalpost.com", "https://www.instagram.com/nationalpost/", "https://x.com/nationalpost", "https://nationalpost.com/feed/"),
      n("Le Devoir", "https://www.ledevoir.com/", "redaction@ledevoir.com", "https://www.instagram.com/ledevoir/", "https://x.com/LeDevoir", "https://www.ledevoir.com/rss/manchettes.xml"),
      n("La Presse", "https://www.lapresse.ca/", "webmestre@lapresse.ca", "https://www.instagram.com/lapresse/", "https://x.com/LP_LaPresse", "https://www.lapresse.ca/manchettes/rss"),
    ],
  },
  CN: {
    major: [
      n("People’s Daily Online (Renmin Ribao)", "http://en.people.cn/", "webmaster@people.cn", "", "https://x.com/PDChina", "http://en.people.cn/rss/90000.xml"),
      n("Xinhua News Agency", "https://english.news.cn/", "newsweb@xinhuanet.com", "https://www.instagram.com/xinhuanews/", "https://x.com/XHNews", "http://www.xinhuanet.com/english/rss/chinarss.xml"),
      n("China Central Television (CCTV) / CGTN", "https://www.cgtn.com/", "webmaster@cgtn.com", "https://www.instagram.com/cgtnofficial/", "https://x.com/CGTNOfficial", "https://www.cgtn.com/subscribe/rss/section/world.xml"),
    ],
    minor: [
      n("China Daily", "https://www.chinadaily.com.cn/", "editor@chinadaily.com.cn", "https://www.instagram.com/chinadaily/", "https://x.com/ChinaDaily", "https://www.chinadaily.com.cn/rss/china_rss.xml"),
      n("Global Times", "https://www.globaltimes.cn/", "editor@globaltimes.com.cn", "https://www.instagram.com/globaltimesnews/", "https://x.com/globaltimesnews", "https://www.globaltimes.cn/rss/outbrain.xml"),
      n("South China Morning Post (HK / China coverage)", "https://www.scmp.com/", "newsroom@scmp.com", "https://www.instagram.com/scmpnews/", "https://x.com/SCMPNews", "https://www.scmp.com/rss/91/feed"),
      n("Caixin Global", "https://www.caixinglobal.com/", "editor@caixin.com", "https://www.instagram.com/caixinmedia/", "https://x.com/CaixinOnline", "https://www.caixinglobal.com/rss/"),
    ],
  },
  FR: {
    major: [
      n("France 24", "https://france24.com", "", "", "https://twitter.com/france24", ""),
      n("Le Monde", "https://lemonde.fr", "", "", "", ""),
      n("Le Figaro", "https://lefigaro.fr", "", "", "", ""),
    ],
    minor: [
      n("Libération", "https://liberation.fr", "", "", "", ""),
      n("France Info", "https://francetvinfo.fr", "", "", "", ""),
      n("20 Minutes", "https://20minutes.fr", "", "", "", ""),
      n("BFM TV", "https://bfmtv.com", "", "", "", ""),
    ],
  },
  DE: {
    major: [
      n("ARD Tagesschau", "https://tagesschau.de", "", "", "https://twitter.com/tagesschau", ""),
      n("ZDF Heute", "https://zdf.de/nachrichten", "", "", "", ""),
      n("Der Spiegel", "https://spiegel.de", "", "", "", ""),
    ],
    minor: [
      n("Die Zeit", "https://zeit.de", "", "", "", ""),
      n("Frankfurter Allgemeine", "https://faz.net", "", "", "", ""),
      n("Süddeutsche Zeitung", "https://sueddeutsche.de", "", "", "", ""),
      n("Bild", "https://bild.de", "", "", "", ""),
    ],
  },
  IN: {
    major: [
      n("Press Trust of India (PTI)", "https://www.ptinews.com/", "", "", "https://x.com/PTI_News", "https://www.ptinews.com/rss"),
      n("DD News — Prasar Bharati", "https://ddnews.gov.in/", "admin@pb.nic.in", "https://www.instagram.com/dd_news/", "https://x.com/ddnews_", ""),
      n("All India Radio (AIR) News — Prasar Bharati", "https://newsonair.gov.in/", "admin@pb.nic.in", "", "", "https://newsonair.gov.in/rss/rss.aspx"),
    ],
    minor: [
      n("The Hindu", "https://www.thehindu.com/", "socialmedia@thehindu.co.in", "https://www.instagram.com/the_hindu/", "https://x.com/the_hindu", "https://www.thehindu.com/news/feeder/default/rssfeed.xml"),
      n("The Times of India", "https://timesofindia.indiatimes.com/", "toi.feedback@timesgroup.com", "https://www.instagram.com/timesofindia/", "https://x.com/timesofindia", "https://timesofindia.indiatimes.com/rssfeedlatest.cms"),
      n("The Indian Express", "https://indianexpress.com/", "digital@expressindia.com", "https://www.instagram.com/indianexpress/", "https://x.com/IndianExpress", "https://indianexpress.com/feed"),
      n("NDTV News", "https://www.ndtv.com/", "feedback@ndtv.com", "https://www.instagram.com/ndtv/", "https://x.com/ndtv", "https://feeds.feedburner.com/ndtv/rss-top-news"),
    ],
  },
  ID: {
    major: [
      n("Kompas", "https://www.kompas.com/", "kompas@kompas.com", "https://www.instagram.com/hariankompas/", "https://x.com/hariankompas", "https://www.kompas.com/rss"),
      n("Tempo", "https://www.tempo.co/", "redaksi@tempo.co.id", "https://www.instagram.com/tempodotco/", "https://x.com/tempodotco", "https://rss.tempo.co/"),
      n("TVRI — Televisi Republik Indonesia", "https://www.tvri.go.id/", "tvri@tvri.go.id", "https://www.instagram.com/tvrinasional/", "https://x.com/TVRINasional", ""),
    ],
    minor: [
      n("Detik.com", "https://www.detik.com/", "redaksi@detik.com", "https://www.instagram.com/detikcom/", "https://x.com/detikcom", "https://news.detik.com/berita/rss"),
      n("The Jakarta Post", "https://www.thejakartapost.com/", "editorial@thejakartapost.com", "https://www.instagram.com/jakpost/", "https://x.com/jakpost", "https://www.thejakartapost.com/rss"),
      n("Antara News", "https://en.antaranews.com/", "redaksi@antaranews.com", "https://www.instagram.com/antaranews/", "https://x.com/antaranews", "https://www.antaranews.com/rss/terkini.xml"),
      n("Republika Online", "https://www.republika.co.id/", "redaksi@republika.co.id", "https://www.instagram.com/republikaonline/", "https://x.com/republikaonline", "https://www.republika.co.id/rss"),
    ],
  },
  IT: {
    major: [
      n("RAI News", "https://rainews.it", "", "", "https://twitter.com/rainews", ""),
      n("Corriere della Sera", "https://corriere.it", "", "", "", ""),
      n("La Repubblica", "https://repubblica.it", "", "", "", ""),
    ],
    minor: [
      n("Il Sole 24 Ore", "https://ilsole24ore.com", "", "", "", ""),
      n("La Stampa", "https://lastampa.it", "", "", "", ""),
      n("ANSA", "https://ansa.it", "", "", "", ""),
      n("Il Fatto Quotidiano", "https://ilfattoquotidiano.it", "", "", "", ""),
    ],
  },
  JP: {
    major: [
      n("NHK World-Japan", "https://www3.nhk.or.jp/nhkworld/", "info@nhkworld.jp", "https://www.instagram.com/nhkworld/", "https://x.com/NHKWORLD_News", "https://www3.nhk.or.jp/nhkworld/en/news/feeds/"),
      n("The Asahi Shimbun", "https://www.asahi.com/ajw/", "iwc@asahi.com", "https://www.instagram.com/asahishimbun/", "https://x.com/asahi", "https://www.asahi.com/ajw/rss/feed.xml"),
      n("The Yomiuri Shimbun / Japan News", "https://japannews.yomiuri.co.jp/", "jn-editor@yomiuri.com", "https://www.instagram.com/japannews_yomiuri/", "https://x.com/Japan_News", "https://japannews.yomiuri.co.jp/feed/"),
    ],
    minor: [
      n("The Mainichi", "https://mainichi.jp/english/", "webmaster@mainichi.co.jp", "https://www.instagram.com/themainichi/", "https://x.com/themainichi", "https://mainichi.jp/english/rss/etc/mainichi_rss_2_0.xml"),
      n("Nikkei Asia", "https://asia.nikkei.com/", "asia.editor@nex.nikkei.co.jp", "https://www.instagram.com/nikkeiasia/", "https://x.com/NikkeiAsia", "https://asia.nikkei.com/rss/feed/nar"),
      n("The Japan Times", "https://www.japantimes.co.jp/", "feedback@japantimes.co.jp", "https://www.instagram.com/japantimes/", "https://x.com/japantimes", "https://www.japantimes.co.jp/feed/"),
      n("Kyodo News", "https://english.kyodonews.net/", "support@kyodonews.jp", "", "https://x.com/kyodo_english", "https://english.kyodonews.net/rss/news.xml"),
    ],
  },
  MX: {
    major: [
      n("Reforma", "https://www.reforma.com/", "reforma@reforma.com", "https://www.instagram.com/reformaweb/", "https://x.com/Reforma", ""),
      n("El Universal", "https://www.eluniversal.com.mx/", "contacto@eluniversal.com.mx", "https://www.instagram.com/eluniversal_mx/", "https://x.com/El_Universal_Mx", "https://www.eluniversal.com.mx/rss.xml"),
      n("Televisa Noticias", "https://noticieros.televisa.com/", "contacto@televisa.com", "https://www.instagram.com/noticierostelevisa/", "https://x.com/NTelevisa_com", "https://noticieros.televisa.com/rss"),
    ],
    minor: [
      n("La Jornada", "https://www.jornada.com.mx/", "webmaster@jornada.com.mx", "https://www.instagram.com/lajornadaonline/", "https://x.com/LaJornada", "https://www.jornada.com.mx/rss/edicion.xml"),
      n("Milenio", "https://www.milenio.com/", "webmaster@milenio.com", "https://www.instagram.com/milenio/", "https://x.com/Milenio", "https://www.milenio.com/rss"),
      n("Animal Político", "https://animalpolitico.com/", "contacto@animalpolitico.com", "https://www.instagram.com/animalpolitico/", "https://x.com/Pajaropolitico", "https://animalpolitico.com/feed"),
      n("Aristegui Noticias", "https://aristeguinoticias.com/", "contacto@aristeguinoticias.com", "https://www.instagram.com/aristeguinoticias/", "https://x.com/AristeguiOnline", "https://aristeguinoticias.com/feed"),
    ],
  },
  RU: {
    major: [
      n("TASS", "https://tass.com/", "press@tass.ru", "https://www.instagram.com/tassagency_news/", "https://x.com/tassagency_en", "https://tass.com/rss/v2.xml"),
      n("RIA Novosti", "https://ria.ru/", "press@ria.ru", "", "https://x.com/rianru", "https://ria.ru/export/rss2/index.xml"),
      n("Channel One Russia", "https://www.1tv.ru/", "info@1tv.ru", "https://www.instagram.com/1tv/", "https://x.com/Channel_One_Eng", ""),
    ],
    minor: [
      n("Kommersant", "https://www.kommersant.ru/", "press@kommersant.ru", "", "https://x.com/kommersant", "https://www.kommersant.ru/RSS/news.xml"),
      n("Vedomosti", "https://www.vedomosti.ru/", "press@vedomosti.ru", "", "https://x.com/vedomosti", "https://www.vedomosti.ru/rss/news"),
      n("Meduza", "https://meduza.io/en", "tips@meduza.io", "https://www.instagram.com/meduzaproject/", "https://x.com/meduza_en", "https://meduza.io/rss/en/all"),
      n("The Moscow Times", "https://www.themoscowtimes.com/", "newsroom@themoscowtimes.com", "https://www.instagram.com/themoscowtimes/", "https://x.com/MoscowTimes", "https://www.themoscowtimes.com/rss/news"),
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
  ZA: {
    major: [
      n("News24", "https://news24.com", "", "", "https://x.com/News24", ""),
      n("SABC News", "https://sabcnews.com", "", "", "", ""),
      n("TimesLIVE", "https://timeslive.co.za", "", "", "", ""),
    ],
    minor: [
      n("IOL", "https://iol.co.za", "", "", "", ""),
      n("Daily Maverick", "https://dailymaverick.co.za", "", "", "", ""),
      n("Mail & Guardian", "https://mg.co.za", "", "", "", ""),
      n("The Citizen", "https://citizen.co.za", "", "", "", ""),
    ],
  },
  KR: {
    major: [
      n("Yonhap News Agency", "https://en.yna.co.kr/", "webmaster@yna.co.kr", "https://www.instagram.com/yonhap_news/", "https://x.com/YonhapNews", "https://en.yna.co.kr/RSS/news.xml"),
      n("Korean Broadcasting System (KBS World)", "https://world.kbs.co.kr/", "world@kbs.co.kr", "https://www.instagram.com/kbsworld/", "https://x.com/kbsworld", "https://world.kbs.co.kr/rss/rss_news.htm?lang=e"),
      n("The Korea Herald", "https://www.koreaherald.com/", "editorial@heraldcorp.com", "https://www.instagram.com/koreaherald/", "https://x.com/TheKoreaHerald", "https://www.koreaherald.com/rss/all"),
    ],
    minor: [
      n("The Chosun Ilbo (English)", "https://www.chosun.com/english/", "chosun@chosun.com", "", "https://x.com/Chosun_English", ""),
      n("Hankyoreh (English)", "https://english.hani.co.kr/", "english@hani.co.kr", "https://www.instagram.com/hankyoreh.eng/", "https://x.com/hankyorehenglsh", "https://english.hani.co.kr/arti/rss"),
      n("The Korea Times", "https://www.koreatimes.co.kr/", "editor@koreatimes.co.kr", "https://www.instagram.com/koreatimescokr/", "https://x.com/koreatimescokr", "https://www.koreatimes.co.kr/www/rss/nation.xml"),
      n("Korea JoongAng Daily", "https://koreajoongangdaily.joins.com/", "joongangdaily@joongang.co.kr", "https://www.instagram.com/koreajoongangdaily/", "https://x.com/JoongangDaily", "https://koreajoongangdaily.joins.com/rss/news.xml"),
    ],
  },
  TR: {
    major: [
      n("Anadolu Agency", "https://aa.com.tr", "", "", "https://twitter.com/anadoluagency", ""),
      n("TRT World", "https://trtworld.com", "", "", "https://twitter.com/trtworld", ""),
      n("Hürriyet", "https://hurriyet.com.tr", "", "", "", ""),
    ],
    minor: [
      n("Sabah", "https://sabah.com.tr", "", "", "", ""),
      n("Daily Sabah", "https://dailysabah.com", "", "", "", ""),
      n("Cumhuriyet", "https://cumhuriyet.com.tr", "", "", "", ""),
      n("Yeni Şafak", "https://yenisafak.com", "", "", "", ""),
    ],
  },
  GB: {
    major: [
      n("BBC News", "https://bbc.com/news", "", "https://instagram.com/bbcnews", "https://twitter.com/BBCNews", "https://feeds.bbci.co.uk/news/rss.xml"),
      n("The Guardian", "https://theguardian.com", "", "", "https://twitter.com/guardian", "https://content.guardianapis.com"),
      n("Reuters UK", "https://reuters.com/world/uk", "", "", "https://twitter.com/reuters", ""),
    ],
    minor: [
      n("Byline Times", "https://bylinetimes.com", "", "", "", ""),
      n("openDemocracy", "https://opendemocracy.net", "", "", "", ""),
      n("PoliticsHome", "https://politicshome.com", "", "", "", ""),
      n("The Canary", "https://thecanary.co", "", "", "", ""),
    ],
  },
  US: {
    major: [
      n("The Associated Press (AP)", "https://apnews.com/", "info@ap.org", "https://www.instagram.com/apnews/", "https://x.com/AP", "https://feeds.apnews.com/rss/apf-topnews"),
      n("Reuters US", "https://www.reuters.com/world/us/", "feedback@reuters.com", "https://www.instagram.com/reuters/", "https://x.com/Reuters", "https://feeds.reuters.com/Reuters/domesticNews"),
      n("The New York Times", "https://www.nytimes.com/", "nytnews@nytimes.com", "https://www.instagram.com/nytimes/", "https://x.com/nytimes", "https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml"),
    ],
    minor: [
      n("The Washington Post", "https://www.washingtonpost.com/", "letters@washpost.com", "https://www.instagram.com/washingtonpost/", "https://x.com/washingtonpost", "https://feeds.washingtonpost.com/rss/national"),
      n("NPR", "https://www.npr.org/", "ombudsman@npr.org", "https://www.instagram.com/npr/", "https://x.com/NPR", "https://feeds.npr.org/1001/rss.xml"),
      n("The Wall Street Journal", "https://www.wsj.com/", "wsjcontact@wsj.com", "https://www.instagram.com/wsj/", "https://x.com/WSJ", "https://feeds.a.dj.com/rss/RSSWorldNews.xml"),
      n("CNN", "https://www.cnn.com/", "editorial@cnn.com", "https://www.instagram.com/cnn/", "https://x.com/CNN", "http://rss.cnn.com/rss/cnn_topstories.rss"),
    ],
  },
} as const satisfies Record<G20SovereignMemberIsoCode, {
  major: readonly [NewsOutlet, NewsOutlet, NewsOutlet]
  minor: readonly [NewsOutlet, NewsOutlet, NewsOutlet, NewsOutlet]
}>
