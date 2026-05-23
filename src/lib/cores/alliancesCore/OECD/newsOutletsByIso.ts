import type { NewsOutlet } from './types'
import type { OecdMemberIsoCode } from './oecdMemberIsoCodes'

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
 * Three major + four minor national news outlets per OECD economy (informational; verify).
 * 
 * ISOs absent from NEWS_OUTLETS use explicit placeholders (marked "not seeded ... verify"); add seed rows then rerun.
 */
export const OECD_NEWS_OUTLETS = {
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
  AT: {
    major: [
      n("ORF News", "https://orf.at", "online@orf.at", "https://instagram.com/orf.at", "https://twitter.com/ORF", ""),
      n("Der Standard", "https://derstandard.at", "", "", "https://twitter.com/derStandardat", ""),
      n("Die Presse", "https://diepresse.com", "", "", "", ""),
    ],
    minor: [
      n("Kleine Zeitung", "https://kleinezeitung.at", "", "", "", ""),
      n("OE24", "https://oe24.at", "", "", "", ""),
      n("Falter", "https://falter.at", "", "", "", ""),
      n("Vienna.at", "https://vienna.at", "", "", "", ""),
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
  CL: {
    major: [
      n("El Mercurio", "https://www.elmercurio.com/", "extension@mercurio.cl", "https://www.instagram.com/elmercurio_cl/", "https://x.com/ElMercurio_cl", ""),
      n("La Tercera", "https://www.latercera.com/", "cartas@latercera.com", "https://www.instagram.com/laterceracom/", "https://x.com/latercera", "https://www.latercera.com/feed/"),
      n("Televisión Nacional de Chile (TVN)", "https://www.tvn.cl/", "contacto@tvn.cl", "https://www.instagram.com/tvn/", "https://x.com/TVN", ""),
    ],
    minor: [
      n("BioBioChile", "https://www.biobiochile.cl/", "contacto@biobiochile.cl", "https://www.instagram.com/biobiochile/", "https://x.com/biobio", "https://www.biobiochile.cl/static/rss/"),
      n("El Mostrador", "https://www.elmostrador.cl/", "contacto@elmostrador.cl", "https://www.instagram.com/elmostrador/", "https://x.com/elmostrador", "https://www.elmostrador.cl/feed/"),
      n("Cooperativa", "https://www.cooperativa.cl/", "cooperativa@cooperativa.cl", "https://www.instagram.com/cooperativa/", "https://x.com/Cooperativa", "https://www.cooperativa.cl/noticias/site/edic/rss.xml"),
      n("CIPER Chile", "https://www.ciperchile.cl/", "contacto@ciperchile.cl", "https://www.instagram.com/ciperchile/", "https://x.com/ciperchile", "https://www.ciperchile.cl/feed/"),
    ],
  },
  CO: {
    major: [
      n("El Tiempo", "https://www.eltiempo.com", "redaccion@eltiempo.com", "https://www.instagram.com/eltiempo/", "https://x.com/eltiempo", ""),
      n("Semana", "https://www.semana.com", "webmaster@semana.com", "https://www.instagram.com/semana_revista/", "https://x.com/RevistaSemana", ""),
      n("Noticias Caracol", "https://noticias.caracoltv.com", "noticiascaracol@caracoltv.com", "https://www.instagram.com/noticiascaracol/", "https://x.com/NoticiasCaracol", ""),
    ],
    minor: [
      n("La Silla Vacía", "https://www.lasillavacia.com", "contacto@lasillavacia.com", "https://www.instagram.com/lasillavacia/", "https://x.com/lasillavacia", ""),
      n("Vorágine", "https://voragine.co", "info@voragine.co", "https://www.instagram.com/voragine.co/", "https://x.com/VoragineCo", ""),
      n("Pulzo", "https://www.pulzo.com", "contacto@pulzo.com", "https://www.instagram.com/pulzocom/", "https://x.com/pulzo", ""),
      n("Canal 1", "https://canal1.com.co", "info@canal1.com.co", "https://www.instagram.com/canal1col/", "https://x.com/Canal1Colombia", ""),
    ],
  },
  CR: {
    major: [
      n("La Nación", "https://www.nacion.com", "servicioalcliente@nacion.com", "https://www.instagram.com/nacioncom/", "https://x.com/nacion", ""),
      n("CRHoy", "https://www.crhoy.com", "redaccion@crhoy.com", "https://www.instagram.com/crhoycom/", "https://x.com/crhoycom", ""),
      n("Teletica Noticias", "https://www.teletica.com/noticias", "noticias@teletica.com", "https://www.instagram.com/teletica7/", "https://x.com/Teletica7", ""),
    ],
    minor: [
      n("Semanario Universidad", "https://semanariouniversidad.com", "direccion@semanariouniversidad.com", "https://www.instagram.com/semanariou/", "https://x.com/SemanarioU", ""),
      n("El Mundo CR", "https://elmundo.cr", "redaccion@elmundo.cr", "https://www.instagram.com/elmundocr/", "https://x.com/elmundocr", ""),
      n("Delfino", "https://delfino.cr", "info@delfino.cr", "https://www.instagram.com/delfinocr/", "https://x.com/delfinocr", ""),
      n("AM Prensa", "https://amprensa.com", "info@amprensa.com", "https://www.instagram.com/amprensacr/", "https://x.com/amprensacr", ""),
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
  IE: {
    major: [
      n("RTÉ News", "https://rte.ie/news", "", "", "https://twitter.com/rtenews", ""),
      n("The Irish Times", "https://irishtimes.com", "", "", "", ""),
      n("Irish Independent", "https://independent.ie", "", "", "", ""),
    ],
    minor: [
      n("TheJournal.ie", "https://thejournal.ie", "", "", "", ""),
      n("Irish Examiner", "https://irishexaminer.com", "", "", "", ""),
      n("BreakingNews.ie", "https://breakingnews.ie", "", "", "", ""),
      n("RTÉ Lifestyle & Opinion", "https://rte.ie", "", "", "", ""),
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
  NZ: {
    major: [
      n("RNZ — Radio New Zealand", "https://www.rnz.co.nz/", "feedback@rnz.co.nz", "https://www.instagram.com/rnz_news/", "https://x.com/radionz", "https://www.rnz.co.nz/rss/national.xml"),
      n("New Zealand Herald", "https://www.nzherald.co.nz/", "newsdesk@nzherald.co.nz", "https://www.instagram.com/nzherald/", "https://x.com/nzherald", "https://www.nzherald.co.nz/arc/outboundfeeds/rss/section/"),
      n("Stuff", "https://www.stuff.co.nz/", "webmaster@stuff.co.nz", "https://www.instagram.com/stuffnz/", "https://x.com/NZStuff", "https://www.stuff.co.nz/rss/news/"),
    ],
    minor: [
      n("1News (TVNZ)", "https://www.1news.co.nz/", "newsdesk@tvnz.co.nz", "https://www.instagram.com/1news/", "https://x.com/1NewsNZ", "https://www.1news.co.nz/rss"),
      n("Newsroom", "https://www.newsroom.co.nz/", "enquiries@newsroom.co.nz", "https://www.instagram.com/newsroom_nz/", "https://x.com/newsroom_nz", "https://www.newsroom.co.nz/feed"),
      n("The Spinoff", "https://thespinoff.co.nz/", "editor@thespinoff.co.nz", "https://www.instagram.com/thespinofftv/", "https://x.com/TheSpinoffTV", "https://thespinoff.co.nz/feed/"),
      n("Otago Daily Times", "https://www.odt.co.nz/", "editor@odt.co.nz", "", "https://x.com/ODTNews", "https://www.odt.co.nz/rss.xml"),
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
  CH: {
    major: [
      n("Swissinfo", "https://www.swissinfo.ch", "english@swissinfo.ch", "https://www.instagram.com/swissinfo/", "https://x.com/swissinfo_en", ""),
      n("Neue Zürcher Zeitung", "https://www.nzz.ch", "redaktion@nzz.ch", "https://www.instagram.com/nzz/", "https://x.com/NZZ", ""),
      n("SRF News", "https://www.srf.ch/news", "news@srf.ch", "https://www.instagram.com/srfnews/", "https://x.com/srfnews", ""),
    ],
    minor: [
      n("Republik", "https://www.republik.ch", "kontakt@republik.ch", "https://www.instagram.com/republikmagazin/", "https://x.com/republikmagazin", ""),
      n("Watson", "https://www.watson.ch", "redaktion@watson.ch", "https://www.instagram.com/watson_news/", "https://x.com/watson_news", ""),
      n("Heidi.news", "https://www.heidi.news", "contact@heidi.news", "https://www.instagram.com/heidi.news/", "https://x.com/heidi_news", ""),
      n("Bajour", "https://www.bajour.ch", "redaktion@bajour.ch", "https://www.instagram.com/bajour_basel/", "https://x.com/bajour_basel", ""),
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
} as const satisfies Record<OecdMemberIsoCode, {
  major: readonly [NewsOutlet, NewsOutlet, NewsOutlet]
  minor: readonly [NewsOutlet, NewsOutlet, NewsOutlet, NewsOutlet]
}>
