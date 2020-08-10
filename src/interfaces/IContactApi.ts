import { IVCard } from './IVCard';

export default interface IContactApi {
    createContact: (vCardFields: IVCard, base64Image: string | undefined | null) => Promise<any>;
}
