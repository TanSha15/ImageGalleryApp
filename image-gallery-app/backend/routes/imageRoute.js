const express = require("express");
const { uploadMulter } = require("../middleware/imageUploader");
const imageModel = require("../model/imageModel");

const router = express.Router();

// TO GET ALL IMAGES
router.get("/", async (req, res) => {
  try {
    const images = await imageModel.find();
    res.status(200).json({
      message: "All images fetched successfully",
      success: true,
      data: images,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Fail to fetch files!",
    });
  }
});

// TO GET ONE IMAGE
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const image = await imageModel.findById(id);

    if (!image) {
      return res.status(404).json({
        success: false,
        message: "Image not found",
      });
    }

    res.status(200).json({
      message: "Successfully fetched the image",
      success: true,
      data: image,
    });
  } catch (error) {
    // Handles invalid ObjectId
    res.status(400).json({
      success: false,
      message: "Invalid image id",
    });
  }
});

// TO POST IMAGES
router.post("/upload-images", uploadMulter, async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No images provided",
      });
    }

    const images = req.files.map((file) => ({
      mimeType: file.mimetype,
      originalName: file.originalname,
      size: file.size.toString(),
      imageURL: file.path,
    }));

    await imageModel.insertMany(images);

    res.status(201).json({
      success: true,
      message: "Files uploaded successfully",
      data: images,
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({
      success: false,
      message: "File upload failed",
    });
  }
});

// TO DELETE THE IMAGE
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedImage = await imageModel.findByIdAndDelete(id);

    if (!deletedImage) {
      return res.status(404).json({
        success: false,
        message: "Image not found",
      });
    }

    res.status(200).json({
      message: "Successfully deleted the image",
      success: true,
      data: deletedImage,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "File deletion failed",
    });
  }
});

module.exports = router;