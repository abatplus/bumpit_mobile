import { CardExchangeEvent } from "../CardExchangeEvents";
import { IRegisteredEventCall } from "./MockCardExchangeEvents";

export class MockEventAggregator {
  registered = [] as IRegisteredEventCall[];

  public on = (event: CardExchangeEvent, func: any) => this.registered.push({ event: event, func: func });

  public fire(event: CardExchangeEvent, ...args: any[]) {
    this.registered.filter(r => r.event === event).forEach(r => r.func(...args));
  }
}
