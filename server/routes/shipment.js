const express = require('express');
const router = express.Router();
const db = require("../db");

router.post("/shipment", async(req, res) => {
    try{

        const cart = await db.query("SELECT cart FROM users WHERE email='george@jungle'");
        let currentCart = cart.rows[0].cart;
        console.log(currentCart)

        // let newCart = await db.query("UPDATE users SET cart=$1 WHERE email='george@jungle'", [currentCart]);

        const newShipment = await db.query("INSERT INTO shipment (email, firstname, lastname, shipment, address, suite, city, state, zipcode, phone) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *", [req.body.email, req.body.firstname, req.body.lastname, currentCart, req.body.address, req.body.suite, req.body.city, req.body.state, req.body.zipcode, req.body.phone]);
        res.status(201).json({
            status: "success",
            results: newShipment.rows.length,
            data:{
                newShipment: newShipment.rows[0]
            }
        })
    }catch(err){
        console.log(err);
    }
})

module.exports = router;