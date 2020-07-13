import * as Actions from '../actions/actions';
import { ActionTypes } from '../actions/vCardActions';
import { storeVCardData } from '../dataApi';

export interface IVCard {
  name?: IVCardField;
  surname?: IVCardField;
  nickname?: IVCardField;
  street?: IVCardField;
  location?: IVCardField;
  country?: IVCardField;
  postalcode?: IVCardField;
  tel?: IVCardField;
  companyTel?: IVCardField;
  email?: IVCardField;
  company?: IVCardField;
}

export interface IVCardField {
  value: string;
  share: boolean;
}

export interface IVCardFieldKeyValuePair {
  key: keyof IVCard;
  value: string | boolean;
}

export type IActionPayload = IVCard | IVCardFieldKeyValuePair;

export interface IAction {
  type: ActionTypes;
  payload?: IActionPayload;
}

export const initialState: IVCard = {};

export const VCardReducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case Actions.VCard.ActionTypes.SET_VCARD_DATA:
      // update complete vcard data
      const vCard = {
        ...initialState,
        ...action.payload,
      };
      (async () => await storeVCardData(vCard))();
      return vCard;

    case Actions.VCard.ActionTypes.SET_VCARD_DATA_FIELD:
      const kvPairField = action.payload as IVCardFieldKeyValuePair;
      const vCardWithNewFieldValue = {
        ...state,
        [kvPairField.key]: {
          ...state[kvPairField.key],
          value: kvPairField.value,
        },
      };
      (async () => await storeVCardData(vCardWithNewFieldValue))();
      return vCardWithNewFieldValue;

    case Actions.VCard.ActionTypes.SET_VCARD_DATA_FIELD_SHARE:
      const kvPairShare = action.payload as IVCardFieldKeyValuePair;
      const vCardWithNewFieldShare = {
        ...state,
        [kvPairShare.key]: {
          ...state[kvPairShare.key],
          share: kvPairShare.value,
        },
      };
      (async () => await storeVCardData(vCardWithNewFieldShare))();
      return vCardWithNewFieldShare;

    default:
      return state;
  }
};
