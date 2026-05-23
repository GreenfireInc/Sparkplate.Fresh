import type { NewsOutlet } from './types'
import type { EuMemberIsoCode } from './euMemberIsoCodes'

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
 * Three major + four minor national news outlets per EU economy (informational; verify).
 * 
 * ISOs absent from NEWS_OUTLETS use explicit placeholders (marked "not seeded ... verify"); add seed rows then rerun.
 */
export const EU_NEWS_OUTLETS = {
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
  CY: {
    major: [
      n("CyBC", "https://cybc.com.cy", "", "", "", ""),
      n("Phileleftheros", "https://philenews.com", "", "", "", ""),
      n("Cyprus Mail", "https://cyprus-mail.com", "", "", "", ""),
    ],
    minor: [
      n("In-Cyprus", "https://in-cyprus.philenews.com", "", "", "", ""),
      n("Kathimerini Cyprus", "https://kathimerini.com.cy", "", "", "", ""),
      n("Cyprus News Agency", "https://cna.org.cy", "", "", "", ""),
      n("Stockwatch", "https://stockwatch.com.cy", "", "", "", ""),
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
  MT: {
    major: [
      n("TVM News", "https://tvmnews.mt", "", "", "", ""),
      n("Times of Malta", "https://timesofmalta.com", "", "", "", ""),
      n("Malta Today", "https://maltatoday.com.mt", "", "", "", ""),
    ],
    minor: [
      n("Newsbook", "https://newsbook.com.mt", "", "", "", ""),
      n("The Shift News", "https://theshiftnews.com", "", "", "", ""),
      n("Lovin Malta", "https://lovinmalta.com", "", "", "", ""),
      n("Malta Independent", "https://independent.com.mt", "", "", "", ""),
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
} as const satisfies Record<EuMemberIsoCode, {
  major: readonly [NewsOutlet, NewsOutlet, NewsOutlet]
  minor: readonly [NewsOutlet, NewsOutlet, NewsOutlet, NewsOutlet]
}>
