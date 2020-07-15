import { ICardExchangeClient } from "../ICardExchangeClient";
import { CardExchangeEvent } from "../CardExchangeEvents";
import { MockEventAggregator } from "./MockEventAggregator";

export interface IRegisteredEventCall {
  event: CardExchangeEvent;
  func: any;
}

export class MockCardExchangeEvents {
  connection: MockEventAggregator;

  constructor(connection: MockEventAggregator, client: ICardExchangeClient) {
    this.connection = connection;

    this.connection.on(CardExchangeEvent.Subscribed, client.subscribed);
    this.connection.on(CardExchangeEvent.Unsubscribed, client.unsubscribed);
    this.connection.on(CardExchangeEvent.Updated, client.updated);
    this.connection.on(CardExchangeEvent.CardExchangeRequested, client.cardExchangeRequested);
    this.connection.on(CardExchangeEvent.WaitingForAcceptance, client.waitingForAcceptance);
    this.connection.on(CardExchangeEvent.CardExchangeAccepted, client.cardExchangeAccepted);
    this.connection.on(CardExchangeEvent.AcceptanceSent, client.acceptanceSent);
    this.connection.on(CardExchangeEvent.CardDataReceived, client.cardDataReceived);
    this.connection.on(CardExchangeEvent.CardDataSent, client.cardDataSent);
  }
}
