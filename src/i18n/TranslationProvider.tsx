import React, { useEffect } from 'react';
import { IntlProvider } from 'react-intl';
import { translations } from './translations';
import { isPlatform } from '@ionic/react';
import { Globalization } from '@ionic-native/globalization';

const getLocale = async () => {
  if (isPlatform('cordova') || isPlatform('capacitor')) {
    await Globalization.getPreferredLanguage()
      .then((res) => res.value.split('-')[0])
      .catch(() => 'en');
  }
  return navigator.language.split('-')[0];
};

const messages = (locale: string) => {
  switch (locale.toLocaleLowerCase()) {
    case 'de':
      return translations.de;
    case 'en':
    default:
      return translations.en;
  }
};

interface ITranslationProviderProps {
  children?: any;
}

const TranslationProvider: React.FC<ITranslationProviderProps> = (props) => {
  const [locale, setLocale] = React.useState('en');

  useEffect(() => {
    (async function settingLocale() {
      setLocale(await getLocale());
      console.log('USE EFFECT USING LOCALE: ' + locale);
    })();
  }, [locale]);

  return (
    <IntlProvider locale={locale} messages={messages(locale)}>
      {props.children}
    </IntlProvider>
  );
};

export default TranslationProvider;
