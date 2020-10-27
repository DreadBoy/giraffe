import * as React from 'react';
import {FunctionComponent, useRef} from 'react';
import {createStyles, makeStyles, Typography} from '@material-ui/core';
import {Video} from './Video';
import {useObserver} from '../../services/use-observer';
import classNames from 'classnames';

const useStyles = makeStyles(theme =>
    createStyles({
        margin: {
            ':not(.MuiCardHeader-root) + &': {
                marginTop: theme.spacing(1),
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
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
            marginTop: theme.spacing(1),
        },
    }),
);

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
                className={classNames(classes.margin, classes.wrapper)}
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
