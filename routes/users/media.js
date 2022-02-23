const express = require("express");
const router = express.Router();
const db = require("../../db");
const axios = require("axios");
const youtubeBaseURL = "https://www.googleapis.com/youtube/v3/";

//Get all blog posts
router.get("/media", async (req, res) => {
  try {
    const medias = await db.query(
      "SELECT * FROM medias");

    res.status(200).json({
      status: "success",
      results: medias.rows.length,
      data: {
        medias: medias.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

//Get all blog posts
router.get("/media/blog", async (req, res) => {
  try {
    const posts = await db.query(
      "SELECT * FROM blogs");

    res.status(200).json({
      status: "success",
      results: posts.rows.length,
      data: {
        posts: posts.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

//Get a specific media post
router.get("/media/blog/:id", async (req, res) => {
  try {
    const post = await db.query(`SELECT * FROM blogs WHERE id=$1`, [
      req.params.id,
    ]);
    res.status(200).json({
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

//Get all youtube videos in my channel
router.get("/media/channel", async (req, res) => {
  try {
    const videos = await axios.get(youtubeBaseURL + "search?key=" + process.env.YOUTUBE_API_KEY + "&channelId=" + "UCaem2HqM0PPak4fvf-uxlnQ")
    console.log(videos.data)
    res.status(200).json({
      status: "success",
      results: videos.data,
      data: {
        videos: videos.data,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
