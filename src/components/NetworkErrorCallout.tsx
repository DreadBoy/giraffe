import * as React from 'react';
import {Card, CardContent, CardHeader, Typography} from '@material-ui/core';

export const NetworkErrorCallout: React.FunctionComponent = () => {
    return (
        <Card>
            <CardHeader title={'There\'s problem with your network'}/>
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    Check your network connection and try again
                </Typography>
            </CardContent>
        </Card>
    );
}
