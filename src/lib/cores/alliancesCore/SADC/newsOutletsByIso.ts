import type { NewsOutlet } from './types'
import type { SadcMemberIsoCode } from './sadcMemberIsoCodes'

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
 * Three major + four minor national news outlets per SADC economy (informational; verify).
 * 
 * ISOs absent from NEWS_OUTLETS use explicit placeholders (marked "not seeded ... verify"); add seed rows then rerun.
 */
export const SADC_NEWS_OUTLETS = {
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
} as const satisfies Record<SadcMemberIsoCode, {
  major: readonly [NewsOutlet, NewsOutlet, NewsOutlet]
  minor: readonly [NewsOutlet, NewsOutlet, NewsOutlet, NewsOutlet]
}>
