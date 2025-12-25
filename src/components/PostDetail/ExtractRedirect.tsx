import * as React from 'react';
import {FunctionComponent, useEffect} from 'react';
import {useNavigate, useSearch} from '@tanstack/react-router';
import {Box, CircularProgress} from '@material-ui/core';
import {extractImgurId} from '../../services/imgur-utils';

export const ExtractRedirect: FunctionComponent = () => {
    const navigate = useNavigate();
    const {url} = useSearch({from: '/post/extract'});

    useEffect(() => {
        if (!url) {
            navigate({to: '/'});
            return;
        }

        const id = extractImgurId(url);
        if (id) {
            navigate({to: '/post/$id', params: {id}});
        } else {
            navigate({to: '/'});
        }
    }, [url, navigate]);

    return (
        <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            minHeight="100vh"
        >
            <CircularProgress/>
        </Box>
    );
};
