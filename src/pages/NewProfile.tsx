import React from 'react';
import { IonHeader, IonToolbar, IonContent, IonPage, IonButtons, IonTitle, IonTextarea, IonBackButton } from '@ionic/react';
import { useIntl } from 'react-intl';
import { nameof } from '../utils';
import IvCardTranslations from '../i18n/IvCardTranslations';

const NewProfile: React.FC = () => {
  const i18n = useIntl();

  return (
    <IonPage id="privacy">
      <IonHeader translucent={true}>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>{i18n.formatMessage({ id: nameof<IvCardTranslations>('Profile_Edit') })}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen={false}>
        <IonTextarea>Adding a new Profile</IonTextarea>
      </IonContent>
    </IonPage>
  );
};

export default NewProfile;
