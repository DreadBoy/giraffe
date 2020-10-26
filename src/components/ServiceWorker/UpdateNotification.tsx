import * as React from 'react';
import {FunctionComponent, useCallback, useState} from 'react';
import {useServiceWorker} from './Context';
import {Button, IconButton, makeStyles, Snackbar, SnackbarContent} from '@material-ui/core';
import {Close} from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
    info: {
        backgroundColor: theme.palette.primary.main,
    },
}));

export const UpdateNotification: FunctionComponent = () => {
    const classes = useStyles();
    const {isUpdateAvailable, update: _update} = useServiceWorker();


    const [hidden, _setHide] = useState<boolean>(false);
    const hide = useCallback(() => {
        _setHide(true);
    }, []);

    const [loading, setLoading] = useState<boolean>(false);
    const update = useCallback(() => {
        setLoading(true);
        _update();
    }, [_update]);

    if (!isUpdateAvailable || hidden) return null;

    return (
        <Snackbar
            anchorOrigin={{vertical: 'top', horizontal: 'center'}}
            onClose={hide}
            open={!hidden}
        >
            <SnackbarContent
                className={classes.info}
                message={'Update available, restart to apply it!'}
                action={
                    <>
                        <Button
                            size="small"
                            onClick={update}
                            disabled={loading}
                            href={'#'}
                        >
                            Restart
                        </Button>
                        <IconButton
                            size="small"
                            aria-label="close"
                            onClick={hide}>
                            <Close fontSize="small"/>
                        </IconButton>
                    </>
                }
            />
        </Snackbar>
    )
};
