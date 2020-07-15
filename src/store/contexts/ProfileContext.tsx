import React, { useReducer } from 'react';
import * as ProfileReducer from '../reducers/ProfileReducer';

const ProfileContext = React.createContext(ProfileReducer.initialState);
const DispatchProfileContext = React.createContext<React.Dispatch<ProfileReducer.IAction>>(() => {});

interface IProps {
  children: React.ReactNode;
}

export const ProfileContextProvider = (props: IProps) => {
  const [stateProfiles, dispatchProfile] = useReducer(ProfileReducer.ProfileReducer, ProfileReducer.initialState);

  return (
    <ProfileContext.Provider value={stateProfiles}>
      <DispatchProfileContext.Provider value={dispatchProfile}>{props.children}</DispatchProfileContext.Provider>
    </ProfileContext.Provider>
  );
};

export const useProfileContext = () => {
  return {
    profileContext: React.useContext(ProfileContext),
    dispatchProfileContext: React.useContext(DispatchProfileContext),
  };
};
