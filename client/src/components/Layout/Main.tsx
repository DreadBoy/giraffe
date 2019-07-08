import * as React from 'react';
import {FunctionComponent} from 'react';
import img from '../../assets/login-bg.jpg';
import {AppBar as AppBarM, IconButton, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {createStyles, makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            height: '100%',
            background: `center / cover no-repeat url(${img})`,
            display: 'flex',
            flexDirection: 'column',
        },
        main: {
            padding: 10,
            flexGrow: 1,
        },
        navigation: {
            position: 'relative' as 'relative',
        },
        fab: {
            position: 'absolute' as 'absolute',
            zIndex: 1,
            bottom: 56 / 2,
        },
    }),
);

type Props = {
    heading: string
};

export const Main: FunctionComponent<Props> = ({children, heading}) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <AppBarM position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">{heading}</Typography>
                </Toolbar>
            </AppBarM>
            <main className={classes.main}>
                {children}
            </main>
        </div>
    );
};
Main.displayName = 'Main';

