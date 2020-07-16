import { ICardExchangeClient } from './ICardExchangeClient';
import { Dispatch } from 'react';
import { IAction } from '../store/reducers/SwapReducer';
import * as Actions from '../store/actions/actions';
import ISwapListEntry from '../interfaces/ISwapListEntry';

export class SwapViewCardExchangeClient implements ICardExchangeClient {

  dispatch: Dispatch<IAction>;

  constructor(dispatch: Dispatch<IAction>) {
    this.dispatch = dispatch;
  }

  subscribed = (peers: string[]) => { 
    // console.log('subscribed', peers);
    let list: ISwapListEntry[] = [];
    peers.forEach( entry => list.push(JSON.parse(entry)));
    this.dispatch(Actions.Swap.updateList(list));
  };

  unsubscribed = (statusMessage: string) => { 
    // console.log('unsubscribed', statusMessage);
    this.dispatch(Actions.Swap.updateList([] as ISwapListEntry[]));
  };

  updated = (peers: string[]) => { 
    // console.log('updated', peers); 
    let list: ISwapListEntry[] = [];
    peers.forEach( entry => list.push(JSON.parse(entry)));
    this.dispatch(Actions.Swap.updateList(list));
  };

  cardExchangeRequested = (deviceId: string, displayName: string) => {
    console.log('cardExchangeRequested', deviceId, displayName); 
    this.dispatch(Actions.Swap.sendRequest(deviceId));
  };

  waitingForAcceptance = (peerDeviceId: string) => {
    console.log('waitingForAcceptance', peerDeviceId);
    // Action to show clock already fired when the exchange request has been sent
  };

  cardExchangeAccepted = (peerDeviceId: string, displayName: string, cardData: string) => { // received
    console.log('cardExchangeAccepted', peerDeviceId, displayName, cardData);
    this.dispatch(Actions.Swap.receiveAcceptRequest(peerDeviceId));
    // ToDo Save card data
  };

  acceptanceSent = (deviceId: string) => { 
    console.log('acceptanceSent', deviceId);
    this.dispatch(Actions.Swap.sendAcceptRequest(deviceId));
  };

  cardDataReceived = (deviceId: string, displayName: string, cardData: string) => { 
    console.log('cardDataReceived', deviceId, displayName, cardData);
    this.dispatch(Actions.Swap.receiveAcceptRequest(deviceId));
  };

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