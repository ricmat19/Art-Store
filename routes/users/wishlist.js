const express = require("express");
const router = express.Router();
const db = require("../../db");

//Get wishlist
router.get("/wishlist", async (req, res) => {
  try {
    const wishlist = await db.query("SELECT * FROM wishlist");

    res.status(200).json({
      status: "success",
      results: wishlist.rows.length,
      data: {
        wishlist: wishlist.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

//Add to wishlist
router.post("/wishlist", async (req) => {
  try {
    await db.query(
      "INSERT INTO wishlist (wishlist_group, wishlist_user, item) values ($1, $2, $3) RETURNING *",
      [req.body.group, req.body.user, req.body.item]
    );
    // await db.query(
    //   "INSERT INTO wishlist (item) values ($1) RETURNING *",
    //   // [req.body.user, req.body.item]
    //   [req.body.item]
    // );
  } catch (err) {
    console.log(err);
  }
});

//Remove from wishlist
router.delete("/wishlist/delete/:id", async (req, res) => {
  try {
    await db.query("DELETE FROM wishlist WHERE user = $1", [req.params.user]);
    res.status(204).json({
      status: "success",
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
