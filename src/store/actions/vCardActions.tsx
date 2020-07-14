import { IVCard } from '../reducers/VCardReducer';

export enum ActionTypes {
  SET_VCARD_DATA = 'SET_VCARD_DATA',
  SET_VCARD_DATA_FIELD = 'SET_VCARD_DATA_FIELD',
}

export const setVCardData = (vCard: IVCard) => {
  return {
    type: ActionTypes.SET_VCARD_DATA,
    payload: vCard,
  };
};

export const setVCardDataField = (fieldName: keyof IVCard, fieldValue: string) => {
  return {
    type: ActionTypes.SET_VCARD_DATA_FIELD,
    payload: {
      key: fieldName,
      value: fieldValue,
    },
  };
};
