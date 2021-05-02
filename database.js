const express = require('express');
const Pool = require('pg').Pool;
const router = express.Router();

//insures that the .env file is only run in a development environment and not a production environment
if(process.env.NODE_ENV !== 'production'){
    //requires the the .env file configuration be run first hiding all info hidden via the .env file
    require('dotenv').config();
}

const pool = new Pool({
    user: "postgres",
    password: process.env.DB_PW,
    host: "localhost",
    port: 5432,
    database: "store",
    max: 20,
    connectionTimeoutMillis: 0,
    idleTimeoutMillis: 0
});

module.exports = {
    query: (text, params) => {
        return pool.query(text, params)
    }
}