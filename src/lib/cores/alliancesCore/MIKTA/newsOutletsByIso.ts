import type { NewsOutlet } from './types'
import type { MiktaMemberIsoCode } from './miktaMemberIsoCodes'

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
 * Three major + four minor national news outlets per MIKTA economy (informational; verify).
 * 
 * ISOs absent from NEWS_OUTLETS use explicit placeholders (marked "not seeded ... verify"); add seed rows then rerun.
 */
export const MIKTA_NEWS_OUTLETS = {
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
} as const satisfies Record<MiktaMemberIsoCode, {
  major: readonly [NewsOutlet, NewsOutlet, NewsOutlet]
  minor: readonly [NewsOutlet, NewsOutlet, NewsOutlet, NewsOutlet]
}>
