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
                null : (
                    <CardMedia
                        className={classes.margin}
                        component='img'
                        src={medium.link}
                        title={medium.title}
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
