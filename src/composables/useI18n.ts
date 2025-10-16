import { ref } from 'vue'

export type LocaleCode = 'en' | 'es' | 'fr' | 'de' | 'pt'

const currentLocale = ref<LocaleCode>('en')

const translations: Record<LocaleCode, Record<string, string>> = {
  en: {
    welcome: 'Welcome',
    selectUserPrompt: 'Please select a user account to continue',
    signIn: 'Sign in',
    forgotPassword: 'I forgot my password',
    password: 'Password',
    createAccount: 'Create Account',
    language: 'Language',
    enterDetailsToSignup: 'Enter your details to sign up',
    firstName: 'First Name',
    lastName: 'Last Name',
    email: 'Email',
    emailAddress: 'Email Address',
  },
  es: {
    welcome: 'Bienvenido',
    selectUserPrompt: 'Seleccione una cuenta de usuario para continuar',
    signIn: 'Iniciar sesión',
    forgotPassword: 'Olvidé mi contraseña',
    password: 'Contraseña',
    createAccount: 'Crear cuenta',
    language: 'Idioma',
    enterDetailsToSignup: 'Ingrese sus datos para registrarse',
    firstName: 'Nombre',
    lastName: 'Apellido',
    email: 'Correo electrónico',
    emailAddress: 'Dirección de correo electrónico',
  },
  fr: {
    welcome: 'Bienvenue',
    selectUserPrompt: 'Veuillez sélectionner un compte utilisateur pour continuer',
    signIn: 'Se connecter',
    forgotPassword: 'J\'ai oublié mon mot de passe',
    password: 'Mot de passe',
    createAccount: 'Créer un compte',
    language: 'Langue',
    enterDetailsToSignup: 'Entrez vos détails pour vous inscrire',
    firstName: 'Prénom',
    lastName: 'Nom de famille',
    email: 'E-mail',
    emailAddress: 'Adresse e-mail',
  },
  de: {
    welcome: 'Willkommen',
    selectUserPrompt: 'Bitte wählen Sie ein Benutzerkonto aus, um fortzufahren',
    signIn: 'Anmelden',
    forgotPassword: 'Ich habe mein Passwort vergessen',
    password: 'Passwort',
    createAccount: 'Konto erstellen',
    language: 'Sprache',
    enterDetailsToSignup: 'Geben Sie Ihre Daten ein, um sich anzumelden',
    firstName: 'Vorname',
    lastName: 'Nachname',
    email: 'E-Mail',
    emailAddress: 'E-Mail-Adresse',
  },
  pt: {
    welcome: 'Bem-vindo',
    selectUserPrompt: 'Selecione uma conta de usuário para continuar',
    signIn: 'Entrar',
    forgotPassword: 'Esqueci minha senha',
    password: 'Senha',
    createAccount: 'Criar conta',
    language: 'Idioma',
    enterDetailsToSignup: 'Digite seus dados para se inscrever',
    firstName: 'Nome',
    lastName: 'Sobrenome',
    email: 'E-mail',
    emailAddress: 'Endereço de e-mail',
  },
}

export function useI18n() {
  const locale = currentLocale
  
  const setLocale = (newLocale: LocaleCode) => {
    currentLocale.value = newLocale
  }
  
  const t = (key: string): string => {
    return translations[currentLocale.value]?.[key] || translations.en[key] || key
  }
  
  const languages = [
    { code: 'en' as LocaleCode, name: 'English', flag: '🇬🇧' },
    { code: 'es' as LocaleCode, name: 'Español', flag: '🇪🇸' },
    { code: 'fr' as LocaleCode, name: 'Français', flag: '🇫🇷' },
    { code: 'de' as LocaleCode, name: 'Deutsch', flag: '🇩🇪' },
    { code: 'pt' as LocaleCode, name: 'Português', flag: '🇵🇹' },
  ]
  
  return {
    locale,
    setLocale,
    t,
    languages,
  }
}

