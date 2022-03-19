const express = require("express");
const router = express.Router();
const db = require("../../db");
// const multer = require("multer");
// const { uploadFile } = require("../../s3");
// const fs = require("fs");
// const util = require("util");
// const unlinkFile = util.promisify(fs.unlink);

// const upload = multer({ dest: "images/" });

//Get all events
router.get("/admin/events", async (req, res) => {
  try {
    const events = await db.query("SELECT * FROM events");

    res.status(200).json({
      status: "success",
      results: events.rows.length,
      data: {
        events: events.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

//Get a days events
router.get("/admin/events/:date", async (req, res) => {
  try {
    const events = await db.query("SELECT * FROM events WHERE event_date=$1", [
      req.params.date,
    ]);
    res.status(200).json({
      status: "success",
      results: events.rows.length,
      data: {
        events: events.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

//Get an event
router.get("/admin/events/:id", async (req, res) => {
  try {
    const event = await db.query("SELECT * FROM events WHERE id=$1", [
      req.params.id,
    ]);

    res.status(200).json({
      status: "success",
      results: event.rows.length,
      data: {
        event: event.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

//Create an event
router.post(
  "/admin/events",
  // upload.single("images"),
  async (req, res) => {
    try {
      // const file = req.file;
      // const result = await uploadFile(file);
      // res.send({ imagePath: `/images/${result.key}` });
      // await unlinkFile(file.path);
      await db.query(
        "INSERT INTO events (title, event_date, price, spots, info) values ($1, $2, $3, $4, $5) RETURNING *",
        [
          req.body.title,
          req.body.selectedDate,
          // result.key,
          req.body.price,
          req.body.spots,
          req.body.info,
        ]
      );

      res.status(200).json({
        status: "success",
      });
    } catch (err) {
      console.log(err);
    }
  }
);

//Update an event
router.put("/admin/events/:id", async (req, res) => {
  try {
    // const file = req.file;
    // const result = await uploadFile(file);
    // res.send({ imagePath: `/images/${result.key}` });
    // await unlinkFile(file.path);
    const event = await db.query(
      "UPDATE events SET title=$1, event_date=$2, price=$3, info=$4, spots=$5 WHERE id=$6",
      [
        req.body.selectedTitle,
        req.body.selectedDate,
        req.body.selectedPrice,
        req.body.selectedInfo,
        req.body.selectedSpots,
        // result.key,
        req.params.id,
      ]
    );
    res.status(201).json({
      status: "success",
      results: event.rows.length,
      data: {
        event: event.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

//Delete an event
router.delete("/admin/events/:id", async (req, res) => {
  try {
    await db.query("DELETE FROM events WHERE id = $1", [req.params.id]);
    res.status(204).json({
      status: "success",
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
