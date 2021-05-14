const storageS3 = require("../../utils/storageS3");
const axios = require("axios");
const { v4: uuidv4 } = require('uuid');

// download the image
const downloadImage = async (linkUrl) => {
  const downloadedImage = await axios({
    method: 'GET',
    url: linkUrl,
    responseType: 'stream',
  });
  return downloadedImage;
};

const generateImageName = async(image) =>{
  const extension = 'jpg';
  const name = uuidv4();
  const nameImage = name+'.'+extension;
  return nameImage;
}


// gets the url of an image and returns the link of that image uploaded to aws
const uploadImage = async (image) => {
  //const image = await downloadImage(linkUrl);
  //const buffer = image.data._readableState.buffer.head.data;
  const base64Data = new Buffer.from(image.replace(/^data:image\/\w+;base64,/, ""), 'base64');
  const key = await generateImageName(image);
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
