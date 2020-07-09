import React  from 'react';
import { IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/react';
import { Route, Redirect } from 'react-router';
import { people, qrCode, scan, share } from 'ionicons/icons';
import VcardView from './VCardView';
import QrView from './QrView';
import ScanView from './ScanView';
import SwapView from './SwapView';

const MainTabs: React.FC = () => {

  const swapData = () => {
    //swapCardData();
    alert("swapCardData");
  }

  return (
    <IonTabs>
      <IonRouterOutlet>
        <Redirect exact path="/tabs" to="/tabs/vcard" />
        {/*
          Using the render method prop cuts down the number of renders your components will have due to route changes.
          Use the component prop when your component depends on the RouterComponentProps passed in automatically.
        */}
        <Route path="/tabs/vcard" render={() => <VcardView />} exact={true} />
        <Route path="/tabs/qrcode" render={() => <QrView />} exact={true} />
        <Route path="/tabs/scan" render={() => <ScanView />} exact={true} />
        <Route path="/tabs/swap" render={() => <SwapView />} exact={true} />
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="vcard" href="/tabs/vcard">
          <IonIcon icon={people} />
          <IonLabel>tete</IonLabel>
        </IonTabButton>
        <IonTabButton tab="qrcode" href="/tabs/qrcode">
          <IonIcon icon={qrCode} />
          <IonLabel>QR</IonLabel>
        </IonTabButton>
        <IonTabButton tab="scan" href="/tabs/scan">
          <IonIcon icon={scan} />
          <IonLabel>Scan</IonLabel>
        </IonTabButton>
          <IonTabButton tab="swap" href="/tabs/swap">
          <IonIcon icon={share} />
          <IonLabel>Swap</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default MainTabs;