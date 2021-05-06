"use strict";
const path = require("path");
const fs = require("fs");
require("dotenv").config();

const AWS = require("aws-sdk");
AWS.config.update({
  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
  AWS_REGION: process.env.AWS_DEFAULT_REGION,
});

// Import the Amazon S3 service client
const S3 = require("aws-sdk/clients/s3");

// Set credentials and Region
const s3 = new S3({
  apiVersion: "2006-03-01",
  maxRetries: 15,
});

function uploadToBucket(pathFileName) {
  // call S3 to retrieve upload file to specified bucket
  var uploadParams = { Bucket: process.env.BUCKET_NAME, Key: "", Body: "" };
  var file = pathFileName;

  // Configure the file stream and obtain the upload parameters
  var fileStream = fs.createReadStream(file);
  fileStream.on("error", (err) => {
    console.log("File Error", err);
  });
  uploadParams.Body = fileStream;
  uploadParams.Key = path.basename(file);

  // call S3 to retrieve upload file to specified bucket
  // Example Use: node storageS3.uploadToBucket('C:/Users/Gastón/Desktop/images3.jpg') 
  s3.upload(uploadParams, (err, data) => {
    if (err) {
      console.log("Error", err);
    }
    if (data) {
      console.log("Upload Success", data);
    }
  });
}

function deleteObjectOnBucket(fileNameToDelete) {
  // call S3 to delete file to specified bucket
  var deleteParams = { Bucket: process.env.BUCKET_NAME, Key: "" };
  var file = fileNameToDelete
  deleteParams.Key = path.basename(file);

  // call S3 to delete file to specified bucket
  // Example Use: node storageS3.deleteObjectOnBucket('images3.jpg') 
  s3.deleteObject(deleteParams, (err, data) => {
    if (err) {
      console.log(err, err.stack);
    } else {
      console.log(data);
    }
  });
}

function objectListOnBucket(objectFileName) {
  // Create the parameters for calling listObjects
  var bucketParams = {
    Bucket: process.env.BUCKET_NAME,
    Prefix: objectFileName,
  };

  // Call S3 to obtain a list of the objects in the bucket
  // Example Use: node storageS3.objectListOnBucket('images')
  s3.listObjects(bucketParams, (err, data) => {
    if (err) {
      console.log("Error", err);
    } else {
      console.log(data.Contents);
    }
  });
}

module.exports = {
  uploadToBucket,
  deleteObjectOnBucket,
  objectListOnBucket,
};
