import type { NewsOutlet } from './types'
import type { IoraMemberIsoCode } from './ioraMemberIsoCodes'

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
 * Three major + four minor national news outlets per IORA economy (informational; verify).
 * 
 * ISOs absent from NEWS_OUTLETS use explicit placeholders (marked "not seeded ... verify"); add seed rows then rerun.
 */
export const IORA_NEWS_OUTLETS = {
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
  BD: {
    major: [
      n("The Daily Star", "https://thedailystar.net", "", "", "https://twitter.com/dailystarnews", ""),
      n("Dhaka Tribune", "https://dhakatribune.com", "", "", "", ""),
      n("BDNews24", "https://bdnews24.com", "", "", "", ""),
    ],
    minor: [
      n("Prothom Alo", "https://prothomalo.com", "", "", "", ""),
      n("The Business Standard", "https://tbsnews.net", "", "", "", ""),
      n("Jagonews24", "https://jagonews24.com", "", "", "", ""),
      n("Bangladesh Post", "https://bangladeshpost.net", "", "", "", ""),
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
  KE: {
    major: [
      n("Nation Media Group", "https://nation.africa", "", "", "https://x.com/NationAfrica", ""),
      n("Standard Media Group", "https://standardmedia.co.ke", "", "", "", ""),
      n("Kenya Broadcasting Corporation (KBC)", "https://kbc.co.ke", "", "", "", ""),
    ],
    minor: [
      n("Citizen Digital", "https://citizen.digital", "", "", "", ""),
      n("The Star Kenya", "https://thestarkenya.co.ke", "", "", "", ""),
      n("Tuko", "https://tuko.co.ke", "", "", "", ""),
      n("Kenya Times", "https://kenyatimes.co.ke", "", "", "", ""),
    ],
  },
  MG: {
    major: [
      n("Midi Madagasikara", "https://www.midi-madagasikara.mg", "info@midi-madagasikara.mg", "https://www.instagram.com/midimadagasikara/", "https://x.com/midimadagascar", ""),
      n("L’Express de Madagascar", "https://www.lexpress.mg", "redaction@lexpress.mg", "https://www.instagram.com/lexpressmg/", "https://x.com/lexpressmg", ""),
      n("Madagascar Tribune", "https://www.madagascar-tribune.com", "info@madagascar-tribune.com", "https://www.instagram.com/madagascartribune/", "https://x.com/madtribune", ""),
    ],
    minor: [
      n("2424.mg", "https://2424.mg", "info@2424.mg", "https://www.instagram.com/2424mg/", "https://x.com/2424mg", ""),
      n("Madagate", "https://www.madagate.org", "info@madagate.org", "https://www.instagram.com/madagate/", "https://x.com/madagate", ""),
      n("News Mada", "https://www.newsmada.com", "info@newsmada.com", "https://www.instagram.com/newsmada/", "https://x.com/newsmada", ""),
      n("Sobika", "https://www.sobika.com", "info@sobika.com", "https://www.instagram.com/sobika/", "https://x.com/sobikanews", ""),
    ],
  },
  MY: {
    major: [
      n("Bernama", "https://www.bernama.com/en/", "webmaster@bernama.com", "https://www.instagram.com/bernamaofficial/", "https://x.com/bernamadotcom", "https://www.bernama.com/en/rss/feed.xml"),
      n("The Star (Malaysia)", "https://www.thestar.com.my/", "editor@thestar.com.my", "https://www.instagram.com/thestar_news/", "https://x.com/staronline", "https://www.thestar.com.my/rss/news"),
      n("New Straits Times", "https://www.nst.com.my/", "webmaster@nst.com.my", "https://www.instagram.com/newstraitstimes/", "https://x.com/NST_Online", "https://www.nst.com.my/news/rss.xml"),
    ],
    minor: [
      n("Malaysiakini", "https://www.malaysiakini.com/", "editor@malaysiakini.com", "https://www.instagram.com/malaysiakini/", "https://x.com/malaysiakini", "https://www.malaysiakini.com/news.rss"),
      n("Free Malaysia Today", "https://www.freemalaysiatoday.com/", "newsroom@freemalaysiatoday.com", "https://www.instagram.com/freemalaysiatoday/", "https://x.com/fmtoday", "https://www.freemalaysiatoday.com/feed/"),
      n("Malay Mail", "https://www.malaymail.com/", "editor@malaymail.com", "https://www.instagram.com/themalaymail/", "https://x.com/malaymail", "https://www.malaymail.com/feed/rss/malaysia"),
      n("The Edge Malaysia", "https://theedgemalaysia.com/", "edgenewsdesk@bizedge.com", "https://www.instagram.com/theedgemalaysia/", "https://x.com/EdgeMalaysia", "https://theedgemalaysia.com/rss.xml"),
    ],
  },
  MV: {
    major: [
      n("Mihaaru", "https://mihaaru.com", "", "", "", ""),
      n("Sun Online", "https://sun.mv", "", "", "", ""),
      n("Raajje TV", "https://raajje.mv", "", "", "", ""),
    ],
    minor: [
      n("Maldives Independent", "https://maldivesindependent.com", "", "", "", ""),
      n("The Edition", "https://edition.mv", "", "", "", ""),
      n("Vaguthu", "https://vaguthu.mv", "", "", "", ""),
      n("PSM News", "https://psmnews.mv", "", "", "", ""),
    ],
  },
  MU: {
    major: [
      n("Defi Media", "https://defimedia.info", "info@defimedia.info", "https://www.instagram.com/defimedia/", "https://x.com/defimedia", ""),
      n("L’Express Mauritius", "https://www.lexpress.mu", "news@lexpress.mu", "https://www.instagram.com/lexpressmu/", "https://x.com/lexpressmu", ""),
      n("Mauritius Broadcasting Corporation (MBC)", "https://mbc.intnet.mu", "info@mbc.intnet.mu", "https://www.instagram.com/mbcmauritius/", "https://x.com/mbcmauritius", ""),
    ],
    minor: [
      n("Le Mauricien", "https://www.lemauricien.com", "info@lemauricien.com", "https://www.instagram.com/lemauricien/", "https://x.com/lemauricien", ""),
      n("Defi Sports", "https://defisports.info", "sports@defimedia.info", "https://www.instagram.com/defisports/", "https://x.com/defisports", ""),
      n("Top FM News", "https://www.topfmradio.com", "info@topfmradio.com", "https://www.instagram.com/topfmradio/", "https://x.com/topfmnews", ""),
      n("Wazaa FM", "https://www.wazaafm.com", "info@wazaafm.com", "https://www.instagram.com/wazaafm/", "https://x.com/wazaafm", ""),
    ],
  },
  MZ: {
    major: [
      n("Notícias (Jornal Noticias)", "https://www.jornalnoticias.co.mz", "info@jornalnoticias.co.mz", "https://www.instagram.com/jornalnoticias/", "https://x.com/jnoticias", ""),
      n("RM (Rádio Moçambique)", "https://www.rm.co.mz", "info@rm.co.mz", "https://www.instagram.com/radiomocambique/", "https://x.com/radiomocambique", ""),
      n("O País", "https://opais.co.mz", "info@opais.co.mz", "https://www.instagram.com/opaismz/", "https://x.com/opaismz", ""),
    ],
    minor: [
      n("AIM (Agência de Informação de Moçambique)", "https://www.aim.gov.mz", "info@aim.gov.mz", "https://www.instagram.com/aimnews/", "https://x.com/aimnews", ""),
      n("Mozambique News Agency", "https://www.mozambiquenews.co.mz", "info@mozambiquenews.co.mz", "https://www.instagram.com/moznews/", "https://x.com/moznews", ""),
      n("Club of Mozambique", "https://clubofmozambique.com", "info@clubofmozambique.com", "https://www.instagram.com/clubofmoz/", "https://x.com/clubofmoz", ""),
      n("Zitamar News", "https://zitamar.com", "info@zitamar.com", "https://www.instagram.com/zitamar/", "https://x.com/zitamarnews", ""),
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
  SC: {
    major: [
      n("Seychelles News Agency (SNA)", "https://www.seychellesnewsagency.com", "info@seychellesnewsagency.com", "https://www.instagram.com/seynewsagency/", "https://x.com/SeyNewsAgency", ""),
      n("SBC (Seychelles Broadcasting Corporation)", "https://sbc.sc", "info@sbc.sc", "https://www.instagram.com/sbcseychelles/", "https://x.com/sbcseychelles", ""),
      n("Today in Seychelles", "https://www.todayinseychelles.com", "info@todayinseychelles.com", "https://www.instagram.com/todayinseychelles/", "https://x.com/tiseychelles", ""),
    ],
    minor: [
      n("Seychelles Nation", "https://www.nation.sc", "news@nation.sc", "https://www.instagram.com/seychellenation/", "https://x.com/seychellenation", ""),
      n("Seychelles Weekly", "https://www.seychellesweekly.com", "info@seychellesweekly.com", "https://www.instagram.com/seychellesweekly/", "https://x.com/seyweekly", ""),
      n("Seychelles Info", "https://www.seychellesinfo.com", "info@seychellesinfo.com", "https://www.instagram.com/seychellesinfo/", "https://x.com/seyinfo", ""),
      n("Island Development News", "https://www.islandnews.sc", "info@islandnews.sc", "https://www.instagram.com/islandnews.sc/", "https://x.com/islandnews", ""),
    ],
  },
  SG: {
    major: [
      n("The Straits Times", "https://www.straitstimes.com/", "stnewsdesk@sph.com.sg", "https://www.instagram.com/straits_times/", "https://x.com/STcom", "https://www.straitstimes.com/news/singapore/rss.xml"),
      n("Channel News Asia (CNA)", "https://www.channelnewsasia.com/", "cna_corporate@mediacorp.com.sg", "https://www.instagram.com/channelnewsasia/", "https://x.com/ChannelNewsAsia", "https://www.channelnewsasia.com/rssfeeds/8395986"),
      n("Today Online", "https://www.todayonline.com/", "todayonline@mediacorp.com.sg", "https://www.instagram.com/todayonlinesg/", "https://x.com/TODAYonline", "https://www.todayonline.com/feed/rss"),
    ],
    minor: [
      n("The Business Times", "https://www.businesstimes.com.sg/", "btnewsdesk@sph.com.sg", "", "https://x.com/BTtweeting", "https://www.businesstimes.com.sg/rss"),
      n("MotherShip", "https://mothership.sg/", "hello@mothership.sg", "https://www.instagram.com/mothershipsg/", "https://x.com/MothershipSG", "https://mothership.sg/feed/"),
      n("Lianhe Zaobao", "https://www.zaobao.com.sg/", "editor@zaobao.com.sg", "https://www.instagram.com/lianhezaobao/", "https://x.com/zaobaosg", "https://www.zaobao.com.sg/rss"),
      n("Yahoo News Singapore", "https://sg.news.yahoo.com/", "sgsupport@yahoo.com", "", "", "https://sg.news.yahoo.com/rss/"),
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
  LK: {
    major: [
      n("Daily News", "https://dailynews.lk", "", "", "", ""),
      n("Ada Derana", "https://adaderana.lk", "", "", "", ""),
      n("News First", "https://newsfirst.lk", "", "", "", ""),
    ],
    minor: [
      n("The Sunday Times LK", "https://sundaytimes.lk", "", "", "", ""),
      n("Colombo Gazette", "https://colombogazette.com", "", "", "", ""),
      n("Lanka News Web", "https://lankanewsweb.net", "", "", "", ""),
      n("Daily Mirror LK", "https://dailymirror.lk", "", "", "", ""),
    ],
  },
  TZ: {
    major: [
      n("Daily News Tanzania", "https://www.dailynews.co.tz", "info@dailynews.co.tz", "https://www.instagram.com/dailynewstz/", "https://x.com/dailynewstz", ""),
      n("The Citizen", "https://www.thecitizen.co.tz", "news@thecitizen.co.tz", "https://www.instagram.com/thecitizentz/", "https://x.com/TheCitizenTz", ""),
      n("TBC (Tanzania Broadcasting Corporation)", "https://www.tbc.go.tz", "info@tbc.go.tz", "https://www.instagram.com/tbctz/", "https://x.com/tbctz", ""),
    ],
    minor: [
      n("IPP Media", "https://www.ippmedia.com", "info@ippmedia.com", "https://www.instagram.com/ippmedia/", "https://x.com/ippmedia", ""),
      n("Mwananchi", "https://www.mwananchi.co.tz", "news@mwananchi.co.tz", "https://www.instagram.com/mwananchitanzania/", "https://x.com/mwananchitanzania", ""),
      n("The East African", "https://www.theeastafrican.co.ke", "news@eastafrican.co.ke", "https://www.instagram.com/theeastafrican/", "https://x.com/TheEastAfrican", ""),
      n("Zanzibar News", "https://zanzibarnews.co.tz", "info@zanzibarnews.co.tz", "https://www.instagram.com/zanzibarnews/", "https://x.com/zanzibarnews", ""),
    ],
  },
  TH: {
    major: [
      n("Bangkok Post", "https://www.bangkokpost.com/", "newsroom@bangkokpost.com", "https://www.instagram.com/bangkok_post/", "https://x.com/BangkokPostNews", "https://www.bangkokpost.com/rss/data/topstories.xml"),
      n("The Nation Thailand", "https://www.nationthailand.com/", "webmaster@nationgroup.com", "https://www.instagram.com/thenationthailand/", "https://x.com/Thenationth", "https://www.nationthailand.com/rss"),
      n("Thai PBS", "https://www.thaipbs.or.th/", "info@thaipbs.or.th", "https://www.instagram.com/thaipbs/", "https://x.com/ThaiPBS", "https://news.thaipbs.or.th/rss"),
    ],
    minor: [
      n("Khaosod English", "https://www.khaosodenglish.com/", "editor@khaosodenglish.com", "https://www.instagram.com/khaosodenglish/", "https://x.com/KhaosodEnglish", "https://www.khaosodenglish.com/feed/"),
      n("Thai Enquirer", "https://www.thaienquirer.com/", "editor@thaienquirer.com", "https://www.instagram.com/thaienquirer/", "https://x.com/ThaiEnquirer", "https://www.thaienquirer.com/feed/"),
      n("Prachatai English", "https://prachatai.com/english", "webmaster@prachatai.com", "", "https://x.com/prachatai_en", "https://prachatai.com/english/rss.xml"),
      n("Matichon", "https://www.matichon.co.th/", "matichon@matichon.co.th", "https://www.instagram.com/matichononline/", "https://x.com/MatichonOnline", "https://www.matichon.co.th/feed"),
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
} as const satisfies Record<IoraMemberIsoCode, {
  major: readonly [NewsOutlet, NewsOutlet, NewsOutlet]
  minor: readonly [NewsOutlet, NewsOutlet, NewsOutlet, NewsOutlet]
}>
