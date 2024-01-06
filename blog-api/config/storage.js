const multer = require('multer');
const path = require('path');
const { validateFileType } = require('../utils/fileUpload');

/* Creates a new multer diskStorage object to be used in multer setup. */
const multerStorage = (entityType, filePath) => {
  return multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, filePath);
    },
    filename: (req, file, cb) => {
      cb(null, entityType + '_' + file.fieldname + '_' + Date.now() + path.extname(file.originalname));
    }
  });
}

/* Creates a new multer diskStorage object to be used in multer setup for both image and thumbnail. */
const postAssetStorage = () => {
  return multer.diskStorage({
    destination: (req, file, cb) => {
      if(file.fieldname === 'image'){
        cb(null, process.env.POST_IMAGE_FILE_PATH);
      }
      else cb(null, process.env.POST_THUMBNAIL_FILE_PATH);
    },
    filename: (req, file, cb) => {
      cb(null, process.env.POST_ASSET_PREFIX + '_' + file.fieldname + '_' + Date.now() + path.extname(file.originalname));
    }
  });
}

const categoryAssetStorage = () => {
  return multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, process.env.CATEGORY_IMAGE_FILE_PATH);
    },
    filename: (req, file, cb) => {
      cb(null, process.env.CATEGORY_ASSET_PREFIX + '_' + file.fieldname + '_' + Date.now() + path.extname(file.originalname));
    }
  });
}

const profileAssetStorage = () => {
  return multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, process.env.PROFILE_IMAGE_FILE_PATH);
    },
    filename: (req, file, cb) => {
      cb(null, process.env.PROFILE_ASSET_PREFIX + '_' + file.fieldname + '_' + Date.now() + path.extname(file.originalname));
    }
  });
}


/* Sets up multer, specifying storage and field name for the upload to work. */
const multerConf = (storage, fieldName) => {
  return multer({ 
    storage,
    limits: {
      fileSize: process.env.MAX_FILE_SIZE
    },
    fileFilter: validateFileType
  }).single(fieldName);
}

const postMulterConf = (storage) => {
  return multer({ 
    storage,
    limits: {
      fileSize: process.env.MAX_FILE_SIZE
    },
    fileFilter: validateFileType
  }).fields([{
    name: 'image', maxCount: 1
  }, {
    name: 'thumbnail', maxCount: 1
  }]);
}

const categoryMulterConf = (storage) => {
  return multer({
    storage,
    limits: {
      fileSize: process.env.MAX_FILE_SIZE
    },
    fileFilter: validateFileType
  }).fields([{
    name: 'image', maxCount: 1
  }]);
}

const profileMulterConf = (storage) => {
  return multer({
    storage,
    limits: {
      fileSize: process.env.MAX_FILE_SIZE
    },
    fileFilter: validateFileType
  }).fields([{
    name: 'image', maxCount: 1
  }]);
}

/* Storage settings for post main image and thumbnails. */
const postImageStorage = multerStorage('post', process.env.POST_IMAGE_FILE_PATH);
const postThumbnailStorage = multerStorage('post', process.env.POST_THUMBNAIL_FILE_PATH);
const postStorage = postAssetStorage();

/* Storage settings for category main image. */
const categoryImageStorage = multerStorage('category', process.env.CATEGORY_IMAGE_FILE_PATH);
const categoryStorage = categoryAssetStorage();

/* Storage settings for profile image. */
const profileStorage = profileAssetStorage();

/* Post image exports. */
exports.postImageUpload = multerConf(postImageStorage, 'image');
exports.postThumbnailUpload = multerConf(postThumbnailStorage, 'thumbnail');

exports.postAssetUpload = postMulterConf(postStorage);

/* Category image exports. */
exports.categoryImageUpload = multerConf(categoryImageStorage, 'image');

exports.categoryAssetUpload = categoryMulterConf(categoryStorage);

/* Profile image exports. */
exports.profileAssetUpload = profileMulterConf(profileStorage);

// https://stackoverflow.com/questions/36096805/uploading-multiple-files-with-multer-but-from-different-fields