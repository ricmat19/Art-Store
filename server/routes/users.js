const express = require('express');
const router = express.Router();
const db = require("../db");
const {encrypt, decrypt} = require("../encryptionHandler");

//User Sign Up
router.post('/signup', async(req, res) => {
    try{

        const encryptedPassword = encrypt(req.body.password);

        const user = await db.query("INSERT INTO users (email, password, firstname, lastname, iv) values ($1, $2, $3, $4, $5) RETURNING *", [req.body.email, encryptedPassword.password, req.body.firstname, req.body.lastname, encryptedPassword.iv]);
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

//User Sign In
router.get('/signin', async(req, res) => {
    try{

        const email = req.body.email;
        const password = req.body.password;

        const user = await db.query("INSERT INTO users (email, password, firstname, lastname, iv) values ($1, $2, $3, $4, $5) RETURNING *", [req.body.email, encryptedPassword.password, req.body.firstname, req.body.lastname, encryptedPassword.iv]);
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