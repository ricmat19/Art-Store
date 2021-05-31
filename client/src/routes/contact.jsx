import React from 'react';
import FooterC from '../components/footer';
import HeaderC from '../components/header';
import ContactC from '../components/contact';

const ContactR = () => {
    return(
        <div>
            <HeaderC/>
            <ContactC/>
            <FooterC/>
        </div>
    )
}

export default ContactR;

// const express = require('express');
// const router = express.Router();

// router.get('/contact', (req, res) => {
//     res.render('contact', {title: 'Contact', condition: false});
// })

// module.exports = router;