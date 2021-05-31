import React from 'react';
import FooterC from '../components/footer';
import HeaderC from '../components/header';
import HomeC from '../components/home';

const HomeR = () => {
    return(
        <div>
            <HeaderC/>
            <HomeC/>
            <FooterC/>
        </div>
    )
}

export default HomeR;

// const express = require('express');
// const router = express.Router();

// router.get('/', (req, res) => {
//     res.render('home', {title: 'Home', condition: false});
// })

// module.exports = router;