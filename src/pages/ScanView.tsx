import React, { useEffect, useState } from 'react';
import { IonHeader, IonToolbar, IonContent, IonPage, IonButtons, IonMenuButton, IonTitle, useIonViewDidEnter, isPlatform } from '@ionic/react';
import './ScanView.css';
import QrReader from 'react-qr-reader';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

const ScanView: React.FC = () => {
  const [encodedText, setEncodedText] = useState<string>();
  const [qrWidth, setQrWidth] = useState<number>();
  const [windowSize, setWindowSize] = useState([window.innerWidth, window.innerHeight]);

  useEffect(() => {
    // calculate size depending on screen orientation
    let size = windowSize[1] > windowSize[0] ? windowSize[0] - 100 : windowSize[1] - 100;
    // limit max size
    size = size > 400 ? 400 : size;
    setQrWidth(size);
  }, [windowSize]);

  function updateWindowSize() {
    setWindowSize([window.innerWidth, window.innerHeight]);
  }

  // only fire resize event after 500ms due performance reason
  let resizeId: NodeJS.Timeout;
  window.addEventListener('resize', function () {
    clearTimeout(resizeId);
    resizeId = setTimeout(updateWindowSize, 500);
  });

  const onScanCompleted = (data: string) => {
    setEncodedText(data as string);
    alert(data);
  }

  useIonViewDidEnter( () => {
    if (isPlatform('cordova') || isPlatform('capacitor')) {
      BarcodeScanner.scan().then ( data => onScanCompleted(data.text) );
    }
  });

  const renderBrowserScanner = () => {
    return (
      <div className="qrReaderContainer">
          <QrReader
            className="qrReader"
            delay={300}
            onError={(err) => {
              // alert(err);
            }}
            onScan={(data) => {
              if (data !== null) {
                onScanCompleted(data);
              }
            }}
            style={{ width: qrWidth }}
          />
        </div>
    );
  }

  return (
    <IonPage id="scan">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Scan QR code</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        {!isPlatform('cordova') && !isPlatform('capacitor') && renderBrowserScanner()}
      </IonContent>
    </IonPage>
  );
};

export default ScanView;
