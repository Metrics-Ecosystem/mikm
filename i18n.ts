import i18n from 'i18next';
import reactNativeLanguageDetector from '@os-team/i18next-react-native-language-detector';
import en from './locales/en.json';

const resources = {
    en,
    // +37 languages
};

i18n
  .use(reactNativeLanguageDetector)
  .init({
    compatibilityJSON: 'v3',
    resources,
    detection: {
        order: ['react-native'],
    },
    fallbackLng: 'en', // default
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;