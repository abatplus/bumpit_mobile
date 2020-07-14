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
          <VCardField name="company" label={i18n.formatMessage({ id: nameof<IvCardTranslations>('Company') })} />
          <VCardField name="website" label={i18n.formatMessage({ id: nameof<IvCardTranslations>('Website') })} />
          <VCardField name="street" label={i18n.formatMessage({ id: nameof<IvCardTranslations>('Street') })} />
          <VCardField name="zipCode" label={i18n.formatMessage({ id: nameof<IvCardTranslations>('ZipCode') })} />
          <VCardField name="location" label={i18n.formatMessage({ id: nameof<IvCardTranslations>('Location') })} />
          <VCardField name="country" label={i18n.formatMessage({ id: nameof<IvCardTranslations>('Country') })} />
          <VCardField name="name" label={i18n.formatMessage({ id: nameof<IvCardTranslations>('Name') })} />
          <VCardField name="position" label={i18n.formatMessage({ id: nameof<IvCardTranslations>('Position') })} />
          <VCardField name="phone" label={i18n.formatMessage({ id: nameof<IvCardTranslations>('Phone') })} />
          <VCardField name="fax" label={i18n.formatMessage({ id: nameof<IvCardTranslations>('Fax') })} />
          <VCardField name="email" label={i18n.formatMessage({ id: nameof<IvCardTranslations>('Email') })} />
        </IonList>
      </IonContent>

      <IonFooter>
        <IonButtons className="footer-buttons">
          <IonButton color="primary" fill="outline" className="footer-button" onClick={onClickShowQr}>
            <IonIcon icon={qrCode} />
            <IonLabel className="footer-button-text">{i18n.formatMessage({ id: nameof<IvCardTranslations>('QR_code') })}</IonLabel>
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
