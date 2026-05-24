import type { NewsOutlet } from './types'
import type { AesMemberIsoCode } from './aesMemberIsoCodes'

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
 * Three major + four minor national news outlets per allianceOfSahelStates economy (informational; verify).
 */
export const AES_NEWS_OUTLETS = {
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
} as const satisfies Record<AesMemberIsoCode, {
  major: readonly [NewsOutlet, NewsOutlet, NewsOutlet]
  minor: readonly [NewsOutlet, NewsOutlet, NewsOutlet, NewsOutlet]
}>
