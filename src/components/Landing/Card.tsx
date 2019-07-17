import * as React from 'react';
import {FunctionComponent, useEffect} from 'react';
import {Card as MUICard, CardHeader, Grid} from '@material-ui/core';
import {Medium} from './Medium';
import {observer, useObservable} from 'mobx-react-lite';
import {Fetcher} from '../../store/fetcher';
import axios from 'axios';
import {headers} from '../../services/auth';

type AlbumResponse = APIResponse<GalleryAlbumResponse>;

type Props = {
    item: GalleryAlbumResponse,
}

export const Card: FunctionComponent<Props> = observer(({item}) => {
    const fetcher = useObservable(new Fetcher<AlbumResponse>());
    useEffect(() => {
        if (item.is_album)
            fetcher
                .fetch(
                    axios.get<AlbumResponse>(
                        `https://api.imgur.com/3/album/${item.id}`,
                        {headers},
                    ),
                    item.id,
                )
                .catch(console.error);
    }, [item.is_album]);
    let images = item.is_album && fetcher.data ?
        fetcher.data.data.images :
        item.images;
    if (!images)
        images = [item as any];
    return images.length > 0 ? (
        <Grid item xs={12}>
            <MUICard>
                <CardHeader title={item.title} subheader={item.account_url}/>
                {images.map(image => (
                    <Medium medium={image} key={image.id}/>
                ))}
            </MUICard>
        </Grid>
    ) : null;
});
