import ISwapListEntry from '../../interfaces/ISwapListEntry';

export enum ActionTypes {
  UPDATE_LIST = 'UPDATE_LIST',
  SEND_REQUEST = 'SEND_REQUEST',
  RECEIVE_REQUEST = 'RECEIVE_REQUEST',
  SEND_ACCEPT_REQUEST = 'SEND_ACCEPT_REQUEST',
  RECEIVE_ACCEPT_REQUEST = 'RECEIVE_ACCEPT_REQUEST',
  SEND_ABORT_REQUEST = 'SEND_ABORT_REQUEST',
  RECEIVE_ABORT_REQUEST = 'RECEIVE_ABORT_REQUEST',
}

export const updateList = (list: ISwapListEntry[]) => {
  return {
    type: ActionTypes.UPDATE_LIST,
    payload: list,
  };
};

export const sendRequest = (deviceId: string) => {
  return {
    type: ActionTypes.SEND_REQUEST,
    payload: deviceId,
  };
};

export const receiveRequest = (deviceId: string) => {
  return {
    type: ActionTypes.RECEIVE_REQUEST,
    payload: deviceId,
  };
};

export const sendAcceptRequest = (deviceId: string) => {
  return {
    type: ActionTypes.SEND_ACCEPT_REQUEST,
    payload: deviceId,
  };
};

export const receiveAcceptRequest = (deviceId: string) => {
  return {
    type: ActionTypes.RECEIVE_ACCEPT_REQUEST,
    payload: deviceId,
  };
};

export const sendAbortRequest = (deviceId: string) => {
  return {
    type: ActionTypes.SEND_ABORT_REQUEST,
    payload: deviceId,
  };
};

export const receiveAbortRequest = (deviceId: string) => {
  return {
    type: ActionTypes.RECEIVE_ABORT_REQUEST,
    payload: deviceId,
  };
};
