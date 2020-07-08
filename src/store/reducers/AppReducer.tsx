import * as Actions from '../actions/actions';
import { ActionTypes } from '../actions/appActions';

export interface IAppState {
    isLoading: boolean;
}

export interface IAction {
    type: ActionTypes;
    payload?: any;
}

export const initialState: IAppState = {
    isLoading: false
};

export const AppReducer = (state = initialState, action: IAction) => {
    switch (action.type) {
        case Actions.App.ActionTypes.SET_LOADING :
            return {
                ...state,
                isLoading: action.payload
            }

        default:
            return state;
    }
}