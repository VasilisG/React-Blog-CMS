const express = require('express');
const {
  getTags,
  getTagOptions,
  getTag,
  getTagsByName,
  createTag,
  updateTag,
  deleteTag
} = require('../../controllers/tags');
const { authenticate } = require('../../middleware/auth');
const { filterData } = require('../../middleware/advancedResults');
const Tag = require('../../models/Tag');

const router = express();

router.route('/')
  .get(authenticate, filterData(Tag, []), getTags)
  .post(authenticate, createTag);

router.route('/options')
      .get(authenticate, getTagOptions);

router.route('/:id')
  .get(authenticate, getTag)
  .put(authenticate, updateTag)
  .delete(authenticate, deleteTag);

router.route('/name/:name')
  .get(getTagsByName);


module.exports = router;