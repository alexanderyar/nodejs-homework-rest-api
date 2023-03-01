const userRegistration = require("./userRegistration")
const userLogin = require("./userLogin")
const userLogout = require("./userLogout")
const userCurrent = require("./userCurrent")
const userUpdateAvatar = require("./userUpdateAvatar")
const userEmailVerification = require("./userEmailVerification")
const userResendVerificationEmail = require("./userResendVerificationEmail")
module.exports = {
    userRegistration,
    userLogin,
    userLogout,
    userCurrent,
    userUpdateAvatar,
    userEmailVerification,
    userResendVerificationEmail,
}