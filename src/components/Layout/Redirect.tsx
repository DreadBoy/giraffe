import * as React from 'react';
import {Redirect as RouterRedirect} from 'react-router';

export function Redirect(path: string) {
    return () => <RouterRedirect to={path}/>;
}
