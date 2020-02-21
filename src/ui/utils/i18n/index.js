import i18n from 'i18next';
import detector from 'i18next-browser-languagedetector';
import backend from 'i18next-xhr-backend';

export default () => {
  i18n
    .use(detector)
    .use(process.env.NODE_ENV !== 'test' ? backend : {})
    .init({
      backend: {
        loadPath: '/locales/{{lng}}/{{ns}}.json',
        addPath: '/locales/add/{{lng}}/{{ns}}',
        allowMultiLoading: false,
        crossDomain: true,
      },
      debug: process.env.NODE_ENV === 'development',
      lng: 'en',
      preload: ['en'],
      fallbackLng: 'en', // use en if detected lng is not available
      ns: ['translation'],
      defaultNS: 'translation',
      saveMissing: true, // send not translated keys to endpoint
      keySeparator: false, // we do not use keys in form messages.welcome
      interpolation: {
        escapeValue: true,
      },
    });

  return i18n;
};
