import { Vcard } from '../models/Vcard';
import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;
const cardDataUrl = '/assets/mock/vCardMock.json';
const VCARD_DATA = 'vcard_data';

const emptyVcard : Vcard = {
    name: { value: '', share: true},
    surname:  { value: '', share: true},
    nickname:  { value: '', share: true},
    street:  { value: '', share: true},
    location: { value: '', share: true},
    country: { value: '', share: true},
    postalcode:  { value: '', share: true},
    tel:  { value: '', share: true},
    companyTel:  { value: '', share: true},
    email: { value: '', share: true},
    company: { value: '', share: true}
}

export const getAppData = async () => {

    //await Storage.remove({ key: VCARD_DATA});
    let vcard = emptyVcard;
    //get from storage
    const responseStorage = await Promise.all([
        Storage.get({ key: VCARD_DATA })]);

    let cardDataStorage = await responseStorage[0].value || undefined;
    if (cardDataStorage) {
        vcard = {...vcard, ...JSON.parse(cardDataStorage)};
    }
    //read data from url
    else {
        const response = await Promise.all([
            fetch(cardDataUrl)]);
        const responseData = await response[0].json();
        vcard = {...vcard, ...responseData.vcard};
    }

    const data = {
        vcard,
    }

    return data;
}

//save in Storage
export const setVcardData = async (data: Vcard) => {
    
    await Storage.set({ key: VCARD_DATA, value: JSON.stringify(data) });
}