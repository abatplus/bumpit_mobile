import React, { useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, IonSplitPane } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

//import Menu from './components/Menu';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import MainTabs from './pages/MainTabs';
import { connect } from './data/connect';
import { AppContextProvider } from './data/AppContext';
import { loadCardData } from './data/card/card_actions';


const App: React.FC = () => {
  return (
    <AppContextProvider>
      <IonicAppConnected />
    </AppContextProvider>
  );
};

interface StateProps {
  
}

interface DispatchProps {
  loadCardData: typeof loadCardData;
 
}

interface IonicAppProps extends StateProps, DispatchProps { }

const IonicApp: React.FC<IonicAppProps> = ({ loadCardData }) => {

  useEffect(() => {
    loadCardData();
    // eslint-disable-next-line
  }, []);

  return (
  
        <IonApp>
          <IonReactRouter>
            <IonSplitPane contentId="main">
              <IonRouterOutlet id="main">
                <Route path="/tabs" component={MainTabs} />
                <Route path="/" render={() => <Redirect to="/tabs/vcard" />} exact />
              </IonRouterOutlet>
            </IonSplitPane>
          </IonReactRouter>
        </IonApp>
      
  )
}

export default App;

const IonicAppConnected = connect<{}, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
  }),
  mapDispatchToProps: { loadCardData },
  component: IonicApp
});

