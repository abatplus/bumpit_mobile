import * as Actions from '../actions/actions';
import { ActionTypes } from '../actions/vCardActions';
import { storeVCardData } from '../dataApi';
import { IVCard } from '../../interfaces/IVCard';

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
          value: kvPairField.value,
        },
      };
      (async () => await storeVCardData(vCardWithNewFieldValue))();
      return vCardWithNewFieldValue;
    default:
      return state;
  }
};
