import React from 'react';
import FooterC from '../components/footer';
import HeaderC from '../components/header';
import AboutC from '../components/about';
import CartModalC from '../components/cartModal';

const AboutR = () => {
    return(
        <div>
            <CartModalC/>
            <HeaderC/>
            <AboutC/>
            <FooterC/>
        </div>
    )
}

export default AboutR;