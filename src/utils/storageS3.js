"use strict";
var path = require('path');
var fs = require('fs');
require('dotenv').config()

// Import the Amazon S3 service client
var S3 = require("aws-sdk/clients/s3");

// Set credentials and Region
var s3 = new S3({
  apiVersion: "2006-03-01",
  region: process.env.AWS_REGION,
  credentials: {
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
  },
  maxRetries: 15,
});

//console.log(s3);


function listBuckets() {

    // Call S3 to list the buckets
    // Example Use: node storageS3.listbuckets()
    s3.listBuckets((err, data) => {
        if (err) {
        console.log("Error", err);
        } else {
        console.log("Success", data.Buckets);
        }
    });

};

function createBucket() {

    // Create the parameters for calling createBucket
    var bucketParams = {
        Bucket : process.argv[2]
    };

    // call S3 to create the bucket
    // Example Use: node storageS3.createbucket() BUCKET_NAME
    s3.createBucket(bucketParams, (err, data) => {
        if (err) {
        console.log("Error", err);
        } else {
        console.log("Success", data.Location);
        }
    });

};

function uploadToBucket() {

    // call S3 to retrieve upload file to specified bucket
    var uploadParams = {Bucket: process.argv[2], Key: '', Body: ''};
    var file = process.argv[3];

    // Configure the file stream and obtain the upload parameters
    var fileStream = fs.createReadStream(file);
    fileStream.on('error', (err) => {
    console.log('File Error', err);
    });
    uploadParams.Body = fileStream;
    uploadParams.Key = path.basename(file);

     // call S3 to retrieve upload file to specified bucket
    // Example Use: node storageS3.uploadToBucket() BUCKET_NAME FILE_NAME
    s3.upload (uploadParams, (err, data) => {
        if (err) {
        console.log("Error", err);
        } if (data) {
        console.log("Upload Success", data.Location);
        }
    });

};

function objectListOnBucket() {

     // Call S3 to obtain a list of the objects in the bucket
    // Example Use: node storageS3.objectListOnBucket()
    s3.listObjects(bucketParams, (err, data) => {
        if (err) {
        console.log("Error", err);
        } else {
        console.log("Success", data);
        }
    });

};

function deleteBucket() {

    // Call S3 to delete the bucket (Note: Bucket must be empty before deletion)
    // Example Use: node storageS3.deleteBucket()
    s3.deleteBucket(bucketParams, (err, data) => {
        if (err) {
          console.log("Error", err);
        } else {
          console.log("Success", data);
        }
      });

};

module.exports = {
    listBuckets,
    createBucket,
    uploadToBucket,
    objectListOnBucket,
    deleteBucket
}