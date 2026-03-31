const {SENDGRID_API_KEY} = require("../constants/env.js")
const sgmail  = require("@sendgrid/mail")

sgmail.setApiKey(SENDGRID_API_KEY)

exports.mail = sgmail