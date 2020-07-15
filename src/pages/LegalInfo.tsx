import React from 'react';
import { IonHeader, IonToolbar, IonContent, IonPage, IonButtons, IonMenuButton, IonTitle, IonTextarea } from '@ionic/react';
import { useIntl } from 'react-intl';
import { nameof } from '../utils';
import IvCardTranslations from '../i18n/IvCardTranslations';

const LegalInfo: React.FC = () => {
  const i18n = useIntl();

  return (
    <IonPage id="legal">
      <IonHeader translucent={true}>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{i18n.formatMessage({ id: nameof<IvCardTranslations>('Legal_Information') })}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen={false}>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{i18n.formatMessage({ id: nameof<IvCardTranslations>('Legal_Information') })}</IonTitle>
          </IonToolbar>
        </IonHeader>

        <div>
          <IonTextarea> Alles hier ist völlig legal.</IonTextarea>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default LegalInfo;
