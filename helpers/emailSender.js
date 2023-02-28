// sendgrid
const sgMail = require("@sendgrid/mail");

// access to .env
require("dotenv").config();

// reading from .env
const { SENDGRID_API_KEY } = process.env;

// feed the key to sendgrid
sgMail.setApiKey(SENDGRID_API_KEY);

// email template
// const data = {
//   to: "sahile1959@vootin.com",
//   subject: "verify email",
//   html: `<p> </p>`,
// };

// sending email

const sendEmail = async (data) => {
  const email = { ...data, from: "alexanderyaretskiy@gmail.com" };
  await sgMail.send(email);
  return true;
};

module.exports = sendEmail;