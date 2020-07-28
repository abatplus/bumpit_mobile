import SwapState from '../enums/SwapState';

export default interface ISwapListEntry {
  deviceId: string;
  displayName: string;
  state: SwapState;
  online: boolean;
}
