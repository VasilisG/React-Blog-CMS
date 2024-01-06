const path = require('path');

exports.validateFileType = (req, file, cb) => {

  const allowedTypes = process.env.ALLOWED_FILE_TYPES.split('|');

  const extension = path.extname(file.originalname).toLowerCase().substring(1);

  const validExtension = allowedTypes.indexOf(extension) != -1;

  let validMimeType = false;

  if(file.mimetype.indexOf('image') != -1) {

    const mimeTypeFormat = file.mimetype.split('/')[1];

    validMimeType = allowedTypes.indexOf(mimeTypeFormat) != -1;
  }

  if(!validExtension || !validMimeType) {

    return cb('Error: Invalid file format or MIME type.', false);
  }

  cb(null, true);
}