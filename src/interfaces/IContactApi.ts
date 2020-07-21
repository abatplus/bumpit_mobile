import { IVCard } from './IVCard';

export default interface IContactApi {
  createContact: (vCardFields: IVCard) => Promise<any>;
}
