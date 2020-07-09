import React, {   } from 'react';
import { IonHeader, IonToolbar, IonContent, IonPage, IonButtons,IonList,IonMenuButton,IonTitle,} from '@ionic/react';

import './VCardView.css';
import VCardField from '../components/VCardField2';

const VCardView: React.FC = () => {
  
  return (

    <IonPage id="vcard">
      <IonHeader translucent={true}>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Business Card</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen={true}>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Business Card</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList>
          <VCardField name="name" label="Name"/>
          <VCardField name="nickname" label="Nickname"/>
          <VCardField name="tel" label="Handy"/>
          <VCardField name="companyTel" label="Firmenhandy"/>
          <VCardField name="email" label="eMail"/>       
        </IonList>
      </IonContent>
    </IonPage>   
  );
};
 
export default VCardView;