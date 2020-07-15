import * as Actions from '../actions/actions';
import { ActionTypes } from '../actions/profileActions';
import IProfile from '../../interfaces/IProfile';
import { storeProfileData } from '../dataApi';
import { IVCard } from '../../interfaces/IVCard';

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
        profiles: action.payload as IProfile[],
      };
    }
    case Actions.Profile.ActionTypes.ADD_PROFILE:
      const afterAdd = [...state.profiles, action.payload] as IProfile[];
      (async () => await storeProfileData(afterAdd))();
      return {
        ...state,
        profiles: afterAdd,
      };
    case Actions.Profile.ActionTypes.UPDATE_PROFILE:
      const payload = action.payload as { id: string; profileName: string; fieldName: keyof IVCard; fieldValue: string };

      const updateProfileIndex: number = state.profiles.findIndex((x) => x.id === payload.id);
      if (updateProfileIndex < 0) {
        return { ...state };
      }
      const updateProfile: IProfile = state.profiles[updateProfileIndex];

      updateProfile.vCard[payload.fieldName] = payload.fieldValue;
      state.profiles[updateProfileIndex] = updateProfile;

      const profiles = [...state.profiles];
      (async () => await storeProfileData(profiles))();

      return {
        ...state,
        profiles: profiles,
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
