import * as Actions from '../actions/actions';
import { ActionTypes, getProfiles } from '../actions/profileActions';
import IProfile from '../../interfaces/IProfile';
import { getProfileData } from '../dataApi';

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
      return {
        ...state,
        profiles: action.payload,
      };
    }
    case Actions.Profile.ActionTypes.ADD_PROFILE:
      return {
        ...state,
        profiles: [...state.profiles, action.payload],
      };
    case Actions.Profile.ActionTypes.UPDATE_PROFILE:
      return {
        ...state,
        profiles: [...state.profiles, action.payload],
      };
    case Actions.Profile.ActionTypes.GET_PROFILES:
      (async () => await getProfileData())().then((res) => {
        console.log('Action');
        console.log(res);

        return {
          ...state,
          isLoading: false,
          profiles: res,
        };
      });
    case Actions.Profile.ActionTypes.REMOVE_PROFILE:
      const currentProfiles = state.profiles;
      const indexOfProfileToRemove = state.profiles.findIndex((x) => x.id === action.payload);
      currentProfiles.splice(indexOfProfileToRemove, 1);
      return {
        ...state,
        profiles: currentProfiles,
      };
    case Actions.Profile.ActionTypes.SET_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    default:
      return state;
  }
};

// (async () => await storeProfileData(vCardWithNewFieldValue))();
