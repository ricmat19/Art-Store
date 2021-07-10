CREATE DATABASE store;

CREATE TABLE collection(
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(50),
    product VARCHAR(50),
    images BYTEA,
    price MONEY,
    info VARCHAR(300)
);

CREATE TABLE users(
    email VARCHAR(50) PRIMARY KEY,
    password VARCHAR(50),
    firstName VARCHAR(100),
    lastName VARCHAR(100)
);