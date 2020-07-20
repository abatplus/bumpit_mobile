import * as signalR from '@microsoft/signalr';
import { ICardExchangeHub } from './ICardExchangeHub';

export enum CardExchangeHubMethod {
  Subscribe = 'Subscribe',
  Unsubcribe = 'Unsubcribe',
  Update = 'Update',

  RequestCardExchange = 'RequestCardExchange',
  RevokeCardExchangeRequest = 'RevokeCardExchangeRequest',
  AcceptCardExchange = 'AcceptCardExchange',
  SendCardData = 'SendCardData',
}

export class CardExchangeHub implements ICardExchangeHub {
  connection: signalR.HubConnection;

  constructor(connection: signalR.HubConnection) {
    this.connection = connection;
  }

  // TODO test if it needs further transaction handling
  transaction = async (func: () => Promise<void>) =>
    this.connection.state !== signalR.HubConnectionState.Connected
      ?
      await this.connection.start().then(func)
      :
      await func();

  send = async (methodName: CardExchangeHubMethod, ...args: any[]) =>
    await this.transaction(() => this.connection.send(methodName, ...args));


  public Subscribe = async (deviceId: string, longitude: number, latitude: number, displayName: string) =>
    await this.send(CardExchangeHubMethod.Subscribe, deviceId, longitude, latitude, displayName);

  public Unsubcribe = async (deviceId: string) =>
    await this.send(CardExchangeHubMethod.Unsubcribe, deviceId);

  public Update = async (deviceId: string, longitude: number, latitude: number, displayName: string) =>
    await this.send(CardExchangeHubMethod.Update, deviceId, longitude, latitude, displayName);


  public RequestCardExchange = async (deviceId: string, peerDeviceId: string, displayName: string) =>
    await this.send(CardExchangeHubMethod.RequestCardExchange, deviceId, peerDeviceId, displayName);

  public RevokeCardExchangeRequest = async (deviceId: string, peerDeviceId: string) =>
    await this.send(CardExchangeHubMethod.RevokeCardExchangeRequest, deviceId, peerDeviceId);

  public AcceptCardExchange = async (deviceId: string, peerDeviceId: string, peerDisplayName: string, peerCardData: string) =>
    await this.send(CardExchangeHubMethod.AcceptCardExchange, deviceId, peerDeviceId, peerDisplayName, peerCardData);

  public SendCardData = async (deviceId: string, peerDeviceId: string, displayName: string, cardData: string) =>
    await this.send(CardExchangeHubMethod.SendCardData, deviceId, peerDeviceId, displayName, cardData);

}
