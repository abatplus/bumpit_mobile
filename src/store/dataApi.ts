import { Plugins } from '@capacitor/core';
import { IVCard } from '../interfaces/IVCard';
import IProfile from '../interfaces/IProfile';
import { File } from '@ionic-native/file';
import { isPlatform } from '@ionic/react';

const { Storage } = Plugins;
const profileDataUrl = '/assets/mock/profilesMock.json';

const PROFILE_DATA = 'profile_data';

// Add a timeout to the index.tsx in order to get a directory and not null for this function
const getDataDirectory = () => (isPlatform('ios') ? File.syncedDataDirectory : File.dataDirectory);

const debugAlert = (message: string) => {
    if (false) {
        alert(message);
    }
};

export function getEmptyProfile(id: string): IProfile {
    return {
        id: id,
        name: '',
        vCard: getEmptyVCard(),
        image: '',
    };
}

export function getEmptyVCard(): IVCard {
    return {
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
}

export const getProfileData = async () => {
    let profiles = [];
    // if (isPlatform('cordova')) { // TODO: fix bug in iOS file system
    if (false) {
        profiles = await loadProfileDataFromFile();
    } else {
        //get from storage
        const responseStorage = await Storage.get({ key: PROFILE_DATA });
        let cardDataStorage = responseStorage.value || undefined;
        if (cardDataStorage) {
            profiles = JSON.parse(cardDataStorage);
        }
    }

    if (profiles.length === 0) {
        // read default data from url
        const response = await fetch(profileDataUrl);
        const responseData: {
            profiles: [{ id: string; name: string; vCard: IVCard; image: string }];
        } = await response.json();
        profiles = responseData.profiles;
    }
    return profiles;
};

//save in Storage
export const storeProfileData = async (data: IProfile[]) => {
    // if (isPlatform('cordova')) { // TODO: fix bug in iOS file system
    if (false) {
        await storeProfileDataToFile(data);
    } else {
        await Storage.set({ key: PROFILE_DATA, value: JSON.stringify(data) });
    }
};

export const loadProfileDataFromFile = async () => {
    debugAlert('DataDir:' + getDataDirectory());
    const fileName = 'vSwapCardData.json';
    try {
        await File.checkFile(getDataDirectory(), fileName);
        const fileData = await File.readAsText(getDataDirectory(), fileName);
        debugAlert('file data: ' + fileData);
        return JSON.parse(fileData);
    } catch (error) {
        // no file found => possible but ok if we open the app for the first time
        debugAlert('error: load data file');
        debugAlert(JSON.stringify(error));
        return [];
    }
};

export const storeProfileDataToFile = async (data: IProfile[]) => {
    // we firstly write to a seperate file to be sure there is i.e. enough space on the device
    // afterwards we remove the old file and replace it with the newer version
    const fileName = 'vSwapCardData.json';
    const fileNameNew = 'vSwapCardDataNew.json';
    // safely remove old temp file if somehow it is present, what shouldn't be
    try {
        try {
            await File.checkFile(getDataDirectory(), fileNameNew);
            await File.removeFile(getDataDirectory(), fileNameNew);
        } catch (error) {
            // no file found => good, because we have no old unwanted data
            // debugAlert('error: remove old temp file');
            // debugAlert(JSON.stringify(error));
        }

        // write temporarily new file
        await File.writeFile(getDataDirectory(), fileNameNew, JSON.stringify(data));

        // remove old data file
        try {
            await File.checkFile(getDataDirectory(), fileName);
            await File.removeFile(getDataDirectory(), fileName);
        } catch (error) {
            // no file found => possible but ok if we open the app for the first time
            debugAlert('error: remove old data file');
            debugAlert(JSON.stringify(error));
        }

        // move the temp file as actual data file
        await File.moveFile(getDataDirectory(), fileNameNew, getDataDirectory(), fileName);
    } catch (error) {
        // no file found
        debugAlert('Error storing profile data to file');
    }
};
