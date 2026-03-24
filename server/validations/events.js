const { body,param } = require("express-validator");

exports.createEventChecks = [
  body("title")
    .exists().withMessage("title is required")
    .bail()
    .isString().withMessage("title must be a string")
    .trim()
    .isLength({ min: 3, max: 120 }).withMessage("title must be 3-120 chars"),

  body("description")
    .exists().withMessage("description is required")
    .bail()
    .isString().withMessage("description must be a string")
    .trim()
    .isLength({ min: 10 }).withMessage("description must be at least 10 chars"),

  body("category")
    .exists().withMessage("category is required")
    .bail()
    .isString().withMessage("category must be a string"),

  body("location")
    .exists().withMessage("location is required")
    .bail()
    .isString().withMessage("location must be a string"),

  body("date")
    .exists().withMessage("date is required")
    .bail()
    .isISO8601().withMessage("date must be a valid ISO8601 date")
    .toDate()
    .custom(value => {
      if (value < new Date()) throw new Error("date must be in the future");
      return true;
    }),

  body("capacity")
    .exists().withMessage("capacity is required")
    .bail()
    .isInt({ min: 1 }).withMessage("capacity must be an integer >= 1")
    .toInt(),

  body("price")
    .exists().withMessage("price is required")
    .bail()
    .isFloat({ min: 0 }).withMessage("price must be a number >= 0")
    .toFloat(),

    body("poster")
  .custom((_, { req }) => {
    if (!req.file) throw new Error("poster file is required");
    return true;
  })
  .withMessage("posterImage is required"),
];


exports.idCheck = [
  param("eid").isMongoId().withMessage("Provide correct eid")
]


// exports.updateEvent = [
//   body("title")
//     .optional()
//     .trim() 
//     .isLength({ min: 3, max: 120 }).withMessage("title must be 3-120 chars"),

//   body("description")
//     .optional()
//     .trim()
//     .isLength({ min: 10 }).withMessage("description must be at least 10 chars"),

//   body("category")
//     .optional()
//     .isString().withMessage("category must be a string"),

//   body("location")
//   .optional()
//     .isString().withMessage("location must be a string"),

//   body("date")
//    .optional()
//     .isISO8601().withMessage("date must be a valid ISO8601 date")
//     .toDate()
//     .custom(value => {
//       if (value < new Date()) throw new Error("date must be in the future");
//       return true;
//     }),

//   body("capacity")
//     .optional()
//     .isInt({ min: 1 }).withMessage("capacity must be an integer >= 1")
//     .toInt(),

//   body("price")
//     .optional()
//     .isFloat({ min: 0 }).withMessage("price must be a number >= 0")
//     .toFloat(),

//     body("poster").optional()
//   .custom((_, { req }) => {
//     if (!req.file) throw new Error("poster file is required");
//     return true;
//   })
//   .withMessage("posterImage is required"),
// ];


exports.updateEventChecks = [
  body("title")
    .optional()
    .trim()
    .isLength({ min: 3, max: 120 })
    .withMessage("title must be 3-120 chars")
    .bail(),

  body("description")
    .optional()
    .trim()
    .isLength({ min: 10 })
    .withMessage("description must be at least 10 chars")
    .bail(),

  body("category")
    .optional()
    .isString()
    .withMessage("category must be a string")
    .bail(),

  body("location")
    .optional()
    .isString()
    .withMessage("location must be a string")
    .bail(),

  body("date")
    .optional()
    .isISO8601()
    .withMessage("date must be valid ISO8601")
    .bail()
    .toDate()
    .custom((value) => {
      if (value <= new Date()) {
        throw new Error("date must be in the future");
      }
      return true;
    }),

  body("capacity")
    .optional()
    .isInt({ min: 1 })
    .withMessage("capacity must be >= 1")
    .bail()
    .toInt(),

  body("price")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("price must be >= 0")
    .bail()
    .toFloat(),
];