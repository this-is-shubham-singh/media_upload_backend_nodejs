const mongoose = require("mongoose");
const nodemailer = require("nodemailer");

const fileSchema = new mongoose.Schema({
  name: String,
  email: String,
  tag: String,
  imageUrl: String,
});

// Schema.post("save", ...) runs after a document is saved to the database.
// It gives you access to the saved document.

fileSchema.post("save", (doc) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.HOST_NAME,
      auth: {
        user: process.env.EMAILER,
        pass: process.env.EMAIL_PASS,
      },
    });

    transporter.sendMail({
      from: "shubham's backend app",
      to: doc.email,
      subject: "media uploded succesfully",
      html: `<p>media uploded succesfully at following link <a href="${doc.imageUrl}">${doc.imageUrl}</a></p>`,
    });
  } catch (e) {
    console.log(e.message);
  }
});

module.exports = mongoose.model("File", fileSchema);
