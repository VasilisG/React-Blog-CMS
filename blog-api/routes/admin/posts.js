const express = require('express');
const {
      getPosts,
      createPost,
      getPost,
      updatePost,
      deletePost,
      uploadImage,
      uploadThumbnail,
      uploadAssets,
      updatePosts
} = require('../../controllers/posts');
const { authenticate } = require('../../middleware/auth');

const { filterData } = require('../../middleware/advancedResults');
const Post = require('../../models/Post');

const comments = require('./comments');

const { postImageUpload, postThumbnailUpload, postAssetUpload } = require('../../config/storage');

const router = express();

router.use('/:postId/comments', comments);

router.route('/')
      .get(authenticate, filterData(Post, ['categories', 'tags']), getPosts)
      .post(authenticate, postAssetUpload, createPost);

router.route('/updateposts')
      .put(updatePosts);

router.route('/:id')
      .get(authenticate, getPost)
      .put(authenticate, postAssetUpload, updatePost)
      .delete(authenticate, deletePost);

router.route('/imageupload')
      .post(postImageUpload, uploadImage);

router.route('/thumbnailupload')
      .post(postThumbnailUpload, uploadThumbnail);

router.route('/assetsupload')
      .post(postAssetUpload, uploadAssets);

module.exports = router;