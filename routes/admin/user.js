const express = require("express");
const router = express.Router();

//Check the admin's login status
router.get("/login", async (req, res) => {
  try {
    if (req.session.user === process.env.EMAIL) {
      console.log("You are logged in");
      res.status(201).json({
        status: "",
        data: {
          loggedIn: true,
        },
      });
    } else {
      console.log("Not Allowed. You must login to perform this action.");
      res.status(201).json({
        status: "Not Allowed. You must login to perform this action.",
        data: {
          loggedIn: false,
        },
      });
    }
  } catch (err) {
    console.log(err);
  }
});

//Admin Login
router.post("/login", async (req, res) => {
  try {
    // Check that the email and password provided are correct
    if (
      req.body.email === process.env.EMAIL &&
      req.body.password === process.env.PASSWORD
    ) {
      // Create a cookie session
      req.session.user = process.env.EMAIL;
      console.log("You are now logged in");

      res.status(201).json({
        status: "",
        data: {
          loggedIn: true,
        },
      });
    } else {
      // Check that the email and password provided are incorrect
      if (
        req.body.email !== process.env.EMAIL &&
        req.body.password === process.env.PASSWORD
      ) {
        console.log("The provided email " + req.body.email + " was incorrect!");
        res.status(201).json({
          status: "The provided email " + req.body.email + " was incorrect!",
          data: {
            loggedIn: false,
          },
        });
        // Check that the email is correct but password is incorrect
      } else if (
        req.body.email === process.env.EMAIL &&
        req.body.password !== process.env.PASSWORD
      ) {
        console.log("The provided password was incorrect!");
        res.status(201).json({
          status: "The provided password was incorrect!",
          data: {
            loggedIn: false,
          },
        });
        // If the email is correct but the password is incorrect
      } else {
        console.log(
          "The provided email " +
            req.body.email +
            " and password were incorrect!"
        );
        res.status(201).json({
          status:
            "The provided email " +
            req.body.email +
            " and password were incorrect!",
          data: {
            loggedIn: false,
          },
        });
      }
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
