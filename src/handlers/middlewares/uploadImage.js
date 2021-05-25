const storageS3 = require('../../utils/storageS3');
const axios = require('axios');
const {v4: uuidv4} = require('uuid');

//If image url is provided
const downloadImage = async linkUrl => {
  const downloadedImage = await axios({
    method: 'GET',
    url: linkUrl,
    responseType: 'stream',
  });
  return downloadedImage;
};

const uploadImage = async (nameImage, linkUrl) => {
  const image = await downloadImage(linkUrl);
  const buffer = image.data._readableState.buffer.head.data;
  const key = nameImage;
  return new Promise((resolve, reject) => {
    storageS3.uploadToBucket({buffer: buffer, key: key}, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data.Location);
      }
    });
  });
};

//If base64 image is provided
const generateImageName = async image => {
  const extension = image.match(/[^:/]\w+(?=;|,)/)[0];
  const name = uuidv4();
  const nameImage = name + '.' + extension;
  return nameImage;
};

const uploadBase64Image = async image => {
  const base64Data = new Buffer.from(image.replace(/^data:image\/\w+;base64,/, ''), 'base64');
  const key = await generateImageName(image);
  return new Promise((resolve, reject) => {
    storageS3.uploadToBucket({buffer: base64Data, key: key, contEnc: 'base64'}, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data.Location);
      }
    });
  });
};

module.exports = {
  uploadImage,
  uploadBase64Image,
};
