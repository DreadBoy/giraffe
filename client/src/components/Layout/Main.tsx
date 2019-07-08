import * as React from 'react';
import {FunctionComponent} from 'react';
import img from '../../assets/zwartevilt.png';
import {AppBar, Toolbar, Typography} from '@material-ui/core';
import {createStyles, makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
    createStyles({
            root: {
                minHeight: '100%',
                background: `url(${img}) repeat`,
            },
            main: {
                padding: 8,
            },
        },
    ),
);

type Props = {
    heading: string
};

export const Main: FunctionComponent<Props> = ({children, heading}) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <AppBar position={'static'}>
                <Toolbar>
                    <Typography variant="h6">{heading}</Typography>
                </Toolbar>
            </AppBar>
            <main className={classes.main}>
                {children}
            </main>
        </div>
    );
};
Main.displayName = 'Main';

