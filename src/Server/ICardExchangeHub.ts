export interface ICardExchangeHub {
  Subscribe: (deviceId: string, longitude: number, latitude: number, displayName: string) => Promise<void>;
  Unsubcribe: (deviceId: string) => Promise<void>;
  Update: (deviceId: string, longitude: number, latitude: number, displayName: string) => Promise<void>;

  RequestCardExchange: (deviceId: string, peerDeviceId: string, displayName: string) => Promise<void>;
  RevokeCardExchangeRequest: (deviceId: string, peerDeviceId: string) => Promise<void>;
  AcceptCardExchange: (deviceId: string, peerDeviceId: string, displayName: string, cardData: string) => Promise<void>;
  SendCardData: (deviceId: string, peerDeviceId: string, displayName: string, cardData: string) => Promise<void>;
}
