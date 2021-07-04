import React from 'react';
import FooterC from '../components/footer';
import HeaderC from '../components/header';
import AdminCollectionC from '../components/adminCollection';
import CartModalC from '../components/cartModal';

const AdminCollectionR = () => {
    return(
        <div>
            <CartModalC/>
            <HeaderC/>
            <AdminCollectionC/>
            <FooterC/>
        </div>
    )
}

export default AdminCollectionR;