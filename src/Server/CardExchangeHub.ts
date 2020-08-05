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
    transaction = async (func: () => Promise<void>) => {
        if (
            this.connection.state !== signalR.HubConnectionState.Connected &&
            this.connection.state !== signalR.HubConnectionState.Connecting &&
            this.connection.state !== signalR.HubConnectionState.Reconnecting
        ) {
            await this.connection.start();
        }

        while (
            this.connection.state === signalR.HubConnectionState.Connecting ||
            this.connection.state === signalR.HubConnectionState.Reconnecting
        ) {
            await new Promise((resolve) => setTimeout(() => resolve, 50));
        }

        await func();
    };

    send = async (methodName: CardExchangeHubMethod, ...args: any[]) =>
        await this.transaction(() => this.connection.send(methodName, ...args));

    public Subscribe = async (
        deviceId: string,
        longitude: number,
        latitude: number,
        displayName: string,
        image: string
    ) => await this.send(CardExchangeHubMethod.Subscribe, deviceId, longitude, latitude, displayName, image);

    public Unsubcribe = async (deviceId: string) => {
        await this.send(CardExchangeHubMethod.Unsubcribe, deviceId);
        await this.connection.stop();
    };

    public Update = async (deviceId: string, longitude: number, latitude: number, displayName: string) =>
        await this.send(CardExchangeHubMethod.Update, deviceId, longitude, latitude, displayName);

    public RequestCardExchange = async (deviceId: string, peerDeviceId: string, displayName: string) =>
        await this.send(CardExchangeHubMethod.RequestCardExchange, deviceId, peerDeviceId, displayName);

    public RevokeCardExchangeRequest = async (deviceId: string, peerDeviceId: string) =>
        await this.send(CardExchangeHubMethod.RevokeCardExchangeRequest, deviceId, peerDeviceId);

    public AcceptCardExchange = async (
        deviceId: string,
        peerDeviceId: string,
        peerDisplayName: string,
        peerCardData: string
    ) =>
        await this.send(
            CardExchangeHubMethod.AcceptCardExchange,
            deviceId,
            peerDeviceId,
            peerDisplayName,
            peerCardData
        );

    public SendCardData = async (deviceId: string, peerDeviceId: string, displayName: string, cardData: string) =>
        await this.send(CardExchangeHubMethod.SendCardData, deviceId, peerDeviceId, displayName, cardData);
}
