import React from 'react';
import CheckoutC from '../components/checkout';
import FooterC from '../components/footer';
import HeaderC from '../components/header';

const CheckoutR = () => {
    return(
        <div>
            <HeaderC/>
            <CheckoutC/>
            <FooterC/>
        </div>
    )
}

export default CheckoutR;