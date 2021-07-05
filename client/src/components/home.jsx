import React from 'react';

const HomeC = () => {
    return(
        <div>
            <div className="main-body home-menu">
                <a href="collection/comic">
                    <div className="menu-item">
                        <img className="menu-image" src="../../logo512.png" alt="comics"/>
                        <h1>Comics</h1>
                    </div>
                </a>
                <a href="collection/print">
                    <div className="menu-item">
                        <img className="menu-image" src="../../logo512.png" alt="prints"/>
                        <h1>Prints</h1>
                    </div>
                </a>
                <a href="collection/personal">
                    <div className="menu-item">
                        <img className="menu-image" src="../../logo512.png" alt="personal works"/>
                        <h1>Personal Works</h1>
                    </div>
                </a>
            </div>
        </div>
    )
}

export default HomeC;