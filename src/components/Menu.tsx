import React from 'react';
import { withRouter, useLocation } from 'react-router';
import {
  IonContent,
  IonIcon,
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
import { peopleOutline, scan } from 'ionicons/icons';
import { useAppContext } from '../store/contexts/AppContext';
import './Menu.css';
import { useIntl } from 'react-intl';
import { translate } from '../utils';

interface IPages {
  title: string;
  path: string;
  icon?: string;
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
        icon: peopleOutline,
      },
      { title: translate(i18n, 'Scan'), path: '/scan', icon: scan },
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
            {p.icon && <IonIcon slot='start' icon={p.icon} />}
            <IonLabel>{p.title}</IonLabel>
          </IonItem>
        </IonMenuToggle>
      ));
  };

  return (
    <IonMenu type='overlay' disabled={!appContext.menuEnabled} contentId='main'>
      <IonContent forceOverscroll={false}>
        <IonItem lines='none'>
          <IonImg className='app-icon' src='../../assets/icon/Logo_dummy.png'></IonImg>
        </IonItem>
        <IonItem lines='inset'>
          <IonLabel className='app-name'>
            {translate(i18n, 'appName')}
          </IonLabel>
        </IonItem>
        <IonItem lines='inset'>
          <IonList lines='none'>{renderListItems(routes.tabsPages)}</IonList>
        </IonItem>
        <IonList lines='none'>{renderListItems(routes.appPages)}</IonList>
      </IonContent>
      <IonFooter className='footer'>
        <IonToolbar>
          <IonTitle className='poweredBy' size='small'>
            powered by abat+
                    </IonTitle>
        </IonToolbar>
      </IonFooter>
    </IonMenu>
  );
};

export default withRouter(Menu);
