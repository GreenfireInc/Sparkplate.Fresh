import type { NewsOutlet } from './types'
import type { BricsMemberIsoCode } from './bricsMemberIsoCodes'

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
 * Three major + four minor national news outlets per BRICS economy (informational; verify).
 */
export const BRICS_NEWS_OUTLETS = {
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
} as const satisfies Record<BricsMemberIsoCode, {
  major: readonly [NewsOutlet, NewsOutlet, NewsOutlet]
  minor: readonly [NewsOutlet, NewsOutlet, NewsOutlet, NewsOutlet]
}>
