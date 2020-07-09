import React, { useEffect, useState } from 'react';
import { IonHeader, IonToolbar, IonContent, IonPage, IonButtons, IonMenuButton, IonTitle } from '@ionic/react';
import './QrView.css';
import QRCode from 'qrcode.react';
import { useVCard } from '../store/contexts/VCardContext';

const QrView: React.FC = () => {

  const [qrWidth, setQrWidth] = useState<number>();
  const [windowSize, setWindowSize] = useState([window.innerWidth, window.innerHeight]);
  const { vCard } = useVCard();

  useEffect( () => {
    // calculate size depending on screen orientation
    let size = windowSize[1] > windowSize[0] ? windowSize[0] - 100 : windowSize[1] - 200;
    // limit max size
    size = size > 400 ? 400 : size;
    setQrWidth(size);
  }, [windowSize, vCard]);

  const updateWindowSize = () => {
    setWindowSize([window.innerWidth, window.innerHeight]);
  }

  // only fire resize event after 500ms due performance reasons
  let resizeId: NodeJS.Timeout;
  window.addEventListener('resize', function() {
      clearTimeout(resizeId);
      resizeId = setTimeout(updateWindowSize, 500);
  });

  return (
    <IonPage id="qr">
      <IonHeader translucent={true}>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>QR</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen={true}>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">qr</IonTitle>
          </IonToolbar>
        </IonHeader>

        <div className="qrcontainer">
          <QRCode value={JSON.stringify(vCard)} size={qrWidth} />
        </div>

      </IonContent>
    </IonPage>
  );
};

export default QrView;