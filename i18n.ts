import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import reactNativeLanguageDetector from '@os-team/i18next-react-native-language-detector';
import zhHant from './locales/zhHant.json'; //TRADITIONAL CHINESE
import zh from './locales/zh.json'; //SIMPLIFIED CHINESE
import en from './locales/en.json'; //ENGLISH
import es from './locales/es.json'; //SPANISH
import pt from './locales/pt.json'; //PORTUGUESE
import fr from './locales/fr.json'; //FRENCH
import de from './locales/de.json'; //GERMAN
import it from './locales/it.json'; //ITALIAN
import sv from './locales/sv.json'; //SWEDISH
import nl from './locales/nl.json'; //DUTCH
import da from './locales/da.json'; //DANISH
import no from './locales/no.json'; //NORWEGIAN BOKMÅL
import fi from './locales/fi.json'; //FINNISH
import pl from './locales/pl.json'; //POLISH
import cs from './locales/cs.json'; //CZECH
import el from './locales/el.json'; //GREEK
import hu from './locales/hu.json'; //HUNGARIAN
import ro from './locales/ro.json'; //ROMANIAN
import sk from './locales/sk.json'; //SLOVAK
import ja from './locales/ja.json'; //JAPANESE
import ru from './locales/ru.json'; //RUSSIAN
import he from './locales/he.json'; //HEBREW
import ar from './locales/ar.json'; //ARABIC
import id from './locales/id.json'; //INDONESIAN
import ms from './locales/ms.json'; //MALAY
import hi from './locales/hi.json'; //HINDI
import ko from './locales/ko.json'; //KOREAN
import tr from './locales/tr.json'; //TURKISH
import vi from './locales/vi.json'; //VIETNAMESE
import th from './locales/th.json'; //THAI

const resources = {
  // 30 languages
  'zh-Hant': zhHant,
  'zh': zh,
  'en': en,
  'es': es,
  'pt': pt,
  'fr': fr,
  'de': de,
  'it': it,
  'sv': sv,
  'nl': nl,
  'da': da,
  'no': no,
  'fi': fi,
  'pl': pl,
  'cs': cs,
  'el': el,
  'hu': hu,
  'ro': ro,
  'sk': sk,
  'ja': ja,
  'ru': ru,
  'he': he,
  'ar': ar,
  'id': id,
  'ms': ms,
  'hi': hi,
  'ko': ko,
  'tr': tr,
  'vi': vi,
  'th': th
};

i18n
  .use(reactNativeLanguageDetector)
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    resources,
    supportedLngs: ['zh-Hant','zh','en','es','pt','fr','de','it','sv','nl','da','no','fi','pl',
      'cs','el','hu','ro','sk','ja','ru','he','ar','id','ms','hi','ko','tr','vi','th'],
    detection: {
      order: ['react-native'],
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;