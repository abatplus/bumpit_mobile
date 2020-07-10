import React, { } from 'react';
import { IonHeader, IonToolbar, IonContent, IonPage, IonButtons, IonMenuButton, IonTitle, IonTextarea } from '@ionic/react';

const About: React.FC = () => {

 

 

  return (
    <IonPage id="about">
      <IonHeader translucent={true}>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>About</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen={false}>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">About</IonTitle>
          </IonToolbar>
        </IonHeader>

        <div >
          <IonTextarea> Eine App zum Vsitenkartenaustausch.</IonTextarea>
        </div>

      </IonContent>
    </IonPage>
  );
};

export default About;