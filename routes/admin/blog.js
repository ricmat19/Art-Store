const express = require("express");
const router = express.Router();
const db = require("../../db");
const multer = require("multer");
const { uploadFile } = require("../../s3");
const fs = require("fs");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);

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
router.post(
  "/admin/blog",
  upload.single("images"),
  async (req, res) => {
    try {
      const file = req.file;
      const result = await uploadFile(file);
      res.send({ imagePath: `/images/${result.key}` });
      await unlinkFile(file.path);
      await db.query(
        "INSERT INTO blog (title, imagekey, post_date, content) values ($1, $2, $3, $4) RETURNING *",
        [req.body.title, result.key, new Date(), req.body.content]
      );
    } catch (err) {
      console.log(err);
    }
  }
);

//Update a blog post
router.put("/admin/blog/:id", async (req, res) => {
  try {
    const file = req.file;
    const result = await uploadFile(file);
    res.send({ imagePath: `/images/${result.key}` });
    await unlinkFile(file.path);
    const post = await db.query(
      "UPDATE blog SET title=$1, imagekey=$2, post_date=$3, content=$4 WHERE id=$5",
      [
        req.body.title,
        result.key,
        req.body.postDate,
        req.body.content,
        req.body.id,
      ]
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
