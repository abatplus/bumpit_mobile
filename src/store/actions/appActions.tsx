// import { IAppState } from "../reducers/AppReducer";

export enum ActionTypes {
    SET_LOADING = 'SET_LOADING',
    MENU_ENABLED = 'MENU_ENABLED'
};

export const setLoading = (isLoading: boolean) => {
    return {
        type: ActionTypes.SET_LOADING,
        payload: isLoading
    }
};

export const setMenuEnabled = (menuEnabled: boolean) => {
    return {
        type: ActionTypes.MENU_ENABLED,
        payload: menuEnabled
    }
};

