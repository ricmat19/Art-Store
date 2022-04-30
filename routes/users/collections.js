const express = require("express");
const router = express.Router();
const db = require("../../db");

//Get collection groups
router.get("/collection/groups", async (req, res) => {
  try {
    const groups = await db.query(
      "SELECT * FROM collections WHERE collection_user=$1 AND item=$2",
      ["ric19mat@gmail.com", 0]
    );

    res.status(200).json({
      status: "success",
      results: groups.rows.length,
      data: {
        groups: groups.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

//Get collection products
router.get("/collection/group/:group", async (req, res) => {
  try {
    const groupItems = await db.query(
      "SELECT * FROM collections WHERE collection_user=$1 AND item!=$2 AND collection_group=$3",
      ["ric19mat@gmail.com", 0, req.params.group]
    );

    res.status(200).json({
      status: "success",
      results: groupItems.rows.length,
      data: {
        groupItems: groupItems.rows,
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
      "INSERT INTO collections (collection_user, collection_group, item) values ($1, $2, $3) RETURNING *",
      [req.body.user, req.body.collectionGroup, req.body.item]
    );
  } catch (err) {
    console.log(err);
  }
});

//Remove from collections
router.delete("/collections/delete/:group/:item", async (req, res) => {
  try {
    await db.query("DELETE FROM collections WHERE collection_user = $1 AND collection_group=$2 AND item=$3", [
      "ric19mat@gmail.com",
      req.params.group,
      req.params.item
    ]);
    res.status(204).json({
      status: "success",
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
