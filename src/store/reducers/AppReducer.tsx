import * as Actions from '../actions/actions';
import { ActionTypes } from '../actions/appActions';

export interface IAppState {
    isLoading: boolean;
    menuEnabled: boolean;
}

export interface IAction {
    type: ActionTypes;
    payload?: any;
}

export const initialState: IAppState = {
    isLoading: false,
    menuEnabled: true
};

export const AppReducer = (state = initialState, action: IAction) => {
    switch (action.type) {
        case Actions.App.ActionTypes.SET_LOADING:
            return {
                ...state,
                isLoading: action.payload
            }
        case Actions.App.ActionTypes.MENU_ENABLED:
            return {
                ...state,
                menuEnabled: action.payload
            }
        default:
            return state;
    }
}