import * as React from 'react';
import {Paper, Typography} from '@material-ui/core';

type Props = {
    error: Error,
    title?: string,
}

export const ErrorCallout: React.FunctionComponent<Props> = ({error, title}) => error ?
    (
        <Paper>
            <Typography variant="h5" component="h3">
                {title}
            </Typography>
            <Typography component="p">
                {error}
            </Typography>
        </Paper>
    ) : null;
