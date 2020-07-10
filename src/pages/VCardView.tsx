import React, {   } from 'react';
import { IonHeader, IonToolbar, IonContent, IonPage, IonButtons,IonList,IonMenuButton,IonTitle, IonFooter, IonButton, IonIcon, IonLabel,} from '@ionic/react';

import './VCardView.css';
import VCardField from '../components/VCardField';
import { qrCode, share } from 'ionicons/icons';
import { useHistory } from 'react-router';

const VCardView: React.FC = () => {
  const history = useHistory();

  const onClickShowQr = () => {
    history.push("/tabs/qrcode");
  }

  const onClickSwap = () => {
    history.push("/tabs/swap");
  }
  
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

      <IonContent >
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

      <IonFooter>
        <IonButtons className="footer-buttons">
          <IonButton color="primary" fill="outline" className="footer-button" onClick={onClickShowQr}>
            <IonIcon icon={qrCode} />
            <IonLabel className="footer-button-text">QR anzeigen</IonLabel>
          </IonButton>
          <IonButton color="primary" fill="outline" className="footer-button" onClick={onClickSwap}>
            <IonIcon icon={share} />
            <IonLabel className="footer-button-text">Swap</IonLabel>
          </IonButton>
        </IonButtons>
      </IonFooter>
      
    </IonPage>   
  );
};
 
export default VCardView;