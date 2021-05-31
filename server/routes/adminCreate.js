const express = require('express');
const router = express.Router();
const db = require("../db");

router.get('/admin', async(req, res) => {
    res.render('admin', {title: 'Admin', condition: false});
})

//Create a collection item
router.post('/admin/create', async(req, res) => {
    try{
        const newItem = await db.query("INSERT INTO collection (title, product, price, info) values ($1, $2, $3, $4) RETURNING *", [req.body.title, req.body.product, req.body.price, req.body.info]);
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