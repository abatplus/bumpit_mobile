import { ICardExchangeHub } from "./ICardExchangeHub";
import ICardExchangeEvents from "./ICardExchangeEvents";

export default interface ICardExchangeServer {
  Events: ICardExchangeEvents;
  Hub: ICardExchangeHub;
}