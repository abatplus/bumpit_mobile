import React from 'react';
import { withRouter, useLocation } from 'react-router';
import { IonContent, IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonMenu, IonMenuToggle } from '@ionic/react';
import { peopleCircleOutline } from 'ionicons/icons';
import { useAppContext } from '../store/contexts/AppContext';
import './Menu.css';
import { useIntl } from 'react-intl';
import IvCardTranslations from '../i18n/IvCardTranslations';
import { nameof } from '../utils';

interface Pages {
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
    appPages: [
      { title: i18n.formatMessage({ id: nameof<IvCardTranslations>('Terms_and_conditions') }), path: 'termsAndConditions' },
      { title: i18n.formatMessage({ id: nameof<IvCardTranslations>('Privacy_Protection') }), path: '/privacy' },
      { title: i18n.formatMessage({ id: nameof<IvCardTranslations>('Legal_Information') }), path: '/legal' },
      { title: i18n.formatMessage({ id: nameof<IvCardTranslations>('About') }), path: '/about' },
    ],
  };

  function renderlistItems(list: Pages[]) {
    return list
      .filter((route) => !!route.path)
      .map((p) => (
        <IonMenuToggle key={p.title} auto-hide="false">
          <IonItem
            detail={false}
            routerLink={p.path}
            routerDirection="none"
            className={location.pathname.startsWith(p.path) ? 'selected' : undefined}
            disabled={appContext.isLoading}
          >
            {/* <IonIcon slot="start" icon={p.icon} /> */}
            <IonLabel>{p.title}</IonLabel>
          </IonItem>
        </IonMenuToggle>
      ));
  }

  return (
    <IonMenu type="overlay" disabled={!appContext.menuEnabled} contentId="main">
      <IonContent forceOverscroll={false}>
        <IonList lines="none">
          <IonListHeader>
            <IonItem>
              <IonIcon slot="end" icon={peopleCircleOutline} />
              <IonLabel>{i18n.formatMessage({ id: nameof<IvCardTranslations>('appName') })}</IonLabel>
            </IonItem>
          </IonListHeader>
          {renderlistItems(routes.appPages)}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default withRouter(Menu);
