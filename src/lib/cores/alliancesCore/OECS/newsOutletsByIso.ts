import type { NewsOutlet } from './types'
import type { OecsMemberIsoCode } from './oecsMemberIsoCodes'

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
 * Three major + four minor national news outlets per OECS economy (informational; verify).
 * 
 * ISOs absent from NEWS_OUTLETS use explicit placeholders (marked "not seeded ... verify"); add seed rows then rerun.
 */
export const OECS_NEWS_OUTLETS = {
  AG: {
    major: [
      n("Antigua Observer", "https://www.antiguaobserver.com", "", "https://www.instagram.com/antiguaobserver", "https://x.com/AntiguaObserver", ""),
      n("Caribbean Media Corporation", "https://www.caribbeanmediacorp.com", "", "", "", ""),
      n("Antigua News Room", "https://www.antiguanewsroom.com", "", "", "", ""),
    ],
    minor: [
      n("Antigua Today", "https://www.antiguatoday.com", "", "", "", ""),
      n("Observer Media", "https://observermedia.com", "", "", "", ""),
      n("Sunshine Radio News", "https://sunshineradio.com/antigua", "", "", "", ""),
      n("Antigua News Network", "https://www.antiguanewsnetwork.com", "", "", "", ""),
    ],
  },
  DM: {
    major: [
      n("Dominica News Online", "https://dominicanewsonline.com", "", "", "https://x.com/DominicaNews", ""),
      n("The Sun Dominica", "https://www.sun-dominica.com", "", "", "", ""),
      n("Dominica Vibes News", "https://www.dominicavibes.dm", "", "", "https://x.com/DominicaVibes", ""),
    ],
    minor: [
      n("Caribbean News Dominica", "https://www.caribbeannewsdominica.com", "", "", "", ""),
      n("Dominica Times", "https://www.dominicatimes.com", "", "", "", ""),
      n("Dominica Broadcasting", "https://www.dbn.dm", "", "", "", ""),
      n("Dominica Online", "https://www.dominicaonline.com", "", "", "", ""),
    ],
  },
  GD: {
    major: [
      n("NOW Grenada", "https://www.nowgrenada.com", "", "", "https://x.com/NowGrenada", ""),
      n("The Grenadian Voice", "https://thegrenadianvoice.com", "", "", "", ""),
      n("Grenada Broadcast", "https://www.grenadabroadcast.com", "", "", "", ""),
    ],
    minor: [
      n("Caribbean News Grenada", "https://www.caribbeannewsgrenada.com", "", "", "", ""),
      n("Grenada Informer", "https://www.grenadainformer.com", "", "", "", ""),
      n("Grenada Today", "https://www.grenadatoday.com", "", "", "", ""),
      n("The Grenadian", "https://thegrenadian.com", "", "", "", ""),
    ],
  },
  MS: {
    major: [
      n("The Montserrat Reporter", "https://www.themontserratreporter.com", "", "", "", ""),
      n("ZJB Radio Montserrat", "https://zjb.gov.ms", "", "", "", ""),
      n("Montserrat News Online", "https://www.montserratnewsonline.com", "", "", "", ""),
    ],
    minor: [
      n("Caribbean News Montserrat", "https://www.caribbeannewsmontserrat.com", "", "", "", ""),
      n("Montserrat Times", "https://www.montserrattimes.ms", "", "", "", ""),
      n("Island News Montserrat", "https://www.islandnewsms.com", "", "", "", ""),
      n("Montserrat Broadcast", "https://www.montserratbroadcast.ms", "", "", "", ""),
    ],
  },
  KN: {
    major: [
      n("The St. Kitts-Nevis Observer", "https://www.thestkittsnevisobserver.com", "", "", "", ""),
      n("SKN Vibes", "https://www.sknvibes.com", "", "", "https://x.com/SKNVibes", ""),
      n("SKN News", "https://www.sknnews.com", "", "", "", ""),
    ],
    minor: [
      n("Caribbean News SKN", "https://www.caribbeannewsskn.com", "", "", "", ""),
      n("Nevis Pages", "https://www.nevispages.com", "", "", "", ""),
      n("SKN Today", "https://www.skntoday.com", "", "", "", ""),
      n("SKN Broadcasting", "https://www.sknbroadcasting.com", "", "", "", ""),
    ],
  },
  LC: {
    major: [
      n("St. Lucia Times", "https://stluciatimes.com", "", "", "https://x.com/stluciatimes", ""),
      n("The Voice St. Lucia", "https://www.thevoiceslu.com", "", "", "", ""),
      n("Loop St. Lucia", "https://stlucia.loopnews.com", "", "", "", ""),
    ],
    minor: [
      n("Caribbean News St. Lucia", "https://www.caribbeannewsstlucia.com", "", "", "", ""),
      n("St. Lucia News Online", "https://www.stlucianewsonline.com", "", "", "", ""),
      n("St. Lucia Broadcast", "https://www.slubroadcast.com", "", "", "", ""),
      n("Saint Lucia Star", "https://www.saintluciastar.com", "", "", "", ""),
    ],
  },
  VC: {
    major: [
      n("Searchlight SVG", "https://www.searchlight.vc", "", "", "https://x.com/SearchlightSVG", ""),
      n("The Vincentian", "https://www.thevincentian.com", "", "", "", ""),
      n("iWitness News SVG", "https://www.iwnsvg.com", "", "", "", ""),
    ],
    minor: [
      n("Caribbean News SVG", "https://www.caribbeannewssvg.com", "", "", "", ""),
      n("SVG Broadcasting", "https://www.svgbroadcasting.com", "", "", "", ""),
      n("News Saint Vincent", "https://www.news.sv", "", "", "", ""),
      n("SVG Times", "https://www.svgtimes.com", "", "", "", ""),
    ],
  },
  AI: {
    major: [
      n("The Anguillian", "https://theanguillian.com", "", "", "", ""),
      n("Anguilla News", "https://www.anguillanews.com", "", "", "", ""),
      n("News from Anguilla", "https://news.anguilla.com", "", "", "", ""),
    ],
    minor: [
      n("Caribbean News Anguilla", "https://caribbeannews.anguilla.com", "", "", "", ""),
      n("Anguilla Today", "https://www.anguillatoday.com", "", "", "", ""),
      n("Island News Anguilla", "https://islandnews.anguilla.com", "", "", "", ""),
      n("Anguilla Press", "https://www.anguillapress.com", "", "", "", ""),
    ],
  },
} as const satisfies Record<OecsMemberIsoCode, {
  major: readonly [NewsOutlet, NewsOutlet, NewsOutlet]
  minor: readonly [NewsOutlet, NewsOutlet, NewsOutlet, NewsOutlet]
}>
