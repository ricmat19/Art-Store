const express = require('express');
const router = express.Router();
const db = require("../db");
const multer = require('multer');
const {uploadFile} = require("../s3");
const fs = require('fs');
const util = require('util');
const unlinkFile = util.promisify(fs.unlink);

const upload = multer({dest: 'images/'});

router.get('/admin', async(req, res) => {
    res.render('admin', {title: 'Admin', condition: false});
})

//Create a collection item
router.post('/admin/create', upload.single('images'), async(req, res) => {
    try{
        const file = req.file;
        console.log(req.file);
        const result = await uploadFile(file);
        // res.send({imagePath: `/images/${result.key}`})
        await unlinkFile(file.path);
        const newItem = await db.query("INSERT INTO collection (title, product, imagekey, price, info) values ($1, $2, $3, $4, $5) RETURNING *", [req.body.title, req.body.product, result.key, req.body.price, req.body.info]);
        res.status(201).json({
            status: "success",
            results: newItem.rows.length,
            data:{
                newItem: newItem.rows[0]
            }
        })
    }catch(err){
        console.log(err);
    }
})

module.exports = router;