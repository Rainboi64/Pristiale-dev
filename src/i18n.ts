import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { ar } from './assets/translations/ar';
import { en } from './assets/translations/en';

i18n.use(initReactI18next).init({
  resources: {
    ar,
    en,
  },
  lng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
