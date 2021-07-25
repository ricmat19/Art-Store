import React from 'react';

const ImagesC = (props) => {
    return(
        <div>
            <img className={props.classes} src={props.source}/>
        </div>
    )
}

export default ImagesC;