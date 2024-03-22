import React, {forwardRef} from 'react'
import ReactPlayer from 'react-player';


const Audio = forwardRef((props, ref) => {
    const {url, playing, loop, onEnded, volume, onLoad, onProgress,...rest} = props;

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
            onProgress={onProgress}
            ref={ref}
        />
  </>
})

export default Audio
