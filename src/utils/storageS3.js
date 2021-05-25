'use strict';
require('dotenv').config();

const AWS = require('aws-sdk');
AWS.config.update({
  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
  AWS_REGION: process.env.AWS_DEFAULT_REGION,
});

const S3 = require('aws-sdk/clients/s3');

const s3 = new S3({
  apiVersion: '2006-03-01',
  maxRetries: 15,
});

const uploadToBucket = (params, callback) => {
  var uploadParams = {
    Bucket: process.env.BUCKET_NAME,
    Key: params.key,
    Body: params.buffer,
  };
  if (params.hasOwnProperty('contEnc')) uploadParams['contentEncoding'] = params.contEnc;

  s3.upload(uploadParams, (err, data) => {
    callback(err, data);
  });
};

const deleteObjectOnBucket = key => {
  var deleteParams = {
    Bucket: process.env.BUCKET_NAME,
    Key: key,
  };

  s3.deleteObject(deleteParams, (err, data) => {
    if (err) {
      console.log(err, err.stack);
    } else {
      console.log('Object Deleted', data);
    }
  });
};

const objectListOnBucket = (objectFileName = '') => {
  var bucketParams = {
    Bucket: process.env.BUCKET_NAME,
    Prefix: objectFileName,
  };

  s3.listObjects(bucketParams, (err, data) => {
    if (err) {
      console.log('Error', err);
    } else {
      console.log(data.Contents);
    }
  });
};

module.exports = {
  uploadToBucket,
  deleteObjectOnBucket,
  objectListOnBucket,
};
