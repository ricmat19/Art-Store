const express = require('express');
const router = express.Router();

router.get('/prints', (req, res) => {
    res.render('prints', {title: 'Prints', condition: false});
})

module.exports = router;