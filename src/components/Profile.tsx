import React from 'react';
import IProfile from '../interfaces/IProfile';
import { useIntl } from 'react-intl';
import { useProfileContext } from '../store/contexts/ProfileContext';
import { IVCard } from '../interfaces/IVCard';
import VCardField from './VCardField';
import { translate } from '../utils';
import * as Actions from '../store/actions/actions';
import { isPlatform, IonAvatar, IonFab, IonFabButton, IonFabList } from '@ionic/react';
import { IonItem, IonLabel, IonInput } from '@ionic/react';
import './VCardField.css';
import './Profile.css';
import { Crop } from '@ionic-native/crop';
import { File } from '@ionic-native/file';
// import MockImage from './MockImage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faImage, faFolderOpen, faTrash } from '@fortawesome/pro-duotone-svg-icons';
import { faUser } from '@fortawesome/pro-solid-svg-icons';
import { useCamera } from '@ionic/react-hooks/camera';
import { CameraResultType, CameraSource } from '@capacitor/core';

interface IProfileProps {
    profile?: IProfile;
}

// function to resize the image properly
function imageToDataUri(img: CanvasImageSource, width: number, height: number) {
    // create an off-screen canvas
    let canvas = document.createElement('canvas');
    let ctx = canvas.getContext('2d');

    // set its dimension to target size
    canvas.width = width;
    canvas.height = height;

    // draw source image into the off-screen canvas:
    ctx?.drawImage(img, 0, 0, width, height);

    // encode image to data-uri with base64 version of compressed image
    return canvas.toDataURL();
}

