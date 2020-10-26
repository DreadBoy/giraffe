import * as React from 'react';
import {FunctionComponent} from 'react';
import {CardMedia, makeStyles, Typography} from '@material-ui/core';
import classNames from 'classnames';
import {Video} from './Video';

const useStyles = makeStyles({
    margin: {
        '&:not(:last-child)': {
            marginBottom: 8,
        },
    },
    description: {
        marginLeft: 8,
        marginRight: 8,
    },
    video: {
        width: '100%',
    },
});

type Props = {
    medium: ImageResponse,
}

export const Medium: FunctionComponent<Props> = ({medium}) => {
    const classes = useStyles();
    return (
        <>
            {medium.animated ?
                (
                    <CardMedia
                        className={classes.margin}
                    >
                        <Video
                            className={classes.video}
                            src={medium.mp4}
                        />
                    </CardMedia>
                ) : (
                    <CardMedia
                        className={classes.margin}
                        component='img'
                        src={medium.link}
                        alt={medium.title}
                    />
                )
            }
            {medium.description && (
                <Typography
                    className={classNames(classes.margin, classes.description)}
                    color="textSecondary"
                    component="p"
                >
                    {medium.description}
                </Typography>
            )}
        </>
    );
};
