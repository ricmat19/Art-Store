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
router.get("/admin/courses/course/:id", async (req, res) => {
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

//Get last course
router.get("/admin/courses/last", async (req, res) => {
  try {
    const course = await db.query(
      `SELECT id FROM courses ORDER BY id DESC LIMIT 1`
    );

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
router.get("/admin/courses/subject/:subject", async (req, res) => {
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

//Get a course's sections
router.get("/admin/courses/sections/:id", async (req, res) => {
  try {
    const courseSections = await db.query(
      "SELECT * FROM courseSections WHERE id=$1",
      [req.params.id]
    );

    res.status(200).json({
      status: "success",
      results: courseSections.rows.length,
      data: {
        sections: courseSections.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

//Get a course's lectures
router.get("/admin/courses/lectures/:id", async (req, res) => {
  try {
    const courseLectures = await db.query(
      "SELECT * FROM courseLectures WHERE id=$1",
      [req.params.id]
    );

    res.status(200).json({
      status: "success",
      results: courseLectures.rows.length,
      data: {
        lectures: courseLectures.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

//Create a course
router.post("/admin/courses", upload.single("images"), async (req, res) => {
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
    const result = uploadFile(resizedFile);
    res.send({ imagePath: `/imagesOutput/${result.key}` });
    // Remove the image from the images and imagesOutput files
    unlinkFile(`images\\${req.file.filename}`);
    unlinkFile(`imagesOutput\\${req.file.filename}`);

    // Add course to the database with the created image key
    await db.query(
      "INSERT INTO courses (title, subject, image key, description, price, create_date, update_date, type) values ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
      [
        req.body.title,
        req.body.subject,
        req.file.filename,
        req.body.description,
        req.body.price,
        new Date(),
        new Date(),
        "course",
      ]
    );
  } catch (err) {
    console.log(err);
  }
});

//Create a course section
router.post("/admin/courses/section/:id", async (req, res) => {
  try {
    const courseSection = await db.query(
      "INSERT INTO courseSections (id, section, create_date, update_date, type) values ($1, $2, $3, $4, $5) RETURNING *",
      [req.params.id, req.body.section, new Date(), new Date(), "type"]
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

//Create a course lecture
router.post("/admin/courses/lecture/:id", async (req, res) => {
  try {
    const courseLecture = await db.query(
      "INSERT INTO courseLectures (id, section, lecture, create_date, update_date, type) values ($1, $2, $3, $4, $5, $6) RETURNING *",
      [
        req.params.id,
        req.body.section,
        req.body.lecture,
        new Date(),
        new Date(),
        "course",
      ]
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

//Update a course
router.put("/admin/courses/:id", upload.single("images"), async (req, res) => {
  try {
    let course;

    // Check if an image file is provided for the course
    if (req.file) {
      const file = req.file;

      // Set the image file size
      const resizedFile = sharp(file).resize({ height: 500 });

      //Upload the image to the S3 bucket
      const result = await uploadFile(resizedFile);
      res.send({ imagePath: `/images/${result.key}` });

      // Remove the image from files
      await unlinkFile(file.path);

      course = await db.query(
        "UPDATE courses SET title=$1, subject=$2, imagekey=$3, qty=$4, price=$5, info=$6, update_date=$7 WHERE id=$8",
        [
          req.body.title,
          req.body.subject,
          result.key,
          req.body.content,
          req.body.info,
          new Date(),
          req.body.price,
        ]
      );
    } else {
      course = await db.query(
        "UPDATE courses SET title=$1, subject=$2, price=$3, description=$4, update_date=$5 WHERE id=$6",
        [
          req.body.title,
          req.body.subject,
          req.body.price,
          req.body.description,
          new Date(),
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

//Update a course section
router.put("/admin/courses/section/:section/:id", async (req, res) => {
  try {
    const course = await db.query(
      "UPDATE courseSections SET section=$1, update_date=$2 WHERE id=$3 AND section=$4",
      [req.body.section, new Date(), req.params.id, req.params.section]
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

//Update a course lecture
router.put("/admin/courses/lecture/:lecture/:section/:id", async (req, res) => {
  try {
    let lecture;

    //Run function if a video is provided to add a video to the relevant course lecture
    if (req.body.video) {
      lecture = await db.query(
        "UPDATE courseLectures SET video=$1, description=$2, update_date=$3 WHERE id=$4 AND section=$5 AND lecture=$6",
        [
          req.body.video,
          req.body.description,
          new Date(),
          req.params.id,
          req.params.section,
          req.params.lecture,
        ]
      );
    }

    //Run function if an article is provided to add an article to the relevant course lecture
    if (req.body.article) {
      lecture = await db.query(
        "UPDATE courseLectures SET article=$1, description=$2, update_date=$3 WHERE id=$4 AND section=$5 AND lecture=$6",
        [
          req.body.article,
          req.body.description,
          new Date(),
          req.params.id,
          req.params.section,
          req.params.lecture,
        ]
      );
    }

    res.status(201).json({
      status: "success",
      results: lecture.rows.length,
      data: {
        course: lecture.rows[0],
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
