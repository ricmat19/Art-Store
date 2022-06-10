const express = require("express");
const router = express.Router();
const db = require("../../db");
const multer = require("multer");
const sharp = require("sharp");
const { uploadFile } = require("../../s3");
const fs = require("fs");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);

// Setup image upload destination
const upload = multer({ dest: "images/" });

//Get all blog posts
router.get("/admin/blog", async (req, res) => {
  try {
    const blog = await db.query("SELECT * FROM blog");

    res.status(200).json({
      status: "success",
      results: blog.rows.length,
      data: {
        blog: blog.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

//Get a blog post
router.get("/admin/blog/:id", async (req, res) => {
  try {
    const post = await db.query("SELECT * FROM blog WHERE id=$1", [
      req.params.id,
    ]);

    res.status(200).json({
      status: "success",
      results: post.rows.length,
      data: {
        post: post.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

//Create a blog post
router.post("/admin/blog", upload.single("images"), async (req, res) => {
  try {
    // Set the image file size
    const filePath = req.file.path;
    await sharp(filePath)
      .resize({ width: 1400 })
      .toFile(`imagesOutput/${req.file.filename}`);

    // Create the resized image file
    const resizedFile = {
      key: req.file.filename,
      fileStream: fs.createReadStream(`imagesOutput/${req.file.filename}`),
    };

    //Upload the image to the S3 bucket
    const result = uploadFile(resizedFile);
    res.send({ imagePath: `/imagesOutput/${result.key}` });

    // Remove the image from the images and imagesOutput files
    unlinkFile(`images\\${req.file.filename}`);
    unlinkFile(`imagesOutput\\${req.file.filename}`);

    // Add blog post to the database with the created image key
    await db.query(
      "INSERT INTO blog (title, imageKey, create_date, content, update_date, type) values ($1, $2, $3, $4, $5, $6) RETURNING *",
      [
        req.body.title,
        req.file.filename,
        new Date(),
        req.body.content,
        new Date(),
        "blog",
      ]
    );
  } catch (err) {
    console.log(err);
  }
});

//Update a blog post
router.put("/admin/blog/:id", async (req, res) => {
  try {
    // const file = req.file;
    // const result = await uploadFile(file);
    // res.send({ imagePath: `/images/${result.key}` });
    // await unlinkFile(file.path);

    const post = await db.query(
      "UPDATE blog SET title=$1, content=$2, update_date=$3 WHERE id=$4",
      [req.body.title, req.body.content, new Date(), req.params.id]
    );
    res.status(201).json({
      status: "success",
      results: post.rows.length,
      data: {
        post: post.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;

//Delete a blog post
router.delete("/admin/blog/:id", async (req, res) => {
  try {
    await db.query("DELETE FROM blog WHERE id = $1", [req.params.id]);
    res.status(204).json({
      status: "success",
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
