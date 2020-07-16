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
// import * as vCardsJS from 'vcards-js';

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


  function getVcardFormatedString( vcard: IVCard)
  {
    let vCardsJS = require('vcards-js');
    let card = vCardsJS();

    card.version = '3.0';
  
    // card.lastName = 'Doe';
    // card.middleName = 'D';
    card.firstName = vcard.name;
    // card.nameSuffix = 'JR';
    // card.namePrefix = 'MR';
    // card.nickname = 'Test User';
    // card.gender = 'M';
    card.organization = vcard.company;
    // card.photo.attachFromUrl('https://....', 'png');
    // card.logo.attachFromUrl('https://....', 'png');
    // card.workPhone = '312-555-1212';
    // card.homePhone = '312-555-1313';
    card.cellPhone = vcard.phone;
    // card.pagerPhone = '312-555-1515';
    // card.homeFax = '312-555-1616';
    card.workFax = vcard.fax;
    // card.birthday = new Date(2018, 11, 1);
    // card.anniversary = new Date(2018, 11, 1);
    // card.title = 'Crash Test Dummy';
    card.role = vcard.position;
    //card.email = vcard.email;
    card.workEmail = vcard.email;
    //card.url = 'http://johndoe';
    card.workUrl = vcard.website;

    // card.homeAddress.label = 'Home Address';
    // card.homeAddress.street = '123 Main Street';
    // card.homeAddress.city = 'Chicago';
    // card.homeAddress.stateProvince = 'IL';
    // card.homeAddress.postalCode = '12345';
    // card.homeAddress.countryRegion = 'United States of America';

    card.workAddress.label = 'Address';
    card.workAddress.street = vcard.street;
    card.workAddress.city = vcard.location;
    //card.workAddress.stateProvince = 'CA';
    card.workAddress.postalCode = vcard.zipCode;
    card.workAddress.countryRegion = vcard.country;

    // card.source = 'http://sourceurl';
    // card.note = 'John Doe\'s \nnotes;,';

    // card.socialUrls.facebook = 'https://facebook/....';
    // card.socialUrls.linkedIn = 'https://linkedin/....';
    // card.socialUrls.twitter = 'https://twitter/....';
    // card.socialUrls.flickr = 'https://flickr/....';
    // card.socialUrls.custom = 'https://custom/....';

    var vCardString = card.getFormattedString();

    return vCardString;

  }



 function getVcardFormatedData( vcard: IVCard)
 {
  let version :number = 3;

  let encodingPrefix = version >= 4 ? '' : ';CHARSET=UTF-8';
 

  let nl = '\r\n';
  let data = "BEGIN:VCARD\n"+
              "VERSION:4.0\n"
  // data += "N:"+vcard.name?.replaceAll(" ",";");
  // data += newline;
  data += "FN:"+vcard.name;
  data += nl;
  data += "ORG:"+vcard.company;
  data += nl;
  data += "TEL;TYPE=work,voice;VALUE=uri:tel:"+vcard.phone;
  data += nl;
  data += "EMAIL:"+vcard.email;
  data += nl;
  data += "END:VCARD";

  return data;
 }

  if (currentProfile) {
    return (
      <IonPage>
        <IonHeader translucent={true}>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton />
            </IonButtons>
            <IonTitle>{i18n.formatMessage({ id: nameof<IvCardTranslations>('QR_code') })+" - "+currentProfile.name}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen={true}>
          <div className="qrcontainer">
            {/* <QRCode value={JSON.stringify(currentProfile?.vCard)} size={qrWidth} /> */}
            {/* <QRCode value={getVcardFormatedString(currentProfile?.vCard)} size={qrWidth} /> */}
            <QRCode value={getVcardFormatedString(currentProfile?.vCard)} size={qrWidth} />
          </div>
        </IonContent>
      </IonPage>
    );
  } else {
    return <React.Fragment />;
  }
};

export default QrView;
