import React, { useEffect, useState } from 'react';
import { IonHeader, IonToolbar, IonContent, IonPage, IonButtons, IonList, IonMenuButton, IonTitle, IonButton } from '@ionic/react';
import { connect } from '../data/connect';
import './ScanView.css';

import VcardField from '../components/VcardField';

// import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import QrReader from 'react-qr-reader';

interface OwnProps { }

interface StateProps {
};

interface DispatchProps {
}

type VcardProps = OwnProps & StateProps & DispatchProps;

const ScanView: React.FC<VcardProps> = ({ }) => {

  const [encodedText, setEncodedText] = useState<string>();
  const [qrWidth, setQrWidth] = useState<number>();
  const [windowSize, setWindowSize] = useState([window.innerWidth, window.innerHeight]);

  useEffect( () => {
    // calculate size depending on screen orientation
    let size = windowSize[1] > windowSize[0] ? windowSize[0] - 100 : windowSize[1] - 100
    // limit max size
    size = size > 400 ? 400 : size;
    setQrWidth(size);
  }, [windowSize])

  function updateWindowSize() {
    setWindowSize([window.innerWidth, window.innerHeight]);
  }

  // only fire resize event after 500ms due performance reasond
  let resizeId: NodeJS.Timeout;
  window.addEventListener('resize', function() {
      clearTimeout(resizeId);
      resizeId = setTimeout(updateWindowSize, 500);
  });

  const renderScanner = () => {
      return (
        <div className="qrReaderContainer">
          <QrReader className="qrReader"
            delay={300}
            onError={ (err) => {
              // alert(err);
            }}

            onScan={ (data) => {
              if (data !== null) {
                alert(data);
                setEncodedText(data as string)
              }
            }}
            style={{ width: qrWidth }}
          />
        </div>
      );
    // }
  }

  return (

    <IonPage id="scan">
      <IonHeader translucent={true}>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Scan QR code</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen={true}>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">qr</IonTitle>
          </IonToolbar>
        </IonHeader>
       
        {renderScanner()}

      </IonContent>
    </IonPage>

  );
};


export default connect<OwnProps, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({

  }),
  mapDispatchToProps: {

  },
  component: ScanView
});
