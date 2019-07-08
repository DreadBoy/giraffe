import * as React from 'react';
import {FunctionComponent} from 'react';
import {CardMedia, createStyles, makeStyles, Typography} from '@material-ui/core';
import * as classNames from 'classnames';

const useStyles = makeStyles(() =>
    createStyles({
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
        },
    ),
);

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
                        component={() => (
                            <video
                                className={classes.video}
                                src={medium.mp4}
                                loop
                                controls
                                playsInline
                            />
                        )}
                    />
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
                <Typography className={classNames(classes.margin, classes.description)} color="textSecondary"
                            component="p">
                    {medium.description}
                </Typography>
            )}
        </>
    );
};
