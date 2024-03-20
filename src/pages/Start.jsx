import React from 'react'
import {useNavigate} from "react-router-dom"
import Rules from '../components/Rules/Rules';
import { useState } from "react";
import Audio from '../components/Audio/Audio';
import Category from '../components/Category/Category';

const categories = {
    countries: [
        "United States",
        "Poland",
        "United Kingdom",
        "Republic of Poland",
        "Soviet Union"
    ],
    fruits: [
        "Apple",
        "Banana",
        "Mango",
        "Starwberry",
    ],
    placeholder1: "",
    placeholder2: "",
    placeholder3: "",
    placeholder4: "",
}

const Start = () => {
    let location = useNavigate();
    const [showCategories, setCategories] = useState(localStorage.getItem("category") == "true" ? true : false)
    const [showRules,setRules] = useState(false);

    const closeRulesHandler = () => {
        setRules(!showRules);
    }

    const AND = (b1, b2) =>{
        if(b1 && b2) return true;
        else return false;
    }

    const categoryChoiceHandler = (id) => {
        localStorage.setItem("chosen", categories[id][Math.floor(Math.random()*categories[id].length)])
        localStorage.setItem("category", "false");
        location("/game");
    }

    let categoryList = Object.keys(categories).map((category, index) => {
        return <Category 
            id={category}
            key={category}
            onPick={categoryChoiceHandler}
        />
    })

    return <>
        <Audio 
            url="/menu-song.mp3"
            playing={true}
            loop={true}
            volume={0.25}
        />
        {
            AND(!showRules, showCategories) ? <div className='categories'> 
                <button
                    className='bubble-button go-back category-goback'
                    onClick={() => {
                        setCategories(false);
                    }}
                ></button>
                <div className='inner-categories'>

                    {categoryList}
                </div>
            </div> : null
        }
        {AND(showRules, !showCategories) ? <Rules 
            onClose={closeRulesHandler}
        /> : null}
        <div className='container start-container'>
            <div className='inner-container start'>
                <img 
                    src="/logo.svg" 
                    alt="The Hangman Game" 
                    className='logo'
                />
                <button
                    className='bubble-button start-button'
                    onClick={() => {
                        setCategories(true);
                    }}        
                >
                </button>
                <button
                    className='btn-prim'
                    onClick={() => {
                        setRules(true);
                    }}
                >
                    HOW TO PLAY
                </button>
            </div>
        </div>
    </>
    
}

export default Start
