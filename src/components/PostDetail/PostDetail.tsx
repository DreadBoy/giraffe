import * as React from 'react';
import {FunctionComponent, useEffect} from 'react';
import {Box, CircularProgress, Grid} from '@material-ui/core';
import {observer, useObservable} from 'mobx-react-lite';
import {Fetcher} from '../../store/fetcher';
import {Main} from '../Layout/Main';
import axios, {AxiosError} from 'axios';
import {Card} from '../Landing/Card';
import {headers} from '../../services/auth';
import {NetworkErrorCallout} from '../NetworkErrorCallout';
import {useParams} from '@tanstack/react-router';

type PostResponse = APIResponse<GalleryAlbumResponse>;

export const PostDetail: FunctionComponent = observer(() => {
    const {id} = useParams({from: '/post/$id'});
    const fetcher = useObservable(new Fetcher<PostResponse>());

    useEffect(() => {
        fetcher
            .fetch(
                axios.get<PostResponse>(
                    `https://api.imgur.com/3/gallery/${id}`,
                    {headers},
                ),
                id,
            )
            .catch(console.error);
    }, [fetcher, id]);

    return (
        <Main heading={'Giraffe'}>
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
                        <Card item={fetcher.data.data} key={fetcher.data.data.id}/>
                    </Grid>
                ) : null
            }
        </Main>
    );
});
