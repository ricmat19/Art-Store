const express = require("express");
const router = express.Router();
const db = require("../../db");
const multer = require("multer");
const { uploadFile } = require("../../s3");
const fs = require("fs");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);

const upload = multer({ dest: "images/" });

//Get all products
router.get("/admin/products", async (req, res) => {
  try {
    const products = await db.query("SELECT * FROM products");

    res.status(200).json({
      status: "success",
      results: products.rows.length,
      data: {
        products: products.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

//Get a product type
router.get("/admin/products/:product", async (req, res) => {
  try {
    const product = await db.query("SELECT * FROM products WHERE PRODUCT=$1", [
      req.params.product,
    ]);
    res.status(200).json({
      status: "success",
      results: product.rows.length,
      data: {
        product: product.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

//Get a product
router.get("/admin/products/:id", async (req, res) => {
  try {
    const product = await db.query("SELECT * FROM products WHERE id=$1", [
      req.params.id,
    ]);

    res.status(200).json({
      status: "success",
      results: product.rows.length,
      data: {
        product: product.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

//Create a product
router.post(
  "/admin/products",
  upload.single("images"),
  async (req, res) => {
    try {
      const file = req.file;
      const result = await uploadFile(file);
      res.send({ imagePath: `/images/${result.key}` });
      await unlinkFile(file.path);
      await db.query(
        "INSERT INTO products (title, product, imagekey, qty, price, info) values ($1, $2, $3, $4, $5, $6) RETURNING *",
        [
          req.body.title,
          req.body.product,
          result.key,
          req.body.quantity,
          req.body.price,
          req.body.info,
        ]
      );
    } catch (err) {
      console.log(err);
    }
  }
);

//Update a products item
router.put("/admin/products/:id", async (req, res) => {
  try {
    const item = await db.query(
      "UPDATE products SET title=$1, product=$2, qty=$3, price=$4, info=$5 WHERE id=$7",
      [
        req.body.title,
        req.body.type,
        req.body.quantity,
        req.body.price,
        req.body.info,
        // req.body.primaryImage,
        req.params.id,
      ]
    );
    res.status(201).json({
      status: "success",
      results: item.rows.length,
      data: {
        item: item.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;

//Delete a product item
router.delete("/admin/products/:id", async (req, res) => {
  try {
    await db.query("DELETE FROM products WHERE id = $1", [req.params.id]);
    res.status(204).json({
      status: "success",
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
