import React from 'react';
import { IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/react';
import { Route } from 'react-router';
import { people, scan } from 'ionicons/icons';
import VCardView from './VCardView';
import QrView from './QrView';
import ScanView from './ScanView';
import SwapView from './SwapView';
import { useIntl } from 'react-intl';
import { nameof } from '../utils';
import IvCardTranslations from '../i18n/IvCardTranslations';
import About from './About';
import LegalInfo from './LegalInfo';
import Privacy from './Privacy';
import VCardProfiles from './VCardProfiles';
import NewProfile from './NewProfile';

const MainTabs: React.FC = () => {
  const i18n = useIntl();

  return (
    <IonTabs>
      <IonRouterOutlet>
        {/*
          Using the render method prop cuts down the number of renders your components will have due to route changes.
          Use the component prop when your component depends on the RouterComponentProps passed in automatically.
        */}
        <Route path="/qrcode" render={() => <QrView />} exact={true} />
        <Route path="/scan" render={() => <ScanView />} exact={true} />
        <Route path="/swap/:id" render={() => <SwapView />} exact={true} />
        <Route path="/privacy" render={() => <Privacy />} exact={true} />
        <Route path="/legal" render={() => <LegalInfo />} exact={true} />
        <Route path="/about" render={() => <About />} exact={true} />
        <Route path="/profile/edit/:id" component={VCardView} exact={true} />
        <Route path="/profile/create" component={NewProfile} />
        <Route path="/profile" component={VCardProfiles} />
        <Route path="/" render={() => <VCardProfiles />} exact={true} />
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="profile" href="/profile">
          <IonIcon icon={people} />
          <IonLabel>{i18n.formatMessage({ id: nameof<IvCardTranslations>('Profiles') })}</IonLabel>
        </IonTabButton>
        <IonTabButton tab="scan" href="/scan">
          <IonIcon icon={scan} />
          <IonLabel>{i18n.formatMessage({ id: nameof<IvCardTranslations>('Scan') })}</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default MainTabs;
