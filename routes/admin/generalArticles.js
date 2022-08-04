const express = require("express");
const router = express.Router();
const db = require("../../db");

//Get about
router.get("/admin/about", async (req, res) => {
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
router.get("/admin/privacyPolicy", async (req, res) => {
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
router.get("/admin/termsOfService", async (req, res) => {
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

//Update about
router.put("/admin/about", async (req, res) => {
  try {
    const about = await db.query(
      "UPDATE generalArticles SET content=$1, image=$2, update_date=$3 WHERE article=$4",
      [req.body.content, req.body.image, new Date(), "about"]
    );

    res.status(201).json({
      status: "success",
      results: about.rows.length,
      data: {
        about: about.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

//Update privacy policy
router.put("/admin/privacyPolicy", async (req, res) => {
  try {
    const privacyPolicy = await db.query(
      "UPDATE generalArticles SET content=$1, update_date=$2 WHERE article=$3",
      [req.body.content, new Date(), "privacyPolicy"]
    );

    res.status(201).json({
      status: "success",
      results: privacyPolicy.rows.length,
      data: {
        privacyPolicy: privacyPolicy.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

//Update terms of service
router.put("/admin/termsOfService", async (req, res) => {
  try {
    const termsOfService = await db.query(
      "UPDATE generalArticles SET content=$1, update_date=$2 WHERE article=$3",
      [req.body.content, new Date(), "termsOfService"]
    );

    res.status(201).json({
      status: "success",
      results: termsOfService.rows.length,
      data: {
        termsOfService: termsOfService.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
