import * as React from 'react';

import 'normalize.css/normalize.css';

import './Root.sass';
import {BrowserRouter} from 'react-router-dom';
import {Favicon} from './Head/Favicon';
import {Provider as ServiceWorkerProvider} from './ServiceWorker/Context';
import {UpdateNotification} from './ServiceWorker/UpdateNotification';
import {Landing} from './Landing/Landing';

export class Root extends React.PureComponent {

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
        console.error(error);
        console.trace(errorInfo.componentStack);
    }

    public render() {
        return (
            <>
                <Favicon/>
                <BrowserRouter>
                    <ServiceWorkerProvider>
                        <UpdateNotification/>
                        <Landing/>
                    </ServiceWorkerProvider>
                </BrowserRouter>
            </>
        );
    }
}
