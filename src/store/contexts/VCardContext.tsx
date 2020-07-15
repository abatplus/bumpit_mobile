import React, { useReducer } from 'react';
import * as VCardReducer from '../reducers/VCardReducer';

const VCardContext = React.createContext(VCardReducer.initialState);
const DispatchVCardContext = React.createContext<React.Dispatch<VCardReducer.IAction>>(() => {});

interface IProps {
  children: React.ReactNode;
}

export const VCardProvider = (props: IProps) => {
  const [stateVCard, dispatchVCard] = useReducer(VCardReducer.VCardReducer, VCardReducer.initialState);

  return (
    <VCardContext.Provider value={stateVCard}>
      <DispatchVCardContext.Provider value={dispatchVCard}>{props.children}</DispatchVCardContext.Provider>
    </VCardContext.Provider>
  );
};

export const useVCard = () => {
  return {
    vCard: React.useContext(VCardContext),
    dispatchVCard: React.useContext(DispatchVCardContext),
  };
};
