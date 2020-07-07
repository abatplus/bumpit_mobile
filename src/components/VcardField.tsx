import React, { } from 'react';
import {  IonItem, IonLabel,  IonInput,  IonCheckbox } from '@ionic/react';
import './VcardField.css';
import { connect } from '../data/connect';
import { setCardDataField, setCardDataFieldShare } from '../data/card/card_actions';
import { Vcard } from '../models/Vcard';

interface OwnProps {
    name: keyof Vcard; label: string
}

interface StateProps {
    cardData?: any;
};

interface DispatchProps {
    setCardDataField: typeof setCardDataField;
    setCardDataFieldShare: typeof setCardDataFieldShare;
}

type VcardProps = OwnProps & StateProps & DispatchProps;

const VcardField: React.FC<VcardProps> = ({ name, label, cardData, setCardDataField, setCardDataFieldShare }) => {

  
    function getValue() {

        if (cardData && cardData[name]) {
            return cardData[name].value;
        }
        return "";
    }

    function getShared() {

        if (cardData && cardData[name]) {
            return cardData[name].share;
        }
        return true
    }

    return (


        <IonItem>
            <IonLabel  position="stacked" color="primary" >{label}</IonLabel>
            <IonCheckbox slot="start" checked={getShared()} onIonChange={e => { setCardDataFieldShare(name, e.detail.checked, cardData); }}/>
            <IonInput className = {getShared()?'shared':'not-shared'} name={name} type="text" value={getValue()} spellCheck={false} autocapitalize="off" onIonChange={e => { setCardDataField(name, e.detail.value!, cardData); }}>
            </IonInput>
        </IonItem>


    );
};


export default connect<OwnProps, StateProps, DispatchProps>({
    mapStateToProps: (state) => ({
        cardData: state.vcard,

    }),
    mapDispatchToProps: {
        setCardDataField,
        setCardDataFieldShare
    },
    component: VcardField
});
