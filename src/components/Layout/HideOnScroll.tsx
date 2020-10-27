import React, {FunctionComponent} from 'react';
import {Slide, useScrollTrigger} from '@material-ui/core';

export const HideOnScroll: FunctionComponent = ({children}) => {
    const trigger = useScrollTrigger();

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children as any}
        </Slide>
    );
}
