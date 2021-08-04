const express = require('express');
const router = express.Router();
const db = require("../db");

//Add an item to a users cart
router.post('/cart', async(req, res) => {
    try{
        const cart = await db.query("SELECT cart FROM users WHERE email='george@jungle'");

        let currentCart = cart.rows[0].cart;
        let newItem = req.body.id;

        if(currentCart !== null){
            currentCart.push(newItem);
        }else{
            currentCart = [req.body.id]
        }

        let newCart = await db.query("UPDATE users SET cart=$1 WHERE email='george@jungle'", [currentCart]);

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


router.put('/cart/delete', async(req, res) => {
    try{

        const cart = await db.query("SELECT cart FROM users WHERE email='george@jungle'");

        const newCart = [];
        for(let i = 0; i < cart.rows[0].cart.length; i++){
            if(req.body.id !== cart.rows[0].cart[i]){
                newCart.push(cart.rows[0].cart[i])
            }
        }

        console.log(newCart)
        if(JSON.stringify(newCart) !== JSON.stringify([])){
            console.log("items")
            const usersCart = await db.query("UPDATE users SET cart=(ARRAY [$1]) WHERE email='george@jungle' RETURNING *", newCart);
        }else{
            console.log("no items")
            const usersCart = await db.query("UPDATE users SET cart=(NULL) WHERE email='george@jungle' RETURNING *");
        }

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