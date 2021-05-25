const Axios = require('axios');
const logger = require('../../utils/pinoLogger');

const downloadImage = async url => {
  const downloadedImage = await Axios({
    method: 'GET',
    url: url,
    responseType: 'stream',
  });
  return downloadedImage;
};

const checkImage = async req => {
  // fileType validation
  const url = req.body.image;
  try {
    const downloadedImage = await downloadImage(url);
    const fileType = downloadedImage.headers['content-type'].split('/')[0] || null;
    return fileType === 'image' ? true : false;
  } catch (error) {
    logger.error(error.message);
    return false;
  }
};

const checkName = async (req, res) => {
  // name validation
  if (!req.body.name) {
    return res.status(400).json({
      ok: false,
      msj: 'name is required',
    });
  } else if (req.body.name.trim() === '') {
    return res.status(400).json({
      ok: false,
      msj: 'must be at least one character',
    });
  } else {
    return true;
  }
};

const checkIdInPath = (req, res, next) => {
  if (isNaN(req.params.id)) {
    res.status(400).send('id must be an integer');
  } else {
    next();
  }
};

const isValidImage = async (req, res, next) => {
  const validatedImage = await checkImage(req);
  if (!validatedImage) {
    res.status(400).json({
      ok: false,
      msj: 'the file is not an image',
    });
  } else {
    next();
  }
};
module.exports = {
  checkIdInPath,
  checkImage,
  checkName,
  isValidImage,
};
