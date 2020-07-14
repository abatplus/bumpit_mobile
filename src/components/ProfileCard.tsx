import React from 'react';
import { IonHeader, IonTitle, IonCard, IonCardContent, IonButton, IonIcon, IonGrid, IonRow, IonCol } from '@ionic/react';
import { useIntl } from 'react-intl';
import { nameof } from '../utils';
import IvCardTranslations from '../i18n/IvCardTranslations';
import { qrCode, swapVertical, pencil } from 'ionicons/icons';
import { useHistory } from 'react-router';

export interface IProfileCard {
  id: string;
  name: string;
}

const ProfileCard: React.FC<IProfileCard> = (props) => {
  const i18n = useIntl();
  const history = useHistory();

  console.log('we do have a profile card');

  return (
    <IonCard style={{ margin: '2em' }}>
      <IonHeader onClick={() => history.push('/profile/edit/' + props.id)}>
        <IonTitle className="ion-text-center">{props.name}</IonTitle>
      </IonHeader>
      <hr />
      <IonCardContent>
        <IonGrid>
          <IonRow>
            <IonCol className="ion-text-center">
              <IonButton
                onClick={() => {
                  history.push('/qrcode/' + props.id);
                }}
                title={i18n.formatMessage({ id: nameof<IvCardTranslations>('ShowQRCode') })}
              >
                <IonIcon icon={qrCode} />
              </IonButton>
            </IonCol>
            <IonCol className="ion-text-center">
              <IonButton
                onClick={() => {
                  history.push('/swap/' + props.id);
                }}
                title={i18n.formatMessage({ id: nameof<IvCardTranslations>('Exchange') })}
              >
                <IonIcon icon={swapVertical} />
              </IonButton>
            </IonCol>
            <IonCol className="ion-text-center">
              <IonButton
                onClick={() => {
                  history.push('/profile/edit/' + props.id);
                }}
                title={i18n.formatMessage({ id: nameof<IvCardTranslations>('Edit') })}
              >
                <IonIcon icon={pencil} />
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonCardContent>
    </IonCard>
  );
};

export default ProfileCard;
