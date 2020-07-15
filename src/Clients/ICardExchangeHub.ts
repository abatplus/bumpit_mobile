export interface ICardExchangeHub {
  Subscribe: (deviceId: string, longitude: number, latitude: number, displayName: string) => void;
  Unsubcribe: (deviceId: string) => void;
  Update: (deviceId: string, longitude: number, latitude: number, displayName: string) => void;
  RequestCardExchange: (deviceId: string, peerDeviceId: string, displayName: string) => void;
  AcceptCardExchange: (deviceId: string, peerDeviceId: string, displayName: string, cardData: string) => void;
  SendCardData: (deviceId: string, peerDeviceId: string, displayName: string, cardData: string) => void;
}
