const express = require('express');
const router = express.Router();
const db = require("../db");
const {encrypt, decrypt} = require("../encryptionHandler");

//User Sign Up
router.post('/signup', async(req, res) => {
    try{

        if(req.body.password === req.body.passwordCopy){

            req.session.email = req.body.email;

            const encryptedPassword = await encrypt(req.body.password);

            const user = await db.query("INSERT INTO users (email, password, firstname, lastname) values ($1, $2, $3, $4) RETURNING *", [req.body.email, encryptedPassword.password, req.body.firstname, req.body.lastname]);
            
            res.status(201).json({
                status: "success",
                results: user.rows.length,
                data:{
                    user: user.rows[0]
                }
            })

        }else{
            console.log("Passwords must match")
        }

    }catch(err){
        console.log(err);
    }
})


//User Sign In
router.post('/signin', async(req, res) => {
    try{

        const user = await db.query("SELECT password FROM users WHERE email=$1", [req.body.email]);

        const storedPassword = user.rows[0].password;
        const validPassword = await decrypt(storedPassword, req.body.password);

        if(!user){
            res.status(404).json({
                status: "failure",
                data:{
                    user: "No user found!"
                }
            })
        }else if(!validPassword){
            res.status(404).json({
                status: "failure",
                data:{
                    user: "Password Incorrect!"
                }
            })
        }else{
            req.session.email = req.body.email;

            res.status(201).json({
                status: "success",
                results: user.rows.length,
                data:{
                    user: user.rows[0]
                }
            })
        }
    }catch(err){
        console.log(err);
    }
})

//User Sign Out
router.get('/signout', async(req, res) => {
    try{
        req.session = null;

        res.status(201).json({
            status: "success"
        })
    }catch(err){
        console.log(err);
    }
})

module.exports = router;