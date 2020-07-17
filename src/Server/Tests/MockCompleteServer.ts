import { ICardExchangeHub } from "../ICardExchangeHub";
import { MockCardExchangeHub } from "./MockCardExchangeHub";
import { ICardExchangeClient } from "../ICardExchangeClient";
import { MockCardExchangeEvents } from "./MockCardExchangeEvents";
import { CardExchangeEvent } from "../CardExchangeEvents";
import { MockEventAggregator } from "./MockEventAggregator";
import ICardExchangeServer from "../ICardExchangeServer";

export class MockCompleteServer implements ICardExchangeServer {
  public Events: MockCardExchangeEvents;
  public Hub: ICardExchangeHub;

  aggregator: MockEventAggregator;

  connection: undefined;

  constructor(client: ICardExchangeClient) {
    this.aggregator = new MockEventAggregator();

    this.Events = new MockCardExchangeEvents(this.aggregator, client);
    this.Hub = new MockCardExchangeHub();
  }

  fire = (event: CardExchangeEvent, ...args: any[]) => this.aggregator.fire(event, ...args);
}