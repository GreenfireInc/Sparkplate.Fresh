import type { NewsOutlet } from './types'
import type { EcowasMemberIsoCode } from './ecowasMemberIsoCodes'

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
 * Three major + four minor national news outlets per ECOWAS economy (informational; verify).
 * 
 * ISOs absent from NEWS_OUTLETS use explicit placeholders (marked "not seeded ... verify"); add seed rows then rerun.
 */
export const ECOWAS_NEWS_OUTLETS = {
  BJ: {
    major: [
      n("ORTB", "https://ortb.bj", "", "https://instagram.com/ortb_benin", "https://x.com/ORTBBenin", ""),
      n("La Nation", "https://lanation.bj", "contact@lanation.bj", "", "", ""),
      n("24 Heures au Bénin", "https://24haubenin.info", "", "", "", ""),
    ],
    minor: [
      n("Benin Web TV", "https://beninwebtv.com", "", "", "", ""),
      n("Le Matinal", "https://lematinal.bj", "", "", "", ""),
      n("Fraternité", "https://fraternitebj.info", "", "", "", ""),
      n("Banouto", "https://banouto.bj", "", "", "", ""),
    ],
  },
  CV: {
    major: [
      n("RTC", "https://rtc.cv", "", "", "", ""),
      n("Inforpress", "https://inforpress.cv", "geral@inforpress.cv", "", "", ""),
      n("A Nação", "https://anacao.cv", "", "", "", ""),
    ],
    minor: [
      n("Santiago Magazine", "https://santiagomagazine.cv", "", "", "", ""),
      n("Expresso das Ilhas", "https://expressodasilhas.cv", "", "", "", ""),
      n("Balai CV", "https://balai.cv", "", "", "", ""),
      n("Criolo News", "https://criolo.news", "", "", "", ""),
    ],
  },
  GM: {
    major: [
      n("GRTS", "https://grts.gm", "", "", "", ""),
      n("The Point", "https://thepoint.gm", "", "", "", ""),
      n("Foroyaa", "https://foroyaa.gm", "", "", "", ""),
    ],
    minor: [
      n("Kerr Fatou", "https://kerrfatou.com", "", "", "", ""),
      n("What’s On-Gambia", "https://whatson-gambia.com", "", "", "", ""),
      n("Fatunetwork", "https://fatunetwork.net", "", "", "", ""),
      n("Gainako", "https://gainako.com", "", "", "", ""),
    ],
  },
  GH: {
    major: [
      n("Graphic Online", "https://www.graphic.com.gh", "info@graphic.com.gh", "https://www.instagram.com/graphicghana", "https://x.com/graphicgh", ""),
      n("Joy News", "https://www.myjoyonline.com", "", "https://www.instagram.com/joynewsontv", "https://x.com/JoyNewsOnTV", ""),
      n("Citi Newsroom", "https://citinewsroom.com", "", "https://www.instagram.com/citinewsroom", "https://x.com/Citi973", ""),
    ],
    minor: [
      n("GhanaWeb", "https://www.ghanaweb.com", "", "", "https://x.com/ghanaweb", ""),
      n("Pulse Ghana", "https://www.pulse.com.gh", "", "https://www.instagram.com/pulseghana", "https://x.com/PulseGhana", ""),
      n("Peace FM Online", "https://www.peacefmonline.com", "", "", "", ""),
      n("Adom Online", "https://www.adomonline.com", "", "", "", ""),
    ],
  },
  GN: {
    major: [
      n("RTG", "https://rtg.gov.gn", "", "", "", ""),
      n("Guinee Matin", "https://guineematin.com", "", "", "", ""),
      n("Africa Guinee", "https://africaguinee.com", "", "", "", ""),
    ],
    minor: [
      n("GuineeNews", "https://guineenews.org", "", "", "", ""),
      n("Vision Guinée", "https://visionguinee.info", "", "", "", ""),
      n("Mosaique Guinée", "https://mosaiqueguinee.com", "", "", "", ""),
      n("Conakry Infos", "https://conakryinfos.com", "", "", "", ""),
    ],
  },
  GW: {
    major: [
      n("RTGB", "https://rtgb.gw", "", "", "", ""),
      n("O Democrata", "https://odemocratagb.com", "", "", "", ""),
      n("ANG", "https://ang.gw", "", "", "", ""),
    ],
    minor: [
      n("Bissau Digital", "https://bissaudigital.com", "", "", "", ""),
      n("Última Hora", "https://ultimahora.gw", "", "", "", ""),
      n("GBissau Media", "https://gbissau.com", "", "", "", ""),
      n("Djemberem News", "https://djemberem.com", "", "", "", ""),
    ],
  },
  CI: {
    major: [
      n("RTI", "https://rti.ci", "", "", "https://x.com/RTIOfficiel", ""),
      n("Fraternité Matin", "https://fratmat.info", "", "", "", ""),
      n("Abidjan.net", "https://abidjan.net", "", "", "", ""),
    ],
    minor: [
      n("Koaci CI", "https://koaci.com", "", "", "", ""),
      n("Linfodrome", "https://linfodrome.com", "", "", "", ""),
      n("Connection Ivoirienne", "https://connectionivoirienne.net", "", "", "", ""),
      n("Afrique Sur 7", "https://afriquesur7.fr", "", "", "", ""),
    ],
  },
  LR: {
    major: [
      n("Liberia Broadcasting System", "https://lbs.gov.lr", "", "", "", ""),
      n("FrontPage Africa", "https://frontpageafricaonline.com", "", "", "", ""),
      n("Daily Observer", "https://liberiaobserver.com", "", "", "", ""),
    ],
    minor: [
      n("The New Dawn", "https://thenewdawnliberia.com", "", "", "", ""),
      n("The Analyst", "https://analystliberia.com", "", "", "", ""),
      n("Bush Chicken", "https://bushchicken.com", "", "", "", ""),
      n("Liberian Investigator", "https://liberianinvestigator.com", "", "", "", ""),
    ],
  },
  NG: {
    major: [
      n("Punch", "https://punchng.com", "", "https://instagram.com/punchnewspaper", "https://x.com/punchnewspaper", ""),
      n("The Guardian Nigeria", "https://guardian.ng", "", "", "", ""),
      n("Channels TV", "https://channelstv.com", "", "", "https://x.com/channelstv", ""),
    ],
    minor: [
      n("Sahara Reporters", "https://saharareporters.com", "", "", "", ""),
      n("Premium Times", "https://premiumtimesng.com", "", "", "", ""),
      n("Legit.ng", "https://legit.ng", "", "", "", ""),
      n("The Cable", "https://thecable.ng", "", "", "", ""),
    ],
  },
  SN: {
    major: [
      n("RTS", "https://rts.sn", "", "", "", ""),
      n("Seneweb", "https://seneweb.com", "", "", "", ""),
      n("Le Soleil", "https://lesoleil.sn", "", "", "", ""),
    ],
    minor: [
      n("Dakaractu", "https://dakaractu.com", "", "", "", ""),
      n("Senego", "https://senego.com", "", "", "", ""),
      n("PressAfrik", "https://pressafrik.com", "", "", "", ""),
      n("IGFM", "https://igfm.sn", "", "", "", ""),
    ],
  },
  SL: {
    major: [
      n("SLBC", "https://slbc.sl", "", "", "", ""),
      n("Awoko", "https://awokonewspaper.sl", "", "", "", ""),
      n("Cocorioko", "https://cocorioko.net", "", "", "", ""),
    ],
    minor: [
      n("Politico SL", "https://politicosl.com", "", "", "", ""),
      n("The Sierra Leone Telegraph", "https://thesierraleonetelegraph.com", "", "", "", ""),
      n("Awareness Times", "https://awarenesstimes.com", "", "", "", ""),
      n("Salone Times", "https://salonetimes.sl", "", "", "", ""),
    ],
  },
  TG: {
    major: [
      n("TVT", "https://tvt.tg", "", "", "", ""),
      n("Togo Presse", "https://togopresse.tg", "", "", "", ""),
      n("Republic of Togo News", "https://republicoftogo.com", "", "", "", ""),
    ],
    minor: [
      n("Togo Actualité", "https://togoactualite.com", "", "", "", ""),
      n("Afriquinfos Togo", "https://afriquinfos.com/togo", "", "", "", ""),
      n("Lome Infos", "https://lomeinfos.com", "", "", "", ""),
      n("Gapola", "https://gapola.tg", "", "", "", ""),
    ],
  },
} as const satisfies Record<EcowasMemberIsoCode, {
  major: readonly [NewsOutlet, NewsOutlet, NewsOutlet]
  minor: readonly [NewsOutlet, NewsOutlet, NewsOutlet, NewsOutlet]
}>
