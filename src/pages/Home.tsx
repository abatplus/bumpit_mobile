import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonSlides, IonSlide } from '@ionic/react';
import React from 'react';
import './Home.css';

const slideOpts = {
  initialSlide: 1,
  speed: 400,
};

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Blank</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Blank</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonSlides pager={true} options={slideOpts}>
          <IonSlide>
            <h1>Slide 1</h1>
          </IonSlide>
          <IonSlide>
            <h1>Slide 2</h1>
            <footer>Ende SLide 2</footer>
          </IonSlide>
          <IonSlide>
            <h1>Slide 3</h1>
            <footer>Ende Slide 3</footer>
          </IonSlide>
        </IonSlides>
      </IonContent>
    </IonPage>
  );
};

export default Home;
