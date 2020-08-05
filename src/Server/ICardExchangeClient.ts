// interface to signalR server. don't change without server changes!
export interface ICardExchangeClient {
  subscribed: (peers: string[]) => void;
  unsubscribed: (statusMessage: string) => void;
  updated: (peers: string[]) => void;

  cardExchangeRequested: (deviceId: string, displayName: string, image: string) => void;
  waitingForAcceptance: (peerDeviceId: string) => void;

  cardExchangeRequestRevoked: (deviceId: string) => void;
  revokeSent: (peerDeviceId: string) => void;

  cardExchangeAccepted: (peerDeviceId: string, peerDisplayName: string, peerCardData: string, peerImage: string) => void;
  acceptanceSent: (deviceId: string) => void;

  cardDataReceived: (deviceId: string, displayName: string, cardData: string, image: string) => void;
  cardDataSent: (peerDeviceId: string) => void;
}
