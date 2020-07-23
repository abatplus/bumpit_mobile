import React from 'react';
import './SwapViewListItem.css';
import { IonItem, IonLabel, IonButton, IonGrid, IonCol, IonRow, IonSpinner } from '@ionic/react';
import { faCheck, faShare, faTimes } from '@fortawesome/pro-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import SwapState from '../enums/SwapState';
import { useIntl } from 'react-intl';
import { translate } from '../utils';

type SwapViewListItemType = {
  name: string;
  state: SwapState;
  onDoRequest: () => void;
  onAcceptRequest: () => void;
  onAbortRequest: () => void;
};

const SwapViewListItem = ({ name, state, onDoRequest, onAbortRequest, onAcceptRequest }: SwapViewListItemType) => {
  let stateText = ' ';

  const i18n = useIntl();
  switch (state) {
    case SwapState.initial:
      stateText = ' ';
      break;
    case SwapState.requested:
      stateText = translate(i18n, 'Wait_for_acceptance');
      break;
    case SwapState.received:
      stateText = translate(i18n, 'Exchange_request_received');
      break;
    case SwapState.accepted:
      stateText = translate(i18n, 'Accept_request_send_data');
      break;
    case SwapState.exchanged:
      stateText = translate(i18n, 'Exchange_successful');
      break;
  }

  const onActionButtonClick = () => {
    switch (state) {
      case SwapState.initial:
        return onDoRequest();
      case SwapState.requested:
        return onAbortRequest();
      case SwapState.received:
        return onAcceptRequest();
    }
  };

  const getActionIcon = () => {
    switch (state) {
      case SwapState.initial:
        return faShare;
      case SwapState.received:
        return faCheck;
      case SwapState.requested:
        return faTimes;
    }
    return faShare;
  };

 
  const renderActionButton = () => {
    if (state !== SwapState.accepted && state !== SwapState.exchanged)
      return (
        <IonButton float-right color="primary" fill="outline" onClick={onActionButtonClick}>
          <FontAwesomeIcon  className="fa fa-lg" icon={getActionIcon()} />
        </IonButton>
      );
  };

  return (
    <IonItem>
      <IonGrid>
        <IonRow>
          <IonCol className="swap-view-wait">{state === SwapState.requested ? <IonSpinner name="dots" /> : ''}</IonCol>
          <IonCol>
            <div>
              <IonLabel>
                <h2>{name}</h2>
                <p>{stateText}</p>
              </IonLabel>
            </div>
          </IonCol>
          <IonCol className="swap-view-button">{renderActionButton()}</IonCol>
        </IonRow>
      </IonGrid>
    </IonItem>
  );
};

export default SwapViewListItem;
