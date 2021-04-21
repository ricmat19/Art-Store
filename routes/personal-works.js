const express = require('express');
const router = express.Router();

router.get('/personalworks', (req, res) => {
    res.render('personalWorks', {title: 'Personal Works', condition: false});
})

module.exports = router;