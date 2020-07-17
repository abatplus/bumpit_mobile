import SwapState from "../enums/SwapState";

export default interface ISwapListEntry {
    deviceId: string;
    name: string;
    state: SwapState;
}