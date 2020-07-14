import React, { useEffect } from 'react';
import { IonReactRouter } from '@ionic/react-router';
import { IonSplitPane, IonRouterOutlet } from '@ionic/react';
import { Route } from 'react-router';
import MainTabs from '../pages/MainTabs';
import { getAppData } from '../store/dataApi';
import * as Actions from '../store/actions/actions';
import Menu from './Menu';
import { useProfileContext } from '../store/contexts/ProfileContext';

const AppRouter: React.FC = () => {
  const { dispatchProfileContext } = useProfileContext();

  // initialize vcard data at first
  useEffect(() => {
    getAppData().then((profiles) => {
      dispatchProfileContext(Actions.Profile.setProfiles(profiles));
    });
  }, [dispatchProfileContext]);

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
