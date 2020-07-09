import React from 'react';
import {  IonItem, IonLabel,  IonInput,  IonCheckbox } from '@ionic/react';
import './VCardField.css';
import { useVCard } from '../store/contexts/VCardContext';
import * as Actions from '../store/actions/actions';
import { IVCard } from '../store/reducers/VCardReducer';

interface VCardProps {
    name: keyof IVCard; label: string
}

const VCardField: React.FC<VCardProps> = ({ name, label }) => {
    const { vCard, dispatchVCard } = useVCard();

    const onValueFieldChange = (e: any) => {
        dispatchVCard(Actions.VCard.setVCardDataField(name, e.detail.value));
    }

    const onShareFieldChange = (e: any) => {
        const shared = e.detail.checked ? true : false;
        dispatchVCard(Actions.VCard.setVCardDataFieldShare(name, shared));
    }

    return (
        <IonItem>
            <IonLabel position="stacked" color="primary" >{label}</IonLabel>
            <IonCheckbox slot="start" checked={vCard[name]?.share} onIonChange={onShareFieldChange}/>
            <IonInput 
                className={vCard[name]?.share !== true ? 'not-shared' : ''} 
                name={name} 
                type="text" 
                value={vCard[name]?.value} 
                spellCheck={false} 
                autocapitalize="off" 
                onIonChange={onValueFieldChange}>
            </IonInput>
        </IonItem>
    );
};

export default VCardField;