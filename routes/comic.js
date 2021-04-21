const express = require('express');
const router = express.Router();

router.get('/:comicId', (req, res) => {
    res.render('comicId', {title: 'ComicId', condition: false});
})

module.exports = router;