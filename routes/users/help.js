const express = require("express");
const router = express.Router();
const db = require("../../db");

//Get help articles
router.get("/help", async (req, res) => {
  try {
    const helpArticles = await db.query("SELECT * FROM help");
    console.log('help')

    res.status(200).json({
      status: "success",
      results: helpArticles.rows.length,
      data: {
        helpArticles: helpArticles.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

//Get all help articles of a category
router.get("/help/:category", async (req, res) => {
  try {
    console.log('help category')
    const helpCategory = await db.query(
      "SELECT * FROM help WHERE category=$1",
      [req.params.category]
    );

    res.status(200).json({
      status: "success",
      results: helpCategory.rows.length,
      data: {
        helpCategory: helpCategory.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

//Get a help article
router.get("/help/:category/:id", async (req, res) => {
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

module.exports = router;
