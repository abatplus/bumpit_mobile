import React, { useEffect } from 'react';
import { IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent, IonFab, IonFabButton, IonIcon, IonMenuButton } from '@ionic/react';
import { useIntl } from 'react-intl';
import { nameof } from '../utils';
import IvCardTranslations from '../i18n/IvCardTranslations';
import IProfile from '../interfaces/IProfile';
import { useProfileContext } from '../store/contexts/ProfileContext';
import { addCircle } from 'ionicons/icons';
import ProfileCard from '../components/ProfileCard';
import * as Actions from '../store/actions/actions';
import { useAppContext } from '../store/contexts/AppContext';
import { getProfileData } from '../store/dataApi';

const renderProfiles = (profiles: IProfile[]) => {
  return profiles.map((profile: IProfile) => <ProfileCard name={profile.name} id={profile.id} key={profile.id} />);
};

const VCardProfiles: React.FC = () => {
  const i18n = useIntl();
  const { profileContext, dispatchProfileContext } = useProfileContext();
  const { dispatchAppContext } = useAppContext();

  useEffect(() => {
    dispatchAppContext(Actions.App.setLoading(true));

    const getProfiles = (async () => await getProfileData())();
    getProfiles.then((res) => dispatchProfileContext(Actions.Profile.setProfiles(res)));
    setTimeout(() => {
      dispatchAppContext(Actions.App.setLoading(false));
    }, 2000);
  }, [dispatchAppContext, dispatchProfileContext]);

  return (
    <IonPage>
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
        {profileContext.profiles && profileContext.profiles.length > 0 ? <div>{renderProfiles(profileContext.profiles)}</div> : <React.Fragment />}
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
