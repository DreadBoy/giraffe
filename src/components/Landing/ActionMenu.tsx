import React, {FunctionComponent, useCallback} from 'react';
import {IconButton, Menu} from '@material-ui/core';
import {MoreVert} from '@material-ui/icons';

export const ActionMenu: FunctionComponent = ({children}) => {
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef<HTMLButtonElement>(null);

    const toggle = useCallback(() => {
        setOpen(!open);
    }, [open]);

    const close = useCallback(() => {
        setOpen(false);
    }, []);

    return (
        <>
            <IconButton
                onClick={toggle}
                ref={anchorRef}
            >
                <MoreVert/>
            </IconButton>
            <Menu
                open={open}
                anchorEl={anchorRef.current}
                onClose={close}
                anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}

            >
                {children}
            </Menu>
        </>
    );
};
