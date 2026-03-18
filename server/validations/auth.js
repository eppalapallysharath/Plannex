const { body, header } = require("express-validator");

const allowedDomains = ["gmail.com", "yahoo.com", "outlook.com"]

exports.registerChecks = [
  body("name")
    .exists()
    .withMessage("required name field")
    .isAlpha()
    .withMessage("please enter alphabets only")
    .isLength({ min: 3, max: 60 })
    .withMessage(
      "please enter minimum 3 characters and maximum allowed 60 characters only",
    ),
    body("email")
    .exists()
    .withMessage("required email field")
    .isEmail({host_whitelist:allowedDomains})
    .withMessage("please enter correct emails only like @gmail.com, @yahoo.com, @outlook.com"),
    body("password")
    .exists()
    .withMessage("required password field")
    .isStrongPassword({minLength: 7, minLowercase:1, minNumbers: 1, minSymbols:1, minUppercase:1})
    .withMessage("please enter strong password which contains minLength: 7, minLowercase:1, minNumbers: 1, minSymbols:1, minUppercase:1")
    .isLength({ max: 60 })
    .withMessage(
      "please enter characters password below 60 characters only",
    ),
];

exports.loginChecks = [
  body("email")
    .exists()
    .withMessage("required email field")
    .isEmail()
    .withMessage("please enter correct emails"),
    body("password")
    .exists()
    .withMessage("required password field")
    .isLength({ max: 60, min:7 })
    .withMessage(
      "please enter password below 60 characters and above 7 characters",
    ),
]

exports.validateAuthHeaders= [
  header('authorization')
    .exists().withMessage('Authorization header is required')
    .bail()
    .matches(/^Bearer\s.+$/).withMessage('Invalid Authorization format. Use Bearer token'),
];