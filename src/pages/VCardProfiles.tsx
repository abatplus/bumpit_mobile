import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import { useIntl } from 'react-intl';
import { translate } from '../utils';
import IProfile from '../interfaces/IProfile';
import { useProfileContext } from '../store/contexts/ProfileContext';
import ProfileCard from '../components/ProfileCard';
import * as Actions from '../store/actions/actions';
import { useAppContext } from '../store/contexts/AppContext';
import { getProfileData, getEmptyProfile } from '../store/dataApi';
import { v4 as uuidv4 } from 'uuid';
import { IonPage, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonBackButton, IonTitle, IonContent, IonFab, IonIcon, IonFabButton } from '@ionic/react';
import { addCircle } from 'ionicons/icons';

const renderProfiles = (profiles: IProfile[]) => {
  return profiles.map((profile: IProfile) => <ProfileCard profile={profile} key={profile.id} />);
};

export const VCardProfiles: React.FC = () => {
  const history = useHistory();
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

  function addNewProfile() {
    let newProfile: IProfile = getEmptyProfile(uuidv4());
    newProfile.name = translate(i18n, 'Set_Profile_Name');
    dispatchProfileContext(Actions.Profile.addNewProfile(newProfile));
    history.push('/profile/edit/' + newProfile.id);
  }

  return (
    <IonPage>
      <IonHeader translucent={true}>
        <IonToolbar>
          <IonButtons slot='start'>
            <IonMenuButton />
            <IonBackButton />
          </IonButtons>
          <IonTitle>{translate(i18n, 'Profiles')}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent slot={'fixed'}>
        {profileContext.profiles && profileContext.profiles.length > 0 ? (
          <div>{renderProfiles(profileContext.profiles)}</div>
        ) : (
            <React.Fragment />
          )}
        <IonFab vertical={'bottom'} horizontal={'end'} slot={'fixed'}>
          <IonFabButton
            onClick={() => addNewProfile()}>
            <IonIcon icon={addCircle} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};