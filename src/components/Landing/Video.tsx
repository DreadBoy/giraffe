import {default as React, FunctionComponent, useEffect, useRef, useState} from 'react';
import {IconButton, makeStyles} from '@material-ui/core';
import {PlayArrow, VolumeOff, VolumeUp} from '@material-ui/icons';
import classNames from 'classnames';
import {ProgressBar} from './ProgressBar';
import {useSwipeable} from 'react-swipeable'

type Props = {
    className?: string,
    src: string,
}

const useStyles = makeStyles({
    root: {
        position: 'relative',
    },
    video: {
        width: '100%',
        display: 'block',
    },
    muted: {
        position: 'absolute',
        top: 0,
        right: 0,
    },
    play: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        cursor: 'pointer',
    },
    playIcon: {
        width: 60,
        height: 60,
    },
    progressHover: {
        '&:hover': {
            height: 20,
            marginTop: 20 - 4,
        },
    },
});

export const Video: FunctionComponent<Props> = ({className, src}) => {
    const [sound, setSound] = useState(false);
    const toggleSound = () => setSound(!sound);

    const video = useRef<HTMLVideoElement>(null);
    const [playing, setPlaying] = useState(false);
    const togglePlaying = () => setPlaying(!playing);

    useEffect(() => {
        if (!video.current)
            return;
        if (playing && video.current.paused)
            video.current.play().catch(e => console.error(e.message));
        else if (!playing && !video.current.paused)
            video.current.pause();
    }, [playing]);
    useEffect(() => {
        if (!video.current)
            return;
        const onPlay = () => setPlaying(true);
        const onPause = () => setPlaying(false);
        video.current.addEventListener('play', onPlay);
        video.current.addEventListener('pause', onPause);
        return () => {
            if (!video.current)
                return;
            video.current.removeEventListener('play', onPlay);
            video.current.removeEventListener('pause', onPause);
        }
    }, [video.current]);

    const [progress, setProgress] = useState(0);
    const [buffer, setBuffer] = useState(0);

    useEffect(() => {
        const onUpdate = () => {
            if (!video.current)
                return;
            setProgress(video.current.currentTime / video.current.duration * 100);
        };
        const onProgress = () => {
            if (!video.current)
                return;
            setBuffer(video.current.buffered.end(0) / video.current.duration * 100);
        };
        if (!video.current)
            return;
        video.current.addEventListener('timeupdate', onUpdate);
        video.current.addEventListener('progress', onProgress);
        return () => {
            if (!video.current)
                return;
            video.current.removeEventListener('timeupdate', onUpdate);
            video.current.removeEventListener('progress', onProgress);
        }
    }, [video.current]);

    const hasSound = !video.current ? false :
        // @ts-ignore
        video.current.mozHasAudio ||
        // @ts-ignore
        !!video.current.webkitAudioDecodedByteCount ||
        !!video.current.audioTracks && video.current.audioTracks.length;

    const swipeStart = useRef<number | null>(null);
    const swipeable = useSwipeable({
        onSwiping: e => {
            if (e.dir !== 'Left' && e.dir !== 'Right')
                return;
            if (!video.current)
                return;
            if (swipeStart.current === null)
                swipeStart.current = video.current.currentTime;
            let seek = ((e.event as TouchEvent).touches[0].clientX - video.current.getBoundingClientRect().left) /
                video.current.getBoundingClientRect().width;
            seek = Math.max(0, Math.min(1, seek));
            video.current.currentTime = seek * video.current.duration;
            setProgress(video.current.currentTime / video.current.duration * 100);
        },
        onSwiped: () => {
            swipeStart.current = null;
        },
    });


    const classes = useStyles();
    return (
        <div
            className={classNames(classes.root, className)}
            {...swipeable}
        >
            <video
                className={classes.video}
                src={src}
                loop
                controls={false}
                muted={!sound}
                playsInline
                ref={video}
                onClick={togglePlaying}
            />
            <ProgressBar className={classes.progressHover} buffer={buffer} progress={progress}/>
            <IconButton className={classes.muted} onClick={toggleSound}>
                {!hasSound ? null : sound ? <VolumeUp/> : <VolumeOff/>}
            </IconButton>
            {!playing && (
                <IconButton className={classes.play} onClick={togglePlaying}>
                    <PlayArrow className={classes.playIcon}/>
                </IconButton>
            )}
        </div>
    )
};
