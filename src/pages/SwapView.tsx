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
import SwapViewListItem from '../components/SwapViewListItem';
import { share, repeat, people, search } from 'ionicons/icons';
import SwapState from '../enums/SwapState';
import * as SwapReducer from '../store/reducers/SwapReducer';
import { SwapViewCardExchangeClient } from '../Server/SwapViewCardExchangeClient';
import { v4 as uuid4 } from 'uuid';
import { useProfileContext } from '../store/contexts/ProfileContext';
import { useParams } from 'react-router';
import { Geolocation } from '@ionic-native/geolocation';
import ISwapListEntry from '../interfaces/ISwapListEntry';
import { useIntl } from 'react-intl';
import { nameof } from '../utils';
import IvCardTranslations from '../i18n/IvCardTranslations';
import CardExchangeServer from '../Server/CardExchangeServer';

const SwapView: React.FC = () => {
  const { profileContext } = useProfileContext();
  const { id } = useParams();
  const i18n = useIntl();
  const [swapContext, dispatchSwapContext] = useReducer(SwapReducer.SwapReducer, []);
  const [segmentFilter, setSegmentFilter] = useState<string>('swap-list');
  const [swapList, setSwapList] = useState<ISwapListEntry[]>([]);
  const deviceId = uuid4();
  let updateHandler = setTimeout(() => {}, 10000000); // dummy

  const cardExchangeClient = new SwapViewCardExchangeClient(dispatchSwapContext);
  const cardExchangeServer = new CardExchangeServer(cardExchangeClient);

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

        updateHandler = setInterval(() => {
          Geolocation.getCurrentPosition()
            .then((resp) => {
              cardExchangeServer.Hub.Update(deviceId, resp.coords.longitude, resp.coords.latitude, name);
            })
            .catch((error) => {
              console.error('Error updating location', error);
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
    // request all non requested or from whose no request is received
    swapContext.filter((entry) => entry.state === SwapState.initial).forEach((entry) => onDoRequest(entry.deviceId));
  };

  const getNumberOfRequestAll = () => {
    return swapContext.filter((entry) => entry.state === SwapState.initial).length;
  };

  const onAcceptAll = () => {
    swapContext.filter((entry) => entry.state === SwapState.received).forEach((entry) => onAcceptRequest(entry.deviceId));
    clearInterval(updateHandler); // delete
  };

  const getNumberOfAcceptAll = () => {
    return swapContext.filter((entry) => entry.state === SwapState.received).length;
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
      <div key={entry.deviceId}>
        <SwapViewListItem
          key={entry.deviceId}
          name={entry.displayName}
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
                <IonLabel className="swap-footer-button-text">
                  {i18n.formatMessage({ id: nameof<IvCardTranslations>('Request_All') })} {getNumberOfRequestAll()}
                </IonLabel>
              </IonButton>
            </IonItem>
            <IonItem>
              <IonButton color="primary" fill="outline" className="swap-footer-button" onClick={onAcceptAll}>
                <IonIcon icon={repeat} />
                <IonLabel className="swap-footer-button-text">
                  {i18n.formatMessage({ id: nameof<IvCardTranslations>('Accept_All') })} {getNumberOfAcceptAll()}
                </IonLabel>
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
          <IonTitle>{i18n.formatMessage({ id: nameof<IvCardTranslations>('Exchange') })}</IonTitle>
        </IonToolbar>
        <IonToolbar>
          <IonSegment value={segmentFilter} onIonChange={(e) => setSegmentFilter(e.detail.value as string)}>
            <IonSegmentButton value="swap-list">
              <IonIcon icon={search} />
              <IonLabel>
                {i18n.formatMessage({ id: nameof<IvCardTranslations>('Search') })} ({swapContext.filter((entry) => entry.state !== SwapState.exchanged).length})
              </IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="ready-list">
              <IonIcon icon={people} />
              <IonLabel>
                {i18n.formatMessage({ id: nameof<IvCardTranslations>('Received') })} (
                {swapContext.filter((entry) => entry.state === SwapState.exchanged).length})
              </IonLabel>
            </IonSegmentButton>
          </IonSegment>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        {swapContext.length === 0 ? (
          <IonLoading
            spinner={'lines'}
            isOpen={true}
            message={i18n.formatMessage({ id: nameof<IvCardTranslations>('Wait_for_contacts') })}
            showBackdrop={true}
            backdropDismiss={false}
            duration={10000}
          />
        ) : (
          ''
        )}
        <IonList>{renderList()}</IonList>
      </IonContent>
      {renderFooter()}
    </IonPage>
  );
};

export default SwapView;
