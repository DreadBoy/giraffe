import React, {FunctionComponent, useCallback} from 'react';
import {IconButton, Menu} from '@material-ui/core';
import {MoreVert} from '@material-ui/icons';

export const ActionMenu: FunctionComponent = ({children}) => {
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef<HTMLButtonElement>(null);
    const menuRef = React.useRef<HTMLElement>(null);

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
                ref={menuRef}
                anchorEl={anchorRef.current}
                onClose={close}
                anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
                onClick={(e) => {
                    if(menuRef.current?.contains(e.target as Node))
                        close();

                }}
            >
                {children}
            </Menu>
        </>
    );
};
