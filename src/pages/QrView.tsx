import React, { useEffect } from 'react';
import { IonHeader, IonToolbar, IonContent, IonPage, IonButtons, IonList, IonMenuButton, IonTitle } from '@ionic/react';
import { QRScanner } from '@ionic-native/qr-scanner';
import './QrView.css';
import { connect } from '../data/connect';

import VcardField from '../components/VcardField';

interface OwnProps { }

interface StateProps {
  cardData?: any;
};

interface DispatchProps {
}

type VcardProps = OwnProps & StateProps & DispatchProps;

const QrView: React.FC<VcardProps> = ({ cardData }) => {

  const createQrCode = async (e: React.FormEvent) => {
    e.preventDefault();

  };

  useEffect(() => {
    
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
        <form noValidate onSubmit={createQrCode}>
          <IonList>
            <VcardField name="name" label="Name" />
            <VcardField name="nickname" label="Nickname" />
          </IonList>



        </form>

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
  component: QrView
});
