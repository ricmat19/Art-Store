const express = require("express");
const router = express.Router();
const db = require("../../db");

//Get about
router.get("/about", async (req, res) => {
  try {
    const about = await db.query(
      "SELECT * FROM generalArticles WHERE article='about'"
    );

    res.status(200).json({
      status: "success",
      results: about.rows.length,
      data: {
        about: about.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

//Get privacy policy
router.get("/privacyPolicy", async (req, res) => {
  try {
    const privacyPolicy = await db.query(
      "SELECT * FROM generalArticles WHERE article='privacyPolicy'"
    );

    res.status(200).json({
      status: "success",
      results: privacyPolicy.rows.length,
      data: {
        privacyPolicy: privacyPolicy.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

//Get terms of service
router.get("/termsOfService", async (req, res) => {
  try {
    const termsOfService = await db.query(
      "SELECT * FROM generalArticles WHERE article='termsOfService'"
    );

    res.status(200).json({
      status: "success",
      results: termsOfService.rows.length,
      data: {
        termsOfService: termsOfService.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
