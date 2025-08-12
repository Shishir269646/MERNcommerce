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
      { label: "large", width: 800, height: 800 }
    ],
    setting: [
      { label: "setting", width: 1680, height: 500 },
    ],
  };

  const selectedSizes = sizesByGroup[group] || sizesByGroup.general;
  const results = [];

  for (const size of selectedSizes) {
    const buffer = await sharp(filePath)
      .resize(size.width, size.height, { fit: "inside" })
      .toBuffer();

    const key = `uploads/${group}/${size.label}-${originalFilename}`;
    const uploadResult = await uploadBufferToS3(buffer, key, mimetype);
    results.push({ size: size.label, url: uploadResult.Location });
  }

  // Clean up temp file
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



// for example, you can use the uploaded images like this in your frontend:

/* images: {
  thumb: "https://your-bucket.s3.region.amazonaws.com/uploads/products/thumb-image.jpg",
  medium: "https://your-bucket.s3.region.amazonaws.com/uploads/products/medium-image.jpg",
  large: "https://your-bucket.s3.region.amazonaws.com/uploads/products/large-image.jpg",
}
<Image
  src={product.images.thumb}
  alt={product.title}
  width={150}
  height={150}
  className="object-cover rounded"
/>
<Image
  src={product.images.large}
  alt={product.title}
  width={1200}
  height={800}
  className="object-cover w-full"
/>

 */