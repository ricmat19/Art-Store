const express = require("express");
const router = express.Router();
const db = require("../../db");

//Get collections
router.get("/collections", async (req, res) => {
  try {
    const collections = await db.query("SELECT * FROM collections");

    res.status(200).json({
      status: "success",
      results: collections.rows.length,
      data: {
        collections: collections.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

//Add to collections
router.post("/collections", async (req) => {
  try {
    if (req.body.item === undefined) {
      req.body.item = 0;
    }
    await db.query(
      "INSERT INTO collections (collection_user, collection_name, item) values ($1, $2, $3) RETURNING *",
      [req.body.user, req.body.collectionName, req.body.item]
    );
  } catch (err) {
    console.log(err);
  }
});

//Remove from collections
router.delete("/collections/delete/:id", async (req, res) => {
  try {
    await db.query("DELETE FROM collections WHERE user = $1", [
      req.params.user,
    ]);
    res.status(204).json({
      status: "success",
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
