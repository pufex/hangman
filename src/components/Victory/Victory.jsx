import React, {useEffect} from 'react'
import Audio from '../Audio/Audio'
import { useNavigate } from 'react-router-dom'
import "./Victory.css"

const Victory = (props) => {
    const {finishMusicHandler, outcome, ...rest} = props;
    let location = useNavigate();

    
    useEffect(() => {
        finishMusicHandler();

    }, [outcome])

    return <>
        <Audio 
            playing={true}
            loop={false}
            url={"/success.mp3"}
            volume={0.5}
        />
        <div className='victory-window'>
            <div className='container victory-container'>
                <div className='inner-container victory-inner'>
                    <img src="/youwin.svg" alt="Victory Header" className="victory-header" />
                    <button
                        className='bubble-button play-again'
                        onClick={() => {
                            location("/")
                        }}
                    ></button>
                </div>
            </div>
        </div>
  </>
  
}

export default Victory
