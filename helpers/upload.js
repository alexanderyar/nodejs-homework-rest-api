const multer = require("multer");
const path = require("path");

const tmpFolderUrl = path.join(__dirname, "../", "tmp");

const multerConfig = multer.diskStorage({
  destination: tmpFolderUrl,
});

const upload = multer({
  storage: multerConfig,
});

module.exports = upload;

