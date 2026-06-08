import type { BricsMemberIsoCode } from './bricsMemberIsoCodes'
import type { MainInternationalSeaport } from './types'

function seaport(
  name: string,
  website: string,
  email: string,
  twitter: string,
  instagram: string,
  linkedin: string,
  customsEmail: string,
  customsWebsite: string,
  customsAddress: string,
  apiEndpoint = '',
): MainInternationalSeaport {
  return {
    name,
    website,
    email,
    twitter,
    instagram,
    linkedin,
    apiEndpoint,
    customsOffice: {
      email: customsEmail,
      website: customsWebsite,
      address: customsAddress,
    },
  }
}

/**
 * Main international seaport per BRICS founding member (coastal gateway or principal maritime access point).
 * Informational; verify URLs, handles, customs contacts, and API bases before production.
 * Self-contained — no imports from other alliance modules.
 */
export const BRICS_MAIN_INTERNATIONAL_SEAPORTS: Record<BricsMemberIsoCode, MainInternationalSeaport> = {
  BR: seaport(
    'Port of Santos',
    'https://www.portodesantos.com.br/',
    'atendimento@portodesantos.com.br',
    'https://x.com/PortoSantos',
    'https://www.instagram.com/portodesantos/',
    'https://www.linkedin.com/company/porto-de-santos/',
    'atendimento@receita.fazenda.gov.br',
    'https://www.gov.br/receitafederal',
    'Receita Federal — Porto de Santos, Santos, Brazil',
  ),
  RU: seaport(
    'Port of Vladivostok',
    'https://www.vmtp.ru/',
    'info@vmtp.ru',
    'https://x.com/VladivostokPort',
    'https://www.instagram.com/vladivostokport/',
    'https://www.linkedin.com/company/vladivostok-sea-port/',
    'customs@fts.customs.ru',
    'https://www.customs.ru',
    'Far Eastern Customs — Port of Vladivostok, Vladivostok, Russia',
  ),
  IN: seaport(
    'Jawaharlal Nehru Port (Nhava Sheva)',
    'https://www.jnport.gov.in/',
    'info@jnport.gov.in',
    'https://x.com/JNPort',
    'https://www.instagram.com/jnport/',
    'https://www.linkedin.com/company/jawaharlal-nehru-port-trust/',
    'customs@cbic.gov.in',
    'https://www.cbic.gov.in',
    'Indian Customs — Jawaharlal Nehru Port, Navi Mumbai, India',
  ),
  CN: seaport(
    'Port of Shanghai',
    'https://www.portshanghai.com.cn/',
    'info@portshanghai.com.cn',
    'https://x.com/PortShanghai',
    'https://www.instagram.com/portshanghai/',
    'https://www.linkedin.com/company/shanghai-international-port-group/',
    'customs@customs.gov.cn',
    'https://www.customs.gov.cn',
    'General Administration of Customs — Port of Shanghai, Shanghai, China',
  ),
  ZA: seaport(
    'Port of Durban',
    'https://www.transnetnationalportsauthority.net/',
    'info@tnpa.co.za',
    'https://x.com/TNPA_Official',
    'https://www.instagram.com/tnpa_official/',
    'https://www.linkedin.com/company/transnet-national-ports-authority/',
    'customs@sars.gov.za',
    'https://www.sars.gov.za',
    'South African Revenue Service — Customs, Port of Durban, Durban, South Africa',
  ),
}
