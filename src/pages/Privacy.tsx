import React, { } from 'react';
import { IonHeader, IonToolbar, IonContent, IonPage, IonButtons, IonMenuButton, IonTitle, IonTextarea } from '@ionic/react';

const Privacy: React.FC = () => {



  return (
    <IonPage id="privacy">
      <IonHeader translucent={true}>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Privacy</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen={false}>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Privacy</IonTitle>
          </IonToolbar>
        </IonHeader>

        <div >
          <IonTextarea> Sie wollen private Daten austauschen, keine "privacy".</IonTextarea>
        </div>

      </IonContent>
    </IonPage>
  );
};

export default Privacy;