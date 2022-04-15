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
router.get("/notifications/:type", async (req, res) => {
  try {
    const notifications = await db.query(`SELECT * FROM $1`, [req.params.type]);

    res.status(200).json({
      status: "success",
      results: notifications.rows.length,
      data: {
        notifications: notifications.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
