import * as Actions from '../actions/actions';
import { ActionTypes } from '../actions/swapActions';
import ISwapListEntry from '../../interfaces/ISwapListEntry';
import SwapState from '../../enums/SwapState';

export interface IAction {
  type: ActionTypes;
  payload?: any;
}

export const initialState: ISwapListEntry[] = [
    {
        deviceId: '123',
        name: 'Arno Nühm',
        state: SwapState.initial
    },{
        deviceId: '456',
        name: 'Bea Trix',
        state: SwapState.received
    },{
        deviceId: '789',
        name: 'Lorette Mahr',
        state: SwapState.requested
    },{
        deviceId: 'abc',
        name: 'Wanda Lismus',
        state: SwapState.accepted
    },{
        deviceId: 'def',
        name: 'Al Coholik',
        state: SwapState.exchanged
    },
];

export const SwapReducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    // case Actions.Swap.ActionTypes.UPDATE_LIST:
    //     // copy the old list items SwapState if the entry is still available in the updated list
    //     (action.payload as ISwapListEntry[]).forEach( newItem => {
    //         const index = state.findIndex( oldItem => oldItem.deviceId === newItem.deviceId );
    //         if ( index !== -1 ) {
    //             newItem.state = state[index].state;
    //         }
    //     });
    //     return action.payload;

    // case Actions.Swap.ActionTypes.SEND_REQUEST:
    //     // update entry in list
    //     const index = state.findIndex( item => item.deviceId === action.payload );
    //     const updatedItem: ISwapListEntry = {
    //         ...state[index],
    //         state: SwapState.requested
    //     }
    //     let newList = state.filter( item => item.deviceId !== action.payload);
    //     newList.push(updatedItem);
    //     // TODO : Sort list by name
    //     return newList;
  
    default:
      return state;
  }
};
