const express = require('express');
const router = express.Router();

router.get('/:personalWorkId', (req, res) => {
    res.render('personalWork', {title: 'PersonalWorkId', condition: false});
})

module.exports = router;