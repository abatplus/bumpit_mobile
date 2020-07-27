import React from 'react';
import { IonTabBar, IonTabButton, IonLabel, IonTabs, IonRouterOutlet, IonPage } from '@ionic/react';
import { faBarcodeRead, faIdCard } from '@fortawesome/pro-duotone-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useIntl } from 'react-intl';
import { translate } from '../utils';
import { Route, Redirect } from 'react-router';
import ScanView from '../pages/ScanView';
import QrView from '../pages/QrView';
import SwapView from '../pages/SwapView';
import Privacy from '../pages/Privacy';
import LegalInfo from '../pages/LegalInfo';
import About from '../pages/About';
import TermsAndConditions from '../pages/TermsAndConditions';
import VCardView from '../pages/VCardView';
import VCardProfiles from '../pages/VCardProfiles';
import NewContactView from '../pages/NewContactView';
import './MainContent.css';

export const MainContent: React.FC = () => {
  const i18n = useIntl();

  return (
    <IonPage id="main">
      <IonTabs>
        <IonRouterOutlet>
          <Route path="/qrcode/:id" component={QrView} exact={true} />
          <Route path="/scan" component={ScanView} exact={true} />
          <Route path="/newContact" component={NewContactView} exact={true} />
          <Route path="/swap/:id" component={SwapView} exact={true} />
          <Route path="/privacy" component={Privacy} exact={true} />
          <Route path="/legal" component={LegalInfo} exact={true} />
          <Route path="/about" component={About} exact={true} />
          <Route path="/termsAndConditions" component={TermsAndConditions} exact={true} />
          <Route path="/profile/edit/:id" component={VCardView} exact={true} />
          <Route path="/profile" component={VCardProfiles} exact={true} />
          <Redirect exact path="/" to="/profile" />
        </IonRouterOutlet>

        <IonTabBar slot="bottom" color="secondary">
          <IonTabButton tab="profile" href="/profile" className="footer-button">
            <FontAwesomeIcon  className="fa fa-lg test2" icon={faIdCard} />
            <IonLabel>{translate(i18n, 'Profiles')}</IonLabel>
          </IonTabButton>
          <IonTabButton tab="scan" href="/scan" className="footer-button">
            <FontAwesomeIcon className="fa fa-lg" icon={faBarcodeRead} />
            <IonLabel>{translate(i18n, 'Scan')}</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonPage>
  );
};
