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
const {mail} = require("../configs/mail.js")
const env = require("../constants/env.js");
const cloudinary = require("../configs/cloudinary.js");
const fs = require("fs")

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
    mail.send({
            from:"sharath10kcoders@gmail.com",
      to: email,
      subject: "Welcome to plannex",
      html: signupTemplateForParticipants(name),
    });
    const token = await createToken({ id: createUser._id });
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
    mail.send({
            from:"sharath10kcoders@gmail.com",
      to: email,
      subject: "Welcome to Plannex",
      html: signupTemplateForOrganizer(name),
    });
    const token = await createToken({ id: createUser._id });
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
      const token = await createToken({ id: checkUser._id });
      return res.status(200).json({
        success: true,
        message: "Login Successful",
        data: { code: "LOGIN_SUCCESSFULLY", data: checkUser, token: token },
      });
    } else {
      return res.status(400).json({
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

// exports.updateProfile = async (req, res, next) => {
//   try {
//     const { name, email, password } = req.body;
//     if (await userModel.findOne({ email: email })) {
//       return res.status(409).json({
//         success: false,
//         message: "email already exists",
//         error: {
//           code: "EMAIL_EXISTS",
//           data: `${email} already exists`,
//         },
//       });
//     }
//     let file;
//     if(req.file){
//        if(req.file.mimetype.startsWith("image/")) {
//       const data = await cloudinary.uploader.upload(req.file.path, {
//         folder: "plannex",
//         resource_type: "image",
//       });
//       file = data
//     } else {
//       return res.status(400).json({
//         success: false,
//         message: "profile pic must be image only",
//         error: {
//           code: "PROFILE_PIC_IMAGE_ONLY",
//           data: null,
//         },
//       });
//     }
//     fs.unlinkSync(req.file.path)
//     }
   
//     if (name || email || password || file) {
//       if (password) {
//         const hashedPassword = await generateHashPassword(password);
//         const update = await userModel.findByIdAndUpdate(
//           req.user._id,
//           {
//             name: name,
//             password: hashedPassword,
//             email: email,
//             profileImage: {
//               fileUrl: file.url || null,
//               filePath: file.asset_folder + "/" + file.original_filename || null,
//             },
//           },
//           { new: true },
//         );
//         return res.json({
//           success: true,
//           message: "profile updated successfully ",
//           data: { code: "PROFILE UPDATE SUCCESSFULLY", data: update },
//         });
//       } else {
//         const update = await userModel.findByIdAndUpdate(
//           req.user._id,
//           {
//             name: name,
//             email: email,
//             profileImage: {
//               fileUrl: file.url || null,
//               filePath: file.asset_folder + "/" + file.original_filename || null,
//             },
//           },
//           { new: true },
//         );
//         return res.json({
//           success: true,
//           message: "profile updated successfully ",
//           data: { code: "PROFILE UPDATE SUCCESSFULLY", data: update },
//         });
//       }
//     } else {
//       const profile = await userModel.findById(req.user._id);
//       return res.json({
//         success: true,
//         message: "profile updated successfully ",
//         data: { code: "PROFILE UPDATE SUCCESSFULLY", data: profile },
//       });
//     }
//   } catch (error) {
//     const err = new Error(error);
//     err.statusCode = 400;
//     next(err);
//   }
// };


exports.updateProfile = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const userId = req.user._id;

    // 1. Email uniqueness check (exclude current user)
    if (email) {
      const existingUser = await userModel.findOne({
        email,
        _id: { $ne: userId },
      });

      if (existingUser) {
        return res.status(409).json({
          success: false,
          message: "Email already exists",
          error: {
            code: "EMAIL_EXISTS",
            data: email,
          },
        });
      }
    }

    // 2. Handle file upload (if exists)
    let profileImage;
    if (req.file) {
      if (!req.file.mimetype.startsWith("image/")) {
        return res.status(400).json({
          success: false,
          message: "Profile pic must be an image",
          error: {
            code: "PROFILE_PIC_IMAGE_ONLY",
          },
        });
      }

      const data = await cloudinary.uploader.upload(req.file.path, {
        folder: "plannex",
        resource_type: "image",
      });

      profileImage = {
        fileUrl: data.secure_url,
        filePath: `${data.asset_folder}/${data.public_id}`,
      };

      // async delete (non-blocking)
      fs.unlink(req.file.path, () => {});
    }

    // 3. Build update object dynamically
    const updateData = {};

    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (profileImage) updateData.profileImage = profileImage;

    if (password) {
      updateData.password = await generateHashPassword(password);
    }

    // 4. If nothing to update → return current profile
    if (Object.keys(updateData).length === 0) {
      const profile = await userModel.findById(userId);
      return res.json({
        success: true,
        message: "No changes applied",
        data: profile,
      });
    }

    // 5. Single DB call
    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { new: true }
    );

    return res.json({
      success: true,
      message: "Profile updated successfully",
      data: updatedUser,
    });

  } catch (error) {
    error.statusCode = error.statusCode || 500;
    next(error);
  }
};