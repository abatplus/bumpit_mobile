import { Plugins } from '@capacitor/core';
import { IVCard } from '../interfaces/IVCard';
import IProfile from '../interfaces/IProfile';
import { File } from '@ionic-native/file';
import { isPlatform } from '@ionic/react';

const { Storage } = Plugins;
const profileDataUrl = '/assets/mock/profilesMock.json';

const PROFILE_DATA = 'profile_data';

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
    if (isPlatform('cordova')) {
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
    if (isPlatform('cordova')) await storeProfileDataToFile(data);
    else await Storage.set({ key: PROFILE_DATA, value: JSON.stringify(data) });
};

export const loadProfileDataFromFile = async () => {
    const fileName = 'vSwapCardData.json';
    try {
        await File.checkFile(File.syncedDataDirectory, fileName);
        return JSON.parse(await File.readAsText(File.syncedDataDirectory, fileName));
    } catch (error) {
        // no file found => possible but ok if we open the app for the first time
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
            await File.checkFile(File.syncedDataDirectory, fileNameNew);
            await File.removeFile(File.syncedDataDirectory, fileNameNew);
        } catch (error) {
            // no file found => good, because we have no old unwanted data
        }

        // write temporarily new file
        await File.writeFile(File.syncedDataDirectory, fileNameNew, JSON.stringify(data));

        // remove old file
        try {
            await File.checkFile(File.syncedDataDirectory, fileName);
            await File.removeFile(File.syncedDataDirectory, fileName);
        } catch (error) {
            // no file found => possible but ok if we open the app for the first time
        }

        // move the temp file as actual data file
        await File.moveFile(File.syncedDataDirectory, fileNameNew, File.syncedDataDirectory, fileName);
    } catch (error) {
        // no file found
    }
};
