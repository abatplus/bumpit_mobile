import { IVCard } from '../store/reducers/VCardReducer';

export default interface IProfile {
  id: string;
  name: string;
  vcard: IVCard;
}
