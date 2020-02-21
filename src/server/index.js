import bodyParser from 'body-parser';
import express from 'express';
import expressHandlebars from 'express-handlebars';
import i18next from 'i18next';
import middleware from 'i18next-express-middleware';
import FsBackend from 'i18next-node-fs-backend';
import log from 'shared/log';

const handlebars = expressHandlebars.create({
  defaultLayout: 'main',
  extname: '.html',
});

const backend =
  process.env.NODE_ENV === 'production'
    ? {
        loadPath: `./locales/{{lng}}/{{ns}}.json`,
        addPath: `./locales/{{lng}}/{{ns}}.missing.json`,
      }
    : {
        loadPath: `${__dirname}/locales/{{lng}}/{{ns}}.json`,
        addPath: `${__dirname}/locales/{{lng}}/{{ns}}.missing.json`,
      };

i18next
  .use(FsBackend)
  .use(middleware.LanguageDetector)
  .init({
    preload: ['en'],
    fallbackLng: 'en',
    lng: 'en',
    initImmediate: true,
    saveMissing: true,
    debug: process.env.NODE_ENV === 'development',
    backend,
    nsSeparator: '#||#',
    keySeparator: '#|#',
    detection: {
      order: ['querystring', 'cookie'],
      caches: ['cookie'],
    },
  });

const app = express();

// Set up all express middleware
app.engine('html', handlebars.engine);
app.set('view engine', 'html');
app.use(middleware.handle(i18next));

if (process.env.NODE_ENV === 'production') {
  app.set('views', './');
  app.use(
    express.static('./public/', {
      dotfiles: 'ignore',
      etag: false,
      extensions: ['htm', 'html'],
      index: false,
    }),
  );
  app.use('/locales', express.static('./locales/'));
} else {
  app.set('views', './src/');
  app.use(
    express.static(`${__dirname}/../public/`, {
      dotfiles: 'ignore',
      etag: false,
      extensions: ['htm', 'html'],
      index: false,
    }),
  );
  app.use('/locales', express.static(`${__dirname}/locales/`));
}
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

app.use(express.json());

// missing keys; make sure the body is parsed (i.e. with [body-parser](https://github.com/expressjs/body-parser#bodyparserjsonoptions))
app.post('/locales/add/:lng/:ns', middleware.missingKeyHandler(i18next));

app.get(['/'], (req, res) => {
  res.render('./public/index.html', {
    services: {
      query: process.env.QUERY_API || '',
      analyticsEnabled: process.env.ANALYTICS_ENABLED || 'true',
    },
    layout: false,
  });
});

app.listen(
  process.env.PORT || 3001,
  '0.0.0.0',
  () => log(`Listening on port ${process.env.PORT || 3001}!`), //eslint-disable-line
);

if (process.env.NODE_ENV !== 'production') {
  module.exports = app;
}
