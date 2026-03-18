const { userModel } = require("../models/usersModel.js");
const bcryptjs = require("bcryptjs");
const {
  generateHashPassword,
  createToken,
} = require("../helperfunctions/auth.js");
const {
  signupTemplateForParticipants,
  signupTemplateForOrganizer,
} = require("../helperfunctions/emailTemplate.js");
const { mail } = require("../configs/nodemailer.js");
const env = require("../constants/env.js");

exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const checkEmail = await userModel.findOne({ email: email });
    if (checkEmail) {
      return res.status(409).json({
        success: false,
        message: "email already exists",
        error: {
          code: "EMAIL_EXISTS",
          data: `${email} already exists`,
        },
      });
    }
    const hashPassword = await bcryptjs.hash(password, 13);
    const createUser = await userModel.create({
      name,
      email,
      password: hashPassword,
    });
    mail.sendMail({
      from: env.email,
      to: email,
      subject: "Welcome to plannex",
      html: signupTemplateForParticipants(name),
    });
    const token = await createToken({ email: createUser.email });
    return res.status(201).json({
      success: true,
      message: "Registered successfully",
      data: { code: "REGISTERED_SUCCESSFULLY", data: createUser },
      token: token,
    });
  } catch (error) {
    const err = new Error(error);
    err.statusCode = 400;
    next(err);
  }
};

exports.signupAsOrganizers = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const checkEmail = await userModel.findOne({ email: email });
    if (checkEmail) {
      return res.status(409).json({
        success: false,
        message: "email already exists",
        error: {
          code: "EMAIL_EXISTS",
          data: `${email} already exists`,
        },
      });
    }
    const hashedPassword = await generateHashPassword(password);
    const createUser = await userModel.create({
      email,
      name,
      password: hashedPassword,
      role: "organizer",
    });
    mail.sendMail({
      from: env.email,
      to: email,
      subject: "Welcome to Plannex",
      html: signupTemplateForOrganizer(name),
    });
    const token = await createToken({ email: createUser.email });
    return res.status(201).json({
      success: true,
      message: "Signup successfully",
      data: { code: "SIGNUP_SUCCESSFULLY", data: createUser },
      token: token,
    });
  } catch (error) {
    const err = new Error(error);
    err.statusCode = 400;
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const checkUser = await userModel.findOne({ email });
    if (!checkUser) {
      return res.status(404).json({
        success: false,
        message: "Email not found, signup first",
        error: {
          code: "EMAIL_NOT_FOUND",
          data: null,
        },
      });
    }
    const verifyPassword = await bcryptjs.compare(password, checkUser.password);
    if (verifyPassword) {
      const token = await createToken({ email: checkUser.email });
      return res
        .status(200)
        .json({
          success: true,
          message: "Login Successful",
          data: { code: "LOGIN_SUCCESSFULLY", data: checkUser, token: token },
        });
    } else {
      return res
        .status(400)
        .json({
          success: false,
          message: "Invalid email/password",
          data: { code: "INVALID_EMAIL/PASSWORD", data: null },
        });
    }
  } catch (error) {
    const err = new Error(error);
    err.statusCode = 400;
    next(err);
  }
};

exports.profile = async (req, res, next) => {
  try {
    const profile = await userModel.findById(req.user._id);
    res.json({
      success: true,
      message: "Fetched user profile ",
      data: { code: "FETCHED_USER_PROFILE", data: profile },
    });
  } catch (error) {
    const err = new Error(error);
    err.statusCode = 400;
    next(err);
  }
};

exports.updateProfile = async (req, res) => {
  try {
    res.send("update profile");
  } catch (error) {
    res.status(400).send("something went wrong");
  }
};
