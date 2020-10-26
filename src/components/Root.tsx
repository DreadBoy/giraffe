import * as React from 'react';
import {ErrorInfo} from 'react';
import {Favicon} from './Head/Favicon';
import {Provider as ServiceWorkerProvider} from './ServiceWorker/Context';
import {UpdateNotification} from './ServiceWorker/UpdateNotification';
import {Landing} from './Landing/Landing';
import {ThemeProvider} from '@material-ui/core/styles';
import teal from '@material-ui/core/colors/teal'
import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    createMuiTheme,
    CssBaseline,
    Theme,
    Typography,
} from '@material-ui/core';

interface State {
    error: Error | null,
    info: ErrorInfo | null,
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
        });
        this.state = {
            error: null,
            info: null,
        };
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
        let githubIssue = '';
        if (this.state.error && this.state.info) {
            const title = encodeURIComponent(this.state.error.message);
            const body = encodeURIComponent(this.state.error.message) + '\n\n' + encodeURIComponent(this.state.info.componentStack);
            githubIssue = `https://github.com/DreadBoy/giraffe/issues/new?body=${body}&title=${title}`;
        }
        return (
            <>
                <Favicon/>
                <ThemeProvider theme={this.theme}>
                    <CssBaseline/>
                    <ServiceWorkerProvider>
                        <UpdateNotification/>
                        {this.state.error ? (
                            <Card>
                                <CardHeader title={'Oops, something went wrong'}/>
                                <CardContent>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        Please report this error by clicking button below.
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button href={githubIssue} target={'_blank'}>
                                        Report error
                                    </Button>
                                </CardActions>
                            </Card>
                        ) : (
                            <Landing/>
                        )}
                    </ServiceWorkerProvider>
                </ThemeProvider>
            </>
        );
    }
}
