import React from 'react';
import { IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/react';
import { Route, Redirect } from 'react-router';
import { people, qrCode, scan, share } from 'ionicons/icons';
import VCardView from './VCardView';
import QrView from './QrView';
import ScanView from './ScanView';
import SwapView from './SwapView';

const MainTabs: React.FC = () => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Redirect exact path="/tabs" to="/tabs/schedule" />
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
          <IonLabel>Card</IonLabel>
        </IonTabButton>
        <IonTabButton tab="qrcode" href="/qrcode">
          <IonIcon icon={qrCode} />
          <IonLabel>QR</IonLabel>
        </IonTabButton>
        <IonTabButton tab="scan" href="/scan">
          <IonIcon icon={scan} />
          <IonLabel>Scan</IonLabel>
        </IonTabButton>
        <IonTabButton tab="swap" href="/swap">
          <IonIcon icon={share} />
          <IonLabel>Swap</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default MainTabs;
