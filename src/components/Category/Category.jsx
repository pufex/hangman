import React from 'react'
import "./Category.css"

const Category = (props) => {
    const {id, onPick, ...rest} = props
    return <div className='category'>
        <button 
            className='inner-category'
            onClick={() => {
                onPick(id);
            }}
        >
            {id}
        </button>
    </div>
}

export default Category
