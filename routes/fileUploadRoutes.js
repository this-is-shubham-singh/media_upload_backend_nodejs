const express = require("express");
const Router = express.Router();

const fileUploadLocal = require("../controllers/fileUploadLocal");

Router.post("/fileUpload", fileUploadLocal);

module.exports = Router;
