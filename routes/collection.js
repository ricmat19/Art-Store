const express = require('express');
const router = express.Router();
// const db = require("../database");

router.post('/collection', async(req, res) => {

    try{
        const {title} = req.body;
        const {product} = req.body;
        const {price} = req.body;
        const {info} = req.body;

        const newComic = await db.query("INSERT INTO collection title = $1 product = $2 price = $3 info = $4 RETURNING *", [title, product, price, info]);
    }catch(err){
        console.log(err.message);
    }
})

router.put('/collection/:id', async(req, res) => {
    try{
        const {id} = req.params;

        const {title} = req.body;
        const {product} = req.body;
        const {price} = req.body;
        const {info} = req.body;

        const updateItem = await db.query("UPDATE collection SET title = $1 product = $2, price = $3 info = $4 WHERE id = $5", [title, product, price, info, id]);
    }catch(err){
        console.log(err.message);
    }
})

router.delete('/collection/:id', async(req, res) => {
    try{
        const{id} = req.params;
        const deleteItem = await db.query("DELETE FROM collection WHERE id = $1", [id]);
    }catch(err){
        console.log(err.message);
    }
})

//Comics
router.get('/collection/comics', async(req, res) => {

    try{
        const item = await db.query("SELECT * FROM collection", [id]);
    }catch(err){
        console.log(err.message);
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
        console.log(err.message);
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
        console.log(err.message);
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
        console.log(err.message);
    }
})

module.exports = router;