import * as signalR from "@microsoft/signalr";
import { ICardExchangeClient } from "./ICardExchangeClient";
import ICardExchangeEvents from "./ICardExchangeEvents";

export enum CardExchangeEvent {
  Subscribed = 'Subscribed',
  Unsubscribed = 'Unsubscribed',
  Updated = 'Updated',

  CardExchangeRequested = 'CardExchangeRequested',
  WaitingForAcceptance = 'WaitingForAcceptance',

  CardExchangeRequestRevoked = 'CardExchangeRequestRevoked',
  RevokeSent = 'RevokeSent',

  CardExchangeAccepted = 'CardExchangeAccepted',
  AcceptanceSent = 'AcceptanceSent',

  CardDataReceived = 'CardDataReceived',
  CardDataSent = 'CardDataSent'
}

export class CardExchangeEvents implements ICardExchangeEvents {
  connection: signalR.HubConnection;

  constructor(connection: signalR.HubConnection, client: ICardExchangeClient) {
    this.connection = connection;

    this.connection.on(CardExchangeEvent.Subscribed, client.subscribed);
    this.connection.on(CardExchangeEvent.Unsubscribed, client.unsubscribed);
    this.connection.on(CardExchangeEvent.Updated, client.updated);

    this.connection.on(CardExchangeEvent.CardExchangeRequested, client.cardExchangeRequested);
    this.connection.on(CardExchangeEvent.WaitingForAcceptance, client.waitingForAcceptance);

    this.connection.on(CardExchangeEvent.CardExchangeRequestRevoked, client.cardExchangeRequestRevoked);
    this.connection.on(CardExchangeEvent.RevokeSent, client.revokeSent);

    this.connection.on(CardExchangeEvent.CardExchangeAccepted, client.cardExchangeAccepted);
    this.connection.on(CardExchangeEvent.AcceptanceSent, client.acceptanceSent);

    this.connection.on(CardExchangeEvent.CardDataReceived, client.cardDataReceived);
    this.connection.on(CardExchangeEvent.CardDataSent, client.cardDataSent);
  }
}
