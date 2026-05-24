import type { NewsOutlet } from './types'
import type { RcepMemberIsoCode } from './rcepMemberIsoCodes'

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
 * Three major + four minor national news outlets per RCEP economy (informational; verify).
 * 
 * ISOs absent from NEWS_OUTLETS use explicit placeholders (marked "not seeded ... verify"); add seed rows then rerun.
 */
export const RCEP_NEWS_OUTLETS = {
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
  KH: {
    major: [
      n("Phnom Penh Post", "https://www.phnompenhpost.com/", "editor@phnompenhpost.com", "https://www.instagram.com/phnompenhpost/", "https://x.com/phnompenhpost", "https://www.phnompenhpost.com/rss.xml"),
      n("Khmer Times", "https://www.khmertimeskh.com/", "newsroom@khmertimeskh.com", "https://www.instagram.com/khmertimes/", "https://x.com/khmertimes", "https://www.khmertimeskh.com/feed/"),
      n("AKP — Agence Kampuchea Presse", "https://www.akp.gov.kh/", "akp@akp.gov.kh", "", "https://x.com/akp_english", "https://www.akp.gov.kh/feed/"),
    ],
    minor: [
      n("VOD English Archive (legacy reference)", "https://vodenglish.news/", "editor@vodenglish.news", "", "https://x.com/vodenglish", "https://vodenglish.news/feed/"),
      n("CamboJA News", "https://cambojanews.com/", "editor@cambojanews.com", "", "https://x.com/CamboJAnews", "https://cambojanews.com/feed/"),
      n("Cambodianess", "https://cambodianess.com/", "editor@cambodianess.com", "", "https://x.com/Cambodianess", "https://cambodianess.com/feed/"),
      n("Fresh News Asia", "https://en.freshnewsasia.com/", "freshnews@freshnewsasia.com", "", "https://x.com/FreshNewsAsia", "https://en.freshnewsasia.com/rss.xml"),
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
  ID: {
    major: [
      n("Kompas", "https://www.kompas.com/", "kompas@kompas.com", "https://www.instagram.com/hariankompas/", "https://x.com/hariankompas", "https://www.kompas.com/rss"),
      n("Tempo", "https://www.tempo.co/", "redaksi@tempo.co.id", "https://www.instagram.com/tempodotco/", "https://x.com/tempodotco", "https://rss.tempo.co/"),
      n("TVRI — Televisi Republik Indonesia", "https://www.tvri.go.id/", "tvri@tvri.go.id", "https://www.instagram.com/tvrinasional/", "https://x.com/TVRINasional", ""),
    ],
    minor: [
      n("Detik.com", "https://www.detik.com/", "redaksi@detik.com", "https://www.instagram.com/detikcom/", "https://x.com/detikcom", "https://news.detik.com/berita/rss"),
      n("The Jakarta Post", "https://www.thejakartapost.com/", "editorial@thejakartapost.com", "https://www.instagram.com/jakpost/", "https://x.com/jakpost", "https://www.thejakartapost.com/rss"),
      n("Antara News", "https://en.antaranews.com/", "redaksi@antaranews.com", "https://www.instagram.com/antaranews/", "https://x.com/antaranews", "https://www.antaranews.com/rss/terkini.xml"),
      n("Republika Online", "https://www.republika.co.id/", "redaksi@republika.co.id", "https://www.instagram.com/republikaonline/", "https://x.com/republikaonline", "https://www.republika.co.id/rss"),
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
  KR: {
    major: [
      n("Yonhap News Agency", "https://en.yna.co.kr/", "webmaster@yna.co.kr", "https://www.instagram.com/yonhap_news/", "https://x.com/YonhapNews", "https://en.yna.co.kr/RSS/news.xml"),
      n("Korean Broadcasting System (KBS World)", "https://world.kbs.co.kr/", "world@kbs.co.kr", "https://www.instagram.com/kbsworld/", "https://x.com/kbsworld", "https://world.kbs.co.kr/rss/rss_news.htm?lang=e"),
      n("The Korea Herald", "https://www.koreaherald.com/", "editorial@heraldcorp.com", "https://www.instagram.com/koreaherald/", "https://x.com/TheKoreaHerald", "https://www.koreaherald.com/rss/all"),
    ],
    minor: [
      n("The Chosun Ilbo (English)", "https://www.chosun.com/english/", "chosun@chosun.com", "", "https://x.com/Chosun_English", ""),
      n("Hankyoreh (English)", "https://english.hani.co.kr/", "english@hani.co.kr", "https://www.instagram.com/hankyoreh.eng/", "https://x.com/hankyorehenglsh", "https://english.hani.co.kr/arti/rss"),
      n("The Korea Times", "https://www.koreatimes.co.kr/", "editor@koreatimes.co.kr", "https://www.instagram.com/koreatimescokr/", "https://x.com/koreatimescokr", "https://www.koreatimes.co.kr/www/rss/nation.xml"),
      n("Korea JoongAng Daily", "https://koreajoongangdaily.joins.com/", "joongangdaily@joongang.co.kr", "https://www.instagram.com/koreajoongangdaily/", "https://x.com/JoongangDaily", "https://koreajoongangdaily.joins.com/rss/news.xml"),
    ],
  },
  LA: {
    major: [
      n("Vientiane Times", "https://www.vientianetimes.org.la/", "editor@vientianetimes.la", "", "https://x.com/VTtimes", "https://www.vientianetimes.org.la/rss.xml"),
      n("KPL — Lao News Agency", "https://kpl.gov.la/en/", "webmaster@kpl.gov.la", "", "", "https://kpl.gov.la/en/rss/"),
      n("Lao National TV / Lao National Radio (LNTV)", "https://lntv.gov.la/", "lntv@lntv.gov.la", "", "", ""),
    ],
    minor: [
      n("Laotian Times", "https://laotiantimes.com/", "editor@laotiantimes.com", "https://www.instagram.com/laotiantimes/", "https://x.com/laotiantimes", "https://laotiantimes.com/feed/"),
      n("Pathet Lao Daily", "https://www.pathetlao.com.la/", "editor@pathetlao.com.la", "", "", ""),
      n("Lao Phattana News", "https://www.laophattananews.la/", "editor@laophattananews.la", "", "", ""),
      n("Vientiane Mai", "https://www.vientianemai.la/", "editor@vientianemai.la", "", "", ""),
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
  MM: {
    major: [
      n("The Global New Light of Myanmar", "https://www.gnlm.com.mm/", "editor@gnlm.com.mm", "", "https://x.com/GNLM_GNLM", "https://www.gnlm.com.mm/feed/"),
      n("Myanmar News Agency (MNA)", "https://www.moi.gov.mm/en", "moi@moi.gov.mm", "", "", ""),
      n("MRTV — Myanmar Radio and Television", "https://www.mrtv.gov.mm/", "webmaster@mrtv.gov.mm", "", "", ""),
    ],
    minor: [
      n("The Irrawaddy", "https://www.irrawaddy.com/", "editor@irrawaddy.com", "https://www.instagram.com/theirrawaddy/", "https://x.com/IrrawaddyNews", "https://www.irrawaddy.com/feed"),
      n("Myanmar Now", "https://myanmar-now.org/en/", "newsroom@myanmar-now.org", "https://www.instagram.com/myanmar_now/", "https://x.com/Myanmar_Now_Eng", "https://myanmar-now.org/en/news/feed"),
      n("Frontier Myanmar", "https://www.frontiermyanmar.net/", "editor@frontiermyanmar.net", "https://www.instagram.com/frontiermyanmar/", "https://x.com/FrontierMM", "https://www.frontiermyanmar.net/en/feed/"),
      n("Mizzima", "https://mizzima.com/", "editor@mizzima.com", "https://www.instagram.com/mizzima/", "https://x.com/mizzimadaily", "https://mizzima.com/feed"),
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
  PH: {
    major: [
      n("Philippine Daily Inquirer", "https://www.inquirer.net/", "inq_letters@inquirer.com.ph", "https://www.instagram.com/inquirerdotnet/", "https://x.com/inquirerdotnet", "https://www.inquirer.net/fullfeed"),
      n("GMA News Online", "https://www.gmanetwork.com/news/", "feedback@gmanews.com", "https://www.instagram.com/gmanews/", "https://x.com/gmanews", "https://data.gmanetwork.com/gno/rss/news/feed.xml"),
      n("ABS-CBN News", "https://news.abs-cbn.com/", "webmaster@abs-cbn.com", "https://www.instagram.com/abscbnnews/", "https://x.com/ABSCBNNews", "https://news.abs-cbn.com/api/rss/news/most-recent"),
    ],
    minor: [
      n("Rappler", "https://www.rappler.com/", "desk@rappler.com", "https://www.instagram.com/rapplerdotcom/", "https://x.com/rapplerdotcom", "https://www.rappler.com/feed/"),
      n("The Philippine Star", "https://www.philstar.com/", "philstar@philstarmedia.com", "https://www.instagram.com/philstarnews/", "https://x.com/PhilippineStar", "https://www.philstar.com/rss/headlines"),
      n("Manila Bulletin", "https://mb.com.ph/", "editorial@mb.com.ph", "https://www.instagram.com/manilabulletin/", "https://x.com/manila_bulletin", "https://mb.com.ph/feed/"),
      n("BusinessWorld", "https://www.bworldonline.com/", "webmaster@bworldonline.com", "https://www.instagram.com/bworldph/", "https://x.com/bworldph", "https://www.bworldonline.com/feed/"),
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
  TH: {
    major: [
      n("Bangkok Post", "https://www.bangkokpost.com/", "newsroom@bangkokpost.com", "https://www.instagram.com/bangkok_post/", "https://x.com/BangkokPostNews", "https://www.bangkokpost.com/rss/data/topstories.xml"),
      n("The Nation Thailand", "https://www.nationthailand.com/", "webmaster@nationgroup.com", "https://www.instagram.com/thenationthailand/", "https://x.com/Thenationth", "https://www.nationthailand.com/rss"),
      n("Thai PBS", "https://www.thaipbs.or.th/", "info@thaipbs.or.th", "https://www.instagram.com/thaipbs/", "https://x.com/ThaiPBS", "https://news.thaipbs.or.th/rss"),
    ],
    minor: [
      n("Khaosod English", "https://www.khaosodenglish.com/", "editor@khaosodenglish.com", "https://www.instagram.com/khaosodenglish/", "https://x.com/KhaosodEnglish", "https://www.khaosodenglish.com/feed/"),
      n("Thai Enquirer", "https://www.thaienquirer.com/", "editor@thaienquirer.com", "https://www.instagram.com/thaienquirer/", "https://x.com/ThaiEnquirer", "https://www.thaienquirer.com/feed/"),
      n("Prachatai English", "https://prachatai.com/english", "webmaster@prachatai.com", "", "https://x.com/prachatai_en", "https://prachatai.com/english/rss.xml"),
      n("Matichon", "https://www.matichon.co.th/", "matichon@matichon.co.th", "https://www.instagram.com/matichononline/", "https://x.com/MatichonOnline", "https://www.matichon.co.th/feed"),
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
} as const satisfies Record<RcepMemberIsoCode, {
  major: readonly [NewsOutlet, NewsOutlet, NewsOutlet]
  minor: readonly [NewsOutlet, NewsOutlet, NewsOutlet, NewsOutlet]
}>
