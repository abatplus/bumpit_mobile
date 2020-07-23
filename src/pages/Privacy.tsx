import React from 'react';
import { IonHeader, IonToolbar, IonContent, IonPage, IonButtons, IonMenuButton, IonTitle, IonCard } from '@ionic/react';
import { useIntl } from 'react-intl';
import { translate, convertMarkdownFile } from '../utils';
import privacyFile from "../docs/Datenschutz.md";
import ReactMarkdown from 'react-markdown';

const Privacy: React.FC = () => {
  const i18n = useIntl();
  const [privacy, setPrivacy] = React.useState('');

  convertMarkdownFile(privacyFile).then(setPrivacy);

  return (
    <IonPage id="privacy">
      <IonHeader translucent={true}>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{translate(i18n, 'Privacy_Protection')}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen={false}>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{translate(i18n, 'Privacy_Protection')}</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonCard>
          <ReactMarkdown source={privacy} />
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Privacy;
