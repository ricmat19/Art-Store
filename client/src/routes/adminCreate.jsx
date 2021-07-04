import React from 'react';
import FooterC from '../components/footer';
import HeaderC from '../components/header';
import AdminCreateC from '../components/adminCreate';
import CartModalC from '../components/cartModal';

const AdminCreateR = () => {
    return(
        <div>
            <CartModalC/>
            <HeaderC/>
            <AdminCreateC/>
            <FooterC/>
        </div>
    )
}

export default AdminCreateR;