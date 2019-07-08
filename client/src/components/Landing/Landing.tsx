import * as React from 'react';
import {FunctionComponent, useEffect} from 'react';
import {CircularProgress, Grid} from '@material-ui/core';
import {observer, useObservable} from 'mobx-react-lite';
import {Fetcher} from '../../store/fetcher';
import {Main} from '../Layout/Main';
import axios from 'axios';
import {ErrorCallout} from '../ErrorCallout';
import {Card} from './Card';

type LandingResponse = APIResponse<GalleryAlbumResponse[]>;

export const Landing: FunctionComponent = observer(() => {

    const fetcher = useObservable(new Fetcher<LandingResponse>());
    useEffect(() => {
        fetcher
            .fetch(
                axios.get<LandingResponse>(
                    'https://api.imgur.com/3/gallery/hot/time',
                    {
                        headers: {
                            Authorization: 'Client-ID 52680c0415d6925',
                        },
                    },
                ),
                Math.random().toString(10),
            )
            .catch(console.error);
    }, []);

    return (
        <Main heading={'Giraffe'}>
            <Grid container spacing={1}>
                {
                    fetcher.error ? (
                        <ErrorCallout error={fetcher.error}/>
                    ) : fetcher.loading ? (
                        <CircularProgress/>
                    ) : fetcher.data ?
                        fetcher.data.data
                            .map(item => (
                                <Card item={item} key={item.id}/>
                            ))
                            .filter(Boolean) : null
                }
            </Grid>
        </Main>
    );
});
