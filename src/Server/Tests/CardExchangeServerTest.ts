import { MockCardExchangeClient } from './MockCardExchangeClient';
import CardExchangeServer from '../CardExchangeServer';

export class CardExchangeServerTest {
  constructor() {
    // this.testServer();
    this.testMultipleInstances();
  }

  sleep = (seconds: number) => new Promise(resolve => setTimeout(resolve, seconds * 1000));

  testServer = () => {
    const server = new CardExchangeServer(new MockCardExchangeClient());

    server.Hub.Subscribe('1001', 1, 0, 'Optimus Prime')
      .then(_ => server.Hub.Unsubcribe('100'))
      .then(_ => server.Hub.Update('123', 2, 3, 'Bumblebee'))
      .then(_ => server.Hub.RequestCardExchange('123', '1001', 'Wheeljack'))
      .then(_ => server.Hub.RevokeCardExchangeRequest('123', '1001'))
      .then(_ => server.Hub.AcceptCardExchange('123', '1001', 'Jazz', 'DATA'))
      .then(_ => server.Hub.SendCardData('123', '1001', 'Ironhide', 'DATA'));
  }

  testMultipleInstances = () => {
    const optimus = new CardExchangeServer(new MockCardExchangeClient('OPTIMUS'));
    const megatron = new CardExchangeServer(new MockCardExchangeClient('MEGATRON'));

    optimus.Hub.Subscribe('1111', 0, 0, 'Optimus Prime').then(_ => this.sleep(1))
      .then(_ => megatron.Hub.Subscribe('2222', 0, 0, 'Megatron')).then(_ => this.sleep(1))
      .then(_ => optimus.Hub.Update('1111', 0.1, 0.1, 'Optimus')).then(_ => this.sleep(1))
      .then(_ => megatron.Hub.Unsubcribe('2222')).then(_ => this.sleep(1))
      .then(_ => optimus.Hub.Update('1111', 0.2, 0.2, 'Optimus')).then(_ => this.sleep(1))
      .then(_ => megatron.Hub.Subscribe('3333', 0, 0, 'Galvatron')).then(_ => this.sleep(1))
      .then(_ => optimus.Hub.Update('1111', 0.3, 0.3, 'Optimus')).then(_ => this.sleep(1))
      .then(_ => console.log('END LIFECYCLE / START EXCHANGE')).then(_ => this.sleep(1))
      .then(_ => optimus.Hub.RequestCardExchange('1111', '3333', 'Optimus Prime(1)')).then(_ => this.sleep(1))
      .then(_ => optimus.Hub.RevokeCardExchangeRequest('1111', '3333')).then(_ => this.sleep(1))
      .then(_ => optimus.Hub.RequestCardExchange('1111', '3333', 'Optimus Prime(2)')).then(_ => this.sleep(1))
      .then(_ => megatron.Hub.AcceptCardExchange('1111', '3333', 'Galvatronus', 'Decepticons')).then(_ => this.sleep(1))
      .then(_ => optimus.Hub.SendCardData('1111', '3333', 'Optimus Prime', 'Autobots'))
  }
}
