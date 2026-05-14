import type { DomesticCourierService } from './types'

function c(
  name: string,
  website: string,
  email: string,
  instagram: string,
  twitter: string
): DomesticCourierService {
  return { name, website, email, instagram, twitter }
}

/**
 * Domestic courier reference rows by ISO 3166-1 alpha-2 for Alliance of Sahel States members.
 * Verify URLs, emails, and social handles locally before production use.
 */
export const AES_DOMESTIC_COURIERS = {
  BF: [
    c(
      'La Poste Burkina Faso (SONAPOST)',
      'http://www.sonapost.bf/',
      'contact@sonapost.bf',
      '',
      '',
    ),
    c(
      'DHL Burkina Faso',
      'https://www.dhl.com/bf-fr/home.html',
      'bf.customerservice@dhl.com',
      'https://www.instagram.com/dhlexpress/',
      'https://x.com/DHLexpress',
    ),
    c(
      'FedEx Burkina Faso',
      'https://www.fedex.com/en-bf',
      'support@fedex.com',
      'https://www.instagram.com/fedex/',
      'https://x.com/FedEx',
    ),
    c(
      'UPS Burkina Faso',
      'https://www.ups.com/bf/fr',
      'help@ups.com',
      'https://www.instagram.com/ups/',
      'https://x.com/UPS',
    ),
  ],
  ML: [
    c(
      'La Poste du Mali EMS',
      'https://www.sap.ml/',
      'contact@post.ml',
      '',
      '',
    ),
    c(
      'DHL Mali',
      'https://www.dhl.com/ml-fr/home.html',
      'ml.customerservice@dhl.com',
      'https://www.instagram.com/dhlexpress/',
      'https://x.com/DHLexpress',
    ),
    c(
      'FedEx Mali (Bamako)',
      'https://www.fedex.com/en-ml',
      'support@fedex.com',
      'https://www.instagram.com/fedex/',
      'https://x.com/FedEx',
    ),
    c(
      'UPS Mali',
      'https://www.ups.com/ml/fr',
      'help@ups.com',
      'https://www.instagram.com/ups/',
      'https://x.com/UPS',
    ),
  ],
  NE: [
    c(
      'La Poste du Niger',
      'http://www.nigerpost.ne/',
      'npn@refer.ne',
      '',
      '',
    ),
    c(
      'DHL Niger',
      'https://www.dhl.com/ne-fr/home.html',
      'ne.customerservice@dhl.com',
      'https://www.instagram.com/dhlexpress/',
      'https://x.com/DHLexpress',
    ),
    c(
      'FedEx Niger (Niamey)',
      'https://www.fedex.com/en-ne',
      'support@fedex.com',
      'https://www.instagram.com/fedex/',
      'https://x.com/FedEx',
    ),
    c(
      'UPS Niger',
      'https://www.ups.com/ne/fr',
      'help@ups.com',
      'https://www.instagram.com/ups/',
      'https://x.com/UPS',
    ),
  ],
} satisfies Record<string, DomesticCourierService[]>
