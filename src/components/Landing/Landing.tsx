import * as React from 'react';
import {FunctionComponent, useEffect, useState} from 'react';
import {Box, CircularProgress, Grid, IconButton} from '@material-ui/core';
import {observer, useObservable} from 'mobx-react-lite';
import {Fetcher} from '../../store/fetcher';
import {Main} from '../Layout/Main';
import axios from 'axios';
import {ErrorCallout} from '../ErrorCallout';
import {Card} from './Card';
import {Refresh} from '@material-ui/icons';
import {headers} from '../../services/auth';

type LandingResponse = APIResponse<GalleryAlbumResponse[]>;

export const Landing: FunctionComponent = observer(() => {

    const fetcher = useObservable(new Fetcher<LandingResponse>());
    const newId = () => new Date().getTime();
    const [id, setId] = useState<number>(newId());
    useEffect(() => {
        fetcher
            .fetch(
                axios.get<LandingResponse>(
                    'https://api.imgur.com/3/gallery/hot/time',
                    {headers},
                ),
                Math.random().toString(10),
            )
            .catch(console.error);
    }, [fetcher, id]);

    return (
        <Main
            heading={'Giraffe'}
            actions={(
                <IconButton
                    edge="start"
                    color="inherit"
                    href='#'
                    onClick={() => setId(newId())}
                >
                    <Refresh/>
                </IconButton>
            )}
        >
            {
                fetcher.error ? (
                    <ErrorCallout error={fetcher.error}/>
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
        </Main>
    );
});
