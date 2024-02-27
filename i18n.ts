import i18n from 'i18next';
import reactNativeLanguageDetector from '@os-team/i18next-react-native-language-detector';
import en from './locales/en.json';
import es from './locales/es.json';
import fr from './locales/fr.json';
import de from './locales/de.json';
import zh from './locales/zh.json';
import ru from './locales/ru.json';
import it from './locales/it.json';

const resources = {
    en, es, fr, de, zh, ru, it
    // 37 languages
};

i18n
  .use(reactNativeLanguageDetector)
  .init({
    compatibilityJSON: 'v3',
    resources,
    detection: {
        order: ['react-native'],
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;