import * as React from 'react';
import {FunctionComponent, useCallback, useEffect, useState} from 'react';
import {Box, CircularProgress, Grid, IconButton} from '@material-ui/core';
import {observer, useObservable} from 'mobx-react-lite';
import {Fetcher} from '../../store/fetcher';
import {Main} from '../Layout/Main';
import axios, {AxiosError} from 'axios';
import {Card} from './Card';
import {Refresh} from '@material-ui/icons';
import {headers} from '../../services/auth';
import {NetworkErrorCallout} from '../NetworkErrorCallout';
import {ClipboardUrlDetector} from '../PostDetail/ClipboardUrlDetector';

type LandingResponse = APIResponse<GalleryAlbumResponse[]>;

export const Landing: FunctionComponent = observer(() => {
    const fetcher = useObservable(new Fetcher<LandingResponse>());
    const newId = useCallback(() => new Date().getTime().toString(), []);
    const [id, setId] = useState<string>(newId());
    const refresh = useCallback(() => setId(newId()), [newId]);

    useEffect(() => {
        fetcher
            .fetch(
                axios.get<LandingResponse>(
                    'https://api.imgur.com/3/gallery/hot/time',
                    {headers},
                ),
                id,
            )
            .catch(console.error);
    }, [fetcher, id]);

    return (
        <>
            <Main
                heading={'Giraffe'}
                actions={(
                    <IconButton onClick={refresh}>
                        <Refresh/>
                    </IconButton>
                )}
            >
                {
                    fetcher.error && (fetcher.error as AxiosError).isAxiosError ? (
                        <NetworkErrorCallout/>
                    ) : fetcher.loading ? (
                        <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                        >
                            <CircularProgress/>
                        </Box>
                    ) : fetcher.data ? (
                            <Grid container spacing={1}>
                                {fetcher.data.data
                                    .map(item => (
                                        <Card item={item} key={item.id}/>
                                    ))
                                    .filter(Boolean)}
                            </Grid>
                        )
                        : null
                }
                <ClipboardUrlDetector/>
            </Main>
        </>
    );
});
