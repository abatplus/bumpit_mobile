import React from 'react';
import { IntlProvider } from 'react-intl';
import { translations } from './translations';
import { isPlatform } from '@ionic/react';
import { Globalization } from '@ionic-native/globalization';

export const getLocale = async () => {
  if (isPlatform('cordova') || isPlatform('capacitor')) {
    await Globalization.getPreferredLanguage()
      .then((res) => res.value.split(/[-_]/)[0])
      .catch(() => 'en');
  }
  return navigator.language.split(/[-_]/)[0];
};

const messages = {
  de: { ...translations.de },
  en: { ...translations.en },
};

interface ITranslationProviderProps {
  locale: string;
  children?: any;
}

const TranslationProvider: React.FC<ITranslationProviderProps> = (props) => {
  const message = messages.de;

  return (
    <IntlProvider locale={props.locale} messages={message}>
      {props.children}
    </IntlProvider>
  );
};

export default TranslationProvider;
