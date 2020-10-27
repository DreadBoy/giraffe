import React, {FC} from 'react';
import {createStyles, List, makeStyles} from '@material-ui/core';
import {Comment} from './Comment';

type Props = {
    comments: CommentResponse[],
};

const useStyles = makeStyles(theme =>
    createStyles({
        list: {
            paddingLeft: theme.spacing(2),
        },
    }),
);

export const Comments: FC<Props> = ({comments}) => {
    const classes = useStyles();

    return (
        <List
            dense
            disablePadding
            className={classes.list}
        >
            {comments
                .map(comment => (
                    <Comment comment={comment}/>
                ))
                .filter(Boolean)}

        </List>
    );
};
