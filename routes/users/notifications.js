const express = require("express");
const router = express.Router();
const db = require("../../db");

//Get all notifications
router.get("/notifications", async (req, res) => {
  try {
    const products = await db.query(`SELECT * FROM products`);
    const courses = await db.query(`SELECT * FROM courses`);
    const courseSections = await db.query(`SELECT * FROM courseSections`);
    const courseLectures = await db.query(`SELECT * FROM courseLectures`);
    const blog = await db.query(`SELECT * FROM blog`);
    const events = await db.query(`SELECT * FROM events`);

    const notifications = {
      products: products.rows,
      courses: courses.rows,
      courseSections: courseSections.rows,
      courseLectures: courseLectures.rows,
      blog: blog.rows,
      events: events.rows,
    };

    const allNotifications = [];
    for (const category in notifications) {
      for (let i = 0; i < notifications[category].length; i++) {
        allNotifications.push(notifications[category][i]);
      }
    }

    allNotifications.sort((a, b) => {
      return a.update_date - b.update_date;
    });

    res.status(200).json({
      status: "success",
      results: allNotifications.length,
      data: {
        notifications: allNotifications,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

//Get all of a notification type
router.get("/notifications/products", async (req, res) => {
  try {
    const products = await db.query(`SELECT * FROM products`);

    res.status(200).json({
      status: "success",
      results: products.rows.length,
      data: {
        notifications: products.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

//Get all of a notification type
router.get("/notifications/courses", async (req, res) => {
  try {
    const courses = await db.query(`SELECT * FROM courses`);
    // const courseSections = await db.query(`SELECT * FROM courseSections`);
    // const courseLectures = await db.query(`SELECT * FROM courseLectures`);

    // const courseNotifications = {
    //   courses: courses.rows,
    //   courseSections: courseSections.rows,
    //   courseLectures: courseLectures.rows,
    // };

    res.status(200).json({
      status: "success",
      results: courses.rows.length,
      data: {
        notifications: courses.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

//Get all of a notification type
router.get("/notifications/media", async (req, res) => {
  try {
    const blog = await db.query(`SELECT * FROM blog`);

    res.status(200).json({
      status: "success",
      results: blog.rows.length,
      data: {
        notifications: blog.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

//Get all of a notification type
router.get("/notifications/events", async (req, res) => {
  try {
    const events = await db.query(`SELECT * FROM events`);

    res.status(200).json({
      status: "success",
      results: events.rows.length,
      data: {
        notifications: events.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
