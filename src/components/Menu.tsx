import React from 'react';
import { RouteComponentProps, withRouter, useLocation } from 'react-router';

import { IonContent, IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonMenu, IonMenuToggle, IonToggle } from '@ionic/react';
import { help, informationCircleOutline, peopleCircleOutline } from 'ionicons/icons';
import { useAppContext } from '../store/contexts/AppContext';
import './Menu.css'

const routes = {
    appPages: [
        { title: 'Legal information', path: '/legal' },
        { title: 'Privacy', path: '/privacy' },
        { title: 'About', path: '/about' }
    ]
};

interface Pages {
    title: string,
    path: string,
    icon?: string,
    routerDirection?: string
}


interface MenuProps extends RouteComponentProps { }

const Menu: React.FC<MenuProps> = ({ history }) => {
    const location = useLocation();
    const { appContext } = useAppContext();

    function renderlistItems(list: Pages[]) {
        return list
            .filter(route => !!route.path)
            .map(p => (
                <IonMenuToggle key={p.title} auto-hide="false">
                    <IonItem detail={false} routerLink={p.path} routerDirection="none" className={location.pathname.startsWith(p.path) ? 'selected' : undefined} disabled={appContext.isLoading}>
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
                            <IonLabel>Exchange-It</IonLabel>
                        </IonItem>
                    </IonListHeader>
                    {renderlistItems(routes.appPages)}
                </IonList>
            </IonContent>
        </IonMenu>
    );
};


export default  withRouter(Menu)

