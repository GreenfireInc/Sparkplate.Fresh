import type { NewsOutlet } from './types'
import type { FiveEyesMemberIsoCode } from './fiveEyesMemberIsoCodes'

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
 * Three major + four minor national news outlets per fiveEyes economy (informational; verify).
 * 
 * ISOs absent from NEWS_OUTLETS use explicit placeholders (marked "not seeded ... verify"); add seed rows then rerun.
 */
export const FIVE_EYES_NEWS_OUTLETS = {
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
} as const satisfies Record<FiveEyesMemberIsoCode, {
  major: readonly [NewsOutlet, NewsOutlet, NewsOutlet]
  minor: readonly [NewsOutlet, NewsOutlet, NewsOutlet, NewsOutlet]
}>
