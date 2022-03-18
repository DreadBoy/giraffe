import * as React from 'react';
import {FunctionComponent, useCallback, useRef} from 'react';
import {Card as MUICard, CardHeader, Grid, MenuItem} from '@material-ui/core';
import {Medium} from './Medium';
import {observer, useObservable} from 'mobx-react-lite';
import {Fetcher} from '../../store/fetcher';
import axios from 'axios';
import {headers} from '../../services/auth';
import {useObserver} from '../../services/use-observer';
import {CommentsLoader} from './CommentsLoader';
import {ActionMenu} from './ActionMenu';

type AlbumResponse = APIResponse<GalleryAlbumResponse>;

type Props = {
    item: GalleryAlbumResponse,
}

export const Card: FunctionComponent<Props> = observer(({item}) => {
    const el = useRef<HTMLElement>(null);
    const fetcher = useObservable(new Fetcher<AlbumResponse>());
    const fetchAlbum = useCallback(() => {
        if (!item.is_album || item.images.length >= item.images_count) {
            return;
        }
        if (fetcher.data || fetcher.loading) {
            return;
        }
        fetcher
            .fetch(
                axios.get<AlbumResponse>(
                    `https://api.imgur.com/3/album/${item.id}`,
                    {headers},
                ),
                item.id,
            )
            .catch(console.error);
    }, [fetcher, item.id, item.images, item.images_count, item.is_album]);

    useObserver(el, fetchAlbum);

    const share = useCallback(() => {
        navigator
            .share({
                url: item.link,
                text: item.title,
            })
            .catch(console.error);
    }, [item.link, item.title]);

    let images = item.is_album && fetcher.data ?
        fetcher.data.data.images :
        item.images;
    if (!images)
        images = [item as any];
    return images.length > 0 ? (
        <Grid item xs={12} innerRef={el}>
            <MUICard>
                <CardHeader
                    title={item.title}
                    subheader={item.description}
                    action={
                        <ActionMenu>
                            <MenuItem component={'a'} href={item.link} target={'_blank'}>View on Imgur</MenuItem>
                            {navigator.share && <MenuItem onClick={share}>Share</MenuItem>}
                        </ActionMenu>
                    }
                />

                {images.map(image => (
                    <Medium medium={image} key={image.id}/>
                ))}
                <CommentsLoader item={item}/>
            </MUICard>
        </Grid>
    ) : null;
});
