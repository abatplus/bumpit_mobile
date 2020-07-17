import React, { useEffect, useReducer, useState } from 'react';
import {
  IonHeader,
  IonToolbar,
  IonContent,
  IonPage,
  IonButtons,
  IonList,
  IonTitle,
  IonLoading,
  IonBackButton,
  IonFooter,
  IonButton,
  IonIcon,
  IonLabel,
  IonItem,
  IonSegment,
  IonSegmentButton,
  useIonViewDidEnter,
  useIonViewDidLeave,
} from '@ionic/react';
import './SwapView.css';
import * as Actions from '../store/actions/actions';
import SwapViewListItem from '../components/SwapViewListItem';
import { share, repeat, people, search } from 'ionicons/icons';
import SwapState from '../enums/SwapState';
import * as SwapReducer from '../store/reducers/SwapReducer';
import { SwapViewCardExchangeClient } from '../Server/SwapViewCardExchangeClient';
import { MockCompleteServer } from '../Server/Tests/MockCompleteServer';
import { v4 as uuidv4 } from 'uuid';
import { useProfileContext } from '../store/contexts/ProfileContext';
import { useParams } from 'react-router';
import { Geolocation } from '@ionic-native/geolocation';
import ISwapListEntry from '../interfaces/ISwapListEntry';
import { useIntl } from 'react-intl';
import { nameof } from '../utils';
import IvCardTranslations from '../i18n/IvCardTranslations';

