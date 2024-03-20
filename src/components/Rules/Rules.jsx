import React from 'react'
import "./Rules.css"

const Rules = (props) => {

    const {onClose, ...rest} = props;

    return <div className='window'>
        <div className='container rules-container'>
            <div className='inner-container rules'>
                <img src="/rules.svg" alt="Rules logo" className="rules-header" />
                <ol className='rules-list'>
                    <li className='rule'>
                        Choose a category.
                    </li>
                    <li className='rule'>
                        Try to guess the secret word!
                    </li>
                    <li className='rule'>
                        If you pick a wrong letter, you will slightly fill the Loss Bar.
                    </li>
                    <li className='rule'>
                        If you correctly form the hidden word before filling the Loss Bar, you win! Otherwise, you lose!
                    </li>
                </ol>
                <button
                    className='btn-prim'
                    onClick={() => {
                        onClose();
                    }}
                >
                    Close
                </button>
            </div>
        </div>
  </div>
}

export default Rules
