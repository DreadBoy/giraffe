import React, {FunctionComponent, PropsWithChildren} from 'react';
import {Slide, useScrollTrigger} from '@material-ui/core';

export const HideOnScroll: FunctionComponent<PropsWithChildren> = ({children}) => {
    const trigger = useScrollTrigger();

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children as any}
        </Slide>
    );
}
