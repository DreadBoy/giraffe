import React, {FC, useCallback, useState} from 'react';
import {
    Avatar,
    ButtonBase,
    Collapse,
    ListItem,
    ListItemAvatar,
    ListItemText,
    makeStyles,
    Typography,
} from '@material-ui/core';
import {Comments} from './Comments';
import {ExpandLess, ExpandMore} from '@material-ui/icons';

type Props = {
    comment: CommentResponse,
};

const useStyles = makeStyles({
    action: {
        verticalAlign: 'bottom',
    },

});

export const Comment: FC<Props> = ({comment}) => {
    const classes = useStyles();

    const [expanded, setExpanded] = useState<boolean>(false);

    const hasChildren = (comment.children || []).length > 0;

    const toggleExpanded = useCallback(() => {
        setExpanded(hasChildren && !expanded);
    }, [expanded, hasChildren]);

    let props: any = {
        alignItems: 'flex-start',
        dense: true,
        disableGutters: true,
        divider: true,
        onClick: toggleExpanded,
    };
    let Component: any = ListItem;
    if (hasChildren) {
        props['component'] = ListItem;
        Component = ButtonBase;
    }

    return (
        <>
            <Component {...props} >
                <ListItemAvatar>
                    <Avatar
                        alt={comment.author}
                        src={`https://imgur.com/user/${comment.author}/avatar`}
                    />
                </ListItemAvatar>
                <ListItemText
                    primary={comment.author}
                    secondary={(
                        <>
                            {comment.comment}
                            {hasChildren && (
                                <ListItemText
                                    secondary={(
                                        <Typography variant={'caption'}>
                                            Show replies ({comment.children.length})
                                            {expanded ? (
                                                <ExpandLess fontSize={'small'} className={classes.action}/>
                                            ) : (
                                                <ExpandMore fontSize={'small'} className={classes.action}/>
                                            )}
                                        </Typography>
                                    )}
                                />
                            )}
                        </>
                    )}
                />

            </Component>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <Comments comments={comment.children}/>
            </Collapse>
        </>
    );
};
