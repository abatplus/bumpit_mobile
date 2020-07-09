// import { IAppState } from "../reducers/AppReducer";

export enum ActionTypes {
    SET_LOADING = 'SET_LOADING'
};

export const setLoading = (isLoading: boolean) => {
    return {
        type: ActionTypes.SET_LOADING,
        payload: isLoading
    }
};

