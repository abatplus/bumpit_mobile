import React, {   } from 'react';
import { IonHeader, IonToolbar, IonContent, IonPage, IonButtons,IonList,IonMenuButton,IonTitle,} from '@ionic/react';

import './VcardView.css';
import { connect } from '../data/connect';
import VcardField from '../components/VcardField';

interface OwnProps {}

interface StateProps {
    cardData?: any;
  };
  
  interface DispatchProps {
  }

  type VcardProps = OwnProps & StateProps & DispatchProps;

  const VcardView: React.FC<VcardProps> = ({cardData}) => {
  
    return (

      <IonPage id="vcard">
      <IonHeader translucent={true}>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Business Card</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen={true}>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Business Card</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList>
          <VcardField name="name" label="Name"/>
          <VcardField name="nickname" label="Nickname"/>
          <VcardField name="tel" label="Handy"/>
          <VcardField name="companyTel" label="Firmenhandy"/>
          <VcardField name="email" label="eMail"/>       
        </IonList>
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
    component: VcardView
  });
 