import type { NewsOutlet } from './types'
import type { GccMemberIsoCode } from './gccMemberIsoCodes'

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
 * Three major + four minor national news outlets per GCC economy (informational; verify).
 * 
 * ISOs absent from NEWS_OUTLETS use explicit placeholders (marked "not seeded ... verify"); add seed rows then rerun.
 */
export const GCC_NEWS_OUTLETS = {
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
} as const satisfies Record<GccMemberIsoCode, {
  major: readonly [NewsOutlet, NewsOutlet, NewsOutlet]
  minor: readonly [NewsOutlet, NewsOutlet, NewsOutlet, NewsOutlet]
}>
