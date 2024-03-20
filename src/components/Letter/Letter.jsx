import React from 'react'
import "./Letter.css"

const Letter = (props) => {
    const {letter, active, ...rest} = props;
    return <button
        className={!active ? "letter-container" : "letter-container active"}
    >
        {active ? letter : null}
    </button>
}

export default Letter
