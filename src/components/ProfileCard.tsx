import React, { useState } from 'react';
import {
    IonTitle,
    IonCard,
    IonCardContent,
    IonButton,
    IonGrid,
    IonRow,
    IonCol,
    IonCardHeader,
    IonToast,
    IonAvatar,
    isPlatform,
} from '@ionic/react';
import { useIntl } from 'react-intl';
import { translate } from '../utils';
import { faQrcode, faEdit, faExchange, faUser } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useHistory } from 'react-router';
import IProfile from '../interfaces/IProfile';
import './ProfileCard.css';

interface IProfileCardProps {
    profile: IProfile;
}

const ProfileCard: React.FC<IProfileCardProps> = (props) => {
    const i18n = useIntl();
    const history = useHistory();
    const [showToast, setShowToast] = useState(false);

    const onClickSwap = () => {
        if (!props.profile.vCard.name) {
            setShowToast(true);
        } else {
            history.push('/swap/' + props.profile.id);
        }
    };

    const renderProfileImage = () => {
        const imageData = props.profile?.image;
        if (imageData) {
            return <img src={imageData} alt='profile-img' />;
        } else {
            return <FontAwesomeIcon className='fa fa-lg profile-list-no-user' icon={faUser} />;
        }
    };

    return (
        <IonCard>
            <IonCardHeader onClick={() => history.push('/profile/edit/' + props.profile.id)}>
                <IonTitle className='ion-text-center ion-title'>{props.profile.name}</IonTitle>
            </IonCardHeader>
            <IonCardContent>
                <IonGrid>
                    <IonRow>
                        <IonCol size='4'>
                            <IonAvatar className='profile-list-avatar'>{renderProfileImage()}</IonAvatar>
                        </IonCol>
                        <IonCol size='8'>
                            <IonGrid>
                                <IonRow>
                                    <IonCol size='4'>
                                        <IonButton
                                            onClick={() => {
                                                history.push('/qrcode/' + props.profile.id);
                                            }}
                                            title={translate(i18n, 'ShowQRCode')}>
                                            <FontAwesomeIcon className='fa fa-lg' icon={faQrcode} />
                                        </IonButton>
                                    </IonCol>
                                    <IonCol size='4'>
                                        <IonButton onClick={onClickSwap} title={translate(i18n, 'Exchange')}>
                                            <FontAwesomeIcon className='fa fa-lg' icon={faExchange} />
                                        </IonButton>
                                    </IonCol>
                                    <IonCol size='4'>
                                        <IonButton
                                            onClick={() => {
                                                history.push('/profile/edit/' + props.profile.id);
                                            }}
                                            title={translate(i18n, 'Edit')}>
                                            <FontAwesomeIcon className='fa fa-lg' icon={faEdit} />
                                        </IonButton>
                                    </IonCol>
                                </IonRow>
                            </IonGrid>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonCardContent>
            <IonToast
                isOpen={showToast}
                onDidDismiss={() => setShowToast(false)}
                message={translate(i18n, 'Deny_Swap_Missing_Name_In_Profile')}
                duration={2000}
            />
        </IonCard>
    );
};

export default ProfileCard;
