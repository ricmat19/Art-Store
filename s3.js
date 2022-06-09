// const fs = require("fs");
const S3 = require("aws-sdk/clients/s3");

//insures that the .env file is only run in a development environment and not a production environment
if (process.env.NODE_ENV !== "production") {
  //requires the the .env file configuration be run first hiding all info hidden via the .env file
  require("dotenv").config();
}

// Get S3 Credentials
const region = process.env.S3REGION;
const bucketName = process.env.S3NAME;
const accessKeyId = process.env.S3KEY;
const secretAccessKey = process.env.S3SECRETKEY;

// Create S3 object
const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey,
  signatureVersion: "v4",
});

module.exports = {
  // Upload the provided image file to S3 bucket
  uploadFile: function uploadFile(file) {
    // const fileStream = fs.createReadStream(file.path);

    const uploadParams = {
      Bucket: bucketName,
      Body: file.fileStream,
      Key: file.key,
    };

    return s3.upload(uploadParams).promise();
  },
  // Get the file stream for the provided imagekey
  getFileStream: function getFileStream(fileKey) {
    const downloadParams = {
      Key: fileKey,
      Bucket: bucketName,
    };

    return s3.getObject(downloadParams).createReadStream();
  },
};
