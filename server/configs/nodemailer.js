const nodemailer = require("nodemailer");
const { email, password } = require("../constants/env.js")

exports.mail = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:email,
        pass:password
    }
})