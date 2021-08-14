const express = require('express');
const router = express.Router();
const db = require("../db");
const {encrypt, decrypt} = require("../encryptionHandler");

//User Sign Up
router.post('/signup', async(req, res) => {
    try{
        if(req.body.password === req.body.passwordCopy){

            const encryptedPassword = encrypt(req.body.password);
            console.log(encryptedPassword)

            req.session.email = req.body.email;

            const user = await db.query("INSERT INTO users (email, password, firstname, lastname, iv) values ($1, $2, $3, $4, $5) RETURNING *", [req.body.email, encryptedPassword.password, req.body.firstname, req.body.lastname, encryptedPassword.iv]);
            
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

        const user = await db.query("SELECT * FROM users WHERE email=$1", [req.body.email]);
        console.log(user)

        if(!user){
            res.status(404).json({
                status: "failure",
                data:{
                    user: "No user found!"
                }
            })
        }

        const storedPassword = await db.query("SELECT * FROM users WHERE password=$1", [req.body.password]);
        const validPassword = decrypt(storedPassword, req.body.password)

        if(!validPassword){
            res.status(404).json({
                status: "failure",
                data:{
                    user: "Password Incorrect!"
                }
            })
        }

        req.session.email = req.body.email;

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