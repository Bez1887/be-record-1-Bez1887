const validator = require("express-validator");

const User = require("../models/User");

const passwordConfirmation = validator
  .body("passwordConfirmation")
  .custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Passwords do not match");
    }

    return true;
  });

const password = validator // wird überprüft ob ein Passwort eingegeben wurde
  .body("password")
  .optional()
  .isLength({ min: 8, max: 16 })
  .withMessage("Password must be stronger")
  .not()
  // bizieht aufs im ARRAY angelegten Beispiele
  .isIn([
    "password",
    "passwort",
    "password12345678",
    "password1234",
    "hello",
    "hello1234",
    "hallo1234",
    "hallozusammen",
    // diese passwörter wären unzulässig!!!!
  ])
  .withMessage("Ivalid password");

// Username bzw. Email oder das was man anlegen möchte

const username = validator
  .body("username")
  .optional()
  .isEmail()
  .withMessage("Username must be an email adress!!");

module.exports = {
  passwordConfirmation,
  password,
  username,
};