const Profile: React.FC<IProfileProps> = (props) => {
    const i18n = useIntl();
    const { dispatchProfileContext } = useProfileContext();
    const { getPhoto } = useCamera();

    const updateProfile = (inputFieldName: keyof IVCard) => (event: CustomEvent) => {
        const input = document.getElementsByName(inputFieldName);
        const inputElem = input[0] as HTMLInputElement;
        if (props.profile && props.profile.id) {
            dispatchProfileContext(
                Actions.Profile.setProfileVCardDataField(
                    props.profile.id,
                    props.profile.name,
                    inputFieldName,
                    inputElem.value
                )
            );
        }
    };

    const updateProfileName = (event: CustomEvent) => {
        if (props.profile && props.profile.id) {
            dispatchProfileContext(Actions.Profile.setProfileName(props.profile.id, event.detail.value));
        }
    };

    const updateProfileImage = (base64Image: string) => {
        if (props.profile && props.profile.id) {
            dispatchProfileContext(Actions.Profile.setProfileImage(props.profile.id, base64Image));
        }
    };

    const removeProfileImage = () => {
        if (props.profile && props.profile.id) {
            dispatchProfileContext(Actions.Profile.removeProfileImage(props.profile.id));
        }
    };

    const loadPicture = async (sourceType: CameraSource) => {
        if (!isPlatform('capacitor')) {
            const cameraPhoto = await getPhoto({
                resultType: CameraResultType.DataUrl,
                source: sourceType,
                quality: 100,
            });
            console.log(cameraPhoto.dataUrl);
            if (cameraPhoto.dataUrl) updateProfileImage(cameraPhoto.dataUrl + '');
            return;
        }

        const cameraPhoto = await getPhoto({
            resultType: CameraResultType.Uri,
            source: sourceType,
            quality: 100,
        });

        const fileUri = cameraPhoto.path + '';

        const cropPath = await Crop.crop(fileUri, {
            quality: 100,
        });

        const newPath = cropPath.split('?')[0];
        const copyPath = newPath;
        const splitPath = copyPath.split('/');
        const imageName = splitPath[splitPath.length - 1];
        const filePath = newPath.split(imageName)[0];

        const base64 = await File.readAsDataURL(filePath, imageName);

        var img = new Image();
        img.src = base64;
        img.onload = async () => {
            const newDataUri = imageToDataUri(img, 300, 300);
            updateProfileImage(newDataUri);
            await File.removeFile(filePath, imageName);
        };
    };

    const imageData = props.profile?.image; // isPlatform('capacitor') ? props.profile?.image : MockImage;

    const renderProfileImage = () => {
        if (imageData) {
            return <img src={imageData} alt='profile-img' />;
        } else {
            return <FontAwesomeIcon className='fa fa-lg profile-no-user' icon={faUser} />;
        }
    };

    return (
        <div>
            <div>
                <IonFab horizontal='start' slot='fixed' className='profile-avatar-button'>
                    <IonFabButton size='small'>
                        <FontAwesomeIcon className='fa fa-lg' icon={faImage} />
                    </IonFabButton>
                    <IonFabList side='end'>
                        <IonFabButton onClick={() => loadPicture(CameraSource.Camera)} size={'small'} color='primary'>
                            <FontAwesomeIcon className='fa fa-lg' icon={faCamera} />
                        </IonFabButton>
                        <IonFabButton onClick={() => loadPicture(CameraSource.Photos)} size={'small'} color='primary'>
                            <FontAwesomeIcon className='fa fa-lg' icon={faFolderOpen} />
                        </IonFabButton>
                        <IonFabButton onClick={() => removeProfileImage()} size={'small'} color='danger'>
                            <FontAwesomeIcon className='fa fa-lg' icon={faTrash} />
                        </IonFabButton>
                    </IonFabList>
                </IonFab>
            </div>
            <IonItem>
                <IonAvatar className='profile-avatar'>{renderProfileImage()}</IonAvatar>
            </IonItem>
            <IonItem>
                <IonLabel position='stacked' color='abatgray'>
                    {translate(i18n, 'Profile_Description')}
                </IonLabel>
                <IonInput
                    name={'profileName'}
                    type='text'
                    value={props.profile?.name}
                    spellCheck={false}
                    autocapitalize='off'
                    onIonChange={updateProfileName}
                />
            </IonItem>
            <VCardField
                key={'name'}
                name={'name'}
                label={translate(i18n, 'Name')}
                value={props.profile?.vCard?.name}
                onChange={updateProfile('name')}
            />
            <VCardField
                key={'company'}
                name={'company'}
                label={translate(i18n, 'Company')}
                value={props.profile?.vCard?.company}
                onChange={updateProfile('company')}
            />
            <VCardField
                key={'website'}
                name={'website'}
                label={translate(i18n, 'Website')}
                value={props.profile?.vCard?.website}
                onChange={updateProfile('website')}
            />
            <VCardField
                key={'street'}
                name={'street'}
                label={translate(i18n, 'Street')}
                value={props.profile?.vCard?.street}
                onChange={updateProfile('street')}
            />
            <VCardField
                key={'zipCode'}
                name={'zipCode'}
                label={translate(i18n, 'ZipCode')}
                value={props.profile?.vCard?.zipCode}
                onChange={updateProfile('zipCode')}
            />
            <VCardField
                key={'location'}
                name={'location'}
                label={translate(i18n, 'Location')}
                value={props.profile?.vCard?.location}
                onChange={updateProfile('location')}
            />
            <VCardField
                key={'country'}
                name={'country'}
                label={translate(i18n, 'Country')}
                value={props.profile?.vCard?.country}
                onChange={updateProfile('country')}
            />
            <VCardField
                key={'position'}
                name={'position'}
                label={translate(i18n, 'Position')}
                value={props.profile?.vCard?.position}
                onChange={updateProfile('position')}
            />
            <VCardField
                key={'phone'}
                name={'phone'}
                label={translate(i18n, 'Phone')}
                value={props.profile?.vCard?.phone}
                onChange={updateProfile('phone')}
            />
            <VCardField
                key={'fax'}
                name={'fax'}
                label={translate(i18n, 'Fax')}
                value={props.profile?.vCard?.fax}
                onChange={updateProfile('fax')}
            />
            <VCardField
                key={'email'}
                name={'email'}
                label={translate(i18n, 'Email')}
                value={props.profile?.vCard?.email}
                onChange={updateProfile('email')}
            />
        </div>
    );
};

export default Profile;
