import type { NewsOutlet } from './types'
import type { NatoMemberIsoCode } from './natoMemberIsoCodes'

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
 * Three major + four minor national news outlets per NATO economy (informational; verify).
 * 
 * ISOs absent from NEWS_OUTLETS use explicit placeholders (marked "not seeded ... verify"); add seed rows then rerun.
 */
export const NATO_NEWS_OUTLETS = {
  AL: {
    major: [
      n("Top Channel", "https://top-channel.tv", "info@top-channel.tv", "https://instagram.com/topchannel", "https://twitter.com/topchannel", ""),
      n("TV Klan", "https://tvklan.al", "info@tvklan.al", "https://instagram.com/tvklan", "https://twitter.com/tvklan", ""),
      n("BalkanWeb", "https://balkanweb.com", "info@balkanweb.com", "https://instagram.com/balkanweb", "https://twitter.com/balkanweb", ""),
    ],
    minor: [
      n("Gazeta Shqiptare", "https://gazeta-shqip.com", "", "", "", ""),
      n("Syri.net", "https://syri.net", "", "", "", ""),
      n("Reporter.al", "https://reporter.al", "", "", "", ""),
      n("News24", "https://news24.al", "", "", "", ""),
    ],
  },
  BE: {
    major: [
      n("RTBF", "https://rtbf.be", "", "https://instagram.com/rtbf", "https://twitter.com/RTBFinfo", ""),
      n("VRT NWS", "https://vrt.be/vrtnws", "", "", "https://twitter.com/vrtnews", ""),
      n("Le Soir", "https://lesoir.be", "", "", "", ""),
    ],
    minor: [
      n("Brussels Times", "https://brusselstimes.com", "", "", "", ""),
      n("HLN", "https://hln.be", "", "", "", ""),
      n("De Morgen", "https://demorgen.be", "", "", "", ""),
      n("Politico EU", "https://politico.eu", "", "", "", ""),
    ],
  },
  BG: {
    major: [
      n("BNT", "https://bnt.bg", "", "", "", ""),
      n("Nova TV", "https://nova.bg", "", "", "", ""),
      n("Dnevnik", "https://dnevnik.bg", "", "", "https://twitter.com/dnevnik", ""),
    ],
    minor: [
      n("Capital", "https://capital.bg", "", "", "", ""),
      n("Mediapool", "https://mediapool.bg", "", "", "", ""),
      n("Fakti", "https://fakti.bg", "", "", "", ""),
      n("Dir.bg", "https://dir.bg", "", "", "", ""),
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
  HR: {
    major: [
      n("HRT", "https://hrt.hr", "", "", "https://twitter.com/hrt_hr", ""),
      n("Index.hr", "https://index.hr", "", "https://instagram.com/index.hr", "", ""),
      n("Jutarnji List", "https://jutarnji.hr", "", "", "", ""),
    ],
    minor: [
      n("Dnevnik.hr", "https://dnevnik.hr", "", "", "", ""),
      n("Telegram.hr", "https://telegram.hr", "", "", "", ""),
      n("N1 Croatia", "https://n1info.hr", "", "", "", ""),
      n("24sata", "https://24sata.hr", "", "", "", ""),
    ],
  },
  CZ: {
    major: [
      n("Česká televize", "https://ct24.cz", "", "", "", ""),
      n("iDNES", "https://idnes.cz", "", "", "", ""),
      n("Seznam Zprávy", "https://seznamzpravy.cz", "", "", "", ""),
    ],
    minor: [
      n("Aktuálně.cz", "https://aktualne.cz", "", "", "", ""),
      n("Deník N", "https://denikn.cz", "", "", "", ""),
      n("Echo24", "https://echo24.cz", "", "", "", ""),
      n("Expats.cz", "https://expats.cz", "", "", "", ""),
    ],
  },
  DK: {
    major: [
      n("DR News", "https://dr.dk", "", "", "https://twitter.com/drnyheder", ""),
      n("TV2 Denmark", "https://tv2.dk", "", "", "", ""),
      n("Politiken", "https://politiken.dk", "", "", "", ""),
    ],
    minor: [
      n("Berlingske", "https://berlingske.dk", "", "", "", ""),
      n("Jyllands-Posten", "https://jyllands-posten.dk", "", "", "", ""),
      n("The Local Denmark", "https://thelocal.dk", "", "", "", ""),
      n("Copenhagen Post", "https://cphpost.dk", "", "", "", ""),
    ],
  },
  EE: {
    major: [
      n("ERR News", "https://news.err.ee", "", "", "https://twitter.com/errnews", ""),
      n("Postimees", "https://postimees.ee", "", "", "", ""),
      n("Delfi Estonia", "https://delfi.ee", "", "", "", ""),
    ],
    minor: [
      n("Õhtuleht", "https://ohtuleht.ee", "", "", "", ""),
      n("Eesti Päevaleht", "https://epl.delfi.ee", "", "", "", ""),
      n("ERR English", "https://news.err.ee/english", "", "", "", ""),
      n("Baltic Times Estonia", "https://baltictimes.com", "", "", "", ""),
    ],
  },
  FI: {
    major: [
      n("Yle News", "https://yle.fi/news", "", "", "https://twitter.com/yleuutiset", ""),
      n("Helsingin Sanomat", "https://hs.fi", "", "", "", ""),
      n("Ilta-Sanomat", "https://is.fi", "", "", "", ""),
    ],
    minor: [
      n("Iltalehti", "https://iltalehti.fi", "", "", "", ""),
      n("Hufvudstadsbladet", "https://hbl.fi", "", "", "", ""),
      n("Finnish News Agency (STT)", "https://stt.fi", "", "", "", ""),
      n("Good News from Finland", "https://goodnewsfinland.com", "", "", "", ""),
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
  GR: {
    major: [
      n("ERT News", "https://ertnews.gr", "", "", "", ""),
      n("Kathimerini", "https://ekathimerini.com", "", "", "", ""),
      n("Proto Thema", "https://protothema.gr", "", "", "", ""),
    ],
    minor: [
      n("To Vima", "https://tovima.gr", "", "", "", ""),
      n("Naftemporiki", "https://naftemporiki.gr", "", "", "", ""),
      n("News247", "https://news247.gr", "", "", "", ""),
      n("Greek Reporter", "https://greekreporter.com", "", "", "", ""),
    ],
  },
  HU: {
    major: [
      n("MTVA", "https://hirado.hu", "", "", "", ""),
      n("Index.hu", "https://index.hu", "", "", "", ""),
      n("Telex", "https://telex.hu", "", "", "", ""),
    ],
    minor: [
      n("24.hu", "https://24.hu", "", "", "", ""),
      n("Blikk", "https://blikk.hu", "", "", "", ""),
      n("Hungary Today", "https://hungarytoday.hu", "", "", "", ""),
      n("Budapest Times", "https://budapesttimes.hu", "", "", "", ""),
    ],
  },
  IS: {
    major: [
      n("RÚV", "https://ruv.is", "", "", "https://twitter.com/ruvfrettir", ""),
      n("Morgunblaðið", "https://mbl.is", "", "", "", ""),
      n("Iceland Monitor", "https://icelandmonitor.mbl.is", "", "", "", ""),
    ],
    minor: [
      n("Visir", "https://visir.is", "", "", "", ""),
      n("Stundin", "https://stundin.is", "", "", "", ""),
      n("DV", "https://dv.is", "", "", "", ""),
      n("Reykjavik Grapevine", "https://grapevine.is", "", "", "", ""),
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
  LV: {
    major: [
      n("LSM", "https://lsm.lv", "", "", "", ""),
      n("Delfi Latvia", "https://delfi.lv", "", "", "", ""),
      n("TVNET", "https://tvnet.lv", "", "", "", ""),
    ],
    minor: [
      n("Baltic Times", "https://baltictimes.com", "", "", "", ""),
      n("Latvian Public Media English", "https://eng.lsm.lv", "", "", "", ""),
      n("The Riga Times", "https://rigatimes.lv", "", "", "", ""),
      n("Jauns.lv", "https://jauns.lv", "", "", "", ""),
    ],
  },
  LT: {
    major: [
      n("LRT", "https://lrt.lt", "", "", "", ""),
      n("Delfi Lithuania", "https://delfi.lt", "", "", "", ""),
      n("15min", "https://15min.lt", "", "", "", ""),
    ],
    minor: [
      n("The Baltic Times", "https://baltictimes.com", "", "", "", ""),
      n("Made in Vilnius", "https://madeinvilnius.lt", "", "", "", ""),
      n("Lithuanian Tribune", "https://lithuaniatribune.com", "", "", "", ""),
      n("Kauno Diena", "https://kauno.diena.lt", "", "", "", ""),
    ],
  },
  LU: {
    major: [
      n("RTL Luxembourg", "https://rtl.lu", "", "", "", ""),
      n("Luxemburger Wort", "https://wort.lu", "", "", "", ""),
      n("Tageblatt", "https://tageblatt.lu", "", "", "", ""),
    ],
    minor: [
      n("Delano", "https://delano.lu", "", "", "", ""),
      n("Luxembourg Times", "https://luxtimes.lu", "", "", "", ""),
      n("Chronicle.lu", "https://chronicle.lu", "", "", "", ""),
      n("L’essentiel", "https://lessentiel.lu", "", "", "", ""),
    ],
  },
  ME: {
    major: [
      n("Vijesti", "https://www.vijesti.me", "", "https://instagram.com/vijesti", "https://twitter.com/vijesti", ""),
      n("CDM", "https://www.cdm.me", "", "https://instagram.com/cdm.me", "https://twitter.com/cdm_me", ""),
      n("Pobjeda", "https://www.pobjeda.me", "", "https://instagram.com/pobjeda", "https://twitter.com/pobjeda", ""),
    ],
    minor: [
      n("Analitika", "https://www.analitika.me", "", "", "", ""),
      n("Portal RTCG", "https://www.rtcg.me", "", "", "", ""),
      n("Dnevne Novine", "https://www.dnevne.me", "", "", "", ""),
      n("Montenegro Online", "https://www.montenegroonline.me", "", "", "", ""),
    ],
  },
  NL: {
    major: [
      n("NOS", "https://nos.nl", "", "", "https://twitter.com/NOS", ""),
      n("De Telegraaf", "https://telegraaf.nl", "", "", "", ""),
      n("NU.nl", "https://nu.nl", "", "", "", ""),
    ],
    minor: [
      n("RTL Nieuws", "https://rtl.nl/nieuws", "", "", "", ""),
      n("AD.nl", "https://ad.nl", "", "", "", ""),
      n("Trouw", "https://trouw.nl", "", "", "", ""),
      n("DutchNews.nl", "https://dutchnews.nl", "", "", "", ""),
    ],
  },
  MK: {
    major: [
      n("MRT News", "https://mrt.com.mk", "", "", "https://twitter.com/mrt_mk", ""),
      n("Nova TV", "https://novatv.mk", "", "", "", ""),
      n("Alsat-M", "https://alsat.mk", "", "", "", ""),
    ],
    minor: [
      n("Telma", "https://telma.com.mk", "", "", "", ""),
      n("Kapital", "https://kapital.mk", "", "", "", ""),
      n("Republika", "https://republika.mk", "", "", "", ""),
      n("Fokus", "https://fokus.mk", "", "", "", ""),
    ],
  },
  NO: {
    major: [
      n("NRK", "https://nrk.no", "", "https://instagram.com/nrk", "https://twitter.com/NRK", ""),
      n("VG", "https://vg.no", "", "https://instagram.com/vgnett", "https://twitter.com/vgnett", ""),
      n("Aftenposten", "https://aftenposten.no", "", "https://instagram.com/aftenposten", "https://twitter.com/aftenposten", ""),
    ],
    minor: [
      n("Dagbladet", "https://dagbladet.no", "", "", "", ""),
      n("Dagens Næringsliv", "https://dn.no", "", "", "", ""),
      n("Adresseavisen", "https://adressa.no", "", "", "", ""),
      n("Bergens Tidende", "https://bt.no", "", "", "", ""),
    ],
  },
  PL: {
    major: [
      n("TVP Info", "https://tvp.info", "", "", "", ""),
      n("Onet", "https://onet.pl", "", "", "", ""),
      n("Gazeta Wyborcza", "https://wyborcza.pl", "", "", "", ""),
    ],
    minor: [
      n("Polsat News", "https://polsatnews.pl", "", "", "", ""),
      n("Wirtualna Polska", "https://wp.pl", "", "", "", ""),
      n("Rzeczpospolita", "https://rp.pl", "", "", "", ""),
      n("Notes from Poland", "https://notesfrompoland.com", "", "", "", ""),
    ],
  },
  PT: {
    major: [
      n("RTP", "https://rtp.pt", "", "", "", ""),
      n("Público", "https://publico.pt", "", "", "", ""),
      n("Diário de Notícias", "https://dn.pt", "", "", "", ""),
    ],
    minor: [
      n("Jornal de Notícias", "https://jn.pt", "", "", "", ""),
      n("Expresso", "https://expresso.pt", "", "", "", ""),
      n("Correio da Manhã", "https://cmjornal.pt", "", "", "", ""),
      n("Observador", "https://observador.pt", "", "", "", ""),
    ],
  },
  RO: {
    major: [
      n("Digi24", "https://digi24.ro", "", "", "", ""),
      n("Antena 3 CNN", "https://antena3.ro", "", "", "", ""),
      n("PRO TV", "https://protv.ro", "", "", "", ""),
    ],
    minor: [
      n("HotNews", "https://hotnews.ro", "", "", "", ""),
      n("G4Media", "https://g4media.ro", "", "", "", ""),
      n("Ziare.com", "https://ziare.com", "", "", "", ""),
      n("Libertatea", "https://libertatea.ro", "", "", "", ""),
    ],
  },
  SK: {
    major: [
      n("RTVS", "https://rtvs.sk", "", "", "", ""),
      n("SME", "https://sme.sk", "", "", "", ""),
      n("TA3", "https://ta3.com", "", "", "", ""),
    ],
    minor: [
      n("Denník N", "https://dennikn.sk", "", "", "", ""),
      n("Pravda", "https://pravda.sk", "", "", "", ""),
      n("Aktuality.sk", "https://aktuality.sk", "", "", "", ""),
      n("The Slovak Spectator", "https://spectator.sme.sk", "", "", "", ""),
    ],
  },
  SI: {
    major: [
      n("RTV Slovenija", "https://rtvslo.si", "", "", "", ""),
      n("24ur", "https://24ur.com", "", "", "", ""),
      n("Delo", "https://delo.si", "", "", "", ""),
    ],
    minor: [
      n("Dnevnik", "https://dnevnik.si", "", "", "", ""),
      n("Siol.net", "https://siol.net", "", "", "", ""),
      n("STA (Slovenian Press Agency)", "https://sta.si", "", "", "", ""),
      n("The Slovenia Times", "https://sloveniatimes.com", "", "", "", ""),
    ],
  },
  ES: {
    major: [
      n("RTVE", "https://rtve.es", "", "", "", ""),
      n("El País", "https://elpais.com", "", "", "", ""),
      n("El Mundo", "https://elmundo.es", "", "", "", ""),
    ],
    minor: [
      n("ABC", "https://abc.es", "", "", "", ""),
      n("La Vanguardia", "https://lavanguardia.com", "", "", "", ""),
      n("20 Minutos", "https://20minutos.es", "", "", "", ""),
      n("El Confidencial", "https://elconfidencial.com", "", "", "", ""),
    ],
  },
  SE: {
    major: [
      n("SVT Nyheter", "https://svt.se", "", "", "https://twitter.com/svtnyheter", ""),
      n("Dagens Nyheter", "https://dn.se", "", "", "", ""),
      n("Aftonbladet", "https://aftonbladet.se", "", "", "", ""),
    ],
    minor: [
      n("Svenska Dagbladet", "https://svd.se", "", "", "", ""),
      n("Expressen", "https://expressen.se", "", "", "", ""),
      n("The Local Sweden", "https://thelocal.se", "", "", "", ""),
      n("TT News Agency", "https://tt.se", "", "", "", ""),
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
} as const satisfies Record<NatoMemberIsoCode, {
  major: readonly [NewsOutlet, NewsOutlet, NewsOutlet]
  minor: readonly [NewsOutlet, NewsOutlet, NewsOutlet, NewsOutlet]
}>
