/**
 * About Modal Translations for Sparkplate Application
 * Comprehensive translations for all About modal components
 */

export interface AboutTranslations {
  // Main About Modal
  sparkplate: string
  version: string
  
  // Tab Names
  main: string
  notes: string
  releaseNotes: string
  greenfire: string
  universe: string
  contribute: string
  donations: string
  
  // Main Tab - System Information
  hostname: string
  os: string
  node: string
  electron: string
  database: string
  installedRAM: string
  cpu: string
  clearStore: string
  sparkplateLogo: string
  
  // Notes Tab - Documentation
  documentation: string
  loadingDocumentation: string
  selectDocumentToView: string
  chooseFileFromSidebar: string
  fileSize: string
  lastModified: string
  
  // Greenfire Tab - Team Information
  greenfireManagement: string
  developers: string
  specialThanksTo: string
  pastDevelopers: string
  pastGraphicDesigners: string
  website: string
  twitter: string
  instagram: string
  linkedin: string
  keybase: string
  github: string
  medium: string
  
  // Universe Tab - Projects
  greenfireUniverse: string
  bridgingCryptocurrencyEcosystem: string
  cryptocurrencyBookkeepingWallet: string
  marketplaceElectronicsCrypto: string
  comingSoon: string
  redacted: string
  greenfireLogo: string
  greeneryLogo: string
  techmarketsLogo: string
  
  // Contribute Tab - Contribution Guide
  contributeToSparkplate: string
  githubRepository: string
  openSourceProject: string
  submitPullRequests: string
  reportIssues: string
  repository: string
  howToCloneRepository: string
  getStartedDevelopment: string
  cloneRepositoryLocalMachine: string
  howToSubmitPullRequest: string
  createNewBranch: string
  createNewBranchForFeature: string
  makeChangesCommit: string
  makeChangesCommitDescriptive: string
  pushBranchGitHub: string
  pushBranchToGitHub: string
  goToRepository: string
  goToSparkplateRepository: string
  clickPullRequestButton: string
  fillOutPRTemplate: string
  fillOutPRTemplateDetails: string
  submitPullRequest: string
  submitPullRequestWait: string
  waitForReview: string
  reportingIssues: string
  foundBugFeatureRequest: string
  reportIssueTracker: string
  visitIssuesPage: string
  visitIssuesPageGitHub: string
  clickNewIssueButton: string
  selectIssueTemplate: string
  selectAppropriateTemplate: string
  fillOutRequiredInformation: string
  fillOutAllRequired: string
  clearDescription: string
  clearDescriptionIssue: string
  stepsToReproduce: string
  stepsToReproduceBugs: string
  expectedBehavior: string
  actualBehavior: string
  environmentDetails: string
  environmentDetailsOS: string
  screenshots: string
  screenshotsErrors: string
  
  // Donations Tab - Support
  supportSparkplate: string
  donationsHelpMaintain: string
  donationsHelpMaintainFree: string
  cryptocurrencyDonations: string
  qrCodeFor: string
  logo: string
  copyAddress: string
  addressCopied: string
  
  // Common UI Elements
  loading: string
  error: string
  close: string
  open: string
  copy: string
  copied: string
}

export type AboutSupportedLanguage = 'en' | 'es' | 'fr' | 'de' | 'pt'

