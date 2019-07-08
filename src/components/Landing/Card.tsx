import * as React from 'react';
import {FunctionComponent} from 'react';
import {Card as MUICard, CardHeader, Grid} from '@material-ui/core';
import {Medium} from './Medium';

type Props = {
    item: GalleryAlbumResponse,
}

export const Card: FunctionComponent<Props> = ({item}) =>
    item.images_count > 0 ? (
        <Grid item xs={12}>
            <MUICard>
                <CardHeader title={item.title} subheader={item.account_url}/>
                {item.images.map(image => (
                    <Medium medium={image} key={image.id}/>
                ))}
            </MUICard>
        </Grid>
    ) : null;
