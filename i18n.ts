import i18n from 'i18next';
import reactNativeLanguageDetector from '@os-team/i18next-react-native-language-detector';
import en from './locales/en.json';
import es from './locales/es.json';
import fr from './locales/fr.json';
import de from './locales/de.json';
import zh from './locales/zh.json';
import ru from './locales/ru.json';
import it from './locales/it.json';
import pt from './locales/pt.json';
import ja from './locales/ja.json';
import ar from './locales/ar.json';
import hi from './locales/hi.json';
import bn from './locales/bn.json';
import ur from './locales/ur.json';
import sw from './locales/sw.json';
import tl from './locales/tl.json';
import nl from './locales/nl.json';
import ko from './locales/ko.json';
import tr from './locales/tr.json';
import vi from './locales/vi.json';
import th from './locales/th.json';
import cs from './locales/cs.json';
import pl from './locales/pl.json';
import hu from './locales/hu.json';
import el from './locales/el.json';
import ro from './locales/ro.json';
import id from './locales/id.json';
import ms from './locales/ms.json';
import fi from './locales/fi.json';
import sv from './locales/sv.json';
import da from './locales/da.json';
import no from './locales/no.json';
import he from './locales/he.json';
import is from './locales/is.json';
import sk from './locales/sk.json';
import sr from './locales/sr.json';
import lt from './locales/lt.json';
import sl from './locales/sl.json';
import mk from './locales/mk.json';

const resources = {
  en,es,fr,de,zh,ru,it,pt,ja,ar,hi,bn,ur,sw,tl,nl,ko,tr,vi,
  th,cs,pl,hu,el,ro,id,ms,fi,sv,da,no,he,is,sk,sr,lt,sl,mk,
  // 38 languages
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