import React, { useEffect, useState } from 'react';
import { IonHeader, IonToolbar, IonContent, IonPage, IonButtons, IonTitle, IonBackButton } from '@ionic/react';
import './QrView.css';
import QRCode from 'qrcode.react';
import { nameof, getProfileId } from '../utils';
import IvCardTranslations from '../i18n/IvCardTranslations';
import { useIntl } from 'react-intl';
import { useProfileContext } from '../store/contexts/ProfileContext';
import { useLocation } from 'react-router';

const QrView: React.FC = () => {
  const [qrWidth, setQrWidth] = useState<number>();
  const [windowSize, setWindowSize] = useState([window.innerWidth, window.innerHeight]);
  const { profileContext } = useProfileContext();

  const i18n = useIntl();

  useEffect(() => {
    // calculate size depending on screen orientation
    let size = windowSize[1] > windowSize[0] ? windowSize[0] - 100 : windowSize[1] - 200;
    // limit max size
    size = size > 400 ? 400 : size;
    setQrWidth(size);
  }, [windowSize, profileContext]);

  const location = useLocation();

  const updateWindowSize = () => {
    setWindowSize([window.innerWidth, window.innerHeight]);
  };

  // only fire resize event after 500ms due performance reasons
  let resizeId: NodeJS.Timeout;
  window.addEventListener('resize', function () {
    clearTimeout(resizeId);
    resizeId = setTimeout(updateWindowSize, 500);
  });

  const currentProfile = profileContext.profiles.find((profile) => profile.id === getProfileId(location.pathname));

  if (currentProfile) {
    return (
      <IonPage id="qr">
        <IonHeader translucent={true}>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton />
            </IonButtons>
            <IonTitle>{i18n.formatMessage({ id: nameof<IvCardTranslations>('QR_code') })}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen={true}>
          <div className="qrcontainer">
            <QRCode value={JSON.stringify(currentProfile?.vCard)} size={qrWidth} />
          </div>
        </IonContent>
      </IonPage>
    );
  } else {
    return <React.Fragment />;
  }
};

export default QrView;
