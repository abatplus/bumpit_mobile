import { getAppData, setVcardData } from '../dataApi';
import { ActionType } from '../types';
import { CardDataState } from '../state';
import { Vcard } from '../../models/Vcard';

export const loadCardData = () => async (dispatch: React.Dispatch<any>) => {
  dispatch(setLoading(true));
  const data = await getAppData();
  dispatch(setData(data));
  dispatch(setLoading(false));
}

export const setLoading = (isLoading: boolean) => ({
  type: 'set-card-loading',
  isLoading
} as const);

export const setData = (data: Partial<CardDataState>) => ({
  type: 'set-card-data',
  data
} as const);

export const setMenuEnabled = (menuEnabled: boolean) => ({
  type: 'set-menu-enabled',
  menuEnabled
} as const);

export const setCardDataField = (fieldName: keyof Vcard, fieldValue: any, vcard: Vcard) => async (dispatch: React.Dispatch<any>) => {

  if (vcard[fieldName].value != fieldValue) {
    vcard[fieldName].value = fieldValue;
    // TODO handle error
    await setVcardData(vcard);
  }
  return ({
    type: 'set-card-data-field',
    field: fieldName, value: fieldValue
  } as const);

};

export const setCardDataFieldShare = (fieldName : keyof Vcard, share: boolean, vcard: Vcard) => async (dispatch: React.Dispatch<any>) => {
  vcard[fieldName].share = share;
  // TODO handle error
  await setVcardData(vcard);
  return ({
    type: 'set-card-data-field-share',
    field: fieldName, value: share
  } as const);
};

export type CardActions =
  | ActionType<typeof setLoading>
  | ActionType<typeof setData>
  | ActionType<typeof setMenuEnabled>
  | ActionType<typeof setCardDataField>
  | ActionType<typeof setCardDataFieldShare>
