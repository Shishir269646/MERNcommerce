const { S3Client, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const { Upload } = require("@aws-sdk/lib-storage");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const sharp = require("sharp");
require("dotenv").config();

// Create S3 client
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// Multer config: Save uploaded files to ./tmp first
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const tempDir = "./tmp";
    if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true });
    cb(null, tempDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

/**
 * Upload a buffer (resized image) to S3
 */
const uploadBufferToS3 = async (buffer, key, mimetype) => {
  const upload = new Upload({
    client: s3,
    params: {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: key,
      Body: buffer,
      ContentType: mimetype,
    },
  });

  try {
    const result = await upload.done();
    return result;
  } catch (error) {
    console.error("S3 Upload Error:", error);
    throw error;
  }
};

/**
 * Resize & upload multiple size variants to S3
 * Example groups: banner, product, logo
 */
const resizeAndUploadToS3 = async (filePath, originalFilename, mimetype, group = "general") => {
  const sizesByGroup = {
    category: [{ label: "category", width: 130, height: 162 }],
    product: [
      { label: "small", width: 350, height: 350 },
      { label: "large", width: 800, height: 800 },
    ],
    setting: [{ label: "setting", width: 1680, height: 500 }],
  };

  const selectedSizes = sizesByGroup[group] || sizesByGroup.general;
  const results = [];

  const image = sharp(filePath);
  const metadata = await image.metadata();

  for (const size of selectedSizes) {
    let transformer = sharp(filePath).withMetadata();

    // Resize only if original larger than target, and prevent enlargement
    if (metadata.width > size.width || metadata.height > size.height) {
      transformer = transformer.resize(size.width, size.height, {
        fit: "inside",
        withoutEnlargement: true,
      });
    }

    // Optional: sharpen image after resize to enhance details
    transformer = transformer.sharpen();

    // Set output options by mimetype
    if (mimetype === "image/jpeg" || mimetype === "image/jpg") {
      transformer = transformer.jpeg({ quality: 95, mozjpeg: true });
    } else if (mimetype === "image/png") {
      transformer = transformer.png({ compressionLevel: 9, adaptiveFiltering: true });
    } else if (mimetype === "image/webp") {
      transformer = transformer.webp({ quality: 95 });
    }

    const buffer = await transformer.toBuffer();

    const key = `uploads/${group}/${size.label}-${originalFilename}`;
    const uploadResult = await uploadBufferToS3(buffer, key, mimetype);
    results.push({ size: size.label, url: uploadResult.Location });
  }

  fs.unlinkSync(filePath);
  return results;
};



/**
 * Upload original file to S3 (no resizing)
 */
const uploadFileToS3 = async (filePath, key, mimetype) => {
  const fileStream = fs.createReadStream(filePath);

  const upload = new Upload({
    client: s3,
    params: {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `uploads/${key}`,
      Body: fileStream,
      ContentType: mimetype,
    },
  });

  try {
    const result = await upload.done();
    fs.unlinkSync(filePath); // Clean up
    return result;
  } catch (error) {
    console.error("S3 Upload Error:", error);
    throw error;
  }
};

/**
 * Extract object key from full S3 URL
 */
const extractKeyFromUrl = (url) => {
  try {
    const urlObj = new URL(url);
    return decodeURIComponent(urlObj.pathname).substring(1); // remove leading '/'
  } catch (error) {
    console.error("Invalid S3 URL:", url);
    throw error;
  }
};

/**
 * Delete file from S3 using its URL
 */
const deleteFileFromS3 = async (fileUrl) => {
  try {
    const key = extractKeyFromUrl(fileUrl);
    const result = await s3.send(
      new DeleteObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: key,
      })
    );
    return result;
  } catch (err) {
    console.error("S3 Delete Error:", err);
    throw err;
  }
};

module.exports = {
  upload,
  uploadFileToS3,
  resizeAndUploadToS3,
  deleteFileFromS3,
};



