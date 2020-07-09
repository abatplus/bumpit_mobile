import { Plugins } from '@capacitor/core';
import { IVCard } from './reducers/VCardReducer';

const { Storage } = Plugins;
const cardDataUrl = '/assets/mock/vCardMock.json';
const VCARD_DATA = 'vcard_data';

const emptyVCard : IVCard = {
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
    let vCard = emptyVCard;
    //get from storage
    const responseStorage = await Promise.all([
        Storage.get({ key: VCARD_DATA })]);

    let cardDataStorage = await responseStorage[0].value || undefined;
    if (cardDataStorage) {
        vCard = {...vCard, ...JSON.parse(cardDataStorage)};
    }
    //read data from url
    else {
        const response = await Promise.all([
            fetch(cardDataUrl)]);
        const responseData = await response[0].json();
        vCard = {...vCard, ...responseData.vcard};
    }

    return vCard;
}

//save in Storage
export const setVCardData = async (data: IVCard) => {
    await Storage.set({ key: VCARD_DATA, value: JSON.stringify(data) });
}