import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import i18next from 'i18next';

import en_locale from './i18n/en';
import fr_locale from './i18n/fr';

i18next.init({
    interpolation: {
      // React already does escaping
      escapeValue: false,
    },
    lng: 'en',
    resources: {
      en: {
        translation: en_locale,
      },
      fr: fr_locale,
    },
  },
  (err, t) => {
    if (err) {
      return console.error(err)
    }
  }
)

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
