import type { NewsOutlet } from './types'
import type { CommonwealthMemberIsoCode } from './commonwealthMemberIsoCodes'

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
 * Three major + four minor national news outlets per britishCommonwealth economy (informational; verify).
 * 
 * ISOs absent from NEWS_OUTLETS use explicit placeholders (marked "not seeded ... verify"); add seed rows then rerun.
 */
export const COMMONWEALTH_NEWS_OUTLETS = {
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
  BN: {
    major: [
      n("Borneo Bulletin", "https://borneobulletin.com.bn/", "news@borneobulletin.com.bn", "", "https://x.com/BorneoBulletin", "https://borneobulletin.com.bn/feed/"),
      n("Radio Television Brunei (RTB)", "https://www.rtb.gov.bn/", "info@rtb.gov.bn", "https://www.instagram.com/rtb_brunei/", "https://x.com/RTBNewsOfficial", ""),
      n("Pelita Brunei", "https://pelitabrunei.gov.bn/", "pelita@jpm.gov.bn", "", "", ""),
    ],
    minor: [
      n("The Scoop (Brunei)", "https://thescoop.co/", "editor@thescoop.co", "https://www.instagram.com/scoopbrunei/", "https://x.com/scoopbrunei", "https://thescoop.co/feed/"),
      n("BizBrunei", "https://www.bizbrunei.com/", "editor@bizbrunei.com", "https://www.instagram.com/bizbrunei/", "https://x.com/bizbrunei", "https://www.bizbrunei.com/feed/"),
      n("Brunei Times Archive (legacy)", "https://www.bt.com.bn/", "editor@bt.com.bn", "", "", ""),
      n("Media Permata", "https://mediapermata.com.bn/", "editor@mediapermata.com.bn", "", "", ""),
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
  FJ: {
    major: [
      n("FJ: Major outlet 1 — not seeded in news-outlets-seed.mjs; verify nationally", "", "", "", "", ""),
      n("FJ: Major outlet 2 — not seeded in news-outlets-seed.mjs; verify nationally", "", "", "", "", ""),
      n("FJ: Major outlet 3 — not seeded in news-outlets-seed.mjs; verify nationally", "", "", "", "", ""),
    ],
    minor: [
      n("FJ: Minor outlet 1 — not seeded in news-outlets-seed.mjs; verify nationally", "", "", "", "", ""),
      n("FJ: Minor outlet 2 — not seeded in news-outlets-seed.mjs; verify nationally", "", "", "", "", ""),
      n("FJ: Minor outlet 3 — not seeded in news-outlets-seed.mjs; verify nationally", "", "", "", "", ""),
      n("FJ: Minor outlet 4 — not seeded in news-outlets-seed.mjs; verify nationally", "", "", "", "", ""),
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
  KI: {
    major: [
      n("KI: Major outlet 1 — not seeded in news-outlets-seed.mjs; verify nationally", "", "", "", "", ""),
      n("KI: Major outlet 2 — not seeded in news-outlets-seed.mjs; verify nationally", "", "", "", "", ""),
      n("KI: Major outlet 3 — not seeded in news-outlets-seed.mjs; verify nationally", "", "", "", "", ""),
    ],
    minor: [
      n("KI: Minor outlet 1 — not seeded in news-outlets-seed.mjs; verify nationally", "", "", "", "", ""),
      n("KI: Minor outlet 2 — not seeded in news-outlets-seed.mjs; verify nationally", "", "", "", "", ""),
      n("KI: Minor outlet 3 — not seeded in news-outlets-seed.mjs; verify nationally", "", "", "", "", ""),
      n("KI: Minor outlet 4 — not seeded in news-outlets-seed.mjs; verify nationally", "", "", "", "", ""),
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
  MY: {
    major: [
      n("Bernama", "https://www.bernama.com/en/", "webmaster@bernama.com", "https://www.instagram.com/bernamaofficial/", "https://x.com/bernamadotcom", "https://www.bernama.com/en/rss/feed.xml"),
      n("The Star (Malaysia)", "https://www.thestar.com.my/", "editor@thestar.com.my", "https://www.instagram.com/thestar_news/", "https://x.com/staronline", "https://www.thestar.com.my/rss/news"),
      n("New Straits Times", "https://www.nst.com.my/", "webmaster@nst.com.my", "https://www.instagram.com/newstraitstimes/", "https://x.com/NST_Online", "https://www.nst.com.my/news/rss.xml"),
    ],
    minor: [
      n("Malaysiakini", "https://www.malaysiakini.com/", "editor@malaysiakini.com", "https://www.instagram.com/malaysiakini/", "https://x.com/malaysiakini", "https://www.malaysiakini.com/news.rss"),
      n("Free Malaysia Today", "https://www.freemalaysiatoday.com/", "newsroom@freemalaysiatoday.com", "https://www.instagram.com/freemalaysiatoday/", "https://x.com/fmtoday", "https://www.freemalaysiatoday.com/feed/"),
      n("Malay Mail", "https://www.malaymail.com/", "editor@malaymail.com", "https://www.instagram.com/themalaymail/", "https://x.com/malaymail", "https://www.malaymail.com/feed/rss/malaysia"),
      n("The Edge Malaysia", "https://theedgemalaysia.com/", "edgenewsdesk@bizedge.com", "https://www.instagram.com/theedgemalaysia/", "https://x.com/EdgeMalaysia", "https://theedgemalaysia.com/rss.xml"),
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
  NR: {
    major: [
      n("NR: Major outlet 1 — not seeded in news-outlets-seed.mjs; verify nationally", "", "", "", "", ""),
      n("NR: Major outlet 2 — not seeded in news-outlets-seed.mjs; verify nationally", "", "", "", "", ""),
      n("NR: Major outlet 3 — not seeded in news-outlets-seed.mjs; verify nationally", "", "", "", "", ""),
    ],
    minor: [
      n("NR: Minor outlet 1 — not seeded in news-outlets-seed.mjs; verify nationally", "", "", "", "", ""),
      n("NR: Minor outlet 2 — not seeded in news-outlets-seed.mjs; verify nationally", "", "", "", "", ""),
      n("NR: Minor outlet 3 — not seeded in news-outlets-seed.mjs; verify nationally", "", "", "", "", ""),
      n("NR: Minor outlet 4 — not seeded in news-outlets-seed.mjs; verify nationally", "", "", "", "", ""),
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
  PK: {
    major: [
      n("PK: Major outlet 1 — not seeded in news-outlets-seed.mjs; verify nationally", "", "", "", "", ""),
      n("PK: Major outlet 2 — not seeded in news-outlets-seed.mjs; verify nationally", "", "", "", "", ""),
      n("PK: Major outlet 3 — not seeded in news-outlets-seed.mjs; verify nationally", "", "", "", "", ""),
    ],
    minor: [
      n("PK: Minor outlet 1 — not seeded in news-outlets-seed.mjs; verify nationally", "", "", "", "", ""),
      n("PK: Minor outlet 2 — not seeded in news-outlets-seed.mjs; verify nationally", "", "", "", "", ""),
      n("PK: Minor outlet 3 — not seeded in news-outlets-seed.mjs; verify nationally", "", "", "", "", ""),
      n("PK: Minor outlet 4 — not seeded in news-outlets-seed.mjs; verify nationally", "", "", "", "", ""),
    ],
  },
  PG: {
    major: [
      n("The National", "https://www.thenational.com.pg/", "editor@thenational.com.pg", "", "https://x.com/TheNationalPNG", "https://www.thenational.com.pg/feed/"),
      n("Post-Courier", "https://postcourier.com.pg/", "editor@spp.com.pg", "https://www.instagram.com/postcourierpng/", "https://x.com/postcourierPNG", "https://postcourier.com.pg/feed/"),
      n("EMTV (PNG)", "https://emtv.com.pg/", "newsroom@emtv.com.pg", "", "https://x.com/EmtvNews", "https://emtv.com.pg/feed/"),
    ],
    minor: [
      n("PNG Loop", "https://pnglooop.com/", "editor@pngloop.com", "", "", "https://pnglooop.com/feed/"),
      n("National Broadcasting Corporation PNG (NBC)", "https://www.nbc.com.pg/", "nbc@nbc.com.pg", "", "", ""),
      n("Pacific Mining Watch — PNG section", "https://www.pacificminingwatch.org/", "editor@pacificminingwatch.org", "", "", ""),
      n("PNG Business News", "https://www.pngbusinessnews.com/", "editor@pngbusinessnews.com", "", "", "https://www.pngbusinessnews.com/feed/"),
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
  WS: {
    major: [
      n("WS: Major outlet 1 — not seeded in news-outlets-seed.mjs; verify nationally", "", "", "", "", ""),
      n("WS: Major outlet 2 — not seeded in news-outlets-seed.mjs; verify nationally", "", "", "", "", ""),
      n("WS: Major outlet 3 — not seeded in news-outlets-seed.mjs; verify nationally", "", "", "", "", ""),
    ],
    minor: [
      n("WS: Minor outlet 1 — not seeded in news-outlets-seed.mjs; verify nationally", "", "", "", "", ""),
      n("WS: Minor outlet 2 — not seeded in news-outlets-seed.mjs; verify nationally", "", "", "", "", ""),
      n("WS: Minor outlet 3 — not seeded in news-outlets-seed.mjs; verify nationally", "", "", "", "", ""),
      n("WS: Minor outlet 4 — not seeded in news-outlets-seed.mjs; verify nationally", "", "", "", "", ""),
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
  SG: {
    major: [
      n("The Straits Times", "https://www.straitstimes.com/", "stnewsdesk@sph.com.sg", "https://www.instagram.com/straits_times/", "https://x.com/STcom", "https://www.straitstimes.com/news/singapore/rss.xml"),
      n("Channel News Asia (CNA)", "https://www.channelnewsasia.com/", "cna_corporate@mediacorp.com.sg", "https://www.instagram.com/channelnewsasia/", "https://x.com/ChannelNewsAsia", "https://www.channelnewsasia.com/rssfeeds/8395986"),
      n("Today Online", "https://www.todayonline.com/", "todayonline@mediacorp.com.sg", "https://www.instagram.com/todayonlinesg/", "https://x.com/TODAYonline", "https://www.todayonline.com/feed/rss"),
    ],
    minor: [
      n("The Business Times", "https://www.businesstimes.com.sg/", "btnewsdesk@sph.com.sg", "", "https://x.com/BTtweeting", "https://www.businesstimes.com.sg/rss"),
      n("MotherShip", "https://mothership.sg/", "hello@mothership.sg", "https://www.instagram.com/mothershipsg/", "https://x.com/MothershipSG", "https://mothership.sg/feed/"),
      n("Lianhe Zaobao", "https://www.zaobao.com.sg/", "editor@zaobao.com.sg", "https://www.instagram.com/lianhezaobao/", "https://x.com/zaobaosg", "https://www.zaobao.com.sg/rss"),
      n("Yahoo News Singapore", "https://sg.news.yahoo.com/", "sgsupport@yahoo.com", "", "", "https://sg.news.yahoo.com/rss/"),
    ],
  },
  SB: {
    major: [
      n("SB: Major outlet 1 — not seeded in news-outlets-seed.mjs; verify nationally", "", "", "", "", ""),
      n("SB: Major outlet 2 — not seeded in news-outlets-seed.mjs; verify nationally", "", "", "", "", ""),
      n("SB: Major outlet 3 — not seeded in news-outlets-seed.mjs; verify nationally", "", "", "", "", ""),
    ],
    minor: [
      n("SB: Minor outlet 1 — not seeded in news-outlets-seed.mjs; verify nationally", "", "", "", "", ""),
      n("SB: Minor outlet 2 — not seeded in news-outlets-seed.mjs; verify nationally", "", "", "", "", ""),
      n("SB: Minor outlet 3 — not seeded in news-outlets-seed.mjs; verify nationally", "", "", "", "", ""),
      n("SB: Minor outlet 4 — not seeded in news-outlets-seed.mjs; verify nationally", "", "", "", "", ""),
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
  TO: {
    major: [
      n("TO: Major outlet 1 — not seeded in news-outlets-seed.mjs; verify nationally", "", "", "", "", ""),
      n("TO: Major outlet 2 — not seeded in news-outlets-seed.mjs; verify nationally", "", "", "", "", ""),
      n("TO: Major outlet 3 — not seeded in news-outlets-seed.mjs; verify nationally", "", "", "", "", ""),
    ],
    minor: [
      n("TO: Minor outlet 1 — not seeded in news-outlets-seed.mjs; verify nationally", "", "", "", "", ""),
      n("TO: Minor outlet 2 — not seeded in news-outlets-seed.mjs; verify nationally", "", "", "", "", ""),
      n("TO: Minor outlet 3 — not seeded in news-outlets-seed.mjs; verify nationally", "", "", "", "", ""),
      n("TO: Minor outlet 4 — not seeded in news-outlets-seed.mjs; verify nationally", "", "", "", "", ""),
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
  TV: {
    major: [
      n("TV: Major outlet 1 — not seeded in news-outlets-seed.mjs; verify nationally", "", "", "", "", ""),
      n("TV: Major outlet 2 — not seeded in news-outlets-seed.mjs; verify nationally", "", "", "", "", ""),
      n("TV: Major outlet 3 — not seeded in news-outlets-seed.mjs; verify nationally", "", "", "", "", ""),
    ],
    minor: [
      n("TV: Minor outlet 1 — not seeded in news-outlets-seed.mjs; verify nationally", "", "", "", "", ""),
      n("TV: Minor outlet 2 — not seeded in news-outlets-seed.mjs; verify nationally", "", "", "", "", ""),
      n("TV: Minor outlet 3 — not seeded in news-outlets-seed.mjs; verify nationally", "", "", "", "", ""),
      n("TV: Minor outlet 4 — not seeded in news-outlets-seed.mjs; verify nationally", "", "", "", "", ""),
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
  VU: {
    major: [
      n("VU: Major outlet 1 — not seeded in news-outlets-seed.mjs; verify nationally", "", "", "", "", ""),
      n("VU: Major outlet 2 — not seeded in news-outlets-seed.mjs; verify nationally", "", "", "", "", ""),
      n("VU: Major outlet 3 — not seeded in news-outlets-seed.mjs; verify nationally", "", "", "", "", ""),
    ],
    minor: [
      n("VU: Minor outlet 1 — not seeded in news-outlets-seed.mjs; verify nationally", "", "", "", "", ""),
      n("VU: Minor outlet 2 — not seeded in news-outlets-seed.mjs; verify nationally", "", "", "", "", ""),
      n("VU: Minor outlet 3 — not seeded in news-outlets-seed.mjs; verify nationally", "", "", "", "", ""),
      n("VU: Minor outlet 4 — not seeded in news-outlets-seed.mjs; verify nationally", "", "", "", "", ""),
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
} as const satisfies Record<CommonwealthMemberIsoCode, {
  major: readonly [NewsOutlet, NewsOutlet, NewsOutlet]
  minor: readonly [NewsOutlet, NewsOutlet, NewsOutlet, NewsOutlet]
}>
