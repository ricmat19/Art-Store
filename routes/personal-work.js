const express = require('express');
const router = express.Router();

router.get('/personal-work', (req, res) => {
    res.render('personal-work', {title: 'Personal Work', condition: false});
})

module.exports = router;