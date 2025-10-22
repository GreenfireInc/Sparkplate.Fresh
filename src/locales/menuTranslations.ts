/**
 * Menu Translations for Sparkplate Application
 * TypeScript version with type safety
 */

export interface MenuTranslations {
  // Main Menu Labels
  file: string
  edit: string
  view: string
  window: string
  help: string
  
  // UI Labels
  language: string
  
  // File Menu Items
  close: string
  quit: string
  
  // Edit Menu Items
  undo: string
  redo: string
  cut: string
  copy: string
  paste: string
  delete: string
  selectAll: string
  
  // View Menu Items
  toggleDevTools: string
  forceReload: string
  resetZoom: string
  zoomIn: string
  zoomOut: string
  toggleFullscreen: string
  
  // Window Menu Items
  minimize: string
  zoom: string
  front: string
  window: string
  
  // Help Menu Items
  keyboardShortcuts: string
  about: string
  restoreBackup: string
  
  // Navigation Items
  home: string
  keyFiles: string
  cryptocurrency: string
  cryptography: string
  networking: string
  techStack: string
  repurposing: string
  build: string
  package: string
  publish: string
  games: string
  sandbox: string
  settings: string
}

export type SupportedLanguage = 'en' | 'es' | 'fr' | 'de' | 'pt'

