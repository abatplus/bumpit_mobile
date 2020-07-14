import React from 'react';
import { IonItem, IonLabel, IonInput } from '@ionic/react';
import { useVCard } from '../store/contexts/VCardContext';
import * as Actions from '../store/actions/actions';
import { IVCard } from '../interfaces/IVCard';

interface VCardProps {
  name: keyof IVCard;
  label: string;
}

const VCardField: React.FC<VCardProps> = ({ name, label }) => {
  const { vCard, dispatchVCard } = useVCard();

  const onValueFieldChange = (e: any) => {
    dispatchVCard(Actions.VCard.setVCardDataField(name, e.detail.value));
  };

  return (
    <IonItem>
      <IonLabel position="stacked" color="primary">
        {label}
      </IonLabel>
      <IonInput name={name} type="text" value={vCard[name]} spellCheck={false} autocapitalize="off" onIonChange={onValueFieldChange} />
    </IonItem>
  );
};

export default VCardField;
