import React from 'react';

const HomeC = () => {
    return(
        <div>
            <div className="main-body thumbnail-menu">
                <a href="collection/comics">
                    <div className="menu-item">
                        <img className="menu-image" src="" alt="comics"/>
                        <h1>Comics</h1>
                    </div>
                </a>
                <a href="collection/prints">
                    <div className="menu-item">
                        <img className="menu-image" src="" alt="prints"/>
                        <h1>Prints</h1>
                    </div>
                </a>
                <a href="collection/personal-works">
                    <div className="menu-item">
                        <img className="menu-image" src="" alt="personal works"/>
                        <h1>Personal Works</h1>
                    </div>
                </a>
            </div>
        </div>
    )
}

export default HomeC;