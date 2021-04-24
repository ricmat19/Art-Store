const express = require('express');
const router = express.Router();

router.get('/print', (req, res) => {
    res.render('print', {title: 'Print', condition: false});
})

module.exports = router;