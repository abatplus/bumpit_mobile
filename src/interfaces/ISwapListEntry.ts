import SwapState from '../enums/SwapState';

export default interface ISwapListEntry {
  imgSource: string;
  deviceId: string;
  displayName: string;
  state: SwapState;
  online: boolean;
}
