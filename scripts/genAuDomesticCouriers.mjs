/**
 * Generates src/lib/cores/alliancesCore/africanUnion/domesticCouriersByIso.ts
 * Run: node scripts/genAuDomesticCouriers.mjs
 */
import { writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const outPath = join(__dirname, '..', 'src/lib/cores/alliancesCore/africanUnion/domesticCouriersByIso.ts')

/** @type {Record<string, [string, string, string, string, string][]>} */
const ROWS = {
  DZ: [
    ['Algérie Poste EMS', 'https://www.poste.dz/', 'contact@poste.dz', '', 'https://x.com/AlgPoste'],
    ['Yalidine', 'https://yalidine.co/', 'support@yalidine.co', 'https://www.instagram.com/yalidine.express/', 'https://x.com/yalidineDZ'],
    ['DHL Algeria', 'https://www.dhl.com/dz-en/home.html', 'dz.customerservice@dhl.com', 'https://www.instagram.com/dhlexpress/', 'https://x.com/DHLexpress'],
    ['EMS / Colis postaux (Barid)', 'https://www.poste.dz/', 'express@poste.dz', '', ''],
  ],
  AO: [
    ['CTT Angola (Empresa Nacional de Correios)', 'https://www.ctt.ao/', 'geral@ctt.ao', 'https://www.instagram.com/correiosdeangola/', 'https://x.com/cttangola'],
    ['DHL Angola', 'https://www.dhl.com/ao-en/home.html', 'customerservice@dhl.com', 'https://www.instagram.com/dhlexpress/', 'https://x.com/DHLexpress'],
    ['FedEx Angola partner network', 'https://www.fedex.com/en-ao', 'support@fedex.com', 'https://www.instagram.com/fedex/', 'https://x.com/FedEx'],
    ['UPS service points', 'https://www.ups.com/ao/en', 'help@ups.com', 'https://www.instagram.com/ups/', 'https://x.com/UPS'],
  ],
  BJ: [
    ['La Poste du Bénin', 'https://www.poste.bj/', 'contact@poste.bj', '', ''],
    ['DHL Benin', 'https://www.dhl.com/bj-en/home.html', 'bj.customerservice@dhl.com', 'https://www.instagram.com/dhlexpress/', 'https://x.com/DHLexpress'],
    ['Chronopost (partner counters)', 'https://www.chronopost.fr/', 'commercialinternational.dealears@geopost.com', 'https://www.instagram.com/chronopost/', 'https://x.com/chronopost'],
    ['FedEx Benin', 'https://www.fedex.com/en-bj', 'support@fedex.com', 'https://www.instagram.com/fedex/', 'https://x.com/FedEx'],
  ],
  BW: [
    ['BotswanaPost', 'https://www.botspost.co.bw/', 'customercare@botspost.co.bw', 'https://www.instagram.com/botswanapost/', 'https://x.com/BotswanaPost'],
    ['DHL Botswana', 'https://www.dhl.com/bw-en/home.html', 'bw.customerservice@dhl.com', 'https://www.instagram.com/dhlexpress/', 'https://x.com/DHLexpress'],
    ['FedEx Botswana', 'https://www.fedex.com/en-bw', 'support@fedex.com', 'https://www.instagram.com/fedex/', 'https://x.com/FedEx'],
    ['The Courier Guy (regional lockers)', 'https://thecourierguy.co.za/', 'support@thecourierguy.co.za', 'https://www.instagram.com/thecourierguy/', 'https://x.com/thecourier_guy'],
  ],
  BF: [
    ['La Poste Burkina Faso (SONAPOST)', 'http://www.sonapost.bf/', 'contact@sonapost.bf', '', ''],
    ['DHL Burkina Faso', 'https://www.dhl.com/bf-fr/home.html', 'bf.customerservice@dhl.com', 'https://www.instagram.com/dhlexpress/', 'https://x.com/DHLexpress'],
    ['FedEx Burkina Faso', 'https://www.fedex.com/en-bf', 'support@fedex.com', 'https://www.instagram.com/fedex/', 'https://x.com/FedEx'],
    ['UPS Burkina Faso', 'https://www.ups.com/bf/fr', 'help@ups.com', 'https://www.instagram.com/ups/', 'https://x.com/UPS'],
  ],
  BI: [
    ['Régie nationale des Postes du Burundi', 'http://www.poste.bi/', 'info@burundipost.bi', '', ''],
    ['DHL Burundi', 'https://www.dhl.com/bi-fr/home.html', 'bi.customerservice@dhl.com', 'https://www.instagram.com/dhlexpress/', 'https://x.com/DHLexpress'],
    ['FedEx Burundi agents', 'https://www.fedex.com/en-bi', 'support@fedex.com', 'https://www.instagram.com/fedex/', 'https://x.com/FedEx'],
    ['Aramex Burundi corridor', 'https://www.aramex.com/', 'support@aramex.com', 'https://www.instagram.com/aramex/', 'https://x.com/aramex'],
  ],
  CM: [
    ['CAMPOST', 'http://campost.cm/', 'info@campost.cm', '', ''],
    ['DHL Cameroon', 'https://www.dhl.com/cm-fr/home.html', 'cm.customerservice@dhl.com', 'https://www.instagram.com/dhlexpress/', 'https://x.com/DHLexpress'],
    ['FedEx Cameroon', 'https://www.fedex.com/en-cm', 'support@fedex.com', 'https://www.instagram.com/fedex/', 'https://x.com/FedEx'],
    ['UPS Cameroon', 'https://www.ups.com/cm/fr', 'help@ups.com', 'https://www.instagram.com/ups/', 'https://x.com/UPS'],
  ],
  CV: [
    ['Correios de Cabo Verde', 'https://correios.cv/', 'cac@cvcorreios.cv', 'https://www.instagram.com/correioscv/', 'https://x.com/correioscv'],
    ['DHL Cabo Verde', 'https://www.dhl.com/cv-en/home.html', 'cv.customerservice@dhl.com', 'https://www.instagram.com/dhlexpress/', 'https://x.com/DHLexpress'],
    ['FedEx Cabo Verde', 'https://www.fedex.com/en-cv', 'support@fedex.com', 'https://www.instagram.com/fedex/', 'https://x.com/FedEx'],
    ['UPS Cabo Verde', 'https://www.ups.com/cv/pt', 'help@ups.com', 'https://www.instagram.com/ups/', 'https://x.com/UPS'],
  ],
  CF: [
    ["Office national des Postes RCA", 'https://onet-rca.cf/', 'contact@onet-rca.cf', '', ''],
    ['DHL Central African Republic agents', 'https://www.dhl.com/cf-en/home.html', 'cf.customerservice@dhl.com', 'https://www.instagram.com/dhlexpress/', 'https://x.com/DHLexpress'],
    ['FedEx CFA partner desks', 'https://www.fedex.com/', 'support@fedex.com', 'https://www.instagram.com/fedex/', 'https://x.com/FedEx'],
    ['UPS humanitarian corridor desks', 'https://www.ups.com/', 'help@ups.com', 'https://www.instagram.com/ups/', 'https://x.com/UPS'],
  ],
  TD: [
    ['Direction générale du courrier SCET (La Poste Tchadienne)', 'https://www.laposte.td/', 'contact@laposte.td', '', ''],
    ['DHL Chad', 'https://www.dhl.com/td-en/home.html', 'td.customerservice@dhl.com', 'https://www.instagram.com/dhlexpress/', 'https://x.com/DHLexpress'],
    ['FedEx Chad partners', 'https://www.fedex.com/', 'support@fedex.com', 'https://www.instagram.com/fedex/', 'https://x.com/FedEx'],
    ['UPS Chad contractors', 'https://www.ups.com/', 'help@ups.com', 'https://www.instagram.com/ups/', 'https://x.com/UPS'],
  ],
  KM: [
    ["Comores Poste", 'https://poste-comores.com/', 'contact@poste-comores.km', '', ''],
    ['DHL Comoros', 'https://www.dhl.com/km-en/home.html', 'km.customerservice@dhl.com', 'https://www.instagram.com/dhlexpress/', 'https://x.com/DHLexpress'],
    ['FedEx Comoros', 'https://www.fedex.com/', 'support@fedex.com', 'https://www.instagram.com/fedex/', 'https://x.com/FedEx'],
    ['EMS Moroni hubs', 'https://www.upu.int/', 'upt.contact@poste-comores.km', '', ''],
  ],
  CD: [
    ["SCPT RDC (Services postaux)", 'https://scpt.cd/', 'info@postesrdc.cd', '', ''],
    ['DHL Congo (DRC)', 'https://www.dhl.com/cd-fr/home.html', 'cd.customerservice@dhl.com', 'https://www.instagram.com/dhlexpress/', 'https://x.com/DHLexpress'],
    ['FedEx DRC hubs', 'https://www.fedex.com/', 'support@fedex.com', 'https://www.instagram.com/fedex/', 'https://x.com/FedEx'],
    ['UPS Congo Kinshasa', 'https://www.ups.com/cd/fr', 'help@ups.com', 'https://www.instagram.com/ups/', 'https://x.com/UPS'],
  ],
  DJ: [
    ["La Poste de Djibouti", 'https://www.investindjibouti.com/', 'poste.contact@yahoo.fr', '', ''],
    ['DHL Djibouti', 'https://www.dhl.com/dj-en/home.html', 'dj.customerservice@dhl.com', 'https://www.instagram.com/dhlexpress/', 'https://x.com/DHLexpress'],
    ['FedEx Djibouti FZ partners', 'https://www.fedex.com/', 'support@fedex.com', 'https://www.instagram.com/fedex/', 'https://x.com/FedEx'],
    ['UPS Djibouti logistics', 'https://www.ups.com/', 'help@ups.com', 'https://www.instagram.com/ups/', 'https://x.com/UPS'],
  ],
  EG: [
    ['Egypt Post', 'http://www.egpost.org/', 'webmaster@egpost.org', 'https://www.instagram.com/egypt.post/', 'https://x.com/Egyptpost'],
    ['Aramex Egypt', 'https://www.aramex.com/', 'customerserviceegypt@aramex.com', 'https://www.instagram.com/aramex/', 'https://x.com/aramex'],
    ['DHL Egypt', 'https://www.dhl.com/eg-en/home.html', 'eg.customerservice@dhl.com', 'https://www.instagram.com/dhlexpress/', 'https://x.com/DHLexpress'],
    ['FedEx Egypt', 'https://www.fedex.com/en-eg', 'support@fedex.com', 'https://www.instagram.com/fedex/', 'https://x.com/FedEx'],
  ],
  GQ: [
    ['Guinea ECuatorial Correos — GECELL', 'https://www.correosgq.com/', 'info@correosgq.com', '', ''],
    ['DHL Equatorial Guinea', 'https://www.dhl.com/gq-en/home.html', 'gq.customerservice@dhl.com', 'https://www.instagram.com/dhlexpress/', 'https://x.com/DHLexpress'],
    ['FedEx Malabo/Bata desks', 'https://www.fedex.com/', 'support@fedex.com', 'https://www.instagram.com/fedex/', 'https://x.com/FedEx'],
    ['UPS oil-sector logistics counters', 'https://www.ups.com/', 'help@ups.com', 'https://www.instagram.com/ups/', 'https://x.com/UPS'],
  ],
  ER: [
    ["Eritrean Postal Service", 'https://www.shabait.com/category/national-development/telecom-post/', 'info@ericsson.com.er', '', ''],
    ['DHL Eritrea agents', 'https://www.dhl.com/er-en/home.html', 'er.customerservice@dhl.com', 'https://www.instagram.com/dhlexpress/', 'https://x.com/DHLexpress'],
    ['FedEx regional forwarding', 'https://www.fedex.com/', 'support@fedex.com', 'https://www.instagram.com/fedex/', 'https://x.com/FedEx'],
    ['EMS partner routing', 'https://www.upu.int/', '', '', ''],
  ],
  SZ: [
    ["Eswatini Posts & Telecommunications Corporation", 'https://www.eswatinipost.co.sz/', 'info@post.co.sz', '', ''],
    ['DHL Eswatini', 'https://www.dhl.com/sz-en/home.html', 'sz.customerservice@dhl.com', 'https://www.instagram.com/dhlexpress/', 'https://x.com/DHLexpress'],
    ['FedEx Eswatini', 'https://www.fedex.com/en-sz', 'support@fedex.com', 'https://www.instagram.com/fedex/', 'https://x.com/FedEx'],
    ['SA Post Office cross-border (regional)', 'https://www.postoffice.co.za/', 'custserv@postoffice.co.za', 'https://www.instagram.com/sapostoffice/', 'https://x.com/PostofficeSa'],
  ],
  ET: [
    ["Ethiopian Postal Service EMS", '', '', '', ''],
    ['Ethiopian Airlines Cargo / postal programs', 'https://www.ethiopianairlines.com/', 'cargotracking@ethiopianairlines.com', 'https://www.instagram.com/fly.ethiopian/', 'https://x.com/flyethiopian'],
    ['DHL Ethiopia', 'https://www.dhl.com/et-en/home.html', 'et.customerservice@dhl.com', 'https://www.instagram.com/dhlexpress/', 'https://x.com/DHLexpress'],
    ['FedEx Ethiopia Addis hubs', 'https://www.fedex.com/', 'support@fedex.com', 'https://www.instagram.com/fedex/', 'https://x.com/FedEx'],
  ],
  GA: [
    ['Gabon Poste EMS', 'https://www.infosgabon.ga/', 'infos@gpost.ga', '', ''],
    ['DHL Gabon', 'https://www.dhl.com/ga-fr/home.html', 'ga.customerservice@dhl.com', 'https://www.instagram.com/dhlexpress/', 'https://x.com/DHLexpress'],
    ['Chronopost Afrique desks', 'https://www.chronopost.fr/', 'commercialinternational.dealears@geopost.com', 'https://www.instagram.com/chronopost/', 'https://x.com/chronopost'],
    ['FedEx Gabon', 'https://www.fedex.com/en-ga', 'support@fedex.com', 'https://www.instagram.com/fedex/', 'https://x.com/FedEx'],
  ],
  GM: [
    ['GamPost', 'https://gampost.gm/', 'info@gampost.gm', '', ''],
    ['DHL Gambia', 'https://www.dhl.com/gm-en/home.html', 'gm.customerservice@dhl.com', 'https://www.instagram.com/dhlexpress/', 'https://x.com/DHLexpress'],
    ['FedEx Gambia Banjul', 'https://www.fedex.com/', 'support@fedex.com', 'https://www.instagram.com/fedex/', 'https://x.com/FedEx'],
    ['UPS Senegal–Gambia corridor', 'https://www.ups.com/', 'help@ups.com', 'https://www.instagram.com/ups/', 'https://x.com/UPS'],
  ],
  GH: [
    ['Ghana Post', 'http://ghanapost.com.gh/', 'info@ghanapost.com.gh', 'https://www.instagram.com/ghanapostgh/', 'https://x.com/ghanapostgh'],
    ['Ghana EMS', 'http://ghanapost.com.gh/', 'ems@ghanapost.com.gh', '', ''],
    ['DHL Ghana', 'https://www.dhl.com/gh-en/home.html', 'gh.customerservice@dhl.com', 'https://www.instagram.com/dhlexpress/', 'https://x.com/DHLexpress'],
    ['FedEx Ghana', 'https://www.fedex.com/en-gh', 'support@fedex.com', 'https://www.instagram.com/fedex/', 'https://x.com/FedEx'],
  ],
  GN: [
    ["La Poste Guinée", 'https://www.gui.post/', 'direction@gui.post', '', ''],
    ['DHL Guinea', 'https://www.dhl.com/gn-fr/home.html', 'gn.customerservice@dhl.com', 'https://www.instagram.com/dhlexpress/', 'https://x.com/DHLexpress'],
    ['FedEx Conakry', 'https://www.fedex.com/', 'support@fedex.com', 'https://www.instagram.com/fedex/', 'https://x.com/FedEx'],
    ['UPS Guinea', 'https://www.ups.com/', 'help@ups.com', 'https://www.instagram.com/ups/', 'https://x.com/UPS'],
  ],
  GW: [
    ['Correios da Guiné-Bissau', 'https://www.correios.gw/', 'geral@cgb.gw', '', ''],
    ['DHL Guinea-Bissau agents', 'https://www.dhl.com/gw-pt/home.html', 'gw.customerservice@dhl.com', 'https://www.instagram.com/dhlexpress/', 'https://x.com/DHLexpress'],
    ['FedEx Bissau partners', 'https://www.fedex.com/', 'support@fedex.com', 'https://www.instagram.com/fedex/', 'https://x.com/FedEx'],
    ['EMS regional routing', 'https://www.ctt.pt/', 'cac@ctt.pt', 'https://www.instagram.com/cttcorreiosdeportugal/', 'https://x.com/cttcorreios'],
  ],
  CI: [
    ['La Poste de Côte d’Ivoire', 'https://www.la-poste.ci/', 'info@laposte.ci', '', ''],
    ['DHL Ivory Coast', 'https://www.dhl.com/ci-fr/home.html', 'ci.customerservice@dhl.com', 'https://www.instagram.com/dhlexpress/', 'https://x.com/DHLexpress'],
    ['FedEx Ivory Coast', 'https://www.fedex.com/en-ci', 'support@fedex.com', 'https://www.instagram.com/fedex/', 'https://x.com/FedEx'],
    ['UPS Abidjan', 'https://www.ups.com/ci/fr', 'help@ups.com', 'https://www.instagram.com/ups/', 'https://x.com/UPS'],
  ],
  KE: [
    ['Postal Corporation of Kenya', 'http://posta.co.ke/', 'customercare@posta.co.ke', 'https://www.instagram.com/postakenya/', ''],
    ['DHL Kenya', 'https://www.dhl.com/ke-en/home.html', 'ke.customerservice@dhl.com', 'https://www.instagram.com/dhlexpress/', 'https://x.com/DHLexpress'],
    ['FedEx Kenya', 'https://www.fedex.com/en-ke', 'support@fedex.com', 'https://www.instagram.com/fedex/', 'https://x.com/FedEx'],
    ['UPS Kenya', 'https://www.ups.com/ke/en', 'help@ups.com', 'https://www.instagram.com/ups/', 'https://x.com/UPS'],
  ],
  LS: [
    ['Lesotho Postal Services', 'https://lesothopost.org.ls/', 'info@post.org.ls', '', ''],
    ['DHL Lesotho', 'https://www.dhl.com/ls-en/home.html', 'ls.customerservice@dhl.com', 'https://www.instagram.com/dhlexpress/', 'https://x.com/DHLexpress'],
    ['FedEx Lesotho Maseru', 'https://www.fedex.com/', 'support@fedex.com', 'https://www.instagram.com/fedex/', 'https://x.com/FedEx'],
    ['SA PostOffice regional trunk', 'https://www.postoffice.co.za/', 'custserv@postoffice.co.za', 'https://www.instagram.com/sapostoffice/', 'https://x.com/PostofficeSa'],
  ],
  LR: [
    ['LIBPOST', 'https://libpost.com.lr/', 'info@libpost.com.lr', '', ''],
    ['DHL Liberia', 'https://www.dhl.com/lr-en/home.html', 'lr.customerservice@dhl.com', 'https://www.instagram.com/dhlexpress/', 'https://x.com/DHLexpress'],
    ['FedEx Monrovia', 'https://www.fedex.com/', 'support@fedex.com', 'https://www.instagram.com/fedex/', 'https://x.com/FedEx'],
    ['UPS Liberia', 'https://www.ups.com/', 'help@ups.com', 'https://www.instagram.com/ups/', 'https://x.com/UPS'],
  ],
  LY: [
    ['Libyan Post Company', 'http://nlpc.ly/', 'info@nlpc.ly', '', ''],
    ['DHL Libya service partners', 'https://www.dhl.com/ly-ar/home.html', 'ly.customerservice@dhl.com', 'https://www.instagram.com/dhlexpress/', 'https://x.com/DHLexpress'],
    ['Aramex Libya', 'https://www.aramex.com/', 'customerservicely@aramex.com', 'https://www.instagram.com/aramex/', 'https://x.com/aramex'],
    ['FedEx Tripoli corridors', 'https://www.fedex.com/', 'support@fedex.com', 'https://www.instagram.com/fedex/', 'https://x.com/FedEx'],
  ],
  MG: [
    ['Paositra Malagasy', 'http://www.poste.mg/', 'contact@paositra.mg', 'https://www.instagram.com/paositramalagasy/', 'https://x.com/Paositra'],
    ['Chronopost Madagascar partner', 'https://www.chronopost.fr/', 'commercialinternational.dealears@geopost.com', '', ''],
    ['DHL Madagascar', 'https://www.dhl.com/mg-fr/home.html', 'mg.customerservice@dhl.com', 'https://www.instagram.com/dhlexpress/', 'https://x.com/DHLexpress'],
    ['FedEx Madagascar', 'https://www.fedex.com/en-mg', 'support@fedex.com', 'https://www.instagram.com/fedex/', 'https://x.com/FedEx'],
  ],
  MW: [
    ['Macpost Malawi', 'https://malawipost.gov.mw/', 'info@malawipost.gov.mw', '', ''],
    ['DHL Malawi', 'https://www.dhl.com/mw-en/home.html', 'mw.customerservice@dhl.com', 'https://www.instagram.com/dhlexpress/', 'https://x.com/DHLexpress'],
    ['FedEx Malawi', 'https://www.fedex.com/', 'support@fedex.com', 'https://www.instagram.com/fedex/', 'https://x.com/FedEx'],
    ['UPS Malawi', 'https://www.ups.com/', 'help@ups.com', 'https://www.instagram.com/ups/', 'https://x.com/UPS'],
  ],
  ML: [
    ['La Poste du Mali EMS', 'https://www.sap.ml/', 'contact@post.ml', '', ''],
    ['DHL Mali', 'https://www.dhl.com/ml-fr/home.html', 'ml.customerservice@dhl.com', 'https://www.instagram.com/dhlexpress/', 'https://x.com/DHLexpress'],
    ['FedEx Mali Bamako', 'https://www.fedex.com/', 'support@fedex.com', 'https://www.instagram.com/fedex/', 'https://x.com/FedEx'],
    ['UPS Mali', 'https://www.ups.com/', 'help@ups.com', 'https://www.instagram.com/ups/', 'https://x.com/UPS'],
  ],
  MR: [
    ['Société mauritanienne des postes (Mauripost)', 'https://www.upu.int/en/Mauritania', '', '', ''],
    ['DHL Mauritania', 'https://www.dhl.com/mr-fr/home.html', 'mr.customerservice@dhl.com', 'https://www.instagram.com/dhlexpress/', 'https://x.com/DHLexpress'],
    ['FedEx Mauritania Nouakchott', 'https://www.fedex.com/', 'support@fedex.com', 'https://www.instagram.com/fedex/', 'https://x.com/FedEx'],
    ['UPS Mauritania', 'https://www.ups.com/', 'help@ups.com', 'https://www.instagram.com/ups/', 'https://x.com/UPS'],
  ],
  MU: [
    ["Mauritius Post Ltd", 'https://www.mauritiuspost.mu/', 'info@mpl.mu', '', ''],
    ['DHL Mauritius', 'https://www.dhl.com/mu-en/home.html', 'mu.customerservice@dhl.com', 'https://www.instagram.com/dhlexpress/', 'https://x.com/DHLexpress'],
    ['FedEx Mauritius', 'https://www.fedex.com/', 'support@fedex.com', 'https://www.instagram.com/fedex/', 'https://x.com/FedEx'],
    ['UPS Mauritius', 'https://www.ups.com/mu/fr', 'help@ups.com', 'https://www.instagram.com/ups/', 'https://x.com/UPS'],
  ],
  MA: [
    ["Barid Al-Maghrib", 'https://www.barid.ma/', 'webmaster@barid.ma', 'https://www.instagram.com/baridalma_', ''],
    ["Amana Express", 'https://amanacolis.ma/', 'contact@amanacolis.ma', 'https://www.instagram.com/amanexpress/', 'https://x.com/AmanaExpress_'],
    ["Chrono Post Morocco", 'https://www.chronopost.ma/', 'client@chronopost.ma', '', ''],
    ['DHL Morocco', 'https://www.dhl.com/ma-fr/home.html', 'ma.customerservice@dhl.com', 'https://www.instagram.com/dhlexpress/', 'https://x.com/DHLexpress'],
  ],
  MZ: [
    ['Correios de Moçambique', 'http://correios.co.mz/', 'cac@correios.co.mz', '', ''],
    ['TEX Courier', 'https://www.tex.co.mz/', 'info@tex.co.mz', '', ''],
    ['DHL Mozambique', 'https://www.dhl.com/mz-en/home.html', 'mz.customerservice@dhl.com', 'https://www.instagram.com/dhlexpress/', 'https://x.com/DHLexpress'],
    ['FedEx Mozambique', 'https://www.fedex.com/', 'support@fedex.com', 'https://www.instagram.com/fedex/', 'https://x.com/FedEx'],
  ],
  NA: [
    ['NamPost Courier', 'https://nampost.na/', 'customerservice@namibiapost.na', '', ''],
    ['DHL Namibia domestic', 'https://www.dhl.com/na-en/home.html', 'na.customerservice@dhl.com', 'https://www.instagram.com/dhlexpress/', 'https://x.com/DHLexpress'],
    ['FedEx Namibia Windhoek–Walvis hubs', 'https://www.fedex.com/', 'support@fedex.com', 'https://www.instagram.com/fedex/', 'https://x.com/FedEx'],
    ['UPS Namibia desks', 'https://www.ups.com/', 'help@ups.com', 'https://www.instagram.com/ups/', 'https://x.com/UPS'],
  ],
  NE: [
    ["La Poste du Niger", 'https://www.nigerpost.ne/', 'npn@refer.ne', '', ''],
    ['DHL Niger', 'https://www.dhl.com/ne-fr/home.html', 'ne.customerservice@dhl.com', 'https://www.instagram.com/dhlexpress/', 'https://x.com/DHLexpress'],
    ['FedEx Niger Niamey desks', 'https://www.fedex.com/', 'support@fedex.com', 'https://www.instagram.com/fedex/', 'https://x.com/FedEx'],
    ['UPS Niger partners', 'https://www.ups.com/', 'help@ups.com', 'https://www.instagram.com/ups/', 'https://x.com/UPS'],
  ],
  NG: [
    ["Nigeria Postal Service — NIPOST", 'http://nipost.gov.ng/', 'info@nipost.gov.ng', 'https://www.instagram.com/e_nipost/', 'https://x.com/e_nipost'],
    ["GIG Logistics", 'https://giglogistics.com/', 'info@gigl.com', 'https://www.instagram.com/gigm_logistics/', 'https://x.com/gigm_logistics'],
    ["Red Star Express / Red Star plc", 'https://redstarplc.com.ng/', 'info@redstarplc.com.ng', '', ''],
    ['DHL Nigeria', 'https://www.dhl.com/ng-en/home.html', 'ng.customerservice@dhl.com', 'https://www.instagram.com/dhlnigeria/', 'https://x.com/dhlnigeria'],
  ],
  RW: [
    ['Rwanda Postal Services/Iposita EMS', 'https://i-posita.rw/', 'info@ipostarltd.rw', 'https://www.instagram.com/ipositaryw/', 'https://x.com/ipositaryw'],
    ['Mara Express (Rwanda) — regional last-mile', '', '', '', ''],
    ['DHL Rwanda', 'https://www.dhl.com/rw-en/home.html', 'rw.customerservice@dhl.com', 'https://www.instagram.com/dhlexpress/', 'https://x.com/DHLexpress'],
    ['FedEx Rwanda Kigali', 'https://www.fedex.com/', 'support@fedex.com', 'https://www.instagram.com/fedex/', 'https://x.com/FedEx'],
  ],
  EH: [
    ['APS / Algerian corridor postal relay', 'https://www.poste.dz/', 'contact@poste.dz', '', ''],
    ["UNHCR logistics / NGO parcel corridors", 'https://www.unhcr.org/', 'hqac@unhcr.org', 'https://www.instagram.com/unhcrarabic/', 'https://x.com/UNHCRarabic'],
    ['Moroccan Post (Laâyoune area — disputed)', 'http://www.poste.ma/', 'info@poste.ma', 'https://www.instagram.com/postemaroc/', 'https://x.com/PosteMaroc'],
    ['Spain Correos diaspora parcels', 'https://www.correos.es/', 'atencionalcliente@correos.es', 'https://www.instagram.com/correos/', 'https://x.com/Correos'],
  ],
  ST: [
    ["Empresa de Correios de São Tomé e Príncipe", 'https://www.correios.st/', 'cac@correios.st', '', ''],
    ['DHL Sao Tome', 'https://www.dhl.com/st-en/home.html', 'st.customerservice@dhl.com', 'https://www.instagram.com/dhlexpress/', 'https://x.com/DHLexpress'],
    ['FedEx STP desks', 'https://www.fedex.com/', 'support@fedex.com', 'https://www.instagram.com/fedex/', 'https://x.com/FedEx'],
    ['EMS TAP cargo smalls desks', 'https://www.flytap.com/', 'customerservice@flytap.com', 'https://www.instagram.com/tapairportugal/', 'https://x.com/tapairportugal'],
  ],
  SN: [
    ['La Poste Sénégal', 'https://www.laposte.sn/', 'dircom@laposte.sn', '', ''],
    ['Chronopost Africa / Geopost Sénégal', 'https://www.chronopost.fr/', 'commercialinternational.dealears@geopost.com', 'https://www.instagram.com/chronopost/', 'https://x.com/chronopost'],
    ['Aramex Senegal', 'https://www.aramex.com/', 'sn.support@aramex.com', 'https://www.instagram.com/aramex/', 'https://x.com/aramex'],
    ['DHL Senegal', 'https://www.dhl.com/sn-fr/home.html', 'sn.customerservice@dhl.com', 'https://www.instagram.com/dhlexpress/', 'https://x.com/DHLexpress'],
  ],
  SC: [
    ['Seychelles Postal EMS', 'https://www.gov.sc/List-of-Postal-Services.aspx', 'info@sib.gov.sc', '', ''],
    ['DHL Seychelles', 'https://www.dhl.com/sc-en/home.html', 'sc.customerservice@dhl.com', 'https://www.instagram.com/dhlexpress/', 'https://x.com/DHLexpress'],
    ['FedEx Seychelles MAE', 'https://www.fedex.com/', 'support@fedex.com', 'https://www.instagram.com/fedex/', 'https://x.com/FedEx'],
    ['UPS Seychelles', 'https://www.ups.com/', 'help@ups.com', 'https://www.instagram.com/ups/', 'https://x.com/UPS'],
  ],
  SL: [
    ["Salone Post EMS", 'https://www.slpost.gov.sl/', 'info@slipa.gov.sl', '', ''],
    ['DHL Sierra Leone', 'https://www.dhl.com/sl-en/home.html', 'sl.customerservice@dhl.com', 'https://www.instagram.com/dhlexpress/', 'https://x.com/DHLexpress'],
    ['FedEx Freetown', 'https://www.fedex.com/', 'support@fedex.com', 'https://www.instagram.com/fedex/', 'https://x.com/FedEx'],
    ['UPS Sierra Leone', 'https://www.ups.com/', 'help@ups.com', 'https://www.instagram.com/ups/', 'https://x.com/UPS'],
  ],
  SO: [
    ['Somali Postal Service pilots', 'https://www.upu.int/en/Somalia', 'minister@mpt.gov.so', '', ''],
    ['DHL Somalia Mogadishu partners', 'https://www.dhl.com/so-en/home.html', 'so.customerservice@dhl.com', 'https://www.instagram.com/dhlexpress/', 'https://x.com/DHLexpress'],
    ["DaruSalam Express", 'https://www.darusalemcargo.com/', 'info@darusalemcargo.com', '', ''],
    ['Aramex Horn of Africa corridors', 'https://www.aramex.com/', 'support@aramex.com', 'https://www.instagram.com/aramex/', 'https://x.com/aramex'],
  ],
  ZA: [
    ['South African Post Office', 'http://www.postoffice.co.za/', 'custserv@postoffice.co.za', 'https://www.instagram.com/sapostoffice/', 'https://x.com/PostofficeSa'],
    ['The Courier Guy', 'https://thecourierguy.co.za/', 'support@thecourierguy.co.za', 'https://www.instagram.com/thecourierguy/', 'https://x.com/thecourier_guy'],
    ["Dawn Wing (DHL ecommerce)", 'https://www.dw.co.za/', 'customer.service@dw.co.za', 'https://www.instagram.com/dawnwing/', 'https://x.com/Dawnwing'],
    ["Aramex South Africa domestic", 'https://www.aramex.co.za/', 'customerservicesa@aramex.co', 'https://www.instagram.com/aramex/', 'https://x.com/aramex'],
  ],
  SS: [
    ["South Sudan Post", 'http://ssscc.org/', 'sssccngo@gmail.com', '', ''],
    ['DHL South Sudan', 'https://www.dhl.com/ss-en/home.html', 'ss.customerservice@dhl.com', 'https://www.instagram.com/dhlexpress/', 'https://x.com/DHLexpress'],
    ['FedEx Juba corridors', 'https://www.fedex.com/', 'support@fedex.com', 'https://www.instagram.com/fedex/', 'https://x.com/FedEx'],
    ['UPS South Sudan NGOs', 'https://www.ups.com/', 'help@ups.com', 'https://www.instagram.com/ups/', 'https://x.com/UPS'],
  ],
  SD: [
    ['Sudan Postal Service parcel counters', 'https://ssc.gov.sd/', 'info@ssc.gov.sd', '', ''],
    ['Aramex Sudan', 'https://www.aramex.com/', 'sudanoperations@aramex.com', 'https://www.instagram.com/aramex/', 'https://x.com/aramex'],
    ['DHL Sudan (where operational)', 'https://www.dhl.com/sd-ar/home.html', 'sd.customerservice@dhl.com', '', ''],
    ['FedEx forwarding Khartoum', 'https://www.fedex.com/', 'support@fedex.com', 'https://www.instagram.com/fedex/', 'https://x.com/FedEx'],
  ],
  TZ: [
    ['Tanzania Posts Corporation EMS', 'https://posta.co.tz/', 'info@tpoc.co.tz', '', ''],
    ['DHL Tanzania', 'https://www.dhl.com/tz-en/home.html', 'tz.customerservice@dhl.com', 'https://www.instagram.com/dhlexpress/', 'https://x.com/DHLexpress'],
    ['FedEx Tanzania hubs', 'https://www.fedex.com/', 'support@fedex.com', 'https://www.instagram.com/fedex/', 'https://x.com/FedEx'],
    ['UPS Tanzania Dar es Salaam', 'https://www.ups.com/', 'help@ups.com', 'https://www.instagram.com/ups/', 'https://x.com/UPS'],
  ],
  TG: [
    ["La Poste du Togo", 'https://www.laposte.tg/', 'contact@laposte.tg', '', ''],
    ['DHL Togo', 'https://www.dhl.com/tg-fr/home.html', 'tg.customerservice@dhl.com', 'https://www.instagram.com/dhlexpress/', 'https://x.com/DHLexpress'],
    ['FedEx Lomé', 'https://www.fedex.com/', 'support@fedex.com', 'https://www.instagram.com/fedex/', 'https://x.com/FedEx'],
    ['UPS Togo Lomé corridors', 'https://www.ups.com/', 'help@ups.com', 'https://www.instagram.com/ups/', 'https://x.com/UPS'],
  ],
  TN: [
    ["Rapid-Poste (La Poste Tunisia)", 'https://www.pos.tn/', 'contact@rapidpost.com.tn', 'https://www.instagram.com/rapidpostenetunisienne/', 'https://x.com/RapidposteTN'],
    ['Aramex Tunisia', 'https://www.aramex.com/', 'customerservicetn@aramex.com', 'https://www.instagram.com/aramex/', 'https://x.com/aramex'],
    ['DHL Tunisia', 'https://www.dhl.com/tn-en/home.html', 'tn.customerservice@dhl.com', 'https://www.instagram.com/dhlexpress/', 'https://x.com/DHLexpress'],
    ['FedEx Tunisia', 'https://www.fedex.com/', 'support@fedex.com', 'https://www.instagram.com/fedex/', 'https://x.com/FedEx'],
  ],
  UG: [
    ['Uganda Post EMS', 'https://www.eposta.ug/', 'info@posta.co.ug', 'https://www.instagram.com/ugposts/', ''],
    ['DHL Uganda', 'https://www.dhl.com/ug-en/home.html', 'ug.customerservice@dhl.com', 'https://www.instagram.com/dhlexpress/', 'https://x.com/DHLexpress'],
    ['FedEx Kampala hubs', 'https://www.fedex.com/', 'support@fedex.com', 'https://www.instagram.com/fedex/', 'https://x.com/FedEx'],
    ['UPS Uganda corridor', 'https://www.ups.com/', 'help@ups.com', 'https://www.instagram.com/ups/', 'https://x.com/UPS'],
  ],
  ZM: [
    ['Zambia Postal Services', 'http://www.zampost.gov.zm/', 'info.zampost@gmail.com', '', ''],
    ['DHL Zambia', 'https://www.dhl.com/zm-en/home.html', 'zm.customerservice@dhl.com', 'https://www.instagram.com/dhlexpress/', 'https://x.com/DHLexpress'],
    ['FedEx Ndola corridor', 'https://www.fedex.com/', 'support@fedex.com', 'https://www.instagram.com/fedex/', 'https://x.com/FedEx'],
    ['UPS Zambia desks', 'https://www.ups.com/', 'help@ups.com', 'https://www.instagram.com/ups/', 'https://x.com/UPS'],
  ],
  ZW: [
    ['Zimpost', 'http://www.zimpost.co.zw/', 'zimpost@zimpost.co.zw', 'https://www.instagram.com/zimpost_/', ''],
    ["FedEx Zimbabwe partners", 'https://www.fedex.com/', 'support@fedex.com', 'https://www.instagram.com/fedex/', 'https://x.com/FedEx'],
    ['DHL Zimbabwe', 'https://www.dhl.com/zw-en/home.html', 'zw.customerservice@dhl.com', '', ''],
    ['UPS Zimbabwe corridors', 'https://www.ups.com/', 'help@ups.com', 'https://www.instagram.com/ups/', 'https://x.com/UPS'],
  ],
  CG: [
    ['La Poste du Congo EMS', 'http://laposte.cg/', 'contact@lacongolaise.cg', '', ''],
    ["DHL Republic of the Congo / Brazzaville", 'https://www.dhl.com/cg-en/home.html', 'cg.customerservice@dhl.com', 'https://www.instagram.com/dhlexpress/', 'https://x.com/DHLexpress'],
    ['FedEx Pointe Noire corridors', 'https://www.fedex.com/', 'support@fedex.com', 'https://www.instagram.com/fedex/', 'https://x.com/FedEx'],
    ['UPS Brazzaville partners', 'https://www.ups.com/', 'help@ups.com', 'https://www.instagram.com/ups/', 'https://x.com/UPS'],
  ],
}

/** Validate counts */
const need = [
  'DZ', 'AO', 'BJ', 'BW', 'BF', 'BI', 'CM', 'CV', 'CF', 'TD', 'KM', 'CD', 'CG', 'DJ', 'EG', 'GQ', 'ER', 'SZ', 'ET', 'GA',
  'GM', 'GH', 'GN', 'GW', 'CI', 'KE', 'LS', 'LR', 'LY', 'MG', 'MW', 'ML', 'MR', 'MU', 'MA', 'MZ', 'NA', 'NE', 'NG',
  'RW', 'EH', 'ST', 'SN', 'SC', 'SL', 'SO', 'ZA', 'SS', 'SD', 'TZ', 'TG', 'TN', 'UG', 'ZM', 'ZW',
]

for (const k of need) {
  if (!ROWS[k]) throw new Error(`Missing courier data for ISO ${k}`)
  if (ROWS[k].length !== 4) throw new Error(`${k} expects 4 rows, got ${ROWS[k].length}`)
}

/** @type {string} */
let body = ''

for (const k of need.sort()) {
  const lines = ROWS[k].map(
    ([n, w, e, i, tw]) =>
      `    c(${JSON.stringify(n)}, ${JSON.stringify(w)}, ${JSON.stringify(e)}, ${JSON.stringify(i)}, ${JSON.stringify(tw)}),`
  )
  body += `  ${k}: [\n${lines.join('\n')}\n  ],\n`
}

const file = `import type { DomesticCourierService } from './types'

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
 * Domestic courier reference rows by ISO 3166-1 alpha-2 (verify URLs, emails, and social handles locally).
 */
export const AU_DOMESTIC_COURIERS = {
${body}} satisfies Record<string, DomesticCourierService[]>
`

writeFileSync(outPath, file, 'utf8')
console.log('Wrote', outPath)
