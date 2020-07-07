import React, {  } from 'react';
import { IonHeader, IonToolbar, IonContent, IonPage, IonButtons,IonList,IonMenuButton,IonTitle, IonSpinner,} from '@ionic/react';
import { connect } from '../data/connect';
import './SwapView.css';
import VcardField from '../components/VcardField';
import { swapCardData } from '../data/card/card_actions';

interface OwnProps {}

interface StateProps {
    cardData?: any;
    loading?: boolean;
  };
  
  interface DispatchProps {
  
  }

  type SwapProps = OwnProps & StateProps & DispatchProps;

  const SwapView: React.FC<SwapProps> = ({cardData, loading}) => {
  
   
    return (
      <IonPage id="vcard">
      <IonHeader translucent={true}>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Exchange card</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen={true}>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Exchange card</IonTitle>
          </IonToolbar>
        </IonHeader>
        {loading && <IonSpinner className = "spinner" name = "lines"/>}

        {!loading &&<IonList>
          <VcardField name="name" label="Name"/>
          <VcardField name="nickname" label="Nickname"/>
          <VcardField name="tel" label="Handy"/>
          <VcardField name="companyTel" label="Firmenhandy"/>
          <VcardField name="email" label="eMail"/>       
        </IonList>}
      </IonContent>
    </IonPage>   
    );
  };
  

  export default connect<OwnProps, StateProps, DispatchProps>({
    mapStateToProps: (state) => ({
      cardData: state.vcard,
      loading: state.loading      
    }),
    mapDispatchToProps: {
       
    },
    component: SwapView
  });
 