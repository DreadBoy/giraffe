import React, {FunctionComponent} from 'react';
import {LinearProgress, withStyles} from '@material-ui/core';

type Props = {
    className?: string,
    progress: number,
    buffer: number,
}

const Progress = withStyles({
    dashed: {
        display: 'none',
    },
    bar1Buffer: {
        transition: 'none',
    },
})(LinearProgress);

export const ProgressBar: FunctionComponent<Props> = ({className, progress, buffer}) => {
    return (
        <Progress
            className={className}
            variant={'buffer'}
            value={progress}
            valueBuffer={buffer}
        />
    );
};
