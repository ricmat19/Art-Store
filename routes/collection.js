const express = require('express');
const router = express.Router();
const db = require("../database");

//Comics
router.get('/collection/comics', async(req, res) => {

    try{
        const comicCollection = await db.query(`SELECT * FROM collection WHERE PRODUCT=$1`, ['comic']);
        console.log(comicCollection.rows);
    }catch(err){
        console.log(err);
    }

    res.render('comics', {title: 'Comics', condition: false});
})

router.get('/collection/comic/:id', async (req, res) => {

    try{
        const comic = await db.query(`SELECT * FROM collection WHERE product=$1 AND id=$2`, ['comic', req.params.id]);
        console.log(comic.rows);
    }catch(err){
        console.log(err);
    }

    res.render('comic', {title: 'Comic', condition: false});
})

//Prints
router.get('/collection/prints', async(req, res) => {

    try{
        const printCollection = await db.query(`SELECT * FROM collection WHERE PRODUCT=$1`, ['print']);
        console.log(printCollection.rows);
    }catch(err){
        console.log(err);
    }

    res.render('prints', {title: 'Prints', condition: false});
})

router.get('/collection/print/:id', async(req, res) => {

    try{
        const print = await db.query(`SELECT * FROM collection WHERE product=$1 AND id=$2`, ['print', req.params.id]);
        console.log(print.rows);
    }catch(err){
        console.log(err);
    }

    res.render('print', {title: 'Print', condition: false});
})

//Personal Works
router.get('/collection/personal-works', async(req, res) => {

    try{
        const personalCollection = await db.query(`SELECT * FROM collection WHERE PRODUCT=$1`, ['personal-work']);
        console.log(personalCollection.rows);
    }catch(err){
        console.log(err);
    }

    res.render('personal-works', {title: 'Personal Works', condition: false});
})

router.get('/collection/personal-work/:id', async(req, res) => {

    try{
        const personal = await db.query(`SELECT * FROM collection WHERE product=$1 AND id=$2`, ['personal-work', req.params.id]);
        console.log(personal.rows);
    }catch(err){
        console.log(err);
    }

    res.render('personal-works', {title: 'Personal Work', condition: false});
})

module.exports = router;