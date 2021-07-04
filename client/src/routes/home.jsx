import React from 'react';
import FooterC from '../components/footer';
import HeaderC from '../components/header';
import HomeC from '../components/home';
import CartModalC from '../components/cartModal';

const HomeR = () => {
    return(
        <div>
            <CartModalC/>
            <HeaderC/>
            <HomeC/>
            <FooterC/>
        </div>
    )
}

export default HomeR;