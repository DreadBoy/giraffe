import * as React from 'react';

import 'normalize.css/normalize.css';

import './Root.sass';
import {BrowserRouter} from 'react-router-dom';
import {Favicon} from './Head/Favicon';
import {Provider as ServiceWorkerProvider} from './ServiceWorker/Context';
import {UpdateNotification} from './ServiceWorker/UpdateNotification';
import {Landing} from './Landing/Landing';
import {ThemeProvider} from '@material-ui/styles';
import {createMuiTheme, Theme} from '@material-ui/core';

export class Root extends React.PureComponent {
    private readonly theme: Theme;

    constructor(props: {}) {
        super(props);
        this.theme = createMuiTheme({
            palette: {
                type: 'dark', // Switching the dark mode on is a single property value change.
            },
        });
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
        console.error(error);
        console.trace(errorInfo.componentStack);
    }

    public render() {
        return (
            <>
                <Favicon/>
                <BrowserRouter>
                    <ThemeProvider theme={this.theme}>
                        <ServiceWorkerProvider>
                            <UpdateNotification/>
                            <Landing/>
                        </ServiceWorkerProvider>
                    </ThemeProvider>
                </BrowserRouter>
            </>
        );
    }
}
