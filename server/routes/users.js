const express = require('express');
const router = express.Router();
const db = require("../db");

//User Sign Up
router.post('/signup', async(req, res) => {
    try{
        const user = await db.query("INSERT INTO users (email, password, firstname, lastname) values ($1, $2, $3, $4) RETURNING *", [req.body.email, req.body.password, req.body.firstname, req.body.lastname]);
        res.status(201).json({
            status: "success",
            results: user.rows.length,
            data:{
                user: user.rows[0]
            }
        })
    }catch(err){
        console.log(err);
    }
})

module.exports = router;