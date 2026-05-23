import type { NewsOutlet } from './types'
import type { CensadMemberIsoCode } from './censadMemberIsoCodes'

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
 * Three major + four minor national news outlets per CEN-SAD economy (informational; verify).
 * 
 * ISOs absent from NEWS_OUTLETS use explicit placeholders (marked "not seeded ... verify"); add seed rows then rerun.
 */
export const CENSAD_NEWS_OUTLETS = {
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
} as const satisfies Record<CensadMemberIsoCode, {
  major: readonly [NewsOutlet, NewsOutlet, NewsOutlet]
  minor: readonly [NewsOutlet, NewsOutlet, NewsOutlet, NewsOutlet]
}>
