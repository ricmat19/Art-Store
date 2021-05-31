import React from 'react';
import FooterC from '../components/footer';
import HeaderC from '../components/header';
import AboutC from '../components/about';

const AboutR = () => {
    return(
        <div>
            <HeaderC/>
            <AboutC/>
            <FooterC/>
        </div>
    )
}

export default AboutR;

// const express = require('express');
// const router = express.Router();

// router.get('/about', (req, res) => {
//     res.render('about', {title: 'About', condition: false});
// })

// module.exports = router;