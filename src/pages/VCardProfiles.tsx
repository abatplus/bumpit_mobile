import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent, IonFab, IonFabButton, IonIcon } from '@ionic/react';
import { useIntl } from 'react-intl';
import { nameof } from '../utils';
import IvCardTranslations from '../i18n/IvCardTranslations';
import ProfileCard from './ProfileCard';
import IProfile from '../interfaces/IProfile';
import { useProfileContext } from '../store/contexts/ProfileContext';
import { addCircle } from 'ionicons/icons';

const renderProfile = (profiles: IProfile[]) =>
  profiles.map((profile: IProfile) => {
    return <ProfileCard name={profile.name} id={profile.id} key={profile.id} />;
  });

const VCardProfiles: React.FC = () => {
  const i18n = useIntl();

  const profiles = useProfileContext();

  return (
    <IonPage id="vcard">
      <IonHeader translucent={true}>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>{i18n.formatMessage({ id: nameof<IvCardTranslations>('Profiles') })}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent slot={'fixed'}>
        {renderProfile(profiles.profileContext.profiles)}

        <IonFab vertical={'bottom'} horizontal={'end'} slot={'fixed'}>
          <IonFabButton
            onClick={() => {
              console.log('Add a new profile');
            }}
          >
            <IonIcon
              icon={addCircle}
              onClick={() => {
                console.log('Add a new Profile icon click');
              }}
            />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default VCardProfiles;
