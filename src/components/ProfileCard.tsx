import React from 'react';
import {
    IonTitle,
    IonCard,
    IonCardContent,
    IonButton,
    IonGrid,
    IonRow,
    IonCol,
    IonCardHeader,
} from '@ionic/react';
import { useIntl } from 'react-intl';
import { translate } from '../utils';
import { faQrcode, faEdit, faExchange } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useHistory } from 'react-router';
import IProfile from '../interfaces/IProfile';

interface IProfileCardProps {
  profile: IProfile;
}

const ProfileCard: React.FC<IProfileCardProps> = (props) => {
  const i18n = useIntl();
  const history = useHistory();

    return (
        <IonCard style={{ margin: '2em' }}>
            <IonCardHeader onClick={() => history.push('/profile/edit/' + props.profile.id)}>
                <IonTitle className='ion-text-center'>{props.profile.name}</IonTitle>
            </IonCardHeader>
            <IonCardContent>
                <IonGrid>
                    <IonRow>
                        <IonCol className='ion-text-center'>
                            <IonButton
                                onClick={() => {
                                    history.push('/qrcode/' + props.profile.id);
                                }}
                                title={translate(i18n, 'ShowQRCode')}>
                                <FontAwesomeIcon className="fa fa-lg" icon={faQrcode} />
                            </IonButton>
                        </IonCol>
                        <IonCol className='ion-text-center'>
                            <IonButton
                                onClick={() => {
                                    history.push('/swap/' + props.profile.id);
                                }}
                                title={translate(i18n, 'Exchange')}>
                                <FontAwesomeIcon className="fa fa-lg" icon={faExchange} />
                            </IonButton>
                        </IonCol>
                        <IonCol className='ion-text-center'>
                            <IonButton
                                onClick={() => {
                                    history.push('/profile/edit/' + props.profile.id);
                                }}
                                title={translate(i18n, 'Edit')}>
                                <FontAwesomeIcon className="fa fa-lg" icon={faEdit} />
                            </IonButton>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonCardContent>
        </IonCard>
    );
};

export default ProfileCard;
