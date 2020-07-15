import React from 'react';
import './SwapViewListItem.css';
import { IonItem, IonLabel, IonButton, IonIcon, IonGrid, IonCol, IonRow } from '@ionic/react';
import { hourglass, checkmark, close, share } from 'ionicons/icons';
import SwapState from '../enums/SwapState';

type OwnProps = {
    name: string;
    state: SwapState;
}

const SwapViewListItem: React.FC<OwnProps> = ({name, state}) => {

  let stateText = ' ';
  switch (state) {
    case SwapState.initial:
        stateText = ' ';
        break;
    case SwapState.requested:
        stateText = 'Warte auf Bestätigung...';
        break;
    case SwapState.received:
        stateText = 'Anfrage erhalten';
        break;
    case SwapState.accepted:
        stateText = 'Anfrage akzeptiert. Sende Daten...';
        break;
    case SwapState.exchanged:
        stateText = 'Daten erfolgreich ausgetauscht.';
        break;
  }

  const onActionButtonClick = () => {
      switch (state) {
        case SwapState.initial:
            return onRequest;
        case SwapState.requested:
            return onAbortRequest();
        case SwapState.received:
            return onAccept();
      }
  }

  const onRequest = () => {
    console.log(`request to xyz`);
  }

  const onAbortRequest = () => {
    console.log(`request to xyz aborted`);
  }

  const onAccept = () => {
    console.log(`request from xyz accepted`);
  }

  const getActionIcon = () => {
    switch (state) {
        case SwapState.initial:
            return share;
        case SwapState.received:
            return checkmark;
        case SwapState.requested:
            return close;
    }
  }

  const renderActionButton = () => {
    if (state !== SwapState.accepted && state !== SwapState.exchanged) 
        return (
        <IonButton float-right color="primary" fill="outline" onClick={onActionButtonClick}>
            <IonIcon icon={getActionIcon()}/>
        </IonButton>
    );
  }

  return (
    <IonItem>
        <IonGrid>
            <IonRow>
                <IonCol className="swap-view-wait">
                    { state === SwapState.requested ? <IonIcon icon={hourglass} /> : ""}
                </IonCol>
                <IonCol>
                    <div>
                        <IonLabel>
                            <h2>{name}</h2>
                            <p>{stateText}</p>
                        </IonLabel>
                    </div>
                </IonCol>
                <IonCol className="swap-view-button">
                    {renderActionButton()}
                </IonCol>
            </IonRow>
        </IonGrid>
    </IonItem>
  );
};

export default SwapViewListItem;
