import React from 'react';
import FooterC from '../components/footer';
import HeaderC from '../components/header';
import ContactC from '../components/contact';
import CartModalC from '../components/cartModal';

const ContactR = () => {
    return(
        <div>
            <CartModalC/>
            <HeaderC/>
            <ContactC/>
            <FooterC/>
        </div>
    )
}

export default ContactR;