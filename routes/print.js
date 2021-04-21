const express = require('express');
const router = express.Router();

router.get('/:printId', (req, res) => {
    res.render('printId', {title: 'PrintId', condition: false});
})

module.exports = router;