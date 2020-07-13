import React, { useReducer } from 'react';
import * as AppReducer from '../reducers/AppReducer';

const AppContext = React.createContext(AppReducer.initialState);
const DispatchAppContext = React.createContext<React.Dispatch<AppReducer.IAction>>(() => {});

interface IProps {
  children: React.ReactNode;
}

export const AppContextProvider = (props: IProps) => {
  const [stateApp, dispatchApp] = useReducer(AppReducer.AppReducer, AppReducer.initialState);

  return (
    <AppContext.Provider value={stateApp}>
      <DispatchAppContext.Provider value={dispatchApp}>{props.children}</DispatchAppContext.Provider>
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return {
    appContext: React.useContext(AppContext),
    dispatchAppContext: React.useContext(DispatchAppContext),
  };
};
