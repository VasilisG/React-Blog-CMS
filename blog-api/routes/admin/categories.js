const express = require('express');
const {
  getCategories,
  getCategoryTree,
  createCategory,
  updateCategory,
  deleteCategory,
  imageUpload,
  getCategory,
  getCategoryOptions
} = require('../../controllers/categories');
const { authenticate } = require('../../middleware/auth');

const { categoryImageUpload, categoryAssetUpload } = require('../../config/storage');

const router = express();

router.route('/')
      .get(authenticate, getCategories)
      .post(authenticate, categoryAssetUpload, createCategory);

router.route('/tree')
      .get(authenticate, getCategoryTree);

router.route('/options')
      .get(authenticate, getCategoryOptions);

router.route('/:id')
      .get(authenticate, getCategory)
      .put(authenticate, categoryAssetUpload, updateCategory)
      .delete(authenticate, deleteCategory);

router.route('/imageupload')
      .post(categoryImageUpload, imageUpload);

module.exports = router;