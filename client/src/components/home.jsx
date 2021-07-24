import React from 'react';
import CartModalC from './cartModal';
import HeaderC from './header';
import FooterC from './footer';

const HomeC = () => {
    return(
        <div>
            <CartModalC/>
            <HeaderC/>
            <div className="main-body home-menu">
                <a href="collection/comic">
                    <div className="menu-item">
                        <img className="menu-image" src="../../logo512.png" alt="comics"/>
                        <p className="title">Comics</p>
                    </div>
                </a>
                <a href="collection/print">
                    <div className="menu-item">
                        <img className="menu-image" src="../../logo512.png" alt="prints"/>
                        <p className="title">Prints</p>
                    </div>
                </a>
                <a href="collection/personal">
                    <div className="menu-item">
                        <img className="menu-image" src="../../logo512.png" alt="personal works"/>
                        <p className="title">Personal Works</p>
                    </div>
                </a>
            </div>
            <FooterC/>
        </div>
    )
}

export default HomeC;