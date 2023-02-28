const authenticate = require("./authenticate")
const upload = require("./upload")
const handleErrors = require("./handeErrors")
const {isValidIdMiddleware} = require("./isValidIdMiddleware")
const sendEmail = require("./emailSender")

module.exports = {
    authenticate,
    handleErrors,
    isValidIdMiddleware,
    upload,
    sendEmail

}