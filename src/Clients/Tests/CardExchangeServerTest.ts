import { ICardExchangeClient } from "../ICardExchangeClient";
import MockCardExchangeServer from "./MockCardExchangeServer";
import { CardExchangeEvent } from "../CardExchangeEvents";

class CardExchangeServerEventTest implements ICardExchangeClient {

  constructor() {
    const client = new MockCardExchangeServer(this);
    client.fire(CardExchangeEvent.Subscribed);
  }

  subscribed = (peers: string[]) => { console.log('subscribed'); };
  unsubscribed = (statusMessage: string) => { console.log('unsubscribed'); };
  updated = (peers: string[]) => { console.log('updated'); };
  cardExchangeRequested = (deviceId: string, displayName: string) => { console.log('cardExchangeRequested'); };
  waitingForAcceptance = (peerDeviceId: string) => { console.log('waitingForAcceptance'); };
  cardExchangeAccepted = (peerDeviceId: string, displayName: string, cardData: string) => { console.log('cardExchangeAccepted'); };
  acceptanceSent = (deviceId: string) => { console.log('acceptanceSent'); };
  cardDataReceived = (deviceId: string, displayName: string, cardData: string) => { console.log('cardDataReceived'); };
  cardDataSent = (peerDeviceId: string) => { console.log('cardDataSent'); };
}
