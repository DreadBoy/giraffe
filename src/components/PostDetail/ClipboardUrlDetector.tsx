import * as React from 'react';
import {FunctionComponent, useCallback, useEffect, useState} from 'react';
import {Button, makeStyles, Snackbar, SnackbarContent} from '@material-ui/core';
import {useNavigate} from '@tanstack/react-router';
import {extractImgurId} from '../../services/imgur-utils';

const useStyles = makeStyles(theme => ({
    info: {
        backgroundColor: theme.palette.primary.main,
    },
}));

export const ClipboardUrlDetector: FunctionComponent = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    const [detectedUrl, setDetectedUrl] = useState<string | null>(null);
    const [open, setOpen] = useState<boolean>(false);

    useEffect(() => {
        (async () => {
            try {
                const text = await navigator.clipboard.readText();
                if (text && text.includes('imgur.com')) {
                    const imgurId = extractImgurId(text);
                    if (imgurId) {
                        setDetectedUrl(imgurId);
                        setOpen(true);
                    }
                }
            } catch (error) {
                // Clipboard access denied or not available, silently ignore
            }
        })();
    }, []);

    const handleRedirect = useCallback(() => {
        if (detectedUrl) {
            navigate({to: '/post/$id', params: {id: detectedUrl}});
        }
        setOpen(false);
    }, [detectedUrl, navigate]);

    const dismiss = useCallback(() => {
        setOpen(false);
    }, []);

    if (!detectedUrl) return null;

    return (
        <Snackbar
            anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
            onClose={dismiss}
            open={open}
        >
            <SnackbarContent
                className={classes.info}
                message={'Post URL detected, redirect?'}
                action={
                    <>
                        <Button
                            size="small"
                            onClick={handleRedirect}
                            href={'#'}
                        >
                            Redirect
                        </Button>
                    </>
                }
            />
        </Snackbar>
    );
};
