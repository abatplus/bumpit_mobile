import React from 'react';
import { IonItem, IonLabel, IonInput } from '@ionic/react';
import { IVCard } from '../interfaces/IVCard';

interface VCardProps {
  name: keyof IVCard;
  value?: string;
  label: string;
  onChange: (event: CustomEvent) => void;
}

const VCardField: React.FC<VCardProps> = (props) => {
  return (
    <IonItem key={'item_' + props.name}>
      <IonLabel position="stacked" color="primary">
        {props.label}
      </IonLabel>
      <IonInput name={props.name} type="text" value={props.value} spellCheck={false} autocapitalize="off" onIonChange={props.onChange} />
    </IonItem>
  );
};

export default VCardField;
