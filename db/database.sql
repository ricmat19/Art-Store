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

CREATE TABLE courseSections(
    id BIGSERIAL,
    section VARCHAR,
    CONSTRAINT fk_id FOREIGN KEY(id) REFERENCES courses(id),
    PRIMARY KEY (id, section)
);

CREATE TABLE courseLectures(
    id BIGSERIAL,
    section VARCHAR,
    lecture VARCHAR,
    CONSTRAINT fk_id FOREIGN KEY(id, section) REFERENCES courseSections(id, section),
    PRIMARY KEY (id, section, lecture)
);

CREATE TABLE help(
    id BIGSERIAL,
    category VARCHAR,
    title VARCHAR,
    article VARCHAR
);

CREATE TABLE generalArticles(
    article VARCHAR PRIMARY KEY,
    content VARCHAR
);

CREATE TABLE collections(
    collection_user VARCHAR,
    collection_name BIGINT,
    item BIGINT,
    PRIMARY KEY (collection_user, collection_name)
);
