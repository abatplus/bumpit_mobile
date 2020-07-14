import React, { useEffect } from 'react';
import { IonHeader, IonToolbar, IonContent, IonPage, IonButtons, IonList, IonTitle, IonLoading, IonBackButton, IonMenuButton, IonMenu } from '@ionic/react';
import { useAppContext } from '../store/contexts/AppContext';
import * as Actions from '../store/actions/actions';

const SwapView: React.FC = () => {
  const { appContext, dispatchAppContext } = useAppContext();

  useEffect(() => {
    dispatchAppContext(Actions.App.setLoading(true));
    setTimeout(() => {
      dispatchAppContext(Actions.App.setLoading(false));
    }, 2000);
  }, [dispatchAppContext]);

  return (
    <IonPage id="vcard">
      <IonHeader translucent={true}>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
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

        {!appContext.isLoading && <IonList></IonList>}
      </IonContent>
    </IonPage>
  );
};

export default SwapView;
