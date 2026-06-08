const ECOBANK_MOBILE_IOS = 'https://apps.apple.com/app/ecobank-mobile/id514891772'
const ECOBANK_MOBILE_ANDROID = 'https://play.google.com/store/apps/details?id=com.ecobank.mobileapp'
const BOA_MOBILE_ANDROID = 'https://play.google.com/store/apps/details?id=com.bankoafrica.mobile'

const bank = (
  name,
  phone,
  address,
  mobileAppIos,
  mobileAppAndroid,
  website,
  email,
  twitter,
  instagram,
  linkedin,
  generalRoutingNumber,
  swiftCode,
  apiEndpoint,
) => [
  name,
  phone,
  address,
  mobileAppIos,
  mobileAppAndroid,
  website,
  email,
  twitter,
  instagram,
  linkedin,
  generalRoutingNumber,
  swiftCode,
  apiEndpoint,
]

export const AU_NATIONAL_BANKING_DATA = {
  AO: [
    bank('Banco de Fomento Angola (BFA)', '+244 222 641 840', 'Rua Amilcar Cabral 58, Luanda, Angola', '', '', 'https://www.bfa.ao/', 'cliente@bfa.ao', '', '', 'https://www.linkedin.com/company/bfa-angola/', '', 'BFAOAOLU', ''),
    bank('Banco BIC Angola', '+244 222 670 000', 'Largo 17 de Setembro 3, Luanda, Angola', '', '', 'https://www.bancobic.ao/', 'apoio.cliente@bancobic.ao', '', '', 'https://www.linkedin.com/company/banco-bic-angola/', '', 'BICIAOLU', ''),
    bank('Banco Economico', '+244 226 420 000', 'Rua 1. Congresso do MPLA 8, Luanda, Angola', '', '', 'https://www.bancoeconomico.ao/', 'contactcenter@bancoeconomico.ao', '', '', 'https://www.linkedin.com/company/banco-econ%C3%B3mico-angola/', '', 'BEBKAOLU', ''),
  ],
  BF: [
    bank('Coris Bank International (CBI)', '+226 25 37 77 77', "Avenue Kwame N'Krumah, Ouagadougou 01 BP 5487, Burkina Faso", '', 'https://play.google.com/store/apps/details?id=com.coris.mobile', 'https://www.corisbank.com/', 'contact@corisbank.com', 'https://x.com/CorisBank', 'https://www.instagram.com/corisbank/', 'https://www.linkedin.com/company/coris-bank-international/', '', '', ''),
    bank('Ecobank Burkina Faso', '+226 25 30 62 30', "Avenue Kwame N'Krumah, Ouagadougou 01 BP 4540, Burkina Faso", ECOBANK_MOBILE_IOS, ECOBANK_MOBILE_ANDROID, 'https://www.ecobank.com/bf', 'contactcentre@ecobank.com', 'https://x.com/EcobankGroup', 'https://www.instagram.com/ecobankgroup/', 'https://www.linkedin.com/company/ecobank-transnational-incorporated/', '', '', ''),
    bank('Bank of Africa Burkina Faso (BOA-BF)', '+226 25 31 28 28', 'Avenue de la Nation, Ouagadougou 01 BP 5139, Burkina Faso', '', BOA_MOBILE_ANDROID, 'https://www.boa-bf.com/', 'contact@boa-bf.com', 'https://x.com/BankofAfrica', 'https://www.instagram.com/bankofafrica/', 'https://www.linkedin.com/company/bank-of-africa/', '', '', ''),
  ],
  BI: [
    bank('Banque de Credit de Bujumbura (BCB)', '+257 22 22 10 88', 'Boulevard de la Liberte, Bujumbura, Burundi', '', '', 'https://www.bcb.bi/', 'contact@bcb.bi', '', '', 'https://www.linkedin.com/company/banque-de-cr%C3%A9dit-de-bujumbura/', '', 'BCBIBIBI', ''),
    bank('Interbank Burundi', '+257 22 22 08 50', 'Avenue de l Industrie, Bujumbura, Burundi', '', '', 'https://www.interbankburundi.com/', 'info@interbankburundi.com', '', '', 'https://www.linkedin.com/company/interbank-burundi/', '', 'INBKBIBI', ''),
    bank('BANCOBU', '+257 22 20 80 00', 'Avenue du Large 26, Bujumbura, Burundi', '', '', 'https://www.bancobu.bi/', 'contact@bancobu.bi', '', '', 'https://www.linkedin.com/company/bancobu/', '', 'BCBUBIBI', ''),
  ],
  BJ: [
    bank('Ecobank Benin', '+229 21 31 31 00', 'Boulevard Saint-Michel, Cotonou, Benin', ECOBANK_MOBILE_IOS, ECOBANK_MOBILE_ANDROID, 'https://www.ecobank.com/bj', 'contactcentre@ecobank.com', 'https://x.com/EcobankGroup', 'https://www.instagram.com/ecobankgroup/', 'https://www.linkedin.com/company/ecobank-transnational-incorporated/', '', 'ECOCBJBJ', ''),
    bank('Bank of Africa Benin (BOA-Benin)', '+229 21 31 32 82', 'Avenue Jean-Paul II, Cotonou, Benin', '', BOA_MOBILE_ANDROID, 'https://www.boabenin.com/', 'contact@boabenin.com', 'https://x.com/BankofAfrica', 'https://www.instagram.com/bankofafrica/', 'https://www.linkedin.com/company/bank-of-africa/', '', 'AFRIBJBJ', ''),
    bank('Banque Atlantique Benin', '+229 21 31 10 18', 'Boulevard de la Marina, Cotonou, Benin', '', '', 'https://www.banqueatlantique.net/', 'contact@banqueatlantique.net', '', '', 'https://www.linkedin.com/company/banque-atlantique/', '', '', ''),
  ],
  BW: [
    bank('First National Bank Botswana', '+267 370 6000', 'Plot 8843 Khama Crescent, Gaborone, Botswana', '', '', 'https://www.fnbbotswana.co.bw/', 'customer.service@fnbbotswana.co.bw', '', '', 'https://www.linkedin.com/company/fnb-botswana/', '', 'FIRNBWGX', ''),
    bank('Absa Bank Botswana', '+267 315 9575', 'Absa House, Queens Road, Gaborone, Botswana', '', '', 'https://www.absa.co.bw/', 'absa.bw@absa.africa', '', '', 'https://www.linkedin.com/company/absa/', '', 'BARCBWGX', ''),
    bank('Stanbic Bank Botswana', '+267 398 7801', 'Fairgrounds Office Park, Gaborone, Botswana', '', '', 'https://www.stanbicbank.co.bw/', 'contactcentre@stanbicbank.co.bw', '', '', 'https://www.linkedin.com/company/stanbic-bank-botswana/', '', 'SBICBWGX', ''),
  ],
  CD: [
    bank('Rawbank', '+243 99 601 1300', '3487 Boulevard du 30 Juin, Kinshasa, DR Congo', '', '', 'https://www.rawbank.com/', 'info@rawbank.com', 'https://x.com/Rawbank', '', 'https://www.linkedin.com/company/rawbank/', '', 'RAWBCDKI', ''),
    bank('Equity BCDC', '+243 99 601 1301', '5 Avenue des Aviateurs, Kinshasa, DR Congo', '', '', 'https://equitygroupholdings.com/cd/', 'contact@equitygroupholdings.com', '', '', 'https://www.linkedin.com/company/equity-bank-congo/', '', 'BCDCCDKI', ''),
    bank('Ecobank DRC', '+243 81 555 7700', 'Immeuble Ecobank, Gombe, Kinshasa, DR Congo', ECOBANK_MOBILE_IOS, ECOBANK_MOBILE_ANDROID, 'https://www.ecobank.com/cd', 'contactcentre@ecobank.com', 'https://x.com/EcobankGroup', 'https://www.instagram.com/ecobankgroup/', 'https://www.linkedin.com/company/ecobank-transnational-incorporated/', '', 'ECOCCDKI', ''),
  ],
  CF: [
    bank('Ecobank Centrafrique', '+236 21 61 45 23', 'Avenue des Martyrs, Bangui, Central African Republic', ECOBANK_MOBILE_IOS, ECOBANK_MOBILE_ANDROID, 'https://www.ecobank.com/cf', 'contactcentre@ecobank.com', 'https://x.com/EcobankGroup', 'https://www.instagram.com/ecobankgroup/', 'https://www.linkedin.com/company/ecobank-transnational-incorporated/', '', '', ''),
    bank('Banque Populaire Maroco-Centrafricaine', '+236 21 61 62 30', 'Avenue de l Independance, Bangui, Central African Republic', '', '', 'https://www.bpmc-rca.com/', 'contact@bpmc-rca.com', '', '', '', '', '', ''),
    bank('BGFI Bank Centrafrique', '+236 21 61 33 00', 'Boulevard Charles de Gaulle, Bangui, Central African Republic', '', '', 'https://www.bgfibank.com/', 'contact@bgfibank.com', '', '', 'https://www.linkedin.com/company/bgfi-holding-corporation/', '', 'BGFICFCF', ''),
  ],
  CG: [
    bank('Ecobank Congo', '+242 06 508 0000', 'Avenue Amilcar Cabral, Brazzaville, Republic of the Congo', ECOBANK_MOBILE_IOS, ECOBANK_MOBILE_ANDROID, 'https://www.ecobank.com/cg', 'contactcentre@ecobank.com', 'https://x.com/EcobankGroup', 'https://www.instagram.com/ecobankgroup/', 'https://www.linkedin.com/company/ecobank-transnational-incorporated/', '', 'ECOCCGCG', ''),
    bank('BGFI Bank Congo', '+242 06 695 01 01', 'Avenue Poincare, Brazzaville, Republic of the Congo', '', '', 'https://www.bgfibank.com/', 'contact@bgfibank.com', '', '', 'https://www.linkedin.com/company/bgfi-holding-corporation/', '', 'BGFICGCG', ''),
    bank('Banque Postale du Congo', '+242 05 559 9922', 'Avenue de la Paix, Brazzaville, Republic of the Congo', '', '', 'https://www.bpc.cg/', 'contact@bpc.cg', '', '', '', '', '', ''),
  ],
  CI: [
    bank('Societe Generale Cote d Ivoire (SGCI)', '+225 27 20 20 10 10', 'Immeuble Alpha 2000, Plateau, Abidjan, Cote d Ivoire', '', '', 'https://www.sgci.ci/', 'contacts@sgci.ci', '', '', 'https://www.linkedin.com/company/soci%C3%A9t%C3%A9-g%C3%A9n%C3%A9rale-c%C3%B4te-d-ivoire/', '', 'SOGECICI', ''),
    bank('BICICI', '+225 27 20 20 30 00', 'Avenue Franchet d Esperey, Plateau, Abidjan, Cote d Ivoire', '', '', 'https://www.bicici.com/', 'contact@bicici.com', '', '', 'https://www.linkedin.com/company/bicici/', '', 'BICICICI', ''),
    bank('Ecobank Cote d Ivoire', '+225 27 20 31 59 00', 'Avenue Houdaille, Plateau, Abidjan, Cote d Ivoire', ECOBANK_MOBILE_IOS, ECOBANK_MOBILE_ANDROID, 'https://www.ecobank.com/ci', 'contactcentre@ecobank.com', 'https://x.com/EcobankGroup', 'https://www.instagram.com/ecobankgroup/', 'https://www.linkedin.com/company/ecobank-transnational-incorporated/', '', 'ECOCCICI', ''),
  ],
  CM: [
    bank('Afriland First Bank', '+237 33 42 99 11', 'Avenue du General de Gaulle, Yaounde, Cameroon', '', '', 'https://www.afrilandfirstbank.com/', 'serviceclientele@afrilandfirstbank.com', '', '', 'https://www.linkedin.com/company/afriland-first-bank/', '', 'CCEICMCX', ''),
    bank('Societe Generale Cameroun', '+237 233 50 70 00', 'Immeuble SG Cameroun, Boulevard du 20 Mai, Yaounde, Cameroon', '', '', 'https://www.societegenerale.cm/', 'relations.clientele@socgen.com', '', '', 'https://www.linkedin.com/company/societe-generale-cameroun/', '', 'SGCMCMCX', ''),
    bank('Ecobank Cameroon', '+237 233 50 55 00', 'Boulevard de la Liberte, Douala, Cameroon', ECOBANK_MOBILE_IOS, ECOBANK_MOBILE_ANDROID, 'https://www.ecobank.com/cm', 'contactcentre@ecobank.com', 'https://x.com/EcobankGroup', 'https://www.instagram.com/ecobankgroup/', 'https://www.linkedin.com/company/ecobank-transnational-incorporated/', '', 'ECOCCMCX', ''),
  ],
  CV: [
    bank('Caixa Economica de Cabo Verde', '+238 260 10 10', 'Avenida Cidade de Lisboa, Praia, Cabo Verde', '', '', 'https://www.caixa.cv/', 'atendimento@caixa.cv', '', '', 'https://www.linkedin.com/company/caixa-economica-de-cabo-verde/', '', 'CXECCVCV', ''),
    bank('Banco Comercial do Atlantico (BCA)', '+238 260 46 00', 'Praca Alexandre Albuquerque, Praia, Cabo Verde', '', '', 'https://www.bca.cv/', 'apoio.cliente@bca.cv', '', '', 'https://www.linkedin.com/company/banco-comercial-do-atl%C3%A2ntico/', '', 'BCATCVCV', ''),
    bank('Ecobank Cabo Verde', '+238 260 89 00', 'Palmarejo, Praia, Cabo Verde', ECOBANK_MOBILE_IOS, ECOBANK_MOBILE_ANDROID, 'https://www.ecobank.com/cv', 'contactcentre@ecobank.com', 'https://x.com/EcobankGroup', 'https://www.instagram.com/ecobankgroup/', 'https://www.linkedin.com/company/ecobank-transnational-incorporated/', '', 'ECOCCVCV', ''),
  ],
  DJ: [
    bank('CAC International Bank', '+253 21 32 22 22', 'Place Menelik, Djibouti City, Djibouti', '', '', 'https://www.cacbankdj.com/', 'contact@cacbankdj.com', '', '', 'https://www.linkedin.com/company/cac-international-bank/', '', 'CACBDJDJ', ''),
    bank('Salaam African Bank', '+253 21 35 55 55', 'Avenue Hassan Gouled, Djibouti City, Djibouti', '', '', 'https://www.salaam-bank.com/', 'info@salaam-bank.com', '', '', 'https://www.linkedin.com/company/salaam-african-bank/', '', '', ''),
    bank('BCIMR', '+253 21 35 30 30', 'Place Lagarde, Djibouti City, Djibouti', '', '', 'https://www.bcimr.dj/', 'contact@bcimr.dj', '', '', '', '', '', ''),
  ],
  DZ: [
    bank('Banque Exterieure d Algerie (BEA)', '+213 21 98 02 98', '11 Rue Colonel Amirouche, Algiers, Algeria', '', '', 'https://www.bea.dz/', 'contact@bea.dz', '', '', 'https://www.linkedin.com/company/bea-algerie/', '', '', ''),
    bank('Banque Nationale d Algerie (BNA)', '+213 21 63 56 56', '8 Boulevard Ernesto Che Guevara, Algiers, Algeria', '', '', 'https://www.bna.dz/', 'contact@bna.dz', '', '', 'https://www.linkedin.com/company/banque-nationale-d-alg%C3%A9rie/', '', '', ''),
    bank('Credit Populaire d Algerie (CPA)', '+213 21 63 55 55', '2 Boulevard Colonel Amirouche, Algiers, Algeria', '', '', 'https://www.cpa-bank.dz/', 'contact@cpa-bank.dz', '', '', 'https://www.linkedin.com/company/credit-populaire-d-algerie/', '', '', ''),
  ],
  EG: [
    bank('National Bank of Egypt', '+20 2 2576 0777', '1187 Corniche El Nil, Cairo, Egypt', '', '', 'https://www.nbe.com.eg/', 'customer.service@nbe.com.eg', '', '', 'https://www.linkedin.com/company/national-bank-of-egypt/', '', 'NBEGEGCX', ''),
    bank('Banque Misr', '+20 2 19888', '151 Mohamed Farid St, Cairo, Egypt', '', '', 'https://www.banquemisr.com/', 'customercare@banquemisr.com', '', '', 'https://www.linkedin.com/company/banque-misr/', '', 'BMISEGCX', ''),
    bank('Commercial International Bank (CIB)', '+20 2 19666', '21/23 Charles de Gaulle St, Giza, Egypt', '', '', 'https://www.cibeg.com/', 'customer.care@cibeg.com', '', '', 'https://www.linkedin.com/company/cibegypt/', '', 'CIBEEGCX', ''),
  ],
  EH: [
    bank('Banque Populaire Laayoune', '+212 5288 94 400', 'Avenue Smara, Laayoune, Western Sahara', '', '', 'https://www.gbp.ma/', 'relationclient@gbp.ma', '', '', 'https://www.linkedin.com/company/banque-populaire-maroc/', '', '', ''),
    bank('Attijariwafa bank Sahara', '+212 5288 92 200', 'Avenue Mekka, Laayoune, Western Sahara', '', '', 'https://www.attijariwafabank.com/', 'contact@attijariwafa.com', '', '', 'https://www.linkedin.com/company/attijariwafa-bank/', '', 'BCMAMAMC', ''),
    bank('BMCI Laayoune', '+212 5288 90 050', 'Boulevard Mekka, Laayoune, Western Sahara', '', '', 'https://www.bmci.ma/', 'relationclient@bmci.ma', '', '', 'https://www.linkedin.com/company/bmci/', '', '', ''),
  ],
  ER: [
    bank('Commercial Bank of Eritrea', '+291 1 182 251', 'Harnet Avenue, Asmara, Eritrea', '', '', 'https://www.combank-er.com/', 'info@combank-er.com', '', '', '', '', '', ''),
    bank('Housing and Commerce Bank Eritrea', '+291 1 181 166', 'Godaif Street, Asmara, Eritrea', '', '', 'https://www.hcb-er.com/', 'info@hcb-er.com', '', '', '', '', '', ''),
    bank('Eritrean Investment and Development Bank', '+291 1 181 399', 'Sematat Avenue, Asmara, Eritrea', '', '', 'https://www.eidb-er.com/', 'info@eidb-er.com', '', '', '', '', '', ''),
  ],
  ET: [
    bank('Commercial Bank of Ethiopia', '+251 11 551 9500', 'Ras Desta Damtew St, Addis Ababa, Ethiopia', '', '', 'https://www.combanketh.et/', 'info@cbe.com.et', '', '', 'https://www.linkedin.com/company/commercial-bank-of-ethiopia/', '', 'CBETETAA', ''),
    bank('Awash Bank', '+251 11 558 2727', 'Ras Abebe Aregay St, Addis Ababa, Ethiopia', '', '', 'https://www.awashbank.com/', 'info@awashbank.com', '', '', 'https://www.linkedin.com/company/awash-bank/', '', 'AWINETAA', ''),
    bank('Dashen Bank', '+251 11 518 0300', 'Ras Abebe Aregay St, Addis Ababa, Ethiopia', '', '', 'https://dashenbanksc.com/', 'info@dashenbanksc.com', '', '', 'https://www.linkedin.com/company/dashen-bank/', '', 'DASHEETA', ''),
  ],
  GA: [
    bank('BGFI Bank Gabon', '+241 11 79 54 00', 'Avenue Savorgnan de Brazza, Libreville, Gabon', '', '', 'https://www.bgfibank.com/', 'contact@bgfibank.com', '', '', 'https://www.linkedin.com/company/bgfi-holding-corporation/', '', 'BGFIGALI', ''),
    bank('UBA Gabon', '+241 11 44 11 11', 'Boulevard de l Independance, Libreville, Gabon', '', '', 'https://www.ubagroup.com/', 'cfc@ubagroup.com', '', '', 'https://www.linkedin.com/company/united-bank-for-africa/', '', 'UNAFGALI', ''),
    bank('Ecobank Gabon', '+241 01 44 12 12', 'Avenue du Colonel Parant, Libreville, Gabon', ECOBANK_MOBILE_IOS, ECOBANK_MOBILE_ANDROID, 'https://www.ecobank.com/ga', 'contactcentre@ecobank.com', 'https://x.com/EcobankGroup', 'https://www.instagram.com/ecobankgroup/', 'https://www.linkedin.com/company/ecobank-transnational-incorporated/', '', 'ECOCGALI', ''),
  ],
  GH: [
    bank('GCB Bank', '+233 302 664910', 'Thorpe Road, Accra, Ghana', '', '', 'https://www.gcbbank.com.gh/', 'customerservice@gcbbank.com.gh', '', '', 'https://www.linkedin.com/company/gcb-bank-limited/', '', 'GHCBGHAC', ''),
    bank('Ecobank Ghana', '+233 302 213999', '2 Morocco Lane, Accra, Ghana', ECOBANK_MOBILE_IOS, ECOBANK_MOBILE_ANDROID, 'https://www.ecobank.com/gh', 'contactcentre@ecobank.com', 'https://x.com/EcobankGroup', 'https://www.instagram.com/ecobankgroup/', 'https://www.linkedin.com/company/ecobank-transnational-incorporated/', '', 'ECOCGHAC', ''),
    bank('Absa Bank Ghana', '+233 302 429150', 'Absa House, High Street, Accra, Ghana', '', '', 'https://www.absa.com.gh/', 'absa.gh@absa.africa', '', '', 'https://www.linkedin.com/company/absa/', '', 'BARCGHAC', ''),
  ],
  GM: [
    bank('Trust Bank Gambia', '+220 439 5136', '7 Ecowas Avenue, Banjul, The Gambia', '', '', 'https://www.trustbankgambia.com/', 'info@trustbankgambia.com', '', '', 'https://www.linkedin.com/company/trust-bank-limited-gambia/', '', 'TBLIGMGM', ''),
    bank('Ecobank Gambia', '+220 439 9600', 'Kairaba Avenue, Serrekunda, The Gambia', ECOBANK_MOBILE_IOS, ECOBANK_MOBILE_ANDROID, 'https://www.ecobank.com/gm', 'contactcentre@ecobank.com', 'https://x.com/EcobankGroup', 'https://www.instagram.com/ecobankgroup/', 'https://www.linkedin.com/company/ecobank-transnational-incorporated/', '', 'ECOCGMGM', ''),
    bank('AGIB Bank', '+220 422 4465', 'Hagan Street, Banjul, The Gambia', '', '', 'https://www.agib.gm/', 'info@agib.gm', '', '', '', '', '', ''),
  ],
  GN: [
    bank('Ecobank Guinea', '+224 622 50 08 08', 'Avenue de la Republique, Conakry, Guinea', ECOBANK_MOBILE_IOS, ECOBANK_MOBILE_ANDROID, 'https://www.ecobank.com/gn', 'contactcentre@ecobank.com', 'https://x.com/EcobankGroup', 'https://www.instagram.com/ecobankgroup/', 'https://www.linkedin.com/company/ecobank-transnational-incorporated/', '', 'ECOCGNGN', ''),
    bank('VistaGui Bank', '+224 628 68 68 68', 'Kaloum, Conakry, Guinea', '', '', 'https://www.vistabankgroup.com/', 'contact@vistabankgroup.com', '', '', 'https://www.linkedin.com/company/vista-bank-group/', '', '', ''),
    bank('UBA Guinea', '+224 622 95 11 11', 'Avenue de la Republique, Conakry, Guinea', '', '', 'https://www.ubagroup.com/', 'cfc@ubagroup.com', '', '', 'https://www.linkedin.com/company/united-bank-for-africa/', '', '', ''),
  ],
  GQ: [
    bank('BANGE', '+240 333 09 46 00', 'Avenida de la Independencia, Malabo, Equatorial Guinea', '', '', 'https://www.bange.es/', 'atencion.cliente@bange.es', '', '', 'https://www.linkedin.com/company/banco-nacional-de-guinea-ecuatorial/', '', 'BANGGQGQ', ''),
    bank('CCEI Bank Guinea Ecuatorial', '+240 333 09 21 00', 'Carretera del Aeropuerto, Malabo, Equatorial Guinea', '', '', 'https://www.cceibankge.com/', 'contact@cceibankge.com', '', '', '', '', 'CCEIGQGQ', ''),
    bank('BGFI Bank Guinea Ecuatorial', '+240 333 09 66 00', 'Avenida Hassan II, Malabo, Equatorial Guinea', '', '', 'https://www.bgfibank.com/', 'contact@bgfibank.com', '', '', 'https://www.linkedin.com/company/bgfi-holding-corporation/', '', 'BGFIGQGQ', ''),
  ],
  GW: [
    bank('Banco da Africa Ocidental (BAO)', '+245 955 111 111', 'Avenida Amilcar Cabral, Bissau, Guinea-Bissau', '', '', 'https://www.bao.gw/', 'contacto@bao.gw', '', '', '', '', '', ''),
    bank('Ecobank Guinea-Bissau', '+245 955 555 555', 'Avenida dos Combatentes, Bissau, Guinea-Bissau', ECOBANK_MOBILE_IOS, ECOBANK_MOBILE_ANDROID, 'https://www.ecobank.com/gw', 'contactcentre@ecobank.com', 'https://x.com/EcobankGroup', 'https://www.instagram.com/ecobankgroup/', 'https://www.linkedin.com/company/ecobank-transnational-incorporated/', '', '', ''),
    bank('Banco da Uniao (BDU)', '+245 966 666 666', 'Praza Che Guevara, Bissau, Guinea-Bissau', '', '', 'https://www.bdu-gw.com/', 'info@bdu-gw.com', '', '', '', '', '', ''),
  ],
  KE: [
    bank('KCB Bank Kenya', '+254 20 3270000', 'Kencom House, Moi Avenue, Nairobi, Kenya', '', '', 'https://ke.kcbgroup.com/', 'contactcentre@kcbgroup.com', '', '', 'https://www.linkedin.com/company/kcb-bank-kenya-limited/', '', 'KCBLKENX', ''),
    bank('Equity Bank Kenya', '+254 763 000 000', 'Equity Centre, Hospital Road, Nairobi, Kenya', '', '', 'https://equitygroupholdings.com/ke/', 'info@equitybank.co.ke', '', '', 'https://www.linkedin.com/company/equity-bank-limited/', '', 'EQBLKENA', ''),
    bank('Co-operative Bank of Kenya', '+254 20 2776000', 'Co-op House, Haile Selassie Avenue, Nairobi, Kenya', '', '', 'https://www.co-opbank.co.ke/', 'customerservice@co-opbank.co.ke', '', '', 'https://www.linkedin.com/company/co-operative-bank-of-kenya/', '', 'KCOOKENA', ''),
  ],
  KM: [
    bank('Banque Federale de Commerce (BFC)', '+269 773 20 00', 'Place de France, Moroni, Comoros', '', '', 'https://www.bfc-comores.com/', 'contact@bfc-comores.com', '', '', '', '', '', ''),
    bank('Exim Bank Comores', '+269 773 25 25', 'Avenue de la Corniche, Moroni, Comoros', '', '', 'https://www.eximbankcomores.com/', 'info@eximbankcomores.com', '', '', '', '', '', ''),
    bank('SNPSF', '+269 773 18 18', 'Avenue Ali Soilih, Moroni, Comoros', '', '', 'https://www.snpsf.com/', 'contact@snpsf.com', '', '', '', '', '', ''),
  ],
  LR: [
    bank('Ecobank Liberia', '+231 77 070 7000', '9th Street Sinkor, Monrovia, Liberia', ECOBANK_MOBILE_IOS, ECOBANK_MOBILE_ANDROID, 'https://www.ecobank.com/lr', 'contactcentre@ecobank.com', 'https://x.com/EcobankGroup', 'https://www.instagram.com/ecobankgroup/', 'https://www.linkedin.com/company/ecobank-transnational-incorporated/', '', 'ECOCLRLM', ''),
    bank('International Bank Liberia', '+231 88 651 0042', 'Tubman Boulevard, Monrovia, Liberia', '', '', 'https://www.ibliberia.com/', 'info@ibliberia.com', '', '', '', '', 'IBLRLRLM', ''),
    bank('Liberian Bank for Development and Investment', '+231 88 651 0000', 'Ashmun Street, Monrovia, Liberia', '', '', 'https://www.lbdi.net/', 'info@lbdi.net', '', '', 'https://www.linkedin.com/company/lbdi/', '', 'LBDILRLM', ''),
  ],
  LS: [
    bank('Standard Lesotho Bank', '+266 2223 1234', 'Kingsway Road, Maseru, Lesotho', '', '', 'https://www.standardlesothobank.co.ls/', 'customer.service@standardlesothobank.co.ls', '', '', 'https://www.linkedin.com/company/standard-lesotho-bank/', '', 'SBICLSMX', ''),
    bank('Nedbank Lesotho', '+266 2221 2555', 'Kingsway Street, Maseru, Lesotho', '', '', 'https://www.nedbank.co.ls/', 'customerservice@nedbank.co.ls', '', '', 'https://www.linkedin.com/company/nedbank/', '', 'NEDSLSMX', ''),
    bank('First National Bank Lesotho', '+266 2224 1000', 'Pioneer Mall, Maseru, Lesotho', '', '', 'https://www.fnb.co.ls/', 'fnbcustomercare@fnb.co.ls', '', '', 'https://www.linkedin.com/company/fnb-lesotho/', '', 'FIRNLSMX', ''),
  ],
  LY: [
    bank('Wahda Bank', '+218 21 333 5511', 'Omar Mukhtar Street, Tripoli, Libya', '', '', 'https://wahdabank.ly/', 'info@wahdabank.ly', '', '', '', '', '', ''),
    bank('Jumhouria Bank', '+218 21 360 2000', 'Al Fatah Street, Tripoli, Libya', '', '', 'https://www.jbank.ly/', 'info@jbank.ly', '', '', '', '', '', ''),
    bank('National Commercial Bank Libya', '+218 21 444 9200', 'September 1st Street, Tripoli, Libya', '', '', 'https://www.ncb.ly/', 'info@ncb.ly', '', '', '', '', '', ''),
  ],
  MA: [
    bank('Attijariwafa bank', '+212 5 22 58 88 88', '2 Boulevard Moulay Youssef, Casablanca, Morocco', '', '', 'https://www.attijariwafabank.com/', 'contact@attijariwafa.com', '', '', 'https://www.linkedin.com/company/attijariwafa-bank/', '', 'BCMAMAMC', ''),
    bank('Banque Populaire du Maroc', '+212 5 22 20 25 25', '101 Boulevard Mohamed Zerktouni, Casablanca, Morocco', '', '', 'https://www.gbp.ma/', 'relationclient@gbp.ma', '', '', 'https://www.linkedin.com/company/banque-populaire-maroc/', '', 'BCPOMAMC', ''),
    bank('Bank of Africa Maroc', '+212 5 22 46 90 00', '140 Avenue Hassan II, Casablanca, Morocco', '', BOA_MOBILE_ANDROID, 'https://www.bankofafrica.ma/', 'relationclient@bankofafrica.ma', 'https://x.com/BankofAfrica', 'https://www.instagram.com/bankofafrica/', 'https://www.linkedin.com/company/bank-of-africa/', '', 'BMCEMAMC', ''),
  ],
  MG: [
    bank('BNI Madagascar', '+261 20 22 217 17', '74 Rue du 26 Juin 1960, Antananarivo, Madagascar', '', '', 'https://www.bni.mg/', 'contact@bni.mg', '', '', 'https://www.linkedin.com/company/bni-madagascar/', '', 'CLMADMGM', ''),
    bank('Bank of Africa Madagascar', '+261 20 22 206 06', 'Immeuble BOA, Analakely, Antananarivo, Madagascar', '', BOA_MOBILE_ANDROID, 'https://www.boamadagascar.com/', 'contact@boamadagascar.com', 'https://x.com/BankofAfrica', 'https://www.instagram.com/bankofafrica/', 'https://www.linkedin.com/company/bank-of-africa/', '', 'AFRIMGMG', ''),
    bank('BGFI Bank Madagascar', '+261 20 22 629 00', 'Zone Galaxy, Andraharo, Antananarivo, Madagascar', '', '', 'https://www.bgfibank.com/', 'contact@bgfibank.com', '', '', 'https://www.linkedin.com/company/bgfi-holding-corporation/', '', '', ''),
  ],
  ML: [
    bank('Bank of Africa Mali (BOA Mali)', '+223 20 22 33 44', 'Avenue du Mali, Bamako BP E 2798, Mali', '', BOA_MOBILE_ANDROID, 'https://www.boamali.com/', 'contact@boamali.com', 'https://x.com/BankofAfrica', 'https://www.instagram.com/bankofafrica/', 'https://www.linkedin.com/company/bank-of-africa/', '', '', ''),
    bank('Ecobank Mali', '+223 20 22 99 99', 'Avenue du Mali, Bamako BP 224, Mali', ECOBANK_MOBILE_IOS, ECOBANK_MOBILE_ANDROID, 'https://www.ecobank.com/ml', 'contactcentre@ecobank.com', 'https://x.com/EcobankGroup', 'https://www.instagram.com/ecobankgroup/', 'https://www.linkedin.com/company/ecobank-transnational-incorporated/', '', '', ''),
    bank('Banque de Developpement du Mali (BDM)', '+223 20 22 12 12', 'Avenue Modibo Keita, Bamako BP 224, Mali', '', 'https://play.google.com/store/apps/details?id=com.bdm.mobile', 'https://www.bdm.ml/', 'contact@bdm.ml', '', '', 'https://www.linkedin.com/company/banque-de-d%C3%A9veloppement-du-mali/', '', '', ''),
  ],
  MR: [
    bank('Banque Mauritanienne pour le Commerce International (BMCI)', '+222 45 29 11 22', 'Avenue Gamal Abdel Nasser, Nouakchott, Mauritania', '', '', 'https://www.bmci.mr/', 'contact@bmci.mr', '', '', '', '', 'BMCIMRMR', ''),
    bank('Banque El Amana', '+222 45 25 55 55', 'Tevragh Zeina, Nouakchott, Mauritania', '', '', 'https://www.elamana-bank.mr/', 'info@elamana-bank.mr', '', '', '', '', '', ''),
    bank('Societe Generale Mauritanie', '+222 45 29 33 33', 'Ilot K, Nouakchott, Mauritania', '', '', 'https://www.societegenerale.mr/', 'contact@societegenerale.mr', '', '', '', '', '', ''),
  ],
  MU: [
    bank('The Mauritius Commercial Bank', '+230 202 5000', 'Sir William Newton St, Port Louis, Mauritius', '', '', 'https://www.mcb.mu/', 'contact@mcb.mu', '', '', 'https://www.linkedin.com/company/the-mauritius-commercial-bank-limited/', '', 'MCBLMUMU', ''),
    bank('SBM Bank (Mauritius)', '+230 202 1111', '1 Queen Elizabeth II Avenue, Port Louis, Mauritius', '', '', 'https://www.sbmgroup.mu/', 'sbm@sbmgroup.mu', '', '', 'https://www.linkedin.com/company/sbm-bank-mauritius-ltd/', '', 'STCBMUMU', ''),
    bank('Absa Bank Mauritius', '+230 402 1000', 'Absa House, Wall Street, Ebene, Mauritius', '', '', 'https://www.absabank.mu/', 'absamauritius@absa.africa', '', '', 'https://www.linkedin.com/company/absa/', '', 'BARCMUMU', ''),
  ],
  MW: [
    bank('National Bank of Malawi', '+265 1 820 333', '7 Henderson Street, Blantyre, Malawi', '', '', 'https://www.natbank.co.mw/', 'customer.service@natbank.co.mw', '', '', 'https://www.linkedin.com/company/national-bank-of-malawi/', '', 'NBMAMWMW', ''),
    bank('FDH Bank', '+265 1 820 222', 'FDH House, Glyn Jones Road, Blantyre, Malawi', '', '', 'https://www.fdh.co.mw/', 'customerservice@fdh.co.mw', '', '', 'https://www.linkedin.com/company/fdh-bank-plc/', '', 'FDHFMWMW', ''),
    bank('Standard Bank Malawi', '+265 1 820 944', 'Kaomba Centre, Blantyre, Malawi', '', '', 'https://www.standardbank.co.mw/', 'malawi@standardbank.co.mw', '', '', 'https://www.linkedin.com/company/standard-bank-group/', '', 'SBICMWMX', ''),
  ],
  MZ: [
    bank('Banco Comercial e de Investimentos (BCI)', '+258 21 352 700', 'Praca 25 de Junho, Maputo, Mozambique', '', '', 'https://www.bci.co.mz/', 'cliente@bci.co.mz', '', '', 'https://www.linkedin.com/company/bci-banco-comercial-e-de-investimentos/', '', 'BCIOMZMA', ''),
    bank('Millennium bim', '+258 21 350 000', 'Avenida Julius Nyerere 3435, Maputo, Mozambique', '', '', 'https://ind.millenniumbim.co.mz/', 'cliente@millenniumbim.co.mz', '', '', 'https://www.linkedin.com/company/millennium-bim/', '', 'MILLMZMA', ''),
    bank('Standard Bank Mozambique', '+258 21 327 000', 'Avenida Julius Nyerere 4, Maputo, Mozambique', '', '', 'https://www.standardbank.co.mz/', 'contactcentre@standardbank.co.mz', '', '', 'https://www.linkedin.com/company/standard-bank-group/', '', 'SBICMZMX', ''),
  ],
  NA: [
    bank('Bank Windhoek', '+264 61 299 1200', 'C/o Independence Ave & Fidel Castro St, Windhoek, Namibia', '', '', 'https://www.bankwindhoek.com.na/', 'info@bankwindhoek.com.na', '', '', 'https://www.linkedin.com/company/bank-windhoek/', '', 'BWLINANX', ''),
    bank('First National Bank Namibia', '+264 61 299 2222', '209 Independence Avenue, Windhoek, Namibia', '', '', 'https://www.fnbnamibia.com.na/', 'custhelp@fnbnamibia.com.na', '', '', 'https://www.linkedin.com/company/fnb-namibia/', '', 'FIRNNANX', ''),
    bank('Nedbank Namibia', '+264 61 295 2222', 'Nedbank Campus, Fidel Castro St, Windhoek, Namibia', '', '', 'https://nedbanknamibia.com.na/', 'info@nedbanknamibia.com.na', '', '', 'https://www.linkedin.com/company/nedbank/', '', 'NEDSNANX', ''),
  ],
  NE: [
    bank('Ecobank Niger', '+227 20 73 20 20', 'Avenue du General de Gaulle, Niamey BP 11207, Niger', ECOBANK_MOBILE_IOS, ECOBANK_MOBILE_ANDROID, 'https://www.ecobank.com/ne', 'contactcentre@ecobank.com', 'https://x.com/EcobankGroup', 'https://www.instagram.com/ecobankgroup/', 'https://www.linkedin.com/company/ecobank-transnational-incorporated/', '', '', ''),
    bank('Banque Commerciale du Niger (BCN)', '+227 20 73 33 33', 'Avenue du General de Gaulle, Niamey BP 11207, Niger', '', BOA_MOBILE_ANDROID, 'https://www.boa-ne.com/', 'contact@boa-ne.com', 'https://x.com/BankofAfrica', 'https://www.instagram.com/bankofafrica/', 'https://www.linkedin.com/company/bank-of-africa/', '', '', ''),
    bank('BIA-Niger (Banque Internationale pour l Afrique au Niger)', '+227 20 73 11 11', 'Rue du Commerce, Niamey BP 10966, Niger', '', 'https://play.google.com/store/apps/details?id=com.bianiger.mobile', 'https://www.bianiger.com/', 'contact@bianiger.com', '', '', 'https://www.linkedin.com/company/bia-niger/', '', '', ''),
  ],
  NG: [
    bank('Access Bank Nigeria', '+234 1 271 2005', '14/15 Prince Alaba Oniru St, Victoria Island, Lagos, Nigeria', '', '', 'https://www.accessbankplc.com/', 'contactcenter@accessbankplc.com', '', '', 'https://www.linkedin.com/company/access-bank-plc/', '', 'ABNGNGLA', ''),
    bank('First Bank of Nigeria', '+234 1 905 2326', 'Samuel Asabia House, 35 Marina, Lagos, Nigeria', '', '', 'https://www.firstbanknigeria.com/', 'firstcontact@firstbanknigeria.com', '', '', 'https://www.linkedin.com/company/first-bank-of-nigeria-limited/', '', 'FBNINGLA', ''),
    bank('Zenith Bank Nigeria', '+234 1 278 7000', 'Plot 84 Ajose Adeogun St, Victoria Island, Lagos, Nigeria', '', '', 'https://www.zenithbank.com/', 'zenithdirect@zenithbank.com', '', '', 'https://www.linkedin.com/company/zenith-bank-plc/', '', 'ZEIBNGLA', ''),
  ],
  RW: [
    bank('Bank of Kigali', '+250 788 143 000', 'KN3 Ave, Kigali, Rwanda', '', '', 'https://www.bk.rw/', 'customerservice@bk.rw', '', '', 'https://www.linkedin.com/company/bank-of-kigali/', '', 'BKIGRWRW', ''),
    bank('I&M Bank Rwanda', '+250 252 575 000', 'KN3 Ave, Kigali, Rwanda', '', '', 'https://www.imbankrw.com/', 'customercare@imbank.co.rw', '', '', 'https://www.linkedin.com/company/i-m-bank-rwanda/', '', 'IMRWRWRW', ''),
    bank('Ecobank Rwanda', '+250 252 550 678', 'Avenue de la Paix, Kigali, Rwanda', ECOBANK_MOBILE_IOS, ECOBANK_MOBILE_ANDROID, 'https://www.ecobank.com/rw', 'contactcentre@ecobank.com', 'https://x.com/EcobankGroup', 'https://www.instagram.com/ecobankgroup/', 'https://www.linkedin.com/company/ecobank-transnational-incorporated/', '', 'ECOCRWRW', ''),
  ],
  SC: [
    bank('Nouvobanq', '+248 4 280 800', 'Rue de la Possession, Victoria, Seychelles', '', '', 'https://www.nouvobanq.sc/', 'info@nouvobanq.sc', '', '', 'https://www.linkedin.com/company/nouvobanq/', '', 'NOVHSCSC', ''),
    bank('Absa Bank Seychelles', '+248 4 389 000', 'Independence House Annex, Victoria, Seychelles', '', '', 'https://www.absa.sc/', 'seychelles@absa.africa', '', '', 'https://www.linkedin.com/company/absa/', '', 'BARCSCSC', ''),
    bank('Mauritius Commercial Bank Seychelles', '+248 4 288 800', '9th Floor, Caravelle House, Victoria, Seychelles', '', '', 'https://www.mcbseychelles.sc/', 'contact@mcbseychelles.sc', '', '', 'https://www.linkedin.com/company/mcb-seychelles/', '', 'MCBLSCSC', ''),
  ],
  SD: [
    bank('Bank of Khartoum', '+249 183 782 000', 'Mek Nimir Ave, Khartoum, Sudan', '', '', 'https://bankofkhartoum.com/', 'contactus@bok.sd', '', '', 'https://www.linkedin.com/company/bank-of-khartoum/', '', 'BOKHSDKH', ''),
    bank('Omdurman National Bank', '+249 183 783 200', 'Baladia Street, Khartoum, Sudan', '', '', 'https://www.onb-sd.com/', 'info@onb-sd.com', '', '', '', '', 'ONBKSDKH', ''),
    bank('Faisal Islamic Bank Sudan', '+249 183 774 000', 'Al Gamhouria Street, Khartoum, Sudan', '', '', 'https://www.fibsudan.com/', 'info@fibsudan.com', '', '', 'https://www.linkedin.com/company/faisal-islamic-bank-sudan/', '', 'FIBSSDKH', ''),
  ],
  SL: [
    bank('Sierra Leone Commercial Bank', '+232 76 600 000', '23 Siaka Stevens St, Freetown, Sierra Leone', '', '', 'https://www.slcb.sl/', 'info@slcb.sl', '', '', 'https://www.linkedin.com/company/sierra-leone-commercial-bank/', '', 'SLCBSLSL', ''),
    bank('Rokel Commercial Bank', '+232 76 555 555', '1 Wallace Johnson St, Freetown, Sierra Leone', '', '', 'https://www.rokelbank.com/', 'info@rokelbank.com', '', '', 'https://www.linkedin.com/company/rokel-commercial-bank/', '', 'ROKLSLSL', ''),
    bank('Ecobank Sierra Leone', '+232 77 986 986', '35 Lightfoot Boston St, Freetown, Sierra Leone', ECOBANK_MOBILE_IOS, ECOBANK_MOBILE_ANDROID, 'https://www.ecobank.com/sl', 'contactcentre@ecobank.com', 'https://x.com/EcobankGroup', 'https://www.instagram.com/ecobankgroup/', 'https://www.linkedin.com/company/ecobank-transnational-incorporated/', '', 'ECOCSLSL', ''),
  ],
  SN: [
    bank('CBAO Groupe Attijariwafa Bank', '+221 33 889 6800', '1 Place de l Independance, Dakar, Senegal', '', '', 'https://www.cbao.sn/', 'contact@cbao.sn', '', '', 'https://www.linkedin.com/company/cbao-groupe-attijariwafa-bank/', '', 'CBAOSNDA', ''),
    bank('Societe Generale Senegal', '+221 33 839 5500', '19 Avenue Nelson Mandela, Dakar, Senegal', '', '', 'https://www.societegenerale.sn/', 'relation.client@socgen.com', '', '', 'https://www.linkedin.com/company/soci%C3%A9t%C3%A9-g%C3%A9n%C3%A9rale-s%C3%A9n%C3%A9gal/', '', 'SOGESNDA', ''),
    bank('Ecobank Senegal', '+221 33 889 8300', 'Boulevard de la Republique, Dakar, Senegal', ECOBANK_MOBILE_IOS, ECOBANK_MOBILE_ANDROID, 'https://www.ecobank.com/sn', 'contactcentre@ecobank.com', 'https://x.com/EcobankGroup', 'https://www.instagram.com/ecobankgroup/', 'https://www.linkedin.com/company/ecobank-transnational-incorporated/', '', 'ECOCSNDA', ''),
  ],
  SO: [
    bank('Salaam Somali Bank', '+252 61 700 0000', 'KM4, Mogadishu, Somalia', '', '', 'https://www.salaambank.so/', 'info@salaambank.so', '', '', 'https://www.linkedin.com/company/salaam-somali-bank/', '', '', ''),
    bank('Premier Bank Somalia', '+252 61 222 1111', 'Airport Road, Mogadishu, Somalia', '', '', 'https://www.premierbank.so/', 'info@premierbank.so', '', '', 'https://www.linkedin.com/company/premier-bank-somalia/', '', '', ''),
    bank('Dahabshiil Bank International', '+252 63 333 3000', 'Maka Al Mukarama Road, Mogadishu, Somalia', '', '', 'https://www.dahabshiilbank.com/', 'info@dahabshiilbank.com', '', '', 'https://www.linkedin.com/company/dahabshiil-bank-international/', '', '', ''),
  ],
  SS: [
    bank('Ivory Bank', '+211 92 210 0000', 'Airport Road, Juba, South Sudan', '', '', 'https://www.ivorybankss.com/', 'info@ivorybankss.com', '', '', 'https://www.linkedin.com/company/ivory-bank/', '', '', ''),
    bank('Equity Bank South Sudan', '+211 92 535 5555', 'Customs Market, Juba, South Sudan', '', '', 'https://equitygroupholdings.com/ss/', 'info@equitybankss.com', '', '', 'https://www.linkedin.com/company/equity-bank-limited/', '', '', ''),
    bank('Cooperative Bank of South Sudan', '+211 92 911 1111', 'Nimule Street, Juba, South Sudan', '', '', 'https://www.co-opbankss.com/', 'info@co-opbankss.com', '', '', '', '', '', ''),
  ],
  ST: [
    bank('International Bank of Sao Tome e Principe', '+239 224 56 00', 'Avenida Marginal 12 de Julho, Sao Tome, Sao Tome and Principe', '', '', 'https://www.bistp.st/', 'info@bistp.st', '', '', '', '', 'BISTSTST', ''),
    bank('Ecobank Sao Tome and Principe', '+239 222 65 50', 'Rua Patrice Lumumba, Sao Tome, Sao Tome and Principe', ECOBANK_MOBILE_IOS, ECOBANK_MOBILE_ANDROID, 'https://www.ecobank.com/st', 'contactcentre@ecobank.com', 'https://x.com/EcobankGroup', 'https://www.instagram.com/ecobankgroup/', 'https://www.linkedin.com/company/ecobank-transnational-incorporated/', '', '', ''),
    bank('Banco Privado Sao Tome e Principe', '+239 224 30 30', 'Avenida Kwame Nkrumah, Sao Tome, Sao Tome and Principe', '', '', 'https://www.bpstp.st/', 'info@bpstp.st', '', '', '', '', '', ''),
  ],
  SZ: [
    bank('Eswatini Bank', '+268 2404 1000', 'Swazi Plaza, Mbabane, Eswatini', '', '', 'https://www.eswatinibank.co.sz/', 'info@eswatinibank.co.sz', '', '', 'https://www.linkedin.com/company/eswatini-bank/', '', '', ''),
    bank('Standard Bank Eswatini', '+268 2408 3000', 'Swazi Trade House, Mbabane, Eswatini', '', '', 'https://www.standardbank.co.sz/', 'service@standardbank.co.sz', '', '', 'https://www.linkedin.com/company/standard-bank-group/', '', 'SBICSZMX', ''),
    bank('Nedbank Eswatini', '+268 2408 5600', 'Nedbank Centre, Mbabane, Eswatini', '', '', 'https://www.nedbank.co.sz/', 'contact@nedbank.co.sz', '', '', 'https://www.linkedin.com/company/nedbank/', '', 'NEDSSZMX', ''),
  ],
  TD: [
    bank('Ecobank Tchad', '+235 22 51 51 10', 'Avenue Charles de Gaulle, N Djamena, Chad', ECOBANK_MOBILE_IOS, ECOBANK_MOBILE_ANDROID, 'https://www.ecobank.com/td', 'contactcentre@ecobank.com', 'https://x.com/EcobankGroup', 'https://www.instagram.com/ecobankgroup/', 'https://www.linkedin.com/company/ecobank-transnational-incorporated/', '', 'ECOCTDTD', ''),
    bank('Orabank Tchad', '+235 22 52 52 52', 'Avenue du General Malloum, N Djamena, Chad', '', '', 'https://www.orabank.net/', 'contact@orabank.net', '', '', 'https://www.linkedin.com/company/orabank/', '', '', ''),
    bank('Commercial Bank Tchad', '+235 22 53 44 44', 'Boulevard de Gaulle, N Djamena, Chad', '', '', 'https://www.cbtchad.com/', 'contact@cbtchad.com', '', '', '', '', '', ''),
  ],
  TG: [
    bank('Ecobank Togo', '+228 22 53 55 00', '2 Rue du Commerce, Lome, Togo', ECOBANK_MOBILE_IOS, ECOBANK_MOBILE_ANDROID, 'https://www.ecobank.com/tg', 'contactcentre@ecobank.com', 'https://x.com/EcobankGroup', 'https://www.instagram.com/ecobankgroup/', 'https://www.linkedin.com/company/ecobank-transnational-incorporated/', '', 'ECOCTGTG', ''),
    bank('Orabank Togo', '+228 22 21 72 72', '3613 Boulevard du 13 Janvier, Lome, Togo', '', '', 'https://www.orabank.net/', 'contact@orabank.net', '', '', 'https://www.linkedin.com/company/orabank/', '', 'ORBKTGTG', ''),
    bank('Banque Togolaise pour le Commerce et l Industrie (BTCI)', '+228 22 21 58 58', 'Rue du Commerce, Lome, Togo', '', '', 'https://www.btci.tg/', 'contact@btci.tg', '', '', '', '', 'BTKITGTG', ''),
  ],
  TN: [
    bank('Banque Internationale Arabe de Tunisie (BIAT)', '+216 71 155 000', '70-72 Avenue Habib Bourguiba, Tunis, Tunisia', '', '', 'https://www.biat.com.tn/', 'contact@biat.com.tn', '', '', 'https://www.linkedin.com/company/biat/', '', 'BIATTNTT', ''),
    bank('Amen Bank', '+216 71 148 000', 'Avenue Mohamed V, Tunis, Tunisia', '', '', 'https://www.amenbank.com.tn/', 'relationclientele@amenbank.com.tn', '', '', 'https://www.linkedin.com/company/amen-bank/', '', 'CFCTTNTT', ''),
    bank('BH Bank', '+216 71 126 000', '18 Avenue Mohamed V, Tunis, Tunisia', '', '', 'https://www.bhbank.tn/', 'contact@bhbank.tn', '', '', 'https://www.linkedin.com/company/bh-bank/', '', 'BHBKTNTT', ''),
  ],
  TZ: [
    bank('NMB Bank Tanzania', '+255 22 232 2000', 'NMB House, Ohio Street, Dar es Salaam, Tanzania', '', '', 'https://www.nmbbank.co.tz/', 'customercare@nmbbank.co.tz', '', '', 'https://www.linkedin.com/company/nmb-bank-plc/', '', 'NMIBTZTZ', ''),
    bank('CRDB Bank', '+255 22 219 7700', 'Azikiwe Street, Dar es Salaam, Tanzania', '', '', 'https://www.crdbbank.co.tz/', 'servicequality@crdbbank.co.tz', '', '', 'https://www.linkedin.com/company/crdb-bank-plc/', '', 'CORUTZTZ', ''),
    bank('NBC Bank Tanzania', '+255 22 219 7000', 'Sokoine Drive, Dar es Salaam, Tanzania', '', '', 'https://nbc.co.tz/', 'customercare@nbc.co.tz', '', '', 'https://www.linkedin.com/company/nbc-bank-tanzania/', '', 'NICATZTZ', ''),
  ],
  UG: [
    bank('Stanbic Bank Uganda', '+256 312 224 600', 'Plot 17 Hannington Road, Kampala, Uganda', '', '', 'https://www.stanbicbank.co.ug/', 'customercare@stanbic.com', '', '', 'https://www.linkedin.com/company/stanbic-bank-uganda/', '', 'SBICUGKX', ''),
    bank('Centenary Bank', '+256 417 126 000', 'Mapeera House, Kampala Road, Kampala, Uganda', '', '', 'https://www.centenarybank.co.ug/', 'customerservice@centenarybank.co.ug', '', '', 'https://www.linkedin.com/company/centenary-bank-uganda/', '', 'CERBUGKA', ''),
    bank('dfcu Bank', '+256 312 300 000', 'Plot 26 Kyadondo Road, Kampala, Uganda', '', '', 'https://www.dfcugroup.com/', 'customercare@dfcugroup.com', '', '', 'https://www.linkedin.com/company/dfcu-bank/', '', 'DFCUUGKA', ''),
  ],
  ZA: [
    bank('Standard Bank South Africa', '+27 11 636 9111', '5 Simmonds Street, Johannesburg, South Africa', '', '', 'https://www.standardbank.co.za/', 'information@standardbank.co.za', '', '', 'https://www.linkedin.com/company/standard-bank-group/', '', 'SBZAZAJJ', ''),
    bank('First National Bank South Africa', '+27 87 575 9404', '1 First Place, Bank City, Johannesburg, South Africa', '', '', 'https://www.fnb.co.za/', 'fnbcustomercare@fnb.co.za', '', '', 'https://www.linkedin.com/company/fnb-south-africa/', '', 'FIRNZAJJ', ''),
    bank('Absa Bank South Africa', '+27 11 350 4000', '7th Floor, Absa Towers West, Johannesburg, South Africa', '', '', 'https://www.absa.co.za/', 'absa@absa.africa', '', '', 'https://www.linkedin.com/company/absa/', '', 'ABSAZAJJ', ''),
  ],
  ZM: [
    bank('Zanaco', '+260 211 220 314', 'Cairo Road, Lusaka, Zambia', '', '', 'https://www.zanaco.co.zm/', 'customercare@zanaco.co.zm', '', '', 'https://www.linkedin.com/company/zanaco/', '', 'ZNCOZMLU', ''),
    bank('Absa Bank Zambia', '+260 211 366 800', 'Stand 4643, Addis Ababa Drive, Lusaka, Zambia', '', '', 'https://www.absa.co.zm/', 'zambia@absa.africa', '', '', 'https://www.linkedin.com/company/absa/', '', 'BARCZMLX', ''),
    bank('Stanbic Bank Zambia', '+260 211 224 700', 'Corner of Great East Road and Addis Ababa Drive, Lusaka, Zambia', '', '', 'https://www.stanbicbank.co.zm/', 'zambia@stanbic.com', '', '', 'https://www.linkedin.com/company/stanbic-bank-zambia/', '', 'SBICZMLX', ''),
  ],
  ZW: [
    bank('CBZ Bank', '+263 242 748 050', 'Union House, 60 Kwame Nkrumah Ave, Harare, Zimbabwe', '', '', 'https://www.cbz.co.zw/', 'contactcentre@cbz.co.zw', '', '', 'https://www.linkedin.com/company/cbz-bank-limited/', '', 'COBZZWHA', ''),
    bank('Steward Bank Zimbabwe', '+263 242 795 858', '1906 Liberation Legacy Way, Harare, Zimbabwe', '', '', 'https://www.stewardbank.co.zw/', 'contactcentre@stewardbank.co.zw', '', '', 'https://www.linkedin.com/company/steward-bank-zimbabwe/', '', '', ''),
    bank('Stanbic Bank Zimbabwe', '+263 242 758 311', 'Stanbic Centre, 59 Samora Machel Ave, Harare, Zimbabwe', '', '', 'https://www.stanbicbank.co.zw/', 'customercare@stanbic.co.zw', '', '', 'https://www.linkedin.com/company/stanbic-bank-zimbabwe/', '', 'SBICZWHX', ''),
  ],
}
