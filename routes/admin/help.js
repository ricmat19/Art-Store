const express = require("express");
const router = express.Router();
const db = require("../../db");

//Get all help articles of a category
router.get("/admin/help/:category", async (req, res) => {
  try {
    const help = await db.query("SELECT * FROM help WHERE category=$1", [
      req.params.category,
    ]);

    res.status(200).json({
      status: "success",
      results: help.rows.length,
      data: {
        help: help.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

//Get a help article
router.get("/admin/help/:category/:id", async (req, res) => {
  try {
    const helpArticle = await db.query("SELECT * FROM help WHERE id=$1", [
      req.params.id,
    ]);

    res.status(200).json({
      status: "success",
      results: helpArticle.rows.length,
      data: {
        helpArticle: helpArticle.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

//Update a help article
router.put("/admin/help/:category/:id", async (req, res) => {
  try {
    const helpArticle = await db.query(
      "UPDATE help SET article=$1 WHERE id=$2",
      [req.body.article, req.params.id]
    );

    res.status(201).json({
      status: "success",
      results: helpArticle.rows.length,
      data: {
        helpArticle: helpArticle.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

//Create a help article
router.post("/admin/help/:category", async (req, res) => {
  try {
    const helpArticle = await db.query(
      "INSERT INTO help (category, title, article, section) values ($1, $2, $3, $4) RETURNING *",
      [req.params.category, req.body.title, req.body.article, req.body.selectedSection]
    );
    res.status(201).json({
      status: "success",
      results: helpArticle.rows.length,
      data: {
        helpArticle: helpArticle.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

//Delete a help article
router.delete("/admin/help/:id", async (req, res) => {
  try {
    await db.query("DELETE FROM help WHERE id = $1", [req.params.id]);
    res.status(204).json({
      status: "success",
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
