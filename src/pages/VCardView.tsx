import React, { useState } from 'react';
import { IonHeader, IonToolbar, IonContent, IonPage, IonButtons, IonTitle, IonFooter, IonButton, IonIcon, IonLabel, IonBackButton, IonToast } from '@ionic/react';
import './VCardView.css';
import { qrCode, share, trash } from 'ionicons/icons';
import { useHistory, useParams } from 'react-router';
import { useIntl } from 'react-intl';
import { nameof } from '../utils';
import IvCardTranslations from '../i18n/IvCardTranslations';
import { useProfileContext } from '../store/contexts/ProfileContext';
import IProfile from '../interfaces/IProfile';
import Profile from '../components/Profile';
import * as Actions from '../store/actions/actions';

const VCardView: React.FC = () => {
  const history = useHistory();
  const i18n = useIntl();

  const { id } = useParams();
  const { profileContext, dispatchProfileContext } = useProfileContext();
  const [showToast, setShowToast] = useState(false);

 
  const getCurrentProfile = () => {
    if (profileContext.profiles) {
      return profileContext.profiles.find((itm) => itm.id === id);
    } else {
      return undefined;
    }
  };

  const deleteProfile = () => {
    if (currentProfile) {
      dispatchProfileContext(Actions.Profile.removeProfile(currentProfile.id));
      history.push('/profile');
    }
  };

  const currentProfile: IProfile | undefined = getCurrentProfile();

  const onClickShowQr = () => {
    history.push('/qrcode/'+currentProfile?.id);
  };

  const onClickSwap = () => {
    if (!currentProfile?.vCard.name) {
        setShowToast(true);
    } else {
      history.push('/swap/'+currentProfile?.id);
    }
};


  return (
    <IonPage>
      <IonHeader translucent={true}>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>{i18n.formatMessage({ id: nameof<IvCardTranslations>('My_Data') })+" - "+currentProfile?.name}</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={deleteProfile}>
              <IonIcon icon={trash} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <Profile profile={currentProfile} />
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
      <IonToast
        isOpen={showToast}
        onDidDismiss={() => setShowToast(false)}
        message="Please provide your name in the profile before swapping."
        duration={2000}
      />
    </IonPage>
  );
};

export default VCardView;
