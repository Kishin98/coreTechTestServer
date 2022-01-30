const util = require("util");
const { Entropy } = require("entropy-string");
const multer = require("multer");
const maxSize = 2 * 1024 * 1024;

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../uploads");
  },
  filename: (req, file, cb) => {
    const extention = file.originalname.includes(".pdf") ? ".pdf" : ".doc";
    const entropy = new Entropy();
    const fileName = entropy.string() + extention;
    console.log(`Uploading ${file.originalname} as ${fileName} ...`);
    cb(null, fileName);
  },
});

let uploadFile = multer({
  storage: storage,
  limits: { fileSize: maxSize },
}).single("file");

let uploadFileMiddleware = util.promisify(uploadFile);
module.exports = uploadFileMiddleware;
