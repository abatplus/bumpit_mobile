import { CardActions } from './card_actions';
import { CardDataState } from '../state';
import { Vcard } from '../../models/Vcard';

export const cardReducer = (state: CardDataState, action: CardActions): CardDataState => {
    switch (action.type) {
        case 'set-card-loading': {
            return { ...state, loading: action.isLoading };
        }
        case 'set-card-data': {
            return { ...state, ...action.data };
        }
        case 'set-menu-enabled': {
            return { ...state, menuEnabled: action.menuEnabled };
        }
        case 'set-card-data-field': {
            const key  = action.field as keyof Vcard;
            state.vcard[key].value = action.value;
            return { ...state };
        }
        case 'set-card-data-field-share': {
            const key  = action.field as keyof Vcard;
            state.vcard[key].share = action.value;        
            return { ...state };
        }
    }
}