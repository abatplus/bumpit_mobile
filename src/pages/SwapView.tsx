import React, { useEffect } from 'react';
import { IonHeader, IonToolbar, IonContent, IonPage, IonButtons, IonList, IonTitle, IonLoading, IonBackButton, IonMenuButton } from '@ionic/react';
import VCardField from '../components/VCardField';
import { useAppContext } from '../store/contexts/AppContext';
import * as Actions from '../store/actions/actions';
import { useLocation } from 'react-router';
import { getProfileId } from '../utils';

const SwapView: React.FC = () => {
  const { appContext, dispatchAppContext } = useAppContext();
  const location = useLocation();

  useEffect(() => {
    dispatchAppContext(Actions.App.setLoading(true));
    setTimeout(() => {
      dispatchAppContext(Actions.App.setLoading(false));
    }, 2000);
  }, [dispatchAppContext]);

  const currentProfileId = getProfileId(location.pathname);

  return (
    <IonPage id="vcard">
      <IonHeader translucent={true}>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>Exchange card</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen={true}>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            <IonTitle size="large">Exchange card</IonTitle>
          </IonToolbar>
        </IonHeader>
        {appContext.isLoading ? <IonLoading spinner="lines" isOpen={true} /> : ''}

        {!appContext.isLoading && (
          <IonList>
            <VCardField name="name" label="Name" profileId={currentProfileId} />
          </IonList>
        )}
      </IonContent>
    </IonPage>
  );
};

export default SwapView;
