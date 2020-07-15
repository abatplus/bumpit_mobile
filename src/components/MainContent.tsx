import React from 'react';
import { IonTabBar, IonTabButton, IonIcon, IonLabel, IonTabs, IonRouterOutlet, IonPage } from '@ionic/react';
import { people, scan } from 'ionicons/icons';
import { useIntl } from 'react-intl';
import { nameof } from '../utils';
import IvCardTranslations from '../i18n/IvCardTranslations';
import { Route, Redirect } from 'react-router';
import ScanView from '../pages/ScanView';
import QrView from '../pages/QrView';
import SwapView from '../pages/SwapView';
import Privacy from '../pages/Privacy';
import LegalInfo from '../pages/LegalInfo';
import About from '../pages/About';
import TermsAndConditions from '../pages/TermsAndConditions';
import VCardView from '../pages/VCardView';
import NewProfile from '../pages/NewProfile';
import VCardProfiles from '../pages/VCardProfiles';

export const MainContent: React.FC = () => {
  const i18n = useIntl();

  return (
    <IonPage id="main">
      <IonTabs>
        <IonRouterOutlet>
          <Route path="/qrcode/:id" component={QrView} exact={true} />
          <Route path="/scan" component={ScanView} exact={true} />
          <Route path="/swap/:id" component={SwapView} exact={true} />
          <Route path="/privacy" component={Privacy} exact={true} />
          <Route path="/legal" component={LegalInfo} exact={true} />
          <Route path="/about" component={About} exact={true} />
          <Route path="/termsAndConditions" component={TermsAndConditions} exact={true} />
          <Route path="/profile/edit/:id" component={VCardView} exact={true} />
          <Route path="/profile/create" component={NewProfile} exact={true} />
          <Route path="/profile" component={VCardProfiles} exact={true} />
          <Redirect exact path="/" to="/profile" />
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
    </IonPage>
  );
};
