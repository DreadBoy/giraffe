import * as React from 'react';
import {FunctionComponent, useEffect} from 'react';
import {Card, CardActionArea, CardMedia, CircularProgress} from '@material-ui/core';
import {useObservable} from 'mobx-react-lite';
import {Fetcher} from '../../store/fetcher';
import {Main} from '../Layout/Main';
import axios from 'axios';
import {ErrorCallout} from '../ErrorCallout';

export const Landing: FunctionComponent = () => {

    const fetcher = useObservable(new Fetcher<CustomGalleryResponse>());
    useEffect(() => {
        fetcher
            .fetch(
                axios.get('https://api.imgur.com/3/gallery/hot/time'),
                Math.random().toString(10),
            )
            .catch(console.error);
    }, []);

    const body = fetcher.error ? (
        <ErrorCallout error={fetcher.error}/>
    ) : fetcher.loading ? (
        <CircularProgress/>
    ) : fetcher.data ? (
        fetcher.data.items.map(() => (
            <Card>
                <CardActionArea>
                    <CardMedia
                        image="https://material-ui.com/static/images/cards/contemplative-reptile.jpg"
                        title="Contemplative Reptile"
                    />
                </CardActionArea>
            </Card>
        ))
    ) : null;
    return (
        <Main heading={'Pigeon'}>
            {body}
        </Main>
    );
};
