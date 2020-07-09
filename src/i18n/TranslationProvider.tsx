import React from 'react';
import { IntlProvider } from 'react-intl';
import { translations } from './translations';

const getLocale: () => {};

const TranslationProvider: React.FC = () => {
  return <IntlProvider locale={getLocale()} messages={translations}></IntlProvider>;
};

export default TranslationProvider;
