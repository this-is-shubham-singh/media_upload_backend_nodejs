const express = require("express");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 4000;

// middlewares
app.use(express.json());
const fileUpload = require("express-fileupload");
app.use(fileUpload());

// mounting the routes
const fileUploadRoutes = require("./routes/fileUploadRoutes");
app.use("/api/v1/upload", fileUploadRoutes);

// dbconnection
const dbConnection = require("./config/database");
dbConnection();

app.listen(PORT, () => {
  console.log("listening at port " + PORT);
});


// to use cloudinary 
// 1. schema defination (module)
// 2. db setup 
