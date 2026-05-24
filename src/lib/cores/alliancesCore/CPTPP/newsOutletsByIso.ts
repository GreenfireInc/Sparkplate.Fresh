import type { NewsOutlet } from './types'
import type { CptppMemberIsoCode } from './cptppMemberIsoCodes'

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
 * Three major + four minor national news outlets per CPTPP economy (informational; verify).
 * 
 * ISOs absent from NEWS_OUTLETS use explicit placeholders (marked "not seeded ... verify"); add seed rows then rerun.
 */
export const CPTPP_NEWS_OUTLETS = {
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
  CL: {
    major: [
      n("El Mercurio", "https://www.elmercurio.com/", "extension@mercurio.cl", "https://www.instagram.com/elmercurio_cl/", "https://x.com/ElMercurio_cl", ""),
      n("La Tercera", "https://www.latercera.com/", "cartas@latercera.com", "https://www.instagram.com/laterceracom/", "https://x.com/latercera", "https://www.latercera.com/feed/"),
      n("Televisión Nacional de Chile (TVN)", "https://www.tvn.cl/", "contacto@tvn.cl", "https://www.instagram.com/tvn/", "https://x.com/TVN", ""),
    ],
    minor: [
      n("BioBioChile", "https://www.biobiochile.cl/", "contacto@biobiochile.cl", "https://www.instagram.com/biobiochile/", "https://x.com/biobio", "https://www.biobiochile.cl/static/rss/"),
      n("El Mostrador", "https://www.elmostrador.cl/", "contacto@elmostrador.cl", "https://www.instagram.com/elmostrador/", "https://x.com/elmostrador", "https://www.elmostrador.cl/feed/"),
      n("Cooperativa", "https://www.cooperativa.cl/", "cooperativa@cooperativa.cl", "https://www.instagram.com/cooperativa/", "https://x.com/Cooperativa", "https://www.cooperativa.cl/noticias/site/edic/rss.xml"),
      n("CIPER Chile", "https://www.ciperchile.cl/", "contacto@ciperchile.cl", "https://www.instagram.com/ciperchile/", "https://x.com/ciperchile", "https://www.ciperchile.cl/feed/"),
    ],
  },
  JP: {
    major: [
      n("NHK World-Japan", "https://www3.nhk.or.jp/nhkworld/", "info@nhkworld.jp", "https://www.instagram.com/nhkworld/", "https://x.com/NHKWORLD_News", "https://www3.nhk.or.jp/nhkworld/en/news/feeds/"),
      n("The Asahi Shimbun", "https://www.asahi.com/ajw/", "iwc@asahi.com", "https://www.instagram.com/asahishimbun/", "https://x.com/asahi", "https://www.asahi.com/ajw/rss/feed.xml"),
      n("The Yomiuri Shimbun / Japan News", "https://japannews.yomiuri.co.jp/", "jn-editor@yomiuri.com", "https://www.instagram.com/japannews_yomiuri/", "https://x.com/Japan_News", "https://japannews.yomiuri.co.jp/feed/"),
    ],
    minor: [
      n("The Mainichi", "https://mainichi.jp/english/", "webmaster@mainichi.co.jp", "https://www.instagram.com/themainichi/", "https://x.com/themainichi", "https://mainichi.jp/english/rss/etc/mainichi_rss_2_0.xml"),
      n("Nikkei Asia", "https://asia.nikkei.com/", "asia.editor@nex.nikkei.co.jp", "https://www.instagram.com/nikkeiasia/", "https://x.com/NikkeiAsia", "https://asia.nikkei.com/rss/feed/nar"),
      n("The Japan Times", "https://www.japantimes.co.jp/", "feedback@japantimes.co.jp", "https://www.instagram.com/japantimes/", "https://x.com/japantimes", "https://www.japantimes.co.jp/feed/"),
      n("Kyodo News", "https://english.kyodonews.net/", "support@kyodonews.jp", "", "https://x.com/kyodo_english", "https://english.kyodonews.net/rss/news.xml"),
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
  MX: {
    major: [
      n("Reforma", "https://www.reforma.com/", "reforma@reforma.com", "https://www.instagram.com/reformaweb/", "https://x.com/Reforma", ""),
      n("El Universal", "https://www.eluniversal.com.mx/", "contacto@eluniversal.com.mx", "https://www.instagram.com/eluniversal_mx/", "https://x.com/El_Universal_Mx", "https://www.eluniversal.com.mx/rss.xml"),
      n("Televisa Noticias", "https://noticieros.televisa.com/", "contacto@televisa.com", "https://www.instagram.com/noticierostelevisa/", "https://x.com/NTelevisa_com", "https://noticieros.televisa.com/rss"),
    ],
    minor: [
      n("La Jornada", "https://www.jornada.com.mx/", "webmaster@jornada.com.mx", "https://www.instagram.com/lajornadaonline/", "https://x.com/LaJornada", "https://www.jornada.com.mx/rss/edicion.xml"),
      n("Milenio", "https://www.milenio.com/", "webmaster@milenio.com", "https://www.instagram.com/milenio/", "https://x.com/Milenio", "https://www.milenio.com/rss"),
      n("Animal Político", "https://animalpolitico.com/", "contacto@animalpolitico.com", "https://www.instagram.com/animalpolitico/", "https://x.com/Pajaropolitico", "https://animalpolitico.com/feed"),
      n("Aristegui Noticias", "https://aristeguinoticias.com/", "contacto@aristeguinoticias.com", "https://www.instagram.com/aristeguinoticias/", "https://x.com/AristeguiOnline", "https://aristeguinoticias.com/feed"),
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
  PE: {
    major: [
      n("El Comercio Perú", "https://elcomercio.pe/", "cartas@comercio.com.pe", "https://www.instagram.com/elcomercio/", "https://x.com/elcomercio", "https://elcomercio.pe/feed/"),
      n("La República Perú", "https://larepublica.pe/", "contacto@glr.pe", "https://www.instagram.com/larepublica_pe/", "https://x.com/larepublica_pe", "https://larepublica.pe/arc/outboundfeeds/rss/?outputType=xml"),
      n("TV Perú Noticias", "https://www.tvperu.gob.pe/noticias", "contacto@irtp.gob.pe", "https://www.instagram.com/tvperupe/", "https://x.com/tvperupe", ""),
    ],
    minor: [
      n("RPP Noticias", "https://rpp.pe/", "lectores@rpp.com.pe", "https://www.instagram.com/rpp_noticias/", "https://x.com/RPPNoticias", "https://rpp.pe/feed"),
      n("Gestión", "https://gestion.pe/", "contactenos@gestion.pe", "", "https://x.com/Gestionpe", "https://gestion.pe/feed/"),
      n("Andina (Agencia Peruana de Noticias)", "https://www.andina.pe/", "andina@andina.com.pe", "https://www.instagram.com/andina_oficial/", "https://x.com/Agencia_Andina", "https://www.andina.pe/agencia/feed.aspx"),
      n("IDL-Reporteros", "https://www.idl-reporteros.pe/", "idlreporteros@idl-reporteros.pe", "", "https://x.com/IDL_R", "https://www.idl-reporteros.pe/feed/"),
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
  VN: {
    major: [
      n("VnExpress", "https://e.vnexpress.net/", "webmaster@vnexpress.net", "https://www.instagram.com/vnexpress/", "https://x.com/VnExpress", "https://vnexpress.net/rss/tin-moi-nhat.rss"),
      n("Vietnam News Agency (VNA / Vietnam+)", "https://en.vietnamplus.vn/", "webmaster@vnagency.com.vn", "https://www.instagram.com/vietnamplus.vn/", "https://x.com/VietnamPlus_EN", "https://en.vietnamplus.vn/rss/home.rss"),
      n("Vietnam Television (VTV)", "https://vtv.vn/", "webmaster@vtv.vn", "https://www.instagram.com/vtvgo/", "https://x.com/VTVOnlineVN", "https://vtv.vn/trang-chu.rss"),
    ],
    minor: [
      n("Tuoi Tre News", "https://tuoitrenews.vn/", "tuoitrenews@tuoitre.com.vn", "https://www.instagram.com/tuoitre/", "https://x.com/TuoiTreNews", "https://tuoitrenews.vn/rss/home.rss"),
      n("Thanh Nien News", "https://thanhniennews.com/", "editor@thanhniennews.com", "https://www.instagram.com/thanhniennews/", "https://x.com/thanhniennews", "https://thanhniennews.com/rss"),
      n("VietnamNet Global", "https://vietnamnet.vn/en", "editor@vietnamnet.vn", "https://www.instagram.com/vietnamnet/", "https://x.com/VietnamNetWS", "https://vietnamnet.vn/en/rss/feed"),
      n("Saigon Times", "https://english.thesaigontimes.vn/", "editor@thesaigontimes.vn", "https://www.instagram.com/saigontimes/", "https://x.com/SaigonTimes", "https://english.thesaigontimes.vn/feed/"),
    ],
  },
} as const satisfies Record<CptppMemberIsoCode, {
  major: readonly [NewsOutlet, NewsOutlet, NewsOutlet]
  minor: readonly [NewsOutlet, NewsOutlet, NewsOutlet, NewsOutlet]
}>
