import React, { useEffect } from 'react';
import { IonHeader, IonToolbar, IonContent, IonPage, IonButtons, IonList, IonTitle, IonLoading, IonBackButton, IonMenuButton } from '@ionic/react';
import VCardField from '../components/VCardField';
import { useAppContext } from '../store/contexts/AppContext';
import * as Actions from '../store/actions/actions';
import { RouteComponentProps } from 'react-router';

const SwapView: React.FC<RouteComponentProps> = (props) => {
  const { appContext, dispatchAppContext } = useAppContext();

  useEffect(() => {
    dispatchAppContext(Actions.App.setLoading(true));
    setTimeout(() => {
      dispatchAppContext(Actions.App.setLoading(false));
    }, 2000);
  }, [dispatchAppContext]);

  const currentProfileId = props.location.pathname.split('/').reverse()[0];

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
