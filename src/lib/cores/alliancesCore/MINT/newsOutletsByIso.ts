import type { NewsOutlet } from './types'
import type { MintMemberIsoCode } from './mintMemberIsoCodes'

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
 * Three major + four minor national news outlets per MINT economy (informational; verify).
 * 
 * ISOs absent from NEWS_OUTLETS use explicit placeholders (marked "not seeded ... verify"); add seed rows then rerun.
 */
export const MINT_NEWS_OUTLETS = {
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
} as const satisfies Record<MintMemberIsoCode, {
  major: readonly [NewsOutlet, NewsOutlet, NewsOutlet]
  minor: readonly [NewsOutlet, NewsOutlet, NewsOutlet, NewsOutlet]
}>
