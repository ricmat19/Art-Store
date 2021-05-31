const express = require('express');
const router = express.Router();
const db = require("../db");

//Edit a collection item
router.put('/admin/update/:id', async(req, res) => {
    try{
        console.log("update");
        const updateItem = await db.query("UPDATE collection SET title = $1 product = $2, price = $3 info = $4 WHERE id = $5", [req.body.title, req.body.product, req.body.price, req.body.info, req.body.id]);
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

//Delete a collection item
router.delete('/admin/delete/:id', async(req, res) => {
    try{
        const deleteItem = await db.query("DELETE FROM collection WHERE id = $1", [req.body.id]);
        res.status(204).json({
            status: "success"
        })
    }catch(err){
        console.log(err);
    }
})

module.exports = router;