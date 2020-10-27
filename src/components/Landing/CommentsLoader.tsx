import React, {FC, useCallback, useState} from 'react';
import {
    Box,
    Button,
    CardActions,
    CardContent,
    CircularProgress,
    Collapse,
    createStyles,
    List,
    makeStyles,
} from '@material-ui/core';
import {ExpandMore} from '@material-ui/icons';
import classNames from 'classnames';
import {observer, useObservable} from 'mobx-react-lite';
import {Fetcher} from '../../store/fetcher';
import axios, {AxiosError} from 'axios';
import {headers} from '../../services/auth';
import {Comment} from './Comment';
import {NetworkErrorCallout} from '../NetworkErrorCallout';

type CommentsResponse = APIResponse<CommentResponse[]>;

type Props = {
    item: GalleryAlbumResponse,
};

const useStyles = makeStyles(theme =>
    createStyles({
        comments: {
            paddingTop: 0,
        },
        expand: {
            transform: 'rotate(0deg)',
            marginLeft: 'auto',
            transition: theme.transitions.create('transform', {
                duration: theme.transitions.duration.shortest,
            }),
        },
        expandOpen: {
            transform: 'rotate(180deg)',
        },
    }),
);

export const CommentsLoader: FC<Props> = observer(({item}) => {
    const classes = useStyles();
    const [expanded, setExpanded] = useState<boolean>(false);

    const fetcher = useObservable(new Fetcher<CommentsResponse>());
    const fetchComments = useCallback(() => {
        if (item.comment_count == null || item.comment_count <= 0) {
            return;
        }
        if (fetcher.data || fetcher.loading) {
            return;
        }
        fetcher
            .fetch(
                axios.get<CommentsResponse>(
                    `https://api.imgur.com/3/gallery/${item.id}/comments`,
                    {headers},
                ),
                item.id,
            )
            .catch(console.error);
    }, [fetcher, item.comment_count, item.id]);

    const toggleExpanded = useCallback(() => {
        setExpanded(!expanded);
        if (!expanded)
            fetchComments();
    }, [expanded, fetchComments]);


    return item.comment_count > 0 ? (
        <>
            <CardActions>
                <Button onClick={toggleExpanded}>
                    Show comments ({item.comment_count})
                    <ExpandMore
                        className={classNames(
                            classes.expand,
                            {[classes.expandOpen]: expanded})}
                    />
                </Button>
            </CardActions>
            <Collapse
                in={expanded}
                timeout="auto"
                unmountOnExit
            >
                <CardContent className={classes.comments}>
                    {
                        fetcher.error && (fetcher.error as AxiosError).isAxiosError ? (
                            <NetworkErrorCallout/>
                        ) : fetcher.loading ? (
                            <Box
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                            >
                                <CircularProgress/>
                            </Box>
                        ) : fetcher.data ? (
                                <List
                                    dense
                                    disablePadding
                                >
                                    {fetcher.data.data
                                        .map(comment => (
                                            <Comment comment={comment}/>
                                        ))
                                        .filter(Boolean)}

                                </List>
                            )
                            : null
                    }
                </CardContent>
            </Collapse>
        </>
    ) : null;
});
