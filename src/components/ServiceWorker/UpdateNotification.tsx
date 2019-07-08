import * as React from 'react';
import {FunctionComponent, useState} from 'react';
import {useServiceWorker} from './Context';
import {Button, makeStyles, Snackbar, SnackbarContent} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    info: {
        backgroundColor: theme.palette.primary.main,
    },
}));

export const UpdateNotification: FunctionComponent = () => {
    const classes = useStyles();
    const {updated} = useServiceWorker();
    const [closed, setClosed] = useState(false);
    if (!updated || closed)
        return null;
    return (
        <Snackbar
            anchorOrigin={{vertical: 'top', horizontal: 'center'}}
            onClose={() => setClosed(true)}
            open={!closed}
        >
            <SnackbarContent
                className={classes.info}
                message={'Update available, restart to apply it!'}
                action={
                    <Button
                        size="small"
                        onClick={() => window.location.reload()}
                        href={'#'}
                    >
                        Restart
                    </Button>
                }
            />
        </Snackbar>
    )
};
