import React, { useEffect } from 'react';
import { IonReactRouter } from '@ionic/react-router';
import { IonSplitPane, IonRouterOutlet } from '@ionic/react';
import { Route } from 'react-router';
import MainTabs from '../pages/MainTabs';
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

  return (
    <IonReactRouter>
      <IonSplitPane contentId="main">
        <Menu />
        <IonRouterOutlet id="main">
          <Route path="/" component={MainTabs} />
        </IonRouterOutlet>
      </IonSplitPane>
    </IonReactRouter>
  );
};

export default AppRouter;
