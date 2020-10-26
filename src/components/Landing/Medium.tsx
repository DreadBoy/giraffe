import * as React from 'react';
import {FunctionComponent, useRef} from 'react';
import {CardMedia, makeStyles, Typography} from '@material-ui/core';
import classNames from 'classnames';
import {Video} from './Video';
import {useObserver} from '../../services/use-observer';

const useStyles = makeStyles({
    margin: {
        '&:not(:last-child)': {
            marginBottom: 8,
        },
    },
    medium: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
    description: {
        marginLeft: 8,
        marginRight: 8,
    },
    wrapper: {
        position: 'relative',
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
    const el = useRef<HTMLDivElement>(null);

    const {isVisible} = useObserver(el);

    return (
        <>
            <div
                ref={el}
                className={classes.wrapper}
                style={{
                    paddingBottom: `${medium.height / medium.width * 100}%`,
                }}>
                {!isVisible ? null :
                    medium.animated ?
                        (
                            <CardMedia
                                innerRef={el}
                                className={classNames(classes.medium, classes.margin)}
                            >
                                <Video
                                    className={classes.video}
                                    src={medium.mp4}
                                />
                            </CardMedia>
                        ) : (
                            <CardMedia
                                innerRef={el}
                                className={classNames(classes.medium, classes.margin)}
                                component='img'
                                src={medium.link}
                                alt={medium.title}
                            />
                        )
                }
            </div>
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
