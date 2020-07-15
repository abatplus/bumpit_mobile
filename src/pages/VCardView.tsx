import React from 'react';
import {
  IonHeader,
  IonToolbar,
  IonContent,
  IonPage,
  IonButtons,
  IonList,
  IonMenuButton,
  IonTitle,
  IonFooter,
  IonButton,
  IonIcon,
  IonLabel,
  IonBackButton,
} from '@ionic/react';
import './VCardView.css';
import VCardField from '../components/VCardField';
import { qrCode, share } from 'ionicons/icons';
import { useHistory } from 'react-router';
import { useIntl } from 'react-intl';
import { nameof } from '../utils';
import IvCardTranslations from '../i18n/IvCardTranslations';

const VCardView: React.FC = () => {
  const history = useHistory();
  const i18n = useIntl();

  const onClickShowQr = () => {
    history.push('/qrcode');
  };

  const onClickSwap = () => {
    history.push('/swap');
  };

  return (
    <IonPage id="vcard">
      <IonHeader translucent={true}>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
            <IonBackButton />
          </IonButtons>
          <IonTitle>{i18n.formatMessage({ id: nameof<IvCardTranslations>('Card') })}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{i18n.formatMessage({ id: nameof<IvCardTranslations>('Card') })}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList>
          <VCardField name="name" label="Name" />
          <VCardField name="nickname" label="Nickname" />
          <VCardField name="tel" label="Handy" />
          <VCardField name="companyTel" label="Firmenhandy" />
          <VCardField name="email" label="eMail" />
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
            <IonLabel className="footer-button-text">{i18n.formatMessage({ id: nameof<IvCardTranslations>('Swap') })}</IonLabel>
          </IonButton>
        </IonButtons>
      </IonFooter>
    </IonPage>
  );
};

export default VCardView;
