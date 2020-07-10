import React from 'react';
import { IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/react';
import { Route, Redirect } from 'react-router';
import { people, scan } from 'ionicons/icons';
import VCardView from './VCardView';
import QrView from './QrView';
import ScanView from './ScanView';
import SwapView from './SwapView';
import { useIntl } from 'react-intl';

const MainTabs: React.FC = () => {
  const i18n = useIntl();

  return (
    <IonTabs>
      <IonRouterOutlet>
        <Redirect exact path="/tabs" to="/tabs/vcard" />
        {/*
          Using the render method prop cuts down the number of renders your components will have due to route changes.
          Use the component prop when your component depends on the RouterComponentProps passed in automatically.
        */}
        <Route path="/" render={() => <VCardView />} exact={true} />
        <Route path="/qrcode" render={() => <QrView />} exact={true} />
        <Route path="/scan" render={() => <ScanView />} exact={true} />
        <Route path="/swap" render={() => <SwapView />} exact={true} />
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="vcard" href="/">
          <IonIcon icon={people} />
          <IonLabel>{i18n.formatMessage({ id: 'Card' })}</IonLabel>
        </IonTabButton>
        <IonTabButton tab="scan" href="/tabs/scan">
          <IonIcon icon={scan} />
          <IonLabel>{i18n.formatMessage({ id: 'Scan' })}</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default MainTabs;
