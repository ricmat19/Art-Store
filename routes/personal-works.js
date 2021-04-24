const express = require('express');
const router = express.Router();

router.get('/personal-works', (req, res) => {
    res.render('personal-works', {title: 'Personal Works', condition: false});
})

module.exports = router;