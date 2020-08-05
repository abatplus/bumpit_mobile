import SwapState from '../enums/SwapState';

export default interface ISwapListEntry {
    thumbnailUrl: string;
    deviceId: string;
    displayName: string;
    state: SwapState;
    online: boolean;
}
