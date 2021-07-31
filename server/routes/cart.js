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
        const cart = await db.query("SELECT * FROM users WHERE email='george@jungle'");

        const usersCart = [];
        for(let i = 0; i < cart.rows[0].cart.length; i++){
            const cartCollection = await db.query("SELECT * FROM collection WHERE id=$1", [cart.rows[0].cart[i]]);
            usersCart.push(cartCollection.rows[0])
        }

        res.status(200).json({
            status: "success",
            results: usersCart.length,
            data:{
                cart: usersCart
            }
        })
    }catch(err){
        console.log(err);
    }
})


router.put('/cart', async(req, res) => {
    try{

        const cart = await db.query("SELECT cart FROM users WHERE email='george@jungle'");
        // console.log(cart.rows[0].cart[0])
        // console.log(req.body.id);

        const newCart = [];
        for(let i = 0; i < cart.rows[0].cart.length; i++){
            if(req.body.id !== cart.rows[0].cart[i]){
                newCart.push(parseInt(cart.rows[0].cart[i]))
            }
        }

        console.log(newCart)
        // const usersCart = await db.query("UPDATE users SET cart=(ARRAY [$1]) WHERE email='george@jungle' RETURNING *", [newCart]);

        res.status(200).json({
            status: "success",
            // results: usersCart.length,
            // data:{
            //     cart: usersCart
            // }
        })
    }catch(err){
        console.log(err);
    }
})



module.exports = router;