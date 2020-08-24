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
    IonLabel,
    IonBackButton,
    IonToast,
    IonItem,
} from '@ionic/react';
import './VCardView.css';
import { faQrcode, faExchange } from '@fortawesome/pro-solid-svg-icons';
import { faTrash } from '@fortawesome/pro-duotone-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useHistory, useParams } from 'react-router';
import { useIntl } from 'react-intl';
import { translate } from '../utils';
import { useProfileContext } from '../store/contexts/ProfileContext';
import IProfile from '../interfaces/IProfile';
import Profile from '../components/Profile';
import * as Actions from '../store/actions/actions';

const VCardView: React.FC = () => {
    const history = useHistory();
    const i18n = useIntl();

    const { id } = useParams();
    const { profileContext, dispatchProfileContext } = useProfileContext();
    const [showToast, setShowToast] = useState(false);

    const getCurrentProfile = () => {
        if (profileContext.profiles) {
            return profileContext.profiles.find((itm) => itm.id === id);
        } else {
            return undefined;
        }
    };

    const deleteProfile = () => {
        if (currentProfile) {
            dispatchProfileContext(Actions.Profile.removeProfile(currentProfile.id));
            history.push('/profile');
        }
    };

    const currentProfile: IProfile | undefined = getCurrentProfile();

    const onClickShowQr = () => {
        history.push('/qrcode/' + currentProfile?.id);
    };

    const onClickSwap = () => {
        if (!currentProfile?.vCard.name) {
            setShowToast(true);
        } else {
            history.push('/swap/' + currentProfile?.id);
        }
    };

    return (
        <IonPage>
            <IonHeader translucent={true}>
                <IonToolbar color='primary'>
                    <IonButtons slot='start'>
                        <IonBackButton />
                    </IonButtons>
                    <IonTitle>{translate(i18n, 'My_Data') + ' - ' + currentProfile?.name}</IonTitle>
                    <IonButtons slot='end'>
                        <IonButton onClick={deleteProfile}>
                            <FontAwesomeIcon className='fa fa-lg' icon={faTrash} />
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>

            <IonContent>
                <Profile profile={currentProfile} />
            </IonContent>

            <IonFooter>
                <IonItem>
                    <IonButton className='footer-button' onClick={onClickShowQr} title={translate(i18n, 'QR_code')}>
                        <FontAwesomeIcon className='fa fa-lg' icon={faQrcode} />
                        <IonLabel className='footer-button-text'>{translate(i18n, 'QR_code')}</IonLabel>
                    </IonButton>

                    <IonButton className='footer-button' onClick={onClickSwap} title={translate(i18n, 'Swap')}>
                        <FontAwesomeIcon className='fa fa-lg' icon={faExchange} />
                        <IonLabel className='footer-button-text'>{translate(i18n, 'Swap')}</IonLabel>
                    </IonButton>
                </IonItem>
            </IonFooter>

            <IonToast
                isOpen={showToast}
                onDidDismiss={() => setShowToast(false)}
                message={translate(i18n, 'Deny_Swap_Missing_Name_In_Profile')}
                duration={2000}
            />
        </IonPage>
    );
};

export default VCardView;
