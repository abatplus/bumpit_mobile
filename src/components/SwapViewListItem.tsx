import React from 'react';
import './SwapViewListItem.css';
import { IonItem, IonLabel, IonButton, IonGrid, IonCol, IonRow, IonSpinner, IonAvatar } from '@ionic/react';
import { faCheck, faShare, faTimes, faUser } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SwapState from '../enums/SwapState';
import { useIntl } from 'react-intl';
import { translate } from '../utils';

type SwapViewListItemType = {
    thumbnailUrl: string;
    name: string;
    state: SwapState;
    onDoRequest: () => void;
    onAcceptRequest: () => void;
    onAbortRequest: () => void;
    dist?: number;
};

const SwapViewListItem = ({
    thumbnailUrl,
    name,
    state,
    onDoRequest,
    onAbortRequest,
    onAcceptRequest,
    dist,
}: SwapViewListItemType) => {
    let stateText = ' ';

    const i18n = useIntl();
    switch (state) {
        case SwapState.initial:
            stateText = ' ';
            break;
        case SwapState.requested:
            stateText = translate(i18n, 'Wait_for_acceptance');
            break;
        case SwapState.received:
            stateText = translate(i18n, 'Exchange_request_received');
            break;
        case SwapState.accepted:
            stateText = translate(i18n, 'Accept_request_send_data');
            break;
        case SwapState.exchanged:
            stateText = translate(i18n, 'Exchange_successful');
            break;
    }

    const onActionButtonClick = () => {
        switch (state) {
            case SwapState.initial:
                return onDoRequest();
            case SwapState.requested:
                return onAbortRequest();
            case SwapState.received:
                return onAcceptRequest();
        }
    };

    const getActionIcon = () => {
        switch (state) {
            case SwapState.initial:
                return faShare;
            case SwapState.received:
                return faCheck;
            case SwapState.requested:
                return faTimes;
        }
        return faShare;
    };

    const renderActionButton = () => {
        if (state !== SwapState.accepted && state !== SwapState.exchanged)
            return (
                <IonButton float-right color='primary' fill='outline' onClick={onActionButtonClick}>
                    <FontAwesomeIcon className='fa fa-lg' icon={getActionIcon()} />
                </IonButton>
            );
    };

    const renderAvatarImage = () => {
        if (thumbnailUrl) {
            const url = 'https://vswap-dev.smef.io' + thumbnailUrl;
            const imageClass = state === SwapState.requested ? 'swap-list-image-shadowed' : 'swap-list-image';
            return <img src={url} alt={name} className={imageClass} />;
        } else {
            return <FontAwesomeIcon className='fa fa-lg swap-list-no-user' icon={faUser} />;
        }
    };

    return (
        <IonItem>
            <div className='swap-view-list-item'>
                <IonGrid>
                    <IonRow>
                        <IonCol className='swap-view-avatar-col'>
                            <div>
                                <IonAvatar className='swap-list-avatar' slot='start'>
                                    {renderAvatarImage()}
                                    {state === SwapState.requested ? (
                                        <IonSpinner name='dots' className='swap-list-avatar-spinner' />
                                    ) : (
                                        ''
                                    )}
                                </IonAvatar>
                            </div>
                        </IonCol>
                        <IonCol>
                            <IonLabel className='swap-view-item-name'>
                                <h2>{name}</h2>
                                <p>{stateText}</p>
                                {dist && <p>{(dist + '').substr(0, 4)} m</p>}
                            </IonLabel>
                        </IonCol>
                        <IonCol className='swap-view-button'>{renderActionButton()}</IonCol>
                    </IonRow>
                </IonGrid>
            </div>
        </IonItem>
    );
};

export default SwapViewListItem;
