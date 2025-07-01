const fileUploadLocal = async (req, res) => {
  try {
    const file = req.files.file;

    const path =
      __dirname + "/files/" + Date.now() + `.${file.name.split(".")[1]}`;
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

module.exports = fileUploadLocal;
