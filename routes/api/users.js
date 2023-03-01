const express = require("express");
const router = express.Router();
const { upload, authenticate } = require("../../helpers/");

const usersCTRL = require("../../controllers/users");

router.post(
  "/register",
  upload.single("avatarURL"),
  usersCTRL.userRegistration
);

router.get("/login", usersCTRL.userLogin);

router.post("/logout", authenticate, usersCTRL.userLogout);

router.get("/current", authenticate, usersCTRL.userCurrent);

router.patch(
  "/avatars",
  upload.single("avatar"),
  authenticate,
  usersCTRL.userUpdateAvatar
);

router.get("/verify/:verificationToken", usersCTRL.userEmailVerification)


module.exports = router;
