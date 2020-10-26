import * as React from 'react';
import {ErrorInfo} from 'react';
import {Button, Card, CardActions, CardContent, CardHeader, Typography} from '@material-ui/core';

type Props = {
    error: Error,
    errorInfo?: ErrorInfo | null,
}

export const ErrorCallout: React.FunctionComponent<Props> = ({error, errorInfo}) => {
    if (!error)
        return null;

    const issueTitle = encodeURIComponent(error.message);
    const issueBody = errorInfo ? encodeURIComponent(error.message) + '\n\n' + encodeURIComponent(errorInfo.componentStack) :
        encodeURIComponent(error.message) + '\n\n' + encodeURIComponent(error.stack?.toString() ?? '');
    const githubIssue = `https://github.com/DreadBoy/giraffe/issues/new?body=${issueBody}&title=${issueTitle}`;
    return (
        <Card>
            <CardHeader title={'Oops, something went wrong'}/>
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    Please report this error by clicking button below.
                </Typography>
            </CardContent>
            <CardActions>
                <Button href={githubIssue} target={'_blank'}>
                    Report error
                </Button>
            </CardActions>
        </Card>
    );
}
