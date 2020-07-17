import React from 'react';
import IProfile from '../interfaces/IProfile';
import { useIntl } from 'react-intl';
import { useProfileContext } from '../store/contexts/ProfileContext';
import { IVCard } from '../interfaces/IVCard';
import VCardField from './VCardField';
import { nameof } from '../utils';
import IvCardTranslations from '../i18n/IvCardTranslations';
import * as Actions from '../store/actions/actions';
import { IonItem, IonLabel, IonInput } from '@ionic/react';

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

    return (
        <div>
            <IonItem>
                <IonLabel position='stacked'>
                    {i18n.formatMessage({ id: nameof<IvCardTranslations>('Profile_Description') })}
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
                label={i18n.formatMessage({ id: nameof<IvCardTranslations>('Company') })}
                value={props.profile?.vCard?.company}
                onChange={updateProfile('company')}
            />
            <VCardField
                key={'website'}
                name={'website'}
                label={i18n.formatMessage({ id: nameof<IvCardTranslations>('Website') })}
                value={props.profile?.vCard?.website}
                onChange={updateProfile('website')}
            />
            <VCardField
                key={'street'}
                name={'street'}
                label={i18n.formatMessage({ id: nameof<IvCardTranslations>('Street') })}
                value={props.profile?.vCard?.street}
                onChange={updateProfile('street')}
            />
            <VCardField
                key={'zipCode'}
                name={'zipCode'}
                label={i18n.formatMessage({ id: nameof<IvCardTranslations>('ZipCode') })}
                value={props.profile?.vCard?.zipCode}
                onChange={updateProfile('zipCode')}
            />
            <VCardField
                key={'location'}
                name={'location'}
                label={i18n.formatMessage({ id: nameof<IvCardTranslations>('Location') })}
                value={props.profile?.vCard?.location}
                onChange={updateProfile('location')}
            />
            <VCardField
                key={'country'}
                name={'country'}
                label={i18n.formatMessage({ id: nameof<IvCardTranslations>('Country') })}
                value={props.profile?.vCard?.country}
                onChange={updateProfile('country')}
            />
            <VCardField
                key={'name'}
                name={'name'}
                label={i18n.formatMessage({ id: nameof<IvCardTranslations>('Name') })}
                value={props.profile?.vCard?.name}
                onChange={updateProfile('name')}
            />
            <VCardField
                key={'position'}
                name={'position'}
                label={i18n.formatMessage({ id: nameof<IvCardTranslations>('Position') })}
                value={props.profile?.vCard?.position}
                onChange={updateProfile('position')}
            />
            <VCardField
                key={'phone'}
                name={'phone'}
                label={i18n.formatMessage({ id: nameof<IvCardTranslations>('Phone') })}
                value={props.profile?.vCard?.phone}
                onChange={updateProfile('phone')}
            />
            <VCardField
                key={'fax'}
                name={'fax'}
                label={i18n.formatMessage({ id: nameof<IvCardTranslations>('Fax') })}
                value={props.profile?.vCard?.fax}
                onChange={updateProfile('fax')}
            />
            <VCardField
                key={'email'}
                name={'email'}
                label={i18n.formatMessage({ id: nameof<IvCardTranslations>('Email') })}
                value={props.profile?.vCard?.email}
                onChange={updateProfile('email')}
            />
        </div>
    );
};

export default Profile;
