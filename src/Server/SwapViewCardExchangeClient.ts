import { Dispatch } from 'react';
import { IAction } from '../store/reducers/SwapReducer';
import * as Actions from '../store/actions/actions';
import ISwapListEntry from '../interfaces/ISwapListEntry';
import IContactApi from '../interfaces/IContactApi';
import ContactApi from '../contacts/ContactApi';
import { ICardExchangeClient } from './ICardExchangeClient';

export class SwapViewCardExchangeClient implements ICardExchangeClient {

  constructor(private dispatch: Dispatch<IAction>, private sendCardData: (peerDeviceId: string) => void, private contactApi: IContactApi = new ContactApi()) {

  }

  subscribed = (peers: string[]) => {
    this.dispatch(Actions.Swap.updateList(peers.map((entry) => JSON.parse(entry))));
  };

  unsubscribed = (statusMessage: string) => {
    this.dispatch(Actions.Swap.updateList([] as ISwapListEntry[]));
  };

  updated = (peers: string[]) => {
    this.dispatch(Actions.Swap.updateList(peers.map((entry) => JSON.parse(entry))));
  };

  cardExchangeRequested = (deviceId: string, displayName: string) => {
    console.log('cardExchangeRequested', deviceId, displayName);
    this.dispatch(Actions.Swap.receiveRequest(deviceId));
  };

  waitingForAcceptance = (peerDeviceId: string) => {
    console.log('waitingForAcceptance', peerDeviceId);
    // Action to show clock already fired when the exchange request has been sent
    this.dispatch(Actions.Swap.sendRequest(peerDeviceId));
  };

  // get a revoke request
  cardExchangeRequestRevoked = (deviceId: string) => {
    console.log('cardExchangeRequestRevoked', deviceId);
    this.dispatch(Actions.Swap.receiveAbortRequest(deviceId));
  };

  // remove request successfully sent
  revokeSent = (peerDeviceId: string) => {
    console.log('revokeSent', peerDeviceId);
    this.dispatch(Actions.Swap.sendAbortRequest(peerDeviceId));
  };

  cardExchangeAccepted = (peerDeviceId: string, peerDisplayName: string, peerCardData: string) => {
    // received
    console.log('cardExchangeAccepted', peerDeviceId, peerDisplayName, peerCardData);
    this.contactApi.createContact(JSON.parse(peerCardData));
    this.sendCardData(peerDeviceId);
    this.dispatch(Actions.Swap.receiveAcceptRequest(peerDeviceId));
  };

  acceptanceSent = (deviceId: string) => {
    console.log('acceptanceSent', deviceId);
  };

  cardDataReceived = (deviceId: string, displayName: string, cardData: string) => {
    console.log('cardDataReceived', deviceId, displayName, cardData);
    this.contactApi.createContact(JSON.parse(cardData));
    this.dispatch(Actions.Swap.receiveAcceptRequest(deviceId));
  }

  cardDataSent = (peerDeviceId: string) => {
    console.log('cardDataSent', peerDeviceId);
  };
}

// Workflow:
// Client A (device)   Client B (peerDevice)
// -----------------------------------
// Request (B)                              HubA.RequestCardExchange
//   ------------------->Requested (A)      ClientB.CardExchangeRequested
//   ->Waiting (B)                          ClientA.WaitingForAcceptance
//
//                         Accept (A)       HubB.AcceptCardExchange
// Accepted (B)<--------------------        ClientA.cardExchangeAccepted
//               AcceptanceSent(A)<-        ClientB.acceptanceSent
//
// Send (B)                                 HubA.SendCardData
//   ------------------->Received (A)       ClientB.cardDataReceived
//   -> Sent (B)                            ClientA.cardDataSent
