import React, {useState, useEffect} from 'react'
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
    const [soundState, setSoundState] = useState({
        url: undefined,
        playing: false,
    })
    const [musicState, setMusic] = useState({
        url: "/game-song.mp3",
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
            setSoundState({
                playing: true,
                url: "/bullseye.mp3",
            })
            setGameState({...gameState, current: newCurrent.join(""), used: newUsedArr});
        }else{
            setSoundState({
                playing: true,
                url: "/wrong.mp3",
            })
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

    const soundEndedHandler = () => {
        setSoundState({
            url: "",
            playing: false,
        })
    }

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
            onEnded={soundEndedHandler}
            volume={0.25}
        />
        <Audio
            url={soundState.url}
            loop={false}
            playing={soundState.playing}
        />

        <Gamenav 
            category={undefined}
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
