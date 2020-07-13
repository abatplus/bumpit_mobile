import React from 'react';
import { IonApp } from '@ionic/react';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';
/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import { VCardProvider } from './store/contexts/VCardContext';
import { AppContextProvider } from './store/contexts/AppContext';
import AppRouter from './components/AppRouter';
import TranslationProvider from './i18n/TranslationProvider';
import { getLocale } from './i18n/TranslationProvider';
import { ProfileContextProvider } from './store/contexts/ProfileContext';

const App: React.FC = () => {
  const [locale, setLocale] = React.useState('en');

  React.useEffect(() => {
    (async function settingLocale() {
      setLocale(await getLocale());
    })();
  }, [locale]);

  return (
    <TranslationProvider locale={locale}>
      <IonApp>
        <AppContextProvider>
          <ProfileContextProvider>
            <VCardProvider>
              <AppRouter />
            </VCardProvider>
          </ProfileContextProvider>
        </AppContextProvider>
      </IonApp>
    </TranslationProvider>
  );
};

export default App;
