const express = require("express");
const router = express.Router();
const db = require("../../db");
const multer = require("multer");
const sharp = require("sharp");
// const { uploadFile } = require("../../s3");
const fs = require("fs");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);

// Setup image upload destination
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
router.post("/admin/products", upload.single("images"), async (req, res) => {
  try {
    // Set the image file size
    const filePath = req.file.path;
    await sharp(filePath)
      .resize({ height: 500 })
      .toFile(`imagesOutput/${req.file.filename}`);

    // Create the resized image file
    const resizedFile = {
      key: req.file.filename,
      fileStream: fs.createReadStream(`imagesOutput/${req.file.filename}`),
    };

    //Upload the image to the S3 bucket
    // const result = uploadFile(resizedFile);
    // res.send({ imagePath: `/imagesOutput/${result.key}` });

    // Remove the image from the images and imagesOutput files
    unlinkFile(`images\\${req.file.filename}`);
    unlinkFile(`imagesOutput\\${req.file.filename}`);

    // Add products to the database with the created image key
    db.query(
      "INSERT INTO products (title, product, image_url, qty, price, info, create_date, update_date, item_page_url) values ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *",
      [
        req.body.title,
        req.body.product,
        req.file.filename,
        req.body.quantity,
        req.body.price,
        req.body.info,
        new Date(),
        new Date(),
        "product",
      ]
    );
  } catch (err) {
    console.log(err);
  }
});

//Update a products item
router.put("/admin/products/:id", upload.single("images"), async (req, res) => {
  try {
    let item;
    // if (req.file) {
    //   const file = req.file;
    //   const result = await uploadFile(file);
    //   res.send({ imagePath: `/images/${result.key}` });
    //   await unlinkFile(file.path);
    //   item = await db.query(
    //     "UPDATE products SET title=$1, product=$2, price=$3, info=$4, qty=$5, image_url=$6 WHERE id=$7",
    //     [
    //       req.body.title,
    //       req.body.product,
    //       req.body.price,
    //       req.body.info,
    //       req.body.qty,
    //       result.key,
    //       req.params.id,
    //     ]
    //   );
    // } else {
    item = await db.query(
      "UPDATE products SET title=$1, product=$2, price=$3, info=$4, qty=$5, update_date=$6 WHERE id=$7",
      [
        req.body.title,
        req.body.product,
        req.body.price,
        req.body.info,
        req.body.qty,
        new Date(),
        req.params.id,
      ]
    );
    // }

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
