import { cardReducer } from './card/card_reducer';
import { Vcard } from '../models/Vcard';

export interface CardDataState {
    vcard: Vcard;
    loading?: boolean;
    menuEnabled: boolean;
  }

export const initialState: AppState = {

    vcard:  {} as any,
    loading: false,
    menuEnabled: true
   
};

export const reducers = cardReducer;


export type AppState = ReturnType<typeof reducers>;