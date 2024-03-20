import React from 'react'
import ReactPlayer from 'react-player';

const Audio = (props) => {
    const {url, playing, loop, onEnded, volume, onLoad, ...rest} = props;

    return <>
        <ReactPlayer
            controls={false}
            url={url}
            playing={playing}
            loop={loop}
            onEnded={onEnded}
            height={0}
            width={0}
            volume={volume}
            onBuffer={onLoad}
        />
  </>
}

export default Audio