export const aboutTranslations: Record<AboutSupportedLanguage, AboutTranslations> = {
  en: {
    // Main About Modal
    sparkplate: 'Sparkplate',
    version: 'Version',
    
    // Tab Names
    main: 'Main',
    notes: 'Notes',
    releaseNotes: 'Release Notes / Changelog',
    greenfire: 'Greenfire',
    universe: 'Universe',
    contribute: 'Contribute',
    donations: 'Donations',
    
    // Main Tab - System Information
    hostname: 'Hostname',
    os: 'OS',
    node: 'Node',
    electron: 'Electron',
    database: 'Database',
    installedRAM: 'Installed RAM',
    cpu: 'CPU',
    clearStore: 'Clear Store',
    sparkplateLogo: 'sparkplate-logo',
    
    // Notes Tab - Documentation
    documentation: 'Documentation',
    loadingDocumentation: 'Loading documentation...',
    selectDocumentToView: 'Select a document to view',
    chooseFileFromSidebar: 'Choose a file from the sidebar to view its contents.',
    fileSize: 'File Size',
    lastModified: 'Last Modified',
    
    // Greenfire Tab - Team Information
    greenfireManagement: 'Greenfire Management',
    developers: 'Developers',
    specialThanksTo: 'Special Thanks To',
    pastDevelopers: 'Past Developers',
    pastGraphicDesigners: 'Past Graphic Designers',
    website: 'Website',
    twitter: 'Twitter',
    instagram: 'Instagram',
    linkedin: 'LinkedIn',
    keybase: 'Keybase',
    github: 'Github',
    medium: 'Medium',
    
    // Universe Tab - Projects
    greenfireUniverse: 'Greenfire Universe',
    bridgingCryptocurrencyEcosystem: 'Bridging the cryptocurrency ecosystem with the real world',
    cryptocurrencyBookkeepingWallet: 'A cryptocurrency bookkeeping and accounting wallet',
    marketplaceElectronicsCrypto: 'A marketplace to buy and sell electronics with crypto',
    comingSoon: 'Coming soon...',
    redacted: '*Redacted*',
    greenfireLogo: 'Greenfire Logo',
    greeneryLogo: 'Greenery Logo',
    techmarketsLogo: 'Techmarkets Logo',
    
    // Contribute Tab - Contribution Guide
    contributeToSparkplate: 'Contribute to Sparkplate',
    githubRepository: 'GitHub Repository',
    openSourceProject: 'Sparkplate is an open source project. You can contribute by submitting pull requests or reporting issues on GitHub.',
    submitPullRequests: 'submitting pull requests',
    reportIssues: 'reporting issues',
    repository: 'Repository',
    howToCloneRepository: 'How to Clone the Repository',
    getStartedDevelopment: 'To get started with development, clone the repository to your local machine:',
    cloneRepositoryLocalMachine: 'clone the repository to your local machine',
    howToSubmitPullRequest: 'How to Submit a Pull Request',
    createNewBranch: 'Create a new branch for your feature or bug fix:',
    createNewBranchForFeature: 'Create a new branch for your feature or bug fix',
    makeChangesCommit: 'Make your changes and commit them with descriptive messages:',
    makeChangesCommitDescriptive: 'Make your changes and commit them with descriptive messages',
    pushBranchGitHub: 'Push your branch to GitHub:',
    pushBranchToGitHub: 'Push your branch to GitHub',
    goToRepository: 'Go to the',
    goToSparkplateRepository: 'Go to the Sparkplate GitHub repository',
    clickPullRequestButton: 'and click the "Pull Request" button.',
    fillOutPRTemplate: 'Fill out the PR template with details about your changes.',
    fillOutPRTemplateDetails: 'Fill out the PR template with details about your changes',
    submitPullRequest: 'Submit the pull request and wait for review.',
    submitPullRequestWait: 'Submit the pull request and wait for review',
    waitForReview: 'wait for review',
    reportingIssues: 'Reporting Issues',
    foundBugFeatureRequest: 'Found a bug or have a feature request? Please report it on our issue tracker:',
    reportIssueTracker: 'report it on our issue tracker',
    visitIssuesPage: 'Visit the',
    visitIssuesPageGitHub: 'Visit the Issues page on GitHub',
    clickNewIssueButton: 'Click the "New Issue" button.',
    selectIssueTemplate: 'Select the appropriate issue template.',
    selectAppropriateTemplate: 'Select the appropriate issue template',
    fillOutRequiredInformation: 'Fill out all required information, including:',
    fillOutAllRequired: 'Fill out all required information, including',
    clearDescription: 'Clear description of the issue or feature request',
    clearDescriptionIssue: 'Clear description of the issue or feature request',
    stepsToReproduce: 'Steps to reproduce (for bugs)',
    stepsToReproduceBugs: 'Steps to reproduce (for bugs)',
    expectedBehavior: 'Expected behavior',
    actualBehavior: 'Actual behavior',
    environmentDetails: 'Environment details (OS, browser, etc.)',
    environmentDetailsOS: 'Environment details (OS, browser, etc.)',
    screenshots: 'Screenshots or error messages if applicable',
    screenshotsErrors: 'Screenshots or error messages if applicable',
    
    // Donations Tab - Support
    supportSparkplate: 'Support Sparkplate',
    donationsHelpMaintain: 'Your donations help us maintain and improve this free resource for everyone.',
    donationsHelpMaintainFree: 'Your donations help us maintain and improve this free resource for everyone.',
    cryptocurrencyDonations: 'Cryptocurrency Donations',
    qrCodeFor: 'QR code for',
    logo: 'logo',
    copyAddress: 'Copy Address',
    addressCopied: 'Address Copied',
    
    // Common UI Elements
    loading: 'Loading',
    error: 'Error',
    close: 'Close',
    open: 'Open',
    copy: 'Copy',
    copied: 'Copied'
  },
  
  es: {
    // Main About Modal
    sparkplate: 'Sparkplate',
    version: 'Versión',
    
    // Tab Names
    main: 'Principal',
    notes: 'Notas',
    releaseNotes: 'Notas de Versión / Registro de Cambios',
    greenfire: 'Greenfire',
    universe: 'Universo',
    contribute: 'Contribuir',
    donations: 'Donaciones',
    
    // Main Tab - System Information
    hostname: 'Nombre de Host',
    os: 'SO',
    node: 'Node',
    electron: 'Electron',
    database: 'Base de Datos',
    installedRAM: 'RAM Instalada',
    cpu: 'CPU',
    clearStore: 'Limpiar Almacenamiento',
    sparkplateLogo: 'logo-sparkplate',
    
    // Notes Tab - Documentation
    documentation: 'Documentación',
    loadingDocumentation: 'Cargando documentación...',
    selectDocumentToView: 'Selecciona un documento para ver',
    chooseFileFromSidebar: 'Elige un archivo de la barra lateral para ver su contenido.',
    fileSize: 'Tamaño del Archivo',
    lastModified: 'Última Modificación',
    
    // Greenfire Tab - Team Information
    greenfireManagement: 'Gestión de Greenfire',
    developers: 'Desarrolladores',
    specialThanksTo: 'Agradecimientos Especiales A',
    pastDevelopers: 'Desarrolladores Anteriores',
    pastGraphicDesigners: 'Diseñadores Gráficos Anteriores',
    website: 'Sitio Web',
    twitter: 'Twitter',
    instagram: 'Instagram',
    linkedin: 'LinkedIn',
    keybase: 'Keybase',
    github: 'Github',
    medium: 'Medium',
    
    // Universe Tab - Projects
    greenfireUniverse: 'Universo Greenfire',
    bridgingCryptocurrencyEcosystem: 'Conectando el ecosistema de criptomonedas con el mundo real',
    cryptocurrencyBookkeepingWallet: 'Una billetera de contabilidad y registro de criptomonedas',
    marketplaceElectronicsCrypto: 'Un mercado para comprar y vender electrónicos con cripto',
    comingSoon: 'Próximamente...',
    redacted: '*Redactado*',
    greenfireLogo: 'Logo de Greenfire',
    greeneryLogo: 'Logo de Greenery',
    techmarketsLogo: 'Logo de Techmarkets',
    
    // Contribute Tab - Contribution Guide
    contributeToSparkplate: 'Contribuir a Sparkplate',
    githubRepository: 'Repositorio de GitHub',
    openSourceProject: 'Sparkplate es un proyecto de código abierto. Puedes contribuir enviando pull requests o reportando problemas en GitHub.',
    submitPullRequests: 'enviando pull requests',
    reportIssues: 'reportando problemas',
    repository: 'Repositorio',
    howToCloneRepository: 'Cómo Clonar el Repositorio',
    getStartedDevelopment: 'Para comenzar con el desarrollo, clona el repositorio en tu máquina local:',
    cloneRepositoryLocalMachine: 'clona el repositorio en tu máquina local',
    howToSubmitPullRequest: 'Cómo Enviar un Pull Request',
    createNewBranch: 'Crea una nueva rama para tu característica o corrección de error:',
    createNewBranchForFeature: 'Crea una nueva rama para tu característica o corrección de error',
    makeChangesCommit: 'Haz tus cambios y compromételos con mensajes descriptivos:',
    makeChangesCommitDescriptive: 'Haz tus cambios y compromételos con mensajes descriptivos',
    pushBranchGitHub: 'Empuja tu rama a GitHub:',
    pushBranchToGitHub: 'Empuja tu rama a GitHub',
    goToRepository: 'Ve al',
    goToSparkplateRepository: 'Ve al repositorio de Sparkplate en GitHub',
    clickPullRequestButton: 'y haz clic en el botón "Pull Request".',
    fillOutPRTemplate: 'Completa la plantilla de PR con detalles sobre tus cambios.',
    fillOutPRTemplateDetails: 'Completa la plantilla de PR con detalles sobre tus cambios',
    submitPullRequest: 'Envía el pull request y espera la revisión.',
    submitPullRequestWait: 'Envía el pull request y espera la revisión',
    waitForReview: 'espera la revisión',
    reportingIssues: 'Reportar Problemas',
    foundBugFeatureRequest: '¿Encontraste un error o tienes una solicitud de característica? Por favor repórtalo en nuestro rastreador de problemas:',
    reportIssueTracker: 'repórtalo en nuestro rastreador de problemas',
    visitIssuesPage: 'Visita la',
    visitIssuesPageGitHub: 'Visita la página de Problemas en GitHub',
    clickNewIssueButton: 'Haz clic en el botón "Nuevo Problema".',
    selectIssueTemplate: 'Selecciona la plantilla de problema apropiada.',
    selectAppropriateTemplate: 'Selecciona la plantilla de problema apropiada',
    fillOutRequiredInformation: 'Completa toda la información requerida, incluyendo:',
    fillOutAllRequired: 'Completa toda la información requerida, incluyendo',
    clearDescription: 'Descripción clara del problema o solicitud de característica',
    clearDescriptionIssue: 'Descripción clara del problema o solicitud de característica',
    stepsToReproduce: 'Pasos para reproducir (para errores)',
    stepsToReproduceBugs: 'Pasos para reproducir (para errores)',
    expectedBehavior: 'Comportamiento esperado',
    actualBehavior: 'Comportamiento actual',
    environmentDetails: 'Detalles del entorno (SO, navegador, etc.)',
    environmentDetailsOS: 'Detalles del entorno (SO, navegador, etc.)',
    screenshots: 'Capturas de pantalla o mensajes de error si aplica',
    screenshotsErrors: 'Capturas de pantalla o mensajes de error si aplica',
    
    // Donations Tab - Support
    supportSparkplate: 'Apoyar Sparkplate',
    donationsHelpMaintain: 'Tus donaciones nos ayudan a mantener y mejorar este recurso gratuito para todos.',
    donationsHelpMaintainFree: 'Tus donaciones nos ayudan a mantener y mejorar este recurso gratuito para todos.',
    cryptocurrencyDonations: 'Donaciones en Criptomonedas',
    qrCodeFor: 'Código QR para',
    logo: 'logo',
    copyAddress: 'Copiar Dirección',
    addressCopied: 'Dirección Copiada',
    
    // Common UI Elements
    loading: 'Cargando',
    error: 'Error',
    close: 'Cerrar',
    open: 'Abrir',
    copy: 'Copiar',
    copied: 'Copiado'
  },
  
  fr: {
    // Main About Modal
    sparkplate: 'Sparkplate',
    version: 'Version',
    
    // Tab Names
    main: 'Principal',
    notes: 'Notes',
    releaseNotes: 'Notes de Version / Journal des Modifications',
    greenfire: 'Greenfire',
    universe: 'Univers',
    contribute: 'Contribuer',
    donations: 'Dons',
    
    // Main Tab - System Information
    hostname: 'Nom d\'Hôte',
    os: 'OS',
    node: 'Node',
    electron: 'Electron',
    database: 'Base de Données',
    installedRAM: 'RAM Installée',
    cpu: 'CPU',
    clearStore: 'Vider le Stockage',
    sparkplateLogo: 'logo-sparkplate',
    
    // Notes Tab - Documentation
    documentation: 'Documentation',
    loadingDocumentation: 'Chargement de la documentation...',
    selectDocumentToView: 'Sélectionnez un document à afficher',
    chooseFileFromSidebar: 'Choisissez un fichier dans la barre latérale pour voir son contenu.',
    fileSize: 'Taille du Fichier',
    lastModified: 'Dernière Modification',
    
    // Greenfire Tab - Team Information
    greenfireManagement: 'Gestion Greenfire',
    developers: 'Développeurs',
    specialThanksTo: 'Remerciements Spéciaux À',
    pastDevelopers: 'Anciens Développeurs',
    pastGraphicDesigners: 'Anciens Graphistes',
    website: 'Site Web',
    twitter: 'Twitter',
    instagram: 'Instagram',
    linkedin: 'LinkedIn',
    keybase: 'Keybase',
    github: 'Github',
    medium: 'Medium',
    
    // Universe Tab - Projects
    greenfireUniverse: 'Univers Greenfire',
    bridgingCryptocurrencyEcosystem: 'Relier l\'écosystème de cryptomonnaies au monde réel',
    cryptocurrencyBookkeepingWallet: 'Un portefeuille de comptabilité et de tenue de livres pour cryptomonnaies',
    marketplaceElectronicsCrypto: 'Un marché pour acheter et vendre de l\'électronique avec de la crypto',
    comingSoon: 'Bientôt disponible...',
    redacted: '*Rédigé*',
    greenfireLogo: 'Logo Greenfire',
    greeneryLogo: 'Logo Greenery',
    techmarketsLogo: 'Logo Techmarkets',
    
    // Contribute Tab - Contribution Guide
    contributeToSparkplate: 'Contribuer à Sparkplate',
    githubRepository: 'Dépôt GitHub',
    openSourceProject: 'Sparkplate est un projet open source. Vous pouvez contribuer en soumettant des pull requests ou en signalant des problèmes sur GitHub.',
    submitPullRequests: 'en soumettant des pull requests',
    reportIssues: 'en signalant des problèmes',
    repository: 'Dépôt',
    howToCloneRepository: 'Comment Cloner le Dépôt',
    getStartedDevelopment: 'Pour commencer le développement, clonez le dépôt sur votre machine locale :',
    cloneRepositoryLocalMachine: 'cloner le dépôt sur votre machine locale',
    howToSubmitPullRequest: 'Comment Soumettre une Pull Request',
    createNewBranch: 'Créez une nouvelle branche pour votre fonctionnalité ou correction de bug :',
    createNewBranchForFeature: 'Créez une nouvelle branche pour votre fonctionnalité ou correction de bug',
    makeChangesCommit: 'Apportez vos modifications et committez-les avec des messages descriptifs :',
    makeChangesCommitDescriptive: 'Apportez vos modifications et committez-les avec des messages descriptifs',
    pushBranchGitHub: 'Poussez votre branche vers GitHub :',
    pushBranchToGitHub: 'Poussez votre branche vers GitHub',
    goToRepository: 'Allez sur le',
    goToSparkplateRepository: 'Allez sur le dépôt Sparkplate sur GitHub',
    clickPullRequestButton: 'et cliquez sur le bouton "Pull Request".',
    fillOutPRTemplate: 'Remplissez le modèle de PR avec les détails de vos modifications.',
    fillOutPRTemplateDetails: 'Remplissez le modèle de PR avec les détails de vos modifications',
    submitPullRequest: 'Soumettez la pull request et attendez la révision.',
    submitPullRequestWait: 'Soumettez la pull request et attendez la révision',
    waitForReview: 'attendez la révision',
    reportingIssues: 'Signaler des Problèmes',
    foundBugFeatureRequest: 'Vous avez trouvé un bug ou avez une demande de fonctionnalité ? Veuillez le signaler sur notre système de suivi des problèmes :',
    reportIssueTracker: 'le signaler sur notre système de suivi des problèmes',
    visitIssuesPage: 'Visitez la',
    visitIssuesPageGitHub: 'Visitez la page des Problèmes sur GitHub',
    clickNewIssueButton: 'Cliquez sur le bouton "Nouveau Problème".',
    selectIssueTemplate: 'Sélectionnez le modèle de problème approprié.',
    selectAppropriateTemplate: 'Sélectionnez le modèle de problème approprié',
    fillOutRequiredInformation: 'Remplissez toutes les informations requises, y compris :',
    fillOutAllRequired: 'Remplissez toutes les informations requises, y compris',
    clearDescription: 'Description claire du problème ou de la demande de fonctionnalité',
    clearDescriptionIssue: 'Description claire du problème ou de la demande de fonctionnalité',
    stepsToReproduce: 'Étapes pour reproduire (pour les bugs)',
    stepsToReproduceBugs: 'Étapes pour reproduire (pour les bugs)',
    expectedBehavior: 'Comportement attendu',
    actualBehavior: 'Comportement réel',
    environmentDetails: 'Détails de l\'environnement (OS, navigateur, etc.)',
    environmentDetailsOS: 'Détails de l\'environnement (OS, navigateur, etc.)',
    screenshots: 'Captures d\'écran ou messages d\'erreur si applicable',
    screenshotsErrors: 'Captures d\'écran ou messages d\'erreur si applicable',
    
    // Donations Tab - Support
    supportSparkplate: 'Soutenir Sparkplate',
    donationsHelpMaintain: 'Vos dons nous aident à maintenir et améliorer cette ressource gratuite pour tous.',
    donationsHelpMaintainFree: 'Vos dons nous aident à maintenir et améliorer cette ressource gratuite pour tous.',
    cryptocurrencyDonations: 'Dons en Cryptomonnaies',
    qrCodeFor: 'Code QR pour',
    logo: 'logo',
    copyAddress: 'Copier l\'Adresse',
    addressCopied: 'Adresse Copiée',
    
    // Common UI Elements
    loading: 'Chargement',
    error: 'Erreur',
    close: 'Fermer',
    open: 'Ouvrir',
    copy: 'Copier',
    copied: 'Copié'
  },
  
  de: {
    // Main About Modal
    sparkplate: 'Sparkplate',
    version: 'Version',
    
    // Tab Names
    main: 'Haupt',
    notes: 'Notizen',
    releaseNotes: 'Release Notes / Changelog',
    greenfire: 'Greenfire',
    universe: 'Universum',
    contribute: 'Beitragen',
    donations: 'Spenden',
    
    // Main Tab - System Information
    hostname: 'Hostname',
    os: 'OS',
    node: 'Node',
    electron: 'Electron',
    database: 'Datenbank',
    installedRAM: 'Installierter RAM',
    cpu: 'CPU',
    clearStore: 'Speicher Löschen',
    sparkplateLogo: 'sparkplate-logo',
    
    // Notes Tab - Documentation
    documentation: 'Dokumentation',
    loadingDocumentation: 'Dokumentation wird geladen...',
    selectDocumentToView: 'Wählen Sie ein Dokument zum Anzeigen',
    chooseFileFromSidebar: 'Wählen Sie eine Datei aus der Seitenleiste, um deren Inhalt anzuzeigen.',
    fileSize: 'Dateigröße',
    lastModified: 'Zuletzt Geändert',
    
    // Greenfire Tab - Team Information
    greenfireManagement: 'Greenfire Management',
    developers: 'Entwickler',
    specialThanksTo: 'Besonderen Dank An',
    pastDevelopers: 'Ehemalige Entwickler',
    pastGraphicDesigners: 'Ehemalige Grafikdesigner',
    website: 'Webseite',
    twitter: 'Twitter',
    instagram: 'Instagram',
    linkedin: 'LinkedIn',
    keybase: 'Keybase',
    github: 'Github',
    medium: 'Medium',
    
    // Universe Tab - Projects
    greenfireUniverse: 'Greenfire Universum',
    bridgingCryptocurrencyEcosystem: 'Die Kryptowährungsökosystem mit der realen Welt verbinden',
    cryptocurrencyBookkeepingWallet: 'Eine Kryptowährungs-Buchhaltungs- und Buchungs-Wallet',
    marketplaceElectronicsCrypto: 'Ein Marktplatz zum Kaufen und Verkaufen von Elektronik mit Krypto',
    comingSoon: 'Demnächst verfügbar...',
    redacted: '*Redigiert*',
    greenfireLogo: 'Greenfire Logo',
    greeneryLogo: 'Greenery Logo',
    techmarketsLogo: 'Techmarkets Logo',
    
    // Contribute Tab - Contribution Guide
    contributeToSparkplate: 'Zu Sparkplate Beitragen',
    githubRepository: 'GitHub Repository',
    openSourceProject: 'Sparkplate ist ein Open-Source-Projekt. Sie können durch das Einreichen von Pull Requests oder das Melden von Problemen auf GitHub beitragen.',
    submitPullRequests: 'Pull Requests einreichen',
    reportIssues: 'Probleme melden',
    repository: 'Repository',
    howToCloneRepository: 'Wie man das Repository Klont',
    getStartedDevelopment: 'Um mit der Entwicklung zu beginnen, klonen Sie das Repository auf Ihren lokalen Computer:',
    cloneRepositoryLocalMachine: 'das Repository auf Ihren lokalen Computer klonen',
    howToSubmitPullRequest: 'Wie man einen Pull Request Einreicht',
    createNewBranch: 'Erstellen Sie einen neuen Branch für Ihre Funktion oder Fehlerbehebung:',
    createNewBranchForFeature: 'Erstellen Sie einen neuen Branch für Ihre Funktion oder Fehlerbehebung',
    makeChangesCommit: 'Nehmen Sie Ihre Änderungen vor und committen Sie sie mit beschreibenden Nachrichten:',
    makeChangesCommitDescriptive: 'Nehmen Sie Ihre Änderungen vor und committen Sie sie mit beschreibenden Nachrichten',
    pushBranchGitHub: 'Pushen Sie Ihren Branch zu GitHub:',
    pushBranchToGitHub: 'Pushen Sie Ihren Branch zu GitHub',
    goToRepository: 'Gehen Sie zum',
    goToSparkplateRepository: 'Gehen Sie zum Sparkplate GitHub Repository',
    clickPullRequestButton: 'und klicken Sie auf den "Pull Request" Button.',
    fillOutPRTemplate: 'Füllen Sie die PR-Vorlage mit Details zu Ihren Änderungen aus.',
    fillOutPRTemplateDetails: 'Füllen Sie die PR-Vorlage mit Details zu Ihren Änderungen aus',
    submitPullRequest: 'Reichen Sie den Pull Request ein und warten Sie auf die Überprüfung.',
    submitPullRequestWait: 'Reichen Sie den Pull Request ein und warten Sie auf die Überprüfung',
    waitForReview: 'warten Sie auf die Überprüfung',
    reportingIssues: 'Probleme Melden',
    foundBugFeatureRequest: 'Einen Fehler gefunden oder eine Feature-Anfrage? Bitte melden Sie es in unserem Issue-Tracker:',
    reportIssueTracker: 'melden Sie es in unserem Issue-Tracker',
    visitIssuesPage: 'Besuchen Sie die',
    visitIssuesPageGitHub: 'Besuchen Sie die Issues-Seite auf GitHub',
    clickNewIssueButton: 'Klicken Sie auf den "Neues Issue" Button.',
    selectIssueTemplate: 'Wählen Sie die entsprechende Issue-Vorlage.',
    selectAppropriateTemplate: 'Wählen Sie die entsprechende Issue-Vorlage',
    fillOutRequiredInformation: 'Füllen Sie alle erforderlichen Informationen aus, einschließlich:',
    fillOutAllRequired: 'Füllen Sie alle erforderlichen Informationen aus, einschließlich',
    clearDescription: 'Klare Beschreibung des Problems oder der Feature-Anfrage',
    clearDescriptionIssue: 'Klare Beschreibung des Problems oder der Feature-Anfrage',
    stepsToReproduce: 'Schritte zur Reproduktion (für Bugs)',
    stepsToReproduceBugs: 'Schritte zur Reproduktion (für Bugs)',
    expectedBehavior: 'Erwartetes Verhalten',
    actualBehavior: 'Tatsächliches Verhalten',
    environmentDetails: 'Umgebungsdetails (OS, Browser, etc.)',
    environmentDetailsOS: 'Umgebungsdetails (OS, Browser, etc.)',
    screenshots: 'Screenshots oder Fehlermeldungen falls zutreffend',
    screenshotsErrors: 'Screenshots oder Fehlermeldungen falls zutreffend',
    
    // Donations Tab - Support
    supportSparkplate: 'Sparkplate Unterstützen',
    donationsHelpMaintain: 'Ihre Spenden helfen uns, diese kostenlose Ressource für alle zu erhalten und zu verbessern.',
    donationsHelpMaintainFree: 'Ihre Spenden helfen uns, diese kostenlose Ressource für alle zu erhalten und zu verbessern.',
    cryptocurrencyDonations: 'Kryptowährungs-Spenden',
    qrCodeFor: 'QR-Code für',
    logo: 'Logo',
    copyAddress: 'Adresse Kopieren',
    addressCopied: 'Adresse Kopiert',
    
    // Common UI Elements
    loading: 'Laden',
    error: 'Fehler',
    close: 'Schließen',
    open: 'Öffnen',
    copy: 'Kopieren',
    copied: 'Kopiert'
  },
  
  pt: {
    // Main About Modal
    sparkplate: 'Sparkplate',
    version: 'Versão',
    
    // Tab Names
    main: 'Principal',
    notes: 'Notas',
    releaseNotes: 'Notas de Versão / Changelog',
    greenfire: 'Greenfire',
    universe: 'Universo',
    contribute: 'Contribuir',
    donations: 'Doações',
    
    // Main Tab - System Information
    hostname: 'Nome do Host',
    os: 'SO',
    node: 'Node',
    electron: 'Electron',
    database: 'Banco de Dados',
    installedRAM: 'RAM Instalada',
    cpu: 'CPU',
    clearStore: 'Limpar Armazenamento',
    sparkplateLogo: 'logo-sparkplate',
    
    // Notes Tab - Documentation
    documentation: 'Documentação',
    loadingDocumentation: 'Carregando documentação...',
    selectDocumentToView: 'Selecione um documento para visualizar',
    chooseFileFromSidebar: 'Escolha um arquivo da barra lateral para ver seu conteúdo.',
    fileSize: 'Tamanho do Arquivo',
    lastModified: 'Última Modificação',
    
    // Greenfire Tab - Team Information
    greenfireManagement: 'Gestão Greenfire',
    developers: 'Desenvolvedores',
    specialThanksTo: 'Agradecimentos Especiais A',
    pastDevelopers: 'Desenvolvedores Anteriores',
    pastGraphicDesigners: 'Designers Gráficos Anteriores',
    website: 'Site',
    twitter: 'Twitter',
    instagram: 'Instagram',
    linkedin: 'LinkedIn',
    keybase: 'Keybase',
    github: 'Github',
    medium: 'Medium',
    
    // Universe Tab - Projects
    greenfireUniverse: 'Universo Greenfire',
    bridgingCryptocurrencyEcosystem: 'Conectando o ecossistema de criptomoedas com o mundo real',
    cryptocurrencyBookkeepingWallet: 'Uma carteira de contabilidade e registro de criptomoedas',
    marketplaceElectronicsCrypto: 'Um mercado para comprar e vender eletrônicos com cripto',
    comingSoon: 'Em breve...',
    redacted: '*Redigido*',
    greenfireLogo: 'Logo Greenfire',
    greeneryLogo: 'Logo Greenery',
    techmarketsLogo: 'Logo Techmarkets',
    
    // Contribute Tab - Contribution Guide
    contributeToSparkplate: 'Contribuir para o Sparkplate',
    githubRepository: 'Repositório GitHub',
    openSourceProject: 'Sparkplate é um projeto open source. Você pode contribuir enviando pull requests ou reportando problemas no GitHub.',
    submitPullRequests: 'enviando pull requests',
    reportIssues: 'reportando problemas',
    repository: 'Repositório',
    howToCloneRepository: 'Como Clonar o Repositório',
    getStartedDevelopment: 'Para começar o desenvolvimento, clone o repositório para sua máquina local:',
    cloneRepositoryLocalMachine: 'clone o repositório para sua máquina local',
    howToSubmitPullRequest: 'Como Enviar um Pull Request',
    createNewBranch: 'Crie uma nova branch para sua funcionalidade ou correção de bug:',
    createNewBranchForFeature: 'Crie uma nova branch para sua funcionalidade ou correção de bug',
    makeChangesCommit: 'Faça suas alterações e faça commit com mensagens descritivas:',
    makeChangesCommitDescriptive: 'Faça suas alterações e faça commit com mensagens descritivas',
    pushBranchGitHub: 'Faça push da sua branch para o GitHub:',
    pushBranchToGitHub: 'Faça push da sua branch para o GitHub',
    goToRepository: 'Vá para o',
    goToSparkplateRepository: 'Vá para o repositório Sparkplate no GitHub',
    clickPullRequestButton: 'e clique no botão "Pull Request".',
    fillOutPRTemplate: 'Preencha o template de PR com detalhes sobre suas alterações.',
    fillOutPRTemplateDetails: 'Preencha o template de PR com detalhes sobre suas alterações',
    submitPullRequest: 'Envie o pull request e aguarde a revisão.',
    submitPullRequestWait: 'Envie o pull request e aguarde a revisão',
    waitForReview: 'aguarde a revisão',
    reportingIssues: 'Reportando Problemas',
    foundBugFeatureRequest: 'Encontrou um bug ou tem uma solicitação de funcionalidade? Por favor reporte em nosso rastreador de problemas:',
    reportIssueTracker: 'reporte em nosso rastreador de problemas',
    visitIssuesPage: 'Visite a',
    visitIssuesPageGitHub: 'Visite a página de Problemas no GitHub',
    clickNewIssueButton: 'Clique no botão "Novo Problema".',
    selectIssueTemplate: 'Selecione o template de problema apropriado.',
    selectAppropriateTemplate: 'Selecione o template de problema apropriado',
    fillOutRequiredInformation: 'Preencha todas as informações necessárias, incluindo:',
    fillOutAllRequired: 'Preencha todas as informações necessárias, incluindo',
    clearDescription: 'Descrição clara do problema ou solicitação de funcionalidade',
    clearDescriptionIssue: 'Descrição clara do problema ou solicitação de funcionalidade',
    stepsToReproduce: 'Passos para reproduzir (para bugs)',
    stepsToReproduceBugs: 'Passos para reproduzir (para bugs)',
    expectedBehavior: 'Comportamento esperado',
    actualBehavior: 'Comportamento atual',
    environmentDetails: 'Detalhes do ambiente (SO, navegador, etc.)',
    environmentDetailsOS: 'Detalhes do ambiente (SO, navegador, etc.)',
    screenshots: 'Capturas de tela ou mensagens de erro se aplicável',
    screenshotsErrors: 'Capturas de tela ou mensagens de erro se aplicável',
    
    // Donations Tab - Support
    supportSparkplate: 'Apoiar Sparkplate',
    donationsHelpMaintain: 'Suas doações nos ajudam a manter e melhorar este recurso gratuito para todos.',
    donationsHelpMaintainFree: 'Suas doações nos ajudam a manter e melhorar este recurso gratuito para todos.',
    cryptocurrencyDonations: 'Doações em Criptomoedas',
    qrCodeFor: 'Código QR para',
    logo: 'logo',
    copyAddress: 'Copiar Endereço',
    addressCopied: 'Endereço Copiado',
    
    // Common UI Elements
    loading: 'Carregando',
    error: 'Erro',
    close: 'Fechar',
    open: 'Abrir',
    copy: 'Copiar',
    copied: 'Copiado'
  }
}

/**
 * Get translation for a specific key and language
 * @param key - The translation key
 * @param language - The language code
 * @returns The translated text
 */
export function getAboutTranslation(key: keyof AboutTranslations, language: AboutSupportedLanguage = 'en'): string {
  return aboutTranslations[language]?.[key] || aboutTranslations.en[key] || key
}

/**
 * Get all translations for a specific language
 * @param language - The language code
 * @returns All translations for the specified language
 */
export function getAboutLanguageTranslations(language: AboutSupportedLanguage = 'en'): AboutTranslations {
  return aboutTranslations[language] || aboutTranslations.en
}

/**
 * Available languages for About modal
 */
export const aboutAvailableLanguages = [
  { code: 'en' as AboutSupportedLanguage, name: 'English', flag: '🇬🇧' },
  { code: 'es' as AboutSupportedLanguage, name: 'Español', flag: '🇪🇸' },
  { code: 'fr' as AboutSupportedLanguage, name: 'Français', flag: '🇫🇷' },
  { code: 'de' as AboutSupportedLanguage, name: 'Deutsch', flag: '🇩🇪' },
  { code: 'pt' as AboutSupportedLanguage, name: 'Português', flag: '🇵🇹' }
] as const