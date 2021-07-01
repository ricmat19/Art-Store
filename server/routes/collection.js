const express = require('express');
const router = express.Router();
const db = require("../db");

//Get all collection items of a certain type
router.get("/collection/:product", async(req, res) => {

    try{
        const collection = await db.query("SELECT * FROM collection WHERE PRODUCT=$1", [req.params.product]);
        res.status(200).json({
            status: "success",
            results: collection.rows.length,
            data:{
                collection: collection.rows
            }
        })
    }catch(err){
        console.log(err);
    }
})

//Get a specific collection item
router.get('/collection/:id', async (req, res) => {

    try{
        const product = await db.query(`SELECT * FROM collection WHERE id=$1`, [req.params.id]);
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

module.exports = router;