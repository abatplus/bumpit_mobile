import { Plugins } from '@capacitor/core';
import { IVCard } from './reducers/VCardReducer';

const { Storage } = Plugins;
const cardDataUrl = '/assets/mock/vCardMock.json';
const VCARD_DATA = 'vcard_data';

const emptyVCard: IVCard = {
  company: '',
  website: '',
  street: '',
  zipCode: '',
  location: '',
  country: '',
  name: '',
  position: '',
  phone: '',
  fax: '',
  email: '',
};

export const getAppData = async () => {
  //await Storage.remove({ key: VCARD_DATA});
  let vCard = emptyVCard;
  //get from storage
  const responseStorage = await Promise.all([Storage.get({ key: VCARD_DATA })]);

  let cardDataStorage = (await responseStorage[0].value) || undefined;
  if (cardDataStorage) {
    vCard = { ...vCard, ...JSON.parse(cardDataStorage) };
  }
  //read data from url
  else {
    const response = await Promise.all([fetch(cardDataUrl)]);
    const responseData = await response[0].json();
    vCard = { ...vCard, ...responseData.vcard };
  }

  return vCard;
};

//save in Storage
export const storeVCardData = async (data: IVCard) => {
  await Storage.set({ key: VCARD_DATA, value: JSON.stringify(data) });
};
