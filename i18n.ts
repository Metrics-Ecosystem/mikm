import i18n from 'i18next';
import reactNativeLanguageDetector from '@os-team/i18next-react-native-language-detector';

// Import your translation files
// import en from './locales/en.json';
// import fr from './locales/fr.json';

const resources = {
//   en,
//   fr,
  // Add more languages as needed
};

i18n
  .use(reactNativeLanguageDetector)
  .init({
    resources,
    detection: {
        order: ['react-native'],
    },
    fallbackLng: 'en', // Default language
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;