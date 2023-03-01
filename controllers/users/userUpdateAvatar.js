const { User } = require("../../models/user");
const fs = require("fs/promises");
const path = require("path");
const Jimp = require("jimp");

const { Unauthorized } = require("http-errors");

const userUpdateAvatar = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { path: oldUrl, originalname } = req.file;
    console.log(oldUrl);

    // unique avatar name
    const dbAvatarName = `${_id}__${originalname}`;

    const newUrlJimped = path.join(
      __dirname,
      "../",
      "../",
      "tmp",
      dbAvatarName
    );

    Jimp.read(oldUrl, (err, avatarJimped) => {
      if (err) throw err;
      avatarJimped
        .resize(250, 250) // resize
        .write(newUrlJimped); // save
    });

    const newUrl = path.join(
      __dirname,
      "../",
      "../",
      "public",
      "avatars",
      dbAvatarName
    );

    // replacing from tmp to the actual folder
    await fs.rename(newUrlJimped, newUrl);

    // changing the value in avatarUrl
    await User.findByIdAndUpdate(_id, { avatarURL: newUrl });

    res.status(200).json({
      status: "success",
      code: 200,
      data: {
        avatarURL: newUrl,
      },
    });
  } catch (error) {
    next(new Unauthorized("Not authorized"));
  }
};

module.exports = userUpdateAvatar;
