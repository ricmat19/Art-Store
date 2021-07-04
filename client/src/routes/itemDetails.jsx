import React from 'react';
import FooterC from '../components/footer';
import HeaderC from '../components/header';
import ItemDetailsC from '../components/itemDetails';
import CartModalC from '../components/cartModal';

const ItemDetailsR = () => {
    return(
        <div>
            <CartModalC/>
            <HeaderC/>
            <ItemDetailsC/>
            <FooterC/>
        </div>
    )
}

export default ItemDetailsR;