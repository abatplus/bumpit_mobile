import React from 'react';
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
    IonBackButton,
    IonItem,
} from '@ionic/react';
import './VCardView.css';
import { qrCode, share, trash } from 'ionicons/icons';
import { faQrcode, faExchange } from '@fortawesome/pro-solid-svg-icons';
import { faTrash } from '@fortawesome/pro-duotone-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useHistory, useParams } from 'react-router';
import { useIntl } from 'react-intl';
import { nameof } from '../utils';
import IvCardTranslations from '../i18n/IvCardTranslations';
import { useProfileContext } from '../store/contexts/ProfileContext';
import IProfile from '../interfaces/IProfile';
import Profile from '../components/Profile';
import * as Actions from '../store/actions/actions';

const VCardView: React.FC = () => {
    const history = useHistory();
    const i18n = useIntl();

    const { id } = useParams();
    const { profileContext, dispatchProfileContext } = useProfileContext();

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
        history.push('/swap/' + currentProfile?.id);
    };

    return (
        <IonPage>
            <IonHeader translucent={true}>
                <IonToolbar>
                    <IonButtons slot='start'>
                        <IonBackButton />
                    </IonButtons>
                    <IonTitle>
                        {i18n.formatMessage({ id: nameof<IvCardTranslations>('My_Data') }) +
                            ' - ' +
                            currentProfile?.name}
                    </IonTitle>
                    <IonButtons slot='end'>
                        <IonButton onClick={deleteProfile}>
                            {/* <IonIcon icon={trash} /> */}
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
                    {/* <IonButtons className="footer-buttons">  */}
                    {/* <IonButtons> */}

                    <IonButton
                    className='footer-button'
                        onClick={onClickShowQr}
                        title={i18n.formatMessage({ id: nameof<IvCardTranslations>('QR_code') })}>   
                        <FontAwesomeIcon className='fa fa-lg' icon={faQrcode} />
                        <IonLabel className='footer-button-text'>
                            {i18n.formatMessage({ id: nameof<IvCardTranslations>('QR_code') })}
                        </IonLabel>
                    </IonButton>

                    <IonButton
                    className='footer-button'
                        
                        onClick={onClickSwap}
                        title={i18n.formatMessage({ id: nameof<IvCardTranslations>('Swap') })}>
                        <FontAwesomeIcon className='fa fa-lg' icon={faExchange} />
                        <IonLabel className='footer-button-text'>
                            {i18n.formatMessage({ id: nameof<IvCardTranslations>('Swap') })}
                        </IonLabel>
                    </IonButton>

                    {/* <IonButton color='primary' fill='outline' className='footer-button' onClick={onClickShowQr}>
                        <FontAwesomeIcon className='fa fa-lg' icon={faQrcode} />
                        <IonLabel className='footer-button-text'>
                            {i18n.formatMessage({ id: nameof<IvCardTranslations>('QR_code') })}
                        </IonLabel>
                    </IonButton>
                    <IonButton color='primary' fill='outline' className='footer-button' onClick={onClickSwap}>
                        <FontAwesomeIcon className='fa fa-lg' icon={faExchange} />
                        <IonLabel className='footer-button-text'>
                            {i18n.formatMessage({ id: nameof<IvCardTranslations>('Swap') })}
                        </IonLabel>
                    </IonButton> */}

                    {/* </IonButtons> */}
                </IonItem>
            </IonFooter>
        </IonPage>
    );
};

export default VCardView;
