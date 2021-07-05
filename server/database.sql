CREATE DATABASE store;

CREATE TABLE collection(
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(50),
    product VARCHAR(50),
    images BYTEA,
    price MONEY,
    info VARCHAR(300)
);