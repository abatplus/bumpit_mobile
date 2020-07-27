import React from 'react';
import { withRouter, useLocation } from 'react-router';
import {
  IonContent,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonMenuToggle,
  IonFooter,
  IonToolbar,
  IonTitle,
  IonImg,
} from '@ionic/react';
import { faBarcodeRead, faIdCard, IconDefinition } from '@fortawesome/pro-duotone-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useAppContext } from '../store/contexts/AppContext';
import './Menu.css';
import { useIntl } from 'react-intl';
import { translate } from '../utils';
import { IonText } from '@ionic/react';

interface IPages {
  title: string;
  path: string;
  icon?: IconDefinition;
  routerDirection?: string;
}

const Menu: React.FC = () => {
  const location = useLocation();
  const { appContext } = useAppContext();

  const i18n = useIntl();

  const routes = {
    tabsPages: [
      {
        title: translate(i18n, 'Profiles'),
        path: '/profile',
        icon: faIdCard,
      },
      { title: translate(i18n, 'Scan'), path: '/scan', icon: faBarcodeRead },
    ],
    appPages: [
      {
        title: translate(i18n, 'Terms_and_conditions'),
        path: '/termsAndConditions',
      },
      { title: translate(i18n, 'Privacy_Protection'), path: '/privacy' },
      { title: translate(i18n, 'Legal_Information'), path: '/legal' },
      { title: translate(i18n, 'About'), path: '/about' },
    ],
  };

  const renderListItems = (list: IPages[]) => {
    return list
      .filter((route) => !!route.path)
      .map((p) => (
        <IonMenuToggle key={p.title} auto-hide='false'>
          <IonItem
            detail={false}
            routerLink={p.path}
            routerDirection='none'
            className={location.pathname.startsWith(p.path) ? 'selected' : undefined}
            disabled={appContext.isLoading}>

            {p.icon && <FontAwesomeIcon className="fa fa-2x menuline-icon" icon={p.icon} />}
            <IonLabel >{p.title}</IonLabel>
          </IonItem>
        </IonMenuToggle>
      ));
  };

  // detect darkmode and switch imgsrc
  const logo = window.matchMedia('(prefers-color-scheme: dark)').matches ? 
    '../../assets/icon/Logo_vSwap_Menue-Drawer Darkmode.png' 
    : 
    '../../assets/icon/Logo_vSwap_Menue-Drawer.png';

  const menuItemColor = window.matchMedia('(prefers-color-scheme: dark)').matches ? 
    'secondary' : '';

  return (
    <IonMenu type='overlay' disabled={!appContext.menuEnabled} contentId='main'>
      <IonContent forceOverscroll={false} className="menu-background">
        <IonItem lines='inset' color='secondary'>
          <IonImg className='app-icon' src={logo}></IonImg>
        </IonItem>
        <IonItem lines='inset' color={menuItemColor}>
          <IonList lines='none'>{renderListItems(routes.tabsPages)}</IonList>
        </IonItem>
        <IonItem>
          <IonList lines='none'>{renderListItems(routes.appPages)}</IonList>
        </IonItem>
      </IonContent>
      <IonFooter className='menu-footer'>
          <IonText className='poweredBy'>POWERED BY abat+</IonText>
      </IonFooter>
    </IonMenu>
  );
};

export default withRouter(Menu);
