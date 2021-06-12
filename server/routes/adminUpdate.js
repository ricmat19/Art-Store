const express = require('express');
const router = express.Router();
const db = require("../db");

//Get a specific collection item for update
router.get('admin/collection/:id', async (req, res) => {

    try{
        const product = await db.query(`SELECT * FROM collection WHERE id=$1`, [req.params.id]);
        console.log(product);
        res.status(201).json({
            status: "success",
            results: product.rows.length,
            data:{
                product: product.rows[0]
            }
        })
    }catch(err){
        console.log(err);
    }
})

//Update a collection item
router.put('/admin/update/:id', async(req, res) => {
    try{
        const updateItem = await db.query("UPDATE collection SET title = $1 product = $2, price = $3 info = $4 WHERE id = $5", [req.body.title, req.body.product, req.body.price, req.body.info, req.params.id]);
        console.log(updateItem);
        res.status(200).json({
            status: "success",
            results: updateItem.rows.length,
            data:{
                updateItem: updateItem.rows[0] 
            }
        })
    }catch(err){
        console.log(err);
    }
})

module.exports = router;