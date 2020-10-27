import * as React from 'react';
import {FunctionComponent, useRef} from 'react';
import {makeStyles, Typography} from '@material-ui/core';
import classNames from 'classnames';
import {Video} from './Video';
import {useObserver} from '../../services/use-observer';

const useStyles = makeStyles({
    margin: {
        '&:not(:last-child)': {
            marginBottom: 8,
        },
    },
    wrapper: {
        position: 'relative',
    },
    medium: {
        position: 'absolute',
        width: '100%',
        height: '100%',
    },
    description: {
        marginLeft: 8,
        marginRight: 8,
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
                className={classNames(classes.wrapper, classes.margin)}
                style={{
                    paddingBottom: `${medium.height / medium.width * 100}%`,
                }}>
                {!isVisible ? null :
                    medium.animated ?
                        (
                            <Video
                                className={classes.medium}
                                src={medium.mp4}
                            />
                        ) : (
                            <img
                                className={classes.medium}
                                src={medium.link}
                                alt={medium.title}
                            />
                        )
                }
            </div>
            {medium.description && (
                <Typography
                    className={classNames(classes.margin, classes.description)}
                    variant={'body1'}
                >
                    {medium.description}
                </Typography>
            )}
        </>
    );
};
