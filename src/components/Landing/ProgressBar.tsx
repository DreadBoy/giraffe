import React, {FunctionComponent, MouseEventHandler, useRef} from 'react';
import {LinearProgress, withStyles} from '@material-ui/core';

type Props = {
    className?: string,
    progress: number,
    buffer: number,
    onClick?: (progress: number) => void,
}

const Progress = withStyles({
    dashed: {
        display: 'none',
    },
    bar1Buffer: {
        transition: 'none',
    },
})(LinearProgress);

export const ProgressBar: FunctionComponent<Props> = ({className, progress, buffer, onClick}) => {
    const root = useRef<HTMLDivElement>();
    const click: MouseEventHandler<HTMLElement> = e => {
        if (!onClick || !root.current)
            return;
        onClick((e.clientX - root.current.getBoundingClientRect().left) /
            root.current.getBoundingClientRect().width);
    };
    return (
        <Progress
            className={className}
            variant={'buffer'}
            value={progress}
            valueBuffer={buffer}
            onClick={click}
            ref={root}
        />
    );
};
