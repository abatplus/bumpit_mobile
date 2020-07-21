import React, {  useState } from 'react';
import { IonHeader, IonToolbar, IonContent, IonPage, IonButtons, IonTitle, IonFooter, IonButton, IonIcon, IonLabel, IonBackButton, IonMenuButton, IonToast } from '@ionic/react';
import './VCardView.css';
import {  save } from 'ionicons/icons';
import { useHistory,  useLocation } from 'react-router';
import { useIntl } from 'react-intl';
import { nameof } from '../utils';
import IvCardTranslations from '../i18n/IvCardTranslations';
import { useProfileContext } from '../store/contexts/ProfileContext';
import { IVCard } from '../interfaces/IVCard';
import VCardField from '../components/VCardField';
import Profile from '../components/Profile';
import * as Actions from '../store/actions/actions';


const NewContactView: React.FC = () => {
  const history = useHistory();
  const i18n = useIntl();
  const vCard : IVCard =  useLocation().state as IVCard 
  const [showSavedMessage, setShowSavedMessage] = useState<boolean>(false);

  const onSaveContact = () => {
    //TODO save vCard to contacts
    setShowSavedMessage(true);
    history.replace("/profile");
  };

 
  return (
    <IonPage>
      <IonHeader translucent={true}>
        <IonToolbar>
          <IonButtons slot="start">
          <IonMenuButton />
          </IonButtons>
          <IonTitle>{i18n.formatMessage({ id: nameof<IvCardTranslations>('New_contact') })}</IonTitle>
      
        </IonToolbar>
      </IonHeader>

      <IonContent>
      <VCardField
        key={'name'}
        name={'name'}
        label={i18n.formatMessage({ id: nameof<IvCardTranslations>('Name') })}
        value={vCard?.name}
        isReadonly = {true}
      />
      <VCardField
        key={'position'}
        name={'position'}
        label={i18n.formatMessage({ id: nameof<IvCardTranslations>('Position') })}
        value={vCard?.position}
        isReadonly = {true}
      />
      <VCardField
        key={'phone'}
        name={'phone'}
        label={i18n.formatMessage({ id: nameof<IvCardTranslations>('Phone') })}
        value={vCard?.phone}
        isReadonly = {true}
      />
      <VCardField
        key={'fax'}
        name={'fax'}
        label={i18n.formatMessage({ id: nameof<IvCardTranslations>('Fax') })}
        value={vCard?.fax}
        isReadonly = {true}
      />
      <VCardField
        key={'email'}
        name={'email'}
        label={i18n.formatMessage({ id: nameof<IvCardTranslations>('Email') })}
        value={vCard?.email}
        isReadonly = {true}
      />
         <VCardField
        key={'company'}
        name={'company'}
        label={i18n.formatMessage({ id: nameof<IvCardTranslations>('Company') })}
        value={vCard?.company}
       
      />
      <VCardField
        key={'website'}
        name={'website'}
        label={i18n.formatMessage({ id: nameof<IvCardTranslations>('Website') })}
        value={vCard?.website}
        
      />
      <VCardField
        key={'street'}
        name={'street'}
        label={i18n.formatMessage({ id: nameof<IvCardTranslations>('Street') })}
        value={vCard?.street}
        
      />
      <VCardField
        key={'zipCode'}
        name={'zipCode'}
        label={i18n.formatMessage({ id: nameof<IvCardTranslations>('ZipCode') })}
        value={vCard?.zipCode}
        
      />
      <VCardField
        key={'location'}
        name={'location'}
        label={i18n.formatMessage({ id: nameof<IvCardTranslations>('Location') })}
        value={vCard?.location}
        
      />
      <VCardField
        key={'country'}
        name={'country'}
        label={i18n.formatMessage({ id: nameof<IvCardTranslations>('Country') })}
        value={vCard?.country}
       
      />
      </IonContent>

      <IonFooter>
      <IonToast
        isOpen={showSavedMessage}
        onDidDismiss={() => setShowSavedMessage(false)}
        message={i18n.formatMessage({ id: nameof<IvCardTranslations>('Contact_saved') })}
        duration={1000}
      />

        <IonButtons className="footer-buttons">
          <IonButton color="primary" fill="outline" className="footer-button" onClick={onSaveContact}>
            <IonIcon icon={save} />
            <IonLabel className="footer-button-text">{i18n.formatMessage({ id: nameof<IvCardTranslations>('Save_contact') })}</IonLabel>
          </IonButton>
        
        </IonButtons>
      </IonFooter>
    </IonPage>
  );
};

export default NewContactView;

