const express = require('express');
const router = express.Router();

router.get('/comics', (req, res) => {
    res.render('comics', {title: 'Comics', condition: false});
})

module.exports = router;