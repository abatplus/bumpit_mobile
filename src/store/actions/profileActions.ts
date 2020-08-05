import IProfile from '../../interfaces/IProfile';
import { IVCard } from '../../interfaces/IVCard';

export enum ActionTypes {
  SET_LOADING = 'SET_LOADING',
  SET_PROFILES = 'SET_PROFILES',
  ADD_PROFILE = 'ADD_PROFILE',
  REMOVE_PROFILE = 'REMOVE_PROFILE',
  UPDATE_PROFILE = 'UPDATE_PROFILE',
  SET_PROFILE_NAME = 'SET_PROFILE_NAME',
  SET_PROFILE_IMAGE = 'SET_PROFILE_IMAGE',
  REMOVE_PROFILE_IMAGE = 'REMOVE_PROFILE_IMAGE'
}

export const setProfileName = (profileId: string, profileName: string) => {
  return {
    type: ActionTypes.SET_PROFILE_NAME,
    payload: {
      id: profileId,
      profileName,
    },
  };
};

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

export const setProfileImage = (profileId: string, base64Image: string) => {
  return {
    type: ActionTypes.SET_PROFILE_IMAGE,
    payload: {
      id: profileId,
      image: base64Image
    }
  };
};

export const removeProfileImage = (profileId: string) => {
  return {
    type: ActionTypes.REMOVE_PROFILE_IMAGE,
    payload: profileId,
  };
};
