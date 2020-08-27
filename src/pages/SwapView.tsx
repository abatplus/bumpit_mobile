import React, { useEffect, useReducer, useState, useRef } from 'react';
import {
    IonHeader,
    IonToolbar,
    IonContent,
    IonPage,
    IonButtons,
    IonList,
    IonTitle,
    IonBackButton,
    IonFooter,
    IonButton,
    IonLabel,
    IonItem,
    IonSegment,
    IonSegmentButton,
    useIonViewWillLeave,
} from '@ionic/react';
import './SwapView.css';
import SwapViewListItem from '../components/SwapViewListItem';
import { faPollPeople, faCheck } from '@fortawesome/pro-duotone-svg-icons';
import { faCheckDouble, faShareAll } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SwapState from '../enums/SwapState';
import * as SwapReducer from '../store/reducers/SwapReducer';
import { SwapViewCardExchangeClient } from '../server/SwapViewCardExchangeClient';
import { v4 as uuid4 } from 'uuid';
import { useProfileContext } from '../store/contexts/ProfileContext';
import { Geolocation } from '@ionic-native/geolocation';
import ISwapListEntry from '../interfaces/ISwapListEntry';
import { useIntl } from 'react-intl';
import { translate } from '../utils';
import CardExchangeServer from '../server/CardExchangeServer';
import LoadingSpinner from '../components/LoadingSpinner';
import * as Actions from '../store/actions/actions';
import { useHistory } from 'react-router';

const distance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    if (lat1 === lat2 && lon1 === lon2) {
        return 0;
    } else {
        const radlat1 = (Math.PI * lat1) / 180;
        const radlat2 = (Math.PI * lat2) / 180;
        const theta = lon1 - lon2;
        const radtheta = (Math.PI * theta) / 180;
        let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        if (dist > 1) {
            dist = 1;
        }
        dist = Math.acos(dist);
        dist = (dist * 180) / Math.PI;
        dist = dist * 60 * 1.609344 * 1000;
        return dist;
    }
};

