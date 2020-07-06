import React, { useEffect } from 'react';
import { IonHeader, IonToolbar, IonContent, IonPage, IonButtons, IonList, IonMenuButton, IonTitle } from '@ionic/react';
import { QRScanner } from '@ionic-native/qr-scanner';
import { connect } from '../data/connect';

import VcardField from '../components/VcardField';

interface OwnProps { }

interface StateProps {
};

interface DispatchProps {
}

type VcardProps = OwnProps & StateProps & DispatchProps;

const ScanView: React.FC<VcardProps> = ({ }) => {

  useEffect(() => {
    
  });


  function scan() {
      //TODO
      QRScanner.scan();
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
