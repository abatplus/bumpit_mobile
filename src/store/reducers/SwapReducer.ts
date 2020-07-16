import * as Actions from '../actions/actions';
import { ActionTypes } from '../actions/swapActions';
import ISwapListEntry from '../../interfaces/ISwapListEntry';
import SwapState from '../../enums/SwapState';

export interface IAction {
  type: ActionTypes;
  payload?: ISwapListEntry[] | string;
}

export const initialState: ISwapListEntry[] = [];

export const SwapReducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case Actions.Swap.ActionTypes.UPDATE_LIST:
        // copy the old list items SwapState if the entry is still available in the updated list
        const jsonArr = action.payload as ISwapListEntry[];
        jsonArr.forEach( newItem => {
            const index = state.findIndex( oldItem => oldItem.deviceId === newItem.deviceId );
            if ( index !== -1 ) {
                newItem.state = state[index].state;
            }
        });
        jsonArr.sort(function(a, b){
            if(a.name.toUpperCase() < b.name.toUpperCase()) { return -1; }
            if(a.name.toUpperCase() > b.name.toUpperCase()) { return 1; }
            return 0;
        });
        return jsonArr;

    case Actions.Swap.ActionTypes.SEND_REQUEST:
        // update entry in list
        const index = state.findIndex( item => item.deviceId === action.payload );
        if ( index === -1 )
            return state;

        const updatedItem: ISwapListEntry = {
            ...state[index],
            state: SwapState.requested
        }
        let newList = state.filter( item => item.deviceId !== action.payload);
        newList.push(updatedItem);
        newList.sort(function(a, b){ // reorder so that the old element won't be shown on the bottom of the list now
            if(a.name.toUpperCase() < b.name.toUpperCase()) { return -1; }
            if(a.name.toUpperCase() > b.name.toUpperCase()) { return 1; }
            return 0;
        });
        return newList;

        case Actions.Swap.ActionTypes.RECEIVE_REQUEST:
            // update entry in list
            const index3 = state.findIndex( item => item.deviceId === action.payload );
            if ( index3 === -1 )
                return state;
    
            const updatedItem3: ISwapListEntry = {
                ...state[index3],
                state: SwapState.received
            }
            let newList3 = state.filter( item => item.deviceId !== action.payload);
            newList3.push(updatedItem3);
            newList3.sort(function(a, b){ // reorder so that the old element won't be shown on the bottom of the list now
                if(a.name.toUpperCase() < b.name.toUpperCase()) { return -1; }
                if(a.name.toUpperCase() > b.name.toUpperCase()) { return 1; }
                return 0;
            });
            return newList3;

    case Actions.Swap.ActionTypes.RECEIVE_ACCEPT_REQUEST:
        // update entry in list
        const index2 = state.findIndex( item => item.deviceId === action.payload );
        if ( index2 === -1 )
            return state;

        const updatedItem2: ISwapListEntry = {
            ...state[index2],
            state: SwapState.exchanged
        }
        let newList2 = state.filter( item => item.deviceId !== action.payload);
        newList2.push(updatedItem2);
        newList2.sort(function(a, b){ // reorder so that the old element won't be shown on the bottom of the list now
            if(a.name.toUpperCase() < b.name.toUpperCase()) { return -1; }
            if(a.name.toUpperCase() > b.name.toUpperCase()) { return 1; }
            return 0;
        });
        return newList2;
  
    default:
      return state;
  }
};