export const menuTranslations: Record<SupportedLanguage, MenuTranslations> = {
  en: {
    // Main Menu Labels
    file: 'File',
    edit: 'Edit',
    view: 'View',
    window: 'Window',
    help: 'Help',
    
    // UI Labels
    language: 'Language',
    
    // File Menu Items
    close: 'Close',
    quit: 'Quit',
    
    // Edit Menu Items
    undo: 'Undo',
    redo: 'Redo',
    cut: 'Cut',
    copy: 'Copy',
    paste: 'Paste',
    delete: 'Delete',
    selectAll: 'Select All',
    
    // View Menu Items
    toggleDevTools: 'Toggle Developer Tools',
    forceReload: 'Force Reload',
    resetZoom: 'Reset Zoom',
    zoomIn: 'Zoom In',
    zoomOut: 'Zoom Out',
    toggleFullscreen: 'Toggle Fullscreen',
    
    // Window Menu Items
    minimize: 'Minimize',
    zoom: 'Zoom',
    front: 'Bring All to Front',
    window: 'Window',
    
    // Help Menu Items
    keyboardShortcuts: 'Keyboard Shortcuts',
    about: 'About',
    restoreBackup: 'Restore Backup',
    
    // Navigation Items
    home: 'Home',
    keyFiles: 'Key Files',
    cryptocurrency: 'Cryptocurrency',
    cryptography: 'Cryptography',
    networking: 'Networking',
    techStack: 'Tech Stack',
    repurposing: 'Repurposing',
    build: 'Build',
    package: 'Package',
    publish: 'Publish',
    games: 'Games',
    sandbox: 'Sandbox',
    settings: 'Settings'
  },
  
  es: {
    // Main Menu Labels
    file: 'Archivo',
    edit: 'Editar',
    view: 'Ver',
    window: 'Ventana',
    help: 'Ayuda',
    
    // UI Labels
    language: 'Idioma',
    
    // File Menu Items
    close: 'Cerrar',
    quit: 'Salir',
    
    // Edit Menu Items
    undo: 'Deshacer',
    redo: 'Rehacer',
    cut: 'Cortar',
    copy: 'Copiar',
    paste: 'Pegar',
    delete: 'Eliminar',
    selectAll: 'Seleccionar Todo',
    
    // View Menu Items
    toggleDevTools: 'Alternar Herramientas de Desarrollador',
    forceReload: 'Recarga Forzada',
    resetZoom: 'Restablecer Zoom',
    zoomIn: 'Acercar',
    zoomOut: 'Alejar',
    toggleFullscreen: 'Alternar Pantalla Completa',
    
    // Window Menu Items
    minimize: 'Minimizar',
    zoom: 'Zoom',
    front: 'Traer Todo al Frente',
    window: 'Ventana',
    
    // Help Menu Items
    keyboardShortcuts: 'Atajos de Teclado',
    about: 'Acerca de',
    restoreBackup: 'Restaurar Respaldo',
    
    // Navigation Items
    home: 'Inicio',
    keyFiles: 'Archivos Clave',
    cryptocurrency: 'Criptomoneda',
    cryptography: 'Criptografía',
    networking: 'Redes',
    techStack: 'Pila Tecnológica',
    repurposing: 'Reutilización',
    build: 'Construir',
    package: 'Paquete',
    publish: 'Publicar',
    games: 'Juegos',
    sandbox: 'Zona de Pruebas',
    settings: 'Configuración'
  },
  
  fr: {
    // Main Menu Labels
    file: 'Fichier',
    edit: 'Édition',
    view: 'Affichage',
    window: 'Fenêtre',
    help: 'Aide',
    
    // UI Labels
    language: 'Langue',
    
    // File Menu Items
    close: 'Fermer',
    quit: 'Quitter',
    
    // Edit Menu Items
    undo: 'Annuler',
    redo: 'Rétablir',
    cut: 'Couper',
    copy: 'Copier',
    paste: 'Coller',
    delete: 'Supprimer',
    selectAll: 'Tout Sélectionner',
    
    // View Menu Items
    toggleDevTools: 'Basculer les Outils de Développement',
    forceReload: 'Rechargement Forcé',
    resetZoom: 'Réinitialiser le Zoom',
    zoomIn: 'Zoom Avant',
    zoomOut: 'Zoom Arrière',
    toggleFullscreen: 'Basculer Plein Écran',
    
    // Window Menu Items
    minimize: 'Réduire',
    zoom: 'Zoom',
    front: 'Mettre Tout au Premier Plan',
    window: 'Fenêtre',
    
    // Help Menu Items
    keyboardShortcuts: 'Raccourcis Clavier',
    about: 'À Propos',
    restoreBackup: 'Restaurer la Sauvegarde',
    
    // Navigation Items
    home: 'Accueil',
    keyFiles: 'Fichiers Clés',
    cryptocurrency: 'Cryptomonnaie',
    cryptography: 'Cryptographie',
    networking: 'Réseau',
    techStack: 'Pile Technologique',
    repurposing: 'Réutilisation',
    build: 'Construire',
    package: 'Paquet',
    publish: 'Publier',
    games: 'Jeux',
    sandbox: 'Bac à Sable',
    settings: 'Paramètres'
  },
  
  de: {
    // Main Menu Labels
    file: 'Datei',
    edit: 'Bearbeiten',
    view: 'Ansicht',
    window: 'Fenster',
    help: 'Hilfe',
    
    // UI Labels
    language: 'Sprache',
    
    // File Menu Items
    close: 'Schließen',
    quit: 'Beenden',
    
    // Edit Menu Items
    undo: 'Rückgängig',
    redo: 'Wiederholen',
    cut: 'Ausschneiden',
    copy: 'Kopieren',
    paste: 'Einfügen',
    delete: 'Löschen',
    selectAll: 'Alles Auswählen',
    
    // View Menu Items
    toggleDevTools: 'Entwicklertools Umschalten',
    forceReload: 'Erzwungenes Neuladen',
    resetZoom: 'Zoom Zurücksetzen',
    zoomIn: 'Vergrößern',
    zoomOut: 'Verkleinern',
    toggleFullscreen: 'Vollbild Umschalten',
    
    // Window Menu Items
    minimize: 'Minimieren',
    zoom: 'Zoom',
    front: 'Alle in den Vordergrund',
    window: 'Fenster',
    
    // Help Menu Items
    keyboardShortcuts: 'Tastenkürzel',
    about: 'Über',
    restoreBackup: 'Backup Wiederherstellen',
    
    // Navigation Items
    home: 'Startseite',
    keyFiles: 'Schlüsseldateien',
    cryptocurrency: 'Kryptowährung',
    cryptography: 'Kryptographie',
    networking: 'Netzwerk',
    techStack: 'Technologie-Stack',
    repurposing: 'Wiederverwendung',
    build: 'Erstellen',
    package: 'Paket',
    publish: 'Veröffentlichen',
    games: 'Spiele',
    sandbox: 'Sandkasten',
    settings: 'Einstellungen'
  },
  
  pt: {
    // Main Menu Labels
    file: 'Arquivo',
    edit: 'Editar',
    view: 'Visualizar',
    window: 'Janela',
    help: 'Ajuda',
    
    // UI Labels
    language: 'Idioma',
    
    // File Menu Items
    close: 'Fechar',
    quit: 'Sair',
    
    // Edit Menu Items
    undo: 'Desfazer',
    redo: 'Refazer',
    cut: 'Cortar',
    copy: 'Copiar',
    paste: 'Colar',
    delete: 'Excluir',
    selectAll: 'Selecionar Tudo',
    
    // View Menu Items
    toggleDevTools: 'Alternar Ferramentas de Desenvolvedor',
    forceReload: 'Recarregamento Forçado',
    resetZoom: 'Redefinir Zoom',
    zoomIn: 'Aumentar Zoom',
    zoomOut: 'Diminuir Zoom',
    toggleFullscreen: 'Alternar Tela Cheia',
    
    // Window Menu Items
    minimize: 'Minimizar',
    zoom: 'Zoom',
    front: 'Trazer Tudo para a Frente',
    window: 'Janela',
    
    // Help Menu Items
    keyboardShortcuts: 'Atalhos de Teclado',
    about: 'Sobre',
    restoreBackup: 'Restaurar Backup',
    
    // Navigation Items
    home: 'Início',
    keyFiles: 'Arquivos Chave',
    cryptocurrency: 'Criptomoeda',
    cryptography: 'Criptografia',
    networking: 'Rede',
    techStack: 'Stack Tecnológico',
    repurposing: 'Reutilização',
    build: 'Construir',
    package: 'Pacote',
    publish: 'Publicar',
    games: 'Jogos',
    sandbox: 'Caixa de Areia',
    settings: 'Configurações'
  }
}

/**
 * Get translation for a specific key and language
 * @param key - The translation key
 * @param language - The language code
 * @returns The translated text
 */
export function getTranslation(key: keyof MenuTranslations, language: SupportedLanguage = 'en'): string {
  return menuTranslations[language]?.[key] || menuTranslations.en[key] || key
}

/**
 * Get all translations for a specific language
 * @param language - The language code
 * @returns All translations for the specified language
 */
export function getLanguageTranslations(language: SupportedLanguage = 'en'): MenuTranslations {
  return menuTranslations[language] || menuTranslations.en
}

/**
 * Available languages with their display names
 */
export const availableLanguages = [
  { code: 'en' as SupportedLanguage, name: 'English' },
  { code: 'es' as SupportedLanguage, name: 'Español' },
  { code: 'fr' as SupportedLanguage, name: 'Français' },
  { code: 'de' as SupportedLanguage, name: 'Deutsch' },
  { code: 'pt' as SupportedLanguage, name: 'Português' }
] as const
