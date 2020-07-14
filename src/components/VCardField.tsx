import React from 'react';
import { IonItem, IonLabel, IonInput } from '@ionic/react';
import * as Actions from '../store/actions/actions';
import { IVCard } from '../interfaces/IVCard';
import { useProfileContext } from '../store/contexts/ProfileContext';

interface VCardProps {
  profileId: string;
  name: keyof IVCard;
  label: string;
}

const VCardField: React.FC<VCardProps> = (props) => {
  const { profileContext, dispatchProfileContext } = useProfileContext();

  const onValueFieldChange = (e: any) => {
    dispatchProfileContext(Actions.Profile.setProfileVCardDataField(props.profileId, props.name, e.detail.value));
  };

  const currentProfile = profileContext.profiles.find((profile) => profile.id === props.profileId);

  return (
    <IonItem>
      <IonLabel position="stacked" color="primary">
        {props.label}
      </IonLabel>
      <IonInput
        name={props.name}
        type="text"
        value={currentProfile?.vcard[props.name]}
        spellCheck={false}
        autocapitalize="off"
        onIonChange={onValueFieldChange}
      />
    </IonItem>
  );
};

export default VCardField;
