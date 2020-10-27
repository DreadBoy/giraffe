import * as React from 'react';
import {ErrorInfo} from 'react';
import {Favicon} from './Head/Favicon';
import {ServiceWorkerProvider} from './ServiceWorker/Context';
import {UpdateNotification} from './ServiceWorker/UpdateNotification';
import {Landing} from './Landing/Landing';
import {ThemeProvider} from '@material-ui/core/styles';
import teal from '@material-ui/core/colors/teal'
import {createMuiTheme, CssBaseline, Theme} from '@material-ui/core';
import {ErrorCallout} from './ErrorCallout';

interface State {
    error?: Error,
    info?: ErrorInfo,
}

export class Root extends React.Component<{}, State> {
    private readonly theme: Theme;

    constructor(props: {}) {
        super(props);
        this.theme = createMuiTheme({
            palette: {
                type: 'dark',
                primary: teal,
            },
            overrides: {
                MuiCardHeader: {
                    title: {
                        wordBreak: 'break-word',
                    },
                    subheader: {
                        wordBreak: 'break-word',
                    },
                },
                MuiTypography: {
                    body1: {
                        wordBreak: 'break-word',
                    },
                },
            },
        });
        this.state = {};
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        console.error(error);
        console.trace(errorInfo.componentStack);
        this.setState({
            error,
            info: errorInfo,
        });
    }

    public render() {
        return (
            <>
                <Favicon/>
                <ThemeProvider theme={this.theme}>
                    <CssBaseline/>
                    <ServiceWorkerProvider>
                        <UpdateNotification/>
                        {this.state.error ? (
                            <ErrorCallout error={this.state.error} errorInfo={this.state.info}/>
                        ) : (
                            <Landing/>
                        )}
                    </ServiceWorkerProvider>
                </ThemeProvider>
            </>
        );
    }
}
