import React from 'react';
import { IonHeader, IonToolbar, IonContent, IonPage, IonButtons, IonMenuButton, IonTitle, IonTextarea } from '@ionic/react';
import IvCardTranslations from '../i18n/IvCardTranslations';
import { useIntl } from 'react-intl';
import { nameof } from '../utils';

const About: React.FC = () => {
  const i18n = useIntl();

  return (
    <IonPage id="about">
      <IonHeader translucent={true}>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{i18n.formatMessage({ id: nameof<IvCardTranslations>('About') })}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen={false}>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{i18n.formatMessage({ id: nameof<IvCardTranslations>('About') })}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div>
          <IonTextarea>Eine App zum Vsitenkartenaustausch.</IonTextarea>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default About;
