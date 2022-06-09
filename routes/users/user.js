const express = require("express");
// const { gmail } = require("googleapis/build/src/apis/gmail");
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

      // Encrypt the provided password
      const encryptedPassword = await signup(req.body.password);
      // Check if the provided user email exists in the database
      const checkUser = await db.query("SELECT * FROM users WHERE email=$1", [
        req.body.email,
      ]);

      let user;
      // Check if the user (email) is already in the database
      if (checkUser.rows.length === 0) {
        // If the user is not in the database, create them
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
        // Do not create user if their email is already in the database
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
      // Get the password for the provided user (email) from the database
      const user = await db.query("SELECT password FROM users WHERE email=$1", [
        req.body.email,
      ]);

      const storedPassword = user.rows[0].password;

      //Check if the provided password is correct
      const validPassword = await signin(storedPassword, req.body.password);

      if (!user) {
        // If the user (email) is not in the database
        res.status(404).json({
          status: "failure",
          data: {
            message: "No user found!",
            loginStatus: false,
          },
        });
      } else if (!validPassword) {
        // If the password provided is invalid
        res.status(404).json({
          status: "failure",
          data: {
            message: "Password Incorrect!",
            loginStatus: false,
          },
        });
      } else {
        // If the email and password are valid, create a cookie session
        req.session.email = req.body.email;

        res.status(201).json({
          status: "success",
          results: user.rows.length,
          data: {
            message: "",
            loginStatus: true,
          },
        });
      }
    } catch (err) {
      console.log(err);
    }
  }
);

//Check if user is signed in
router.get("/signedIn", async (req, res) => {
  try {
    if (req.session !== null) {
      res.status(200).json({
        status: "success",
        data: {
          loginStatus: true,
        },
      });
    } else {
      res.status(200).json({
        status: "success",
        data: {
          loginStatus: false,
        },
      });
    }
  } catch (err) {
    console.log(err);
  }
});

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

//Get user profiles
router.get("/profiles", async (req, res) => {
  try {
    const users = await db.query("SELECT * from users");

    res.status(200).json({
      status: "success",
      results: users.rows.length,
      data: {
        users: users.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

//Select a user profile
router.get("/profile", async (req, res) => {
  try {
    // const user = await db.query("SELECT * from users WHERE email=$1", [
    //   req.body.email,
    // ]);
    const user = await db.query(
      "SELECT * from users WHERE email='ric19mat@gmail.com'"
    );

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

//Update profile info
router.put("/profile/info", async (req, res) => {
  try {
    const info = await db.query(
      "UPDATE users SET firstname=$1, lastname=$2, email=$3, phone=$4, address=$5, city=$6, state=$7, zip=$8 WHERE email=$9",
      [
        req.body.firstName,
        req.body.lastName,
        req.body.newEmail,
        req.body.phoneNumber,
        req.body.address,
        req.body.city,
        req.body.state,
        req.body.zip,
        req.body.email,
      ]
    );

    res.status(201).json({
      status: "success",
      results: info.rows.length,
      data: {
        info: info.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

//Update profile bio
router.put("/profile/bio", async (req, res) => {
  try {
    const info = await db.query(
      "UPDATE users SET bio=$1, image=$2 WHERE email=$3",
      [req.body.bio, req.body.image, req.body.email]
    );

    res.status(201).json({
      status: "success",
      results: info.rows.length,
      data: {
        info: info.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

//Update profile links
router.put("/profile/links", async (req, res) => {
  try {
    const info = await db.query(
      "UPDATE users SET website=$1, linkedin=$2, twitter=$3, youtube=$4 WHERE email=$5",
      [
        req.body.website,
        req.body.linkedIn,
        req.body.twitter,
        req.body.youtube,
        req.body.email,
      ]
    );

    res.status(201).json({
      status: "success",
      results: info.rows.length,
      data: {
        info: info.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
