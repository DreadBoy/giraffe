import * as React from 'react';
import {FunctionComponent, useEffect} from 'react';
import {Card, CardHeader, CardMedia, CircularProgress, Grid} from '@material-ui/core';
import {observer, useObservable} from 'mobx-react-lite';
import {Fetcher} from '../../store/fetcher';
import {Main} from '../Layout/Main';
import axios from 'axios';
import {ErrorCallout} from '../ErrorCallout';

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
                            .map(item => item.images && item.images.length > 0 ? (
                                <Grid item xs={12}>
                                    <Card key={item.id}>
                                        <CardHeader title={item.title} subheader={item.account_url}/>
                                        <CardMedia
                                            component='img'
                                            src={item.images[0].link}
                                            title={item.title}
                                        />
                                    </Card>
                                </Grid>
                            ) : null)
                            .filter(Boolean) : null
                }
            </Grid>
        </Main>
    );
});
