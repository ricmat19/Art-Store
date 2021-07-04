import React from 'react';
import FooterC from '../components/footer';
import HeaderC from '../components/header';
import AdminUpdateC from '../components/adminUpdate';
import CartModalC from '../components/cartModal';

const AdminUpdateR = () => {
    return(
        <div>
            <CartModalC/>
            <HeaderC/>
            <AdminUpdateC/>
            <FooterC/>
        </div>
    )
}

export default AdminUpdateR;