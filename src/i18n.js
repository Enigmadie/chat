import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      blank: 'Can\'t be blank',
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    lng: 'en',
    debug: true,
    resources,
    fallbacklng: false,
    react: {
      wait: true,
    },
  });

export default i18n;
