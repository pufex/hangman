import React, {useEffect, useState} from 'react'
import Audio from '../Audio/Audio'
import "./Failure.css"
import { useNavigate } from 'react-router-dom'

const Failure = (props) => {
    let location = useNavigate();
    const {finishMusicHandler,outcome, ...rest} = props
    const [showWindow, setWindow] = useState(false);

    useEffect(() => {
        finishMusicHandler();
    }, [outcome])   
    

    return <>
        <Audio 
            playing={true}
            loop={false}
            url={"/failure.mp3"}
            volume={0.5}
        />
        <div className='failure-window'>
            <div className='container failure-container'>
                <div className='inner-container failure-inner'>
                    <img src="/youlose.svg" alt="Failure Header" className="failure-header" />
                    <div className="failure-secret-container">
                        <h1 className="it-was">
                            It was:
                        </h1>
                        <h3 className="failure-secret">
                            {localStorage.getItem("chosen")}
                        </h3>
                    </div>
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

export default Failure