const SwapView: React.FC = () => {
  const { profileContext } = useProfileContext();
  const { id } = useParams();
  const i18n = useIntl();
  const [swapContext, dispatchSwapContext] = useReducer(SwapReducer.SwapReducer, SwapReducer.initialState);
  const [segmentFilter, setSegmmentFilter] = useState<string>('swap-list');
  const [swapList, setSwapList] = useState<ISwapListEntry[]>([]);
  const deviceId = uuidv4();
  let updateHandler = setTimeout(() => {}, 10000000); // dummy

  const cardExchangeClient = new SwapViewCardExchangeClient(dispatchSwapContext);
  // const cardExchangeServer = new CardExchangeServer(cardExchangeClient);
  const cardExchangeServer = new MockCompleteServer(cardExchangeClient);

  useEffect(() => {
    setSwapList(
      segmentFilter === 'ready-list'
        ? swapContext.filter((entry) => entry.state === SwapState.exchanged)
        : swapContext.filter((entry) => entry.state !== SwapState.exchanged)
    );
  }, [segmentFilter, swapContext]);

  useIonViewDidEnter(() => {
    const name: string = getCurrentProfileNameField();
    Geolocation.getCurrentPosition()
      .then((resp) => {
        cardExchangeServer.Hub.Subscribe(deviceId, resp.coords.longitude, resp.coords.latitude, name);

        setTimeout(() => {
          // TODO remove dummy data
          dispatchSwapContext(
            Actions.Swap.updateList([
              {
                deviceId: '123',
                name: 'Arno Nühm',
                state: SwapState.initial,
              },
              {
                deviceId: '456',
                name: 'Bea Trix',
                state: SwapState.received,
              },
              {
                deviceId: '789',
                name: 'Lorette Mahr',
                state: SwapState.requested,
              },
              {
                deviceId: 'abc',
                name: 'Wanda Lismus',
                state: SwapState.accepted,
              },
              {
                deviceId: 'def',
                name: 'Al Coholik',
                state: SwapState.exchanged,
              },
            ])
          );
        }, 2000);

        updateHandler = setInterval(() => {
          Geolocation.getCurrentPosition()
            .then((resp) => {
              cardExchangeServer.Hub.Update(deviceId, resp.coords.longitude, resp.coords.latitude, name);
            })
            .catch((error) => {
              console.error('Error updating location', error);
              // clearInterval(updateHandler);
            });
        }, 2000);
      })
      .catch((error) => {
        console.error('Error getting location', error);
      });
  });

  useIonViewDidLeave(() => {
    clearInterval(updateHandler); // stop updates
    cardExchangeServer.Hub.Unsubcribe(deviceId);
  });

  const getCurrentProfile = () => {
    return profileContext.profiles.find((entry) => entry.id === id);
  };

  const getCurrentProfileNameField = () => {
    const profile = getCurrentProfile();
    if (!profile?.vCard?.name) {
      throw new Error("profile doesn't exist or contains no name");
    }
    return profile.vCard.name;
  };

  const onDoRequestAll = () => {
    console.log('request-all');
    // request all non requested or from whose no request is received
    swapContext.filter((entry) => entry.state === SwapState.initial).forEach((entry) => onDoRequest(entry.deviceId));
    // additionally approve all yet existing incoming requests
    // onAcceptAll();
  };

  const onAcceptAll = () => {
    console.log('accept-all');
    swapContext.filter((entry) => entry.state === SwapState.received).forEach((entry) => onAcceptRequest(entry.deviceId));
    clearInterval(updateHandler); // delete
  };

  const onDoRequest = (peerDeviceId: string) => {
    console.log('request');
    cardExchangeServer.Hub.RequestCardExchange(deviceId, peerDeviceId, getCurrentProfileNameField());
    cardExchangeClient.cardExchangeRequested(peerDeviceId, 'xyz'); // TODO: DELETE AGAIN - JUST FOR TESTING NOW
  };

  const onAcceptRequest = (peerDeviceId: string) => {
    console.log('accept-request');
    cardExchangeServer.Hub.AcceptCardExchange(deviceId, peerDeviceId, getCurrentProfileNameField(), JSON.stringify(getCurrentProfile()?.vCard));
    cardExchangeClient.cardExchangeAccepted(peerDeviceId, 'xyz', 'XYZ'); // TODO: DELETE AGAIN - JUST FOR TESTING NOW
  };

  const onAbortRequest = (peerDeviceId: string) => {
    console.log('abort request');
    cardExchangeServer.Hub.RevokeCardExchangeRequest(deviceId, peerDeviceId);
    cardExchangeClient.revokeSent(peerDeviceId);
  };

  const renderList = () => {
    // !!!! DON'T REMOVE THE DIV AROUND THE LISTITEM, BECAUSE IT FIXES A SORTING BUG WHEN MORE THAN 2 ELEMENTS WITH THE SAME NAME ARE SHOWN !!!
    return swapList.map((entry) => (
      <div>
        <SwapViewListItem
          key={entry.deviceId}
          name={entry.name}
          state={entry.state}
          onDoRequest={() => onDoRequest(entry.deviceId)}
          onAcceptRequest={() => onAcceptRequest(entry.deviceId)}
          onAbortRequest={() => onAbortRequest(entry.deviceId)}
        />
      </div>
    ));
  };

  const renderFooter = () => {
    if (segmentFilter === 'swap-list')
      return (
        <IonFooter>
          <IonList>
            <IonItem>
              <IonButton color="primary" fill="outline" className="swap-footer-button" onClick={onDoRequestAll}>
                <IonIcon icon={share} />
                <IonLabel className="swap-footer-button-text">{i18n.formatMessage({ id: nameof<IvCardTranslations>('Request_All') })}</IonLabel>
              </IonButton>
            </IonItem>
            <IonItem>
              <IonButton color="primary" fill="outline" className="swap-footer-button" onClick={onAcceptAll}>
                <IonIcon icon={repeat} />
                <IonLabel className="swap-footer-button-text">{i18n.formatMessage({ id: nameof<IvCardTranslations>('Accept_All') })}</IonLabel>
              </IonButton>
            </IonItem>
          </IonList>
        </IonFooter>
      );
  };

  return (
    <IonPage>
      <IonHeader translucent={true}>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>Exchange card</IonTitle>
        </IonToolbar>
        <IonToolbar>
          <IonSegment value={segmentFilter} onIonChange={(e) => setSegmmentFilter(e.detail.value as string)}>
            <IonSegmentButton value="swap-list">
              <IonIcon icon={search} />
              <IonLabel>Suche ({swapContext.filter((entry) => entry.state !== SwapState.exchanged).length})</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="ready-list">
              <IonIcon icon={people} />
              <IonLabel>Empfangen ({swapContext.filter((entry) => entry.state === SwapState.exchanged).length})</IonLabel>
            </IonSegmentButton>
          </IonSegment>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        {swapContext.length === 0 ? <IonLoading spinner="lines" isOpen={true} message="Warte auf Kontakte" /> : ''}
        <IonList>{renderList()}</IonList>
      </IonContent>
      {renderFooter()}
    </IonPage>
  );
};

export default SwapView;
