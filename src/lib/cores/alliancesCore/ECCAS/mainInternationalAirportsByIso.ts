import type { EccasMemberIsoCode } from './eccasMemberIsoCodes'
import type { MainInternationalAirport } from './types'

/**
 * Main international airport per member (capital or primary commercial gateway).
 * Informational; verify URLs, handles, and API bases before production.
 */
export const ECCAS_MAIN_INTERNATIONAL_AIRPORTS: Record<EccasMemberIsoCode, MainInternationalAirport> = {
  AO: {
    name: 'Quatro de Fevereiro International Airport (LAD)',
    website: 'https://www.aeroportosdeangola.co.ao/',
    email: 'info@aeroportosdeangola.co.ao',
    twitter: 'https://x.com/AngolaAirports',
    instagram: 'https://www.instagram.com/angolaairports/',
    linkedin: 'https://www.linkedin.com/company/angola-airports/',
    apiEndpoint: '',
  },
  BI: {
    name: 'Melchior Ndadaye International Airport (BJM)',
    website: 'https://www.aeroport-bujumbura.bi/',
    email: 'info@aeroport-bujumbura.bi',
    twitter: 'https://x.com/AeroportBJM',
    instagram: 'https://www.instagram.com/aeroportbujumbura/',
    linkedin: 'https://www.linkedin.com/company/aeroport-international-bujumbura/',
    apiEndpoint: '',
  },
  CM: {
    name: 'Yaoundé Nsimalen International Airport (NSI)',
    website: 'https://www.aeroport-yaounde.cm/',
    email: 'info@aeroport-yaounde.cm',
    twitter: 'https://x.com/AeroportNSI',
    instagram: 'https://www.instagram.com/aeroportnsimalen/',
    linkedin: 'https://www.linkedin.com/company/aeroport-international-nsimalen/',
    apiEndpoint: '',
  },
  CF: {
    name: 'Bangui M\'Poko International Airport (BGF)',
    website: 'https://www.aeroport-bangui.cf/',
    email: 'info@aeroport-bangui.cf',
    twitter: 'https://x.com/AeroportBGF',
    instagram: 'https://www.instagram.com/aeroportbangui/',
    linkedin: 'https://www.linkedin.com/company/aeroport-international-bangui-mpoko/',
    apiEndpoint: '',
  },
  TD: {
    name: 'N\'Djamena International Airport (NDJ)',
    website: 'https://www.anac.td/',
    email: 'contact@anac.td',
    twitter: 'https://x.com/ANAC_Tchad',
    instagram: 'https://www.instagram.com/anac_tchad/',
    linkedin: 'https://www.linkedin.com/company/anac-tchad/',
    apiEndpoint: '',
  },
  CD: {
    name: 'N\'djili International Airport (FIH)',
    website: 'https://www.rva-rdc.cd/',
    email: 'contact@rva-rdc.cd',
    twitter: 'https://x.com/RVA_RDC',
    instagram: 'https://www.instagram.com/rva_rdc/',
    linkedin: 'https://www.linkedin.com/company/regie-des-voies-aeriennes-rva/',
    apiEndpoint: '',
  },
  GQ: {
    name: 'Malabo International Airport (SSG)',
    website: 'https://www.aeropuerto-malabo.gq/',
    email: 'info@aeropuerto-malabo.gq',
    twitter: 'https://x.com/AeropuertoSSG',
    instagram: 'https://www.instagram.com/aeropuertomalabo/',
    linkedin: 'https://www.linkedin.com/company/aeropuerto-internacional-malabo/',
    apiEndpoint: '',
  },
  GA: {
    name: 'Libreville Leon M\'ba International Airport (LBV)',
    website: 'https://www.aeroport-libreville.ga/',
    email: 'contact@aeroport-libreville.ga',
    twitter: 'https://x.com/AeroportLBV',
    instagram: 'https://www.instagram.com/aeroportlibreville/',
    linkedin: 'https://www.linkedin.com/company/aeroport-leon-mba/',
    apiEndpoint: '',
  },
  CG: {
    name: 'Maya-Maya International Airport (BZV)',
    website: 'https://www.aeroport-brazzaville.cg/',
    email: 'contact@aeroport-brazzaville.cg',
    twitter: 'https://x.com/AeroportBZV',
    instagram: 'https://www.instagram.com/aeroportbrazzaville/',
    linkedin: 'https://www.linkedin.com/company/aeroport-maya-maya/',
    apiEndpoint: '',
  },
  ST: {
    name: 'São Tomé International Airport (TMS)',
    website: 'https://www.stpc.st/',
    email: 'info@stpc.st',
    twitter: 'https://x.com/STPC_Airport',
    instagram: 'https://www.instagram.com/stpc_airport/',
    linkedin: 'https://www.linkedin.com/company/sao-tome-principe-airports/',
    apiEndpoint: '',
  },
}
