const cloudinary = require("cloudinary").v2;
require("dotenv").config();

const cloudinaryConnect = async () => {
  try {
    await cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET,
    });

    console.log("cloudinary connection succesfull");
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
};

module.exports = cloudinaryConnect;
