import React from 'react';
import { IonHeader, IonToolbar, IonContent, IonPage, IonButtons, IonMenuButton, IonTitle, IonCard } from '@ionic/react';
import { useIntl } from 'react-intl';
import { translate, convertMarkdownFile } from '../utils';
import aboutFile from "../docs/Impressum.md";
import ReactMarkdown from 'react-markdown';

const About: React.FC = () => {
  const i18n = useIntl();
  const [about, setAbout] = React.useState('');

  convertMarkdownFile(aboutFile).then(setAbout);

  return <IonPage id="about">
    <IonHeader translucent={true}>
      <IonToolbar color="primary">
        <IonButtons slot="start">
          <IonMenuButton />
        </IonButtons>
        <IonTitle>{translate(i18n, 'About')}</IonTitle>
      </IonToolbar>
    </IonHeader>

    <IonContent fullscreen={false}>
      <IonHeader collapse="condense">
       <IonToolbar color="primary">
          <IonTitle size="large">{translate(i18n, 'About')}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonCard>
        <ReactMarkdown source={about} />
      </IonCard>
    </IonContent>
  </IonPage>;
};

export default About;
