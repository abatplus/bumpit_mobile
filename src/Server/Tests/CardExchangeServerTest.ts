import { MockCompleteServer } from './MockCompleteServer';
import { CardExchangeEvent } from '../CardExchangeEvents';
import { MockCardExchangeClient } from './MockCardExchangeClient';

export class CardExchangeServerTest {
  constructor() {
    const client = new MockCompleteServer(new MockCardExchangeClient());
    client.fire(CardExchangeEvent.Subscribed, ['1', '2']);
    client.fire(CardExchangeEvent.Unsubscribed, 'jeah');
    client.fire(CardExchangeEvent.Updated, ['3', '4', '5']);
    client.fire(CardExchangeEvent.CardExchangeRequested, '123', 'Optimus');
    client.fire(CardExchangeEvent.WaitingForAcceptance, '234');
    client.fire(CardExchangeEvent.CardExchangeAccepted, '234', 'Bumblebee', 'DATA2');
    client.fire(CardExchangeEvent.AcceptanceSent, 'Jeah!');
    client.fire(CardExchangeEvent.CardDataReceived, '123', 'Optimus', "DATA1");
    client.fire(CardExchangeEvent.CardDataSent, "234");

    client.Hub.Subscribe('1001', 1, 0, 'Optimus Prime');
    client.Hub.Unsubcribe('100');
    client.Hub.Update('123', 2, 3, 'Bumblebee');
    client.Hub.RequestCardExchange('123', '1001', 'Wheeljack');
    client.Hub.AcceptCardExchange('123', '1001', 'Jazz', 'DATA');
    client.Hub.SendCardData('123', '1001', 'Ironhide', 'DATA');
  }
}