const SwapView: React.FC = () => {
    const i18n = useIntl();
    const history = useHistory();
    const { profileContext, dispatchProfileContext } = useProfileContext();
    const [swapContext, dispatchSwapContext] = useReducer(SwapReducer.SwapReducer, []);
    const [segmentFilter, setSegmentFilter] = useState<string>('swap-list');
    const [swapList, setSwapList] = useState<ISwapListEntry[]>([]);
    const deviceId = useRef<string>('');
    const lastUpdateTimestamp = useRef<number>(0);
    const [timeElapsed, setTimeElapsed] = useState<number>(0);
    const doUpdate = useRef(true);
    const [lon, setLon] = useState<number>();
    const [lat, setLat] = useState<number>();

    const debug = false;
    const mockGeo = false;

    const getOnlineOrExchangedEntries = () => {
        return swapContext.filter((entry) => entry.online === true || entry.state === SwapState.exchanged);
    };

    const getCandidatesEntries = () => {
        return swapContext.filter((entry) => entry.online === true && entry.state !== SwapState.exchanged);
    };

    const getExchangedEntries = () => {
        return swapContext.filter((entry) => entry.state === SwapState.exchanged);
    };

    const getProfile = (profileId: string) => {
        return profileContext.profiles.find((entry) => entry.id === profileId);
    };

    const getCurrentVCard = () => {
        const profile = getProfile(profileContext.currentProfileId!);
        if (!profile?.vCard) {
            throw new Error('could not get vcard');
        }
        return profile.vCard;
    };

    const getCurrentProfileNameField = () => {
        const vcard = getCurrentVCard();
        if (!vcard?.name) {
            throw new Error('vcard contains no name');
        }
        return vcard.name;
    };

    const sendCardData = (peerDeviceId: string) => {
        server.Hub.SendCardData(
            deviceId.current,
            peerDeviceId,
            getCurrentProfileNameField(),
            JSON.stringify(getCurrentVCard())
        );
    };

    const cardExchangeClient = new SwapViewCardExchangeClient(dispatchSwapContext, sendCardData);
    const server = new CardExchangeServer(cardExchangeClient);

    useEffect(() => {
        setSwapList(
            segmentFilter === 'ready-list'
                ? swapContext.filter((entry) => entry.state === SwapState.exchanged)
                : swapContext.filter((entry) => entry.state !== SwapState.exchanged && entry.online === true)
        );
    }, [segmentFilter, swapContext]);

    useEffect(() => {
        if (profileContext.currentProfileId) {
            connectToHub(profileContext.currentProfileId);
        }
    }, [profileContext.currentProfileId]);

    useIonViewWillLeave(() => {
        // clearInterval(updateHandler.current); // stop updates
        doUpdate.current = false;
        server.Hub.Unsubcribe(deviceId.current);
        dispatchProfileContext(Actions.Profile.unsetCurrentProfileId());
        dispatchSwapContext(Actions.Swap.clearList()); // clear list
    });

    const connectToHub = async (profileId: string) => {
        try {
            deviceId.current = uuid4();
            const name: string = getProfile(profileId)?.vCard.name ?? '';
            const image: string = getProfile(profileId)?.image ?? '';
            let geo = mockGeo
                ? {
                      coords: {
                          longitude: 1,
                          latitude: 1,
                      },
                  }
                : await Geolocation.getCurrentPosition();

            if (debug) {
                setLon(geo.coords.longitude);
                setLat(geo.coords.latitude);
            }
            // Subscribe to the hub
            await server.Hub.Subscribe(deviceId.current, geo.coords.longitude, geo.coords.latitude, name, image);
            lastUpdateTimestamp.current = Date.now();
            // Update the current location every 2 seconds
            doUpdate.current = true;
            const updateHandler = async () => {
                if (doUpdate.current) {
                    if (!mockGeo) geo = await Geolocation.getCurrentPosition();
                    if (debug) {
                        setLon(geo.coords.longitude);
                        setLat(geo.coords.latitude);
                    }
                    // check if the last update is longer ago than 4 seconds (in that case we reconnect to ensure we have an image on the backend)
                    const elapsed = Date.now() - lastUpdateTimestamp.current;
                    // if (debug) console.log('last update ts:' + lastUpdateTimestamp.current);
                    // if (debug) console.log('elapsed:' + elapsed);
                    setTimeElapsed(elapsed);
                    if (elapsed > 3000) {
                        if (debug) console.log(new Date(Date.now()).toISOString + ' resubscribe');
                        try {
                            await server.Hub.Subscribe(
                                deviceId.current,
                                geo.coords.longitude,
                                geo.coords.latitude,
                                name,
                                image
                            );
                        } catch (err) {
                            console.log(err);
                        }
                    } else {
                        if (debug) console.log(new Date(Date.now()).toISOString() + ' update');
                        await server.Hub.Update(deviceId.current, geo.coords.longitude, geo.coords.latitude, name);
                    }
                    lastUpdateTimestamp.current = Date.now();
                    // if (debug) console.log('set update ts:' + lastUpdateTimestamp.current);
                    if (doUpdate.current) setTimeout(updateHandler, 2000);
                }
            };
            setTimeout(updateHandler, 2000);
        } catch (error) {
            console.error('Error: ', error);
            alert(translate(i18n, 'Connection_Or_Geolocation_Error'));
            doUpdate.current = false;
            history.goBack();
        }
    };

    const onDoRequestAll = async () => {
        // request all non requested or from whose no request is received
        const entries = [...swapContext.filter((entry) => entry.state === SwapState.initial && entry.online)];
        for (const entry of entries) await onDoRequest(entry.deviceId);
    };

    const getNumberOfRequestAll = () => {
        return swapContext.filter((entry) => entry.state === SwapState.initial && entry.online).length;
    };

    const onAcceptAll = async () => {
        const entries = [...swapContext.filter((entry) => entry.state === SwapState.received && entry.online)];
        for (const entry of entries) await onAcceptRequest(entry.deviceId);
    };

    const getNumberOfAcceptAll = () => {
        return swapContext.filter((entry) => entry.state === SwapState.received && entry.online).length;
    };

    const onDoRequest = async (peerDeviceId: string) => {
        if (debug) console.log(new Date(Date.now()).toISOString() + ' + request to: ' + peerDeviceId);
        await server.Hub.RequestCardExchange(deviceId.current, peerDeviceId, getCurrentProfileNameField());
    };

    const onAcceptRequest = async (peerDeviceId: string) => {
        await server.Hub.AcceptCardExchange(
            deviceId.current,
            peerDeviceId,
            getCurrentProfileNameField(),
            JSON.stringify(getCurrentVCard()),
            getProfile(profileContext.currentProfileId!)?.image ?? ''
        );
    };

    const onAbortRequest = async (peerDeviceId: string) => {
        if (debug) console.log('abort to: ' + peerDeviceId);
        await server.Hub.RevokeCardExchangeRequest(deviceId.current, peerDeviceId);
    };

    const renderList = () => {
        // !!!! DON'T REMOVE THE DIV AROUND THE LISTITEM, BECAUSE IT FIXES A SORTING BUG WHEN MORE THAN 2 ELEMENTS WITH THE SAME NAME ARE SHOWN !!!
        return swapList.map((entry) => (
            <div key={entry.deviceId}>
                <SwapViewListItem
                    thumbnailUrl={entry.thumbnailUrl}
                    key={entry.deviceId}
                    name={entry.displayName}
                    state={entry.state}
                    onDoRequest={() => onDoRequest(entry.deviceId)}
                    onAcceptRequest={() => onAcceptRequest(entry.deviceId)}
                    onAbortRequest={() => onAbortRequest(entry.deviceId)}
                    dist={
                        debug && lon && lat && entry.longitude && entry.latitude
                            ? distance(lat, lon, entry.latitude, entry.longitude)
                            : undefined
                    }
                />
            </div>
        ));
    };

    const renderFooter = () => {
        if (segmentFilter === 'swap-list')
            return (
                <IonFooter>
                    {debug && <IonItem>DeviceId:{deviceId.current}</IonItem>}
                    {debug && lon && lat && (
                        <IonItem>
                            LonLat:{lon.toString().substr(0, 9)} - {lat.toString().substr(0, 9)}
                        </IonItem>
                    )}
                    {debug && <IonItem>Last update span:{timeElapsed}</IonItem>}
                    <IonItem>
                        <IonList className='swap-footer-button-list'>
                            <IonButton className='swap-footer-button' onClick={onDoRequestAll}>
                                <FontAwesomeIcon className='fa fa-lg' icon={faShareAll} />
                                <IonLabel className='swap-footer-button-text'>
                                    {translate(i18n, 'Request_All')} {getNumberOfRequestAll()}
                                </IonLabel>
                            </IonButton>
                            <IonButton className='swap-footer-button' onClick={onAcceptAll}>
                                <FontAwesomeIcon className='fa fa-lg' icon={faCheckDouble} />
                                <IonLabel className='swap-footer-button-text'>
                                    {translate(i18n, 'Accept_All')} {getNumberOfAcceptAll()}
                                </IonLabel>
                            </IonButton>
                        </IonList>
                    </IonItem>
                </IonFooter>
            );
    };

    return (
        <IonPage>
            <IonHeader translucent={true}>
                <IonToolbar color='primary'>
                    <IonButtons slot='start'>
                        <IonBackButton />
                    </IonButtons>
                    <IonTitle>{translate(i18n, 'Exchange')}</IonTitle>
                </IonToolbar>
                <IonToolbar color='primary'>
                    <IonSegment value={segmentFilter} onIonChange={(e) => setSegmentFilter(e.detail.value as string)}>
                        <IonSegmentButton value='swap-list' className='swap-segment-button'>
                            <FontAwesomeIcon className='fa fa-lg' icon={faPollPeople} />
                            <IonLabel>
                                {translate(i18n, 'Swap_candidates')} ({getCandidatesEntries().length})
                            </IonLabel>
                        </IonSegmentButton>
                        <IonSegmentButton value='ready-list'>
                            <FontAwesomeIcon className='fa fa-lg' icon={faCheck} />
                            <IonLabel>
                                {translate(i18n, 'Received')} ({getExchangedEntries().length})
                            </IonLabel>
                        </IonSegmentButton>
                    </IonSegment>
                </IonToolbar>
            </IonHeader>

            <IonContent>
                {getOnlineOrExchangedEntries().length === 0 && (
                    <LoadingSpinner message={translate(i18n, 'Wait_for_contacts')} />
                )}
                <IonList>{renderList()}</IonList>
            </IonContent>
            {renderFooter()}
        </IonPage>
    );
};

export default SwapView;
