const express = require("express");
const router = express.Router();
const db = require("../../db");

//Get all community threads
router.get("/admin/community", async (req, res) => {
  try {
    const threads = await db.query("SELECT * FROM community");

    res.status(200).json({
      status: "success",
      results: threads.rows.length,
      data: {
        threads: threads.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

//Get a thread
router.get("/admin/community/:thread", async (req, res) => {
  try {
    const thread = await db.query("SELECT * FROM community WHERE thread=$1", [
      req.params.thread,
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

//Get a thread post
router.get("/admin/community/:thread/:id", async (req, res) => {
  try {
    const post = await db.query(
      "SELECT * FROM community WHERE thread=$1 AND id=$2",
      [req.params.thread, req.params.id]
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

//Delete a thread
router.delete("/admin/community/:thread/:id", async (req, res) => {
  try {
    await db.query("DELETE FROM courses WHERE thread = $1 AND id = $2", [
      req.params.thread,
      req.params.id,
    ]);
    res.status(204).json({
      status: "success",
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
