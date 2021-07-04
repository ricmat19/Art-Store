import React from 'react';
import CollectionC from '../components/collection';
import FooterC from '../components/footer';
import HeaderC from '../components/header';
import CartModalC from '../components/cartModal';

const CollectionR = () => {
    return(
        <div>
            <CartModalC/>
            <HeaderC/>
            <CollectionC/>
            <FooterC/>
        </div>
    )
}

export default CollectionR;