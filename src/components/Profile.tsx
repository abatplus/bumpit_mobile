import React from 'react';
import IProfile from '../interfaces/IProfile';
import { useIntl } from 'react-intl';
import { useProfileContext } from '../store/contexts/ProfileContext';
import { IVCard } from '../interfaces/IVCard';
import VCardField from './VCardField';
import { translate } from '../utils';
import * as Actions from '../store/actions/actions';
import { isPlatform } from '@ionic/react';
import { IonItem, IonLabel, IonInput, IonButton } from '@ionic/react';
import './VCardField.css';
import './Profile.css';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { useState } from 'react';
import { Crop } from '@ionic-native/crop';
import { File } from '@ionic-native/file';

interface IProfileProps {
  profile?: IProfile;
}

const Profile: React.FC<IProfileProps> = (props) => {
  const i18n = useIntl();
  const { dispatchProfileContext } = useProfileContext();

  const updateProfile = (inputFieldName: keyof IVCard) => (event: CustomEvent) => {
    if (props.profile && props.profile.id) {
      dispatchProfileContext(
        Actions.Profile.setProfileVCardDataField(
          props.profile.id,
          props.profile.name,
          inputFieldName,
          event.detail.value
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
      dispatchProfileContext(
        Actions.Profile.setProfileImage(
          props.profile.id,
          base64Image
        )
      );
    }
  };

  const removeProfileImage = () => {
    if (props.profile && props.profile.id) {
      dispatchProfileContext(
        Actions.Profile.removeProfileImage(props.profile.id)
      );
    }
  };

  const loadPicture = async (sourceType: number) => {
    const options: CameraOptions = {
      quality: 100,
      sourceType: sourceType,
      destinationType: Camera.DestinationType.FILE_URI,
      encodingType: Camera.EncodingType.JPEG,
      mediaType: Camera.MediaType.PICTURE
    }

    let fileUri = await Camera.getPicture(options)  
    if (isPlatform('android')) fileUri = 'file://' + fileUri;
  
    const cropPath = await Crop.crop(fileUri, {
      quality: 75,
      targetHeight: 400,
      targetWidth: 400
    });
    const newPath = cropPath.split('?')[0];
    const copyPath = newPath;
    const splitPath = copyPath.split('/');
    const imageName = splitPath[splitPath.length - 1];
    const filePath = newPath.split(imageName)[0];

    const base64 = await File.readAsDataURL(filePath, imageName);
    updateProfileImage(base64);
    await File.removeFile(filePath, imageName);
  };

  return (
    <div>
      <div>
        <img className="profile-avatar" src={props.profile?.image} alt="img"/>
      </div>
      <IonButton onClick={() => loadPicture(Camera.PictureSourceType.CAMERA)}>Open camera</IonButton>
      <IonButton onClick={() => loadPicture(Camera.PictureSourceType.PHOTOLIBRARY)}>Open gallery</IonButton>
      <IonItem >
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
        key={'name'}
        name={'name'}
        label={translate(i18n, 'Name')}
        value={props.profile?.vCard?.name}
        onChange={updateProfile('name')}
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
