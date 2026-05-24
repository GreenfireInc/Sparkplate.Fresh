import type { NewsOutlet } from './types'
import type { CaricomMemberIsoCode } from './caricomMemberIsoCodes'

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
 * Three major + four minor national news outlets per CARICOM economy (informational; verify).
 * 
 * ISOs absent from NEWS_OUTLETS use explicit placeholders (marked "not seeded ... verify"); add seed rows then rerun.
 */
export const CARICOM_NEWS_OUTLETS = {
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
  BS: {
    major: [
      n("The Nassau Guardian", "https://www.thenassauguardian.com", "", "", "https://x.com/NassauGuardian", ""),
      n("The Tribune", "https://www.tribune242.com", "", "", "https://x.com/tribune242", ""),
      n("Bahamas Press", "https://www.bahamaspress.com", "", "", "https://x.com/bahamaspress", ""),
    ],
    minor: [
      n("Bahamas Weekly", "https://www.bahamasweekly.com", "", "", "", ""),
      n("Bahamas Local News", "https://www.bahamaslocal.com", "", "", "", ""),
      n("Caribbean News Bahamas", "https://caribbeannewsbahamas.com", "", "", "", ""),
      n("Bahamas Tribune Online", "https://www.tribune242.com", "", "", "", ""),
    ],
  },
  BB: {
    major: [
      n("Barbados Today", "https://barbadostoday.bb", "", "https://www.instagram.com/barbadostoday", "https://x.com/BarbadosToday", ""),
      n("Nation News", "https://www.nationnews.com", "", "", "https://x.com/NationNews", ""),
      n("Loop Barbados", "https://barbados.loopnews.com", "", "", "", ""),
    ],
    minor: [
      n("Barbados Advocate", "https://www.barbadosadvocate.com", "", "", "", ""),
      n("Caribbean Broadcasting Corporation", "https://www.cbc.bb", "", "", "", ""),
      n("Today Barbados Online", "https://www.todaybarbadosonline.com", "", "", "", ""),
      n("Barbados Free Press", "https://www.barbadosfreepress.wordpress.com", "", "", "", ""),
    ],
  },
  BZ: {
    major: [
      n("The Belize Times", "https://www.belizetimes.bz", "", "", "https://x.com/BelizeTimes", ""),
      n("Amandala", "https://www.amandala.com.bz", "", "", "https://x.com/AmandalaBZ", ""),
      n("Breaking Belize News", "https://www.breakingbelizenews.com", "", "", "", ""),
    ],
    minor: [
      n("Love FM Belize", "https://lovefm.com", "", "", "", ""),
      n("Channel 5 Belize", "https://edition.channel5belize.com", "", "", "", ""),
      n("News 5 Belize", "https://edition.channel5belize.com/news", "", "", "", ""),
      n("Guardian Belize", "https://guardian.bz", "", "", "", ""),
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
  GY: {
    major: [
      n("Stabroek News", "https://www.stabroeknews.com", "", "", "https://x.com/stabroeknews", ""),
      n("Kaieteur News", "https://www.kaieteurnewsonline.com", "", "", "https://x.com/KaieteurNews", ""),
      n("Guyana Chronicle", "https://guyanachronicle.com", "", "", "", ""),
    ],
    minor: [
      n("Demerara Waves", "https://www.demerarawaves.com", "", "", "https://x.com/DemeraraWaves", ""),
      n("Guyana Standard", "https://www.guyanastandard.com", "", "", "", ""),
      n("Caribbean News Guyana", "https://www.caribbeannewsguyana.com", "", "", "", ""),
      n("News Room Guyana", "https://www.newsroomguyana.com", "", "", "", ""),
    ],
  },
  HT: {
    major: [
      n("Le Nouvelliste", "https://lenouvelliste.com", "", "", "https://x.com/lenouvelliste", ""),
      n("Haiti Libre", "https://www.haitilibre.com", "", "", "", ""),
      n("Loop Haiti", "https://haiti.loopnews.com", "", "", "", ""),
    ],
    minor: [
      n("Haiti Press Network", "https://www.hpnhaiti.com", "", "", "", ""),
      n("Caribbean News Haiti", "https://www.caribbeannewshaiti.com", "", "", "", ""),
      n("Haiti Observer", "https://haiti-observer.com", "", "", "", ""),
      n("Haiti Standard", "https://haitistandard.com", "", "", "", ""),
    ],
  },
  JM: {
    major: [
      n("Jamaica Gleaner", "https://jamaica-gleaner.com", "", "", "https://x.com/jamaicagleaner", ""),
      n("Jamaica Observer", "https://www.jamaicaobserver.com", "", "", "https://x.com/JamaicaObserver", ""),
      n("Loop Jamaica", "https://jamaica.loopnews.com", "", "", "", ""),
    ],
    minor: [
      n("Caribbean News Jamaica", "https://www.caribbeannewsjamaica.com", "", "", "", ""),
      n("RJR News", "https://rjrnewsonline.com", "", "", "", ""),
      n("Nation Jamaica", "https://nationwideradiojm.com", "", "", "", ""),
      n("Jamaica News Online", "https://jamaicanewsonline.com", "", "", "", ""),
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
  SR: {
    major: [
      n("De Ware Tijd", "https://www.dwtonline.com", "", "", "", ""),
      n("Suriname Herald", "https://www.srherald.com", "", "", "", ""),
      n("Starnieuws", "https://www.starnieuws.com", "", "", "", ""),
    ],
    minor: [
      n("Caribbean News Suriname", "https://www.caribbeannewssuriname.com", "", "", "", ""),
      n("Suriname Times", "https://www.surinametimes.com", "", "", "", ""),
      n("Suriname Nieuws", "https://www.surinamenieuws.com", "", "", "", ""),
      n("Radio 10 Suriname", "https://www.radio10.sr", "", "", "", ""),
    ],
  },
  TT: {
    major: [
      n("Trinidad Express", "https://trinidadexpress.com", "", "", "https://x.com/trinidadexpress", ""),
      n("Newsday", "https://newsday.co.tt", "", "", "https://x.com/Newsday_TT", ""),
      n("Guardian TT", "https://www.guardian.co.tt", "", "", "", ""),
    ],
    minor: [
      n("Loop TT", "https://tt.loopnews.com", "", "", "", ""),
      n("Caribbean News TT", "https://www.caribbeannewstt.com", "", "", "", ""),
      n("T&T News Online", "https://www.ttnewsonline.com", "", "", "", ""),
      n("Radio Trinidad", "https://www.radiotrinidad.com", "", "", "", ""),
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
  BM: {
    major: [
      n("The Royal Gazette", "https://www.royalgazette.com", "", "https://www.instagram.com/royalgazette", "https://x.com/royalgazette", ""),
      n("Bermuda Sun", "https://www.bermudasun.bm", "", "", "", ""),
      n("Bernews", "https://www.bernews.com", "", "", "https://x.com/Bernews", ""),
    ],
    minor: [
      n("Loop Bermuda", "https://bermuda.loopnews.com", "", "", "", ""),
      n("Bermuda Broadcasting", "https://www.bbcn.bm", "", "", "", ""),
      n("Caribbean News Bermuda", "https://caribbeannewsbermuda.com", "", "", "", ""),
      n("The Bermuda Reporter", "https://www.thebermudareporter.com", "", "", "", ""),
    ],
  },
  VG: {
    major: [
      n("BVI News", "https://www.bvinews.com", "", "", "https://x.com/BVINews", ""),
      n("Virgin Islands News Online", "https://www.virginislandsnewsonline.com", "", "", "", ""),
      n("BVI Beacon", "https://www.bvibeacon.com", "", "", "", ""),
    ],
    minor: [
      n("BVI News Today", "https://www.bvinewstoday.com", "", "", "", ""),
      n("Island Sun BVI", "https://www.islandsunbvi.com", "", "", "", ""),
      n("Caribbean News BVI", "https://caribbeannewsbvi.com", "", "", "", ""),
      n("BVI Daily News", "https://www.bvidailynews.com", "", "", "", ""),
    ],
  },
  KY: {
    major: [
      n("Cayman Compass", "https://www.caymancompass.com", "", "", "https://x.com/CaymanCompass", ""),
      n("Cayman News Service", "https://www.caymannewsservice.com", "", "", "", ""),
      n("Cayman Reporter", "https://www.caymanreporter.com", "", "", "", ""),
    ],
    minor: [
      n("Loop Cayman", "https://cayman.loopnews.com", "", "", "", ""),
      n("Caymanian Times", "https://www.caymaniantimes.ky", "", "", "", ""),
      n("Cayman News Online", "https://www.caymannewsonline.com", "", "", "", ""),
      n("Caribbean Daily Cayman", "https://www.caribbeandailycayman.com", "", "", "", ""),
    ],
  },
  TC: {
    major: [
      n("Turks and Caicos Weekly News", "https://www.tcweeklynews.com", "", "", "", ""),
      n("Turks and Caicos Sun", "https://www.tcweeklynews.com/sun", "", "", "", ""),
      n("Magnetic Media TCI", "https://www.magneticmediatci.com", "", "", "https://x.com/MagneticMediaTCI", ""),
    ],
    minor: [
      n("Caribbean News TCI", "https://www.caribbeannewstci.com", "", "", "", ""),
      n("TCI Live", "https://www.tcilive.com", "", "", "", ""),
      n("TCI News Now", "https://www.tcinewsnow.com", "", "", "", ""),
      n("Island News TCI", "https://www.islandnewstci.com", "", "", "", ""),
    ],
  },
} as const satisfies Record<CaricomMemberIsoCode, {
  major: readonly [NewsOutlet, NewsOutlet, NewsOutlet]
  minor: readonly [NewsOutlet, NewsOutlet, NewsOutlet, NewsOutlet]
}>
