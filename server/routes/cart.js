const express = require('express');
const router = express.Router();
const db = require("../db");

//Add an item to a users cart
router.post('/cart', async(req, res) => {
    try{
        const cart = await db.query("SELECT cart FROM users WHERE email='george@jungle'");
        let newCart = [];
        for(let i=0; i < req.body.qty; i++){
            if(cart.rows[0].cart === null){
                newCart = await db.query("UPDATE users SET cart=(ARRAY [$1]) WHERE email='george@jungle' RETURNING *", [req.body.id]);
            }else if(cart.rows[0] !== null){
                console.log(cart.rows[0])
                console.log(req.body.id)
                newCart = await db.query("UPDATE users SET cart=array_append(ARRAY[$1], [$2]) WHERE email='george@jungle' RETURNING *", [cart.rows[0], [req.body.id]]);
            }
        }
        res.status(201).json({
            status: "success",
            results: newCart.rows,
            data:{
                newCart: newCart.rows
            }
        })
    }catch(err){
        console.log(err);
    }
})

//Get all collection items of a certain type
router.get("/cart", async(req, res) => {

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



module.exports = router;