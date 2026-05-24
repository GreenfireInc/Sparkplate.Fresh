import type { NewsOutlet } from './types'
import type { IgadMemberIsoCode } from './igadMemberIsoCodes'

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
 * Three major + four minor national news outlets per IGAD economy (informational; verify).
 * 
 * ISOs absent from NEWS_OUTLETS use explicit placeholders (marked "not seeded ... verify"); add seed rows then rerun.
 */
export const IGAD_NEWS_OUTLETS = {
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
} as const satisfies Record<IgadMemberIsoCode, {
  major: readonly [NewsOutlet, NewsOutlet, NewsOutlet]
  minor: readonly [NewsOutlet, NewsOutlet, NewsOutlet, NewsOutlet]
}>
