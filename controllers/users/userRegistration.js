const { User } = require("../../models/user");
const { JoiSchemas } = require("../../models/user");
const bcrypt = require("bcrypt");
const {BASE_URL} = process.env;
const {nanoid} = require("nanoid")
const {sendEmail} = require("../../helpers")
const gravatar = require("gravatar")

const { BadRequest, Conflict } = require("http-errors");

const userRegistration = async (req, res, next) => {
  try {
    const { error } = JoiSchemas.userRegistrationJoiSchema.validate(req.body);
    if (error) {
      throw new BadRequest("Помилка від Joi або іншої бібліотеки валідації");
    }

    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      throw new Conflict("Email in use");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url(email);

    const verificationToken = nanoid();
    const result = await User.create({
      ...req.body,
      password: hashedPassword,
      avatarURL,
      verificationToken,
    });
    const verificationEmail = {
      to: email,
      subject: "Verify your email in order to use your profile",
      html: `<a target="_blank" href="${BASE_URL}/users//verify/${verificationToken}">Click to verify your email</a>`,
    };

    await sendEmail(verificationEmail);

    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        email: result.email,
        subscription: result.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
}

  module.exports = userRegistration