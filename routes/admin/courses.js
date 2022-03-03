const express = require("express");
const router = express.Router();
const db = require("../../db");
const multer = require("multer");
const { uploadFile } = require("../../s3");
const fs = require("fs");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);

const upload = multer({ dest: "images/" });

//Get all courses
router.get("/admin/courses", async (req, res) => {
  try {
    const courses = await db.query("SELECT * FROM courses");

    res.status(200).json({
      status: "success",
      results: courses.rows.length,
      data: {
        courses: courses.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

//Get a course
router.get("/admin/courses/:subject/:id", async (req, res) => {
  try {
    const course = await db.query("SELECT * FROM courses WHERE id=$1", [
      req.params.id,
    ]);

    res.status(200).json({
      status: "success",
      results: course.rows.length,
      data: {
        course: course.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

//Get a course subject
router.get("/admin/courses/:subject", async (req, res) => {
  try {
    const subject = await db.query("SELECT * FROM courses WHERE subject=$1", [
      req.params.product,
    ]);
    res.status(200).json({
      status: "success",
      results: subject.rows.length,
      data: {
        subject: subject.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

//Create a course
router.post(
  "/admin/courses",
  upload.single("images"),
  async (req, res) => {
    try {
      const file = req.file;
      const result = await uploadFile(file);
      res.send({ imagePath: `/images/${result.key}` });
      await unlinkFile(file.path);
      await db.query(
        "INSERT INTO courses (title, subject, imagekey, content, info, price) values ($1, $2, $3, $4, $5, $6) RETURNING *",
        [
          req.body.title,
          req.body.subject,
          result.key,
          req.body.content,
          req.body.info,
          req.body.price,
        ]
      );
    } catch (err) {
      console.log(err);
    }
  }
);

//Update a course
router.put(
  "/admin/courses/:subject/:id",
  upload.single("images"),
  async (req, res) => {
    try {
      const file = req.file;
      const result = await uploadFile(file);
      res.send({ imagePath: `/images/${result.key}` });
      await unlinkFile(file.path);
      const course = await db.query(
        "UPDATE products SET title=$1, subject=$2, imagekey=$3, qty=$4, price=$5, info=$6 WHERE id=$7",
        [
          req.body.title,
          req.body.subejct,
          result.key,
          req.body.content,
          req.body.info,
          req.body.price,
        ]
      );
      res.status(201).json({
        status: "success",
        results: course.rows.length,
        data: {
          course: course.rows[0],
        },
      });
    } catch (err) {
      console.log(err);
    }
  }
);

//Delete a course
router.delete("/admin/courses/:subject/:id", async (req, res) => {
  try {
    await db.query("DELETE FROM courses WHERE id = $1", [req.params.id]);
    res.status(204).json({
      status: "success",
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
