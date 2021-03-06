import React from 'react';
import { IonHeader, IonToolbar, IonContent, IonPage, IonButtons, IonMenuButton, IonTitle, IonCard } from '@ionic/react';
import { useIntl } from 'react-intl';
import { convertMarkdownFile, translate } from '../utils';
import ReactMarkdown from 'react-markdown';
import licenceFile from "../docs/LICENCE.md";
import thirdPartyFile from "../docs/ThirdPartyNotice.md";

export const LegalInfo: React.FC = () => {
  const [licence, setLicence] = React.useState('');
  const [thirdParty, setThirdParty] = React.useState('');

  const i18n = useIntl();

  convertMarkdownFile(licenceFile).then(setLicence);
  convertMarkdownFile(thirdPartyFile).then(setThirdParty);

  return (
    <IonPage id="legal">
      <IonHeader translucent={true}>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{translate(i18n, 'Legal_Information')}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen={false}>
        <IonHeader collapse="condense">
          <IonToolbar color="primary">
            <IonTitle size="large">{translate(i18n, 'Legal_Information')}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonCard>
          <ReactMarkdown source={licence} />
        </IonCard>
        <IonCard>
          <ReactMarkdown source={thirdParty} />
        </IonCard>
      </IonContent>
    </IonPage >
  );
};

export default LegalInfo;