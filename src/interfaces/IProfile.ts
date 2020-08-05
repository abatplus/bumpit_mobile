import { IVCard } from './IVCard';

export default interface IProfile {
  id: string;
  name: string;
  vCard: IVCard;
  image?: string;
}
