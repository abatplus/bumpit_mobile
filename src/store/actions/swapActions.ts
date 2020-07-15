import ISwapListEntry from '../../interfaces/ISwapListEntry';

export enum ActionTypes {
  UPDATE_LIST = 'UPDATE_LIST',
  SEND_REQUEST = 'SEND_REQUEST',
  ABORT_REQUEST = 'ABORT_REQUEST',
  RECEIVE_REQUEST = 'RECEIVE_REQUEST',
  ACCEPT_REQUEST = 'ACCEPT_REQUEST',
  RECEIVE_ACCEPT = 'RECEIVE_ACCEPT'
}

export const updateList = (list: ISwapListEntry[]) => {
  return {
    type: ActionTypes.UPDATE_LIST,
    payload: list
  };
};

export const sendRequest = (deviceId: string) => {
  return {
    type: ActionTypes.SEND_REQUEST,
    payload: deviceId
  };
};

export const receiveRequest = (deviceId: string) => {
  return {
    type: ActionTypes.RECEIVE_REQUEST,
    payload: deviceId
  };
};

export const abortRequest = (deviceId: string) => {
  return {
    type: ActionTypes.ABORT_REQUEST,
    payload: deviceId
  };
};

export const acceptRequest = (deviceId: string) => {
  return {
    type: ActionTypes.ACCEPT_REQUEST,
    payload: deviceId
  };
};

export const receiveAccept = (deviceId: string) => {
  return {
    type: ActionTypes.RECEIVE_ACCEPT,
    payload: deviceId
  };
};