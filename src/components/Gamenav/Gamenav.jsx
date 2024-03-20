import React, {useState} from 'react'
import "./Gamenav.css"
import LossBar from '../LossBar/LossBar';
import Audio from '../Audio/Audio';
import { useNavigate } from 'react-router-dom';


const Gamenav = (props) => {

    let location = useNavigate();

    const {category, lossProgress, maxLossProgress, ...rest} = props;
    const [currentSound, setSound] = useState({
        url: undefined,
        playing: false,
        loop: false,
    });

    const {url, playing, loop} = currentSound;

    const newSoundHandler = (url) => {
        setSound({...currentSound, playing: true, url: url});
    }
    
    const soundEndedHandler = () => {
        location("/")
    }

    return <>
        <Audio 
            url={url}
            playing={playing}
            loop={loop}
            onEnded={soundEndedHandler}
            volume={1}
        />
        <nav className='nav-container'>
            <div className="nav">
                <div className='nav-left'>
                    <button 
                        className='bubble-button go-back nav-button'
                        onClick={() => {
                            localStorage.setItem("category", "true")
                            newSoundHandler("/boing.mp3")
                        }}
                    ></button>
                    <h1 className='nav-category'>
                        {category}
                    </h1>
                </div>
                <div className='nav-right'>
                    <LossBar 
                        lossProgress={lossProgress}
                        maxLossProgress={maxLossProgress}
                    />
                    <img 
                        className='life-icon'
                        src="life.svg"
                        alt='Heart icon'
                    />
                </div>
            </div>
        </nav>
    </>
    
    
}

export default Gamenav
