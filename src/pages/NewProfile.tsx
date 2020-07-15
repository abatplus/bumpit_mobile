import React, { useEffect, useState } from 'react';
import { IonHeader, IonToolbar, IonContent, IonPage, IonButtons, IonTitle, IonTextarea, IonBackButton } from '@ionic/react';
import { useIntl } from 'react-intl';
import { nameof } from '../utils';
import { useProfileContext } from '../store/contexts/ProfileContext';
import { useParams } from 'react-router';
import IvCardTranslations from '../i18n/IvCardTranslations';
import IProfile from '../interfaces/IProfile';
import Profile from '../components/Profile';
import VCardField from '../components/VCardField';


const NewProfile: React.FC = () => {
  const i18n = useIntl();
  const { id } = useParams();
  const { profileContext } = useProfileContext();

  const getCurrentProfile = () => {
    // if (profileContext.profiles) {
    //   return profileContext.profiles.find((itm) => itm.id === id);
    // } else {
    //   return {id:"test"} as IProfile;
    // }

    return {id:"test"} as IProfile;
  };

  const currentProfile: IProfile | undefined = getCurrentProfile();

  
  return (
    <IonPage id="new_profile">

      <IonHeader translucent={true}>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>{i18n.formatMessage({ id: nameof<IvCardTranslations>('Profile_Edit') })}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen={false}>
     
      <Profile profile={currentProfile} />
      </IonContent>
    </IonPage>
  );
};

export default NewProfile;
