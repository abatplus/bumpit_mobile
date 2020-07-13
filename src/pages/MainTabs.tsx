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
import TermsAndConditions from './TermsAndConditions';

const MainTabs: React.FC = () => {
  const i18n = useIntl();

  return (
    <IonTabs>
      <IonRouterOutlet>
        {/*
          Using the render method prop cuts down the number of renders your components will have due to route changes.
          Use the component prop when your component depends on the RouterComponentProps passed in automatically.
        */}
        <Route path="/vcard" render={() => <VCardView />} exact={true} />
        <Route path="/qrcode" render={() => <QrView />} exact={true} />
        <Route path="/scan" render={() => <ScanView />} exact={true} />
        <Route path="/swap" render={() => <SwapView />} exact={true} />
        <Route path="/privacy" render={() => <Privacy />} exact={true} />
        <Route path="/legal" render={() => <LegalInfo />} exact={true} />
        <Route path="/about" render={() => <About />} exact={true} />
        <Route path="/termsAndConditions" render={() => <TermsAndConditions />} exact={true} />
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="vcard" href="/vcard">
          <IonIcon icon={people} />
          <IonLabel>{i18n.formatMessage({ id: nameof<IvCardTranslations>('Card') })}</IonLabel>
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
