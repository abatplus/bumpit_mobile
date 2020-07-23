import React from 'react';
import { IonHeader, IonToolbar, IonContent, IonPage, IonButtons, IonMenuButton, IonTitle, IonTextarea, IonCard } from '@ionic/react';
import { useIntl } from 'react-intl';
import { translate, convertMarkdownFile } from '../utils';
import termsFile from "../docs/Nutzungsbedingungen.md";
import ReactMarkdown from 'react-markdown';

const TermsAndConditions: React.FC = () => {
  const i18n = useIntl();
  const [terms, setTerms] = React.useState('');

  convertMarkdownFile(termsFile).then(setTerms);

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

        <IonCard>
          <ReactMarkdown source={terms} />
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default TermsAndConditions;
