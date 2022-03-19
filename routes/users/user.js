const express = require("express");
// const { validationResult } = require("express-validator");
// const {
//   checkEmail,
//   checkPassword,
//   checkPasswordCopy,
// } = require("../../validator");
const router = express.Router();
const db = require("../../db");
const { signup, signin } = require("../../encryptionHandler");

//User Sign Up
router.post(
  "/signup",
  // [checkEmail, checkPassword, checkPasswordCopy],
  async (req, res) => {
    try {
      // const errors = validationResult(req);
      // if (!errors.isEmpty()) {
      //   return errors;
      // }

      // req.session.email = req.body.email;

      const encryptedPassword = await signup(req.body.password);
      const checkUser = await db.query("SELECT * FROM users WHERE email=$1", [
        req.body.email,
      ]);

      let user;
      if (checkUser.rows.length === 0) {
        user = await db.query(
          "INSERT INTO users (email, password, firstname, lastname) values ($1, $2, $3, $4) RETURNING *",
          [
            req.body.email,
            encryptedPassword.password,
            req.body.firstName,
            req.body.lastName,
          ]
        );
        res.status(201).json({
          status: "success",
          results: user.rows.length,
          data: {
            user: user.rows[0],
            // errors: errors,
          },
        });
      } else {
        res.status(201).json({
          status: "success",
          data: {
            error: "User already exists",
          },
        });
      }
    } catch (err) {
      console.log(err);
    }
  }
);

//User Sign In
router.post(
  "/signin",
  // [checkEmail, checkPassword],
  async (req, res) => {
    try {
      const user = await db.query("SELECT password FROM users WHERE email=$1", [
        req.body.email,
      ]);

      const storedPassword = user.rows[0].password;
      const validPassword = await signin(storedPassword, req.body.password);

      if (!user) {
        res.status(404).json({
          status: "failure",
          data: {
            message: "No user found!",
            loginStatus: false
          },
        });
      } else if (!validPassword) {
        res.status(404).json({
          status: "failure",
          data: {
            message: "Password Incorrect!",
            loginStatus: false
          },
        });
      } else {
        req.session.email = req.body.email;

        res.status(201).json({
          status: "success",
          results: user.rows.length,
          data: {
            message: "",
            loginStatus: true
          },
        });
      }
    } catch (err) {
      console.log(err);
    }
  }
);

//User Sign Out
router.get("/signout", async (req, res) => {
  try {
    req.session = null;

    res.status(200).json({
      status: "success",
    });
  } catch (err) {
    console.log(err);
  }
});

//User Profile
router.get("/profile", async (req, res) => {
  try {
    const user = await db.query("SELECT * from users");

    res.status(200).json({
      status: "success",
      results: user.rows.length,
      data: {
        user: user.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
