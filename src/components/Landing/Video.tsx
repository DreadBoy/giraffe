import {default as React, FunctionComponent, useEffect, useRef, useState} from 'react';
import {IconButton, makeStyles} from '@material-ui/core';
import {Pause, PlayArrow, VolumeOff, VolumeUp} from '@material-ui/icons';

type Props = {
  className?: string,
  src: string,
}

const useStyles = makeStyles({
  video: {
    position: 'relative',
  },
  muted: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  play: {
    position: 'absolute',
    top: 0,
    left: 0,
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
      video.current.play().catch(console.error);
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

  const hasSound = !video.current ? false :
    // @ts-ignore
    video.current.mozHasAudio ||
    // @ts-ignore
    !!video.current.webkitAudioDecodedByteCount ||
    !!video.current.audioTracks && video.current.audioTracks.length;

  const classes = useStyles();
  return (
    <div className={classes.video}>
      <video
        className={className}
        src={src}
        loop
        controls={false}
        muted={!sound}
        playsInline
        ref={video}
        onClick={togglePlaying}
      />
      <IconButton className={classes.muted} onClick={toggleSound}>
        {!hasSound ? null : sound ? <VolumeUp/> : <VolumeOff/>}
      </IconButton>
      <IconButton className={classes.play} onClick={togglePlaying}>
        {playing ? <Pause/> : <PlayArrow/>}
      </IconButton>
    </div>
  )
};
