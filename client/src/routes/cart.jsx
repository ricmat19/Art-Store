import React from 'react';
import CartC from '../components/cart';
import FooterC from '../components/footer';
import HeaderC from '../components/header';

const CartR = () => {
    return(
        <div>
            <HeaderC/>
            <CartC/>
            <FooterC/>
        </div>
    )
}

export default CartR;