import type { DomesticCourierService } from './types'

function c(
  name: string,
  website: string,
  email: string,
  instagram: string,
  twitter: string,
  apiEndpoint: string,
): DomesticCourierService {
  return { name, website, email, instagram, twitter, apiEndpoint }
}

/**
 * Domestic courier reference rows by ISO 3166-1 alpha-2 for Arab Maghreb Union (AMU) members.
 * Verify URLs, emails, social handles, and `apiEndpoint` bases locally before production use.
 */
export const AMU_DOMESTIC_COURIERS = {
  DZ: [
    c(
      'Algérie Poste EMS',
      'https://www.poste.dz/',
      'contact@poste.dz',
      'https://www.instagram.com/algerie_poste/',
      'https://x.com/AlgeriePoste',
      '',
    ),
    c(
      'Yalidine Express',
      'https://yalidine.co/',
      'support@yalidine.co',
      'https://www.instagram.com/yalidine.express/',
      'https://x.com/yalidineDZ',
      '',
    ),
    c(
      'Zimou Express',
      'https://zimou.app/',
      'contact@zimou.app',
      'https://www.instagram.com/zimouexpress/',
      'https://x.com/ZimouExpress',
      '',
    ),
    c(
      'DHL Algeria',
      'https://www.dhl.com/dz-en/home.html',
      'dz.customerservice@dhl.com',
      'https://www.instagram.com/dhlexpress/',
      'https://x.com/DHLexpress',
      'https://api-eu.dhl.com/',
    ),
  ],
  LY: [
    c(
      'Libyan Post Company (LPC)',
      'http://nlpc.ly/',
      'info@nlpc.ly',
      '',
      '',
      '',
    ),
    c(
      'DHL Libya (service partners)',
      'https://www.dhl.com/ly-ar/home.html',
      'ly.customerservice@dhl.com',
      'https://www.instagram.com/dhlexpress/',
      'https://x.com/DHLexpress',
      'https://api-eu.dhl.com/',
    ),
    c(
      'Aramex Libya',
      'https://www.aramex.com/',
      'customerservicely@aramex.com',
      'https://www.instagram.com/aramex/',
      'https://x.com/aramex',
      'https://ws.aramex.net/',
    ),
    c(
      'FedEx Libya (forwarding desks)',
      'https://www.fedex.com/en-ly',
      'support@fedex.com',
      'https://www.instagram.com/fedex/',
      'https://x.com/FedEx',
      'https://apis.fedex.com/',
    ),
  ],
  MR: [
    c(
      'Société Mauritanienne des Postes (Mauripost)',
      'https://mauripost.mr/',
      'contact@mauripost.mr',
      '',
      '',
      '',
    ),
    c(
      'DHL Mauritania',
      'https://www.dhl.com/mr-fr/home.html',
      'mr.customerservice@dhl.com',
      'https://www.instagram.com/dhlexpress/',
      'https://x.com/DHLexpress',
      'https://api-eu.dhl.com/',
    ),
    c(
      'FedEx Mauritania (Nouakchott)',
      'https://www.fedex.com/en-mr',
      'support@fedex.com',
      'https://www.instagram.com/fedex/',
      'https://x.com/FedEx',
      'https://apis.fedex.com/',
    ),
    c(
      'UPS Mauritania',
      'https://www.ups.com/mr/fr',
      'help@ups.com',
      'https://www.instagram.com/ups/',
      'https://x.com/UPS',
      'https://onlinetools.ups.com/api/',
    ),
  ],
  MA: [
    c(
      'Barid Al-Maghrib EMS',
      'https://www.barid.ma/',
      'webmaster@barid.ma',
      'https://www.instagram.com/barid.ma/',
      'https://x.com/BaridAlMaghrib',
      '',
    ),
    c(
      'Amana Express',
      'https://amanacolis.ma/',
      'contact@amanacolis.ma',
      'https://www.instagram.com/amanexpress/',
      'https://x.com/AmanaExpress_',
      '',
    ),
    c(
      'Chronopost Maroc',
      'https://www.chronopost.ma/',
      'client@chronopost.ma',
      'https://www.instagram.com/chronopostmaroc/',
      'https://x.com/ChronopostMaroc',
      '',
    ),
    c(
      'DHL Morocco',
      'https://www.dhl.com/ma-fr/home.html',
      'ma.customerservice@dhl.com',
      'https://www.instagram.com/dhlexpress/',
      'https://x.com/DHLexpress',
      'https://api-eu.dhl.com/',
    ),
  ],
  TN: [
    c(
      'Rapid-Poste (La Poste Tunisienne EMS)',
      'https://www.rapidposte.tn/',
      'contact@rapidposte.com.tn',
      'https://www.instagram.com/rapidpostenetunisienne/',
      'https://x.com/RapidposteTN',
      '',
    ),
    c(
      'Aramex Tunisia',
      'https://www.aramex.com/',
      'customerservicetn@aramex.com',
      'https://www.instagram.com/aramex/',
      'https://x.com/aramex',
      'https://ws.aramex.net/',
    ),
    c(
      'DHL Tunisia',
      'https://www.dhl.com/tn-en/home.html',
      'tn.customerservice@dhl.com',
      'https://www.instagram.com/dhlexpress/',
      'https://x.com/DHLexpress',
      'https://api-eu.dhl.com/',
    ),
    c(
      'FedEx Tunisia',
      'https://www.fedex.com/en-tn',
      'support@fedex.com',
      'https://www.instagram.com/fedex/',
      'https://x.com/FedEx',
      'https://apis.fedex.com/',
    ),
  ],
} satisfies Record<string, DomesticCourierService[]>
