import React, { useEffect, useState } from 'react';
import { IonHeader, IonToolbar, IonContent, IonPage, IonButtons, IonList, IonMenuButton, IonTitle, useIonViewDidEnter } from '@ionic/react';
import './QrView.css';
import { connect } from '../data/connect';
import VcardField from '../components/VcardField';
import { analytics } from 'ionicons/icons';
import QRCode from 'qrcode.react';

interface OwnProps { }

interface StateProps {
  cardData?: any;
};

interface DispatchProps {
}

type VcardProps = OwnProps & StateProps & DispatchProps;

const QrView: React.FC<VcardProps> = ({ cardData }) => {

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

  //card data as String
  function buildQrData(): string {
    // TODO filter field acording share flag
    return JSON.stringify(cardData);
  }

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
          <QRCode value={buildQrData()} size={qrWidth} />
        </div>

      </IonContent>
    </IonPage>
  );
};


export default connect<OwnProps, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    cardData: state.vcard,

  }),
  mapDispatchToProps: {

  },
  component: React.memo(QrView)
});
