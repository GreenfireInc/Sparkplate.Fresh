import type { NewsOutlet } from './types'
import type { AuMemberIsoCode } from './auMemberIsoCodes'

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
 * Three major + four minor national news outlets per africanUnion economy (informational; verify).
 */
export const AU_NEWS_OUTLETS = {
  AO: {
    major: [
      n("ANGOP (Agência Angola Press)", "https://www.angop.ao", "info@angop.ao", "https://www.instagram.com/angop.ao/", "https://x.com/angopnews", ""),
      n("TPA (Televisão Pública de Angola)", "https://www.tpa.ao", "info@tpa.ao", "https://www.instagram.com/tpa.angola/", "https://x.com/tpaonline", ""),
      n("Jornal de Angola", "https://www.jornaldeangola.ao", "redacao@jornaldeangola.ao", "https://www.instagram.com/jornaldeangola/", "https://x.com/jornaldeangola", ""),
    ],
    minor: [
      n("O País", "https://opais.ao", "info@opais.ao", "https://www.instagram.com/opais.ao/", "https://x.com/opais", ""),
      n("Club-K", "https://club-k.net", "info@club-k.net", "https://www.instagram.com/clubknews/", "https://x.com/clubknews", ""),
      n("Novo Jornal", "https://novojornal.co.ao", "info@novojornal.co.ao", "https://www.instagram.com/novojornal.ao/", "https://x.com/novojornal", ""),
      n("Correio da Kianda", "https://correiokianda.info", "info@correiokianda.info", "https://www.instagram.com/correiokianda/", "https://x.com/correiokianda", ""),
    ],
  },
  BF: {
    major: [
      n("Sidwaya", "https://www.sidwaya.info", "contact@sidwaya.info", "", "https://x.com/sidwayainfo", ""),
      n("Lefaso.net", "https://lefaso.net", "redaction@lefaso.net", "https://www.instagram.com/lefasonet/", "https://x.com/lefaso_net", ""),
      n("Burkina24", "https://burkina24.com", "info@burkina24.com", "https://www.instagram.com/burkina24/", "https://x.com/burkina24", ""),
    ],
    minor: [
      n("Faso7", "https://faso7.com", "contact@faso7.com", "", "https://x.com/Faso7infos", ""),
      n("Minute.bf", "https://minute.bf", "redaction@minute.bf", "https://www.instagram.com/minute.bf/", "https://x.com/minute_bf", ""),
      n("Wakat Séra", "https://www.wakatsera.com", "redaction@wakatsera.com", "", "https://x.com/WakatSera", ""),
      n("Aujourd’hui au Faso", "https://www.aujourdhui.info", "contact@aujourdhui.info", "", "https://x.com/AujourdhuiFaso", ""),
    ],
  },
  BI: {
    major: [
      n("RTNB", "https://rtnb.bi", "", "", "https://x.com/RTNBurundi", ""),
      n("Iwacu", "https://iwacu-burundi.org", "", "https://instagram.com/iwacu_burundi", "https://x.com/iwacuinfo", ""),
      n("ABP", "https://abpinfos.com", "", "", "", ""),
    ],
    minor: [
      n("Yaga Burundi", "https://yaga-burundi.com", "", "https://instagram.com/yagaburundi", "", ""),
      n("Burundi Eco", "https://burundi-eco.com", "", "", "", ""),
      n("Net Press", "https://netpress.bi", "", "", "", ""),
      n("Bonesha FM", "https://bonesha.bi", "", "", "", ""),
    ],
  },
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
  BW: {
    major: [
      n("Daily News Botswana", "https://www.dailynews.gov.bw", "info@dailynews.gov.bw", "https://www.instagram.com/dailynewsbw/", "https://x.com/dailynewsbw", ""),
      n("Mmegi", "https://www.mmegi.bw", "news@mmegi.bw", "https://www.instagram.com/mmegi/", "https://x.com/mmeginnews", ""),
      n("Botswana Guardian", "https://guardiansun.co.bw", "info@guardiansun.co.bw", "https://www.instagram.com/botswanaguardian/", "https://x.com/guardianbw", ""),
    ],
    minor: [
      n("The Patriot on Sunday", "https://www.thepatriot.co.bw", "editor@thepatriot.co.bw", "https://www.instagram.com/thepatriotbw/", "https://x.com/thepatriotbw", ""),
      n("Weekend Post", "https://www.weekendpost.co.bw", "info@weekendpost.co.bw", "https://www.instagram.com/weekendpostbw/", "https://x.com/weekendpostbw", ""),
      n("The Voice BW", "https://www.thevoicebw.com", "news@thevoicebw.com", "https://www.instagram.com/thevoicebw/", "https://x.com/thevoicebw", ""),
      n("BW News", "https://www.bwnews.co.bw", "info@bwnews.co.bw", "https://www.instagram.com/bwnews/", "https://x.com/bwnews", ""),
    ],
  },
  CD: {
    major: [
      n("Radio Okapi", "https://www.radiookapi.net", "info@radiookapi.net", "https://www.instagram.com/radiookapi/", "https://x.com/radiookapi", ""),
      n("RTNC", "https://www.rtnc.cd", "info@rtnc.cd", "https://www.instagram.com/rtnc_officiel/", "https://x.com/rtnc_officiel", ""),
      n("Actualité.cd", "https://actualite.cd", "info@actualite.cd", "https://www.instagram.com/actualite.cd/", "https://x.com/actualitecd", ""),
    ],
    minor: [
      n("7sur7.cd", "https://www.7sur7.cd", "info@7sur7.cd", "https://www.instagram.com/7sur7.cd/", "https://x.com/7sur7cd", ""),
      n("Media Congo", "https://www.mediacongo.net", "info@mediacongo.net", "https://www.instagram.com/mediacongo/", "https://x.com/mediacongo", ""),
      n("Congo Independent", "https://www.congoindependant.com", "info@congoindependant.com", "https://www.instagram.com/congoindep/", "https://x.com/congoindep", ""),
      n("Congo Presse", "https://congopresse.net", "info@congopresse.net", "https://www.instagram.com/congopresse/", "https://x.com/congopresse", ""),
    ],
  },
  CF: {
    major: [
      n("Radio Ndeke Luka", "https://radiondekeluka.org", "", "", "https://x.com/RNdekeLuka", ""),
      n("RJDH", "https://rjdh.org", "", "", "", ""),
      n("ACAP", "https://acap.cf", "", "", "", ""),
    ],
    minor: [
      n("Corbeau News", "https://corbeaunews-centrafrique.org", "", "", "", ""),
      n("Centrafrique Presse", "https://centrafrique-presse.over-blog.com", "", "", "", ""),
      n("Medias Plus RCA", "https://mediasplusrca.com", "", "", "", ""),
      n("Le Confident", "https://leconfident.net", "", "", "", ""),
    ],
  },
  CG: {
    major: [
      n("ADIAC", "https://adiac-congo.com", "", "", "", ""),
      n("Les Dépêches de Brazzaville", "https://lesdepechesdebrazzaville.fr", "", "", "", ""),
      n("RTV Congo", "https://rtvcongo.cg", "", "", "", ""),
    ],
    minor: [
      n("La Semaine Africaine", "https://lasemaineafricaine.info", "", "", "", ""),
      n("Ziana TV", "https://ziana.tv", "", "", "", ""),
      n("Brazza News", "https://brazzanews.com", "", "", "", ""),
      n("Congo Site", "https://congosite.com", "", "", "", ""),
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
  CM: {
    major: [
      n("CRTV", "https://crtv.cm", "", "https://instagram.com/crtv.cm", "https://x.com/CRTV_web", ""),
      n("Cameroon Tribune", "https://cameroon-tribune.cm", "", "", "", ""),
      n("Journal du Cameroun", "https://journalducameroun.com", "", "", "https://x.com/jdca_news", ""),
    ],
    minor: [
      n("Camer.be", "https://camer.be", "", "", "", ""),
      n("Actu Cameroun", "https://actucameroun.com", "", "", "", ""),
      n("Koaci Cameroun", "https://koaci.com/cameroun", "", "", "", ""),
      n("Cameroun Web", "https://camerounweb.com", "", "", "", ""),
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
  DJ: {
    major: [
      n("ADI (Agence Djiboutienne d’Information)", "https://adi.dj", "", "", "https://x.com/ADI_Djibouti", ""),
      n("RTD (Radiodiffusion Télévision de Djibouti)", "https://rtd.dj", "", "", "", ""),
      n("La Nation", "https://lanation.dj", "", "", "", ""),
    ],
    minor: [
      n("Djibouti Post", "https://djiboutipost.com", "", "", "", ""),
      n("Africa Intelligence (Djibouti section)", "https://africaintelligence.com", "", "", "", ""),
      n("Horn Observer", "https://hornobserver.com", "", "", "", ""),
      n("Somali Dispatch (regional coverage)", "https://somalidispatch.com", "", "", "", ""),
    ],
  },
  DZ: {
    major: [
      n("Algérie Presse Service", "https://www.aps.dz/en", "contact@aps.dz", "https://www.instagram.com/aps.algerie/", "https://x.com/APS_Algerie", ""),
      n("Echorouk", "https://www.echoroukonline.com", "contact@echoroukonline.com", "https://www.instagram.com/echoroukonline/", "https://x.com/echoroukonline", ""),
      n("El Watan", "https://elwatan-dz.com", "redaction@elwatan.com", "https://www.instagram.com/elwatanofficiel/", "https://x.com/elwatancom", ""),
    ],
    minor: [
      n("TSA Algérie", "https://www.tsa-algerie.com", "contact@tsa-algerie.com", "https://www.instagram.com/tsa_algerie/", "https://x.com/TSA_Algerie", ""),
      n("Le Soir d'Algérie", "https://www.lesoirdalgerie.com", "redaction@lesoirdalgerie.com", "", "https://x.com/soir_officiel", ""),
      n("Dzair Daily", "https://www.dzairdaily.com", "contact@dzairdaily.com", "https://www.instagram.com/dzairdaily/", "https://x.com/DzairDaily", ""),
      n("ObservAlgérie", "https://observalgerie.com", "contact@observalgerie.com", "https://www.instagram.com/observalgerie/", "https://x.com/ObservAlgerie", ""),
    ],
  },
  EG: {
    major: [
      n("Al Ahram", "https://english.ahram.org.eg", "gate@ahram.org.eg", "https://www.instagram.com/alahramgate/", "https://x.com/AlAhramGate", ""),
      n("Youm7", "https://www.youm7.com", "editor@youm7.com", "https://www.instagram.com/youm7/", "https://x.com/youm7", ""),
      n("Egypt Today", "https://www.egypttoday.com", "info@egypttoday.com", "https://www.instagram.com/egypttodaymag/", "https://x.com/EgyptTodayMag", ""),
    ],
    minor: [
      n("Mada Masr", "https://www.madamasr.com", "editor@madamasr.com", "https://www.instagram.com/madamasr/", "https://x.com/MadaMasr", ""),
      n("Daily News Egypt", "https://dailynewsegypt.com", "info@dailynewsegypt.com", "https://www.instagram.com/dailynewsegypt/", "https://x.com/DailyNewsEgypt", ""),
      n("Cairo 24", "https://www.cairo24.com", "info@cairo24.com", "https://www.instagram.com/cairo24_/", "https://x.com/cairo24_", ""),
      n("Sada El Balad", "https://www.elbalad.news", "info@elbalad.news", "https://www.instagram.com/elbaladofficial/", "https://x.com/ElBaladOfficial", ""),
    ],
  },
  EH: {
    major: [
      n("SPS — Sahrawi Press Service (Arabic / English / French / Spanish portals)", "https://www.spsrasd.info/", "spsweb@spsrasd.info", "", "https://x.com/SPSRASD", "https://www.spsrasd.info/feed/"),
      n("RASD TV", "https://www.rasd.tv/", "rasd.tv@gmail.com", "", "", ""),
      n("Radio Nacional de la República Árabe Saharaui Democrática (RNRASD)", "https://radio.rasd.tv/", "rasd.radio@gmail.com", "", "", ""),
    ],
    minor: [
      n("Futuro Sahara", "https://futurosahara.com/", "redaccion@futurosahara.com", "", "", ""),
      n("ECS Saharaui — Equipe Media", "https://equipemedia.es/", "equipemediaes@gmail.com", "", "", ""),
      n("Western Sahara Resource Watch (advocacy bulletins)", "https://www.wsrw.org/", "wsrw@wsrw.org", "", "https://x.com/wsrw", "https://www.wsrw.org/index.php?cat_open=4036&id_cat=4036&format=rss"),
      n("Sahara Press / Cadenas saharianas regionales", "https://www.saharapress.com/", "redaccion@saharapress.com", "", "", ""),
    ],
  },
  ER: {
    major: [
      n("Shabait", "https://shabait.com", "", "", "https://x.com/shabait", ""),
      n("Eri-TV", "https://eri.tv", "", "", "", ""),
      n("Haddas Ertra", "https://haddas-ertra.com", "", "", "", ""),
    ],
    minor: [
      n("Asmarino", "https://asmarino.com", "", "", "", ""),
      n("Awate", "https://awate.com", "", "", "https://x.com/awatecom", ""),
      n("TesfaNews", "https://tesfanews.net", "", "", "", ""),
      n("Eritrean Press", "https://eritreanpress.com", "", "", "", ""),
    ],
  },
  ET: {
    major: [
      n("Fana Broadcasting Corporate", "https://fanabc.com", "", "", "https://x.com/fanatelevision", ""),
      n("Ethiopian News Agency (ENA)", "https://ena.et", "", "", "https://x.com/InformationMin", ""),
      n("EBC (Ethiopian Broadcasting Corporation)", "https://ebc.et", "", "", "", ""),
    ],
    minor: [
      n("Addis Standard", "https://addisstandard.com", "", "", "", ""),
      n("The Reporter Ethiopia", "https://thereporterethiopia.com", "", "", "", ""),
      n("Borkena", "https://borkena.com", "", "", "", ""),
      n("Capital Ethiopia", "https://capitalethiopia.com", "", "", "", ""),
    ],
  },
  GA: {
    major: [
      n("Gabon 24", "https://gabon24.ga", "", "", "https://x.com/Gabon24TV", ""),
      n("RTG", "https://rtg.gabon", "", "", "", ""),
      n("L’Union", "https://union.sonapresse.com", "", "", "", ""),
    ],
    minor: [
      n("Gabon Review", "https://gabonreview.com", "", "", "", ""),
      n("Info Gabon", "https://infogabon.ga", "", "", "", ""),
      n("Gabon Media Time", "https://gabonmediatime.com", "", "", "", ""),
      n("Dépeche Gabon", "https://depechegabon.com", "", "", "", ""),
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
  GQ: {
    major: [
      n("TVGE", "https://tvge.gq", "", "", "", ""),
      n("Ahora EG", "https://ahoraeg.com", "", "", "", ""),
      n("Guinea Ecuatorial Press", "https://guineaecuatorialpress.com", "", "", "", ""),
    ],
    minor: [
      n("Real Equatorial Guinea", "https://realequatorialguinea.com", "", "", "", ""),
      n("Diario Rombe", "https://diariorombe.com", "", "", "", ""),
      n("Asonga TV", "https://asongatv.com", "", "", "", ""),
      n("Ébano FM", "https://ebano-fm.com", "", "", "", ""),
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
  KE: {
    major: [
      n("Nation Media Group", "https://nation.africa", "", "", "https://x.com/NationAfrica", ""),
      n("Standard Media Group", "https://standardmedia.co.ke", "", "", "", ""),
      n("Kenya Broadcasting Corporation (KBC)", "https://kbc.co.ke", "", "", "", ""),
    ],
    minor: [
      n("Citizen Digital", "https://citizen.digital", "", "", "", ""),
      n("The Star Kenya", "https://thestarkenya.co.ke", "", "", "", ""),
      n("Tuko", "https://tuko.co.ke", "", "", "", ""),
      n("Kenya Times", "https://kenyatimes.co.ke", "", "", "", ""),
    ],
  },
  KM: {
    major: [
      n("Al-Watwan", "https://alwatwan.net", "info@alwatwan.net", "https://www.instagram.com/alwatwan/", "https://x.com/alwatwan", ""),
      n("ORTC (Office de Radio et Télévision des Comores)", "https://ortc.gouv.km", "info@ortc.gouv.km", "https://www.instagram.com/ortccomores/", "https://x.com/ortccomores", ""),
      n("La Gazette des Comores", "https://lagazettedescomores.com", "redaction@lagazettedescomores.com", "https://www.instagram.com/gazettedescomores/", "https://x.com/gazettedescomores", ""),
    ],
    minor: [
      n("Comores Infos", "https://comoresinfos.net", "info@comoresinfos.net", "https://www.instagram.com/comoresinfos/", "https://x.com/comoresinfos", ""),
      n("Habariza Comores", "https://habarizacomores.com", "info@habarizacomores.com", "https://www.instagram.com/habarizacomores/", "https://x.com/habariza", ""),
      n("Comores Online", "https://comores-online.com", "info@comores-online.com", "https://www.instagram.com/comoresonline/", "https://x.com/comoresonline", ""),
      n("Masiwa News", "https://masiwa.com", "news@masiwa.com", "https://www.instagram.com/masiwa/", "https://x.com/masiwa", ""),
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
  LS: {
    major: [
      n("Lesotho Times", "https://lestimes.com", "news@lestimes.com", "https://www.instagram.com/lesothotimes/", "https://x.com/LesothoTimes", ""),
      n("Public Eye", "https://publiceyenews.com", "info@publiceyenews.com", "https://www.instagram.com/publiceyenews/", "https://x.com/PublicEyeNews", ""),
      n("MoAfrika FM News", "https://www.moafrika.fm", "news@moafrika.fm", "https://www.instagram.com/moafrika_fm/", "https://x.com/moafrika_fm", ""),
    ],
    minor: [
      n("The Post Lesotho", "https://www.thepost.co.ls", "info@thepost.co.ls", "https://www.instagram.com/thepostlesotho/", "https://x.com/thepostlesotho", ""),
      n("Lesotho Daily News", "https://www.lesothodailynews.com", "info@lesothodailynews.com", "https://www.instagram.com/lesothodailynews/", "https://x.com/lesothodaily", ""),
      n("Lena News", "https://www.lena.gov.ls", "info@lena.gov.ls", "https://www.instagram.com/lena_news/", "https://x.com/lena_ls", ""),
      n("Lesotho Guardian", "https://www.lesothoguardian.com", "info@lesothoguardian.com", "https://www.instagram.com/lesothoguardian/", "https://x.com/lesothoguardian", ""),
    ],
  },
  LY: {
    major: [
      n("Libya Observer", "https://libyaobserver.ly", "info@libyaobserver.ly", "https://www.instagram.com/libyaobserver/", "https://x.com/Lyobserver", ""),
      n("218TV", "https://218tv.net", "info@218tv.net", "https://www.instagram.com/218tv/", "https://x.com/218TV", ""),
      n("Libyan Express", "https://www.libyanexpress.com", "info@libyanexpress.com", "https://www.instagram.com/libyanexpress/", "https://x.com/LibyanExpress", ""),
    ],
    minor: [
      n("Address Libya", "https://addresslibya.com", "info@addresslibya.com", "", "https://x.com/AddressLibya", ""),
      n("Afrigate News", "https://www.afrigatenews.net", "info@afrigatenews.net", "", "https://x.com/AfrigateNews", ""),
      n("The Libya Herald", "https://libyaherald.com", "newsroom@libyaherald.com", "", "https://x.com/LibyaHerald", ""),
      n("Febrayer", "https://febrayer.com", "info@febrayer.com", "", "https://x.com/febrayermedia", ""),
    ],
  },
  MA: {
    major: [
      n("Hespress", "https://www.hespress.com", "contact@hespress.com", "https://www.instagram.com/hespress/", "https://x.com/hespress", ""),
      n("Le360", "https://fr.le360.ma", "contact@le360.ma", "https://www.instagram.com/le360officiel/", "https://x.com/Le360fr", ""),
      n("Morocco World News", "https://www.moroccoworldnews.com", "contact@moroccoworldnews.com", "https://www.instagram.com/moroccoworldnews/", "https://x.com/MoroccoWNews", ""),
    ],
    minor: [
      n("Yabiladi", "https://www.yabiladi.com", "contact@yabiladi.com", "https://www.instagram.com/yabiladi/", "https://x.com/yabiladi_fr", ""),
      n("Medias24", "https://medias24.com", "redaction@medias24.com", "https://www.instagram.com/medias24/", "https://x.com/Medias24", ""),
      n("Bladi.net", "https://www.bladi.net", "contact@bladi.net", "", "https://x.com/bladinet", ""),
      n("TelQuel", "https://telquel.ma", "contact@telquel.ma", "https://www.instagram.com/telquelofficiel/", "https://x.com/TelQuelOfficiel", ""),
    ],
  },
  MG: {
    major: [
      n("Midi Madagasikara", "https://www.midi-madagasikara.mg", "info@midi-madagasikara.mg", "https://www.instagram.com/midimadagasikara/", "https://x.com/midimadagascar", ""),
      n("L’Express de Madagascar", "https://www.lexpress.mg", "redaction@lexpress.mg", "https://www.instagram.com/lexpressmg/", "https://x.com/lexpressmg", ""),
      n("Madagascar Tribune", "https://www.madagascar-tribune.com", "info@madagascar-tribune.com", "https://www.instagram.com/madagascartribune/", "https://x.com/madtribune", ""),
    ],
    minor: [
      n("2424.mg", "https://2424.mg", "info@2424.mg", "https://www.instagram.com/2424mg/", "https://x.com/2424mg", ""),
      n("Madagate", "https://www.madagate.org", "info@madagate.org", "https://www.instagram.com/madagate/", "https://x.com/madagate", ""),
      n("News Mada", "https://www.newsmada.com", "info@newsmada.com", "https://www.instagram.com/newsmada/", "https://x.com/newsmada", ""),
      n("Sobika", "https://www.sobika.com", "info@sobika.com", "https://www.instagram.com/sobika/", "https://x.com/sobikanews", ""),
    ],
  },
  ML: {
    major: [
      n("ORTM", "https://ortm.ml", "contact@ortm.ml", "https://www.instagram.com/ortmofficiel/", "https://x.com/ORTMOfficiel", ""),
      n("Maliweb", "https://www.maliweb.net", "contact@maliweb.net", "https://www.instagram.com/maliwebnet/", "https://x.com/MaliwebNet", "https://www.maliweb.net/feed"),
      n("L'Essor", "https://lessor.ml", "redaction@lessor.ml", "", "https://x.com/LessorML", ""),
    ],
    minor: [
      n("Journal du Mali", "https://www.journaldumali.com", "redaction@journaldumali.com", "https://www.instagram.com/journaldumali/", "https://x.com/JourDuMali", ""),
      n("Maliactu", "https://maliactu.net", "contact@maliactu.net", "", "https://x.com/Maliactu", ""),
      n("Studio Tamani", "https://www.studiotamani.org", "studio@studiotamani.org", "https://www.instagram.com/studiotamani/", "https://x.com/StudioTamani", ""),
      n("Bamada.net", "https://bamada.net", "contact@bamada.net", "", "https://x.com/BamadaMali", ""),
    ],
  },
  MR: {
    major: [
      n("Agence Mauritanienne d’Information", "https://ami.mr", "ami@ami.mr", "https://www.instagram.com/agence_ami/", "https://x.com/agence_ami", ""),
      n("Sahara Media", "https://saharamedias.net", "contact@saharamedias.net", "", "https://x.com/SaharaMedias", ""),
      n("Mauriweb", "https://mauriweb.info", "contact@mauriweb.info", "", "https://x.com/MauriwebNews", ""),
    ],
    minor: [
      n("Le Calame", "https://lecalame.info", "redaction@lecalame.info", "", "https://x.com/LeCalameInfo", "https://lecalame.info/rss.xml"),
      n("Al-Akhbar", "https://alakhbar.info", "info@alakhbar.info", "", "https://x.com/AlakhbarInfo", ""),
      n("Kassataya", "https://kassataya.com", "contact@kassataya.com", "", "https://x.com/KassatayaNews", "https://kassataya.com/feed"),
      n("Taqadoum", "https://taqadoum.mr", "contact@taqadoum.mr", "", "https://x.com/Taqadoum_mr", ""),
    ],
  },
  MU: {
    major: [
      n("Defi Media", "https://defimedia.info", "info@defimedia.info", "https://www.instagram.com/defimedia/", "https://x.com/defimedia", ""),
      n("L’Express Mauritius", "https://www.lexpress.mu", "news@lexpress.mu", "https://www.instagram.com/lexpressmu/", "https://x.com/lexpressmu", ""),
      n("Mauritius Broadcasting Corporation (MBC)", "https://mbc.intnet.mu", "info@mbc.intnet.mu", "https://www.instagram.com/mbcmauritius/", "https://x.com/mbcmauritius", ""),
    ],
    minor: [
      n("Le Mauricien", "https://www.lemauricien.com", "info@lemauricien.com", "https://www.instagram.com/lemauricien/", "https://x.com/lemauricien", ""),
      n("Defi Sports", "https://defisports.info", "sports@defimedia.info", "https://www.instagram.com/defisports/", "https://x.com/defisports", ""),
      n("Top FM News", "https://www.topfmradio.com", "info@topfmradio.com", "https://www.instagram.com/topfmradio/", "https://x.com/topfmnews", ""),
      n("Wazaa FM", "https://www.wazaafm.com", "info@wazaafm.com", "https://www.instagram.com/wazaafm/", "https://x.com/wazaafm", ""),
    ],
  },
  MW: {
    major: [
      n("Nyasa Times", "https://www.nyasatimes.com", "news@nyasatimes.com", "https://www.instagram.com/nyasatimes/", "https://x.com/NyasaTimes", ""),
      n("Nation Online", "https://mwnation.com", "news@mwnation.com", "https://www.instagram.com/mwnation/", "https://x.com/mwnation", ""),
      n("Malawi News Agency (MANA)", "https://www.manaonline.gov.mw", "info@manaonline.gov.mw", "https://www.instagram.com/manamalawi/", "https://x.com/manamalawi", ""),
    ],
    minor: [
      n("Maravi Post", "https://www.maravipost.com", "info@maravipost.com", "https://www.instagram.com/maravipost/", "https://x.com/maravipost", ""),
      n("Malawi24", "https://malawi24.com", "info@malawi24.com", "https://www.instagram.com/malawi24/", "https://x.com/malawi24", ""),
      n("Zodiak Online", "https://www.zodiakmalawi.com", "news@zodiakmalawi.com", "https://www.instagram.com/zodiakonline/", "https://x.com/zodiakonline", ""),
      n("Times Malawi", "https://times.mw", "news@times.mw", "https://www.instagram.com/timesmalawi/", "https://x.com/timesmalawi", ""),
    ],
  },
  MZ: {
    major: [
      n("Notícias (Jornal Noticias)", "https://www.jornalnoticias.co.mz", "info@jornalnoticias.co.mz", "https://www.instagram.com/jornalnoticias/", "https://x.com/jnoticias", ""),
      n("RM (Rádio Moçambique)", "https://www.rm.co.mz", "info@rm.co.mz", "https://www.instagram.com/radiomocambique/", "https://x.com/radiomocambique", ""),
      n("O País", "https://opais.co.mz", "info@opais.co.mz", "https://www.instagram.com/opaismz/", "https://x.com/opaismz", ""),
    ],
    minor: [
      n("AIM (Agência de Informação de Moçambique)", "https://www.aim.gov.mz", "info@aim.gov.mz", "https://www.instagram.com/aimnews/", "https://x.com/aimnews", ""),
      n("Mozambique News Agency", "https://www.mozambiquenews.co.mz", "info@mozambiquenews.co.mz", "https://www.instagram.com/moznews/", "https://x.com/moznews", ""),
      n("Club of Mozambique", "https://clubofmozambique.com", "info@clubofmozambique.com", "https://www.instagram.com/clubofmoz/", "https://x.com/clubofmoz", ""),
      n("Zitamar News", "https://zitamar.com", "info@zitamar.com", "https://www.instagram.com/zitamar/", "https://x.com/zitamarnews", ""),
    ],
  },
  NA: {
    major: [
      n("New Era", "https://neweralive.na", "info@newera.com.na", "https://www.instagram.com/newera.na/", "https://x.com/neweranews", ""),
      n("The Namibian", "https://www.namibian.com.na", "news@namibian.com.na", "https://www.instagram.com/thenamibian/", "https://x.com/namibiannews", ""),
      n("NBC (Namibia Broadcasting Corporation)", "https://www.nbc.na", "info@nbc.na", "https://www.instagram.com/nbc_namibia/", "https://x.com/nbcnews", ""),
    ],
    minor: [
      n("Informanté", "https://informante.web.na", "info@informante.web.na", "https://www.instagram.com/informante/", "https://x.com/informante", ""),
      n("Namibia Economist", "https://economist.com.na", "info@economist.com.na", "https://www.instagram.com/namibiaeconomist/", "https://x.com/namibiaeconomist", ""),
      n("Windhoek Observer", "https://www.observer.com.na", "news@observer.com.na", "https://www.instagram.com/windhoekobserver/", "https://x.com/wo_news", ""),
      n("Namibia Sun", "https://www.namibiansun.com", "news@namibiansun.com", "https://www.instagram.com/namibiasun/", "https://x.com/namibiasun", ""),
    ],
  },
  NE: {
    major: [
      n("Le Sahel", "https://www.lesahel.org", "contact@lesahel.org", "", "https://x.com/LeSahelNiger", ""),
      n("ActuNiger", "https://www.actuniger.com", "contact@actuniger.com", "https://www.instagram.com/actuniger/", "https://x.com/actuniger", ""),
      n("Studio Kalangou", "https://www.studiokalangou.org", "contact@studiokalangou.org", "https://www.instagram.com/studiokalangou/", "https://x.com/studio_kalangou", ""),
    ],
    minor: [
      n("Air Info", "https://www.airinfoagadez.com", "contact@airinfoagadez.com", "", "https://x.com/AirInfoAgadez", ""),
      n("Niger Inter", "https://www.nigerinter.com", "contact@nigerinter.com", "", "https://x.com/NigerInter", ""),
      n("Niamey Times", "https://niameytimes.com", "info@niameytimes.com", "", "https://x.com/NiameyTimes", ""),
      n("Le Canard Déchaîné Niger", "https://canarddechaine.com", "contact@canarddechaine.com", "", "https://x.com/CanardNiger", ""),
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
  RW: {
    major: [
      n("The New Times", "https://newtimes.co.rw", "", "", "https://x.com/NewTimesRwanda", ""),
      n("RBA", "https://rba.co.rw", "", "", "", ""),
      n("IGIHE", "https://igihe.com", "", "", "", ""),
    ],
    minor: [
      n("KT Press", "https://ktpress.rw", "", "", "", ""),
      n("Taarifa", "https://taarifa.rw", "", "", "", ""),
      n("Rushyashya", "https://rushyashya.net", "", "", "", ""),
      n("Umuseke", "https://umuseke.rw", "", "", "", ""),
    ],
  },
  SC: {
    major: [
      n("Seychelles News Agency (SNA)", "https://www.seychellesnewsagency.com", "info@seychellesnewsagency.com", "https://www.instagram.com/seynewsagency/", "https://x.com/SeyNewsAgency", ""),
      n("SBC (Seychelles Broadcasting Corporation)", "https://sbc.sc", "info@sbc.sc", "https://www.instagram.com/sbcseychelles/", "https://x.com/sbcseychelles", ""),
      n("Today in Seychelles", "https://www.todayinseychelles.com", "info@todayinseychelles.com", "https://www.instagram.com/todayinseychelles/", "https://x.com/tiseychelles", ""),
    ],
    minor: [
      n("Seychelles Nation", "https://www.nation.sc", "news@nation.sc", "https://www.instagram.com/seychellenation/", "https://x.com/seychellenation", ""),
      n("Seychelles Weekly", "https://www.seychellesweekly.com", "info@seychellesweekly.com", "https://www.instagram.com/seychellesweekly/", "https://x.com/seyweekly", ""),
      n("Seychelles Info", "https://www.seychellesinfo.com", "info@seychellesinfo.com", "https://www.instagram.com/seychellesinfo/", "https://x.com/seyinfo", ""),
      n("Island Development News", "https://www.islandnews.sc", "info@islandnews.sc", "https://www.instagram.com/islandnews.sc/", "https://x.com/islandnews", ""),
    ],
  },
  SD: {
    major: [
      n("SUNA (Sudan News Agency)", "https://suna-news.net", "", "", "", ""),
      n("Sudan TV", "https://sudan-tv.net", "", "", "", ""),
      n("Al Rakoba", "https://alrakoba.net", "", "", "", ""),
    ],
    minor: [
      n("Sudan Tribune", "https://sudantribune.com", "", "", "", ""),
      n("Dabanga Radio", "https://dabangasudan.org", "", "", "", ""),
      n("Sudan Daily", "https://sudandaily.net", "", "", "", ""),
      n("Al Taghyeer", "https://altaghyeer.info", "", "", "", ""),
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
  SO: {
    major: [
      n("SONNA (Somali National News Agency)", "https://sonna.so", "", "", "https://x.com/SONNA_Somalia", ""),
      n("Radio Muqdisho", "https://radiomuqdisho.so", "", "", "", ""),
      n("Goobjoog News", "https://goobjoog.com", "", "", "", ""),
    ],
    minor: [
      n("Hiiraan Online", "https://hiiraan.com", "", "", "", ""),
      n("Somali Guardian", "https://somaliguardian.com", "", "", "", ""),
      n("Garowe Online", "https://garoweonline.com", "", "", "", ""),
      n("Shabelle Media", "https://shabellemedia.com", "", "", "", ""),
    ],
  },
  SS: {
    major: [
      n("SSNA (South Sudan News Agency)", "https://ssna.gov.ss", "", "", "", ""),
      n("SSBC (South Sudan Broadcasting Corporation)", "https://ssbc.gov.ss", "", "", "", ""),
      n("Eye Radio", "https://eyeradio.org", "", "", "", ""),
    ],
    minor: [
      n("Radio Tamazuj", "https://radiotamazuj.org", "", "", "", ""),
      n("Sudan Tribune (SS coverage)", "https://sudantribune.com", "", "", "", ""),
      n("Juba Monitor", "https://jubamonitor.com", "", "", "", ""),
      n("The City Review", "https://cityreviewss.com", "", "", "", ""),
    ],
  },
  ST: {
    major: [
      n("Téla Nón", "https://telanon.info", "", "", "", ""),
      n("STP-Press", "https://stp-press.st", "", "", "", ""),
      n("RTS São Tomé", "https://rtp.st", "", "", "", ""),
    ],
    minor: [
      n("Jornal Transparência", "https://transparencia.st", "", "", "", ""),
      n("STP Digital", "https://stpdigital.net", "", "", "", ""),
      n("O Parvo", "https://oparvo.com", "", "", "", ""),
      n("Sao Tome News", "https://saotomenews.com", "", "", "", ""),
    ],
  },
  SZ: {
    major: [
      n("Times of Eswatini", "https://www.times.co.sz", "news@times.co.sz", "https://www.instagram.com/timesofeswatini/", "https://x.com/timeseswatini", ""),
      n("Eswatini Observer", "https://www.observer.org.sz", "info@observer.org.sz", "https://www.instagram.com/eswatiniobserver/", "https://x.com/eswatiniobserver", ""),
      n("Swazi News", "https://swazinews.co.sz", "info@swazinews.co.sz", "https://www.instagram.com/swazinews/", "https://x.com/swazinews", ""),
    ],
    minor: [
      n("Eswatini Daily News", "https://www.ednews.co.sz", "info@ednews.co.sz", "https://www.instagram.com/eswatini_dailynews/", "https://x.com/ednews_sz", ""),
      n("The Nation Eswatini", "https://www.nation.co.sz", "info@nation.co.sz", "https://www.instagram.com/thenationeswatini/", "https://x.com/thenation_sz", ""),
      n("Mbabane Times", "https://www.mbabane.co.sz", "info@mbabane.co.sz", "https://www.instagram.com/mbabanetimes/", "https://x.com/mbabanetimes", ""),
      n("Swazi Observer Online", "https://www.swaziobserver.org.sz", "info@swaziobserver.org.sz", "https://www.instagram.com/swaziobserver/", "https://x.com/swaziobserver", ""),
    ],
  },
  TD: {
    major: [
      n("Alwihda Info", "https://alwihdainfo.com", "", "", "https://x.com/alwihdainfo", ""),
      n("Tchad Infos", "https://tchadinfos.com", "", "", "", ""),
      n("ONAMA", "https://onama.td", "", "", "", ""),
    ],
    minor: [
      n("Journal du Tchad", "https://journaldutchad.com", "", "", "", ""),
      n("Le Visionnaire", "https://visionnaire.td", "", "", "", ""),
      n("Tchad One", "https://tchadone.com", "", "", "", ""),
      n("Toumaï Web Média", "https://toumaiwebmedias.com", "", "", "", ""),
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
  TN: {
    major: [
      n("Tunis Afrique Presse", "https://www.tap.info.tn/en", "tap@tap.info.tn", "https://www.instagram.com/tapnewsagency/", "https://x.com/TapNewsAgency", ""),
      n("Mosaique FM", "https://www.mosaiquefm.net", "contact@mosaiquefm.net", "https://www.instagram.com/mosaiquefm/", "https://x.com/mosaiquefm", ""),
      n("Business News Tunisia", "https://www.businessnews.com.tn", "redaction@businessnews.com.tn", "", "https://x.com/businessnews_tn", ""),
    ],
    minor: [
      n("Kapitalis", "https://kapitalis.com", "contact@kapitalis.com", "", "https://x.com/Kapitalis_com", ""),
      n("Tunisie Numerique", "https://www.tunisienumerique.com", "contact@tunisienumerique.com", "https://www.instagram.com/tunisienumerique/", "https://x.com/TnNumerique", ""),
      n("Webdo", "https://www.webdo.tn", "contact@webdo.tn", "", "https://x.com/WebdoTunisie", ""),
      n("Tunivisions", "https://tunivisions.net", "contact@tunivisions.net", "https://www.instagram.com/tunivisionsofficiel/", "https://x.com/TunivisionsMag", ""),
    ],
  },
  TZ: {
    major: [
      n("Daily News Tanzania", "https://www.dailynews.co.tz", "info@dailynews.co.tz", "https://www.instagram.com/dailynewstz/", "https://x.com/dailynewstz", ""),
      n("The Citizen", "https://www.thecitizen.co.tz", "news@thecitizen.co.tz", "https://www.instagram.com/thecitizentz/", "https://x.com/TheCitizenTz", ""),
      n("TBC (Tanzania Broadcasting Corporation)", "https://www.tbc.go.tz", "info@tbc.go.tz", "https://www.instagram.com/tbctz/", "https://x.com/tbctz", ""),
    ],
    minor: [
      n("IPP Media", "https://www.ippmedia.com", "info@ippmedia.com", "https://www.instagram.com/ippmedia/", "https://x.com/ippmedia", ""),
      n("Mwananchi", "https://www.mwananchi.co.tz", "news@mwananchi.co.tz", "https://www.instagram.com/mwananchitanzania/", "https://x.com/mwananchitanzania", ""),
      n("The East African", "https://www.theeastafrican.co.ke", "news@eastafrican.co.ke", "https://www.instagram.com/theeastafrican/", "https://x.com/TheEastAfrican", ""),
      n("Zanzibar News", "https://zanzibarnews.co.tz", "info@zanzibarnews.co.tz", "https://www.instagram.com/zanzibarnews/", "https://x.com/zanzibarnews", ""),
    ],
  },
  UG: {
    major: [
      n("New Vision", "https://www.newvision.co.ug", "", "https://www.instagram.com/newvisionuganda", "https://x.com/NewVision_UG", ""),
      n("Daily Monitor", "https://www.monitor.co.ug", "", "https://www.instagram.com/dailymonitor_uganda", "https://x.com/dailymonitor", ""),
      n("Uganda Radio Network", "https://www.ugandaradionetwork.com", "", "", "", ""),
    ],
    minor: [
      n("The Observer Uganda", "https://www.observer.ug", "", "", "", ""),
      n("Chimp Reports", "https://chimpreports.com", "", "", "", ""),
      n("PML Daily", "https://www.pmldaily.com", "", "", "", ""),
      n("The Independent Uganda", "https://www.independent.co.ug", "", "", "", ""),
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
  ZM: {
    major: [
      n("Zambia Daily Mail", "https://www.daily-mail.co.zm", "news@daily-mail.co.zm", "https://www.instagram.com/dailymailzm/", "https://x.com/dailymailzm", ""),
      n("Times of Zambia", "https://www.times.co.zm", "news@times.co.zm", "https://www.instagram.com/timesofzambia/", "https://x.com/timesofzambia", ""),
      n("ZNBC News", "https://www.znbc.co.zm", "info@znbc.co.zm", "https://www.instagram.com/znbcnews/", "https://x.com/znbcnews", ""),
    ],
    minor: [
      n("Lusaka Times", "https://www.lusakatimes.com", "news@lusakatimes.com", "https://www.instagram.com/lusakatimes/", "https://x.com/lusakatimes", ""),
      n("Zambia Reports", "https://zambiareports.com", "info@zambiareports.com", "https://www.instagram.com/zambiareports/", "https://x.com/zambiareports", ""),
      n("Mwebantu", "https://www.mwebantu.com", "info@mwebantu.com", "https://www.instagram.com/mwebantu/", "https://x.com/mwebantu", ""),
      n("Zambian Observer", "https://www.zambianobserver.com", "news@zambianobserver.com", "https://www.instagram.com/zambianobserver/", "https://x.com/zambianobserver", ""),
    ],
  },
  ZW: {
    major: [
      n("The Herald", "https://www.herald.co.zw", "news@herald.co.zw", "https://www.instagram.com/heraldzimbabwe/", "https://x.com/herald_zimbabwe", ""),
      n("ZBC News", "https://www.zbc.co.zw", "info@zbc.co.zw", "https://www.instagram.com/zbcnews/", "https://x.com/zbcnews", ""),
      n("NewsDay Zimbabwe", "https://www.newsday.co.zw", "news@newsday.co.zw", "https://www.instagram.com/newsdayzimbabwe/", "https://x.com/newsdayzimbabwe", ""),
    ],
    minor: [
      n("The Chronicle", "https://www.chronicle.co.zw", "news@chronicle.co.zw", "https://www.instagram.com/chroniclezw/", "https://x.com/chroniclezw", ""),
      n("ZimLive", "https://www.zimlive.com", "info@zimlive.com", "https://www.instagram.com/zimlive/", "https://x.com/zimlive", ""),
      n("NewZimbabwe", "https://www.newzimbabwe.com", "news@newzimbabwe.com", "https://www.instagram.com/newzimbabwe/", "https://x.com/newzimbabwe", ""),
      n("263Chat", "https://www.263chat.com", "info@263chat.com", "https://www.instagram.com/263chat/", "https://x.com/263chat", ""),
    ],
  },
} as const satisfies Record<AuMemberIsoCode, {
  major: readonly [NewsOutlet, NewsOutlet, NewsOutlet]
  minor: readonly [NewsOutlet, NewsOutlet, NewsOutlet, NewsOutlet]
}>
