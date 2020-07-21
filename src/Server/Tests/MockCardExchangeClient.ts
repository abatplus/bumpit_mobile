import { ICardExchangeClient } from "../ICardExchangeClient";

export class MockCardExchangeClient implements ICardExchangeClient {
  name: string;

  constructor(name: string = 'CLIENT') {
    this.name = name;
  }

  log = (method: string, ...args: any[]) =>
    console.log(this.name + ': ' + method, ...args);

  subscribed = (peers: string[]) => { this.log('subscribed', peers); };
  unsubscribed = (statusMessage: string) => { this.log('unsubscribed', statusMessage); };
  updated = (peers: string[]) => { this.log('updated', peers); };

  cardExchangeRequested = (deviceId: string, displayName: string) => { this.log('cardExchangeRequested', deviceId, displayName); };
  waitingForAcceptance = (peerDeviceId: string) => { this.log('waitingForAcceptance', peerDeviceId); };

  cardExchangeRequestRevoked = (deviceId: string) => { this.log('cardExchangeRequestRevoked', deviceId); };
  revokeSent = (peerDeviceId: string) => { this.log('revokeSent', peerDeviceId); };

  cardExchangeAccepted = (peerDeviceId: string, peerDisplayName: string, peerCardData: string) => { this.log('cardExchangeAccepted', peerDeviceId, peerDisplayName, peerCardData); };
  acceptanceSent = (deviceId: string) => { this.log('acceptanceSent', deviceId); };

  cardDataReceived = (deviceId: string, displayName: string, cardData: string) => { this.log('cardDataReceived', deviceId, displayName, cardData); };
  cardDataSent = (peerDeviceId: string) => { this.log('cardDataSent', peerDeviceId); };
}
