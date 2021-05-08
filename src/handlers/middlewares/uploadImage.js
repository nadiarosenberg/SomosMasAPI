const storageS3 = require("../../utils/storageS3");
const axios = require("axios");

// download the image
const downloadImage = async (linkUrl) => {
  const imageToDownload = await axios({
    method: 'GET',
    url: linkUrl,
    responseType: 'stream',
  });
  return imageToDownload;
};

// gets the url of an image and returns the link of that image uploaded to aws
const uploadImage = async (nameImage, linkUrl) => {
  const image = await downloadImage(linkUrl);
  const buffer = image.data._readableState.buffer.head.data;
  const key = nameImage;
  return new Promise((resolve, reject) => {
    // call the function to upload the image
    storageS3.uploadToBucket(buffer, key, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data.Location);
      }
    });
  });
};

module.exports = uploadImage;
