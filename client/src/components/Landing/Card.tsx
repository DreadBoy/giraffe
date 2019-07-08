import * as React from 'react';
import {FunctionComponent} from 'react';
import {Card as MUICard, CardActionArea, CardMedia} from '@material-ui/core';

export const Card: FunctionComponent = () => {
    return (
        <MUICard>
            <CardActionArea>
                <CardMedia
                    image="/static/images/cards/contemplative-reptile.jpg"
                    title="Contemplative Reptile"
                />
            </CardActionArea>

        </MUICard>
    );
};
