import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonTitle,
    IonContent,
    IonFab,
    IonFabButton,
    IonMenuButton,
} from '@ionic/react';
import { useIntl } from 'react-intl';
import { nameof } from '../utils';
import IvCardTranslations from '../i18n/IvCardTranslations';
import IProfile from '../interfaces/IProfile';
import { useProfileContext } from '../store/contexts/ProfileContext';
import { faPlus } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ProfileCard from '../components/ProfileCard';
import * as Actions from '../store/actions/actions';
import { useAppContext } from '../store/contexts/AppContext';
import { getProfileData, getEmptyProfile } from '../store/dataApi';
import { v4 as uuidv4 } from 'uuid';

const renderProfiles = (profiles: IProfile[]) => {
    return profiles.map((profile: IProfile) => <ProfileCard profile={profile} key={profile.id} />);
};

const VCardProfiles: React.FC = () => {
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
        newProfile.name = i18n.formatMessage({ id: nameof<IvCardTranslations>('Set_Profile_Name') });
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
                    <IonTitle>{i18n.formatMessage({ id: nameof<IvCardTranslations>('Profiles') })}</IonTitle>
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
                        onClick={() => {
                            addNewProfile();
                        }}>
                        <FontAwesomeIcon  className="fa fa-2x" icon={faPlus} />
                    </IonFabButton>
                </IonFab>
            </IonContent>
        </IonPage>
    );
};

export default VCardProfiles;
