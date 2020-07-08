import React, {  } from 'react';
import { IonHeader, IonToolbar, IonContent, IonPage, IonButtons,IonList,IonMenuButton,IonTitle, IonSpinner,} from '@ionic/react';
import './SwapView.css';
import VCardField from '../components/VCardField';
import { useAppContext } from '../store/contexts/AppContext';

const SwapView: React.FC = () => {

  const { appContext } = useAppContext();

  return (
    <IonPage id="vcard">
    <IonHeader translucent={true}>
      <IonToolbar>
        <IonButtons slot="start">
          <IonMenuButton />
        </IonButtons>
        <IonTitle>Exchange card</IonTitle>
      </IonToolbar>
    </IonHeader>

    <IonContent fullscreen={true}>
      <IonHeader collapse="condense">
        <IonToolbar>
          <IonTitle size="large">Exchange card</IonTitle>
        </IonToolbar>
      </IonHeader>
      {appContext.isLoading && <IonSpinner className = "spinner" name = "lines"/>}

      {!appContext.isLoading &&<IonList>
        <VCardField name="name" label="Name"/>
        <VCardField name="nickname" label="Nickname"/>
        <VCardField name="tel" label="Handy"/>
        <VCardField name="companyTel" label="Firmenhandy"/>
        <VCardField name="email" label="eMail"/>       
      </IonList>}
    </IonContent>
  </IonPage>   
  );
};


export default SwapView;