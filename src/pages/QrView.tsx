import React, { useEffect, useState } from 'react';
import { IonHeader, IonToolbar, IonContent, IonPage, IonButtons, IonTitle, IonBackButton } from '@ionic/react';
import './QrView.css';
import QRCode from 'qrcode.react';
import { nameof } from '../utils';
import IvCardTranslations from '../i18n/IvCardTranslations';
import { useIntl } from 'react-intl';
import { useProfileContext } from '../store/contexts/ProfileContext';
import { useParams } from 'react-router';
import { IVCard } from '../interfaces/IVCard';


const QrView: React.FC = () => {
    const [qrWidth, setQrWidth] = useState<number>();
    const [windowSize, setWindowSize] = useState([window.innerWidth, window.innerHeight]);
    const { profileContext } = useProfileContext();

    const i18n = useIntl();

    useEffect(() => {
        // calculate size depending on screen orientation
        let size = windowSize[1] > windowSize[0] ? windowSize[0] - 100 : windowSize[1] - 200;
        // limit max size
        size = size > 400 ? 400 : size;
        setQrWidth(size);
    }, [windowSize, profileContext]);

    const { id } = useParams();

    const updateWindowSize = () => {
        setWindowSize([window.innerWidth, window.innerHeight]);
    };

    // only fire resize event after 500ms due performance reasons
    let resizeId: NodeJS.Timeout;
    window.addEventListener('resize', function () {
        clearTimeout(resizeId);
        resizeId = setTimeout(updateWindowSize, 500);
    });

    const currentProfile = profileContext.profiles.find((profile) => profile.id === id);

    function getVcardFormatedStringVCF(cardData: IVCard) {
        var vcf = require('vcf'); // npm install --save vcf
        let vcard = vcf();
        vcard.set('fn', cardData.name);
        vcard.set('org', cardData.company);
        vcard.set('tel', cardData.phone, { type: 'work,cell' });
        vcard.add('tel', cardData.fax, { type: 'work,fax' });
        vcard.set('email', cardData.email);
        let adressLabel =
            cardData.street + '\n' + cardData.zipCode + ', ' + cardData.location + '\n' + cardData.country;
        let adress =
            ';;' + cardData.street + ';' + cardData.location + ';;' + cardData.zipCode + ';' + cardData.country;
        vcard.set('adr', adress, { type: 'work', label: adressLabel });
        vcard.set('role', cardData.position);
        vcard.set('url', cardData.website);

        let data = vcard.toString('4.0');

        return data;
    }

    if (currentProfile) {
        return (
            <IonPage>
                <IonHeader translucent={true}>
                    <IonToolbar>
                        <IonButtons slot='start'>
                            <IonBackButton />
                        </IonButtons>
                        <IonTitle>
                            {i18n.formatMessage({ id: nameof<IvCardTranslations>('QR_code') }) +
                                ' - ' +
                                currentProfile.name}
                        </IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent fullscreen={true}>
                    <div className='qrcontainer'>
                        {<QRCode value={getVcardFormatedStringVCF(currentProfile?.vCard)} size={qrWidth} />}
                    </div>
                </IonContent>
            </IonPage>
        );
    } else {
        return <React.Fragment />;
    }
};

export default QrView;
