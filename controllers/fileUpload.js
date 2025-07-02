const cloudinary = require("cloudinary").v2;
const File = require("../model/File");

const uploadToCloudinary = async (tempname, folderName, isQuality) => {
  try {
    const options = {
      folder: folderName,
      resource_type: "auto",
      quality: isQuality ? isQuality : "",
    };
    const response = await cloudinary.uploader.upload(tempname, options);
    return response;
  } catch (e) {
    console.log(e);
  }
};

// uploading media on local
const fileUploadLocal = async (req, res) => {
  try {
    const file = req.files.file;

    // because it needs both where and with what name it need to save
    const path =
      __dirname +
      "/files/" +
      Date.now() +
      `.${file.name.split(".").pop().toLowerCase()}`;

    file.mv(path, () => {
      console.log("file moved successfully");
    });

    res.status(200).json({
      success: true,
      message: "file uploaded successfully",
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};

const imageUpload = async (req, res) => {
  try {
    // ********* 1. fetch all details
    const { name, email, tag } = req.body;
    const file = req.files.mediaFile;

    // ********* 2. validate all details
    const allowedExtensions = ["jpg", "png", "jpeg"];
    const fileExtension = file.name.split(".").pop().toLowerCase();
    if (!allowedExtensions.includes(fileExtension) || file.size > 2097152) {
      return res.status(415).json({
        success: false,
        message: "unsupported file type (use jpg, png, jpeg and size < 2mb",
      });
    }

    // ********* 3. push changes to cloudinary
    const response = await uploadToCloudinary(file.tempFilePath, "practise");
    console.log(response);

    const fileData = File({ name, email, tag, imageUrl: response.secure_url });
    fileData.save();

    return res.status(200).json({
      success: true,
      message: "media uploded",
    });
  } catch (e) {
    return res.status(400).json({
      success: false,
      message: e,
    });
  }
};

const videoUpload = async (req, res) => {
  try {
    // fetch all details
    const { name, email, tag } = req.body;
    const file = req.files.mediaFile;

    // validate all details
    const allowedExtensions = ["mp4", "mov", "mkv"];
    const fileExtension = file.name.split(".").pop().toLowerCase();
    if (!allowedExtensions.includes(fileExtension) || file.size > 104857600) {
      return res.status(415).json({
        success: false,
        message: "unsupported file type (use mp4, mov, mkv and size < 10mb",
      });
    }

    // push changes to cloudinary
    const response = await uploadToCloudinary(file.tempFilePath, "practise");
    console.log(response);

    const fileData = File({ name, email, tag, imageUrl: response.secure_url });
    fileData.save();

    return res.status(200).json({
      success: true,
      message: "media uploded",
    });
  } catch (e) {
    return res.status(400).json({
      success: false,
      message: e.message,
    });
  }
};

const imageSizeReducer = async (req, res) => {
  try {
    // fetch all details
    const { name, email, tag } = req.body;
    const file = req.files.mediaFile;

    // validate all details
    const allowedExtensions = ["jpg", "png", "jpeg"];
    const fileExtension = file.name.split(".").pop().toLowerCase();
    if (!allowedExtensions.includes(fileExtension) || file.size > 2097152) {
      return res.status(415).json({
        success: false,
        message: "unsupported file type (use mp4, mov, mkv and size < 2mb",
      });
    }

    // push changes to cloudinary
    const response = await uploadToCloudinary(
      file.tempFilePath,
      "practise",
      5
    );
    console.log(response);

    const fileData = File({ name, email, tag, imageUrl: response.secure_url });
    fileData.save();

    return res.status(200).json({
      success: true,
      message: "media uploded",
    });
  } catch (e) {
    return res.status(400).json({
      success: false,
      message: e.message,
    });
  }
};

module.exports = {
  fileUploadLocal,
  imageUpload,
  videoUpload,
  imageSizeReducer,
};
