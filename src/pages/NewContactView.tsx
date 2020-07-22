import React, { useState } from 'react';
import {
  IonHeader,
  IonToolbar,
  IonContent,
  IonPage,
  IonButtons,
  IonTitle,
  IonFooter,
  IonButton,
  IonIcon,
  IonLabel,
  IonMenuButton,
  IonToast,
} from '@ionic/react';
import './VCardView.css';
import { save } from 'ionicons/icons';
import { useHistory, useLocation } from 'react-router';
import { useIntl } from 'react-intl';
import { translate } from '../utils';
import { IVCard } from '../interfaces/IVCard';
import VCardField from '../components/VCardField';
import IContactApi from '../interfaces/IContactApi';
import ContactApi from '../contacts/ContactApi';

const NewContactView: React.FC = () => {
  const history = useHistory();
  const i18n = useIntl();
  const vCard: IVCard = useLocation().state as IVCard;
  const [showSavedMessage, setShowSavedMessage] = useState<boolean>(false);
  const contactApi: IContactApi = new ContactApi();

  const onSaveContact = () => {
    //Save contact to contacts
    let createdContact = contactApi.createContact(vCard);
    if (createdContact) {
      createdContact
        .then(() => {
          setShowSavedMessage(true);
        })
        .catch((error) => {
          window.alert(error);
        });
    }
    else {
      window.alert("no contact created");
    }
    history.replace('/profile');
  };

  return (
    <IonPage>
      <IonHeader translucent={true}>
        <IonToolbar>
          <IonButtons slot='start'>
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{translate(i18n, 'New_contact')}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <VCardField
          key={'name'}
          name={'name'}
          label={translate(i18n, 'Name')}
          value={vCard?.name}
          isReadonly={true}
        />
        <VCardField
          key={'position'}
          name={'position'}
          label={translate(i18n, 'Position')}
          value={vCard?.position}
          isReadonly={true}
        />
        <VCardField
          key={'phone'}
          name={'phone'}
          label={translate(i18n, 'Phone')}
          value={vCard?.phone}
          isReadonly={true}
        />
        <VCardField
          key={'fax'}
          name={'fax'}
          label={translate(i18n, 'Fax')}
          value={vCard?.fax}
          isReadonly={true}
        />
        <VCardField
          key={'email'}
          name={'email'}
          label={translate(i18n, 'Email')}
          value={vCard?.email}
          isReadonly={true}
        />
        <VCardField
          key={'company'}
          name={'company'}
          label={translate(i18n, 'Company')}
          value={vCard?.company}
          isReadonly={true}
        />
        <VCardField
          key={'website'}
          name={'website'}
          label={translate(i18n, 'Website')}
          value={vCard?.website}
          isReadonly={true}
        />
        <VCardField
          key={'street'}
          name={'street'}
          label={translate(i18n, 'Street')}
          value={vCard?.street}
          isReadonly={true}
        />
        <VCardField
          key={'zipCode'}
          name={'zipCode'}
          label={translate(i18n, 'ZipCode')}
          value={vCard?.zipCode}
          isReadonly={true}
        />
        <VCardField
          key={'location'}
          name={'location'}
          label={translate(i18n, 'Location')}
          value={vCard?.location}
          isReadonly={true}
        />
        <VCardField
          key={'country'}
          name={'country'}
          label={translate(i18n, 'Country')}
          value={vCard?.country}
          isReadonly={true}
        />
      </IonContent>

      <IonFooter>
        <IonToast
          isOpen={showSavedMessage}
          onDidDismiss={() => setShowSavedMessage(false)}
          message={translate(i18n, 'Contact_saved')}
          duration={1000}
        />

        <IonButtons className='footer-buttons'>
          <IonButton color='primary' fill='outline' className='footer-button' onClick={onSaveContact}>
            <IonIcon icon={save} />
            <IonLabel className='footer-button-text'>
              {translate(i18n, 'Save_contact')}
            </IonLabel>
          </IonButton>
        </IonButtons>
      </IonFooter>
    </IonPage>
  );
};

export default NewContactView;
