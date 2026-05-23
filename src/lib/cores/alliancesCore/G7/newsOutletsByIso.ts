import type { NewsOutlet } from './types'
import type { G7MemberIsoCode } from './g7MemberIsoCodes'

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
 * Three major + four minor national news outlets per G7 economy (informational; verify).
 * 
 * ISOs absent from NEWS_OUTLETS use explicit placeholders (marked "not seeded ... verify"); add seed rows then rerun.
 */
export const G7_NEWS_OUTLETS = {
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
} as const satisfies Record<G7MemberIsoCode, {
  major: readonly [NewsOutlet, NewsOutlet, NewsOutlet]
  minor: readonly [NewsOutlet, NewsOutlet, NewsOutlet, NewsOutlet]
}>
