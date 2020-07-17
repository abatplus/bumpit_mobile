import { MockCompleteServer } from './MockCompleteServer';
import { CardExchangeEvent } from '../CardExchangeEvents';
import { MockCardExchangeClient } from './MockCardExchangeClient';

export class MockServerTest {
  constructor() {
    const server = new MockCompleteServer(new MockCardExchangeClient());

    server.fire(CardExchangeEvent.Subscribed, ['1', '2']);
    server.fire(CardExchangeEvent.Unsubscribed, 'jeah');
    server.fire(CardExchangeEvent.Updated, ['3', '4', '5']);

    server.fire(CardExchangeEvent.CardExchangeRequested, '123', 'Optimus');
    server.fire(CardExchangeEvent.WaitingForAcceptance, '234');

    server.fire(CardExchangeEvent.CardExchangeRequestRevoked, '123');
    server.fire(CardExchangeEvent.RevokeSent, '234');

    server.fire(CardExchangeEvent.CardExchangeAccepted, '234', 'Bumblebee', 'DATA2');
    server.fire(CardExchangeEvent.AcceptanceSent, 'Jeah!');

    server.fire(CardExchangeEvent.CardDataReceived, '123', 'Optimus', "DATA1");
    server.fire(CardExchangeEvent.CardDataSent, "234");

    server.Hub.Subscribe('1001', 1, 0, 'Optimus Prime');
    server.Hub.Unsubcribe('100');
    server.Hub.Update('123', 2, 3, 'Bumblebee');

    server.Hub.RequestCardExchange('123', '1001', 'Wheeljack');
    server.Hub.RevokeCardExchangeRequest('123', '1001');
    server.Hub.AcceptCardExchange('123', '1001', 'Jazz', 'DATA');
    server.Hub.SendCardData('123', '1001', 'Ironhide', 'DATA');
  }
}
