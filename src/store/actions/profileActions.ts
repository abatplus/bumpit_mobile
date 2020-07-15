import IProfile from '../../interfaces/IProfile';
import { IVCard } from '../../interfaces/IVCard';

export enum ActionTypes {
  SET_LOADING = 'SET_LOADING',
  SET_PROFILES = 'SET_PROFILES',
  ADD_PROFILE = 'ADD_PROFILE',
  REMOVE_PROFILE = 'REMOVE_PROFILE',
  UPDATE_PROFILE = 'UPDATE_PROFILE',
}

export const setProfiles = (profiles: IProfile[]) => {
  return {
    type: ActionTypes.SET_PROFILES,
    payload: profiles,
  };
};

export const setProfileVCardDataField = (profileId: string, profileName: string, fieldName: keyof IVCard, fieldValue: string) => {
  return {
    type: ActionTypes.UPDATE_PROFILE,
    payload: {
      id: profileId,
      profileName,
      fieldName,
      fieldValue,
    },
  };
};

export const setProfileLoading = (isLoading: boolean) => {
  return {
    type: ActionTypes.SET_LOADING,
    payload: isLoading,
  };
};

export const addNewProfile = (newProfile: IProfile) => {
  return {
    type: ActionTypes.ADD_PROFILE,
    payload: newProfile,
  };
};

export const removeProfile = (profileId: string) => {
  return {
    type: ActionTypes.REMOVE_PROFILE,
    payload: profileId,
  };
};
