const express = require("express");
const router = express.Router();
const db = require("../../db");

//Get all community threads
router.get("/community", async (req, res) => {
  try {
    const community = await db.query("SELECT * FROM community");

    res.status(200).json({
      status: "success",
      results: community.rows.length,
      data: {
        community: community.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

//Get a community thread
router.get("/community/:thread", async (req, res) => {
  try {
    const thread = await db.query("SELECT * FROM threads WHERE id=$1", [
      req.params.id,
    ]);

    res.status(200).json({
      status: "success",
      results: thread.rows.length,
      data: {
        thread: thread.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

//Create a thread
router.post("/community", async (req, res) => {
  try {
    const thread = await db.query(
      "INSERT INTO community (title, thread_date) values ($1, $2) RETURNING *",
      [req.body.title, req.body.threadDate]
    );
    res.status(200).json({
      status: "success",
      results: thread.rows.length,
      data: {
        thread: thread.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

//Create a thread post
router.post("/community/:thread", async (req, res) => {
  try {
    const post = await db.query(
      "INSERT INTO community (title, post_date, post, edited, edit_date) values ($1, $2, $3, $4, $5) WHERE thread=$6 RETURNING *",
      [
        req.body.title,
        req.body.postDate,
        req.body.post,
        req.body.edited,
        req.body.editDate,
        req.body.thread,
      ]
    );
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

//Update a thread post
router.put("/community/:thread/:post", async (req, res) => {
  try {
    const post = await db.query(
      "UPDATE community SET title=$1, post_date=$2, post=$3, edited=$4, edit_date=$5, thread=$6 WHERE id=$7",
      [
        req.body.title,
        req.body.postDate,
        req.body.post,
        req.body.edited,
        req.body.editDate,
        req.body.thread,
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

//Delete a thread
router.delete("/community/:thread", async (req, res) => {
  try {
    await db.query("DELETE FROM community WHERE thread = $1", [
      req.params.thread,
    ]);
    res.status(204).json({
      status: "success",
    });
  } catch (err) {
    console.log(err);
  }
});

//Delete a thread post
router.delete("/community/:thread/:id", async (req, res) => {
  try {
    await db.query("DELETE FROM community WHERE id = $1", [req.params.id]);
    res.status(204).json({
      status: "success",
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
