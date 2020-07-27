import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import {
    IonHeader,
    IonToolbar,
    IonContent,
    IonPage,
    IonButtons,
    IonMenuButton,
    IonTitle,
    useIonViewDidEnter,
    isPlatform,
    useIonViewDidLeave,
} from '@ionic/react';
import './ScanView.css';
import QrReader from 'react-qr-reader';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { IVCard } from '../interfaces/IVCard';
import { getEmptyVCard } from '../store/dataApi';

const ScanView: React.FC = () => {
    const history = useHistory();
    const [qrWidth, setQrWidth] = useState<number>();
    const [windowSize, setWindowSize] = useState([window.innerWidth, window.innerHeight]);
    const [isInView, setIsInView] = useState<boolean>(false);

    useEffect(() => {
        // calculate size depending on screen orientation
        let size = windowSize[1] > windowSize[0] ? windowSize[0] - 100 : windowSize[1] - 100;
        // limit max size
        size = size > 400 ? 400 : size;
        setQrWidth(size);
    }, [windowSize]);

    function updateWindowSize() {
        setWindowSize([window.innerWidth, window.innerHeight]);
    }

    // only fire resize event after 500ms due performance reason
    let resizeId: NodeJS.Timeout;
    window.addEventListener('resize', function () {
        clearTimeout(resizeId);
        resizeId = setTimeout(updateWindowSize, 500);
    });

    function onScanCompleted(data: string) {
        if (data && data.length > 0 ) {
            let vCard = getEmptyVCard();
            try {
                vCard = parseQrDataToVcard(data.replace(/\n/g, '\r\n'));
                history.replace('/newContact', vCard);
            } catch (error) {
                window.alert('Invalid QR code.\n'); // + error);
                history.goBack();
            }   
        } else {
            history.goBack();
        }
    }

    useIonViewDidEnter(() => {
        setIsInView(true);
        if (isPlatform('cordova') || isPlatform('capacitor')) {
            BarcodeScanner.scan().then((data) => onScanCompleted(data.text));
        }
    });

    useIonViewDidLeave(() => {
        setIsInView(false);
    });

    //return the name from the vcf data
    function getName(vcfData: any): string {
        let name = '';
        let fn = vcfData.get('fn');
        if (fn && !fn.isEmpty()) {
            name = fn.valueOf();
        } else {
            let n = vcfData.get('n');
            if (n && !n.isEmpty()) {
                let value = n.valueOf() as string;
                let nParts = value.split(';');
                name = nParts[0];
                if (nParts.length > 1) {
                    name = nParts[1] + ' ' + name;
                }
                if (nParts.length > 3) {
                    name = nParts[3] + ' ' + name;
                }
            }
        }

        return name;
    }

    // extraxt the propertyName value from vcfData
    function getPropertyValue(vcfData: any, propertyName: string): string {
        let value = '';
        let propertyRes = vcfData.get(propertyName);

        let property = propertyRes;
        if (Array.isArray(propertyRes)) {
            property = propertyRes[0];
        }
        if (property && !property.isEmpty()) {
            value = property.valueOf();
        }

        return value;
    }

    //return true if all elements from the types array  are found in the type elements of property
    function hasTypes(types: string[], property: any): boolean {
        if (property && property.type) {
            let propertyTyps: string[] = [].concat(property.type);
            return types.every((type) => propertyTyps.includes(type));
        }

        return false;
    }

    // get the value of a property with same types
    function getTypedPropertyValue(vcfData: any, propertyName: string, types: string[]): string {
        let property = vcfData.get(propertyName);

        if (Array.isArray(property)) {
            for (let i = 0; i < property.length; i++) {
                if (hasTypes(types, property[i])) {
                    return property[i].valueOf();
                }
            }
        } else if (property && hasTypes(types, property)) {
            return property.valueOf();
        }

        return '';
    }

    // transform the scanned QR data in a IVCard object
    function parseQrDataToVcard(data: string): IVCard {
        var vcf = require('vcf');
        let vcfCard = new vcf().parse(data);
        let vcard: IVCard = getEmptyVCard();

        vcard.name = getName(vcfCard);
        let tel = getTypedPropertyValue(vcfCard, 'tel', ['cell']);
        if (tel && tel.trim().length > 0) {
            vcard.phone = tel;
        } else {
            tel = getTypedPropertyValue(vcfCard, 'tel', ['voice']);
            if (tel && tel.trim().length > 0) {
                vcard.phone = tel;
            } else {
                vcard.phone = getPropertyValue(vcfCard, 'tel');
            }
        }
        vcard.fax = getTypedPropertyValue(vcfCard, 'tel', ['fax']);
        vcard.company = getPropertyValue(vcfCard, 'org');
        vcard.website = getPropertyValue(vcfCard, 'url');
        vcard.position = getPropertyValue(vcfCard, 'role');
        vcard.email = getPropertyValue(vcfCard, 'email');
        let adr = getPropertyValue(vcfCard, 'adr');
        if (adr) {
            let adrParts = adr.split(';');
            if (adrParts.length > 2) vcard.street = adrParts[2];
            if (adrParts.length > 3) vcard.location = adrParts[3];
            if (adrParts.length > 5) vcard.zipCode = adrParts[5];
            if (adrParts.length > 6) vcard.country = adrParts[6];
        }

        return vcard;
    }

    const renderBrowserScanner = () => {
        if (isInView)
            return (
                <div className='qrReaderContainer'>
                    <QrReader
                        className='qrReader'
                        delay={1000}
                        onError={(err) => {
                            // alert(err);
                        }}
                        onScan={(data) => {
                            if (data !== null) {
                                onScanCompleted(data);
                            }
                        }}
                        style={{ width: qrWidth }}
                    />
                </div>
            );

        return <div></div>;
    };

    return (
        <IonPage id='scan'>
            <IonHeader>
                <IonToolbar color="primary">
                    <IonButtons slot='start'>
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle>Scan QR code</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent>{!isPlatform('cordova') && !isPlatform('capacitor') && renderBrowserScanner()}</IonContent>
        </IonPage>
    );
};

export default ScanView;
