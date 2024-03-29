const express = require("express");
const router = express.Router();
const db = require("../../db");

//Get all help articles of a category
router.get("/admin/help/:category", async (req, res) => {
  try {
    const categoryArticles = await db.query(
      "SELECT * FROM help WHERE category=$1",
      [req.params.category]
    );

    res.status(200).json({
      status: "success",
      results: categoryArticles.rows.length,
      data: {
        categoryArticles: categoryArticles.rows,
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

//Create a help article
router.post("/admin/help/:category", async (req, res) => {
  try {
    const helpArticle = await db.query(
      "INSERT INTO help (category, title, article, section, create_date, update_date) values ($1, $2, $3, $4, $5, $6) RETURNING *",
      [
        req.body.category,
        req.body.title,
        req.body.article,
        req.body.selectedSection,
        new Date(),
        new Date(),
      ]
    );

    //Assign the new help article its url
    await db.query("UPDATE help SET url=$1 WHERE id=$2", [
      `help/${helpArticle.rows[0].category}/${helpArticle.rows[0].id}`,
      helpArticle.rows[0].id,
    ]);

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

//Update a help article
router.put("/admin/help/:category/:id", async (req, res) => {
  try {

    let helpArticle = {};
    if (req.body.title && req.body.content) {
      helpArticle = await db.query(
        "UPDATE help SET title=$1, article=$2, update_date=$3 WHERE id=$4",
        [req.body.title, req.body.content, new Date(), req.params.id]
      );
    } else if (req.body.title) {
      helpArticle = await db.query(
        "UPDATE help SET title=$1, update_date=$2 WHERE id=$3",
        [req.body.title, new Date(), req.params.id]
      );
    } else {
      helpArticle = await db.query(
        "UPDATE help SET content=$1, update_date=$2 WHERE id=$3",
        [req.body.content, new Date(), req.params.id]
      );
    }

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
