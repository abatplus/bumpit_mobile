import { Plugins } from '@capacitor/core';
import { IVCard } from '../interfaces/IVCard';
import IProfile from '../interfaces/IProfile';

const { Storage } = Plugins;
const profileDataUrl = '/assets/mock/profilesMock.json';

const PROFILE_DATA = 'profile_data';

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

const emptyProfile: IProfile = {
  id: 'default',
  name: 'default',
  vcard: emptyVCard,
};

export const getProfileData = async () => {
  let profiles = [emptyProfile];
  //get from storage
  const responseStorage = await Promise.all([Storage.get({ key: PROFILE_DATA })]);
  let cardDataStorage = responseStorage[0].value || undefined;
  if (cardDataStorage) {
    profiles = JSON.parse(cardDataStorage);
  }
  //read data from url
  else {
    const response = await Promise.all([fetch(profileDataUrl)]);
    const responseData: { profiles: [{ id: string; name: string; vcard: IVCard }] } = await response[0].json();
    profiles = responseData.profiles;
  }
  return profiles;
};

//save in Storage
export const storeProfileData = async (data: IProfile[]) => {
  await Storage.set({ key: PROFILE_DATA, value: JSON.stringify(data) });
};
