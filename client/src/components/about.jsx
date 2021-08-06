import React, { useState } from 'react';
import CartModalC from './cartModal';
import HeaderC from './header';
import FooterC from './footer';

const AboutC = () => {

    const [cart, setCart] = useState([]);
    const [cartState, setCartState] = useState(false);

    return(
        <div>
            <CartModalC cartState={cartState}/>
            <HeaderC/>
            <div className="main-body">
                <div className="center">
                    <p className="title">about</p>
                </div>
                <div className="profile-info">
                    <div className="profile-image-div">
                        <div className="image">
                            <div className="big-image-div">
                                <img className="big-image" src="../../images/profileImage.jpeg" alt="profile"/>
                            </div>
                        </div>
                        <div className="details">
                        </div>
                        <div className="qty"></div>
                    </div>
                    <div className="about-info">
                        <p>&emsp; &emsp; {process.env.REACT_APP_INFO_PARAGRAPH_1}</p>
                        <p>&emsp; &emsp; {process.env.REACT_APP_INFO_PARAGRAPH_2}</p>
                    </div>
                </div>
            </div>
            <FooterC/>
        </div>
    )
}

export default AboutC;