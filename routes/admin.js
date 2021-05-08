const express = require('express');
const router = express.Router();
const db = require("../database");

router.get('/admin', async(req, res) => {

    res.render('admin', {title: 'Admin', condition: false});
})

router.post('/admin', async(req, res) => {

    try{
        const {title, product, price, info} = req.body;

        const newComic = await db.query("INSERT INTO collection (title, product, price, info) values ($1, $2, $3, $4) RETURNING *", [title, product, price, info]);

        console.log(newComic);
    }catch(err){
        console.log(err);
    }
})

router.put('/admin', async(req, res) => {
    try{
        const {id} = req.params;

        const {title} = req.body;
        const {product} = req.body;
        const {price} = req.body;
        const {info} = req.body;

        const updateItem = await db.query("UPDATE collection SET title = $1 product = $2, price = $3 info = $4 WHERE id = $5", [title, product, price, info, id]);
    }catch(err){
        console.log(err);
    }
})

router.delete('/admin', async(req, res) => {
    try{
        const{id} = req.params;
        const deleteItem = await db.query("DELETE FROM collection WHERE id = $1", [id]);
    }catch(err){
        console.log(err);
    }
})

module.exports = router;