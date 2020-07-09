import { IVCard } from '../reducers/VCardReducer';

export enum ActionTypes {
    SET_VCARD_DATA = 'SET_VCARD_DATA',
    SET_VCARD_DATA_FIELD = 'SET_VCARD_DATA_FIELD',
    SET_VCARD_DATA_FIELD_SHARE = 'SET_VCARD_DATA_FIELD_SHARE',
};

export const setVCardData = (vCard: IVCard) => {
    return {
        type: ActionTypes.SET_VCARD_DATA,
        payload: vCard
    }
};

export const setVCardDataField = (fieldName: keyof IVCard, fieldValue: string) => {
    return {
      type: ActionTypes.SET_VCARD_DATA_FIELD,
      payload: {
          key: fieldName, 
          value: fieldValue
      }
    };
  
};
  
export const setVCardDataFieldShare = (fieldName : keyof IVCard, share: boolean) => {
    return {
      type: ActionTypes.SET_VCARD_DATA_FIELD_SHARE,
      payload: {
          key: fieldName, 
          value: share
      }
    };
};
