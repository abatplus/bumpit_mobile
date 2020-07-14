import * as Actions from '../actions/actions';
import { ActionTypes } from '../actions/profileActions';
import IProfile from '../../interfaces/IProfile';
import { storeProfileData } from '../dataApi';

export interface IProfileState {
  isLoading: boolean;
  profiles: IProfile[];
}

export interface IAction {
  type: ActionTypes;
  payload?: any;
}

export const initialState: IProfileState = {
  isLoading: false,
  profiles: [],
};

export const ProfileReducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case Actions.Profile.ActionTypes.SET_PROFILES: {
      (async () => await storeProfileData(action.payload))();
      return {
        ...state,
        profiles: action.payload,
      };
    }
    case Actions.Profile.ActionTypes.ADD_PROFILE:
      const afterAdd = [...state.profiles, action.payload];
      (async () => await storeProfileData(afterAdd))();
      return {
        ...state,
        profiles: afterAdd,
      };
    case Actions.Profile.ActionTypes.UPDATE_PROFILE:
      const indexToUpdate = state.profiles.findIndex((x) => x.id === action.payload);
      const profiles = [...state.profiles.splice(indexToUpdate, 1), action.payload];
      (async () => await storeProfileData(profiles))();

      return {
        ...state,
        profiles: [profiles],
      };
    case Actions.Profile.ActionTypes.REMOVE_PROFILE:
      const currentProfiles = state.profiles;
      const indexOfProfileToRemove = state.profiles.findIndex((x) => x.id === action.payload);
      const afterRemove = currentProfiles.splice(indexOfProfileToRemove, 1);
      (async () => await storeProfileData(afterRemove))();
      return {
        ...state,
        profiles: afterRemove,
      };
    case Actions.Profile.ActionTypes.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
};

// (async () => await storeProfileData(vCardWithNewFieldValue))();
