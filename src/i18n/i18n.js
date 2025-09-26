import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

// Import translations
import de from './locales/de.json'
import en from './locales/en.json'
import es from './locales/es.json'
import pt from './locales/pt.json'
import fr from './locales/fr.json'

const resources = {
  de: { translation: de },
  en: { translation: en },
  es: { translation: es },
  pt: { translation: pt },
  fr: { translation: fr }
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'de',
    debug: false,
    
    interpolation: {
      escapeValue: false
    },
    
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage']
    }
  })

export default i18n

