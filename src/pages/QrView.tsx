import React, { useEffect } from 'react';
import { IonHeader, IonToolbar, IonContent, IonPage, IonButtons, IonList, IonMenuButton, IonTitle } from '@ionic/react';
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

  useEffect(() => {

  });


  //card data as String
  function buildQrData(): string {

    // TODO filter field acording share flag
    return JSON.stringify(cardData);

  }

  //generate qr 
  const generateCode = () => {

    //TODO 
    
  };

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

        {
        //TODO
        }
        <VcardField name="name" label="Name"/>
        <VcardField name="nickname" label="Nickname"/>

        {generateCode()}





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
