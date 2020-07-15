export class MockCardExchangeHub {

  constructor() {
  }

  public Subscribe = (deviceId: string, longitude: number, latitude: number, displayName: string) => {
    console.log('SERVER | ' + deviceId + ' | Subscribe');
  };
  public Unsubcribe = (deviceId: string) => {
    console.log('SERVER | ' + deviceId + ' | Unsubcribe');
  };
  public Update = (deviceId: string, longitude: number, latitude: number, displayName: string) => {
    console.log('SERVER | ' + deviceId + ' | Update');
  };
  public RequestCardExchange = (deviceId: string, peerDeviceId: string, displayName: string) => {
    console.log('SERVER | ' + deviceId + ' | RequestCardExchange');
  };
  public AcceptCardExchange = (deviceId: string, peerDeviceId: string, displayName: string, cardData: string) => {
    console.log('SERVER | ' + deviceId + ' | AcceptCardExchange');
  };
  public SendCardData = (deviceId: string, peerDeviceId: string, displayName: string, cardData: string) => {
    console.log('SERVER | ' + deviceId + ' | SendCardData');
  };
}
