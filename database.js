const express = require('express');
const Pool = require('pg').Pool;
const router = express.Router();

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
    query: (text, params) => pool.query(text, params),
}