const { body } = require("express-validator");

const validators = {
  user: {
    register: [
      body("username")
        .exists()
        .isString()
        .isLength({ min: 3, max: 20 })
        .withMessage("Username must be between 3 and 20 characters"),
      body("email")
        .exists()
        .isEmail()
        .isLength({ min: 4, max: 256 })
        .withMessage("Please provide a valid email address"),
      body("password")
        .exists()
        .isString()
        .withMessage("Password is required and should be a string"),
      body("lifestyleData")
        .exists()
        .isObject()
        .withMessage("Lifestyle data should be an array"),
    ],
    login: [
      body("email")
        .exists()
        .isEmail()
        .isLength({ min: 4, max: 256 })
        .withMessage("Please provide a valid email address"),
      body("password")
        .exists()
        .isString()
        .withMessage("Password is required and should be a string"),
    ],
  },
  action: {
    complete: [
      body("actionId")
        .exists()
        .isString()
        .withMessage("Action ID is required and should be a string"),
    ],
  },
};

module.exports = validators;
