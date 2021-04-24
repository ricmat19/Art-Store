const express = require('express');
const router = express.Router();

router.get('/comic', (req, res) => {
    res.render('comic', {title: 'Comic', condition: false});
})

module.exports = router;