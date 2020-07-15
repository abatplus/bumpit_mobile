export class MockCardExchangeHub {

  constructor() {
  }

  public Subscribe = async (deviceId: string, longitude: number, latitude: number, displayName: string) => {
    console.log('SERVER | ' + deviceId + ' | Subscribe');
  };
  public Unsubcribe = async (deviceId: string) => {
    console.log('SERVER | ' + deviceId + ' | Unsubcribe');
  };
  public Update = async (deviceId: string, longitude: number, latitude: number, displayName: string) => {
    console.log('SERVER | ' + deviceId + ' | Update');
  };
  public RequestCardExchange = async (deviceId: string, peerDeviceId: string, displayName: string) => {
    console.log('SERVER | ' + deviceId + ' | RequestCardExchange');
  };
  public AcceptCardExchange = async (deviceId: string, peerDeviceId: string, displayName: string, cardData: string) => {
    console.log('SERVER | ' + deviceId + ' | AcceptCardExchange');
  };
  public SendCardData = async (deviceId: string, peerDeviceId: string, displayName: string, cardData: string) => {
    console.log('SERVER | ' + deviceId + ' | SendCardData');
  };
}
