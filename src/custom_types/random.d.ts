import * as React from 'react';
import {WithStyles} from 'react-jss';

export type StyledComponent<ClassKey extends string = string> = React.FunctionComponent<WithStyles<ClassKey>>

export type StyledComponentWithProps<ClassKey extends string = string, Props = {}> =
    React.FunctionComponent<WithStyles<ClassKey> & Props>
