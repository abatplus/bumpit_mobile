import * as Actions from '../actions/actions';
import { ActionTypes } from '../actions/vCardActions';

export interface IVCard {
    name?: IVCardField;
    surname?: IVCardField;
    nickname?: IVCardField;
    street?: IVCardField;
    location?: IVCardField;
    country?: IVCardField;
    postalcode?: IVCardField;
    tel?: IVCardField;
    companyTel?: IVCardField
    email?: IVCardField;
    company?: IVCardField;
}

export interface IVCardField {
    value: string;
    share: boolean
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
            // update vcard data
            const vCard = action.payload;
            return {
                ...state,
                ...vCard
            };

        case Actions.VCard.ActionTypes.SET_VCARD_DATA_FIELD:
            const kvPairField = action.payload as IVCardFieldKeyValuePair;
            return {
                ...state,
                [kvPairField.key]: {
                    ...state[kvPairField.key],
                    value: kvPairField.value
                }
            };

        case Actions.VCard.ActionTypes.SET_VCARD_DATA_FIELD_SHARE:
            const kvPairShare = action.payload as IVCardFieldKeyValuePair;
            return {
                ...state,
                [kvPairShare.key]: {
                    ...state[kvPairShare.key],
                    share: kvPairShare.value
                }
            };

        default:
            return state;
    }
}