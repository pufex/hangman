import React from 'react'
import "./Key.css"

const Key = (props) => {
    const {letter, inactive, onPress, ...rest} = props;

    if(!inactive)
        return <div 
        className="key"
        onClick={() => {
            onPress(letter);
        }}
    >
        {letter}
    </div>
    else {
        return <div 
        className="key inactive"
        onClick={() => {
            onPress(letter);
        }}
    >
    </div>
    }
}

export default Key
