/**
 * Seed data: 3 major + 4 minor national news outlets per economy.
 * Used by scripts/gen-news-outlets-by-iso.mjs to emit per-module byIso files.
 *
 * Tuple shape mirrors the BRICS courier row:
 *   [name, website, email, instagram, twitter, apiEndpoint]
 *
 * All rows are informational — verify URLs, handles, and feed/API bases before production use.
 */

/**
 * @typedef {[string,string,string,string,string,string]} Row
 * @typedef {{ major: [Row, Row, Row], minor: [Row, Row, Row, Row] }} Pack
 */

/** @param {string} name @param {string} site @param {string} email @param {string} ig @param {string} tw @param {string} api @returns {Row} */
export function n(name, site, email, ig, tw, api) {
  return [name, site, email, ig, tw, api]
}

/** @type {Record<string, Pack>} */
export const NEWS_OUTLETS = {
  // ---------- African Union (55) ----------
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

  // ---------- APEC (21) ----------
  AU: {
    major: [
      n('ABC News (Australia)', 'https://www.abc.net.au/news', 'contact@your.abc.net.au', 'https://www.instagram.com/abcnews_au/', 'https://x.com/abcnews', 'https://www.abc.net.au/news/feed/45910/rss.xml'),
      n('The Sydney Morning Herald', 'https://www.smh.com.au/', 'newsdesk@smh.com.au', 'https://www.instagram.com/smhonline/', 'https://x.com/smh', 'https://www.smh.com.au/rss/feed.xml'),
      n('The Australian', 'https://www.theaustralian.com.au/', 'editor@theaustralian.com.au', 'https://www.instagram.com/theaustralian/', 'https://x.com/australian', 'https://www.theaustralian.com.au/rss'),
    ],
    minor: [
      n('Australian Associated Press (AAP)', 'https://www.aap.com.au/', 'contact@aap.com.au', '', 'https://x.com/AAPNewswire', 'https://www.aap.com.au/feed/'),
      n('The Age (Melbourne)', 'https://www.theage.com.au/', 'newsdesk@theage.com.au', '', 'https://x.com/theage', 'https://www.theage.com.au/rss/feed.xml'),
      n('Guardian Australia', 'https://www.theguardian.com/au', 'editor@theguardian.com', 'https://www.instagram.com/guardianaustralia/', 'https://x.com/GuardianAus', 'https://www.theguardian.com/au/rss'),
      n('SBS News', 'https://www.sbs.com.au/news', 'contactus@sbs.com.au', 'https://www.instagram.com/sbsnews_au/', 'https://x.com/SBSNews', 'https://www.sbs.com.au/news/topic/latest/feed'),
    ],
  },
  BN: {
    major: [
      n('Borneo Bulletin', 'https://borneobulletin.com.bn/', 'news@borneobulletin.com.bn', '', 'https://x.com/BorneoBulletin', 'https://borneobulletin.com.bn/feed/'),
      n('Radio Television Brunei (RTB)', 'https://www.rtb.gov.bn/', 'info@rtb.gov.bn', 'https://www.instagram.com/rtb_brunei/', 'https://x.com/RTBNewsOfficial', ''),
      n('Pelita Brunei', 'https://pelitabrunei.gov.bn/', 'pelita@jpm.gov.bn', '', '', ''),
    ],
    minor: [
      n('The Scoop (Brunei)', 'https://thescoop.co/', 'editor@thescoop.co', 'https://www.instagram.com/scoopbrunei/', 'https://x.com/scoopbrunei', 'https://thescoop.co/feed/'),
      n('BizBrunei', 'https://www.bizbrunei.com/', 'editor@bizbrunei.com', 'https://www.instagram.com/bizbrunei/', 'https://x.com/bizbrunei', 'https://www.bizbrunei.com/feed/'),
      n('Brunei Times Archive (legacy)', 'https://www.bt.com.bn/', 'editor@bt.com.bn', '', '', ''),
      n('Media Permata', 'https://mediapermata.com.bn/', 'editor@mediapermata.com.bn', '', '', ''),
    ],
  },
  CA: {
    major: [
      n('CBC News', 'https://www.cbc.ca/news', 'newscbc@cbc.ca', 'https://www.instagram.com/cbcnews/', 'https://x.com/CBCNews', 'https://www.cbc.ca/cmlink/rss-topstories'),
      n('The Globe and Mail', 'https://www.theglobeandmail.com/', 'newsroom@globeandmail.com', 'https://www.instagram.com/globeandmail/', 'https://x.com/globeandmail', 'https://www.theglobeandmail.com/arc/outboundfeeds/rss/?outputType=xml'),
      n('CTV News', 'https://www.ctvnews.ca/', 'newsdesk@ctv.ca', 'https://www.instagram.com/ctvnews/', 'https://x.com/CTVNews', 'https://www.ctvnews.ca/rss/ctvnews-ca-top-stories-public-rss-1.822009'),
    ],
    minor: [
      n('Toronto Star', 'https://www.thestar.com/', 'newsdesk@thestar.ca', 'https://www.instagram.com/torontostar/', 'https://x.com/TorontoStar', 'https://www.thestar.com/feeds.articles.news.rss'),
      n('National Post', 'https://nationalpost.com/', 'feedback@nationalpost.com', 'https://www.instagram.com/nationalpost/', 'https://x.com/nationalpost', 'https://nationalpost.com/feed/'),
      n('Le Devoir', 'https://www.ledevoir.com/', 'redaction@ledevoir.com', 'https://www.instagram.com/ledevoir/', 'https://x.com/LeDevoir', 'https://www.ledevoir.com/rss/manchettes.xml'),
      n('La Presse', 'https://www.lapresse.ca/', 'webmestre@lapresse.ca', 'https://www.instagram.com/lapresse/', 'https://x.com/LP_LaPresse', 'https://www.lapresse.ca/manchettes/rss'),
    ],
  },
  CL: {
    major: [
      n('El Mercurio', 'https://www.elmercurio.com/', 'extension@mercurio.cl', 'https://www.instagram.com/elmercurio_cl/', 'https://x.com/ElMercurio_cl', ''),
      n('La Tercera', 'https://www.latercera.com/', 'cartas@latercera.com', 'https://www.instagram.com/laterceracom/', 'https://x.com/latercera', 'https://www.latercera.com/feed/'),
      n('Televisión Nacional de Chile (TVN)', 'https://www.tvn.cl/', 'contacto@tvn.cl', 'https://www.instagram.com/tvn/', 'https://x.com/TVN', ''),
    ],
    minor: [
      n('BioBioChile', 'https://www.biobiochile.cl/', 'contacto@biobiochile.cl', 'https://www.instagram.com/biobiochile/', 'https://x.com/biobio', 'https://www.biobiochile.cl/static/rss/'),
      n('El Mostrador', 'https://www.elmostrador.cl/', 'contacto@elmostrador.cl', 'https://www.instagram.com/elmostrador/', 'https://x.com/elmostrador', 'https://www.elmostrador.cl/feed/'),
      n('Cooperativa', 'https://www.cooperativa.cl/', 'cooperativa@cooperativa.cl', 'https://www.instagram.com/cooperativa/', 'https://x.com/Cooperativa', 'https://www.cooperativa.cl/noticias/site/edic/rss.xml'),
      n('CIPER Chile', 'https://www.ciperchile.cl/', 'contacto@ciperchile.cl', 'https://www.instagram.com/ciperchile/', 'https://x.com/ciperchile', 'https://www.ciperchile.cl/feed/'),
    ],
  },
  CN: {
    major: [
      n('People’s Daily Online (Renmin Ribao)', 'http://en.people.cn/', 'webmaster@people.cn', '', 'https://x.com/PDChina', 'http://en.people.cn/rss/90000.xml'),
      n('Xinhua News Agency', 'https://english.news.cn/', 'newsweb@xinhuanet.com', 'https://www.instagram.com/xinhuanews/', 'https://x.com/XHNews', 'http://www.xinhuanet.com/english/rss/chinarss.xml'),
      n('China Central Television (CCTV) / CGTN', 'https://www.cgtn.com/', 'webmaster@cgtn.com', 'https://www.instagram.com/cgtnofficial/', 'https://x.com/CGTNOfficial', 'https://www.cgtn.com/subscribe/rss/section/world.xml'),
    ],
    minor: [
      n('China Daily', 'https://www.chinadaily.com.cn/', 'editor@chinadaily.com.cn', 'https://www.instagram.com/chinadaily/', 'https://x.com/ChinaDaily', 'https://www.chinadaily.com.cn/rss/china_rss.xml'),
      n('Global Times', 'https://www.globaltimes.cn/', 'editor@globaltimes.com.cn', 'https://www.instagram.com/globaltimesnews/', 'https://x.com/globaltimesnews', 'https://www.globaltimes.cn/rss/outbrain.xml'),
      n('South China Morning Post (HK / China coverage)', 'https://www.scmp.com/', 'newsroom@scmp.com', 'https://www.instagram.com/scmpnews/', 'https://x.com/SCMPNews', 'https://www.scmp.com/rss/91/feed'),
      n('Caixin Global', 'https://www.caixinglobal.com/', 'editor@caixin.com', 'https://www.instagram.com/caixinmedia/', 'https://x.com/CaixinOnline', 'https://www.caixinglobal.com/rss/'),
    ],
  },
  HK: {
    major: [
      n('South China Morning Post', 'https://www.scmp.com/', 'newsroom@scmp.com', 'https://www.instagram.com/scmpnews/', 'https://x.com/SCMPNews', 'https://www.scmp.com/rss/91/feed'),
      n('RTHK — Radio Television Hong Kong', 'https://news.rthk.hk/rthk/en/', 'enquiries@rthk.hk', '', 'https://x.com/rthk_enews', 'https://rthk.hk/rthk/news/rss/e_expressnews.xml'),
      n('The Standard', 'https://www.thestandard.com.hk/', 'webmaster@thestandard.com.hk', '', 'https://x.com/StandardOnline', 'https://www.thestandard.com.hk/rss/section.xml?cat=4'),
    ],
    minor: [
      n('Hong Kong Free Press', 'https://hongkongfp.com/', 'contact@hongkongfp.com', 'https://www.instagram.com/hongkongfp/', 'https://x.com/hkfp', 'https://hongkongfp.com/feed/'),
      n('Ming Pao Online', 'https://www.mingpao.com/', 'webmaster@mingpao.com', 'https://www.instagram.com/mingpaonews/', 'https://x.com/mingpaonews', ''),
      n('HK01', 'https://www.hk01.com/', 'editorial@hk01.com', 'https://www.instagram.com/hk01.zone/', 'https://x.com/hk01news', ''),
      n('Apple Daily HK Archive (historical reference)', 'https://collection.news/appledaily/', 'archive@collection.news', '', '', ''),
    ],
  },
  ID: {
    major: [
      n('Kompas', 'https://www.kompas.com/', 'kompas@kompas.com', 'https://www.instagram.com/hariankompas/', 'https://x.com/hariankompas', 'https://www.kompas.com/rss'),
      n('Tempo', 'https://www.tempo.co/', 'redaksi@tempo.co.id', 'https://www.instagram.com/tempodotco/', 'https://x.com/tempodotco', 'https://rss.tempo.co/'),
      n('TVRI — Televisi Republik Indonesia', 'https://www.tvri.go.id/', 'tvri@tvri.go.id', 'https://www.instagram.com/tvrinasional/', 'https://x.com/TVRINasional', ''),
    ],
    minor: [
      n('Detik.com', 'https://www.detik.com/', 'redaksi@detik.com', 'https://www.instagram.com/detikcom/', 'https://x.com/detikcom', 'https://news.detik.com/berita/rss'),
      n('The Jakarta Post', 'https://www.thejakartapost.com/', 'editorial@thejakartapost.com', 'https://www.instagram.com/jakpost/', 'https://x.com/jakpost', 'https://www.thejakartapost.com/rss'),
      n('Antara News', 'https://en.antaranews.com/', 'redaksi@antaranews.com', 'https://www.instagram.com/antaranews/', 'https://x.com/antaranews', 'https://www.antaranews.com/rss/terkini.xml'),
      n('Republika Online', 'https://www.republika.co.id/', 'redaksi@republika.co.id', 'https://www.instagram.com/republikaonline/', 'https://x.com/republikaonline', 'https://www.republika.co.id/rss'),
    ],
  },
  JP: {
    major: [
      n('NHK World-Japan', 'https://www3.nhk.or.jp/nhkworld/', 'info@nhkworld.jp', 'https://www.instagram.com/nhkworld/', 'https://x.com/NHKWORLD_News', 'https://www3.nhk.or.jp/nhkworld/en/news/feeds/'),
      n('The Asahi Shimbun', 'https://www.asahi.com/ajw/', 'iwc@asahi.com', 'https://www.instagram.com/asahishimbun/', 'https://x.com/asahi', 'https://www.asahi.com/ajw/rss/feed.xml'),
      n('The Yomiuri Shimbun / Japan News', 'https://japannews.yomiuri.co.jp/', 'jn-editor@yomiuri.com', 'https://www.instagram.com/japannews_yomiuri/', 'https://x.com/Japan_News', 'https://japannews.yomiuri.co.jp/feed/'),
    ],
    minor: [
      n('The Mainichi', 'https://mainichi.jp/english/', 'webmaster@mainichi.co.jp', 'https://www.instagram.com/themainichi/', 'https://x.com/themainichi', 'https://mainichi.jp/english/rss/etc/mainichi_rss_2_0.xml'),
      n('Nikkei Asia', 'https://asia.nikkei.com/', 'asia.editor@nex.nikkei.co.jp', 'https://www.instagram.com/nikkeiasia/', 'https://x.com/NikkeiAsia', 'https://asia.nikkei.com/rss/feed/nar'),
      n('The Japan Times', 'https://www.japantimes.co.jp/', 'feedback@japantimes.co.jp', 'https://www.instagram.com/japantimes/', 'https://x.com/japantimes', 'https://www.japantimes.co.jp/feed/'),
      n('Kyodo News', 'https://english.kyodonews.net/', 'support@kyodonews.jp', '', 'https://x.com/kyodo_english', 'https://english.kyodonews.net/rss/news.xml'),
    ],
  },
  KR: {
    major: [
      n('Yonhap News Agency', 'https://en.yna.co.kr/', 'webmaster@yna.co.kr', 'https://www.instagram.com/yonhap_news/', 'https://x.com/YonhapNews', 'https://en.yna.co.kr/RSS/news.xml'),
      n('Korean Broadcasting System (KBS World)', 'https://world.kbs.co.kr/', 'world@kbs.co.kr', 'https://www.instagram.com/kbsworld/', 'https://x.com/kbsworld', 'https://world.kbs.co.kr/rss/rss_news.htm?lang=e'),
      n('The Korea Herald', 'https://www.koreaherald.com/', 'editorial@heraldcorp.com', 'https://www.instagram.com/koreaherald/', 'https://x.com/TheKoreaHerald', 'https://www.koreaherald.com/rss/all'),
    ],
    minor: [
      n('The Chosun Ilbo (English)', 'https://www.chosun.com/english/', 'chosun@chosun.com', '', 'https://x.com/Chosun_English', ''),
      n('Hankyoreh (English)', 'https://english.hani.co.kr/', 'english@hani.co.kr', 'https://www.instagram.com/hankyoreh.eng/', 'https://x.com/hankyorehenglsh', 'https://english.hani.co.kr/arti/rss'),
      n('The Korea Times', 'https://www.koreatimes.co.kr/', 'editor@koreatimes.co.kr', 'https://www.instagram.com/koreatimescokr/', 'https://x.com/koreatimescokr', 'https://www.koreatimes.co.kr/www/rss/nation.xml'),
      n('Korea JoongAng Daily', 'https://koreajoongangdaily.joins.com/', 'joongangdaily@joongang.co.kr', 'https://www.instagram.com/koreajoongangdaily/', 'https://x.com/JoongangDaily', 'https://koreajoongangdaily.joins.com/rss/news.xml'),
    ],
  },
  MX: {
    major: [
      n('Reforma', 'https://www.reforma.com/', 'reforma@reforma.com', 'https://www.instagram.com/reformaweb/', 'https://x.com/Reforma', ''),
      n('El Universal', 'https://www.eluniversal.com.mx/', 'contacto@eluniversal.com.mx', 'https://www.instagram.com/eluniversal_mx/', 'https://x.com/El_Universal_Mx', 'https://www.eluniversal.com.mx/rss.xml'),
      n('Televisa Noticias', 'https://noticieros.televisa.com/', 'contacto@televisa.com', 'https://www.instagram.com/noticierostelevisa/', 'https://x.com/NTelevisa_com', 'https://noticieros.televisa.com/rss'),
    ],
    minor: [
      n('La Jornada', 'https://www.jornada.com.mx/', 'webmaster@jornada.com.mx', 'https://www.instagram.com/lajornadaonline/', 'https://x.com/LaJornada', 'https://www.jornada.com.mx/rss/edicion.xml'),
      n('Milenio', 'https://www.milenio.com/', 'webmaster@milenio.com', 'https://www.instagram.com/milenio/', 'https://x.com/Milenio', 'https://www.milenio.com/rss'),
      n('Animal Político', 'https://animalpolitico.com/', 'contacto@animalpolitico.com', 'https://www.instagram.com/animalpolitico/', 'https://x.com/Pajaropolitico', 'https://animalpolitico.com/feed'),
      n('Aristegui Noticias', 'https://aristeguinoticias.com/', 'contacto@aristeguinoticias.com', 'https://www.instagram.com/aristeguinoticias/', 'https://x.com/AristeguiOnline', 'https://aristeguinoticias.com/feed'),
    ],
  },
  MY: {
    major: [
      n('Bernama', 'https://www.bernama.com/en/', 'webmaster@bernama.com', 'https://www.instagram.com/bernamaofficial/', 'https://x.com/bernamadotcom', 'https://www.bernama.com/en/rss/feed.xml'),
      n('The Star (Malaysia)', 'https://www.thestar.com.my/', 'editor@thestar.com.my', 'https://www.instagram.com/thestar_news/', 'https://x.com/staronline', 'https://www.thestar.com.my/rss/news'),
      n('New Straits Times', 'https://www.nst.com.my/', 'webmaster@nst.com.my', 'https://www.instagram.com/newstraitstimes/', 'https://x.com/NST_Online', 'https://www.nst.com.my/news/rss.xml'),
    ],
    minor: [
      n('Malaysiakini', 'https://www.malaysiakini.com/', 'editor@malaysiakini.com', 'https://www.instagram.com/malaysiakini/', 'https://x.com/malaysiakini', 'https://www.malaysiakini.com/news.rss'),
      n('Free Malaysia Today', 'https://www.freemalaysiatoday.com/', 'newsroom@freemalaysiatoday.com', 'https://www.instagram.com/freemalaysiatoday/', 'https://x.com/fmtoday', 'https://www.freemalaysiatoday.com/feed/'),
      n('Malay Mail', 'https://www.malaymail.com/', 'editor@malaymail.com', 'https://www.instagram.com/themalaymail/', 'https://x.com/malaymail', 'https://www.malaymail.com/feed/rss/malaysia'),
      n('The Edge Malaysia', 'https://theedgemalaysia.com/', 'edgenewsdesk@bizedge.com', 'https://www.instagram.com/theedgemalaysia/', 'https://x.com/EdgeMalaysia', 'https://theedgemalaysia.com/rss.xml'),
    ],
  },
  NZ: {
    major: [
      n('RNZ — Radio New Zealand', 'https://www.rnz.co.nz/', 'feedback@rnz.co.nz', 'https://www.instagram.com/rnz_news/', 'https://x.com/radionz', 'https://www.rnz.co.nz/rss/national.xml'),
      n('New Zealand Herald', 'https://www.nzherald.co.nz/', 'newsdesk@nzherald.co.nz', 'https://www.instagram.com/nzherald/', 'https://x.com/nzherald', 'https://www.nzherald.co.nz/arc/outboundfeeds/rss/section/'),
      n('Stuff', 'https://www.stuff.co.nz/', 'webmaster@stuff.co.nz', 'https://www.instagram.com/stuffnz/', 'https://x.com/NZStuff', 'https://www.stuff.co.nz/rss/news/'),
    ],
    minor: [
      n('1News (TVNZ)', 'https://www.1news.co.nz/', 'newsdesk@tvnz.co.nz', 'https://www.instagram.com/1news/', 'https://x.com/1NewsNZ', 'https://www.1news.co.nz/rss'),
      n('Newsroom', 'https://www.newsroom.co.nz/', 'enquiries@newsroom.co.nz', 'https://www.instagram.com/newsroom_nz/', 'https://x.com/newsroom_nz', 'https://www.newsroom.co.nz/feed'),
      n('The Spinoff', 'https://thespinoff.co.nz/', 'editor@thespinoff.co.nz', 'https://www.instagram.com/thespinofftv/', 'https://x.com/TheSpinoffTV', 'https://thespinoff.co.nz/feed/'),
      n('Otago Daily Times', 'https://www.odt.co.nz/', 'editor@odt.co.nz', '', 'https://x.com/ODTNews', 'https://www.odt.co.nz/rss.xml'),
    ],
  },
  PG: {
    major: [
      n('The National', 'https://www.thenational.com.pg/', 'editor@thenational.com.pg', '', 'https://x.com/TheNationalPNG', 'https://www.thenational.com.pg/feed/'),
      n('Post-Courier', 'https://postcourier.com.pg/', 'editor@spp.com.pg', 'https://www.instagram.com/postcourierpng/', 'https://x.com/postcourierPNG', 'https://postcourier.com.pg/feed/'),
      n('EMTV (PNG)', 'https://emtv.com.pg/', 'newsroom@emtv.com.pg', '', 'https://x.com/EmtvNews', 'https://emtv.com.pg/feed/'),
    ],
    minor: [
      n('PNG Loop', 'https://pnglooop.com/', 'editor@pngloop.com', '', '', 'https://pnglooop.com/feed/'),
      n('National Broadcasting Corporation PNG (NBC)', 'https://www.nbc.com.pg/', 'nbc@nbc.com.pg', '', '', ''),
      n('Pacific Mining Watch — PNG section', 'https://www.pacificminingwatch.org/', 'editor@pacificminingwatch.org', '', '', ''),
      n('PNG Business News', 'https://www.pngbusinessnews.com/', 'editor@pngbusinessnews.com', '', '', 'https://www.pngbusinessnews.com/feed/'),
    ],
  },
  PE: {
    major: [
      n('El Comercio Perú', 'https://elcomercio.pe/', 'cartas@comercio.com.pe', 'https://www.instagram.com/elcomercio/', 'https://x.com/elcomercio', 'https://elcomercio.pe/feed/'),
      n('La República Perú', 'https://larepublica.pe/', 'contacto@glr.pe', 'https://www.instagram.com/larepublica_pe/', 'https://x.com/larepublica_pe', 'https://larepublica.pe/arc/outboundfeeds/rss/?outputType=xml'),
      n('TV Perú Noticias', 'https://www.tvperu.gob.pe/noticias', 'contacto@irtp.gob.pe', 'https://www.instagram.com/tvperupe/', 'https://x.com/tvperupe', ''),
    ],
    minor: [
      n('RPP Noticias', 'https://rpp.pe/', 'lectores@rpp.com.pe', 'https://www.instagram.com/rpp_noticias/', 'https://x.com/RPPNoticias', 'https://rpp.pe/feed'),
      n('Gestión', 'https://gestion.pe/', 'contactenos@gestion.pe', '', 'https://x.com/Gestionpe', 'https://gestion.pe/feed/'),
      n('Andina (Agencia Peruana de Noticias)', 'https://www.andina.pe/', 'andina@andina.com.pe', 'https://www.instagram.com/andina_oficial/', 'https://x.com/Agencia_Andina', 'https://www.andina.pe/agencia/feed.aspx'),
      n('IDL-Reporteros', 'https://www.idl-reporteros.pe/', 'idlreporteros@idl-reporteros.pe', '', 'https://x.com/IDL_R', 'https://www.idl-reporteros.pe/feed/'),
    ],
  },
  PH: {
    major: [
      n('Philippine Daily Inquirer', 'https://www.inquirer.net/', 'inq_letters@inquirer.com.ph', 'https://www.instagram.com/inquirerdotnet/', 'https://x.com/inquirerdotnet', 'https://www.inquirer.net/fullfeed'),
      n('GMA News Online', 'https://www.gmanetwork.com/news/', 'feedback@gmanews.com', 'https://www.instagram.com/gmanews/', 'https://x.com/gmanews', 'https://data.gmanetwork.com/gno/rss/news/feed.xml'),
      n('ABS-CBN News', 'https://news.abs-cbn.com/', 'webmaster@abs-cbn.com', 'https://www.instagram.com/abscbnnews/', 'https://x.com/ABSCBNNews', 'https://news.abs-cbn.com/api/rss/news/most-recent'),
    ],
    minor: [
      n('Rappler', 'https://www.rappler.com/', 'desk@rappler.com', 'https://www.instagram.com/rapplerdotcom/', 'https://x.com/rapplerdotcom', 'https://www.rappler.com/feed/'),
      n('The Philippine Star', 'https://www.philstar.com/', 'philstar@philstarmedia.com', 'https://www.instagram.com/philstarnews/', 'https://x.com/PhilippineStar', 'https://www.philstar.com/rss/headlines'),
      n('Manila Bulletin', 'https://mb.com.ph/', 'editorial@mb.com.ph', 'https://www.instagram.com/manilabulletin/', 'https://x.com/manila_bulletin', 'https://mb.com.ph/feed/'),
      n('BusinessWorld', 'https://www.bworldonline.com/', 'webmaster@bworldonline.com', 'https://www.instagram.com/bworldph/', 'https://x.com/bworldph', 'https://www.bworldonline.com/feed/'),
    ],
  },
  RU: {
    major: [
      n('TASS', 'https://tass.com/', 'press@tass.ru', 'https://www.instagram.com/tassagency_news/', 'https://x.com/tassagency_en', 'https://tass.com/rss/v2.xml'),
      n('RIA Novosti', 'https://ria.ru/', 'press@ria.ru', '', 'https://x.com/rianru', 'https://ria.ru/export/rss2/index.xml'),
      n('Channel One Russia', 'https://www.1tv.ru/', 'info@1tv.ru', 'https://www.instagram.com/1tv/', 'https://x.com/Channel_One_Eng', ''),
    ],
    minor: [
      n('Kommersant', 'https://www.kommersant.ru/', 'press@kommersant.ru', '', 'https://x.com/kommersant', 'https://www.kommersant.ru/RSS/news.xml'),
      n('Vedomosti', 'https://www.vedomosti.ru/', 'press@vedomosti.ru', '', 'https://x.com/vedomosti', 'https://www.vedomosti.ru/rss/news'),
      n('Meduza', 'https://meduza.io/en', 'tips@meduza.io', 'https://www.instagram.com/meduzaproject/', 'https://x.com/meduza_en', 'https://meduza.io/rss/en/all'),
      n('The Moscow Times', 'https://www.themoscowtimes.com/', 'newsroom@themoscowtimes.com', 'https://www.instagram.com/themoscowtimes/', 'https://x.com/MoscowTimes', 'https://www.themoscowtimes.com/rss/news'),
    ],
  },
  SG: {
    major: [
      n('The Straits Times', 'https://www.straitstimes.com/', 'stnewsdesk@sph.com.sg', 'https://www.instagram.com/straits_times/', 'https://x.com/STcom', 'https://www.straitstimes.com/news/singapore/rss.xml'),
      n('Channel News Asia (CNA)', 'https://www.channelnewsasia.com/', 'cna_corporate@mediacorp.com.sg', 'https://www.instagram.com/channelnewsasia/', 'https://x.com/ChannelNewsAsia', 'https://www.channelnewsasia.com/rssfeeds/8395986'),
      n('Today Online', 'https://www.todayonline.com/', 'todayonline@mediacorp.com.sg', 'https://www.instagram.com/todayonlinesg/', 'https://x.com/TODAYonline', 'https://www.todayonline.com/feed/rss'),
    ],
    minor: [
      n('The Business Times', 'https://www.businesstimes.com.sg/', 'btnewsdesk@sph.com.sg', '', 'https://x.com/BTtweeting', 'https://www.businesstimes.com.sg/rss'),
      n('MotherShip', 'https://mothership.sg/', 'hello@mothership.sg', 'https://www.instagram.com/mothershipsg/', 'https://x.com/MothershipSG', 'https://mothership.sg/feed/'),
      n('Lianhe Zaobao', 'https://www.zaobao.com.sg/', 'editor@zaobao.com.sg', 'https://www.instagram.com/lianhezaobao/', 'https://x.com/zaobaosg', 'https://www.zaobao.com.sg/rss'),
      n('Yahoo News Singapore', 'https://sg.news.yahoo.com/', 'sgsupport@yahoo.com', '', '', 'https://sg.news.yahoo.com/rss/'),
    ],
  },
  TW: {
    major: [
      n('Central News Agency (CNA Taiwan)', 'https://focustaiwan.tw/', 'feedback@cna.com.tw', 'https://www.instagram.com/cnanewsen/', 'https://x.com/Focus_Taiwan', 'https://feeds.feedburner.com/FocusTaiwanNews'),
      n('Taiwan News', 'https://www.taiwannews.com.tw/', 'webmaster@taiwannews.com.tw', 'https://www.instagram.com/taiwannews/', 'https://x.com/TaiwanNews886', 'https://www.taiwannews.com.tw/en/rss'),
      n('Public Television Service (PTS) Taiwan', 'https://news.pts.org.tw/', 'pr@mail.pts.org.tw', '', 'https://x.com/PTSNews', ''),
    ],
    minor: [
      n('Liberty Times Net', 'https://news.ltn.com.tw/', 'taipeitimes@gmail.com', 'https://www.instagram.com/ltn_news/', 'https://x.com/taipeitimes', 'https://news.ltn.com.tw/rss/all.xml'),
      n('Taipei Times', 'https://www.taipeitimes.com/', 'feedback@taipeitimes.com', 'https://www.instagram.com/taipeitimes/', 'https://x.com/taipeitimes', 'https://www.taipeitimes.com/xml/index.rss'),
      n('United Daily News (UDN)', 'https://www.udn.com/', 'udnonline@udngroup.com', 'https://www.instagram.com/udnnews/', 'https://x.com/udnnews', 'https://udn.com/rssfeed/news/2'),
      n('The News Lens', 'https://international.thenewslens.com/', 'editor@thenewslens.com', 'https://www.instagram.com/thenewslensint/', 'https://x.com/TheNewsLens', 'https://international.thenewslens.com/feed'),
    ],
  },
  TH: {
    major: [
      n('Bangkok Post', 'https://www.bangkokpost.com/', 'newsroom@bangkokpost.com', 'https://www.instagram.com/bangkok_post/', 'https://x.com/BangkokPostNews', 'https://www.bangkokpost.com/rss/data/topstories.xml'),
      n('The Nation Thailand', 'https://www.nationthailand.com/', 'webmaster@nationgroup.com', 'https://www.instagram.com/thenationthailand/', 'https://x.com/Thenationth', 'https://www.nationthailand.com/rss'),
      n('Thai PBS', 'https://www.thaipbs.or.th/', 'info@thaipbs.or.th', 'https://www.instagram.com/thaipbs/', 'https://x.com/ThaiPBS', 'https://news.thaipbs.or.th/rss'),
    ],
    minor: [
      n('Khaosod English', 'https://www.khaosodenglish.com/', 'editor@khaosodenglish.com', 'https://www.instagram.com/khaosodenglish/', 'https://x.com/KhaosodEnglish', 'https://www.khaosodenglish.com/feed/'),
      n('Thai Enquirer', 'https://www.thaienquirer.com/', 'editor@thaienquirer.com', 'https://www.instagram.com/thaienquirer/', 'https://x.com/ThaiEnquirer', 'https://www.thaienquirer.com/feed/'),
      n('Prachatai English', 'https://prachatai.com/english', 'webmaster@prachatai.com', '', 'https://x.com/prachatai_en', 'https://prachatai.com/english/rss.xml'),
      n('Matichon', 'https://www.matichon.co.th/', 'matichon@matichon.co.th', 'https://www.instagram.com/matichononline/', 'https://x.com/MatichonOnline', 'https://www.matichon.co.th/feed'),
    ],
  },
  US: {
    major: [
      n('The Associated Press (AP)', 'https://apnews.com/', 'info@ap.org', 'https://www.instagram.com/apnews/', 'https://x.com/AP', 'https://feeds.apnews.com/rss/apf-topnews'),
      n('Reuters US', 'https://www.reuters.com/world/us/', 'feedback@reuters.com', 'https://www.instagram.com/reuters/', 'https://x.com/Reuters', 'https://feeds.reuters.com/Reuters/domesticNews'),
      n('The New York Times', 'https://www.nytimes.com/', 'nytnews@nytimes.com', 'https://www.instagram.com/nytimes/', 'https://x.com/nytimes', 'https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml'),
    ],
    minor: [
      n('The Washington Post', 'https://www.washingtonpost.com/', 'letters@washpost.com', 'https://www.instagram.com/washingtonpost/', 'https://x.com/washingtonpost', 'https://feeds.washingtonpost.com/rss/national'),
      n('NPR', 'https://www.npr.org/', 'ombudsman@npr.org', 'https://www.instagram.com/npr/', 'https://x.com/NPR', 'https://feeds.npr.org/1001/rss.xml'),
      n('The Wall Street Journal', 'https://www.wsj.com/', 'wsjcontact@wsj.com', 'https://www.instagram.com/wsj/', 'https://x.com/WSJ', 'https://feeds.a.dj.com/rss/RSSWorldNews.xml'),
      n('CNN', 'https://www.cnn.com/', 'editorial@cnn.com', 'https://www.instagram.com/cnn/', 'https://x.com/CNN', 'http://rss.cnn.com/rss/cnn_topstories.rss'),
    ],
  },
  VN: {
    major: [
      n('VnExpress', 'https://e.vnexpress.net/', 'webmaster@vnexpress.net', 'https://www.instagram.com/vnexpress/', 'https://x.com/VnExpress', 'https://vnexpress.net/rss/tin-moi-nhat.rss'),
      n('Vietnam News Agency (VNA / Vietnam+)', 'https://en.vietnamplus.vn/', 'webmaster@vnagency.com.vn', 'https://www.instagram.com/vietnamplus.vn/', 'https://x.com/VietnamPlus_EN', 'https://en.vietnamplus.vn/rss/home.rss'),
      n('Vietnam Television (VTV)', 'https://vtv.vn/', 'webmaster@vtv.vn', 'https://www.instagram.com/vtvgo/', 'https://x.com/VTVOnlineVN', 'https://vtv.vn/trang-chu.rss'),
    ],
    minor: [
      n('Tuoi Tre News', 'https://tuoitrenews.vn/', 'tuoitrenews@tuoitre.com.vn', 'https://www.instagram.com/tuoitre/', 'https://x.com/TuoiTreNews', 'https://tuoitrenews.vn/rss/home.rss'),
      n('Thanh Nien News', 'https://thanhniennews.com/', 'editor@thanhniennews.com', 'https://www.instagram.com/thanhniennews/', 'https://x.com/thanhniennews', 'https://thanhniennews.com/rss'),
      n('VietnamNet Global', 'https://vietnamnet.vn/en', 'editor@vietnamnet.vn', 'https://www.instagram.com/vietnamnet/', 'https://x.com/VietnamNetWS', 'https://vietnamnet.vn/en/rss/feed'),
      n('Saigon Times', 'https://english.thesaigontimes.vn/', 'editor@thesaigontimes.vn', 'https://www.instagram.com/saigontimes/', 'https://x.com/SaigonTimes', 'https://english.thesaigontimes.vn/feed/'),
    ],
  },

  // ---------- Arab League non-AU (12) ----------
  BH: {
    major: [
      n('Gulf Daily News', 'https://www.gdnonline.com/', 'editor@gdnmedia.bh', 'https://www.instagram.com/gulf_daily_news/', 'https://x.com/GDNOnline', 'https://www.gdnonline.com/rss/'),
      n('Bahrain News Agency (BNA)', 'https://www.bna.bh/en/', 'webmaster@bna.bh', '', 'https://x.com/BahrainNA', 'https://www.bna.bh/en/feed/'),
      n('Bahrain TV (Information Affairs Authority)', 'https://www.bahraintv.com/', 'iaa@iaa.gov.bh', '', 'https://x.com/iaagovbh', ''),
    ],
    minor: [
      n('Daily Tribune Bahrain', 'https://www.newsofbahrain.com/', 'editor@dt.bh', '', 'https://x.com/Tribune_Bahrain', 'https://www.newsofbahrain.com/feed/'),
      n('Al Wasat (legacy reference)', 'https://www.alwasatnews.com/', 'info@alwasatnews.com', '', '', 'https://www.alwasatnews.com/news/rss.xml'),
      n('Akhbar Al Khaleej', 'https://www.akhbar-alkhaleej.com/', 'akhbar@akhbar-alkhaleej.com', '', 'https://x.com/akhbarAlKhaleej', ''),
      n('Bahrain Mirror (advocacy)', 'http://bahrainmirror.com/en/', 'editor@bahrainmirror.com', '', 'https://x.com/BahrainMirror', ''),
    ],
  },
  IQ: {
    major: [
      n('Al-Sabaah', 'https://www.alsabaah.iq/', 'webmaster@alsabaah.iq', '', '', ''),
      n('Iraqi Media Network (IMN) / Al-Iraqiya TV', 'https://imn.iq/', 'imn@imn.iq', '', 'https://x.com/imn_iq', ''),
      n('Iraqi News Agency (INA)', 'https://www.ina.iq/eng', 'ina@ina.iq', '', 'https://x.com/inaenglish', 'https://www.ina.iq/rss.php'),
    ],
    minor: [
      n('Rudaw English', 'https://www.rudaw.net/english', 'english@rudaw.net', 'https://www.instagram.com/rudawenglish/', 'https://x.com/RudawEnglish', 'https://www.rudaw.net/english/rss'),
      n('Kurdistan24', 'https://www.kurdistan24.net/en/', 'editor@kurdistan24.net', 'https://www.instagram.com/kurdistan24/', 'https://x.com/k24english', 'https://www.kurdistan24.net/feed/index/en'),
      n('Al Mada Press', 'https://almadapaper.net/', 'webmaster@almadapaper.net', '', '', 'https://almadapaper.net/feed/'),
      n('Shafaq News', 'https://shafaq.com/en', 'shafaqnews@gmail.com', 'https://www.instagram.com/shafaq.news/', 'https://x.com/ShafaqNewsEN', 'https://shafaq.com/en/rss'),
    ],
  },
  JO: {
    major: [
      n('The Jordan Times', 'https://jordantimes.com/', 'editor@jordantimes.com', 'https://www.instagram.com/thejordantimes/', 'https://x.com/JordanTimes', 'https://jordantimes.com/rss.xml'),
      n('Al-Ra’i', 'https://alrai.com/', 'webmaster@alrai.com', '', 'https://x.com/AlraiNewspaper', 'https://alrai.com/rss/news.xml'),
      n('Jordan Television (JRTV) / Al Mamlaka TV', 'https://www.almamlakatv.com/', 'info@almamlakatv.com', '', 'https://x.com/AlmamlakaTV', ''),
    ],
    minor: [
      n('Al-Ghad', 'https://alghad.com/', 'webmaster@alghad.com', '', 'https://x.com/Alghad', 'https://alghad.com/feed/'),
      n('Roya News English', 'https://en.royanews.tv/', 'editor@royanews.tv', 'https://www.instagram.com/roya_jo/', 'https://x.com/Roya_English', 'https://en.royanews.tv/rss/news'),
      n('Ammon News', 'https://www.ammonnews.net/', 'ammonnews@ammonnews.net', '', 'https://x.com/AmmonNews', 'https://www.ammonnews.net/rss/feed.xml'),
      n('Jordan News', 'https://www.jordannews.jo/', 'editor@jordannews.jo', 'https://www.instagram.com/jordannews.jo/', 'https://x.com/jordannews_jo', 'https://www.jordannews.jo/rss/'),
    ],
  },
  KW: {
    major: [
      n('Kuwait News Agency (KUNA)', 'https://www.kuna.net.kw/Default.aspx?language=en', 'webmaster@kuna.net.kw', '', 'https://x.com/kunanews_eng', 'https://www.kuna.net.kw/rss/news.aspx?language=en'),
      n('Kuwait Times', 'https://www.kuwaittimes.com/', 'editor@kuwaittimes.com', 'https://www.instagram.com/kuwait_times/', 'https://x.com/kuwaittimesnews', 'https://www.kuwaittimes.com/feed/'),
      n('Arab Times Kuwait', 'https://www.arabtimesonline.com/', 'editor@arabtimesonline.com', 'https://www.instagram.com/arabtimesonline/', 'https://x.com/Arab_Times', 'https://www.arabtimesonline.com/news/feed/'),
    ],
    minor: [
      n('Al-Qabas', 'https://www.alqabas.com/', 'editor@alqabas.com', '', 'https://x.com/alqabas', 'https://www.alqabas.com/feed/'),
      n('Al-Anba', 'https://www.alanba.com.kw/', 'editor@alanba.com.kw', '', 'https://x.com/alanba_kuwait', 'https://www.alanba.com.kw/feed/'),
      n('Al Rai', 'https://www.alraimedia.com/', 'webmaster@alraimedia.com', '', 'https://x.com/AlraiMedia', 'https://www.alraimedia.com/rssFeed.aspx?nID=1'),
      n('Al-Seyassah', 'http://www.al-seyassah.com/', 'editor@al-seyassah.com', '', '', ''),
    ],
  },
  LB: {
    major: [
      n('An-Nahar', 'https://www.annahar.com/', 'webeditor@annahar.com.lb', 'https://www.instagram.com/annaharlb/', 'https://x.com/Annahar', 'https://www.annahar.com/arabic/rss.xml'),
      n('L’Orient-Le Jour', 'https://www.lorientlejour.com/', 'redaction@lorientlejour.com', 'https://www.instagram.com/lorientlejour/', 'https://x.com/LorientLeJour', 'https://www.lorientlejour.com/rss.xml'),
      n('Tele Liban (Lebanon TV)', 'https://www.teleliban.com.lb/', 'tl@teleliban.com.lb', '', 'https://x.com/TLebanon', ''),
    ],
    minor: [
      n('The Daily Star Lebanon Archive', 'https://www.dailystar.com.lb/', 'editor@dailystar.com.lb', '', 'https://x.com/DailyStarLeb', 'https://www.dailystar.com.lb/RSS.aspx'),
      n('L’Orient Today (English)', 'https://today.lorientlejour.com/', 'oltsupport@lorientlejour.com', 'https://www.instagram.com/lorienttoday/', 'https://x.com/LOrientToday', 'https://today.lorientlejour.com/feed.rss'),
      n('LBCI Lebanon', 'https://www.lbcgroup.tv/', 'communication@lbci.com.lb', 'https://www.instagram.com/lbcilebanon/', 'https://x.com/lbcgroup', 'https://www.lbcgroup.tv/RSS-feed/0/0/News'),
      n('National News Agency (NNA Lebanon)', 'https://nna-leb.gov.lb/en', 'nna@nna-leb.gov.lb', '', 'https://x.com/NNAlebanon', 'https://nna-leb.gov.lb/en/rss'),
    ],
  },
  OM: {
    major: [
      n('Times of Oman', 'https://timesofoman.com/', 'editor@timesofoman.com', 'https://www.instagram.com/timesofoman/', 'https://x.com/timesofoman', 'https://timesofoman.com/rss/news.xml'),
      n('Oman News Agency (ONA)', 'https://omannews.gov.om/', 'webmaster@omannews.gov.om', '', 'https://x.com/ONAnews', 'https://omannews.gov.om/rss/news.xml'),
      n('Oman TV (Ministry of Information)', 'https://omantv.tv/', 'omantv@omantv.tv', '', 'https://x.com/OmanTVOfficial', ''),
    ],
    minor: [
      n('Muscat Daily', 'https://www.muscatdaily.com/', 'editor@muscatdaily.com', 'https://www.instagram.com/muscat_daily/', 'https://x.com/Muscat_Daily', 'https://www.muscatdaily.com/feed/'),
      n('Oman Observer', 'https://www.omanobserver.om/', 'editor@omanobserver.om', 'https://www.instagram.com/oman_observer/', 'https://x.com/OmanObserver_om', 'https://www.omanobserver.om/feed/'),
      n('Al-Watan Oman', 'https://alwatan.com/', 'webmaster@alwatan.com', '', 'https://x.com/AlwatanNewspape', 'https://alwatan.com/feed/'),
      n('Atheer (Arabic)', 'https://www.atheer.om/', 'info@atheer.om', '', 'https://x.com/AtheerOM', 'https://www.atheer.om/feed/'),
    ],
  },
  PS: {
    major: [
      n('Wafa News Agency', 'https://english.wafa.ps/', 'wafa@wafa.ps', '', 'https://x.com/WAFANewsEnglish', 'https://english.wafa.ps/rss/news.xml'),
      n('Palestine TV', 'https://www.pbc.ps/', 'pbc@pbc.ps', '', 'https://x.com/PalestineTV', ''),
      n('Maan News Agency', 'https://www.maannews.com/', 'maan@maannews.net', '', 'https://x.com/maannews', 'https://www.maannews.com/RSS/news.xml'),
    ],
    minor: [
      n('Al-Quds Al-Arabi', 'https://www.alquds.co.uk/', 'info@alquds.co.uk', 'https://www.instagram.com/alqudsalarabi/', 'https://x.com/alqudsalarabi', 'https://www.alquds.co.uk/feed/'),
      n('Al-Hadath Online', 'https://www.alhadath.ps/', 'info@alhadath.ps', '', '', 'https://www.alhadath.ps/rss/news.xml'),
      n('Al-Resalah Net', 'https://alresalah.ps/', 'info@alresalah.ps', '', 'https://x.com/AlresalahPs', ''),
      n('Quds News Network', 'https://qudsn.co/', 'info@qudsn.co', 'https://www.instagram.com/qudsn/', 'https://x.com/QudsNen', 'https://qudsn.co/rss'),
    ],
  },
  QA: {
    major: [
      n('Al Jazeera English', 'https://www.aljazeera.com/', 'feedback@aljazeera.net', 'https://www.instagram.com/aljazeeraenglish/', 'https://x.com/AJEnglish', 'https://www.aljazeera.com/xml/rss/all.xml'),
      n('Qatar News Agency (QNA)', 'https://www.qna.org.qa/en', 'qna@qna.org.qa', '', 'https://x.com/QNAEnglish', 'https://www.qna.org.qa/en/feed'),
      n('Qatar TV', 'https://www.qatartv.qa/', 'qatartv@qatartv.qa', '', 'https://x.com/qatartv', ''),
    ],
    minor: [
      n('The Peninsula Qatar', 'https://thepeninsulaqatar.com/', 'editor@pencompany.com', 'https://www.instagram.com/thepeninsulaqatar/', 'https://x.com/peninsulaqatar', 'https://thepeninsulaqatar.com/feed/'),
      n('Gulf Times', 'https://www.gulf-times.com/', 'editor@gulf-times.com', '', 'https://x.com/GulfTimes_QATAR', 'https://www.gulf-times.com/RSS'),
      n('Doha News', 'https://dohanews.co/', 'editorial@dohanews.co', 'https://www.instagram.com/dohanews/', 'https://x.com/dohanews', 'https://dohanews.co/feed/'),
      n('Al-Sharq Newspaper', 'https://al-sharq.com/', 'webmaster@al-sharq.com', '', 'https://x.com/AlsharqDoha', 'https://al-sharq.com/feed/'),
    ],
  },
  SA: {
    major: [
      n('Saudi Press Agency (SPA)', 'https://www.spa.gov.sa/en', 'webmaster@spa.gov.sa', '', 'https://x.com/SPAregions', 'https://www.spa.gov.sa/feed.php?lang=en'),
      n('Al Arabiya', 'https://english.alarabiya.net/', 'editor@alarabiya.net', 'https://www.instagram.com/alarabiya/', 'https://x.com/AlArabiya_Eng', 'https://english.alarabiya.net/.mrss/en.xml'),
      n('Arab News', 'https://www.arabnews.com/', 'webmaster@arabnews.com', 'https://www.instagram.com/arabnews/', 'https://x.com/arabnews', 'https://www.arabnews.com/rss/saudi-arabia'),
    ],
    minor: [
      n('Saudi Gazette', 'https://saudigazette.com.sa/', 'newsdesk@saudigazette.com.sa', '', 'https://x.com/Saudi_Gazette', 'https://saudigazette.com.sa/feed/'),
      n('Asharq Al-Awsat', 'https://english.aawsat.com/', 'webmaster@aawsat.com', 'https://www.instagram.com/aawsatenglish/', 'https://x.com/aawsat_eng', 'https://english.aawsat.com/feed'),
      n('Al-Riyadh Daily', 'https://www.alriyadh.com/', 'newsroom@alriyadh.com', '', 'https://x.com/AlriyadhDaily', 'https://www.alriyadh.com/rss/articles.xml'),
      n('Okaz', 'https://www.okaz.com.sa/', 'editor@okaz.com.sa', '', 'https://x.com/OKAZ_online', 'https://www.okaz.com.sa/rss'),
    ],
  },
  SY: {
    major: [
      n('SANA — Syrian Arab News Agency', 'https://sana.sy/en/', 'webmaster@sana.sy', '', 'https://x.com/sanaenofficial', 'https://sana.sy/en/?feed=rss2'),
      n('Tishreen', 'https://tishreen.news.sy/', 'webmaster@tishreen.news.sy', '', '', 'https://tishreen.news.sy/?feed=rss2'),
      n('Syrian Radio and TV (ORTAS)', 'https://www.rtv.gov.sy/', 'rtv@rtv.gov.sy', '', 'https://x.com/ORTAS_OFFICIAL', ''),
    ],
    minor: [
      n('Enab Baladi', 'https://english.enabbaladi.net/', 'editor@enabbaladi.net', 'https://www.instagram.com/enabbaladi/', 'https://x.com/enabbaladienglish', 'https://english.enabbaladi.net/feed/'),
      n('Syria Direct', 'https://syriadirect.org/', 'info@syriadirect.org', '', 'https://x.com/syria_direct', 'https://syriadirect.org/feed/'),
      n('North Press Agency', 'https://npasyria.com/en/', 'info@npasyria.com', '', 'https://x.com/NPA_English', 'https://npasyria.com/en/feed/'),
      n('Al-Watan', 'https://alwatan.sy/', 'info@alwatan.sy', '', '', 'https://alwatan.sy/feed'),
    ],
  },
  AE: {
    major: [
      n('Khaleej Times', 'https://www.khaleejtimes.com/', 'editor@khaleejtimes.com', 'https://www.instagram.com/khaleejtimes/', 'https://x.com/khaleejtimes', 'https://www.khaleejtimes.com/rss/uae'),
      n('Gulf News', 'https://gulfnews.com/', 'readers@gulfnews.com', 'https://www.instagram.com/gulfnews/', 'https://x.com/gulf_news', 'https://gulfnews.com/rss?path=uae'),
      n('The National (UAE)', 'https://www.thenationalnews.com/', 'newsdesk@thenational.ae', 'https://www.instagram.com/thenational/', 'https://x.com/TheNationalNews', 'https://www.thenationalnews.com/arc/outboundfeeds/rss/?outputType=xml'),
    ],
    minor: [
      n('WAM — Emirates News Agency', 'https://wam.ae/en', 'webmaster@wam.ae', '', 'https://x.com/wamnewsenglish', 'https://wam.ae/en/rss'),
      n('Al Bayan', 'https://www.albayan.ae/', 'info@albayan.ae', '', 'https://x.com/AlBayanNews', 'https://www.albayan.ae/rss/feed.xml'),
      n('Emirates 24|7', 'https://www.emirates247.com/', 'webmaster@emirates247.com', '', 'https://x.com/Emirates247', 'https://www.emirates247.com/feed'),
      n('Arabian Business', 'https://www.arabianbusiness.com/', 'editor@arabianbusiness.com', 'https://www.instagram.com/arabianbusiness/', 'https://x.com/ArabianBusiness', 'https://www.arabianbusiness.com/feed'),
    ],
  },
  YE: {
    major: [
      n('SABA — Yemen News Agency', 'https://www.saba.ye/en/', 'webmaster@saba.ye', '', 'https://x.com/sabanew_eng', 'https://www.saba.ye/en/news.xml'),
      n('Yemen TV (Sana’a) / Aden TV', 'https://www.yementv.gov.ye/', 'yementv@yementv.gov.ye', '', '', ''),
      n('Yemen Times Archive (reference)', 'https://www.yementimes.com/', 'editor@yementimes.com', '', '', ''),
    ],
    minor: [
      n('Al-Masdar Online', 'https://almasdaronline.com/', 'info@almasdaronline.com', '', 'https://x.com/almasdaronline', 'https://almasdaronline.com/feed/'),
      n('Yemen Post', 'https://www.yemenpost.net/', 'editor@yemenpost.net', '', '', ''),
      n('Almahriah TV (Mahra)', 'https://almahriah.net/', 'editor@almahriah.net', '', '', ''),
      n('Belqees TV', 'https://www.belqees.tv/', 'info@belqees.tv', '', 'https://x.com/Belqees_TV', ''),
    ],
  },

  // ---------- ASEAN non-APEC (4) ----------
  KH: {
    major: [
      n('Phnom Penh Post', 'https://www.phnompenhpost.com/', 'editor@phnompenhpost.com', 'https://www.instagram.com/phnompenhpost/', 'https://x.com/phnompenhpost', 'https://www.phnompenhpost.com/rss.xml'),
      n('Khmer Times', 'https://www.khmertimeskh.com/', 'newsroom@khmertimeskh.com', 'https://www.instagram.com/khmertimes/', 'https://x.com/khmertimes', 'https://www.khmertimeskh.com/feed/'),
      n('AKP — Agence Kampuchea Presse', 'https://www.akp.gov.kh/', 'akp@akp.gov.kh', '', 'https://x.com/akp_english', 'https://www.akp.gov.kh/feed/'),
    ],
    minor: [
      n('VOD English Archive (legacy reference)', 'https://vodenglish.news/', 'editor@vodenglish.news', '', 'https://x.com/vodenglish', 'https://vodenglish.news/feed/'),
      n('CamboJA News', 'https://cambojanews.com/', 'editor@cambojanews.com', '', 'https://x.com/CamboJAnews', 'https://cambojanews.com/feed/'),
      n('Cambodianess', 'https://cambodianess.com/', 'editor@cambodianess.com', '', 'https://x.com/Cambodianess', 'https://cambodianess.com/feed/'),
      n('Fresh News Asia', 'https://en.freshnewsasia.com/', 'freshnews@freshnewsasia.com', '', 'https://x.com/FreshNewsAsia', 'https://en.freshnewsasia.com/rss.xml'),
    ],
  },
  LA: {
    major: [
      n('Vientiane Times', 'https://www.vientianetimes.org.la/', 'editor@vientianetimes.la', '', 'https://x.com/VTtimes', 'https://www.vientianetimes.org.la/rss.xml'),
      n('KPL — Lao News Agency', 'https://kpl.gov.la/en/', 'webmaster@kpl.gov.la', '', '', 'https://kpl.gov.la/en/rss/'),
      n('Lao National TV / Lao National Radio (LNTV)', 'https://lntv.gov.la/', 'lntv@lntv.gov.la', '', '', ''),
    ],
    minor: [
      n('Laotian Times', 'https://laotiantimes.com/', 'editor@laotiantimes.com', 'https://www.instagram.com/laotiantimes/', 'https://x.com/laotiantimes', 'https://laotiantimes.com/feed/'),
      n('Pathet Lao Daily', 'https://www.pathetlao.com.la/', 'editor@pathetlao.com.la', '', '', ''),
      n('Lao Phattana News', 'https://www.laophattananews.la/', 'editor@laophattananews.la', '', '', ''),
      n('Vientiane Mai', 'https://www.vientianemai.la/', 'editor@vientianemai.la', '', '', ''),
    ],
  },
  MM: {
    major: [
      n('The Global New Light of Myanmar', 'https://www.gnlm.com.mm/', 'editor@gnlm.com.mm', '', 'https://x.com/GNLM_GNLM', 'https://www.gnlm.com.mm/feed/'),
      n('Myanmar News Agency (MNA)', 'https://www.moi.gov.mm/en', 'moi@moi.gov.mm', '', '', ''),
      n('MRTV — Myanmar Radio and Television', 'https://www.mrtv.gov.mm/', 'webmaster@mrtv.gov.mm', '', '', ''),
    ],
    minor: [
      n('The Irrawaddy', 'https://www.irrawaddy.com/', 'editor@irrawaddy.com', 'https://www.instagram.com/theirrawaddy/', 'https://x.com/IrrawaddyNews', 'https://www.irrawaddy.com/feed'),
      n('Myanmar Now', 'https://myanmar-now.org/en/', 'newsroom@myanmar-now.org', 'https://www.instagram.com/myanmar_now/', 'https://x.com/Myanmar_Now_Eng', 'https://myanmar-now.org/en/news/feed'),
      n('Frontier Myanmar', 'https://www.frontiermyanmar.net/', 'editor@frontiermyanmar.net', 'https://www.instagram.com/frontiermyanmar/', 'https://x.com/FrontierMM', 'https://www.frontiermyanmar.net/en/feed/'),
      n('Mizzima', 'https://mizzima.com/', 'editor@mizzima.com', 'https://www.instagram.com/mizzima/', 'https://x.com/mizzimadaily', 'https://mizzima.com/feed'),
    ],
  },
  TL: {
    major: [
      n('Tatoli — Timor-Leste National News Agency', 'https://en.tatoli.tl/', 'tatoli@gov.tl', '', 'https://x.com/tatolinews', 'https://en.tatoli.tl/feed/'),
      n('Timor Post', 'https://www.timorpost.com/', 'editor@timorpost.com', '', '', 'https://www.timorpost.com/feed/'),
      n('Radio Televisão Timor Leste (RTTL)', 'https://rttl.tv/', 'rttl@rttl.tv', '', '', ''),
    ],
    minor: [
      n('La’o Hamutuk Bulletin (policy)', 'https://www.laohamutuk.org/', 'info@laohamutuk.org', '', '', ''),
      n('The Dili Weekly (legacy)', 'https://www.thediliweekly.com/', 'editor@thediliweekly.com', '', '', ''),
      n('Independente', 'https://www.independente.tl/', 'editor@independente.tl', '', '', ''),
      n('Diario Nacional Timor', 'https://www.diarionacional.tl/', 'editor@diarionacional.tl', '', '', ''),
    ],
  },

  // ---------- BRICS economies not duplicated above (Brazil, India) ----------
  BR: {
    major: [
      n('Agência Brasil (EBC)', 'https://agenciabrasil.ebc.com.br/', 'redacao@radiobrasilia.ebc.com.br', 'https://www.instagram.com/agenciabrasil/', 'https://x.com/agenciabrasil', 'https://agenciabrasil.ebc.com.br/rss/ultimasnoticias/feed/rss.xml'),
      n('g1 — Globo', 'https://g1.globo.com/', 'oglobo@g1.globo.com', 'https://www.instagram.com/g1/', 'https://x.com/g1', ''),
      n('Folha de S.Paulo', 'https://www.folha.uol.com.br/', 'oportunidades@contact.folhapress.net', 'https://www.instagram.com/folhadespaulo/', 'https://x.com/fsp', ''),
    ],
    minor: [
      n('O Estado de S. Paulo (Estadão)', 'https://www.estadao.com.br/', 'oportunidades@estadao.com', 'https://www.instagram.com/estadao/', 'https://x.com/EstadaoPolitica', 'https://www.estadao.com.br/arc/outboundfeeds/rss/feeds/rss/?outputType=xml'),
      n('BBC News Brasil', 'https://www.bbc.com/portuguese', 'brasil.stories@bbc.co.uk', 'https://www.instagram.com/bbcbrasil/', 'https://x.com/BBCBrasil', 'https://feeds.bbci.co.uk/news/world/latin_america/rss.xml'),
      n('CNN Brasil', 'https://www.cnnbrasil.com.br/', '', 'https://www.instagram.com/cnnbrasil/', 'https://x.com/cnnbrasil', ''),
      n('Valor Econômico', 'https://valor.globo.com/', 'redacao-valor@sptelecom.globo.com', 'https://www.instagram.com/valoreconomico/', 'https://x.com/valor', ''),
    ],
  },
  IN: {
    major: [
      n('Press Trust of India (PTI)', 'https://www.ptinews.com/', '', '', 'https://x.com/PTI_News', 'https://www.ptinews.com/rss'),
      n('DD News — Prasar Bharati', 'https://ddnews.gov.in/', 'admin@pb.nic.in', 'https://www.instagram.com/dd_news/', 'https://x.com/ddnews_', ''),
      n('All India Radio (AIR) News — Prasar Bharati', 'https://newsonair.gov.in/', 'admin@pb.nic.in', '', '', 'https://newsonair.gov.in/rss/rss.aspx'),
    ],
    minor: [
      n('The Hindu', 'https://www.thehindu.com/', 'socialmedia@thehindu.co.in', 'https://www.instagram.com/the_hindu/', 'https://x.com/the_hindu', 'https://www.thehindu.com/news/feeder/default/rssfeed.xml'),
      n('The Times of India', 'https://timesofindia.indiatimes.com/', 'toi.feedback@timesgroup.com', 'https://www.instagram.com/timesofindia/', 'https://x.com/timesofindia', 'https://timesofindia.indiatimes.com/rssfeedlatest.cms'),
      n('The Indian Express', 'https://indianexpress.com/', 'digital@expressindia.com', 'https://www.instagram.com/indianexpress/', 'https://x.com/IndianExpress', 'https://indianexpress.com/feed'),
      n('NDTV News', 'https://www.ndtv.com/', 'feedback@ndtv.com', 'https://www.instagram.com/ndtv/', 'https://x.com/ndtv', 'https://feeds.feedburner.com/ndtv/rss-top-news'),
    ],
  },

  // ---------- CARICOM (20) — May23 research doc ----------
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

  // ---------- CPTPP (1) — May23 research doc ----------
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

  // ---------- EU (27) — May23 research doc ----------
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

  // ---------- G20 (2) — May23 research doc ----------
  AR: {
    major: [
      n("Clarín", "https://clarin.com", "", "https://instagram.com/clarincom", "https://twitter.com/clarincom", ""),
      n("La Nación", "https://lanacion.com.ar", "", "", "https://twitter.com/LANACION", ""),
      n("Infobae", "https://infobae.com", "", "", "https://twitter.com/infobae", ""),
    ],
    minor: [
      n("Página/12", "https://pagina12.com.ar", "", "", "", ""),
      n("TN", "https://tn.com.ar", "", "", "", ""),
      n("Ambito", "https://ambito.com", "", "", "", ""),
      n("Perfil", "https://perfil.com", "", "", "", ""),
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

  // ---------- IORA (4) — May23 research doc ----------
  BD: {
    major: [
      n("The Daily Star", "https://thedailystar.net", "", "", "https://twitter.com/dailystarnews", ""),
      n("Dhaka Tribune", "https://dhakatribune.com", "", "", "", ""),
      n("BDNews24", "https://bdnews24.com", "", "", "", ""),
    ],
    minor: [
      n("Prothom Alo", "https://prothomalo.com", "", "", "", ""),
      n("The Business Standard", "https://tbsnews.net", "", "", "", ""),
      n("Jagonews24", "https://jagonews24.com", "", "", "", ""),
      n("Bangladesh Post", "https://bangladeshpost.net", "", "", "", ""),
    ],
  },
  IR: {
    major: [
      n("IRNA (Islamic Republic News Agency)", "https://irna.ir", "", "", "https://twitter.com/IrnaEnglish", ""),
      n("Press TV", "https://presstv.ir", "", "", "https://twitter.com/PressTV", ""),
      n("Mehr News Agency", "https://mehrnews.com", "", "", "", ""),
    ],
    minor: [
      n("Tehran Times", "https://tehrantimes.com", "", "", "", ""),
      n("Tasnim News", "https://tasnimnews.com", "", "", "", ""),
      n("Fars News", "https://farsnews.ir", "", "", "", ""),
      n("Al-Monitor Iran", "https://al-monitor.com", "", "", "", ""),
    ],
  },
  MV: {
    major: [
      n("Mihaaru", "https://mihaaru.com", "", "", "", ""),
      n("Sun Online", "https://sun.mv", "", "", "", ""),
      n("Raajje TV", "https://raajje.mv", "", "", "", ""),
    ],
    minor: [
      n("Maldives Independent", "https://maldivesindependent.com", "", "", "", ""),
      n("The Edition", "https://edition.mv", "", "", "", ""),
      n("Vaguthu", "https://vaguthu.mv", "", "", "", ""),
      n("PSM News", "https://psmnews.mv", "", "", "", ""),
    ],
  },
  LK: {
    major: [
      n("Daily News", "https://dailynews.lk", "", "", "", ""),
      n("Ada Derana", "https://adaderana.lk", "", "", "", ""),
      n("News First", "https://newsfirst.lk", "", "", "", ""),
    ],
    minor: [
      n("The Sunday Times LK", "https://sundaytimes.lk", "", "", "", ""),
      n("Colombo Gazette", "https://colombogazette.com", "", "", "", ""),
      n("Lanka News Web", "https://lankanewsweb.net", "", "", "", ""),
      n("Daily Mirror LK", "https://dailymirror.lk", "", "", "", ""),
    ],
  },

  // ---------- NATO (5) — May23 research doc ----------
  AL: {
    major: [
      n("Top Channel", "https://top-channel.tv", "info@top-channel.tv", "https://instagram.com/topchannel", "https://twitter.com/topchannel", ""),
      n("TV Klan", "https://tvklan.al", "info@tvklan.al", "https://instagram.com/tvklan", "https://twitter.com/tvklan", ""),
      n("BalkanWeb", "https://balkanweb.com", "info@balkanweb.com", "https://instagram.com/balkanweb", "https://twitter.com/balkanweb", ""),
    ],
    minor: [
      n("Gazeta Shqiptare", "https://gazeta-shqip.com", "", "", "", ""),
      n("Syri.net", "https://syri.net", "", "", "", ""),
      n("Reporter.al", "https://reporter.al", "", "", "", ""),
      n("News24", "https://news24.al", "", "", "", ""),
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
  ME: {
    major: [
      n("Vijesti", "https://www.vijesti.me", "", "https://instagram.com/vijesti", "https://twitter.com/vijesti", ""),
      n("CDM", "https://www.cdm.me", "", "https://instagram.com/cdm.me", "https://twitter.com/cdm_me", ""),
      n("Pobjeda", "https://www.pobjeda.me", "", "https://instagram.com/pobjeda", "https://twitter.com/pobjeda", ""),
    ],
    minor: [
      n("Analitika", "https://www.analitika.me", "", "", "", ""),
      n("Portal RTCG", "https://www.rtcg.me", "", "", "", ""),
      n("Dnevne Novine", "https://www.dnevne.me", "", "", "", ""),
      n("Montenegro Online", "https://www.montenegroonline.me", "", "", "", ""),
    ],
  },
  MK: {
    major: [
      n("MRT News", "https://mrt.com.mk", "", "", "https://twitter.com/mrt_mk", ""),
      n("Nova TV", "https://novatv.mk", "", "", "", ""),
      n("Alsat-M", "https://alsat.mk", "", "", "", ""),
    ],
    minor: [
      n("Telma", "https://telma.com.mk", "", "", "", ""),
      n("Kapital", "https://kapital.mk", "", "", "", ""),
      n("Republika", "https://republika.mk", "", "", "", ""),
      n("Fokus", "https://fokus.mk", "", "", "", ""),
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

  // ---------- OECD (3) — May23 research doc ----------
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

  // ---------- OPEC (1) — May23 research doc ----------
  VE: {
    major: [
      n("AVN (Agencia Venezolana de Noticias)", "https://www.avn.info.ve", "info@avn.info.ve", "https://www.instagram.com/avnve/", "https://x.com/avnve", ""),
      n("Venezolana de Televisión (VTV)", "https://www.vtv.gob.ve", "info@vtv.gob.ve", "https://www.instagram.com/vtvcanal8/", "https://x.com/VTVcanal8", ""),
      n("Últimas Noticias", "https://ultimasnoticias.com.ve", "contacto@ultimasnoticias.com.ve", "https://www.instagram.com/ultimasnoticias/", "https://x.com/UNoticias", ""),
    ],
    minor: [
      n("El Nacional", "https://www.elnacional.com", "contacto@elnacional.com", "https://www.instagram.com/elnacionalweb/", "https://x.com/ElNacionalWeb", ""),
      n("El Pitazo", "https://elpitazo.net", "contacto@elpitazo.net", "https://www.instagram.com/elpitazotv/", "https://x.com/ElPitazoTV", ""),
      n("TalCual", "https://talcualdigital.com", "info@talcualdigital.com", "https://www.instagram.com/talcualdigital/", "https://x.com/TalCual", ""),
      n("Runrunes", "https://runrun.es", "info@runrun.es", "https://www.instagram.com/runrunesweb/", "https://x.com/runrunesweb", ""),
    ],
  },
}
