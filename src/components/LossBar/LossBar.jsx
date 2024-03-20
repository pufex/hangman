import React from 'react'
import "./LossBar.css"

const LossBar = (props) => {
    const {lossProgress, maxLossProgress, ...rest} = props;
    let fillStyles;
    lossProgress == 0 ? fillStyles = 
    {
        width: "5%",
        borderRadius: "100%",
    } : 
    fillStyles = {
        width: `${lossProgress/maxLossProgress*100}%` 
    };

    return <div className='progressbar'>
        <div 
            className="fill"
            style={fillStyles}
        ></div>
    </div>
}

export default LossBar
