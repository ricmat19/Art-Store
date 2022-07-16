const { check } = require("express-validator");

module.exports = {
  // Email Validation
  checkEmail: check("email")
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage("Must be a valid email."),
  // Password validation
  checkPassword: check("password").trim().isLength({ min: 6, max: 20 }),
  // Password copy validation
  checkPasswordCopy: check("passwordCopy")
    .trim()
    .isLength({ min: 6, max: 20 })
    .custom((passwordCopy, { req }) => {
      if (req.body.password !== passwordCopy) {
        throw new Error("Passwords must match");
      }
    }),
};
