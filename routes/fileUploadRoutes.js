const express = require("express");
const Router = express.Router();

const {
  fileUploadLocal,
  imageUpload,
  videoUpload,
  imageSizeReducer,
} = require("../controllers/fileUpload");

Router.post("/fileUploadLocal", fileUploadLocal);
Router.post("/imageUpload", imageUpload);
Router.post("/videoUpload", videoUpload);
Router.post("/imageSizeReducer", imageSizeReducer);

module.exports = Router;
