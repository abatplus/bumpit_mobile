import React, { useEffect } from 'react';
import { IonReactRouter } from '@ionic/react-router';
import { IonSplitPane, IonRouterOutlet } from '@ionic/react';
import { Route, Redirect } from 'react-router';
import MainTabs from '../pages/MainTabs';
import About from '../pages/About';
import Privacy from '../pages/Privacy';
import LegalInfo from '../pages/LegalInfo';
import { useVCard } from '../store/contexts/VCardContext';
import { getAppData } from '../store/dataApi';
import * as Actions from '../store/actions/actions';
import Menu from './Menu';

const AppRouter: React.FC = () => {
  const { dispatchVCard } = useVCard();

  // initialize vcard data at first
  useEffect(() => {
    getAppData().then((vCard) => {
      dispatchVCard(Actions.VCard.setVCardData(vCard));
    });
  }, [dispatchVCard]);

  // initialize vcard data at first
  useEffect(() => {
    getAppData().then((vCard) => {
      dispatchVCard(Actions.VCard.setVCardData(vCard));
    });
  }, []);

  return (
    <IonReactRouter>
      <IonSplitPane contentId="main">
        <Menu />
        <IonRouterOutlet id="main">
          <Route path="/tabs" component={MainTabs} />
          <Route path="/about" component={About} />
          <Route path="/privacy" component={Privacy} />
          <Route path="/legal" component={LegalInfo} />
          <Route path="/" render={() => <Redirect to="/tabs/vcard" />} exact />
        </IonRouterOutlet>
      </IonSplitPane>
    </IonReactRouter>
  );
};

export default AppRouter;
