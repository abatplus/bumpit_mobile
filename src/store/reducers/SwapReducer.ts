import * as Actions from '../actions/actions';
import { ActionTypes } from '../actions/swapActions';
import ISwapListEntry from '../../interfaces/ISwapListEntry';
import SwapState from '../../enums/SwapState';

export interface IAction {
  type: ActionTypes;
  payload?: ISwapListEntry[] | string;
}

/**
 * Compares two ISwapListEntries and returns a number depending on the compare result to sort a list of ISwapListEntries.
 * Reorder so that the old element won't be shown on the bottom of the list.
 * @param a ISwapListEntry to compare
 * @param b ISwapListEntry to compare
 */
const swapListEntrySort = (a: ISwapListEntry, b: ISwapListEntry) => {
  if (a.name.toUpperCase() < b.name.toUpperCase()) {
    return -1;
  }
  if (a.name.toUpperCase() > b.name.toUpperCase()) {
    return 1;
  }
  return 0;
};

export const SwapReducer = (state: ISwapListEntry[] = [], action: IAction) => {
  switch (action.type) {
    case Actions.Swap.ActionTypes.UPDATE_LIST: {
      // copy the old list items SwapState if the entry is still available in the updated list
      const newList = action.payload as ISwapListEntry[];
      newList.forEach((newItem) => {
        const index = state.findIndex((oldItem) => oldItem.deviceId === newItem.deviceId);
        if (index !== -1) {
          newItem.state = state[index].state;
        }
      });
      return newList.sort(swapListEntrySort);
    }
    case Actions.Swap.ActionTypes.SEND_REQUEST: {
      const indexOfEntry = state.findIndex((item) => item.deviceId === action.payload);
      if (indexOfEntry === -1) return state;

      state[indexOfEntry].state = SwapState.requested;
      return [...state];
    }
    case Actions.Swap.ActionTypes.RECEIVE_REQUEST: {
      const indexOfEntry = state.findIndex((item) => item.deviceId === action.payload);
      if (indexOfEntry === -1) return state;
      state[indexOfEntry].state = SwapState.received;
      return [...state];
    }
    case Actions.Swap.ActionTypes.RECEIVE_ACCEPT_REQUEST: {
      const indexOfEntry = state.findIndex((item) => item.deviceId === action.payload);
      if (indexOfEntry === -1) return state;

      state[indexOfEntry].state = SwapState.exchanged;
      return [...state];
    }
    case Actions.Swap.ActionTypes.RECEIVE_ABORT_REQUEST:
    case Actions.Swap.ActionTypes.SEND_ABORT_REQUEST: {
      const indexOfEntry = state.findIndex((item) => item.deviceId === action.payload);
      if (indexOfEntry === -1) return state;

      state[indexOfEntry].state = SwapState.initial;
      return [...state];
    }
    case Actions.Swap.ActionTypes.SEND_ACCEPT_REQUEST: {
      const indexOfEntry = state.findIndex((item) => item.deviceId === action.payload);
      if (indexOfEntry === -1) return state;

      state[indexOfEntry].state = SwapState.accepted;
      return [...state];
    }

    default:
      return state;
  }
};
