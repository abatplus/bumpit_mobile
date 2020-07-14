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
import { useHistory, useLocation } from 'react-router';
import { useIntl } from 'react-intl';
import { nameof, getProfileId } from '../utils';
import IvCardTranslations from '../i18n/IvCardTranslations';
import { useProfileContext } from '../store/contexts/ProfileContext';
import * as Actions from '../store/actions/actions';
import { IVCard } from '../interfaces/IVCard';

const VCardView: React.FC = () => {
  const history = useHistory();
  const i18n = useIntl();

  const location = useLocation();
  const { profileContext, dispatchProfileContext } = useProfileContext();

  const onClickShowQr = () => {
    history.push('/qrcode');
  };

  const onClickSwap = () => {
    history.push('/swap');
  };

  const currentProfile = profileContext.profiles.find((itm) => itm.id === getProfileId(location.pathname));

  const updateProfile = (inputFieldName: keyof IVCard) => (event: CustomEvent) => {
    if (currentProfile && currentProfile.id) {
      dispatchProfileContext(Actions.Profile.setProfileVCardDataField(currentProfile?.id, inputFieldName, event.detail.value));
    }
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
          <VCardField
            key={'company'}
            name={'company'}
            label={i18n.formatMessage({ id: nameof<IvCardTranslations>('Company') })}
            value={currentProfile?.vcard?.company}
            onChange={updateProfile('company')}
          />
          <VCardField
            key={'website'}
            name={'website'}
            label={i18n.formatMessage({ id: nameof<IvCardTranslations>('Website') })}
            value={currentProfile?.vcard?.website}
            onChange={updateProfile('website')}
          />
          <VCardField
            key={'street'}
            name={'street'}
            label={i18n.formatMessage({ id: nameof<IvCardTranslations>('Street') })}
            value={currentProfile?.vcard?.street}
            onChange={updateProfile('street')}
          />
          <VCardField
            key={'zipCode'}
            name={'zipCode'}
            label={i18n.formatMessage({ id: nameof<IvCardTranslations>('ZipCode') })}
            value={currentProfile?.vcard?.zipCode}
            onChange={updateProfile('zipCode')}
          />
          <VCardField
            key={'location'}
            name={'location'}
            label={i18n.formatMessage({ id: nameof<IvCardTranslations>('Location') })}
            value={currentProfile?.vcard?.location}
            onChange={updateProfile('location')}
          />
          <VCardField
            key={'country'}
            name={'country'}
            label={i18n.formatMessage({ id: nameof<IvCardTranslations>('Country') })}
            value={currentProfile?.vcard?.country}
            onChange={updateProfile('country')}
          />
          <VCardField
            key={'name'}
            name={'name'}
            label={i18n.formatMessage({ id: nameof<IvCardTranslations>('Name') })}
            value={currentProfile?.vcard?.name}
            onChange={updateProfile('name')}
          />
          <VCardField
            key={'position'}
            name={'position'}
            label={i18n.formatMessage({ id: nameof<IvCardTranslations>('Position') })}
            value={currentProfile?.vcard?.position}
            onChange={updateProfile('position')}
          />
          <VCardField
            key={'phone'}
            name={'phone'}
            label={i18n.formatMessage({ id: nameof<IvCardTranslations>('Phone') })}
            value={currentProfile?.vcard?.phone}
            onChange={updateProfile('phone')}
          />
          <VCardField
            key={'fax'}
            name={'fax'}
            label={i18n.formatMessage({ id: nameof<IvCardTranslations>('Fax') })}
            value={currentProfile?.vcard?.fax}
            onChange={updateProfile('fax')}
          />
          <VCardField
            key={'email'}
            name={'email'}
            label={i18n.formatMessage({ id: nameof<IvCardTranslations>('Email') })}
            value={currentProfile?.vcard?.email}
            onChange={updateProfile('email')}
          />
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
