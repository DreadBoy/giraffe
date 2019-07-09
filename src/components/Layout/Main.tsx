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
                maxWidth: 768,
            },
            grow: {
                flexGrow: 1,
            },
        },
    ),
);

type Props = {
    heading: string
    actions?: JSX.Element
};

export const Main: FunctionComponent<Props> = ({children, heading, actions}) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <AppBar position={'static'}>
                <Toolbar>
                    <Typography variant="h6">{heading}</Typography>
                    {actions && (
                        <>
                            <div className={classes.grow}/>
                            {actions}
                        </>
                    )}
                </Toolbar>
            </AppBar>
            <main className={classes.main}>
                {children}
            </main>
        </div>
    );
};
Main.displayName = 'Main';

