import React, { useState } from 'react';
import {
    IonTitle,
    IonCard,
    IonCardContent,
    IonButton,
    IonIcon,
    IonGrid,
    IonRow,
    IonCol,
    IonCardHeader,
    IonToast,
} from '@ionic/react';
import { useIntl } from 'react-intl';
import { nameof } from '../utils';
import IvCardTranslations from '../i18n/IvCardTranslations';
import { qrCode, swapVertical, pencil } from 'ionicons/icons';
import { useHistory } from 'react-router';
import IProfile from '../interfaces/IProfile';

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

    return (
        <IonCard style={{ margin: '2em' }}>
            <IonCardHeader onClick={() => history.push('/profile/edit/' + props.profile.id)}>
                <IonTitle className='ion-text-center'>{props.profile.name}</IonTitle>
            </IonCardHeader>
            <hr />
            <IonCardContent>
                <IonGrid>
                    <IonRow>
                        <IonCol className='ion-text-center'>
                            <IonButton
                                onClick={() => {
                                    history.push('/qrcode/' + props.profile.id);
                                }}
                                title={i18n.formatMessage({ id: nameof<IvCardTranslations>('ShowQRCode') })}>
                                <IonIcon icon={qrCode} />
                            </IonButton>
                        </IonCol>
                        <IonCol className='ion-text-center'>
                            <IonButton
                                onClick={onClickSwap}
                                title={i18n.formatMessage({ id: nameof<IvCardTranslations>('Exchange') })}>
                                <IonIcon icon={swapVertical} />
                            </IonButton>
                        </IonCol>
                        <IonCol className='ion-text-center'>
                            <IonButton
                                onClick={() => {
                                    history.push('/profile/edit/' + props.profile.id);
                                }}
                                title={i18n.formatMessage({ id: nameof<IvCardTranslations>('Edit') })}>
                                <IonIcon icon={pencil} />
                            </IonButton>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonCardContent>
            <IonToast
                isOpen={showToast}
                onDidDismiss={() => setShowToast(false)}
                message="Please provide your name in the profile before swapping."
                duration={2000}
            />
        </IonCard>
    );
};

export default ProfileCard;
