const express = require('express');
const router = express.Router();
const db = require("../database");

//Comics
router.get('/collection/comics', async(req, res) => {

    try{
        const { id } = req.params;
        const item = await db.query("SELECT * FROM collection", [id]);
    }catch(err){
        console.log(err);
    }

    res.render('comics', {title: 'Comics', condition: false});
})

router.get('/collection/comics/:id', (req, res) => {
    res.render('comic', {title: 'Comic', condition: false});
})

router.get('/collection/comics/:id', async(req, res) => {
    try{
        const {id} = req.params;
        const item = await db.query("SELECT * FROM collection WHERE id = $2", [product, id]);
        console.log(item)
    }catch(err){
        console.log("Comic:" + err);
    }
})

//Prints
router.get('/collection/prints', (req, res) => {
    res.render('prints', {title: 'Prints', condition: false});
})

router.get('/collection/prints/:id', (req, res) => {
    res.render('print', {title: 'Print', condition: false});
})

router.get('/collection/prints/:id', async(req, res) => {
    try{
        const {id} = req.params;
        const item = await db.query("SELECT * FROM collection WHERE product = $1 id = $2", [product, id]);
        console.log(item)
    }catch(err){
        console.log(err);
    }
})

//Personal Works
router.get('/collection/personal-works', (req, res) => {
    res.render('personal-works', {title: 'Personal Works', condition: false});
})

router.get('/collection/personal-works/:id', (req, res) => {
    res.render('print', {title: 'Print', condition: false});
})

router.get('/collection/personal-works/:id', async(req, res) => {
    try{
        const {id} = req.params;
        const item = await pool.query("SELECT * FROM collection WHERE product = $1 id = $2", [product, id]);
        console.log(item)
    }catch(err){
        console.log(err);
    }
})

module.exports = router;