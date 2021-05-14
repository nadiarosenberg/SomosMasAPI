const storageS3 = require("../../utils/storageS3");
const axios = require("axios");

// download the image
const downloadImage = async (linkUrl) => {
  const downloadedImage = await axios({
    method: 'GET',
    url: linkUrl,
    responseType: 'stream',
  });
  return downloadedImage;
};

// gets the url of an image and returns the link of that image uploaded to aws
const uploadImage = async (nameImage, image) => {
  //const image = await downloadImage(linkUrl);
  //const buffer = image.data._readableState.buffer.head.data;
  const base64Data = new Buffer.from(image.replace(/^data:image\/\w+;base64,/, ""), 'base64');
  const key = nameImage;
  return new Promise((resolve, reject) => {
    // call the function to upload the image
    storageS3.uploadToBucket(base64Data, key, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data.Location);
      }
    });
  });
};

module.exports = uploadImage;
