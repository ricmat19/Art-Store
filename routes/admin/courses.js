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

//Get all course subjects
router.get("/admin/subjects", async (req, res) => {
  try {
    const subjects = await db.query("SELECT * FROM subjects");

    res.status(200).json({
      status: "success",
      results: subjects.rows.length,
      data: {
        subjects: subjects.rows,
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
      req.params.subject,
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

//Create a course
router.post("/admin/courses", upload.single("images"), async (req, res) => {
  try {
    const file = req.file;
    const result = await uploadFile(file);
    console.log(result);
    res.send({ imagePath: `/images/${result.key}` });
    await unlinkFile(file.path);
    await db.query(
      "INSERT INTO courses (title, subject, imagekey, description, price) values ($1, $2, $3, $4, $5) RETURNING *",
      [
        req.body.title,
        req.body.subject,
        result.key,
        req.body.description,
        req.body.price,
      ]
    );
  } catch (err) {
    console.log(err);
  }
});

//Update a course
router.put("/admin/courses/:id", upload.single("images"), async (req, res) => {
  try {
    let course;
    if (req.file) {
      const file = req.file;
      const result = await uploadFile(file);
      res.send({ imagePath: `/images/${result.key}` });
      await unlinkFile(file.path);
      course = await db.query(
        "UPDATE courses SET title=$1, subject=$2, imagekey=$3, qty=$4, price=$5, info=$6 WHERE id=$7",
        [
          req.body.title,
          req.body.subject,
          result.key,
          req.body.content,
          req.body.info,
          req.body.price,
        ]
      );
    } else {
      course = await db.query(
        "UPDATE courses SET title=$1, subject=$2, price=$3, description=$4 WHERE id=$5",
        [
          req.body.title,
          req.body.subject,
          req.body.price,
          req.body.description,
          req.body.id,
        ]
      );
    }

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
});

//Create a course section
router.post("/admin/courses/:id/section", async (req, res) => {
  try {
    const courseSection = await db.query(
      "INSERT INTO courseSections (id, section) values ($1, $2) RETURNING *",
      [req.params.id, req.body.section]
    );

    res.status(201).json({
      status: "success",
      results: courseSection.rows.length,
      data: {
        course: courseSection.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

//Update a course section
router.put("/admin/courses/:id/:section", async (req, res) => {
  try {
    const course = await db.query(
      "UPDATE courseSections SET section=$1 WHERE id=$2 AND section=$3",
      [
        req.body.section,
        req.params.id,
        req.params.section,
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
});

//Create a course lecture
router.post("/admin/courses/:id/:section/lecture", async (req, res) => {
  try {
    const courseLecture = await db.query(
      "INSERT INTO courseLectures (id, section, lecture) values ($1, $2, $3) RETURNING *",
      [req.params.id, req.params.section, req.body.lecture]
    );

    res.status(201).json({
      status: "success",
      results: courseLecture.rows.length,
      data: {
        course: courseLecture.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

//Update a course lecture
router.put("/admin/courses/:id/:section/:lecture", async (req, res) => {
  try {
    const course = await db.query(
      "UPDATE courseLectures SET lecture=$1 WHERE id=$2 AND section=$3 AND lecture=$4",
      [
        req.body.lecture,
        req.params.id,
        req.params.section,
        req.params.lecture,
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
});

//Delete a course
router.delete("/admin/courses/:id", async (req, res) => {
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
