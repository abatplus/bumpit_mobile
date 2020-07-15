import React, { useEffect } from 'react';
import { IonHeader, IonToolbar, IonContent, IonPage, IonButtons, IonList, IonTitle, IonLoading, IonBackButton, IonFooter, IonButton, IonIcon, IonLabel, IonItem, IonSegment, IonSegmentButton } from '@ionic/react';
import './SwapView.css';
import { useAppContext } from '../store/contexts/AppContext';
import * as Actions from '../store/actions/actions';
import SwapViewListItem from '../components/SwapViewListItem';
import { share, repeat, people, search } from 'ionicons/icons';
import SwapState from '../enums/SwapState';

const SwapView: React.FC = () => {
  const { appContext, dispatchAppContext } = useAppContext();
  // const [ contacts, dispatchContacts ] = useRe

  useEffect(() => {
    dispatchAppContext(Actions.App.setLoading(true));
    setTimeout(() => {
      dispatchAppContext(Actions.App.setLoading(false));
    }, 2000);
  }, [dispatchAppContext]);

  const onRequestAll = () => {
    console.log("alle anfragen");
  }

  const onAcceptAll = () => {
    console.log("alle akzeptieren");
  }

  return (
    <IonPage id="vcard">
      <IonHeader translucent={true}>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>Exchange card</IonTitle>
        </IonToolbar>
        <IonToolbar>
          <IonSegment value="swap-list">
            <IonSegmentButton value="swap-list">
              <IonIcon icon={search} />
              <IonLabel>Suche</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="ready-list">
              <IonIcon icon={people} />
              <IonLabel>Empfangen (12)</IonLabel>
            </IonSegmentButton>
          </IonSegment>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        {appContext.isLoading ? <IonLoading spinner="lines" isOpen={true} /> : ''}
        {!appContext.isLoading && (
          <IonList>
            <SwapViewListItem name="Arno Nühm" state={SwapState.initial}/>
            <SwapViewListItem name="Bea Trix" state={SwapState.received} />
            <SwapViewListItem name="Lorette Mahr" state={SwapState.requested} />
            <SwapViewListItem name="Wanda Lismus" state={SwapState.accepted} />
            <SwapViewListItem name="Al Coholik" state={SwapState.exchanged} />
          </IonList>
        )}
      </IonContent>
      <IonFooter>
          <IonList>
            <IonItem>
              <IonButton color="primary" fill="outline" className="swap-footer-button" onClick={onRequestAll}>
                <IonIcon icon={share} />
                <IonLabel className="swap-footer-button-text">Alle anfragen</IonLabel>
              </IonButton>
            </IonItem>
            <IonItem>
              <IonButton color="primary" fill="outline" className="swap-footer-button" onClick={onAcceptAll}>
                <IonIcon icon={repeat} />
                <IonLabel className="swap-footer-button-text">Alle akzeptieren</IonLabel>
              </IonButton>
            </IonItem>
          </IonList>
      </IonFooter>
    </IonPage>
  );
};

export default SwapView;
