import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent, IonFab, IonFabButton, IonIcon, IonMenuButton } from '@ionic/react';
import { useIntl } from 'react-intl';
import { nameof } from '../utils';
import IvCardTranslations from '../i18n/IvCardTranslations';
import IProfile from '../interfaces/IProfile';
import { useProfileContext } from '../store/contexts/ProfileContext';
import { addCircle } from 'ionicons/icons';
import ProfileCard from '../components/ProfileCard';

const renderProfiles = (profiles: IProfile[]) => {
  console.log(profiles);
  if (profiles) {
    profiles.map((profile: IProfile) => {
      return <ProfileCard name={profile.name} id={profile.id} key={profile.id} />;
    });
  }
};

const VCardProfiles: React.FC = () => {
  const i18n = useIntl();
  const { profileContext } = useProfileContext();

  return (
    <IonPage id="vcard">
      <IonHeader translucent={true}>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
            <IonBackButton />
          </IonButtons>
          <IonTitle>{i18n.formatMessage({ id: nameof<IvCardTranslations>('Profiles') })}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent slot={'fixed'}>
        {renderProfiles(profileContext.profiles)}

        <IonFab vertical={'bottom'} horizontal={'end'} slot={'fixed'}>
          <IonFabButton
            onClick={() => {
              console.log('Add a new profile');
            }}
          >
            <IonIcon icon={addCircle} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default VCardProfiles;
