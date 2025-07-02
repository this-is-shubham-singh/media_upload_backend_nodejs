const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  name: String,
  email: String,
  tag: String,
  imageUrl: String,
});

module.exports = mongoose.model("File", fileSchema);
