import { MockCompleteServer } from './MockCompleteServer';
import { CardExchangeEvent } from '../CardExchangeEvents';
import { MockCardExchangeClient } from './MockCardExchangeClient';
import CardExchangeServer from '../CardExchangeServer';

export class CardExchangeServerTest {
  constructor() {
    const server = new CardExchangeServer(new MockCardExchangeClient());

    server.Hub.Subscribe('1001', 1, 0, 'Optimus Prime')
      .then(_ => server.Hub.Unsubcribe('100'))
      .then(_ => server.Hub.Update('123', 2, 3, 'Bumblebee'))
      .then(_ => server.Hub.RequestCardExchange('123', '1001', 'Wheeljack'))
      .then(_ => server.Hub.RevokeCardExchangeRequest('123', '1001'))
      .then(_ => server.Hub.AcceptCardExchange('123', '1001', 'Jazz', 'DATA'))
      .then(_ => server.Hub.SendCardData('123', '1001', 'Ironhide', 'DATA'));
  }
}
