import React, {useState, useEffect, useRef} from 'react'
import Gamenav from '../components/Gamenav/Gamenav'
import Audio from '../components/Audio/Audio'
import Letter from '../components/Letter/Letter'
import Key from '../components/Key/Key'
import Victory from '../components/Victory/Victory'
import Failure from '../components/Failure/Failure'
import { hash } from "../functions/hash"
import { generateAlphabet } from '../functions/generateLetters'
import { getAllLetterPositions } from '../functions/getAllLetterPositions'

const Game = () => {
    const [outcome, setOutcome] = useState(0);
    const [gameState, setGameState] = useState({
        lossProgress: 0,
        maxLossProgress: 8,
        secret: localStorage.getItem("chosen"),
        current: hash(localStorage.getItem("chosen")),
        used: [],
    })

    const [sound1State, setSound1State] = useState({
        url: "/bullseye.mp3",
        played: 0,
        seeking: true,
        playing: false,
    })
    const sound1Ref = useRef(null)
    const sound1ProgressHandler = () => {
        if(!sound1State.seeking)
            setSound2State({ ...sound1State, ...state});
    }
    const finishSound1Handler = () => {
        setSound1State({...sound1State, playing: false});
    }
    
    const [sound2State, setSound2State] = useState({
        url: "/wrong.mp3",
        played: 0,
        seeking: true,
        playing: false,
    })
    const sound2Ref = useRef(null)
    const sound2ProgressHandler = () => {
        if(!sound2State.seeking)
            setSound2State({ ...sound2State, ...state});
    }
    const finishSound2Handler = () => {
        setSound2State({...sound2State, playing: false});
    }
    
    const [musicState, setMusic] = useState({
        url: "/game-song.mp3",
        played: 0,
        seeking: true,
        playing: true,
    })
    const finishMusicHandler = () => {
        setMusic({...musicState, playing: false});
    }

    const {lossProgress, maxLossProgress, secret, current, used} = gameState;

    let wordsList;
    wordsList = secret.split(" ").map((word, index) => {
        const arr = [];
        for(let i = 0; i < word.length; i++){
            let active = false;
            if(current.split(" ")[index][i] != "#")
                active = true;
            arr.push(
                <Letter 
                    active={active}
                    letter={secret.split(" ")[index][i]}
                />
            )
        }
        return <div className='word-wrapper'>
            {arr}
        </div>
    })

    const keyPressedHandler = (letter) => {
        let newUsedArr = used.slice();
        newUsedArr.push(letter.toLowerCase());
        if(secret.toLowerCase().includes(letter.toLowerCase())) {
            const arr = getAllLetterPositions(secret, letter);
            let newCurrent = new Array(secret.length);
            for(let i = 0; i < newCurrent.length; i++){
                if(arr.includes(i))
                    newCurrent[i] = secret[i]
                else if(current[i] == "#")
                    newCurrent[i] = "#"
                else
                    newCurrent[i] = current[i];
            }
            if(sound1State.playing){
                setSound1State({...sound1State, seeking: false})
                sound1Ref.current.seekTo(0);
            }else setSound1State({...sound1State, playing: true,})
            setGameState({...gameState, current: newCurrent.join(""), used: newUsedArr});
        }else{
            if(sound2State.playing){
                setSound2State({...sound2State, seeking: false})
                sound2Ref.current.seekTo(0);
            }else setSound2State({...sound2State, playing: true,})
            setGameState({...gameState, lossProgress: gameState.lossProgress+1, used: newUsedArr});
        }
    }

    useEffect(() => {
        if(secret == current){
            setOutcome(1)
        }
        else if(lossProgress == maxLossProgress){
            setOutcome(-1)
        }
        console.log(outcome)
    }, [gameState])

    let alphabet = generateAlphabet();
    const keyboard = alphabet.map((letter) => {
        let inactive = false;
        if(used.includes(letter.toLowerCase()))
            inactive = true;
        return <Key
            letter={letter}
            inactive={inactive}
            onPress={keyPressedHandler}
        />
    })


    return <>
        {
            outcome == 1 ? 
            <Victory 
                finishMusicHandler={finishMusicHandler}
                outcome={outcome}
            /> : null
        }

            
        {
            outcome == -1 ?
            <Failure 
                finishMusicHandler={finishMusicHandler}
                outcome={outcome}
            /> : null
        }
        <Audio
            url={musicState.url}
            loop={true}
            playing={musicState.playing}
            onEnded={finishMusicHandler}
            volume={0.25}
        />
        <Audio
            url={sound1State.url}
            loop={false}
            playing={sound1State.playing}
            onProgress={sound1ProgressHandler}
            onEnded={finishSound1Handler}
            ref={sound1Ref}
            />
        <Audio
            url={sound2State.url}
            loop={false}
            playing={sound2State.playing}
            onProgress={sound2ProgressHandler}
            onEnded={finishSound2Handler}
            ref={sound2Ref}
        />

        <Gamenav 
            category={localStorage.getItem("currentCategory")}
            lossProgress={lossProgress}
            maxLossProgress={maxLossProgress}
        />
        <div className='secret-container'>
            {
                wordsList.map((list) =>{
                    return list
                })
            }
        </div>
        <div className='keyboard'>
            {keyboard}
        </div>
    </>
}

export default Game
