import React from 'react';
import { IonHeader, IonToolbar, IonContent, IonPage, IonButtons, IonMenuButton, IonTitle, IonTextarea } from '@ionic/react';
import { useIntl } from 'react-intl';
import { translate } from '../utils';

const TermsAndConditions: React.FC = () => {
  const i18n = useIntl();

  return (
    <IonPage id="termsAndConditions">
      <IonHeader translucent={true}>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{translate(i18n, 'Terms_and_conditions')}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen={false}>
        <div>
          <IonTextarea>AGB</IonTextarea>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default TermsAndConditions;
