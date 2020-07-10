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

interface IIntelContext {
  locale: string;
  messages: any;
}

const Context = React.createContext<IIntelContext>({ locale: '', messages: {} });

interface ITranslationProviderProps {
  locale: string;
  children?: React.ReactNode;
}

const TranslationProvider: React.FC<ITranslationProviderProps> = (props) => {
  return (
    <Context.Provider value={{ locale: props.locale, messages }}>
      <IntlProvider locale={props.locale} messages={props.locale === 'de' ? messages.de : messages.en}>
        {props.children}
      </IntlProvider>
    </Context.Provider>
  );
};

export default TranslationProvider;
