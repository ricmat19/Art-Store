CREATE DATABASE store;

CREATE TABLE products(
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(50),
    product VARCHAR(50),
    price MONEY,
    info VARCHAR(300),
    imagekey VARCHAR(300)
);

CREATE TABLE cart(
    id BIGSERIAL PRIMARY KEY,
    cart VARCHAR[],
    email VARCHAR(255),
    qty VARCHAR[]
);

CREATE TABLE subjects(
    subject VARCHAR PRIMARY KEY
);

CREATE TABLE collection(
    id BIGSERIAL PRIMARY KEY,
    user BIGINT,
    group VARCHAR,
    items BIGINT[]
);


CREATE TABLE courseContent(
    id BIGSERIAL,
    section VARCHAR,
    lecture BIGINT,
    CONSTRAINT fk_id FOREIGN KEY(id) REFERENCES courses(id),
    PRIMARY KEY (id, section, lecture)
);
