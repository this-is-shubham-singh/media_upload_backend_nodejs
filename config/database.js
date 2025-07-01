const mongoose = require("mongoose");
require("dotenv").config();

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("db connection successfull");
  } catch (e) {
    console.log("db connection failed");
  }
};

module.exports = dbConnection;
