import { ICardExchangeHub } from "../ICardExchangeHub";
import { MockCardExchangeHub } from "./MockCardExchangeHub";
import { ICardExchangeClient } from "../ICardExchangeClient";
import { MockCardExchangeEvents } from "./MockCardExchangeEvents";
import { CardExchangeEvent } from "../CardExchangeEvents";
import { MockEventAggregator } from "./MockEventAggregator";

export default class MockCardExchangeServer {
  public Events: MockCardExchangeEvents;
  public Hub: ICardExchangeHub;

  aggregator: MockEventAggregator;

  constructor(client: ICardExchangeClient) {
    this.aggregator = new MockEventAggregator();

    this.Events = new MockCardExchangeEvents(this.aggregator, client);
    this.Hub = new MockCardExchangeHub();
  }

  fire = (event: CardExchangeEvent) => this.aggregator.fire(event);
}