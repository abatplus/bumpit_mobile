import * as signalR from "@microsoft/signalr";
import { ICardExchangeHub } from "./ICardExchangeHub";
import { ICardExchangeClient } from "./ICardExchangeClient";
import { CardExchangeEvents } from "./CardExchangeEvents";
import { CardExchangeHub } from "./CardExchangeHub";

export class CardExchangeServer {
  connection: signalR.HubConnection;

  public Events: CardExchangeEvents;
  public Hub: ICardExchangeHub;

  constructor(client: ICardExchangeClient) {
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl("http://localhost:5000/hub")
      .build();

    this.Events = new CardExchangeEvents(this.connection, client);
    this.Hub = new CardExchangeHub(this.connection);
  }
}