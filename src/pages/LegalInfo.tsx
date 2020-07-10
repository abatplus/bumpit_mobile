import React, { } from 'react';
import { IonHeader, IonToolbar, IonContent, IonPage, IonButtons, IonMenuButton, IonTitle, IonTextarea } from '@ionic/react';

const LegalInfo: React.FC = () => {

 

 

  return (
    <IonPage id="legal">
      <IonHeader translucent={true}>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Legal Information</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen={false}>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Legal Information</IonTitle>
          </IonToolbar>
        </IonHeader>

        <div >
          <IonTextarea> Alles hier ist völlig legal.</IonTextarea>
        </div>

      </IonContent>
    </IonPage>
  );
};

export default LegalInfo;